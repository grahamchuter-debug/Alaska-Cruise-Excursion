import { bestGuides, getBestGuideBySlug } from "@/data/best-guides";

export const BEST_ALASKA_GUIDES_HUB_SLUG = "best-alaska-guides";

export const featuredBestAlaskaGuideSlugs = [
  "best-alaska-shore-excursions",
  "best-alaska-whale-watching-excursions",
  "best-alaska-glacier-excursions",
  "best-alaska-bear-viewing-excursions",
  "best-alaska-cruise-ports",
  "best-time-to-cruise-alaska",
] as const;

export function getFeaturedBestAlaskaGuides() {
  return featuredBestAlaskaGuideSlugs
    .map((slug) => getBestGuideBySlug(slug))
    .filter((guide): guide is NonNullable<typeof guide> => guide !== undefined);
}

export const bestAlaskaGuidesHub = {
  slug: BEST_ALASKA_GUIDES_HUB_SLUG,
  title: "Best Alaska Guides",
  seoTitle: "Best Alaska Guides | Ranked Port & Excursion Planning",
  metaDescription:
    "Authority-ranked Alaska cruise guides: best shore excursions, whale watching, glaciers, bears, ports, and seasonality with specialist links.",
  heroSubtitle: "Activity-led guides for Alaska cruise passengers — wildlife, glaciers, railways, and port rankings.",
  introduction:
    "These guides rank Alaska cruise ports and excursions using authority port research: excursion quality, pier logistics, cruise-schedule fit, and links to specialist local operators.",
};

export function getAllBestGuideHubSlugs(): string[] {
  return bestGuides.map((guide) => guide.slug);
}
