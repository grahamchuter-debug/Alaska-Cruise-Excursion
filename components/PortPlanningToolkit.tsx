import Link from "next/link";
import type { Port } from "@/data/types";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import type { PortActivityTier } from "@/data/port-planning";
import {
  getPortPlanningSnapshot,
  getTypicalCruiseDay,
  getCruiseLinesForPort,
  getPortPlanningCards,
  getPortPopularityStats,
  getSimilarPorts,
} from "@/data/port-planning";
import { hasShipSchedule } from "@/lib/routes";
import { hasVerifiedScheduleData } from "@/data/schedules";
import { evaluatePortConfidence, formatConfidenceTitle } from "@/lib/cruise-confidence";
import { CruiseConfidenceCard } from "@/components/CruiseConfidenceCard";
import { getThemeStyle } from "@/lib/port-themes";
import { NavCardCta } from "@/components/NavCardCta";

const cardToneClasses: Record<string, string> = {
  sand: "from-amber-50 to-orange-50 border-amber-200",
  reef: "from-cyan-50 to-teal-50 border-cyan-200",
  family: "from-sky-50 to-indigo-50 border-sky-200",
  wildlife: "from-emerald-50 to-green-50 border-emerald-200",
  private: "from-violet-50 to-purple-50 border-violet-200",
};

const cardIcons: Record<string, string> = {
  Beaches: "🏖",
  Snorkeling: "🤿",
  Families: "👨‍👩‍👧",
  Wildlife: "🐠",
  "Private Tours": "🚐",
};

const activityTierClasses: Record<PortActivityTier, string> = {
  "Very High": "bg-orange-100 text-orange-900 border-orange-200",
  High: "bg-caribbean-100 text-caribbean-900 border-caribbean-200",
  Moderate: "bg-sky-100 text-sky-900 border-sky-200",
  Seasonal: "bg-amber-100 text-amber-900 border-amber-200",
};

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-caribbean-100/80 bg-white px-4 py-3.5 shadow-sm">
      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-caribbean-700">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium leading-relaxed text-gray-800">{value}</dd>
    </div>
  );
}

