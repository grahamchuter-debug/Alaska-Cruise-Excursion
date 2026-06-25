import { notFound } from "next/navigation";
import { BestGuidePageView } from "@/components/BestGuidePageView";
import { ComparisonPageView } from "@/components/ComparisonPageView";
import { getBestGuideBySlug, getAllBestGuideSlugs } from "@/data/best-guides";
import { getComparisonBySlug, getAllComparisonSlugs } from "@/data/comparisons";
import { buildBestGuideMetadata } from "@/lib/best-guide";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = new Set([
    ...getAllBestGuideSlugs(),
    ...getAllComparisonSlugs(),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const guide = getBestGuideBySlug(slug);
    if (guide) return buildBestGuideMetadata(slug);

    const comp = getComparisonBySlug(slug);
    if (!comp) return {};
    return buildMetadata({
      title: comp.seoTitle,
      description: comp.metaDescription,
      path: `/${slug}`,
      keywords: [
        `${comp.portA} vs ${comp.portB}`,
        "Alaska port comparison",
        "cruise port guide",
        comp.portA,
        comp.portB,
      ],
    });
  });
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const guide = getBestGuideBySlug(slug);
  if (guide) return <BestGuidePageView guide={guide} />;

  const comp = getComparisonBySlug(slug);
  if (comp) return <ComparisonPageView comp={comp} />;

  notFound();
}
