#!/usr/bin/env node
/**
 * Import all Alaska schedule ports from data/schedule-sources/*.csv
 * Usage: node scripts/import-alaska-schedules.mjs
 */

import { execSync } from "child_process";
import { PORT_CONFIG } from "./schedule-port-config.mjs";

const ports = Object.keys(PORT_CONFIG);

for (const port of ports) {
  console.log(`\n########## ${port} ##########`);
  try {
    execSync(`node scripts/import-schedules.mjs ${port}`, { stdio: "inherit" });
  } catch {
    console.error(`Import failed for ${port}`);
  }
}

console.log("\nAll Alaska schedule imports finished.");
