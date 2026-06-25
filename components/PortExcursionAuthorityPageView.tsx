import Link from "next/link";
import type { PortExcursionAuthorityPage, PortExcursionCategoryPick } from "@/data/types";
import { getPortBySlug, getAllPortSlugs } from "@/data/ports";
import { bestGuides } from "@/data/best-guides";
import { comparisons } from "@/data/comparisons";
import { itineraryPlanners } from "@/data/itinerary-planners";
import { cruiseLines } from "@/data/cruise-lines";
import { regions } from "@/data/regions";
import { excursionTypes } from "@/data/excursion-types";
import { schedulePorts } from "@/data/schedules";
import { hasShipSchedule } from "@/lib/routes";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { PortExcursionAuthorityTable } from "@/components/PortExcursionAuthorityTable";
import { JsonLd } from "@/components/JsonLd";
import { SpecialistLocalGuideSection } from "@/components/SpecialistLocalGuide";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { MeetingPointSnapshot } from "@/components/MeetingPointSnapshot";
import { evaluatePortConfidence } from "@/lib/cruise-confidence";
import { CruiseConfidenceBadge } from "@/components/CruiseConfidenceBadge";
import { matchesSignatureExcursion } from "@/lib/excursion-logistics";

function CategorySection({
  title,
  picks,
  guideSlug,
  guideLabel,
  sectionHint,
}: {
  title: string;
  picks: PortExcursionCategoryPick[];
  guideSlug?: string;
  guideLabel?: string;
  sectionHint?: string;
}) {
  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="section-title text-2xl sm:text-3xl">{title}</h2>
        {guideSlug && guideLabel && (
          <Link
            href={`/${guideSlug}`}
            className="text-sm font-medium text-caribbean-700 hover:underline shrink-0"
          >
            {guideLabel} →
          </Link>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {picks.map((pick) => {
          const port = getPortBySlug(pick.portSlug);
          const confidence = evaluatePortConfidence(pick.portSlug);
          return (
            <div key={`${pick.portSlug}-${pick.excursionName}`} className="card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900">{pick.excursionName}</h3>
                <CruiseConfidenceBadge level={confidence.level} />
              </div>
              <p className="mt-1 text-sm text-caribbean-700">
                <Link href={`/ports/${pick.portSlug}`} className="hover:underline">
                  {port?.name ?? pick.portSlug}
                </Link>
              </p>
              <p className="mt-2 text-gray-600 leading-relaxed text-sm">{pick.description}</p>
              {matchesSignatureExcursion(pick.portSlug, pick.excursionName) && (
                <MeetingPointSnapshot
                  portSlug={pick.portSlug}
                  excursionName={pick.excursionName}
                  compact
                  className="mt-4"
                />
              )}
              <ExcursionCardCTAs
                portSlug={pick.portSlug}
                sectionHint={sectionHint ?? title}
                guideHref={guideSlug ? `/${guideSlug}` : undefined}
                text={`${pick.excursionName} ${pick.description}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function PortExcursionAuthorityPageView({ page }: { page: PortExcursionAuthorityPage }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Best Excursions", path: "/best-caribbean-shore-excursions" },
    { name: page.title, path: `/${page.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(page.faqs),
          travelGuideSchema({
            title: page.seoTitle,
            description: page.metaDescription,
            path: `/${page.slug}`,
          }),
        ]}
      />
      <PageHero title={page.title} subtitle={page.heroSubtitle} />
      <article className="section-padding">
        <div className="container-wide max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-12">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">{page.introduction}</p>
            <p className="text-gray-700 leading-relaxed">{page.introductionDetail}</p>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">
              Best Excursion at Every Caribbean Port
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Master reference table for all {page.portTable.length} ports, click any port name
              for the full authority guide or specialist booking site.
            </p>
            <PortExcursionAuthorityTable rows={page.portTable} />
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-2">Meeting Point Snapshots</h2>
            <p className="section-subtitle mb-6">
              First-time cruise passengers: where to meet, how far from your ship, and whether you need a taxi —
              for each port&apos;s signature excursion.
            </p>
            <div className="grid gap-5 lg:grid-cols-2">
              {page.portTable.map((row) => (
                <MeetingPointSnapshot
                  key={row.portSlug}
                  portSlug={row.portSlug}
                  excursionName={row.bestExcursion}
                />
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-xl border border-caribbean-200 bg-caribbean-50/50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
              All Caribbean Port Authority Guides
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Jump directly to any port guide, ship schedule, or local specialist website.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {getAllPortSlugs().map((slug) => {
                const port = getPortBySlug(slug);
                if (!port) return null;
                return (
                  <div key={slug} className="rounded-lg bg-white border border-gray-100 p-4">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      <Link href={`/ports/${slug}`} className="hover:text-caribbean-700">
                        {port.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-caribbean-600 mt-0.5">{port.bestFor}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Link href={`/ports/${slug}`} className="text-xs text-caribbean-700 hover:underline">
                        Port guide
                      </Link>
                      {hasShipSchedule(slug) && (
                        <>
                          <span className="text-gray-300">·</span>
                          <Link
                            href={`/ship-schedules/${slug}`}
                            className="text-xs text-caribbean-700 hover:underline"
                          >
                            Schedule
                          </Link>
                        </>
                      )}
                      <span className="text-gray-300">·</span>
                      <a
                        href={port.specialistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-caribbean-700 hover:underline"
                      >
                        Specialist
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <CategorySection
            title="Best Beach Excursions"
            picks={page.bestBeachExcursions}
            guideSlug="best-caribbean-beach-excursions"
            guideLabel="Full beach excursions guide"
            sectionHint="beaches"
          />
          <CategorySection
            title="Best Snorkelling Excursions"
            picks={page.bestSnorkellingExcursions}
            guideSlug="best-caribbean-snorkeling-excursions"
            guideLabel="Full snorkeling guide"
            sectionHint="snorkeling"
          />
          <CategorySection
            title="Best Wildlife Excursions"
            picks={page.bestWildlifeExcursions}
            guideSlug="best-caribbean-wildlife-excursions"
            guideLabel="Full wildlife guide"
            sectionHint="wildlife"
          />
          <CategorySection
            title="Best Family Excursions"
            picks={page.bestFamilyExcursions}
            guideSlug="best-caribbean-family-excursions"
            guideLabel="Full family guide"
            sectionHint="family"
          />
          <CategorySection
            title="Best Private Excursions"
            picks={page.bestPrivateExcursions}
            guideSlug="best-caribbean-private-tours"
            guideLabel="Full private tours guide"
            sectionHint="private"
          />

          <SpecialistLocalGuideSection
            portSlugs={page.portTable.map((row) => row.portSlug)}
            intro="Every port in the master table above has a dedicated local specialist website. Visit each for live tour listings, local operator pricing, and pier pickup details when you are ready to book."
          />

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Plan Your Full Cruise</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Region cruise planners</h3>
                <div className="flex flex-wrap gap-2">
                  {itineraryPlanners.map((planner) => (
                    <Link
                      key={planner.slug}
                      href={`/${planner.slug}`}
                      className="rounded-full bg-caribbean-50 px-3 py-1.5 text-sm font-medium text-caribbean-700 hover:bg-caribbean-100"
                    >
                      {planner.title.replace(" Cruise Planner", "")}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Region port guides</h3>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <Link
                      key={region.slug}
                      href={`/${region.slug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                    >
                      {region.title.replace(" Guide", "")}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Port comparisons</h3>
                <div className="flex flex-wrap gap-2">
                  {comparisons.map((comp) => (
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
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Best excursion guides</h3>
                <div className="flex flex-wrap gap-2">
                  {bestGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/${guide.slug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                    >
                      {guide.title.replace("Best Caribbean ", "")}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Cruise line shore excursion guides</h3>
                <div className="flex flex-wrap gap-2">
                  {cruiseLines.map((line) => (
                    <Link
                      key={line.pageSlug}
                      href={`/${line.pageSlug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                    >
                      {line.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Excursion types & ship schedules</h3>
                <div className="flex flex-wrap gap-2">
                  {excursionTypes.map((type) => (
                    <Link
                      key={type.slug}
                      href={`/excursion-types/${type.slug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                    >
                      {type.name}
                    </Link>
                  ))}
                  {schedulePorts.map((port) => (
                    <Link
                      key={port.slug}
                      href={`/ship-schedules/${port.slug}`}
                      className="rounded-full bg-caribbean-50 px-3 py-1.5 text-sm font-medium text-caribbean-700 hover:bg-caribbean-100"
                    >
                      {port.name} schedule
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/cruise-planner" className="btn-primary text-sm">
                Full Cruise Planner
              </Link>
              <Link href="/ports" className="btn-secondary text-sm">
                All Ports
              </Link>
              <Link href="/ship-schedules" className="btn-secondary text-sm">
                Ship Schedules
              </Link>
            </div>
          </section>

          <FAQSection faqs={page.faqs} />
        </div>
      </article>
    </>
  );
}
