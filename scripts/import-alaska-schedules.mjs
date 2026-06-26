#!/usr/bin/env node
/**
 * Import all Alaska schedule ports from data/schedule-sources/*.csv
 *
 * Usage:
 *   node scripts/import-alaska-schedules.mjs
 *   node scripts/import-alaska-schedules.mjs --prefer-cache
 *   node scripts/import-alaska-schedules.mjs --delay-ms=8000
 */

import { execSync } from "child_process";
import { PORT_CONFIG } from "./schedule-port-config.mjs";

const args = process.argv.slice(2);
const extraFlags = args.filter((a) => a.startsWith("--")).join(" ");
const ports = Object.keys(PORT_CONFIG);
const interPortDelayMs = Number.parseInt(
  args.find((a) => a.startsWith("--port-delay-ms="))?.split("=")[1] ?? "10000",
  10,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  for (const port of ports) {
    console.log(`\n########## ${port} ##########`);
    try {
      execSync(`node scripts/import-schedules.mjs ${port} ${extraFlags}`.trim(), {
        stdio: "inherit",
      });
    } catch {
      console.error(`Import failed for ${port}`);
    }
    await sleep(interPortDelayMs);
  }

  console.log("\nAll Alaska schedule imports finished.");
}

main();
