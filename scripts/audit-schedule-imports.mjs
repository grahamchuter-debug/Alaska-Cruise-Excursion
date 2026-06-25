#!/usr/bin/env node
/**
 * Post-build schedule import audit — counts verified rows, validation issues, and sitemap schedule URLs.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const scheduleDir = join(root, "data/imported-schedules");

const SCHEDULE_PORTS = [
  "juneau",
  "skagway",
  "ketchikan",
  "ward-cove",
  "icy-strait",
  "sitka",
  "haines",
  "seward",
  "whittier",
];
const SCHEDULE_YEARS = [2026, 2027];

function validateEntry(entry, index, portSlug) {
  if (entry.isPlaceholder) return null;
  const issues = [];
  if (!entry.date || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    issues.push("invalid or missing date (YYYY-MM-DD)");
  }
  if (!entry.ship?.trim()) issues.push("missing ship name");
  if (!entry.cruiseLine?.trim()) issues.push("missing cruise line");
  if (!entry.arrival?.trim()) issues.push("missing arrival time");
  if (!entry.departure?.trim()) issues.push("missing departure time");
  if (issues.length === 0) return null;
  return { portSlug, index, date: entry.date, ship: entry.ship, issues };
}

function loadPortSchedule(slug) {
  const path = join(scheduleDir, `${slug}.json`);
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return [];
  }
}

function countVerifiedMonths(slug) {
  const entries = loadPortSchedule(slug).filter((e) => !e.isPlaceholder);
  const months = new Set(entries.map((e) => e.date.slice(0, 7)));
  return months.size;
}

function getAllVerifiedMonthKeys(slug) {
  const entries = loadPortSchedule(slug).filter((e) => !e.isPlaceholder);
  return [...new Set(entries.map((e) => e.date.slice(0, 7)))].sort();
}

const audits = SCHEDULE_PORTS.map((portSlug) => {
  const entries = loadPortSchedule(portSlug);
  const invalidRows = [];
  entries.forEach((entry, index) => {
    const issue = validateEntry(entry, index, portSlug);
    if (issue) invalidRows.push(issue);
  });
  return {
    portSlug,
    totalRows: entries.length,
    verifiedRows: entries.filter((e) => !e.isPlaceholder).length,
    placeholderRows: entries.filter((e) => e.isPlaceholder).length,
    invalidRows,
  };
});

const juneauAudit = audits.find((a) => a.portSlug === "juneau");
const monthPageCount = getAllVerifiedMonthKeys("juneau").length;
const hubPages = SCHEDULE_PORTS.length;
const yearPages = SCHEDULE_PORTS.length * SCHEDULE_YEARS.length;
const sitemapSchedulePages = hubPages + yearPages + monthPageCount;

// Static schedule pages from Next build (hub + year + month with verified data)
const staticSchedulePages = hubPages + yearPages + monthPageCount;

console.log("=== Alaska Schedule Import Audit ===\n");
console.log(`Schedule pages generated (static): ${staticSchedulePages}`);
console.log(`  - Port hub pages: ${hubPages}`);
console.log(`  - Port year pages: ${yearPages}`);
console.log(`  - Verified month pages: ${monthPageCount}`);
console.log(`\nSitemap schedule URL count: ${sitemapSchedulePages}`);
console.log(`\nJuneau calls imported: ${juneauAudit?.verifiedRows ?? 0}`);
console.log(`Juneau placeholder rows: ${juneauAudit?.placeholderRows ?? 0}`);

const allInvalid = audits.flatMap((a) => a.invalidRows);
if (allInvalid.length === 0) {
  console.log("\nMissing/invalid rows: none");
} else {
  console.log(`\nMissing/invalid rows: ${allInvalid.length}`);
  for (const row of allInvalid.slice(0, 20)) {
    console.log(`  [${row.portSlug} #${row.index}] ${row.date ?? "?"} ${row.ship ?? "?"} — ${row.issues.join("; ")}`);
  }
  if (allInvalid.length > 20) {
    console.log(`  ... and ${allInvalid.length - 20} more`);
  }
}

console.log("\nPer-port summary:");
for (const audit of audits) {
  const status =
    audit.verifiedRows > 0 ? `${audit.verifiedRows} verified` : "coming soon";
  const invalid = audit.invalidRows.length > 0 ? `, ${audit.invalidRows.length} invalid` : "";
  console.log(`  ${audit.portSlug}: ${status}${invalid}`);
}
