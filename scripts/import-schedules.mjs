#!/usr/bin/env node
/**
 * Import verified cruise ship schedules from monthly CSV source URLs.
 * Usage: node scripts/import-schedules.mjs [port-slug]
 * Example: node scripts/import-schedules.mjs st-thomas
 */

import fs from "fs";
import path from "path";
import { PORT_CONFIG } from "./schedule-port-config.mjs";
import {
  OUTPUT_DIR,
  ROOT,
  SOURCES_DIR,
  discoverPageUrls,
  fetchHtml,
  parseCsv,
  readCachedPage,
  writeCachedPage,
} from "./schedule-cache-utils.mjs";

const CAPACITY_PATH = path.join(ROOT, "data/ship-capacities.json");

const MONTH_MAP = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

function normalizeShipKey(name) {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

function formatPassengerCapacity(min, max) {
  const fmt = (n) => n.toLocaleString("en-US");
  return min === max ? fmt(min) : `${fmt(min)} to ${fmt(max)}`;
}

function loadCapacityLookup() {
  if (!fs.existsSync(CAPACITY_PATH)) return null;
  const data = JSON.parse(fs.readFileSync(CAPACITY_PATH, "utf8"));
  const map = new Map();
  for (const ship of data.ships) {
    map.set(normalizeShipKey(ship.name), ship);
  }
  return map;
}

function lookupCapacity(map, shipName) {
  if (!map) return null;
  const key = normalizeShipKey(shipName);
  if (map.has(key)) return map.get(key);
  for (const [storedKey, record] of map) {
    if (storedKey.includes(key) || key.includes(storedKey)) return record;
  }
  return null;
}

function inferCruiseLine(ship) {
  const s = ship.trim();
  if (/^Norwegian\b/i.test(s)) return "Norwegian Cruise Line";
  if (/^Carnival\b/i.test(s)) return "Carnival Cruise Line";
  if (/^Disney\b/i.test(s)) return "Disney Cruise Line";
  if (/^Celebrity\b/i.test(s)) return "Celebrity Cruises";
  if (/^MSC\b/i.test(s)) return "MSC Cruises";
  if (/\bPrincess\b/i.test(s)) return "Princess Cruises";
  if (/\bOf The Seas\b/i.test(s)) return "Royal Caribbean";
  if (/^Star Of The Seas|^Icon Of The Seas|^Wonder Of The Seas|^Harmony Of The Seas/i.test(s)) {
    return "Royal Caribbean";
  }
  if (/^Grandeur Of The Seas|^Rhapsody Of The Seas|^Enchantment Of The Seas/i.test(s)) {
    return "Royal Caribbean";
  }
  if (/^Azamara\b/i.test(s)) return "Azamara";
  if (/^Holland America|^Nieuw Statendam|^Koningsdam/i.test(s)) return "Holland America Line";
  if (/^Viking\b/i.test(s)) return "Viking Ocean Cruises";
  if (/^Seabourn\b/i.test(s)) return "Seabourn";
  if (/^Oceania\b/i.test(s)) return "Oceania Cruises";
  if (/^Regent\b/i.test(s)) return "Regent Seven Seas";
  if (/^Marella\b/i.test(s)) return "Marella Cruises";
  if (/^Silver\b/i.test(s)) return "Silversea";
  if (/^Wind Star|^Star Pride/i.test(s)) return "Windstar Cruises";
  return "Verify with cruise line";
}

function formatTime(hhmm) {
  if (!hhmm || hhmm.length < 4) return hhmm;
  return `${hhmm.slice(0, 2)}:${hhmm.slice(2, 4)}`;
}

function parseMonthDay(monthDay, year) {
  const [dayStr, monStr] = monthDay.trim().split(/\s+/);
  const month = MONTH_MAP[monStr.toLowerCase().slice(0, 3)];
  if (!month) return null;
  const day = String(dayStr).padStart(2, "0");
  return `${year}-${String(month).padStart(2, "0")}-${day}`;
}

function minutesFromTime(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function calcTimeInPort(arrival, departure) {
  const a = minutesFromTime(arrival);
  const d = minutesFromTime(departure);
  if (Number.isNaN(a) || Number.isNaN(d) || d <= a) return "-";
  const diff = d - a;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeParseText(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPortCall(itinerary, config, year) {
  if (!config.itineraryPortRegex) return null;
  const portMatch = itinerary.match(config.itineraryPortRegex);
  if (!portMatch) return null;

  const monthDay = portMatch[1];
  const arrivalRange = portMatch[2];
  const departureRange = portMatch[3];
  const arrivalOnly = portMatch[4];
  const departureOnly = portMatch[5];

  if (!arrivalRange && !arrivalOnly && !departureOnly) return null;

  const isoDate = parseMonthDay(monthDay, year);
  if (!isoDate) return null;

  let arrival = "TBC";
  let departure = "TBC";
  if (arrivalRange && departureRange) {
    arrival = formatTime(arrivalRange);
    departure = formatTime(departureRange);
  } else if (arrivalOnly) {
    arrival = formatTime(arrivalOnly);
  } else if (departureOnly) {
    departure = formatTime(departureOnly);
  }

  const timeInPort =
    arrival !== "TBC" && departure !== "TBC" ? calcTimeInPort(arrival, departure) : undefined;

  return { isoDate, arrival, departure, timeInPort };
}

function monthYearFromUrl(url) {
  const match = url.match(/-([a-z]{3})(\d{4})(?:\.html|\?|$)/i);
  if (!match) return null;
  const month = MONTH_MAP[match[1].toLowerCase()];
  if (!month) return null;
  return { month, year: Number(match[2]) };
}

function parseTableEntries(text, url, config) {
  const plain = normalizeParseText(text.includes("<") ? stripHtml(text) : text).replace(
    /&#\d+;/g,
    " ",
  );
  const period = monthYearFromUrl(url);
  if (!period) return [];

  const entries = [];
  const re =
    /(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+([A-Za-z][A-Za-z0-9\s'.-]+?)\s+a\s+(\d{4})\s+d\s+(\d{4})/gi;

  let match;
  while ((match = re.exec(plain))) {
    const day = Number(match[2]);
    const ship = match[3].trim().replace(/\s+/g, " ");
    const arrival = formatTime(match[4]);
    const departure = formatTime(match[5]);
    const isoDate = `${period.year}-${String(period.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    entries.push({
      date: isoDate,
      ship,
      cruiseLine: inferCruiseLine(ship),
      arrival,
      departure,
      timeInPort: calcTimeInPort(arrival, departure),
      verified: true,
      source: "cruisetimetables",
      ...(config.tenderNote ? { notes: config.tenderNote } : {}),
    });
  }

  return entries;
}

function parseEntriesFromText(text, config) {
  if (config.parseMode === "table") return [];

  const plain = normalizeParseText(text.includes("<") ? stripHtml(text) : text);
  const entries = [];
  const blockRe =
    /Arriving\s+(?:\w+\s+)?(\d{1,2})\s+(\w{3})\s+(\d{4})[\s\S]*?Ship\s+(.+?)\s+More details[\s\S]*?Cruise Itinerary\s*:\s*([\s\S]*?)(?:port loads|ChangeMonth|©CruiseTimetables)/gi;

  let match;
  while ((match = blockRe.exec(plain))) {
    const year = match[3];
    const ship = match[4].trim().replace(/\s+/g, " ");
    const itinerary = match[5];
    const call = extractPortCall(itinerary, config, year);
    if (!call) continue;

    entries.push({
      date: call.isoDate,
      ship,
      cruiseLine: inferCruiseLine(ship),
      arrival: call.arrival,
      departure: call.departure,
      ...(call.timeInPort ? { timeInPort: call.timeInPort } : {}),
      verified: true,
      source: "cruisetimetables",
      ...(config.tenderNote ? { notes: config.tenderNote } : {}),
    });
  }

  return entries;
}

async function fetchHtmlWithRetry(url, attempt = 1) {
  if (cacheOnly) {
    const err = new Error(`No cache for ${url} (--cache-only)`);
    err.status = 404;
    throw err;
  }
  try {
    return await fetchHtml(url);
  } catch (err) {
    if (err.status === 429 && attempt <= 8) {
      const waitMs = attempt * 5000;
      process.stdout.write(`429, retry in ${waitMs / 1000}s... `);
      await new Promise((r) => setTimeout(r, waitMs));
      return fetchHtmlWithRetry(url, attempt + 1);
    }
    throw err;
  }
}

async function fetchAllPagesForMonth(url, config, cacheDir) {
  let firstHtml = readCachedPage(cacheDir, url);
  if (!firstHtml) {
    firstHtml = await fetchHtmlWithRetry(url);
    writeCachedPage(cacheDir, url, firstHtml);
  }

  const pageUrls = discoverPageUrls(firstHtml, url);
  const allEntries = [];
  const seen = new Set();

  for (const pageUrl of pageUrls) {
    let html = pageUrl === url ? firstHtml : readCachedPage(cacheDir, pageUrl);
    if (!html) {
      html = await fetchHtmlWithRetry(pageUrl);
      writeCachedPage(cacheDir, pageUrl, html);
    }
    for (const entry of [
      ...parseEntriesFromText(html, config),
      ...(config.parseMode === "table" ? parseTableEntries(html, pageUrl, config) : []),
    ]) {
      const key = `${entry.date}|${entry.ship}|${entry.arrival}|${entry.departure}`;
      if (!seen.has(key)) {
        seen.add(key);
        allEntries.push(entry);
      }
    }
  }

  return allEntries;
}

const argv = process.argv.slice(2);
const cacheOnly = argv.includes("--cache-only");
const slug = argv.find((a) => !a.startsWith("--")) || "juneau";
const config = PORT_CONFIG[slug];
if (!config) {
  console.error(`Unknown port slug: ${slug}. Add config to PORT_CONFIG.`);
  process.exit(1);
}

const csvPath = path.join(SOURCES_DIR, `${slug}.csv`);
if (!fs.existsSync(csvPath)) {
  console.error(`Missing CSV: ${csvPath}`);
  process.exit(1);
}

const monthUrls = parseCsv(csvPath);
const cacheDir = path.join(ROOT, "data/schedule-cache", slug);
console.log(`Importing ${slug} from ${monthUrls.length} monthly URLs...`);

const allEntries = [];
const seen = new Set();
const capacityLookup = loadCapacityLookup();
const failedMonths = [];

for (const { monthLabel, url } of monthUrls) {
  process.stdout.write(`  ${monthLabel}... `);
  try {
    const cached = readCachedPage(cacheDir, url);
    if (cached) process.stdout.write("(cache) ");
    const entries = await fetchAllPagesForMonth(url, config, cacheDir);
    let added = 0;
    for (const entry of entries) {
      const key = `${entry.date}|${entry.ship}|${entry.arrival}|${entry.departure}`;
      if (!seen.has(key)) {
        seen.add(key);
        allEntries.push(entry);
        added++;
      }
    }
    console.log(`${added} ships`);
  } catch (err) {
    failedMonths.push(monthLabel);
    console.log(`FAILED: ${err.message}`);
  }
  if (!readCachedPage(cacheDir, url)) {
    await new Promise((r) => setTimeout(r, 3500));
  }
}

if (capacityLookup) {
  let enriched = 0;
  for (const entry of allEntries) {
    const capacity = lookupCapacity(capacityLookup, entry.ship);
    if (capacity) {
      entry.passengers = formatPassengerCapacity(capacity.min, capacity.max);
      enriched++;
    }
  }
  console.log(`Passenger capacities applied to ${enriched}/${allEntries.length} entries`);
} else {
  console.warn("No ship-capacities.json found, run: node scripts/import-ship-capacities.mjs");
}

allEntries.sort((a, b) => a.date.localeCompare(b.date) || a.arrival.localeCompare(b.arrival));

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = path.join(OUTPUT_DIR, `${slug}.json`);
fs.writeFileSync(outPath, JSON.stringify(allEntries, null, 2) + "\n");
console.log(`\nWrote ${allEntries.length} entries to ${outPath}`);
if (failedMonths.length) {
  console.log(`Failed months (${failedMonths.length}): ${failedMonths.join(", ")}`);
}
