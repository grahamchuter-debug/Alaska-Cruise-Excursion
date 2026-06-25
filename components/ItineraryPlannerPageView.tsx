import Link from "next/link";
import type { ItineraryPlannerPage } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { getBestGuideBySlug } from "@/data/best-guides";
import { comparisons } from "@/data/comparisons";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import { getCruiseDayPlanDownloadUrl } from "@/lib/cruise-day-plan";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { JsonLd } from "@/components/JsonLd";
import { SpecialistLocalGuideSection } from "@/components/SpecialistLocalGuide";
import { getRegionalPlannersByParentPlanner } from "@/data/regional-cruise-planners";
import { ClusterPageSections } from "@/components/ClusterPageSections";
import { getTopicCluster } from "@/data/topic-clusters";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { ExploreByRegion } from "@/components/ExploreByRegion";
import { getCaribbeanRegionIdForPlanner } from "@/data/caribbean-regions-map";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { NavCardCta } from "@/components/NavCardCta";

function PortLink({ portSlug }: { portSlug: string }) {
  const port = getPortBySlug(portSlug);
  if (!port) return <span>{portSlug}</span>;
  return (
    <Link href={`/ports/${portSlug}`} className="text-caribbean-700 hover:underline">
      {port.name}
    </Link>
  );
}

