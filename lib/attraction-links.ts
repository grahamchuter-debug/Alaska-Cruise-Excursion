import type { Attraction } from "@/data/types";
import { getAttractionGuidesByPortSlug } from "@/data/attraction-guides";
import { getSpecialistExcursionUrl, resolveExcursionTypeSlug } from "@/lib/specialist-links";

export type AttractionLinkSource = "attraction-guide" | "excursion-type" | "port-section" | "port-guide";

export interface AttractionDestination {
  href: string;
  label: string;
  external?: boolean;
  source?: AttractionLinkSource;
}

function normalizeForMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function portSlugSuffix(portSlug: string): string {
  return `-${portSlug}`;
}

function findAttractionGuideSlug(portSlug: string, attraction: Attraction): string | undefined {
  const nameNorm = normalizeForMatch(attraction.name);

  for (const guide of getAttractionGuidesByPortSlug(portSlug)) {
    const slugPart = guide.slug.endsWith(portSlugSuffix(portSlug))
      ? guide.slug.slice(0, -portSlugSuffix(portSlug).length)
      : guide.slug;
    const slugNorm = normalizeForMatch(slugPart.replace(/-/g, " "));
    const titleNorm = normalizeForMatch(guide.title);

    if (
      nameNorm === slugNorm ||
      nameNorm.includes(slugNorm) ||
      slugNorm.includes(nameNorm) ||
      titleNorm.includes(nameNorm)
    ) {
      return guide.slug;
    }
  }

  return undefined;
}

/**
 * Resolve a meaningful destination for an attraction card.
 * Priority: attraction guide → specialist excursion category → port guide.
 */
export function getAttractionDestination(
  portSlug: string,
  _name: string,
  attraction: Attraction,
): AttractionDestination {
  if (attraction.guideHref) {
    const external = attraction.guideHref.startsWith("http");
    return {
      href: attraction.guideHref,
      label: "Attraction guide",
      external,
      source: "attraction-guide",
    };
  }

  const guideSlug = findAttractionGuideSlug(portSlug, attraction);
  if (guideSlug) {
    return {
      href: `/${guideSlug}`,
      label: "Attraction guide",
      source: "attraction-guide",
    };
  }

  const excursionTypeSlug = resolveExcursionTypeSlug({
    text: `${attraction.name} ${attraction.description}`,
  });

  if (excursionTypeSlug) {
    const specialistHref = getSpecialistExcursionUrl(portSlug, {
      excursionTypeSlug,
      text: attraction.name,
    });

    return {
      href: specialistHref,
      label: "Browse excursions",
      external: true,
      source: "excursion-type",
    };
  }

  return {
    href: `/ports/${portSlug}`,
    label: "Port guide",
    source: "port-guide",
  };
}

/** @deprecated Use getAttractionDestination */
export function resolveAttractionLink(
  portSlug: string,
  attraction: Attraction,
): AttractionDestination {
  return getAttractionDestination(portSlug, attraction.name, attraction);
}
