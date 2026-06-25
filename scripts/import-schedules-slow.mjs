#!/usr/bin/env node
/**
 * Slow orchestrator for CruiseTimetables schedule cache warming and import.
 * Designed for cron or repeated manual runs with strict rate limits.
 *
 * Usage:
 *   node scripts/import-schedules-slow.mjs [--list] [--import-ready] [--force]
 *   node scripts/import-schedules-slow.mjs st-kitts --max-fetches 3 --delay-ms 30000
 *
 * Options:
 *   --max-fetches N   Max HTTP fetches per run (default 1)
 *   --delay-ms MS     Delay between fetches (default 30000)
 *   --import-ready    Import ports whose cache is complete
 *   --list            Show ports needing CSV, cache, or import
 *   --force           Ignore blockedUntil cooldown
 */

import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { ALL_PORT_SLUGS, PORT_CONFIG } from "./schedule-port-config.mjs";
import {
  CACHE_ROOT,
  OUTPUT_DIR,
  ROOT,
  SOURCES_DIR,
  cacheFileName,
  discoverPageUrls,
  fetchHtml,
  getUncachedUrls,
  isPortFullyCached,
  loadImportState,
  parseCsv,
  readCachedPage,
  saveImportState,
  sleep,
  writeCachedPage,
} from "./schedule-cache-utils.mjs";

const BLOCK_HOURS = 8;
const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const portFilter = positional[0] ?? null;

function parseArg(name, fallback) {
  const idx = args.indexOf(name);
  if (idx === -1) return fallback;
  const val = args[idx + 1];
  if (val == null || val.startsWith("--")) return fallback;
  return val;
}

const maxFetches = Number.parseInt(parseArg("--max-fetches", "1"), 10);
const delayMs = Number.parseInt(parseArg("--delay-ms", "30000"), 10);
const importReady = args.includes("--import-ready");
const listMode = args.includes("--list");
const force = args.includes("--force");

const slugs = portFilter
  ? [portFilter]
  : ALL_PORT_SLUGS.filter((slug) => fs.existsSync(path.join(SOURCES_DIR, `${slug}.csv`)));

function importEntryCount(slug) {
  const jsonPath = path.join(OUTPUT_DIR, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) return 0;
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    return Array.isArray(data) ? data.length : 0;
  } catch {
    return 0;
  }
}

function portStatus(slug) {
  const csvPath = path.join(SOURCES_DIR, `${slug}.csv`);
  const hasCsv = fs.existsSync(csvPath);
  const uncached = hasCsv ? getUncachedUrls(slug) : null;
  const uncachedCount = uncached?.length ?? null;
  const fullyCached = hasCsv && isPortFullyCached(slug);
  const entries = importEntryCount(slug);
  const needsImport = fullyCached && entries === 0;

  return {
    slug,
    name: PORT_CONFIG[slug]?.name ?? slug,
    hasCsv,
    uncachedCount,
    fullyCached,
    importEntries: entries,
    needsImport,
  };
}

function listPorts() {
  const missingCsv = ALL_PORT_SLUGS.filter(
    (slug) => !fs.existsSync(path.join(SOURCES_DIR, `${slug}.csv`)),
  );
  const needsCache = ALL_PORT_SLUGS.filter((slug) => {
    if (!fs.existsSync(path.join(SOURCES_DIR, `${slug}.csv`))) return false;
    return !isPortFullyCached(slug);
  });
  const needsImport = ALL_PORT_SLUGS.filter((slug) => {
    if (!fs.existsSync(path.join(SOURCES_DIR, `${slug}.csv`))) return false;
    return isPortFullyCached(slug) && importEntryCount(slug) === 0;
  });
  const imported = ALL_PORT_SLUGS.filter((slug) => importEntryCount(slug) > 0);

  console.log("Schedule import status\n");
  console.log(`Missing CSV (${missingCsv.length}):`);
  for (const slug of missingCsv) {
    console.log(`  - ${slug} (${PORT_CONFIG[slug]?.name})`);
  }

  console.log(`\nNeeds cache warming (${needsCache.length}):`);
  for (const slug of needsCache) {
    const uncached = getUncachedUrls(slug)?.length ?? 0;
    console.log(`  - ${slug}: ${uncached} uncached URL(s)`);
  }

  console.log(`\nReady to import (${needsImport.length}):`);
  for (const slug of needsImport) {
    console.log(`  - ${slug}`);
  }

  console.log(`\nImported (${imported.length}):`);
  for (const slug of imported) {
    console.log(`  - ${slug}: ${importEntryCount(slug)} entries`);
  }
}

