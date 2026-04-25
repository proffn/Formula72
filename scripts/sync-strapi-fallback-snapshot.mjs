import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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

const snapshot = {
  version: 1,
  generatedAt: new Date().toISOString(),
  sourceUrl: normalizedBaseUrl,
  responses,
};

const outputFile = path.join(process.cwd(), "lib", "mock", "home.snapshot.json");
await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

console.info(`[sync:fallback] wrote snapshot to ${outputFile}`);
