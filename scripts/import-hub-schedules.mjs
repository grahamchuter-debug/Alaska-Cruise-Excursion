#!/usr/bin/env node
/**
 * Import all schedule hub ports that have CSV sources.
 * Usage: node scripts/import-hub-schedules.mjs [--delay-ms 12000] [--max-fetches 30] [--rounds 50]
 *
 * Skips ports that already have imported JSON entries unless --include-imported is passed.
 * Loops slow cache warming until each port is fully cached (or blocked / rounds exhausted).
 */

import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isPortFullyCached, loadImportState } from "./schedule-cache-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const HUB_PORTS = [
  "cozumel",
  "aruba",
  "grand-cayman",
  "nassau",
  "roatan",
  "st-maarten",
  "puerto-plata",
  "costa-maya",
  "puerto-limon",
  "st-thomas",
  "ocho-rios",
  "tortola",
  "st-kitts",
];

const args = process.argv.slice(2);
const delayIdx = args.indexOf("--delay-ms");
const fetchIdx = args.indexOf("--max-fetches");
const roundsIdx = args.indexOf("--rounds");
const delayMs = delayIdx >= 0 ? args[delayIdx + 1] : "30000";
const maxFetches = fetchIdx >= 0 ? args[fetchIdx + 1] : "5";
const maxRounds = roundsIdx >= 0 ? Number.parseInt(args[roundsIdx + 1], 10) : 50;
const force = args.includes("--force");

function run(cmd, cmdArgs) {
  const result = spawnSync(cmd, cmdArgs, { cwd: ROOT, stdio: "inherit" });
  return result.status ?? 1;
}

function isFetchBlocked() {
  if (force) return false;
  const state = loadImportState();
  if (!state.blockedUntil) return false;
  return new Date(state.blockedUntil) > new Date();
}

function warmPortCache(slug) {
  let round = 0;
  while (!isPortFullyCached(slug) && round < maxRounds) {
    if (isFetchBlocked()) {
      const state = loadImportState();
      throw new Error(`CruiseTimetables rate-limited until ${state.blockedUntil}`);
    }
    round++;
    console.log(`  cache round ${round}/${maxRounds} for ${slug}...`);
    const status = run("node", [
      "scripts/import-schedules-slow.mjs",
      slug,
      "--max-fetches",
      maxFetches,
      "--delay-ms",
      delayMs,
      "--force",
    ]);
    if (status !== 0) {
      throw new Error(`cache warming stopped for ${slug} (exit ${status})`);
    }
    if (isFetchBlocked()) {
      const state = loadImportState();
      throw new Error(`CruiseTimetables rate-limited until ${state.blockedUntil}`);
    }
    if (isPortFullyCached(slug)) break;
  }
  if (!isPortFullyCached(slug)) {
    throw new Error(`${slug} cache incomplete after ${maxRounds} round(s)`);
  }
}

function importEntryCount(slug) {
  const jsonPath = path.join(ROOT, "data/imported-schedules", `${slug}.json`);
  if (!fs.existsSync(jsonPath)) return 0;
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    return Array.isArray(data) ? data.length : 0;
  } catch {
    return 0;
  }
}

const skipImported = !args.includes("--include-imported");
const remaining = HUB_PORTS.filter((slug) => {
  if (!fs.existsSync(path.join(ROOT, "data/schedule-sources", `${slug}.csv`))) return false;
  return skipImported ? importEntryCount(slug) === 0 : true;
});

console.log(
  `Hub schedule import: ${remaining.length} port(s) queued` +
    (skipImported ? ` (${HUB_PORTS.length - remaining.length} already imported, skipped)` : ""),
);
if (remaining.length === 0) {
  console.log("Nothing to import. Use --include-imported to re-run all hubs.");
  process.exit(0);
}

for (const slug of remaining) {
  const csv = path.join(ROOT, "data/schedule-sources", `${slug}.csv`);
  if (!fs.existsSync(csv)) {
    console.log(`\nSkip ${slug} (no CSV)`);
    continue;
  }

  console.log(`\n========== ${slug} ==========`);
  try {
    warmPortCache(slug);
    const importStatus = run("node", ["scripts/import-schedules.mjs", slug]);
    if (importStatus !== 0) {
      throw new Error(`import-schedules.mjs ${slug} failed with ${importStatus}`);
    }
    const count = importEntryCount(slug);
    console.log(`  imported ${count} entries for ${slug}`);
  } catch (err) {
    console.error(`Stopped at ${slug}: ${err.message}`);
    if (isFetchBlocked()) {
      console.error(
        "Resume later with: npm run import:hub-schedules -- --delay-ms 20000 --max-fetches 15",
      );
    }
    process.exit(1);
  }
}

console.log("\nHub import queue complete.");
