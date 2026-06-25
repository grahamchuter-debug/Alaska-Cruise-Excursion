import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getCruiseLineBySlug, getAllCruiseLineSlugs } from "@/data/cruise-lines";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { CruiseLinePlanningSections } from "@/components/CruiseLinePlanningSections";
import { BookingJourneyPanel } from "@/components/BookingJourneyPanel";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAllCruiseLineSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const line = getCruiseLineBySlug(slug);
    if (!line) return {};
    return buildMetadata({
      title: `${line.name} Alaska Cruise Planning Guide`,
      description: line.metaDescription,
      path: `/alaska-cruise-lines/${slug}`,
      keywords: [
        `${line.name} Alaska`,
        `${line.name} cruise planning`,
        `${line.name} shore excursions`,
        `${line.name} ships`,
        "Alaska cruise line",
      ],
    });
  });
}

export default async function AlaskaCruiseLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = getCruiseLineBySlug(slug);
  if (!line) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Alaska Cruise Lines", path: "/alaska-cruise-lines" },
    { name: line.name, path: `/alaska-cruise-lines/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(line.faqs),
          travelGuideSchema({
            title: `${line.name} Alaska Cruise Planning Guide`,
            description: line.metaDescription,
            path: `/alaska-cruise-lines/${slug}`,
          }),
        ]}
      />
      <PageHero title={`${line.name} Alaska Guide`} subtitle={line.tagline} compact />
      <article className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          <CruiseLinePlanningSections line={line} variant="hub" />
          <BookingJourneyPanel
            title={`Book ${line.name} Alaska shore excursions`}
            description={`Match ports in the Alaska Excursion Finder or check ship schedules before you book independent tours.`}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/alaska-cruise-excursion-planner" className="btn-primary text-sm">
              Alaska Excursion Finder
            </Link>
            <Link href="/alaska-cruise-ships" className="btn-secondary text-sm">
              Browse {line.name} ships
            </Link>
          </div>
          <div className="mt-12">
            <FAQSection faqs={line.faqs} />
          </div>
        </div>
      </article>
    </>
  );
}
