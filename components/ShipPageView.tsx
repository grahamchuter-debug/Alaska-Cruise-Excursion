import Link from "next/link";
import type { CruiseShip, ShipRecommendation } from "@/data/types";
import { getCruiseLineBySlug } from "@/data/cruise-lines";
import { getPortBySlug } from "@/data/ports";
import { getShipBySlug } from "@/data/ships";
import { hasShipSchedule } from "@/lib/routes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";

function PortLink({ portSlug }: { portSlug: string }) {
  const port = getPortBySlug(portSlug);
  if (!port) return <span>{portSlug}</span>;
  return (
    <Link href={`/ports/${portSlug}`} className="text-caribbean-700 hover:underline">
      {port.name}
    </Link>
  );
}

function RecommendationSection({
  title,
  items,
  sectionHint,
}: {
  title: string;
  items: ShipRecommendation[];
  sectionHint?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="section-title text-2xl sm:text-3xl mb-6">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-caribbean-700">
              <PortLink portSlug={item.portSlug} />
            </p>
            <p className="mt-2 text-gray-700 leading-relaxed text-sm">{item.advice}</p>
            <ExcursionCardCTAs
              portSlug={item.portSlug}
              sectionHint={sectionHint ?? title}
              text={item.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ShipPageView({ ship }: { ship: CruiseShip }) {
  const line = getCruiseLineBySlug(ship.cruiseLineSlug);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Ships", path: "/ships" },
    { name: ship.name, path: `/ships/${ship.slug}` },
  ];

  const familyRecs = ship.familyRecommendations ?? [];
  const beachRecs = ship.beachRecommendations ?? [];
  const snorkelRecs = ship.snorkellingRecommendations ?? [];
  const privateRecs = ship.privateTourRecommendations ?? [];
  const relatedShips = (ship.relatedShipSlugs ?? [])
    .map((slug) => getShipBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(ship.faqs),
          travelGuideSchema({
            title: ship.seoTitle,
            description: ship.metaDescription,
            path: `/ships/${ship.slug}`,
          }),
        ]}
      />
      <article className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Ship Overview</h2>
            {line && (
              <div className="mb-6 flex flex-wrap gap-3">
                <Link href={`/cruise-lines/${line.slug}`} className="btn-secondary text-sm">
                  {line.name} Cruise Line Guide
                </Link>
                <Link href={`/${line.pageSlug}`} className="btn-secondary text-sm">
                  {line.name} Shore Excursions
                </Link>
              </div>
            )}
            <p className="text-gray-700 leading-relaxed text-lg">{ship.overview}</p>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Typical Caribbean Itineraries</h2>
            <ul className="space-y-3">
              {ship.caribbeanItineraries.map((itinerary) => (
                <li key={itinerary} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 text-caribbean-500">→</span>
                  {itinerary}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Common Caribbean Ports Visited</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {ship.commonPortSlugs.map((portSlug) => {
                const port = getPortBySlug(portSlug);
                if (!port) return null;
                return (
                  <div key={portSlug} className="card-gradient">
                    <h3 className="font-semibold text-gray-900">
                      <Link href={`/ports/${portSlug}`} className="hover:text-caribbean-700">
                        {port.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-caribbean-600">{port.bestFor}</p>
                    <ExcursionCardCTAs portSlug={portSlug} className="mt-4" />
                  </div>
                );
              })}
            </div>
          </section>

          {ship.recommendedExcursions.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Recommended Shore Excursions</h2>
              <div className="space-y-4">
                {ship.recommendedExcursions.map((exc) => (
                  <div key={`${exc.portSlug}-${exc.name}`} className="card">
                    <h3 className="font-semibold text-gray-900 text-lg">{exc.name}</h3>
                    <p className="mt-1 text-sm text-caribbean-700">
                      <PortLink portSlug={exc.portSlug} />
                    </p>
                    <p className="mt-2 text-gray-600 leading-relaxed">{exc.description}</p>
                    <ExcursionCardCTAs
                      portSlug={exc.portSlug}
                      text={`${exc.name} ${exc.description}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <RecommendationSection title="Family Recommendations" items={familyRecs} sectionHint="family" />
          <RecommendationSection title="Beach Recommendations" items={beachRecs} sectionHint="beaches" />
          <RecommendationSection title="Snorkelling Recommendations" items={snorkelRecs} sectionHint="snorkeling" />
          <RecommendationSection title="Private Tour Recommendations" items={privateRecs} sectionHint="private" />

          {ship.planningAdvice.length > 0 && (
            <section className="mb-12 rounded-2xl border-2 border-caribbean-200 bg-caribbean-50/40 p-6 sm:p-8">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Cruise Planning Tips</h2>
              <ul className="space-y-3">
                {ship.planningAdvice.map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white text-xs">
                      ✓
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/ship-schedules" className="text-sm text-caribbean-700 hover:underline">
                  Ship schedules hub →
                </Link>
                <Link href="/cruise-planner" className="text-sm text-caribbean-700 hover:underline">
                  Caribbean cruise planner →
                </Link>
              </div>
            </section>
          )}

          {relatedShips.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Related Ships</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedShips.map(
                  (related) =>
                    related && (
                      <Link
                        key={related.slug}
                        href={`/ships/${related.slug}`}
                        className="rounded-lg border border-gray-200 bg-white p-4 hover:border-caribbean-200 hover:shadow-sm transition-all"
                      >
                        <span className="font-semibold text-gray-900">{related.name}</span>
                        <span className="block text-xs text-gray-500 mt-1 line-clamp-2">{related.tagline}</span>
                      </Link>
                    ),
                )}
              </div>
            </section>
          )}

          {line && (
            <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="section-title text-2xl sm:text-3xl mb-4">Related Cruise Line</h2>
              <p className="text-gray-700 mb-4">
                Continue planning with the full {line.name} hub: fleet overview, all ships, popular ports, and
                excursion categories.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/cruise-lines/${line.slug}`} className="btn-primary text-sm">
                  {line.name} Cruise Line Hub
                </Link>
                <Link href={`/${line.pageSlug}`} className="btn-secondary text-sm">
                  {line.name} Shore Excursions Guide
                </Link>
                <Link href="/ships" className="btn-secondary text-sm">
                  All Caribbean Ships
                </Link>
              </div>
            </section>
          )}

          <section className="mb-12 rounded-2xl border border-caribbean-200 bg-caribbean-50/40 p-6 sm:p-8">
            <h2 className="section-title text-2xl sm:text-3xl mb-2">Plan and Book This Ship&apos;s Port Days</h2>
            <p className="text-sm text-gray-600 mb-5">
              Match excursions to your itinerary with the Caribbean Excursion Finder, or open the cruise line shore
              excursions guide for fleet-wide recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/caribbean-excursion-finder" className="btn-primary text-sm">
                Caribbean Excursion Finder
              </Link>
              {line && (
                <Link href={`/${line.pageSlug}`} className="btn-secondary text-sm">
                  {line.name} Shore Excursions Guide
                </Link>
              )}
              <Link href="/ship-schedules" className="btn-secondary text-sm">
                Check Ship Schedules
              </Link>
            </div>
          </section>

          {ship.faqs.length > 0 && <FAQSection faqs={ship.faqs} />}
        </div>
      </article>
    </>
  );
}
