import Link from "next/link";
import type { FinderInterestInsight } from "@/data/finder-interest-map";
import { getSpecialistHomeUrl, getSpecialistPartnerCta } from "@/lib/specialist-links";

interface FinderInterestRecommendationsProps {
  insights: FinderInterestInsight[];
  sailingMonth?: string;
}

export function FinderInterestRecommendations({
  insights,
  sailingMonth,
}: FinderInterestRecommendationsProps) {
  if (insights.length === 0) return null;

  return (
    <section className="space-y-5">
      <div>
        <p className="section-eyebrow">Activity-led recommendations</p>
        <h3 className="section-title mt-1 text-xl sm:text-2xl">Best matches for your interests</h3>
        <p className="section-subtitle mt-2">
          {sailingMonth
            ? `Tailored for a ${sailingMonth} Alaska cruise — ports, excursion types, seasons, guides, and specialist sites.`
            : "Ports, excursion types, peak months, authority guides, and local specialist sites for each interest."}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.interestId}
            className="card-editorial flex h-full flex-col overflow-hidden"
          >
            <div className="border-b border-caribbean-100 bg-gradient-to-br from-caribbean-50 to-white px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">
                {insight.interestLabel}
              </p>
              <h4 className="mt-1 font-display text-lg font-semibold text-gray-900">
                <Link
                  href={`/excursion-types/${insight.excursionTypeSlug}`}
                  className="hover:text-caribbean-700"
                >
                  {insight.excursionTypeName}
                </Link>
              </h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{insight.seasonNote}</p>
              {insight.peakMonths.length > 0 && (
                <p className="mt-2 text-xs font-medium text-caribbean-700">
                  Best cruise months: {insight.peakMonths.join(" · ")}
                </p>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Best ports</p>
                <ul className="mt-3 space-y-3">
                  {insight.bestPorts.map((port) => (
                    <li key={port.slug} className="text-sm">
                      <Link href={`/ports/${port.slug}`} className="font-semibold text-caribbean-700 hover:underline">
                        {port.name}
                      </Link>
                      <p className="mt-0.5 text-gray-600 leading-relaxed">{port.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/excursion-types/${insight.excursionTypeSlug}`}
                  className="btn-primary text-xs"
                >
                  {insight.excursionTypeName} guide
                </Link>
                {insight.guideHref && (
                  <Link href={insight.guideHref} className="btn-secondary text-xs">
                    {insight.guideLabel ?? "Authority guide"}
                  </Link>
                )}
              </div>

              {insight.specialistSites.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Local specialist sites
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {insight.specialistSites.slice(0, 2).map((site) => (
                      <div
                        key={site.portSlug}
                        className="rounded-xl border border-caribbean-100 bg-white p-4"
                      >
                        <p className="text-sm font-semibold text-gray-900">{site.portName}</p>
                        <p className="text-xs text-gray-500">{site.domain}</p>
                        <a
                          href={getSpecialistHomeUrl(site.portSlug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex text-xs font-semibold text-caribbean-700 hover:underline"
                        >
                          {getSpecialistPartnerCta(site.portSlug)} →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
