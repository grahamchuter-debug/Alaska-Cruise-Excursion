import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getScheduleYearHubContent } from "@/data/schedule-year-hubs";
import { getSchedulePageContent } from "@/data/schedule-page-content";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShipScheduleMasterYearHub } from "@/components/ShipScheduleMasterYearHub";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { getScheduleYearHubFaqs } from "@/data/schedule-hub-faqs";
import { yearHubPath } from "@/lib/schedule-utils";

const YEAR = 2026 as const;
const content = getScheduleYearHubContent(YEAR);
const pageContent = getSchedulePageContent("year-2026");

export const metadata = buildMetadata({
  title: content.title,
  description: content.metaDescription,
  path: yearHubPath(YEAR),
  keywords: [
    "cruise ship schedule 2026",
    "ship schedule 2026",
    "Alaska cruise schedule 2026",
    "Alaska port schedule",
    "ships in port 2026",
  ],
});

export default function ShipSchedules2026Page() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Ship Schedules", path: "/ship-schedules" },
    { name: "2026 Schedules", path: yearHubPath(YEAR) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          webPageSchema({
            title: content.title,
            description: content.metaDescription,
            path: yearHubPath(YEAR),
          }),
          faqSchema(getScheduleYearHubFaqs(YEAR)),
        ]}
      />
      <PageHero
        title={content.title}
        subtitle={pageContent.heroSubtitle ?? content.heroSubtitle}
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mb-8 flex flex-wrap gap-3">
            <Link href="/ship-schedules" className="btn-secondary text-sm">
              Ship Schedules Home
            </Link>
            <Link href="/ship-schedules/2027" className="btn-secondary text-sm">
              View 2027 Schedules
            </Link>
          </div>
          <ShipScheduleMasterYearHub year={YEAR} />
        </div>
      </section>
    </>
  );
}
