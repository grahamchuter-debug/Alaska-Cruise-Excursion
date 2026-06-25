import { getCruiseLineBySlug } from "@/data/cruise-lines";
import { getPortBySlug } from "@/data/ports";
import { ships } from "@/data/ships";
import { normalizeSearchText } from "@/lib/port-search";
import { hasShipSchedule } from "@/lib/routes";

export interface ShipSearchIndexEntry {
  slug: string;
  name: string;
  tagline: string;
  cruiseLineSlug: string;
  cruiseLineName: string;
  commonPortSlugs: string[];
  searchableText: string;
  nameNormalized: string;
}

function collectSearchTerms(
  name: string,
  tagline: string,
  cruiseLineName: string,
  itineraries: string[],
  portSlugs: string[],
): string[] {
  const terms = [name, tagline, cruiseLineName, ...itineraries];

  for (const portSlug of portSlugs) {
    const port = getPortBySlug(portSlug);
    if (port) {
      terms.push(port.name, port.country, port.region);
    }
  }

  return terms.filter(Boolean);
}

function buildSearchIndex(): ShipSearchIndexEntry[] {
  return ships.map((ship) => {
    const line = getCruiseLineBySlug(ship.cruiseLineSlug);
    const cruiseLineName = line?.name ?? ship.cruiseLineSlug;

    return {
      slug: ship.slug,
      name: ship.name,
      tagline: ship.tagline,
      cruiseLineSlug: ship.cruiseLineSlug,
      cruiseLineName,
      commonPortSlugs: ship.commonPortSlugs,
      searchableText: normalizeSearchText(
        collectSearchTerms(ship.name, ship.tagline, cruiseLineName, ship.caribbeanItineraries, ship.commonPortSlugs).join(" "),
      ),
      nameNormalized: normalizeSearchText(ship.name),
    };
  });
}

const searchIndex = buildSearchIndex();

export interface ShipSearchResult {
  entry: ShipSearchIndexEntry;
  score: number;
}

function scoreMatch(entry: ShipSearchIndexEntry, tokens: string[]): number {
  let score = 0;

  for (const token of tokens) {
    if (entry.nameNormalized === token) {
      score += 100;
    } else if (entry.nameNormalized.startsWith(token)) {
      score += 50;
    } else if (entry.nameNormalized.includes(token)) {
      score += 25;
    } else if (normalizeSearchText(entry.cruiseLineName).includes(token)) {
      score += 15;
    } else if (entry.searchableText.includes(token)) {
      score += 5;
    }
  }

  return score;
}

export function searchShips(query: string, limit = 8): ShipSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokens = normalizeSearchText(trimmed)
    .split(/\s+/)
    .filter((token) => token.length > 0);

  if (tokens.length === 0) return [];

  return searchIndex
    .map((entry) => ({ entry, score: scoreMatch(entry, tokens) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name))
    .slice(0, limit);
}

export function getShipSearchQuickPicks(): ShipSearchIndexEntry[] {
  const slugs = ["icon-of-the-seas", "wonder-of-the-seas", "msc-world-america"];
  return slugs
    .map((slug) => searchIndex.find((entry) => entry.slug === slug))
    .filter((entry): entry is ShipSearchIndexEntry => entry !== undefined);
}

export function getSchedulePortsForShip(portSlugs: string[]): string[] {
  return portSlugs.filter((slug) => hasShipSchedule(slug));
}

export function getShipSearchCount(): number {
  return searchIndex.length;
}