function formatPassengers(count: number): string {
  if (count >= 1_000_000) return `~${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `~${Math.round(count / 1_000)}K`;
  return `~${count.toLocaleString()}`;
}

export function PortPlanningToolkit({
  port,
  hidePortGuideLink = false,
}: {
  port: Port;
  hidePortGuideLink?: boolean;
}) {
  const snapshot = getPortPlanningSnapshot(port.slug);
  const typicalDay = getTypicalCruiseDay(port.slug);
  const cruiseLines = getCruiseLinesForPort(port.slug);
  const planningCards = getPortPlanningCards(port.slug);
  const popularity = getPortPopularityStats(port.slug);
  const similarPorts = getSimilarPorts(port.slug);
  const portConfidence = evaluatePortConfidence(port.slug);
  const portTheme = getThemeStyle(port.imageTheme);

  if (!snapshot) return null;

  return (
    <div className="mb-12 space-y-8">
      <div className="rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50/80 via-white to-tropical-sand/20 p-1">
        <div className="rounded-[calc(1rem-1px)] bg-white/60 px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-caribbean-700">
            Cruise planning tool
          </p>
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            Plan your {port.name} port day
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Snapshot, excursion picks, ship activity, and a sample timeline — not a long article.
          </p>
          <Link
            href={`/cruise-day-plan?port=${port.slug}`}
            className="mt-4 inline-flex items-center rounded-xl bg-caribbean-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-caribbean-800 print:hidden"
          >
            Build printable {port.name} day plan →
          </Link>
          <ExcursionCardCTAs
            portSlug={port.slug}
            className="mt-4 print:hidden"
            hidePortGuideLink={hidePortGuideLink}
          />
        </div>
      </div>

      <CruiseConfidenceCard assessment={portConfidence} className="mb-2" />

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3 overflow-hidden rounded-2xl border border-caribbean-100/80 bg-white shadow-md">
          <div
            className={`relative h-28 bg-gradient-to-br sm:h-32 ${portTheme.gradient}`}
            role="img"
            aria-label={port.imageAlt}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-caribbean-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
                Cruise passenger snapshot
              </p>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{port.name}</h3>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-sm text-gray-600">Six signals to decide how to spend your day ashore.</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <SnapshotItem label="Time in Port" value={snapshot.timeInPort} />
              <SnapshotItem label="Best For" value={snapshot.bestFor} />
              <SnapshotItem label="Walking Required" value={snapshot.walkingRequired} />
              <SnapshotItem label="Family Friendly" value={snapshot.familyFriendly} />
              <SnapshotItem label="Private Tour Friendly" value={snapshot.privateTourFriendly} />
              <SnapshotItem label="Cruise Confidence" value={formatConfidenceTitle(portConfidence.level)} />
            </dl>
          </div>
        </section>

        {typicalDay.length > 0 && (
          <section className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <h3 className="font-display text-xl font-bold text-gray-900">Typical Cruise Day</h3>
            <p className="mt-1 text-sm text-gray-600">Example timeline with one signature excursion.</p>
            <ol className="relative mt-4 border-l-2 border-caribbean-200 pl-5 space-y-3.5">
              {typicalDay.map((step) => (
                <li key={`${step.time}-${step.activity}`} className="relative">
                  <span className="absolute -left-[1.45rem] top-1.5 h-2.5 w-2.5 rounded-full bg-caribbean-600 ring-2 ring-white" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-800">
                    {step.time}
                  </p>
                  <p className="text-sm text-gray-700 leading-snug">{step.activity}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      <section>
        <h3 className="section-title text-xl sm:text-2xl mb-1">Plan by Excursion Type</h3>
        <p className="text-sm text-gray-600 mb-4">Jump to category guides and {port.name} picks.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {planningCards.map((card) => (
            <div
              key={card.label}
              className={`flex flex-col rounded-xl border bg-gradient-to-br p-4 ${cardToneClasses[card.tone]}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden>
                  {cardIcons[card.label] ?? "📍"}
                </span>
                <h4 className="font-semibold text-gray-900 text-sm">{card.label}</h4>
              </div>
              <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">{card.teaser}</p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium">
                <Link href={card.href} className="text-caribbean-800 hover:underline">
                  Excursion type →
                </Link>
                <Link href={card.guideHref} className="text-caribbean-700 hover:underline">
                  Best picks →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="section-title text-xl sm:text-2xl">Port Popularity &amp; Cruise Activity</h3>
            <p className="mt-1 text-sm text-gray-600">
              {popularity.hasVerifiedData
                ? "Verified ship call counts from imported schedules."
                : "Industry activity tier until verified schedule import completes."}
            </p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${activityTierClasses[popularity.activityTier]}`}
          >
            {popularity.activityTier} activity
          </span>
        </div>

        {popularity.hasVerifiedData ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-caribbean-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-gray-500">2026 ship calls</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{popularity.calls2026}</p>
            </div>
            <div className="rounded-lg bg-caribbean-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-gray-500">2027 ship calls</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{popularity.calls2027}</p>
            </div>
            {popularity.estimatedPassengers !== null && popularity.busiestYear !== null && (
              <div className="rounded-lg bg-gray-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase text-gray-500">
                  Est. passengers ({popularity.busiestYear})
                </p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {formatPassengers(popularity.estimatedPassengers)}
                </p>
              </div>
            )}
            <div className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-gray-500">Peak months (imported)</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {popularity.peakMonths.length > 0 ? popularity.peakMonths.join(" · ") : "—"}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-gray-500">Peak season</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{popularity.peakSeason}</p>
            </div>
            <div className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-gray-500">Schedule status</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {hasVerifiedScheduleData(port.slug)
                  ? "Live imported schedule"
                  : hasShipSchedule(port.slug)
                    ? "Coming soon — import pending"
                    : "Not yet tracked"}
              </p>
            </div>
          </div>
        )}

        <p className="mt-4 text-sm text-gray-700 leading-relaxed">{popularity.note}</p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {hasShipSchedule(port.slug) && (
            <Link
              href={`/ship-schedules/${port.slug}`}
              className="font-medium text-caribbean-700 hover:underline"
            >
              {port.name} ship schedules →
            </Link>
          )}
          <Link href="/best-alaska-cruise-ports" className="font-medium text-caribbean-700 hover:underline">
            Compare top Alaska cruise ports →
          </Link>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {similarPorts.length > 0 && (
          <section>
            <h3 className="section-title text-xl sm:text-2xl mb-1">Similar Ports</h3>
            <p className="text-sm text-gray-600 mb-4">Same region or excursion style — compare before you book.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {similarPorts.map(
                (similar) =>
                  similar && (
                    <Link
                      key={similar.slug}
                      href={`/ports/${similar.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-caribbean-100/80 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                      <div
                        className={`h-16 bg-gradient-to-br ${getThemeStyle(similar.imageTheme).gradient}`}
                        aria-hidden
                      />
                      <div className="flex flex-1 flex-col p-4">
                        <h4 className="font-display font-semibold text-gray-900 group-hover:text-caribbean-700">
                          {similar.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{similar.region}</p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{similar.bestFor}</p>
                        <NavCardCta className="pt-4">View {similar.name} port guide</NavCardCta>
                      </div>
                    </Link>
                  ),
              )}
            </div>
          </section>
        )}

        {cruiseLines.length > 0 && (
          <section>
            <h3 className="section-title text-xl sm:text-2xl mb-1">Cruise Lines Visiting</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lines that commonly call {port.name} on Alaska itineraries.
            </p>
            <div className="flex flex-wrap gap-2">
              {cruiseLines.map((line) => (
                <Link
                  key={line.slug}
                  href={`/cruise-lines/${line.slug}`}
                  className="rounded-full border border-caribbean-200 bg-white px-4 py-2 text-sm font-medium text-caribbean-800 hover:bg-caribbean-50"
                >
                  {line.name}
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Open each guide for route patterns, ship tips, and shore excursion booking advice.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
