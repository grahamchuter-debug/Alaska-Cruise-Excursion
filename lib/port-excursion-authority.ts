import { portExcursionAuthority } from "@/data/port-excursion-authority";
import { buildMetadata } from "./seo";

export function buildPortExcursionAuthorityMetadata() {
  return buildMetadata({
    title: portExcursionAuthority.seoTitle,
    description: portExcursionAuthority.metaDescription,
    path: `/${portExcursionAuthority.slug}`,
    keywords: [
      "best shore excursion every Caribbean port",
      "Caribbean port excursions",
      "cruise port guide",
      "best Caribbean excursions",
    ],
  });
}
