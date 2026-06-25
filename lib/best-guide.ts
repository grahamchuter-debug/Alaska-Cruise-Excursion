import { getBestGuideBySlug } from "@/data/best-guides";
import { comparisons, getComparisonBySlug } from "@/data/comparisons";
import type { Comparison } from "@/data/types";
import { buildMetadata } from "./seo";

export function getRelatedComparisonsForPorts(portSlugs: string[], limit = 6): Comparison[] {
  const slugSet = new Set(portSlugs);
  return comparisons
    .filter((comparison) => slugSet.has(comparison.portASlug) || slugSet.has(comparison.portBSlug))
    .slice(0, limit);
}

export function getComparisonsBySlugs(slugs: string[]): Comparison[] {
  return slugs
    .map((slug) => getComparisonBySlug(slug))
    .filter((comparison): comparison is Comparison => comparison !== undefined);
}

export function buildBestGuideMetadata(slug: string) {
  const guide = getBestGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.seoTitle,
    description: guide.metaDescription,
    path: `/${slug}`,
    keywords: [
      "Alaska shore excursions",
      "best Alaska cruise port excursions",
      "which Alaska port best excursions",
      slug.replace(/-/g, " "),
    ],
  });
}
