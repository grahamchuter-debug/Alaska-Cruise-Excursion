import { bestGuides, getBestGuideBySlug } from "@/data/best-guides";

export const BEST_CARIBBEAN_GUIDES_HUB_SLUG = "best-caribbean-guides";

/** Featured guides shown on the hub, homepage, and cruise planner. */
export const featuredBestCaribbeanGuideSlugs = [
  "best-caribbean-beach-excursions",
  "best-caribbean-snorkeling-excursions",
  "best-caribbean-family-excursions",
  "best-caribbean-ports-for-first-time-cruisers",
  "best-caribbean-cruise-ports-2027",
] as const;

export type FeaturedBestCaribbeanGuideSlug = (typeof featuredBestCaribbeanGuideSlugs)[number];

export function getFeaturedBestCaribbeanGuides() {
  return featuredBestCaribbeanGuideSlugs
    .map((slug) => getBestGuideBySlug(slug))
    .filter((guide): guide is NonNullable<typeof guide> => guide !== undefined);
}

export const bestCaribbeanGuidesHub = {
  slug: BEST_CARIBBEAN_GUIDES_HUB_SLUG,
  title: "Best Caribbean Guides",
  seoTitle: "Best Caribbean Guides | Ranked Port & Excursion Planning",
  metaDescription:
    "Authority-ranked Caribbean cruise guides: best beaches, snorkelling ports, family ports, first-time cruiser picks, and top 2027 cruise ports with links to port guides, comparisons, and ship schedules.",
  heroSubtitle:
    "Ranked port guides for cruise passengers — beaches, reefs, families, first-time cruisers, and 2027's busiest ports.",
  introduction:
    "These guides rank Caribbean cruise ports using our authority port research: excursion quality, pier logistics, value on a typical 6–8 hour port day, and links to live specialist operators. Each guide links to port authority pages, head-to-head comparisons, and ship schedules where verified data exists.",
};

export function getAllBestGuideHubSlugs(): string[] {
  return bestGuides.map((guide) => guide.slug);
}
