import Link from "next/link";
import { schedulePorts, getShipCallCountForPortYear, getVerifiedMonthKeysForPortYear } from "@/data/schedules";
import { getVerifiedPortRankings } from "@/data/schedule-insights";
import { getMostFrequentCruiseLines, getMostFrequentShips, getTotalCallsByYear } from "@/data/schedule-analytics";
import { getScheduleYearHubContent } from "@/data/schedule-year-hubs";
import { getSchedulePageContent } from "@/data/schedule-page-content";
import type { ScheduleYear } from "@/lib/schedule-utils";
import { formatMonthLabel, portHubPath, portMonthPath, portYearPath } from "@/lib/schedule-utils";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import {
  SchedulePageContentSections,
  SchedulePageIntro,
} from "@/components/SchedulePageContentSections";

import { FAQSection } from "@/components/FAQSection";
import { NavCardCta } from "@/components/NavCardCta";
import { getScheduleYearHubFaqs } from "@/data/schedule-hub-faqs";

export function ShipScheduleMasterYearHub({ year }: { year: ScheduleYear }) {
  const content = getScheduleYearHubContent(year);
  const pageContent = getSchedulePageContent(`year-${year}`);
  const rankings = getVerifiedPortRankings(year);
  const totalCalls = getTotalCallsByYear(year);
  const topLines = getMostFrequentCruiseLines(year, 8);
  const topShips = getMostFrequentShips(year, 8);

  return (
    <>
      <SchedulePageIntro content={pageContent} />

      <SchedulePageContentSections
        content={{
          ...pageContent,
          whyPassengersUseTitle: `Why Cruise Passengers Use the ${year} Schedule Hub`,
          planningTitle: `Planning Shore Excursions Across ${year} Sailings`,
        }}
      />

      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">Verified {year} Import Status</h2>
        <p className="text-gray-700 leading-relaxed text-lg max-w-3xl">{content.intro}</p>
        <p className="mt-4 text-sm text-gray-500 max-w-3xl">
          Months awaiting verified data display &quot;Schedule data being updated&quot;. We do not
          publish unverified ship calls, cruise lines, or passenger capacities.
        </p>
      </section>

      {schedulePorts.some((port) => getVerifiedMonthKeysForPortYear(port.slug, year).length > 0) && (
        <section className="mb-12 rounded-xl border border-caribbean-200 bg-caribbean-50/40 p-6">
          <h2 className="section-title text-2xl sm:text-3xl mb-2">Monthly Schedules with Verified Data</h2>
          <p className="text-sm text-gray-600 mb-6">
            Dedicated monthly pages are available where imported schedule data exists. Open a month to
            see ship calls, arrival and departure times, and planning tips for that period.
          </p>
          <div className="space-y-6">
            {schedulePorts.map((port) => {
              const monthKeys = getVerifiedMonthKeysForPortYear(port.slug, year);
              if (monthKeys.length === 0) return null;
              return (
                <div key={port.slug}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-semibold text-gray-900">
                      <Link href={portYearPath(port.slug, year)} className="hover:text-caribbean-700">
                        {port.name}
                      </Link>
                    </h3>
                    <span className="text-xs text-gray-500">
                      {monthKeys.length} monthly page{monthKeys.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {monthKeys.map((monthKey) => (
                      <Link
                        key={monthKey}
                        href={portMonthPath(port.slug, monthKey)}
                        className="rounded-lg border border-caribbean-200 bg-white px-3 py-1.5 text-xs font-medium text-caribbean-800 hover:border-caribbean-400 hover:bg-caribbean-50"
                      >
                        {formatMonthLabel(monthKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">{year} Alaska Schedule Overview</h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          {totalCalls > 0
            ? `${totalCalls.toLocaleString()} verified ship calls imported across Alaska ports for ${year}. Rankings and summaries below update automatically as monthly imports complete.`
            : `Verified ${year} ship calls will appear here as monthly imports complete. Port framework pages are live — we do not show placeholder sailings.`}
        </p>
      </section>

      {(topLines.length > 0 || topShips.length > 0) && (
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {topLines.length > 0 && (
            <section>
              <h2 className="section-title text-xl sm:text-2xl mb-4">Most Active Cruise Lines ({year})</h2>
              <ul className="space-y-2">
                {topLines.map((line) => (
                  <li key={line.cruiseLine} className="flex justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm">
                    <span className="font-medium text-gray-900">{line.cruiseLine}</span>
                    <span className="text-gray-600">{line.count} calls</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {topShips.length > 0 && (
            <section>
              <h2 className="section-title text-xl sm:text-2xl mb-4">Most Frequent Ships ({year})</h2>
              <ul className="space-y-2">
                {topShips.map((ship) => (
                  <li key={ship.ship} className="flex justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm">
                    <span>
                      <span className="font-medium text-gray-900">{ship.ship}</span>
                      <span className="block text-xs text-gray-500">{ship.cruiseLine}</span>
                    </span>
                    <span className="text-gray-600 shrink-0 ml-3">{ship.count} calls</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {rankings.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Top Alaska Ports in {year}</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">{content.topPortsIntro}</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Port</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Region</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Verified calls</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Schedule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {rankings.map((stats, index) => (
                  <tr key={stats.slug}>
                    <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{stats.name}</td>
                    <td className="px-4 py-3 text-gray-600">{stats.region}</td>
                    <td className="px-4 py-3 text-gray-700">{stats.shipCalls.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={portYearPath(stats.slug, year)}
                        className="font-medium text-caribbean-700 hover:text-caribbean-800"
                      >
                        View {year} schedule
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-6">All {year} Port Schedules</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schedulePorts.map((port) => {
            const shipCalls = getShipCallCountForPortYear(port.slug, year);

            return (
              <div key={port.slug} className="card-gradient flex flex-col">
                <Link href={portYearPath(port.slug, year)} className="group flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-caribbean-700">
                        {port.name}
                      </h3>
                      <p className="text-sm text-gray-500">{port.country}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-caribbean-700 px-2.5 py-0.5 text-xs font-semibold text-white">
                      {year}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">{port.description}</p>
                  <p className="mt-3 text-sm text-gray-600">
                    {shipCalls > 0
                      ? `${shipCalls} verified ship call${shipCalls !== 1 ? "s" : ""}`
                      : "Import in progress"}
                  </p>
                  <NavCardCta className="pt-4">View {port.name} {year} schedule</NavCardCta>
                </Link>
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <Link
                    href={portHubPath(port.slug)}
                    className="text-xs font-medium text-gray-500 hover:text-caribbean-700"
                  >
                    {port.name} schedule hub (2026 &amp; 2027)
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {year === 2026 && (
        <section className="mb-12 rounded-xl border border-caribbean-200 bg-caribbean-50/50 p-6">
          <h2 className="section-title text-2xl sm:text-3xl mb-2">Planning for 2027 sailings?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Many passengers compare both years when choosing itineraries. Open the{" "}
            <Link href="/ship-schedules/2027" className="font-medium text-caribbean-700 hover:text-caribbean-800">
              2027 Alaska cruise ship schedule hub
            </Link>{" "}
            to compare call volumes across ports, or jump to a port&apos;s 2027 table from any card
            below.
          </p>
        </section>
      )}

      {year === 2027 && (
        <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">2027 Planning Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/alaska-cruise-excursion-planner" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
              <h3 className="font-semibold text-gray-900">Alaska Excursion Planner</h3>
              <p className="mt-2 text-sm text-gray-600">
                Match excursions to ports and verified schedule windows.
              </p>
              <NavCardCta className="pt-4">Open excursion planner</NavCardCta>
            </Link>
            <Link href="/best-alaska-guides" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
              <h3 className="font-semibold text-gray-900">Best Alaska Guides</h3>
              <p className="mt-2 text-sm text-gray-600">
                Authority guides for wildlife, glaciers, railways, and port planning.
              </p>
              <NavCardCta className="pt-4">Browse best guides</NavCardCta>
            </Link>
          </div>
        </section>
      )}

      <FAQSection faqs={getScheduleYearHubFaqs(year)} />

      <div className="mt-10">
        <AuthorityHubLinks current="schedules" />
      </div>
    </>
  );
}
