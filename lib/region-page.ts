import { getRegionBySlug } from "@/data/regions";
import { buildMetadata } from "./seo";

export function buildRegionMetadata(slug: string) {
  const region = getRegionBySlug(slug);
  if (!region) return {};
  return buildMetadata({
    title: region.title,
    description: region.metaDescription,
    path: `/${slug}`,
    keywords: ["Caribbean cruise ports", "shore excursions", slug.replace(/-/g, " ")],
  });
}
