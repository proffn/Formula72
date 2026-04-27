import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
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
  process.env.SNAPSHOT_STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  process.env.STRAPI_URL;

if (!baseUrl) {
  throw new Error(
    "Missing SNAPSHOT_STRAPI_URL (or NEXT_PUBLIC_STRAPI_URL / STRAPI_URL) for fallback snapshot sync.",
  );
}

const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
const fallbackUploadsDir =
  process.env.SNAPSHOT_STRAPI_UPLOADS_DIR ??
  process.env.STRAPI_UPLOADS_DIR ??
  path.resolve(projectRoot, "..", "formula72-cms", "public", "uploads");
const frontendUploadsDir = path.join(projectRoot, "public", "cms-uploads");
const frontendUploadsPath = "/cms-uploads";

const endpoints = [
  ["siteHeader", "/api/site-header?populate=*"],
  ["homePage", "/api/home-page?populate=*"],
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

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function getUploadFilename(url) {
  if (typeof url !== "string") {
    return null;
  }

  if (url.startsWith("/uploads/")) {
    return decodeURIComponent(url.slice("/uploads/".length));
  }

  try {
    const parsedUrl = new URL(url);
    const parsedBaseUrl = new URL(normalizedBaseUrl);

    if (parsedUrl.origin === parsedBaseUrl.origin && parsedUrl.pathname.startsWith("/uploads/")) {
      return decodeURIComponent(parsedUrl.pathname.slice("/uploads/".length));
    }
  } catch {
    return null;
  }

  return null;
}

async function localizeUploadUrls(value, stats) {
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => localizeUploadUrls(item, stats)));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const localized = {};

  for (const [key, nestedValue] of Object.entries(value)) {
    if (key === "url") {
      const filename = getUploadFilename(nestedValue);

      if (filename) {
        const sourceFile = path.join(fallbackUploadsDir, filename);
        const outputFile = path.join(frontendUploadsDir, filename);

        if (await pathExists(sourceFile)) {
          await mkdir(path.dirname(outputFile), { recursive: true });
          await copyFile(sourceFile, outputFile);
          stats.localizedUploadCount += 1;
          localized[key] = `${frontendUploadsPath}/${filename.replaceAll("\\", "/")}`;
          continue;
        }

        stats.unresolvedUploadUrls.push(nestedValue);
      }
    }

    localized[key] = await localizeUploadUrls(nestedValue, stats);
  }

  return localized;
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
  localizedUploadRoot: frontendUploadsPath,
  uploadSourceDir: path.relative(projectRoot, fallbackUploadsDir).replaceAll("\\", "/"),
  localizedUploadCount: 0,
  unresolvedUploadUrls: [],
};

const localizedResponses = await localizeUploadUrls(responses, mediaStats);

const snapshot = {
  version: 1,
  generatedAt: new Date().toISOString(),
  sourceUrl: normalizedBaseUrl,
  media: mediaStats,
  responses: localizedResponses,
};

const outputFile = path.join(projectRoot, "lib", "mock", "home.snapshot.json");
await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

if (mediaStats.localizedUploadCount > 0) {
  console.info(
    `[sync:fallback] localized ${mediaStats.localizedUploadCount} Strapi upload URLs to ${frontendUploadsPath}`,
  );
}

if (mediaStats.unresolvedUploadUrls.length > 0) {
  console.warn(
    `[sync:fallback] ${mediaStats.unresolvedUploadUrls.length} upload URLs were not copied. Set SNAPSHOT_STRAPI_UPLOADS_DIR if needed.`,
  );
}

console.info(`[sync:fallback] wrote snapshot to ${outputFile}`);
