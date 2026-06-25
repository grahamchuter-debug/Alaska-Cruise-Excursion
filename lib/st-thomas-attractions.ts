import type { AttractionGuidePage } from "@/data/types";
import { buildMetadata } from "./seo";

export function buildAttractionGuideMetadata(guide: AttractionGuidePage) {
  return buildMetadata({
    title: guide.seoTitle,
    description: guide.metaDescription,
    path: `/${guide.slug}`,
    keywords: [
      guide.title,
      "St. Thomas cruise",
      "St. Thomas shore excursions",
      guide.category === "beach" ? "St. Thomas beaches" : "St. Thomas attractions",
    ],
  });
}
