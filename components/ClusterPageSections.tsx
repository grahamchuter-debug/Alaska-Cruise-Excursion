import Link from "next/link";
import type { TopicClusterData } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { getBestGuideBySlug } from "@/data/best-guides";
import { getComparisonBySlug } from "@/data/comparisons";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import { ClusterComparisonTable } from "@/components/ClusterComparisonTable";
import { SCHEDULE_YEARS } from "@/lib/schedule-utils";
import { getVerifiedMonthKeysForPortYear } from "@/data/schedules";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";

export function ClusterPageSections({ cluster }: { cluster: TopicClusterData }) {
  const portsWithSchedules = cluster.portSlugs.filter((slug) => getBestScheduleUrl({ portSlug: slug }));

  return (
    <div className="space-y-12">
      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Ports Included</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {cluster.portSlugs.map((slug) => {
            const port = getPortBySlug(slug);
            const notes = cluster.portCardNotes[slug];
            const scheduleCta = getBestScheduleUrl({ portSlug: slug });
            if (!port) return null;
            return (
              <div key={slug} className="card-gradient">
                <h3 className="font-display text-lg font-bold text-gray-900">
                  <Link href={`/ports/${slug}`} className="hover:text-caribbean-700">
                    {port.name}
                  </Link>
                </h3>
                <p className="mt-1 text-xs font-medium text-caribbean-600">{port.bestFor}</p>
                {notes && (
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">{notes.shortDescription}</p>
                )}
                {notes && (
                  <p className="mt-2 text-xs text-gray-500">
                    Top excursion type: <span className="font-medium text-gray-700">{notes.topExcursionType}</span>
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/ports/${slug}`} className="btn-primary text-xs">
                    Authority Port Guide
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

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-4">Regional Comparison</h2>
        <p className="text-sm text-gray-600 mb-6">
          Compare ports in this cluster by excursion style, beach quality, snorkelling, family fit, private tour
          options, and ease from the cruise pier.
        </p>
        <ClusterComparisonTable rows={cluster.comparisonTable} />
      </section>

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Suggested Cruise Day Plans</h2>
        <div className="space-y-6">
          {cluster.dayPlans.map((plan) => {
            const port = getPortBySlug(plan.portSlug);
            if (!port) return null;
            return (
              <div key={plan.portSlug} className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                  <Link href={`/ports/${plan.portSlug}`} className="hover:text-caribbean-700">
                    {port.name}
                  </Link>
                </h3>
                <dl className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      ["Easy day", plan.easyDay],
                      ["Adventure day", plan.adventureDay],
                      ["Beach day", plan.beachDay],
                      ["Private tour day", plan.privateTourDay],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-caribbean-700">{label}</dt>
                      <dd className="mt-1 text-sm text-gray-700 leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Best Excursions by Traveller Type</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {cluster.travellerPicks.map((pick) => {
            const port = getPortBySlug(pick.portSlug);
            return (
              <div key={`${pick.travellerType}-${pick.portSlug}`} className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">{pick.travellerType}</p>
                <h3 className="mt-1 font-semibold text-gray-900">{pick.excursionName}</h3>
                <p className="mt-1 text-sm text-caribbean-700">
                  {port ? (
                    <Link href={`/ports/${pick.portSlug}`} className="hover:underline">
                      {port.name}
                    </Link>
                  ) : (
                    pick.portSlug
                  )}
                </p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{pick.description}</p>
                <ExcursionCardCTAs
                  portSlug={pick.portSlug}
                  guideHref={pick.guideHref}
                  sectionHint={pick.travellerType}
                  text={`${pick.excursionName} ${pick.description}`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {portsWithSchedules.length > 0 && (
        <section className="rounded-xl border border-caribbean-200 bg-caribbean-50/40 p-6">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Ship Schedule Links</h2>
          <p className="text-sm text-gray-600 mb-5">
            Check which ships call at ports in this cluster. Monthly schedule pages appear where verified import data
            exists.
          </p>
          <div className="space-y-4">
            {portsWithSchedules.map((slug) => {
              const port = getPortBySlug(slug);
              if (!port) return null;
              return (
                <div key={slug}>
                  <h3 className="font-semibold text-gray-900 mb-2">{port.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/ship-schedules/${slug}`} className="btn-secondary text-xs">
                      Schedule hub
                    </Link>
                    {SCHEDULE_YEARS.map((year) => (
                      <Link
                        key={year}
                        href={`/ship-schedules/${slug}/${year}`}
                        className="rounded-lg border border-caribbean-200 bg-white px-3 py-1.5 text-xs font-medium text-caribbean-800 hover:bg-caribbean-50"
                      >
                        {year} schedule
                        {getVerifiedMonthKeysForPortYear(slug, year).length > 0 &&
                          ` (${getVerifiedMonthKeysForPortYear(slug, year).length} months)`}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/ship-schedules/2026" className="text-sm text-caribbean-700 hover:underline">
              All 2026 Caribbean schedules →
            </Link>
            <Link href="/ship-schedules/2027" className="text-sm text-caribbean-700 hover:underline">
              All 2027 Caribbean schedules →
            </Link>
          </div>
        </section>
      )}

      {cluster.comparisonSlugs.length > 0 && (
        <section>
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Related Port Comparisons</h2>
          <div className="flex flex-wrap gap-2">
            {cluster.comparisonSlugs.map((slug) => {
              const comp = getComparisonBySlug(slug);
              if (!comp) return null;
              return (
                <Link
                  key={slug}
                  href={`/compare/${slug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:border-caribbean-300 hover:bg-caribbean-50"
                >
                  {comp.portA} vs {comp.portB}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-4">Best Excursion Authority Guides</h2>
        <div className="flex flex-wrap gap-2">
          {cluster.bestGuideSlugs.map((slug) => {
            const guide = getBestGuideBySlug(slug);
            return guide ? (
              <Link
                key={slug}
                href={`/${slug}`}
                className="rounded-full bg-caribbean-50 px-3 py-1.5 text-sm font-medium text-caribbean-800 hover:bg-caribbean-100"
              >
                {guide.title.replace("Best Caribbean ", "")}
              </Link>
            ) : null;
          })}
        </div>
      </section>

      <section className="rounded-2xl border-2 border-caribbean-300 bg-gradient-to-br from-caribbean-700 to-caribbean-800 p-6 sm:p-8 text-white">
        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3">Your Next Step</h2>
        <p className="text-caribbean-50 leading-relaxed mb-6">{cluster.nextStepCta}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/ports" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-caribbean-800 hover:bg-caribbean-50">
            Choose your port
          </Link>
          <Link href="/ship-schedules" className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
            Check ship schedules
          </Link>
          <Link href="/best-caribbean-shore-excursions" className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
            Compare excursions
          </Link>
        </div>
      </section>
    </div>
  );
}
