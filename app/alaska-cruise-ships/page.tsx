import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ships } from "@/data/ships";
import { getCruiseLineBySlug } from "@/data/cruise-lines";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShipsHub } from "@/components/ShipsHub";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Alaska Cruise Ships Guide",
  description:
    "Ship-by-ship Alaska cruise planning for Royal Caribbean, Carnival, Norwegian, MSC, Celebrity, and Princess. Search by ship or cruise line, then plan port days with schedules and local specialists.",
  path: "/alaska-cruise-ships",
  keywords: ["cruise ships", "Alaska cruise ships", "ship shore excursions"],
});

export default function AlaskaCruiseShipsPage() {
  const hubShips = ships.map((ship) => {
    const line = getCruiseLineBySlug(ship.cruiseLineSlug);
    return {
      slug: ship.slug,
      name: ship.name,
      tagline: ship.tagline,
      cruiseLineSlug: ship.cruiseLineSlug,
      cruiseLineName: line?.name ?? ship.cruiseLineSlug,
      featuredPage: ship.featuredPage,
    };
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alaska Cruise Ships", path: "/alaska-cruise-ships" },
          ]),
          travelGuideSchema({
            title: "Alaska Cruise Ships Guide",
            description: "Ship-by-ship Alaska cruise planning with port and excursion links.",
            path: "/alaska-cruise-ships",
          }),
        ]}
      />
      <PageHero
        title="Alaska Cruise Ships"
        subtitle="Ship-specific Alaska planning guides with itineraries, common ports, shore excursion picks, and links to schedules and local specialists."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Alaska Cruise Ships", path: "/alaska-cruise-ships" },
            ]}
          />

          <ShipsHub
            ships={hubShips}
            basePath="/alaska-cruise-ships"
            cruiseLinesBasePath="/alaska-cruise-lines"
          />

          <div className="mt-12 rounded-xl border border-caribbean-200 bg-caribbean-50/40 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Cruise Line → Ship → Port → Schedule</h3>
            <p className="text-sm text-gray-700 mb-4">
              Start with a cruise line guide, drill into your ship, then use port guides and ship schedules to
              plan independent shore excursions through specialist local operators.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/alaska-cruise-lines" className="btn-primary text-sm">
                Alaska Cruise Line Guides
              </Link>
              <Link href="/ship-schedules" className="btn-secondary text-sm">
                Ship Schedules
              </Link>
              <Link href="/ports" className="btn-secondary text-sm">
                Port Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
