import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  getSchedulePortBySlug,
  getAllSchedulePortSlugs,
  getShipCallCountForPortYear,
  getAllVerifiedMonthPageParams,
  getVerifiedScheduleEntriesForMonth,
  hasVerifiedScheduleDataForMonth,
} from "@/data/schedules";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShipSchedulePageView } from "@/components/ShipSchedulePageView";
import { ShipScheduleMonthPageView } from "@/components/ShipScheduleMonthPageView";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import {
  getMonthlyMetaDescription,
  getMonthlyPageTitle,
  getMonthlyScheduleFaqs,
  getMonthlySeoTitle,
} from "@/data/schedule-month";
import {
  isValidScheduleYear,
  isScheduleYearSlug,
  parseScheduleYear,
  parseMonthSlug,
  SCHEDULE_YEARS,
  portHubPath,
  portYearPath,
  portMonthPath,
  yearHubPath,
  formatMonthLabel,
} from "@/lib/schedule-utils";
import {
  augmentMetadataDescription,
  augmentMetadataTitle,
  getScheduleIntro,
  getScheduleYearHeroTitle,
  getScheduleMetadataKeywords,
} from "@/lib/cruise-port-display";
import { getSchedulePageContentForPortYear } from "@/data/schedule-page-content";

export function generateStaticParams() {
  const yearParams = getAllSchedulePortSlugs().flatMap((slug) =>
    SCHEDULE_YEARS.map((year) => ({ slug, year: String(year) })),
  );
  const monthParams = getAllVerifiedMonthPageParams().map(({ slug, period }) => ({
    slug,
    year: period,
  }));
  return [...yearParams, ...monthParams];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; year: string }>;
}) {
  return params.then(({ slug, year: periodParam }) => {
    if (isScheduleYearSlug(slug)) return {};
    const port = getSchedulePortBySlug(slug);
    if (!port) return {};

    const monthKey = parseMonthSlug(periodParam);
    if (monthKey) {
      const entries = getVerifiedScheduleEntriesForMonth(slug, monthKey);
      if (entries.length === 0) return {};
      return buildMetadata({
        title: getMonthlySeoTitle(port.name, monthKey, slug),
        description: getMonthlyMetaDescription(port.name, monthKey, entries.length, slug),
        path: portMonthPath(slug, monthKey),
        keywords: getScheduleMetadataKeywords(slug, port.name, Number(monthKey.split("-")[0])),
      });
    }

    const year = parseScheduleYear(periodParam);
    if (!year) return {};

    const pageContent = getSchedulePageContentForPortYear(slug, year);
    const shipCalls = getShipCallCountForPortYear(slug, year);
    const callNote =
      shipCalls > 0
        ? `${shipCalls} verified ship calls listed.`
        : "Schedule coming soon — verified rows import in progress. No placeholder sailings shown.";

    const baseTitle = port.seoTitle?.includes(String(year))
      ? port.seoTitle.replace(/\s2026\s&\s2027/, ` ${year}`)
      : `${port.name} Cruise Ship Schedule ${year}`;
    const baseDescription =
      pageContent?.intro ??
      (port.metaDescription?.includes("2026 and 2027") && year
        ? port.metaDescription.replace("2026 and 2027", String(year))
        : `${port.name} ${year} cruise ship schedule with arrival and departure times. ${callNote} Plan shore excursions around your port day.`);
    return buildMetadata({
      title: augmentMetadataTitle(baseTitle, port.name, slug),
      description: augmentMetadataDescription(baseDescription, slug, "schedule"),
      path: portYearPath(slug, year),
      keywords: getScheduleMetadataKeywords(slug, port.name, year),
    });
  });
}

export default async function ShipSchedulePeriodPage({
  params,
}: {
  params: Promise<{ slug: string; year: string }>;
}) {
  const { slug, year: periodParam } = await params;
  if (isScheduleYearSlug(slug)) notFound();

  const port = getSchedulePortBySlug(slug);
  if (!port) notFound();

  const monthKey = parseMonthSlug(periodParam);
  if (monthKey) {
    if (!hasVerifiedScheduleDataForMonth(slug, monthKey)) notFound();

    const entries = getVerifiedScheduleEntriesForMonth(slug, monthKey);
    const monthLabel = formatMonthLabel(monthKey);
    const year = Number(monthKey.split("-")[0]);
    const title = getMonthlyPageTitle(port.name, monthKey, slug);
    const faqs = getMonthlyScheduleFaqs(port, monthKey, entries);
    const monthSubtitle = getScheduleIntro(slug) ?? port.description;
    const breadcrumbs = [
      { name: "Home", path: "/" },
      { name: "Ship Schedules", path: "/ship-schedules" },
      { name: `${year} Schedules`, path: yearHubPath(year as 2026 | 2027) },
      { name: port.name, path: portHubPath(slug) },
      { name: monthLabel, path: portMonthPath(slug, monthKey) },
    ];

    return (
      <>
        <JsonLd
          data={[
            breadcrumbSchema(breadcrumbs),
            webPageSchema({
              title,
              description: getMonthlyMetaDescription(port.name, monthKey, entries.length),
              path: portMonthPath(slug, monthKey),
            }),
            faqSchema(faqs),
          ]}
        />
        <PageHero title={title} subtitle={monthSubtitle} compact />
        <section className="section-padding">
          <div className="container-wide max-w-5xl">
            <Breadcrumbs items={breadcrumbs} />
            <ShipScheduleMonthPageView port={port} monthKey={monthKey} entries={entries} />
          </div>
        </section>
      </>
    );
  }

  const year = parseScheduleYear(periodParam);
  if (!year || !isValidScheduleYear(year)) notFound();

  const pageContent = getSchedulePageContentForPortYear(slug, year);
  const title = getScheduleYearHeroTitle(slug, port.name, year);
  const subtitle = pageContent?.intro ?? getScheduleIntro(slug) ?? port.description;
  const portYearFaqs = pageContent?.faqs ?? port.faqs ?? [];
  const otherYear = year === 2026 ? 2027 : 2026;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Ship Schedules", path: "/ship-schedules" },
    { name: `${year} Schedules`, path: yearHubPath(year) },
    { name: port.name, path: portYearPath(slug, year) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          webPageSchema({
            title,
            description: `${port.name} ${year} cruise ship schedule with verified arrival and departure times where available.`,
            path: portYearPath(slug, year),
          }),
          ...(portYearFaqs.length ? [faqSchema(portYearFaqs)] : []),
        ]}
      />
      <PageHero title={title} subtitle={subtitle} compact />
      <section className="section-padding">
        <div className="container-wide max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mb-6 flex flex-wrap gap-4">
            <Link href={yearHubPath(year)} className="btn-primary text-sm">
              All {year} Alaska Schedules
            </Link>
            <Link href={portYearPath(slug, otherYear)} className="btn-secondary text-sm">
              View {otherYear} Schedule
            </Link>
            <Link href={portHubPath(slug)} className="btn-secondary text-sm">
              {port.name} schedule hub
            </Link>
            <Link href={`/ports/${slug}`} className="btn-secondary text-sm">
              {port.name} Port Guide
            </Link>
            <Link href="/ship-schedules" className="btn-secondary text-sm">
              Ship Schedules Home
            </Link>
          </div>

          <ShipSchedulePageView port={port} year={year} />

          <p className="mt-8 text-sm text-gray-500">
            Arrival and departure times are published for planning purposes and may change due to
            weather, tender conditions, or cruise line schedule adjustments. Always confirm final
            times with your ship before disembarking.
          </p>
        </div>
      </section>
    </>
  );
}
