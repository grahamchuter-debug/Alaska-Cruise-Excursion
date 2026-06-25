import type { AttractionGuidePage } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { buildMetadata } from "./seo";

export function buildAttractionGuideMetadata(guide: AttractionGuidePage) {
  const port = getPortBySlug(guide.portSlug);
  const portName = port?.name ?? guide.portSlug;

  return buildMetadata({
    title: guide.seoTitle,
    description: guide.metaDescription,
    path: `/${guide.slug}`,
    keywords: [
      guide.title,
      `${portName} cruise`,
      `${portName} shore excursions`,
      guide.category === "beach" ? `${portName} beaches` : `${portName} attractions`,
    ],
  });
}
