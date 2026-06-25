import Link from "next/link";
import type { RegionalCruisePlannerPage } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { getBestGuideBySlug } from "@/data/best-guides";
import { getRegionalCruisePlannerBySlug, regionalCruisePlanners } from "@/data/regional-cruise-planners";
import { getItineraryPlannerBySlug } from "@/data/itinerary-planners";
import { getRegionBySlug } from "@/data/regions";
import { excursionTypes } from "@/data/excursion-types";
import { comparisons } from "@/data/comparisons";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import { getCruiseDayPlanDownloadUrl } from "@/lib/cruise-day-plan";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { BestGuideComparisonTable } from "@/components/BestGuideComparisonTable";
import { SpecialistLocalGuideSection } from "@/components/SpecialistLocalGuide";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { JsonLd } from "@/components/JsonLd";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { ClusterPageSections } from "@/components/ClusterPageSections";
import { getTopicCluster } from "@/data/topic-clusters";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { ExploreByRegion } from "@/components/ExploreByRegion";
import { getCaribbeanRegionIdForPlanner } from "@/data/caribbean-regions-map";

function PortLink({ portSlug }: { portSlug: string }) {
  const port = getPortBySlug(portSlug);
  if (!port) return <span>{portSlug}</span>;
  return (
    <Link href={`/ports/${portSlug}`} className="text-caribbean-700 hover:underline">
      {port.name}
    </Link>
  );
}

export function RegionalCruisePlannerPageView({ planner }: { planner: RegionalCruisePlannerPage }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Cruise Planner", path: "/cruise-planner" },
    { name: planner.title, path: `/${planner.slug}` },
  ];

  const parentPlanner = getItineraryPlannerBySlug(planner.parentPlannerSlug);
  const regionPage = getRegionBySlug(planner.regionPageSlug);
  const relatedRegionalPlanners = planner.relatedRegionalPlannerSlugs
    .map((slug) => getRegionalCruisePlannerBySlug(slug))
    .filter(Boolean);
  const cluster = getTopicCluster(planner.slug);
  const relatedComparisons = comparisons.filter(
    (c) =>
      planner.topPortSlugs.includes(c.portASlug) ||
      planner.topPortSlugs.includes(c.portBSlug),
  );

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
            <h2 className="section-title text-2xl sm:text-3xl mb-4">About This Region</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">{planner.overview}</p>
            <p className="text-gray-700 leading-relaxed">{planner.overviewDetail}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {parentPlanner && (
                <Link href={`/${parentPlanner.slug}`} className="text-caribbean-700 hover:underline font-medium">
                  {parentPlanner.title} →
                </Link>
              )}
              {regionPage && (
                <Link href={`/${regionPage.slug}`} className="text-caribbean-700 hover:underline font-medium">
                  {regionPage.title} →
                </Link>
              )}
            </div>
          </section>

          {cluster ? (
            <div className="mb-12">
              <ClusterPageSections cluster={cluster} />
            </div>
          ) : (
            <>
              <section className="mb-12">
                <h2 className="section-title text-2xl sm:text-3xl mb-4">Compare Included Ports</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{planner.portComparison}</p>
                <BestGuideComparisonTable rows={planner.comparisonTable} />
              </section>
              <section className="mb-12">
                <h2 className="section-title text-2xl sm:text-3xl mb-6">Ports in This Region</h2>
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
                          <ExcursionCardCTAs portSlug={slug} specialistOnly className="mt-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          <SpecialistLocalGuideSection
            portSlugs={planner.topPortSlugs}
            intro="Each port in this regional itinerary has a dedicated local specialist website with live tour listings, transparent pricing, and pier pickup details."
          />

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Recommended Excursions</h2>
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
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Recommended Beaches</h2>
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
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Family Excursion Recommendations</h2>
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

          <section className="mb-12 rounded-xl border border-caribbean-100 bg-caribbean-50/40 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Plan Across the Caribbean</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Other regional cruise planners</h3>
                <div className="flex flex-wrap gap-2">
                  {regionalCruisePlanners.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/${rp.slug}`}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                        rp.slug === planner.slug
                          ? "bg-caribbean-700 text-white"
                          : "bg-white text-caribbean-700 border border-caribbean-200 hover:border-caribbean-400"
                      }`}
                    >
                      {rp.title.replace(" Cruise Planner", "")}
                    </Link>
                  ))}
                </div>
              </div>
              {relatedRegionalPlanners.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Related regional guides</h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedRegionalPlanners.map(
                      (rp) =>
                        rp && (
                          <Link
                            key={rp.slug}
                            href={`/${rp.slug}`}
                            className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                          >
                            {rp.title.replace(" Cruise Planner", "")}
                          </Link>
                        ),
                    )}
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Excursion type guides</h3>
                <div className="flex flex-wrap gap-2">
                  {planner.excursionTypeSlugs.map((slug) => {
                    const type = excursionTypes.find((t) => t.slug === slug);
                    return type ? (
                      <Link
                        key={slug}
                        href={`/excursion-types/${slug}`}
                        className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                      >
                        {type.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Best excursion authority guides</h3>
                <div className="flex flex-wrap gap-2">
                  {planner.bestGuideSlugs.map((slug) => {
                    const guide = getBestGuideBySlug(slug);
                    return guide ? (
                      <Link
                        key={slug}
                        href={`/${slug}`}
                        className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-caribbean-700 border border-caribbean-100 hover:bg-caribbean-50"
                      >
                        {guide.title.replace("Best Caribbean ", "")}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
              {relatedComparisons.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Port comparisons</h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedComparisons.map((comp) => (
                      <Link
                        key={comp.slug}
                        href={`/compare/${comp.slug}`}
                        className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                      >
                        {comp.portA} vs {comp.portB}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/cruise-planner" className="btn-primary text-sm">
                Full Cruise Planner
              </Link>
              <Link href="/best-shore-excursion-every-caribbean-port" className="btn-secondary text-sm">
                Every Port Guide
              </Link>
              <Link href="/ports" className="btn-secondary text-sm">
                All Port Guides
              </Link>
            </div>
          </section>

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
