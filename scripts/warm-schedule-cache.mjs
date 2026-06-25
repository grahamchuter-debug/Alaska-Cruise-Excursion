#!/usr/bin/env node
/**
 * Fetch CruiseTimetables pages into data/schedule-cache/{slug}/ with long delays to avoid 429.
 * Usage: node scripts/warm-schedule-cache.mjs tortola [delayMs]
 */

import fs from "fs";
import path from "path";
import {
  CACHE_ROOT,
  SOURCES_DIR,
  cacheFileName,
  discoverPageUrls,
  fetchHtml,
  parseCsv,
  sleep,
  writeCachedPage,
} from "./schedule-cache-utils.mjs";

const DELAY_MS = Number.parseInt(process.argv[3] ?? "45000", 10);

async function fetchHtmlWithRetry(url, attempt = 1) {
  try {
    return await fetchHtml(url);
  } catch (err) {
    if (err.status === 429 && attempt <= 10) {
      const waitMs = attempt * 10000;
      console.log(`  429 on ${url}, wait ${waitMs / 1000}s (attempt ${attempt})`);
      await sleep(waitMs);
      return fetchHtmlWithRetry(url, attempt + 1);
    }
    throw err;
  }
}

async function cacheUrl(cacheDir, url) {
  const cachePath = path.join(cacheDir, cacheFileName(url));
  if (fs.existsSync(cachePath)) {
    console.log(`  skip (exists) ${cacheFileName(url)}`);
    return fs.readFileSync(cachePath, "utf8");
  }
  const html = await fetchHtmlWithRetry(url);
  writeCachedPage(cacheDir, url, html);
  console.log(`  saved ${cacheFileName(url)} (${html.length} bytes)`);
  return html;
}

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/warm-schedule-cache.mjs <port-slug> [delayMs]");
  process.exit(1);
}

const csvPath = path.join(SOURCES_DIR, `${slug}.csv`);
if (!fs.existsSync(csvPath)) {
  console.error(`Missing CSV: ${csvPath}`);
  process.exit(1);
}

const cacheDir = path.join(CACHE_ROOT, slug);
const monthUrls = parseCsv(csvPath);

console.log(`Warming cache for ${slug}: ${monthUrls.length} months, ${DELAY_MS}ms delay`);

for (const { monthLabel, url } of monthUrls) {
  console.log(`\n${monthLabel}`);
  try {
    const firstHtml = await cacheUrl(cacheDir, url);
    const extraUrls = discoverPageUrls(firstHtml, url).filter((u) => u !== url);
    for (const extraUrl of extraUrls) {
      await sleep(DELAY_MS);
      await cacheUrl(cacheDir, extraUrl);
    }
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
  }
  await sleep(DELAY_MS);
}

console.log("\nDone.");
