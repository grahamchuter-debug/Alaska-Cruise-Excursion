#!/usr/bin/env node
/**
 * Write plain-text page content into data/schedule-cache/{slug}/
 * Usage: node scripts/seed-schedule-cache.mjs st-kitts "https://www.cruisetimetables.com/..." < page.txt
 */

import fs from "fs";
import path from "path";
import { CACHE_ROOT, writeCachedPage } from "./schedule-cache-utils.mjs";

const [slug, url] = process.argv.slice(2);
if (!slug || !url) {
  console.error(
    'Usage: node scripts/seed-schedule-cache.mjs <slug> "<url>" < page.txt',
  );
  process.exit(1);
}

const content = fs.readFileSync(0, "utf8");
const cacheDir = path.join(CACHE_ROOT, slug);
writeCachedPage(cacheDir, url, content);
console.log(`Wrote cache for ${url}`);
