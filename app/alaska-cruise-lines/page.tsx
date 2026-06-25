import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { cruiseLines } from "@/data/cruise-lines";
import { getFeaturedShips } from "@/data/ships";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";
import { NavCardCta } from "@/components/NavCardCta";

export const metadata = buildMetadata({
  title: "Alaska Cruise Line Guides",
  description:
    "Alaska cruise planning guides for Royal Caribbean, Carnival, Norwegian, MSC, Princess, and Celebrity. Fleet overviews, popular ships, ports, excursions, and booking advice.",
  path: "/alaska-cruise-lines",
  keywords: ["cruise line guides", "Alaska cruise lines", "Alaska shore excursion booking"],
});

export default function AlaskaCruiseLinesPage() {
  const featuredShips = getFeaturedShips();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alaska Cruise Lines", path: "/alaska-cruise-lines" },
          ]),
          travelGuideSchema({
            title: "Alaska Cruise Line Guides",
            description: "Planning guides for major cruise lines sailing Alaska.",
            path: "/alaska-cruise-lines",
          }),
        ]}
      />
      <PageHero
        title="Alaska Cruise Line Guides"
        subtitle="Alaska-specific planning for every major cruise line: fleet overviews, popular ships, hub ports, excursion categories, and shore excursion booking strategies."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Alaska Cruise Lines", path: "/alaska-cruise-lines" },
            ]}
          />

          <div className="mb-10 rounded-xl border border-caribbean-200 bg-caribbean-50/40 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Cruise Line → Ship → Port → Schedule</h2>
              <p className="mt-1 text-sm text-gray-600">
                Pick your cruise line, find your ship, then plan port days with authority guides and live schedules.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Link href="/alaska-cruise-ships" className="btn-primary text-sm">
                Browse Ships
              </Link>
              <Link href="/ship-schedules" className="btn-secondary text-sm">
                Ship Schedules
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
            {cruiseLines.map((line) => (
              <div key={line.slug} className="card-gradient group">
                <Link href={`/alaska-cruise-lines/${line.slug}`} className="block">
                  <h2 className="font-display text-xl font-bold text-gray-900 group-hover:text-caribbean-700">
                    {line.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">{line.tagline}</p>
                </Link>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {line.popularPorts.slice(0, 3).map((p) => (
                    <span key={p.slug} className="rounded bg-caribbean-50 px-2 py-0.5 text-xs text-caribbean-700">
                      {p.name}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link href={`/alaska-cruise-lines/${line.slug}`} className="text-caribbean-700 hover:underline font-medium">
                    Planning hub →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <section>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <h2 className="section-title text-2xl sm:text-3xl">Featured Alaska Ships</h2>
              <Link href="/alaska-cruise-ships" className="text-sm text-caribbean-700 hover:underline">
                All ships →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredShips.map((ship) => (
                <Link key={ship.slug} href={`/alaska-cruise-ships/${ship.slug}`} className="card hover:border-caribbean-200 flex h-full flex-col">
                  <span className="font-semibold text-gray-900">{ship.name}</span>
                  <span className="block text-xs text-gray-500 mt-1 line-clamp-2">{ship.tagline}</span>
                  <NavCardCta className="pt-4">View {ship.name} ship guide</NavCardCta>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
