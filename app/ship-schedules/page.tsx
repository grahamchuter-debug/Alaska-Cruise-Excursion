import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { schedulePorts } from "@/data/schedules";
import { getSchedulePortCount } from "@/data/content-inventory";
import { getSchedulePageContent } from "@/data/schedule-page-content";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScheduleYearHeroCards } from "@/components/ScheduleYearHeroCards";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { JsonLd } from "@/components/JsonLd";
import { FAQSection } from "@/components/FAQSection";
import {
  SchedulePageContentSections,
  SchedulePageIntro,
} from "@/components/SchedulePageContentSections";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { NavCardCta } from "@/components/NavCardCta";
import { AlaskaScheduleHubAnalytics } from "@/components/AlaskaScheduleHubAnalytics";
import { portHubPath } from "@/lib/schedule-utils";

const SCHEDULE_PORT_COUNT = getSchedulePortCount();
const homeContent = getSchedulePageContent("home");

export const metadata = buildMetadata({
  title: "Alaska Cruise Ship Schedules 2026 & 2027",
  description: `Alaska cruise ship schedule hub for ${SCHEDULE_PORT_COUNT} ports. Browse 2026 and 2027 arrival and departure times for Juneau, Skagway, Ketchikan, Seward, Whittier, and more as verified data is imported.`,
  path: "/ship-schedules",
  keywords: [
    "Alaska cruise ship schedule",
    "cruise ship schedule 2026",
    "cruise ship schedule 2027",
    "Juneau cruise schedule",
    "Skagway ship schedule",
    "ships in port Alaska",
  ],
});

export default function ShipSchedulesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Ship Schedules", path: "/ship-schedules" },
          ]),
          webPageSchema({
            title: "Alaska Cruise Ship Schedules",
            description: `Year-first cruise ship schedule hub for 2026 and 2027 Alaska port schedules across ${SCHEDULE_PORT_COUNT} ports.`,
            path: "/ship-schedules",
          }),
          faqSchema(homeContent.faqs),
        ]}
      />
      <PageHero
        title="Alaska Cruise Ship Schedules"
        subtitle={homeContent.heroSubtitle ?? "Browse Alaska cruise ship schedules for 2026 and 2027."}
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Ship Schedules", path: "/ship-schedules" },
            ]}
          />

          <SchedulePageIntro content={homeContent} />

          <SchedulePageContentSections content={homeContent} />

          <AlaskaScheduleHubAnalytics />

          <section className="mb-14">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Choose Your Schedule Year</h2>
            <ScheduleYearHeroCards />
          </section>

          <section className="mb-14">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Alaska Planning Tools</h2>
            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl">
              <Link href="/alaska-cruise-excursion-planner" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
                <h3 className="font-display text-lg font-bold text-gray-900">Alaska Excursion Planner</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Match whale watching, glaciers, railways, and bear viewing to your ports.
                </p>
                <NavCardCta className="pt-4">Open excursion planner</NavCardCta>
              </Link>
              <Link href="/best-alaska-guides" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
                <h3 className="font-display text-lg font-bold text-gray-900">Best Alaska Guides</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Authority guides for wildlife, glaciers, railways, and port planning.
                </p>
                <NavCardCta className="pt-4">Browse best guides</NavCardCta>
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Browse by Port</h2>
            <p className="text-gray-600 mb-6 max-w-3xl">
              Prefer to start with a destination? Open a port schedule hub to choose between its 2026
              and 2027 monthly tables.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {schedulePorts.map((port) => (
                <Link
                  key={port.slug}
                  href={portHubPath(port.slug)}
                  className="card-gradient group flex h-full flex-col hover:border-caribbean-300"
                >
                  <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-caribbean-700">
                    {port.name}
                  </h3>
                  <p className="text-sm text-gray-500">{port.country}</p>
                  <NavCardCta className="pt-4">Open {port.name} schedule hub</NavCardCta>
                </Link>
              ))}
            </div>
          </section>

          <FAQSection faqs={homeContent.faqs} />

          <AuthorityHubLinks current="schedules" />
        </div>
      </section>
    </>
  );
}
