import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputFile = path.join(projectRoot, "lib", "mock", "home.snapshot.json");
const backupDir = path.join(projectRoot, "lib", "mock", "snapshot-backups");

async function loadEnvFile(filePath) {
  try {
    const contents = await readFile(filePath, "utf8");

    for (const line of contents.split(/\r?\n/)) {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#") || !trimmedLine.includes("=")) {
        continue;
      }

      const [rawKey, ...rawValueParts] = trimmedLine.split("=");
      const key = rawKey.trim();

      if (!key || process.env[key] !== undefined) {
        continue;
      }

      process.env[key] = rawValueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // The sync script can still run from explicit env vars in CI.
  }
}

await loadEnvFile(path.join(projectRoot, ".env.local"));

const baseUrl =
  process.env.SNAPSHOT_STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL;

if (!baseUrl) {
  throw new Error(
    "Missing SNAPSHOT_STRAPI_URL (or NEXT_PUBLIC_STRAPI_URL / STRAPI_URL) for fallback snapshot sync.",
  );
}

const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
const apiToken = process.env.SNAPSHOT_STRAPI_TOKEN || process.env.STRAPI_API_TOKEN;
let previousSnapshotText = null;
let previousSnapshot = null;

try {
  previousSnapshotText = await readFile(outputFile, "utf8");
  previousSnapshot = JSON.parse(previousSnapshotText);
} catch {
  previousSnapshotText = null;
  previousSnapshot = null;
}

const previousResponses =
  previousSnapshot && typeof previousSnapshot === "object" && previousSnapshot.responses
    ? previousSnapshot.responses
    : {};

const endpoints = [
  ["siteHeader", "/api/site-header?populate=*"],
  ["homePage", "/api/home-page?populate=*"],
  [
    "aboutPage",
    "/api/about-page?populate[logo]=true&populate[values][populate]=icon&populate[missionImage]=true&populate[whyItems]=true&populate[partners][populate][logo]=true&populate[partners][populate][stores][populate]=logo",
  ],
  ["productionVideo", "/api/production-video-page?populate=*"],
  ["termsPage", "/api/terms-page?populate[sections][populate]=image"],
  ["certificatesPage", "/api/certificates-page?populate[certificates][populate]=image"],
  ["banners", "/api/banners?populate=*"],
  ["wholesaleContract", "/api/wholesale-contract-section?populate=*"],
  ["prosCons", "/api/pros-cons-section?populate=*"],
  ["formula72Scheme", "/api/formula72-scheme-section?populate[image]=true&populate[items][populate]=mobileImage"],
  ["missionK72", "/api/mission-k72-section?populate=*"],
  ["workStages", "/api/work-stages-section?populate=*"],
  ["whoSuits", "/api/who-suits-section?populate=*"],
  ["whyTrustUs", "/api/why-trust-us-section?populate=*"],
  ["whatWeCanMake", "/api/what-we-can-make-section?populate=*"],
  ["coverageMap", "/api/coverage-map-section?populate=*"],
  ["faq", "/api/faq-section?populate=*"],
  ["leadCta", "/api/lead-cta-section"],
  ["finalBrand", "/api/final-brand-section"],
  [
    "footer",
    "/api/footer-section?populate[companyLinks]=*&populate[documentLinks]=*&populate[socialLinks][populate]=*",
  ],
  ["floatingContact", "/api/floating-contact-section?populate[items][populate]=*"],
];

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
    },
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Snapshot request failed: ${response.status} ${response.statusText} for ${url}`);
  }

  return response.json();
}

function isCloudinaryUrl(url) {
  return typeof url === "string" && url.startsWith("https://res.cloudinary.com/");
}

function isUploadUrl(url) {
  if (typeof url !== "string") {
    return false;
  }

  if (url.startsWith("/uploads/")) {
    return true;
  }

  try {
    const parsedUrl = new URL(url);
    const parsedBaseUrl = new URL(normalizedBaseUrl);

    return parsedUrl.origin === parsedBaseUrl.origin && parsedUrl.pathname.startsWith("/uploads/");
  } catch {
    return false;
  }
}

function collectMediaUrlStats(value, stats, pathParts = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectMediaUrlStats(item, stats, [...pathParts, String(index)]));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    const nextPath = [...pathParts, key];

    if (key === "url" && typeof nestedValue === "string") {
      if (isCloudinaryUrl(nestedValue)) {
        stats.cloudinaryUrlCount += 1;
      }

      if (isUploadUrl(nestedValue)) {
        stats.uploadUrls.push({
          path: nextPath.join("."),
          url: nestedValue,
        });
      }
    }

    collectMediaUrlStats(nestedValue, stats, nextPath);
  }
}

async function backupPreviousSnapshot() {
  if (!previousSnapshotText) {
    console.info("[sync:strapi-snapshot] no previous snapshot found, skipping backup");
    return;
  }

  try {
    const backupName = `home.snapshot.${new Date().toISOString().replaceAll(":", "-")}.json`;

    await mkdir(backupDir, { recursive: true });
    await writeFile(path.join(backupDir, backupName), previousSnapshotText, "utf8");
    console.info(`[sync:strapi-snapshot] backed up previous snapshot to lib/mock/snapshot-backups/${backupName}`);
  } catch {
    console.warn("[sync:strapi-snapshot] WARNING: failed to back up previous snapshot");
  }
}

const responses = {};

console.info(`[sync:strapi-snapshot] source: ${normalizedBaseUrl}`);
console.info(`[sync:strapi-snapshot] endpoints: ${endpoints.map(([key]) => key).join(", ")}`);

for (const [key, endpoint] of endpoints) {
  const url = `${normalizedBaseUrl}${endpoint}`;
  const response = await fetchJson(url);

  if (response === null) {
    responses[key] = previousResponses[key] ?? null;
    console.info(
      previousResponses[key]
        ? `[sync:strapi-snapshot] preserved ${key} from previous snapshot (endpoint unavailable or forbidden)`
        : `[sync:strapi-snapshot] skipped ${key} (endpoint unavailable or forbidden)`,
    );
    continue;
  }

  responses[key] = response;
  console.info(`[sync:strapi-snapshot] fetched ${key}`);
}

const mediaStats = {
  cloudinaryUrlCount: 0,
  uploadUrls: [],
};

collectMediaUrlStats(responses, mediaStats);

const snapshot = {
  version: 2,
  generatedAt: new Date().toISOString(),
  sourceUrl: normalizedBaseUrl,
  media: mediaStats,
  responses,
};

await mkdir(path.dirname(outputFile), { recursive: true });
await backupPreviousSnapshot();
await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

console.info(`[sync:strapi-snapshot] found ${mediaStats.cloudinaryUrlCount} Cloudinary media URLs`);

if (mediaStats.uploadUrls.length > 0) {
  console.warn(`[sync:strapi-snapshot] WARNING: found ${mediaStats.uploadUrls.length} /uploads media URLs.`);
  console.warn("[sync:strapi-snapshot] URLs were preserved as-is. Check Strapi media migration to Cloudinary.");

  for (const entry of mediaStats.uploadUrls.slice(0, 20)) {
    console.warn(`[sync:strapi-snapshot] /uploads at ${entry.path}: ${entry.url}`);
  }

  if (mediaStats.uploadUrls.length > 20) {
    console.warn(`[sync:strapi-snapshot] ...and ${mediaStats.uploadUrls.length - 20} more /uploads URLs`);
  }
}

console.info(`[sync:strapi-snapshot] wrote snapshot to ${outputFile}`);
