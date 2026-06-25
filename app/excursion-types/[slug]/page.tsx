import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getExcursionTypeBySlug, getAllExcursionTypeSlugs } from "@/data/excursion-types";
import { getEnrichedExcursionType } from "@/lib/excursion-type-pathways";
import { ExcursionTypePageView } from "@/components/ExcursionTypePageView";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAllExcursionTypeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const type = getExcursionTypeBySlug(slug);
    if (!type) return {};
    return buildMetadata({
      title: `${type.name} in Alaska`,
      description: type.overview.slice(0, 155) + "...",
      path: `/excursion-types/${slug}`,
      keywords: [`Alaska ${type.name.toLowerCase()}`, "shore excursions", type.slug],
    });
  });
}

export default async function ExcursionTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = getEnrichedExcursionType(slug);
  if (!type) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Excursion Types", path: "/excursion-types" },
    { name: type.name, path: `/excursion-types/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(type.faqs),
          travelGuideSchema({
            title: `${type.name} in Alaska`,
            description: type.overview,
            path: `/excursion-types/${slug}`,
          }),
        ]}
      />
      <ExcursionTypePageView type={type} breadcrumbs={breadcrumbs} />
    </>
  );
}