export function ItineraryPlannerPageView({ planner }: { planner: ItineraryPlannerPage }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Cruise Planner", path: "/cruise-planner" },
    { name: planner.title, path: `/${planner.slug}` },
  ];

  const relatedComparisons = comparisons
    .filter(
      (c) =>
        planner.topPortSlugs.includes(c.portASlug) ||
        planner.topPortSlugs.includes(c.portBSlug),
    )
    .slice(0, 3);

  const regionalPlanners = getRegionalPlannersByParentPlanner(planner.slug);
  const cluster = getTopicCluster(planner.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(planner.faqs),
          travelGuideSchema({
            title: planner.seoTitle,
            description: planner.metaDescription,
            path: `/${planner.slug}`,
          }),
        ]}
      />
      <PageHero title={planner.title} subtitle={planner.heroSubtitle} />
      <article className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Region Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">{planner.overview}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{planner.overviewDetail}</p>
            <ul className="space-y-3">
              {planner.itineraryHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {cluster ? (
            <div className="mb-12">
              <ClusterPageSections cluster={cluster} />
            </div>
          ) : (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Ports Included</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {planner.topPortSlugs.map((slug) => {
                  const port = getPortBySlug(slug);
                  const scheduleCta = getBestScheduleUrl({ portSlug: slug });
                  if (!port) return null;
                  return (
                    <div key={slug} className="card-gradient">
                      <h3 className="font-display text-lg font-bold text-gray-900">
                        <Link href={`/ports/${slug}`} className="hover:text-caribbean-700">
                          {port.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-caribbean-600 font-medium">{port.bestFor}</p>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{port.tagline}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link href={`/ports/${slug}`} className="btn-primary text-xs">
                          Authority Port Guide
                        </Link>
                        <Link href={getCruiseDayPlanDownloadUrl({ portSlug: slug })} className="btn-primary text-xs">
                          Download PDF
                        </Link>
                        {scheduleCta && (
                          <Link href={scheduleCta.href} className="btn-secondary text-xs">
                            Ship Schedule
                          </Link>
                        )}
                        {scheduleCta?.fallbackNote && (
                          <p className="w-full text-xs text-gray-500">{scheduleCta.fallbackNote}</p>
                        )}
                        <a
                          href={port.specialistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs"
                        >
                          {port.specialistName}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <div className="mb-12">
            <Link
              href={`/${planner.regionPageSlug}`}
              className="text-sm font-medium text-caribbean-700 hover:underline"
            >
              View full region port guide →
            </Link>
          </div>

          <SpecialistLocalGuideSection
            portSlugs={planner.topPortSlugs}
            intro="This itinerary covers the ports below. Visit each specialist local site for live availability, operator-specific pricing, and pier pickup details when you are ready to book."
          />

          {regionalPlanners.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Regional Cruise Planners</h2>
              <p className="text-gray-700 mb-6">
                Drill into sub-regions on this itinerary with dedicated port comparisons, beach picks, and family excursion guides.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {regionalPlanners.map((regional) => (
                  <Link key={regional.slug} href={`/${regional.slug}`} className="card-gradient group flex h-full flex-col">
                    <h3 className="font-semibold text-gray-900">{regional.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{regional.heroSubtitle}</p>
                    <NavCardCta className="pt-4">Open regional planner</NavCardCta>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Best Excursions</h2>
            <div className="space-y-4">
              {planner.bestExcursions.map((exc) => (
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

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Suggested Cruise Day Plans</h2>
            <div className="space-y-6">
              {planner.suggestedDayPlans.map((plan) => (
                <div key={plan.title} className="rounded-xl border border-caribbean-100 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-gray-900">{plan.title}</h3>
                  <p className="mt-1 text-sm text-caribbean-700">
                    <PortLink portSlug={plan.portSlug} />
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600 mb-1">
                        Morning
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm">{plan.morning}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600 mb-1">
                        Afternoon
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm">{plan.afternoon}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                    <span className="font-medium text-gray-800">Tip:</span> {plan.tip}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Best Beaches</h2>
            <div className="space-y-4">
              {planner.bestBeaches.map((item) => (
                <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-caribbean-700">
                    <PortLink portSlug={item.portSlug} />
                  </p>
                  <p className="mt-2 text-gray-700 leading-relaxed">{item.advice}</p>
                  <ExcursionCardCTAs portSlug={item.portSlug} sectionHint="beaches" text={item.title} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Best Snorkelling</h2>
            <div className="space-y-4">
              {planner.bestSnorkelling.map((item) => (
                <div key={item.title} className="rounded-lg border border-caribbean-100 bg-caribbean-50/30 p-5">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-caribbean-700">
                    <PortLink portSlug={item.portSlug} />
                  </p>
                  <p className="mt-2 text-gray-700 leading-relaxed">{item.advice}</p>
                  <ExcursionCardCTAs portSlug={item.portSlug} sectionHint="snorkeling" text={item.title} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Family Recommendations</h2>
            <div className="space-y-4">
              {planner.familyRecommendations.map((item) => (
                <div key={item.title} className="rounded-lg border border-caribbean-100 bg-caribbean-50/40 p-5">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-caribbean-700">
                    <PortLink portSlug={item.portSlug} />
                  </p>
                  <p className="mt-2 text-gray-700 leading-relaxed">{item.advice}</p>
                  <ExcursionCardCTAs portSlug={item.portSlug} sectionHint="family" text={item.title} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Private Tour Recommendations</h2>
            <div className="space-y-4">
              {planner.privateTourRecommendations.map((item) => (
                <div key={item.title} className="rounded-lg border border-tropical-mango/30 bg-orange-50/30 p-5">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-caribbean-700">
                    <PortLink portSlug={item.portSlug} />
                  </p>
                  <p className="mt-2 text-gray-700 leading-relaxed">{item.advice}</p>
                  <ExcursionCardCTAs portSlug={item.portSlug} sectionHint="private" text={item.title} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Best Excursion Guides</h2>
            <div className="flex flex-wrap gap-2">
              {planner.bestGuideSlugs.map((slug) => {
                const guide = getBestGuideBySlug(slug);
                return guide ? (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="rounded-full bg-caribbean-50 px-4 py-2 text-sm font-medium text-caribbean-700 hover:bg-caribbean-100"
                  >
                    {guide.title}
                  </Link>
                ) : null;
              })}
            </div>
          </section>

          {relatedComparisons.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Port Comparisons</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedComparisons.map((comp) => (
                  <Link key={comp.slug} href={`/compare/${comp.slug}`} className="card group flex h-full flex-col hover:border-caribbean-200">
                    <span className="font-semibold text-gray-900">
                      {comp.portA} vs {comp.portB}
                    </span>
                    <NavCardCta className="pt-3">Read port comparison</NavCardCta>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mb-12 flex flex-wrap gap-4">
            <Link href="/cruise-planner" className="btn-primary">
              Full Cruise Planner
            </Link>
            <Link href="/cruise-lines" className="btn-secondary">
              Cruise Line Guides
            </Link>
            <Link href="/ship-schedules" className="btn-secondary">
              Ship Schedules
            </Link>
          </div>

          <section className="mb-12 -mx-4 rounded-2xl border border-caribbean-100 bg-caribbean-50/30 px-4 py-10 sm:-mx-0 sm:px-6">
            <ExploreByRegion
              variant="compact"
              highlightRegionId={getCaribbeanRegionIdForPlanner(planner.slug)}
              heading="Explore Other Caribbean Regions"
              subtitle="Compare ports and planners across the Caribbean before you finalize shore excursions."
            />
          </section>

          <FAQSection faqs={planner.faqs} />

          <div className="mt-12">
            <AuthorityHubLinks />
          </div>
        </div>
      </article>
    </>
  );
}
