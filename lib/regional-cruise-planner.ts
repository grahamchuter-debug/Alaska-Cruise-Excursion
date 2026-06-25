import { getRegionalCruisePlannerBySlug } from "@/data/regional-cruise-planners";
import { buildMetadata } from "./seo";

export function buildRegionalCruisePlannerMetadata(slug: string) {
  const planner = getRegionalCruisePlannerBySlug(slug);
  if (!planner) return {};
  return buildMetadata({
    title: planner.seoTitle,
    description: planner.metaDescription,
    path: `/${slug}`,
    keywords: ["Caribbean cruise planner", "regional cruise guide", slug.replace(/-/g, " ")],
  });
}
