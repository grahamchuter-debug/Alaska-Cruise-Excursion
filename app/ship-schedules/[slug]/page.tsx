import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getSchedulePortBySlug, getAllSchedulePortSlugs } from "@/data/schedules";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShipScheduleHubView } from "@/components/ShipScheduleHubView";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { isScheduleYearSlug, portHubPath, yearHubPath } from "@/lib/schedule-utils";
import {
  augmentMetadataDescription,
  augmentMetadataTitle,
  getScheduleHubHeroTitle,
  getScheduleMetadataKeywords,
} from "@/lib/cruise-port-display";
import { getSchedulePageContentForPortHub } from "@/data/schedule-page-content";

export function generateStaticParams() {
  return getAllSchedulePortSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    if (isScheduleYearSlug(slug)) return {};
    const port = getSchedulePortBySlug(slug);
    if (!port) return {};
    const hubContent = getSchedulePageContentForPortHub(slug);
    const baseTitle = port.seoTitle ?? `${port.name} Cruise Ship Schedule`;
    const baseDescription =
      hubContent?.heroSubtitle ??
      port.metaDescription ??
      `${port.name} cruise ship schedule hub. View the 2026 schedule or 2027 schedule with monthly arrival and departure times to plan shore excursions.`;
    return buildMetadata({
      title: augmentMetadataTitle(baseTitle, port.name, slug),
      description: augmentMetadataDescription(baseDescription, slug, "schedule"),
      path: portHubPath(slug),
      keywords: getScheduleMetadataKeywords(slug, port.name),
    });
  });
}

export default async function ShipSchedulePortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isScheduleYearSlug(slug)) notFound();

  const port = getSchedulePortBySlug(slug);
  if (!port) notFound();

  const hubContent = getSchedulePageContentForPortHub(slug);
  const title = getScheduleHubHeroTitle(slug, port.name);
  const subtitle = hubContent?.heroSubtitle ?? port.description;
  const faqs = hubContent?.faqs ?? port.faqs ?? [];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Ship Schedules", path: "/ship-schedules" },
    { name: port.name, path: portHubPath(slug) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          webPageSchema({
            title,
            description: subtitle,
            path: portHubPath(slug),
          }),
          ...(faqs.length ? [faqSchema(faqs)] : []),
        ]}
      />
      <PageHero title={title} subtitle={subtitle} compact />
      <section className="section-padding">
        <div className="container-wide max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mb-6 flex flex-wrap gap-4">
            <Link href={yearHubPath(2026)} className="btn-secondary text-sm">
              2026 Caribbean Schedules
            </Link>
            <Link href={yearHubPath(2027)} className="btn-secondary text-sm">
              2027 Caribbean Schedules
            </Link>
            <Link href={`/ports/${slug}`} className="btn-secondary text-sm">
              {port.name} Port Guide
            </Link>
            <Link href="/ship-schedules" className="btn-secondary text-sm">
              Ship Schedules Home
            </Link>
          </div>

          <ShipScheduleHubView port={port} />
        </div>
      </section>
    </>
  );
}
