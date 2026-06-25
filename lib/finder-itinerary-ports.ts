import { getCruiseLineBySlug } from "@/data/cruise-lines";
import { getShipBySlug } from "@/data/ships";
import { featuredFinderPortSlugs } from "@/data/excursion-finder";

const DEFAULT_VISIBLE = featuredFinderPortSlugs;

export function filterToVisiblePorts(portSlugs: string[], visiblePortSlugs?: string[]): string[] {
  const allowed = new Set(visiblePortSlugs ?? DEFAULT_VISIBLE);
  return portSlugs.filter((slug) => allowed.has(slug));
}

/** Typical Caribbean ports for a ship (from ships.ts commonPortSlugs). */
export function getSuggestedPortsForShip(shipSlug: string, visiblePortSlugs?: string[]): string[] {
  const ship = getShipBySlug(shipSlug);
  if (!ship) return [];
  return filterToVisiblePorts(ship.commonPortSlugs, visiblePortSlugs).slice(0, 5);
}

/** Default hub ports for a cruise line (from cruise-lines.ts popularPorts). */
export function getSuggestedPortsForCruiseLine(
  cruiseLineSlug: string,
  visiblePortSlugs?: string[],
): string[] {
  const line = getCruiseLineBySlug(cruiseLineSlug);
  if (!line) return [];
  return filterToVisiblePorts(
    line.popularPorts.map((port) => port.slug),
    visiblePortSlugs,
  ).slice(0, 5);
}

export function resolveItineraryPorts(options: {
  shipSlug?: string;
  cruiseLineSlug?: string;
  visiblePortSlugs?: string[];
}): string[] {
  if (options.shipSlug) {
    const shipPorts = getSuggestedPortsForShip(options.shipSlug, options.visiblePortSlugs);
    if (shipPorts.length > 0) return shipPorts;
  }
  if (options.cruiseLineSlug) {
    return getSuggestedPortsForCruiseLine(options.cruiseLineSlug, options.visiblePortSlugs);
  }
  return [];
}
