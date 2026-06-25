#!/usr/bin/env node
/**
 * Import cruise ship passenger capacities from CruiseMapper.
 * Sources:
 * - https://www.cruisemapper.com/wiki/761-cruise-ship-passenger-capacity-ratings
 * - https://www.cruisemapper.com/ships (paginated ship listings)
 *
 * Usage: node scripts/import-ship-capacities.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "data/ship-capacities.json");

const WIKI_URL =
  "https://www.cruisemapper.com/wiki/761-cruise-ship-passenger-capacity-ratings";
const SHIPS_URL = "https://www.cruisemapper.com/ships";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

/** Ships bundled on one wiki row, apply to each listed name. */
const WIKI_BUNDLED_ROWS = [
  {
    names: ["Celebrity Apex", "Celebrity Ascent", "Celebrity Xcel"],
    min: 3260,
    max: 3521,
  },
  {
    names: ["MSC Explora 1", "MSC Explora 2", "MSC Explora 3", "MSC Explora 4", "MSC Explora 5", "MSC Explora 6"],
    min: 922,
    max: 1473,
  },
  {
    names: ["Disney Wish", "Disney Treasure"],
    min: 2476,
    max: 3466,
  },
  {
    names: ["Icon Of The Seas", "Star Of The Seas", "Legend Of The Seas", "Hero Of The Seas"],
    min: 5610,
    max: 7600,
  },
];

/** Manual overrides when CruiseMapper listing/wiki names differ from schedule imports. */
const MANUAL_OVERRIDES = {
  Ambition: { min: 1248, max: 1428, slug: "Ambition-761" },
  "Disney Treasure": { min: 2476, max: 3466, slug: "Disney-Treasure-2188" },
  "Hero Of The Seas": { min: 5610, max: 7600, slug: "Hero-Of-The-Seas-2333" },
  "Norwegian Aqua": { min: 3571, max: 4224, slug: "Norwegian-Aqua-2218" },
  "Norwegian Aura": { min: 3840, max: 4714, slug: "Norwegian-Aura-2220" },
  "Norwegian Luna": { min: 3571, max: 4224, slug: "Norwegian-Luna-2219" },
  "Seven Seas Prestige": { min: 822, max: 822, slug: "Seven-Seas-Prestige-2240" },
  "Star Of The Seas": { min: 5610, max: 7600, slug: "Star-Of-The-Seas-2112" },
  "Explora I": { min: 922, max: 1473, slug: "MSC-Explora-1-2014" },
  "Explora II": { min: 922, max: 1473, slug: "MSC-Explora-2-2015" },
  "Explora III": { min: 922, max: 1473, slug: "MSC-Explora-3-2101" },
  "Explora IV": { min: 922, max: 1473, slug: "MSC-Explora-4-2104" },
  "Carnival Festivale": { min: 5374, max: 6338, slug: "Carnival-Festivale-2106" },
  "Margaritaville At Sea Beachcomber": { min: 2688, max: 3226, slug: "Margaritaville-At-Sea-Beachcomber-2011" },
  "Margaritaville At Sea Islander": { min: 2688, max: 3226, slug: "Margaritaville-At-Sea-Islander-2010" },
};

function normalizeKey(name) {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

function parseCapacityString(value) {
  const range = value.match(/(\d[\d,]*)\s*-\s*(\d[\d,]*)/);
  if (range) {
    return {
      min: Number.parseInt(range[1].replace(/,/g, ""), 10),
      max: Number.parseInt(range[2].replace(/,/g, ""), 10),
    };
  }
  const single = value.match(/(\d[\d,]*)/);
  if (single) {
    const n = Number.parseInt(single[1].replace(/,/g, ""), 10);
    return { min: n, max: n };
  }
  return null;
}

function addShip(store, name, capacity, slug) {
  if (!name || !capacity || Number.isNaN(capacity.min) || Number.isNaN(capacity.max)) return;
  const key = normalizeKey(name);
  store.set(key, {
    name,
    min: capacity.min,
    max: capacity.max,
    slug: slug ?? null,
  });
}

function parseWikiTable(html) {
  const store = new Map();
  const rowRe = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
  const cellRe = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;

  for (const row of html.match(rowRe) || []) {
    const cells = [...row.matchAll(cellRe)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim(),
    );
    if (cells.length < 2 || cells[0].includes("Vessel Name")) continue;

    const capacity = parseCapacityString(cells[1]);
    if (!capacity || /tba/i.test(cells[0])) continue;

    const names = cells[0]
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n && !/tbn/i.test(n));
    for (const name of names) {
      addShip(store, name, capacity);
    }
  }

  for (const bundle of WIKI_BUNDLED_ROWS) {
    for (const name of bundle.names) {
      addShip(store, name, { min: bundle.min, max: bundle.max });
    }
  }

  return store;
}

function parseShipListings(html) {
  const store = new Map();
  const blockRe =
    /shipListItemContent[\s\S]*?<h3><a[^>]+href="[^"]*\/ships\/([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?Passengers<\/td><td>([^<]+)/gi;

  let match;
  while ((match = blockRe.exec(html))) {
    const slug = match[1];
    const name = match[2].trim();
    const capacity = parseCapacityString(match[3]);
    if (capacity) addShip(store, name, capacity, slug);
  }

  return store;
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: FETCH_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function fetchAllShipListings() {
  const store = new Map();
  let offset = 0;
  let emptyPages = 0;

  while (offset < 1600 && emptyPages < 2) {
    const url = offset === 0 ? SHIPS_URL : `${SHIPS_URL}?offset=${offset}`;
    process.stdout.write(`  ships offset ${offset}... `);
    const html = await fetchHtml(url);
    const pageStore = parseShipListings(html);
    console.log(`${pageStore.size} ships`);

    if (pageStore.size === 0) {
      emptyPages++;
    } else {
      emptyPages = 0;
      for (const [key, value] of pageStore) {
        if (!store.has(key)) store.set(key, value);
      }
    }

    offset += 15;
    await new Promise((r) => setTimeout(r, 350));
  }

  return store;
}

function mergeStores(...stores) {
  const merged = new Map();
  for (const store of stores) {
    for (const [key, value] of store) {
      if (!merged.has(key)) merged.set(key, value);
    }
  }
  return merged;
}

console.log("Fetching CruiseMapper wiki capacities...");
const wikiHtml = await fetchHtml(WIKI_URL);
const wikiStore = parseWikiTable(wikiHtml);
console.log(`  Wiki table: ${wikiStore.size} ships`);

console.log("Fetching CruiseMapper ship listings...");
const listingStore = await fetchAllShipListings();
console.log(`  Listings total: ${listingStore.size} ships`);

const store = mergeStores(wikiStore, listingStore);

for (const [name, capacity] of Object.entries(MANUAL_OVERRIDES)) {
  addShip(store, name, capacity, capacity.slug);
}

const ships = [...store.values()].sort((a, b) => a.name.localeCompare(b.name));

const output = {
  source: "CruiseMapper",
  sourceUrls: [WIKI_URL, SHIPS_URL],
  updatedAt: new Date().toISOString().slice(0, 10),
  shipCount: ships.length,
  ships,
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n");
console.log(`\nWrote ${ships.length} ship capacities to ${OUTPUT_PATH}`);
