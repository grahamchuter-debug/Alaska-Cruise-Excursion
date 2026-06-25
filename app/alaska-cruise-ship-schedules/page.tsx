import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getSchedulePortCount } from "@/data/content-inventory";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScheduleYearHeroCards } from "@/components/ScheduleYearHeroCards";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const SCHEDULE_PORT_COUNT = getSchedulePortCount();

export const metadata = buildMetadata({
  title: "Alaska Cruise Ship Schedules",
  description:
    `Alaska cruise ship schedule hub for ${SCHEDULE_PORT_COUNT} ports. Browse verified arrival and departure times to plan port days and avoid crowded pier windows.`,
  path: "/alaska-cruise-ship-schedules",
  keywords: [
    "Alaska cruise ship schedule",
    "Alaska port schedule",
    "ships in port Alaska",
  ],
});

export default function AlaskaCruiseShipSchedulesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alaska Ship Schedules", path: "/alaska-cruise-ship-schedules" },
          ]),
          webPageSchema({
            title: "Alaska Cruise Ship Schedules",
            description: `Cruise ship schedule hub for Alaska ports across ${SCHEDULE_PORT_COUNT} tracked ports.`,
            path: "/alaska-cruise-ship-schedules",
          }),
        ]}
      />
      <PageHero
        title="Alaska Cruise Ship Schedules"
        subtitle="See which ships are in port before you book excursions. Drill into year and port schedules from our full schedule hub."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Alaska Ship Schedules", path: "/alaska-cruise-ship-schedules" },
            ]}
          />

          <ScheduleYearHeroCards />

          <div className="mt-10 rounded-xl border border-caribbean-200 bg-caribbean-50/40 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Full schedule hub</h2>
              <p className="mt-1 text-sm text-gray-600">
                Browse every tracked port, monthly pages, and ship call details on the main ship schedules section.
              </p>
            </div>
            <Link href="/ship-schedules" className="btn-primary text-sm shrink-0">
              Open ship schedules →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