function collectFetchQueue() {
  const queue = [];

  for (const slug of slugs) {
    const csvPath = path.join(SOURCES_DIR, `${slug}.csv`);
    if (!fs.existsSync(csvPath)) continue;

    const cacheDir = path.join(CACHE_ROOT, slug);
    const monthUrls = parseCsv(csvPath);

    for (const { monthLabel, url } of monthUrls) {
      if (!readCachedPage(cacheDir, url)) {
        queue.push({ slug, monthLabel, url, kind: "month" });
        continue;
      }

      const cached = readCachedPage(cacheDir, url);
      for (const extraUrl of discoverPageUrls(cached, url)) {
        if (extraUrl === url) continue;
        if (!readCachedPage(cacheDir, extraUrl)) {
          queue.push({ slug, monthLabel, url: extraUrl, kind: "offset" });
        }
      }
    }
  }

  return queue;
}

function runImport(slug) {
  console.log(`\nRunning import for ${slug}...`);
  const result = spawnSync("node", ["scripts/import-schedules.mjs", slug], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  return result.status === 0;
}

async function main() {
  if (portFilter && !PORT_CONFIG[portFilter]) {
    console.error(`Unknown port slug: ${portFilter}`);
    process.exit(1);
  }

  if (listMode) {
    listPorts();
    return;
  }

  const state = loadImportState();
  state.lastRun = new Date().toISOString();

  if (state.blockedUntil && !force) {
    const blockedUntil = new Date(state.blockedUntil);
    if (blockedUntil > new Date()) {
      console.log(
        `Blocked until ${state.blockedUntil} (HTTP 429 cooldown). Use --force to override.`,
      );
      saveImportState(state);
      return;
    }
  }

  if (importReady) {
    let imported = 0;
    for (const slug of slugs) {
      if (!isPortFullyCached(slug)) continue;
      const ok = runImport(slug);
      if (ok) {
        imported++;
        state.ports[slug] = {
          ...(state.ports[slug] ?? {}),
          lastImport: new Date().toISOString(),
          importEntryCount: importEntryCount(slug),
        };
      }
    }
    saveImportState(state);
    console.log(`\nImport-ready pass complete (${imported} port(s)).`);
    return;
  }

  const queue = collectFetchQueue();
  if (queue.length === 0) {
    console.log("All cached URLs present for configured ports.");
    const ready = slugs.filter((slug) => isPortFullyCached(slug));
    if (ready.length) {
      console.log(`Fully cached: ${ready.join(", ")}`);
      console.log("Run with --import-ready to import cached ports.");
    }
    saveImportState(state);
    return;
  }

  console.log(
    `Slow fetch: up to ${maxFetches} URL(s), ${delayMs}ms delay, ${queue.length} remaining in queue`,
  );

  let fetches = 0;

  for (const item of queue) {
    if (fetches >= maxFetches) break;

    const cacheDir = path.join(CACHE_ROOT, item.slug);
    const fileName = cacheFileName(item.url);

    if (readCachedPage(cacheDir, item.url)) {
      continue;
    }

    console.log(
      `\n[${fetches + 1}/${maxFetches}] ${item.slug} ${item.monthLabel} (${item.kind}) ${fileName}`,
    );

    try {
      const html = await fetchHtml(item.url);
      writeCachedPage(cacheDir, item.url, html);
      console.log(`  saved ${fileName} (${html.length} bytes)`);

      state.ports[item.slug] = {
        ...(state.ports[item.slug] ?? {}),
        lastFetch: new Date().toISOString(),
        lastFetchUrl: item.url,
      };

      fetches++;

      if (item.kind === "month") {
        const extras = discoverPageUrls(html, item.url).filter((u) => u !== item.url);
        if (extras.length) {
          console.log(`  discovered ${extras.length} pagination URL(s)`);
        }
      }

      if (fetches < maxFetches) {
        console.log(`  waiting ${delayMs / 1000}s...`);
        await sleep(delayMs);
      }
    } catch (err) {
      if (err.status === 429) {
        const blockedUntil = new Date(Date.now() + BLOCK_HOURS * 60 * 60 * 1000);
        state.blockedUntil = blockedUntil.toISOString();
        saveImportState(state);
        console.error(
          `\nHTTP 429 — blocking further fetches until ${state.blockedUntil} (~${BLOCK_HOURS}h).`,
        );
        process.exit(0);
      }
      console.error(`  FAILED: ${err.message}`);
      state.ports[item.slug] = {
        ...(state.ports[item.slug] ?? {}),
        lastError: err.message,
        lastErrorAt: new Date().toISOString(),
      };
    }
  }

  saveImportState(state);

  const remaining = collectFetchQueue().length;
  console.log(`\nDone. ${fetches} fetch(es) this run, ${remaining} URL(s) still uncached.`);

  if (remaining === 0 && slugs.length === 1 && isPortFullyCached(slugs[0])) {
    console.log(`Cache complete for ${slugs[0]}. Running import...`);
    runImport(slugs[0]);
    state.ports[slugs[0]] = {
      ...(state.ports[slugs[0]] ?? {}),
      lastImport: new Date().toISOString(),
      importEntryCount: importEntryCount(slugs[0]),
    };
    saveImportState(state);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
