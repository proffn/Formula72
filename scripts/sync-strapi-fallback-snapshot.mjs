import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");

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
const endpoints = [
  ["siteHeader", "/api/site-header?populate=*"],
  ["homePage", "/api/home-page?populate=*"],
  ["productionVideo", "/api/production-video-page?populate=*"],
  ["bannerSection", "/api/banner-section?populate[banners][populate]=*"],
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

function isCloudinaryUrl(url) {
  return typeof url === "string" && url.startsWith("https://res.cloudinary.com/");
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

const responses = {};

for (const [key, endpoint] of endpoints) {
  const url = `${normalizedBaseUrl}${endpoint}`;
  responses[key] = await fetchJson(url);
  console.info(
    responses[key] === null
      ? `[sync:fallback] skipped ${key} (endpoint unavailable or forbidden)`
      : `[sync:fallback] fetched ${key}`,
  );
}

const mediaStats = {
  cloudinaryUrlCount: 0,
  uploadUrls: [],
};

collectMediaUrlStats(responses, mediaStats);

const snapshot = {
  version: 1,
  generatedAt: new Date().toISOString(),
  sourceUrl: normalizedBaseUrl,
  media: mediaStats,
  responses,
};

const outputFile = path.join(projectRoot, "lib", "mock", "home.snapshot.json");
const backupDir = path.join(projectRoot, "lib", "mock", "snapshot-backups");
await mkdir(path.dirname(outputFile), { recursive: true });

try {
  const previousSnapshot = await readFile(outputFile, "utf8");
  const backupName = `home.snapshot.${new Date().toISOString().replaceAll(":", "-")}.json`;
  await mkdir(backupDir, { recursive: true });
  await writeFile(path.join(backupDir, backupName), previousSnapshot, "utf8");
  console.info(`[sync:fallback] backed up previous snapshot to lib/mock/snapshot-backups/${backupName}`);
} catch {
  console.info("[sync:fallback] no previous snapshot found, skipping backup");
}

await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

console.info(`[sync:fallback] found ${mediaStats.cloudinaryUrlCount} Cloudinary media URLs`);

if (mediaStats.uploadUrls.length > 0) {
  console.warn(`[sync:fallback] WARNING: found ${mediaStats.uploadUrls.length} /uploads media URLs.`);
  console.warn("[sync:fallback] These URLs were preserved as-is. Check Strapi media migration to Cloudinary.");
  for (const entry of mediaStats.uploadUrls.slice(0, 20)) {
    console.warn(`[sync:fallback] /uploads at ${entry.path}: ${entry.url}`);
  }

  if (mediaStats.uploadUrls.length > 20) {
    console.warn(`[sync:fallback] ...and ${mediaStats.uploadUrls.length - 20} more /uploads URLs`);
  }
}

console.info(`[sync:fallback] wrote snapshot to ${outputFile}`);
