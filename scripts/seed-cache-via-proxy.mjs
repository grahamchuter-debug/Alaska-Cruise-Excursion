#!/usr/bin/env node
/**
 * Seed schedule cache via r.jina.ai reader proxy when direct CruiseTimetables fetch is blocked.
 * Usage: node scripts/seed-cache-via-proxy.mjs st-kitts [delayMs]
 */

import path from "path";
import { PORT_CONFIG } from "./schedule-port-config.mjs";
import {
  CACHE_ROOT,
  SOURCES_DIR,
  discoverPageUrls,
  parseCsv,
  readCachedPage,
  sleep,
  writeCachedPage,
} from "./schedule-cache-utils.mjs";

const slug = process.argv[2];
const delayMs = Number.parseInt(process.argv[3] ?? "5000", 10);

if (!slug || !PORT_CONFIG[slug]) {
  console.error("Usage: node scripts/seed-cache-via-proxy.mjs <port-slug> [delayMs]");
  process.exit(1);
}

const csvPath = path.join(SOURCES_DIR, `${slug}.csv`);
const cacheDir = path.join(CACHE_ROOT, slug);
const monthUrls = parseCsv(csvPath);

async function fetchViaProxy(url) {
  const proxyUrl = `https://r.jina.ai/${url}`;
  const res = await fetch(proxyUrl);
  if (!res.ok) throw new Error(`Proxy HTTP ${res.status} for ${url}`);
  return res.text();
}

async function seedUrl(url) {
  if (readCachedPage(cacheDir, url)) {
    console.log(`  skip (cached) ${url}`);
    return readCachedPage(cacheDir, url);
  }

  const text = await fetchViaProxy(url);
  writeCachedPage(cacheDir, url, text);
  console.log(`  saved ${url} (${text.length} bytes via proxy)`);
  return text;
}

console.log(`Seeding ${slug} via proxy: ${monthUrls.length} months, ${delayMs}ms delay`);

for (const { monthLabel, url } of monthUrls) {
  console.log(`\n${monthLabel}`);
  try {
    const firstHtml = await seedUrl(url);
    const extraUrls = discoverPageUrls(firstHtml, url).filter((u) => u !== url);
    for (const extraUrl of extraUrls) {
      await sleep(delayMs);
      await seedUrl(extraUrl);
    }
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
  }
  await sleep(delayMs);
}

console.log("\nDone.");
