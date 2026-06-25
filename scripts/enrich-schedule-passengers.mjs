#!/usr/bin/env node
/**
 * Add passenger capacity to imported schedule JSON using data/ship-capacities.json.
 * Usage: node scripts/enrich-schedule-passengers.mjs [port-slug]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CAPACITY_PATH = path.join(ROOT, "data/ship-capacities.json");
const SCHEDULE_DIR = path.join(ROOT, "data/imported-schedules");

function normalizeKey(name) {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

function formatCapacity(min, max) {
  const fmt = (n) => n.toLocaleString("en-US");
  return min === max ? fmt(min) : `${fmt(min)} to ${fmt(max)}`;
}

function buildLookup(capacityData) {
  const map = new Map();
  for (const ship of capacityData.ships) {
    map.set(normalizeKey(ship.name), ship);
  }
  return map;
}

function lookup(map, shipName) {
  const key = normalizeKey(shipName);
  if (map.has(key)) return map.get(key);
  for (const [storedKey, record] of map) {
    if (storedKey.includes(key) || key.includes(storedKey)) return record;
  }
  return null;
}

const slug = process.argv[2];
const capacityData = JSON.parse(fs.readFileSync(CAPACITY_PATH, "utf8"));
const lookupMap = buildLookup(capacityData);

const files = slug
  ? [`${slug}.json`]
  : fs.readdirSync(SCHEDULE_DIR).filter((f) => f.endsWith(".json"));

let totalMatched = 0;
let totalEntries = 0;

for (const file of files) {
  const filePath = path.join(SCHEDULE_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${filePath}`);
    continue;
  }

  const entries = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let matched = 0;

  for (const entry of entries) {
    totalEntries++;
    const capacity = lookup(lookupMap, entry.ship);
    if (capacity) {
      entry.passengers = formatCapacity(capacity.min, capacity.max);
      matched++;
      totalMatched++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2) + "\n");
  console.log(`${file}: ${matched}/${entries.length} entries enriched`);
}

console.log(`\nTotal: ${totalMatched}/${totalEntries} schedule rows with passenger capacity`);
