import Link from "next/link";
import type { Comparison } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { getRelatedComparisons } from "@/data/comparisons";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { JsonLd } from "@/components/JsonLd";
import { SpecialistLocalGuideSection } from "@/components/SpecialistLocalGuide";
import { getClusterLinksForComparison } from "@/data/topic-clusters";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { hasShipSchedule } from "@/lib/routes";
import { evaluatePortConfidence } from "@/lib/cruise-confidence";
import { DestinationHeroBand } from "@/components/DestinationHeroBand";
import { CruiseConfidenceCard } from "@/components/CruiseConfidenceCard";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";

const CATEGORIES: { key: keyof Comparison; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "beaches", label: "Beaches" },
  { key: "excursions", label: "Shore Excursions" },
  { key: "families", label: "Families" },
  { key: "couples", label: "Couples" },
  { key: "snorkeling", label: "Snorkeling" },
  { key: "cruisePortExperience", label: "Cruise Port Experience" },
  { key: "easeFromPort", label: "Ease From Ship" },
  { key: "bestForFirstTimers", label: "Best For First-Time Visitors" },
  { key: "foodAndDrink", label: "Food & Drink" },
];

export function ComparisonPageView({ comp }: { comp: Comparison }) {
  const portA = getPortBySlug(comp.portASlug);
  const portB = getPortBySlug(comp.portBSlug);
  const clusterLinks = getClusterLinksForComparison(comp.slug);
  const relatedComparisons = getRelatedComparisons(comp.slug);
  const schedulePorts = [comp.portASlug, comp.portBSlug].filter((slug) => hasShipSchedule(slug));
  const portAConfidence = evaluatePortConfidence(comp.portASlug);
  const portBConfidence = evaluatePortConfidence(comp.portBSlug);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Alaska Excursion Finder", path: "/alaska-cruise-excursion-planner" },
    { name: `${comp.portA} vs ${comp.portB}`, path: `/${comp.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(comp.faqs),
          travelGuideSchema({
            title: comp.seoTitle,
            description: comp.metaDescription,
            path: `/${comp.slug}`,
          }),
        ]}
      />
      <PageHero title={comp.title} subtitle={comp.summary} compact />
      <article className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Cruise Confidence</h2>
            <p className="text-sm text-gray-600 mb-4">
              Planning guidance based on typical excursion duration, transfers, and return buffer — not guarantees.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <CruiseConfidenceCard assessment={portAConfidence} title={`${comp.portA} confidence`} />
              <CruiseConfidenceCard assessment={portBConfidence} title={`${comp.portB} confidence`} />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Port Guides & Local Booking</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Compare both destinations in depth below, then open each authority port guide or book
              directly with local excursion specialists.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {portA && (
                <div className="card-editorial overflow-hidden">
                  <DestinationHeroBand
                    imageTheme={portA.imageTheme}
                    imageAlt={portA.imageAlt}
                    title={comp.portA}
                    subtitle={portA.country}
                    eyebrow="Port guide"
                    heightClass="h-32"
                    portSlug={comp.portASlug}
                  />
                  <div className="flex flex-wrap gap-2 p-5">
                    <ExcursionCardCTAs portSlug={comp.portASlug} className="mt-0" />
                  </div>
                </div>
              )}
              {portB && (
                <div className="card-editorial overflow-hidden">
                  <DestinationHeroBand
                    imageTheme={portB.imageTheme}
                    imageAlt={portB.imageAlt}
                    title={comp.portB}
                    subtitle={portB.country}
                    eyebrow="Port guide"
                    heightClass="h-32"
                    portSlug={comp.portBSlug}
                  />
                  <div className="flex flex-wrap gap-2 p-5">
                    <ExcursionCardCTAs portSlug={comp.portBSlug} className="mt-0" />
                  </div>
                </div>
              )}
            </div>
          </section>

          {CATEGORIES.map(({ key, label }) => {
            const category = comp[key];
            if (!category || typeof category !== "object" || !("portA" in category)) return null;
            return (
              <section key={key} className="mb-10">
                <h2 className="section-title text-2xl sm:text-3xl mb-6">{label}</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="card p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                      {comp.portA}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{category.portA}</p>
                  </div>
                  <div className="card p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                      {comp.portB}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{category.portB}</p>
                  </div>
                </div>
              </section>
            );
          })}

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Best Overall Winner</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{comp.bestOverall}</p>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Detailed Comparison Table</h2>
            <p className="text-sm text-gray-600 mb-4">
              Side-by-side ratings across the categories cruise passengers weigh most when choosing
              between {comp.portA} and {comp.portB}.
            </p>
            <ComparisonTable
              portA={comp.portA}
              portB={comp.portB}
              rows={comp.comparisonTable}
            />
          </section>

          <section className="mb-12 rounded-xl bg-caribbean-50 border border-caribbean-100 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Our Verdict</h2>
            <p className="text-gray-700 leading-relaxed">{comp.verdict}</p>
          </section>

          {schedulePorts.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-4">Ship Schedules</h2>
              <p className="text-sm text-gray-600 mb-4">
                Check published arrival and departure times before booking excursions with strict
                return windows.
              </p>
              <div className="flex flex-wrap gap-2">
                {schedulePorts.map((slug) => {
                  const port = getPortBySlug(slug);
                  if (!port) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/ship-schedules/${slug}`}
                      className="rounded-lg border border-caribbean-200 bg-white px-4 py-2 text-sm font-medium text-caribbean-800 hover:border-caribbean-400"
                    >
                      {port.name} Ship Schedule
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {clusterLinks.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-4">Regional Cruise Planners</h2>
              <p className="text-sm text-gray-600 mb-4">
                Compare these ports with broader Alaska cruise planning guides.
              </p>
              <div className="flex flex-wrap gap-2">
                {clusterLinks.map((cluster) => (
                  <Link
                    key={cluster.slug}
                    href={`/${cluster.slug}`}
                    className="rounded-lg border border-caribbean-200 bg-white px-4 py-2 text-sm font-medium text-caribbean-800 hover:border-caribbean-400"
                  >
                    {cluster.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedComparisons.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-4">Related Comparisons</h2>
              <p className="text-sm text-gray-600 mb-4">
                Head-to-head guides for nearby ports and alternative cruise days in the same region.
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedComparisons.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${related.slug}`}
                    className="rounded-lg border border-caribbean-200 bg-white px-4 py-2 text-sm font-medium text-caribbean-800 hover:border-caribbean-400"
                  >
                    {related.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <SpecialistLocalGuideSection
            portSlugs={[comp.portASlug, comp.portBSlug]}
            intro={`Once you have chosen between ${comp.portA} and ${comp.portB}, visit each port's dedicated local specialist site for live tour availability, operator pricing, and pier pickup details.`}
          />

          <FAQSection faqs={comp.faqs} />

          <div className="mt-12">
            <AuthorityHubLinks />
          </div>
        </div>
      </article>
    </>
  );
}
