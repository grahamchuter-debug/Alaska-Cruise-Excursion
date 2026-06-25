import { getCruisePortNaming } from "@/data/cruise-port-naming";
import { getPortAuthority, getAllPortAuthoritySlugs } from "@/data/port-authority";
import { getPortPlanningCards } from "@/data/port-planning";
import { getPortBySlug } from "@/data/ports";
import type { Port } from "@/data/types";

export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .trim();
}

export interface PortSearchIndexEntry {
  port: Port;
  searchableText: string;
  nameNormalized: string;
}

function collectSearchTerms(port: Port, slug: string): string[] {
  const terms: string[] = [
    port.name,
    port.country,
    port.region,
    port.bestFor,
    port.tagline,
    ...port.highlights,
    ...port.bestExcursions.map((excursion) => excursion.name),
    ...port.bestExcursions.map((excursion) => excursion.type),
    ...port.topAttractions.map((attraction) => attraction.name),
  ];

  const naming = getCruisePortNaming(slug);
  if (naming) {
    terms.push(naming.dockTown, ...naming.alternativeNames, ...naming.terminals);
    if (naming.titleParenthetical) {
      terms.push(naming.titleParenthetical);
    }
  }

  const authority = getPortAuthority(slug);
  if (authority) {
    terms.push(...authority.bestBeaches.map((beach) => beach.name));
    terms.push(...authority.bestForFamilies);
    terms.push(...authority.bestForCouples);
    terms.push(...authority.snorkelling.map((site) => site.site));
    terms.push(...authority.privateTours.map((tour) => tour.name));
  }

  const cards = getPortPlanningCards(slug);
  terms.push(...cards.map((card) => card.teaser), ...cards.map((card) => card.label));

  return terms.filter(Boolean);
}

function buildSearchIndex(): PortSearchIndexEntry[] {
  return getAllPortAuthoritySlugs()
    .map((slug) => getPortBySlug(slug))
    .filter((port): port is Port => port !== undefined)
    .map((port) => ({
      port,
      searchableText: normalizeSearchText(collectSearchTerms(port, port.slug).join(" ")),
      nameNormalized: normalizeSearchText(port.name),
    }));
}

const searchIndex = buildSearchIndex();

export function getAllAuthorityPorts(): Port[] {
  return searchIndex.map((entry) => entry.port);
}

export interface PortSearchResult {
  port: Port;
  score: number;
}

function scoreMatch(entry: PortSearchIndexEntry, tokens: string[]): number {
  let score = 0;

  for (const token of tokens) {
    if (entry.nameNormalized === token) {
      score += 100;
    } else if (entry.nameNormalized.startsWith(token)) {
      score += 50;
    } else if (entry.nameNormalized.includes(token)) {
      score += 25;
    } else if (normalizeSearchText(entry.port.country).includes(token)) {
      score += 15;
    } else if (normalizeSearchText(entry.port.region).includes(token)) {
      score += 10;
    } else if (entry.searchableText.includes(token)) {
      score += 5;
    }
  }

  return score;
}

export function searchPorts(query: string): PortSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return [];
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return [];
  }

  return searchIndex
    .map((entry) => {
      const matches = tokens.every((token) => entry.searchableText.includes(token));
      if (!matches) {
        return null;
      }

      return {
        port: entry.port,
        score: scoreMatch(entry, tokens),
      };
    })
    .filter((result): result is PortSearchResult => result !== null)
    .sort((a, b) => b.score - a.score || a.port.name.localeCompare(b.port.name));
}

export function getTopExcursionLabel(port: Port): string {
  const top = port.bestExcursions[0];
  return top ? `${top.name} · ${top.type}` : port.bestFor;
}
