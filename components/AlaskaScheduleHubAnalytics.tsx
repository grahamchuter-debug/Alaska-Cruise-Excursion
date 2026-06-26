import Link from "next/link";
import {
  getBusiestMonths,
  getBusiestPorts,
  getMostFrequentCruiseLines,
  getMostFrequentShips,
  getTotalCallsByYear,
  getVerifiedCallTotalsByPort,
} from "@/data/schedule-analytics";
import { getAllVerifiedMonthPageParams } from "@/data/schedules";
import { formatMonthLabel, portHubPath } from "@/lib/schedule-utils";
import { getLiveImportedSchedulePorts } from "@/data/schedule-coverage";
import { NavCardCta } from "@/components/NavCardCta";

export function AlaskaScheduleHubAnalytics() {
  const total2026 = getTotalCallsByYear(2026);
  const total2027 = getTotalCallsByYear(2027);
  const busiestPorts = getBusiestPorts(9);
  const busiest2026Months = getBusiestMonths(2026, 6);
  const topLines = getMostFrequentCruiseLines(undefined, 8);
  const topShips = getMostFrequentShips(undefined, 8);
  const monthPages = getAllVerifiedMonthPageParams();
  const portTotals = getVerifiedCallTotalsByPort();

  const hasData = total2026 + total2027 > 0;

  if (!hasData) {
    return (
      <section className="mb-12 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h2 className="font-display text-xl font-bold text-gray-900">Schedule imports in progress</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Alaska cruise ship schedules are populated from verified monthly imports. Port hubs are live
          now; ship call tables fill in as data lands — no placeholder sailings are shown.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Verified calls 2026", value: total2026.toLocaleString() },
          { label: "Verified calls 2027", value: total2027.toLocaleString() },
          {
            label: "Ports with live data",
            value: `${portTotals.filter((p) => p.hasVerifiedData).length} (${getLiveImportedSchedulePorts().join(", ")})`,
          },
          { label: "Monthly pages", value: String(monthPages.length) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </section>

      {busiestPorts.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Busiest Alaska Cruise Ports (live data)</h2>
          <p className="text-sm text-gray-600 mb-4 max-w-3xl">
            Rankings reflect verified imports only. Today that is Juneau — additional ports will appear as monthly
            data is published.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Port</th>
                  <th className="px-4 py-3 text-left font-semibold">Verified calls</th>
                  <th className="px-4 py-3 text-left font-semibold">Schedule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {busiestPorts.map((port) => (
                  <tr key={port.slug}>
                    <td className="px-4 py-3 font-medium text-gray-900">{port.name}</td>
                    <td className="px-4 py-3 text-gray-700">{port.count.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={portHubPath(port.slug)}
                        className="font-medium text-caribbean-700 hover:text-caribbean-800"
                      >
                        Open hub
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        {topLines.length > 0 && (
          <section>
            <h2 className="section-title text-xl sm:text-2xl mb-4">Most Active Cruise Lines</h2>
            <ul className="space-y-2">
              {topLines.map((line) => (
                <li
                  key={line.cruiseLine}
                  className="flex justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm"
                >
                  <span className="font-medium text-gray-900">{line.cruiseLine}</span>
                  <span className="text-gray-600">{line.count} calls</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {topShips.length > 0 && (
          <section>
            <h2 className="section-title text-xl sm:text-2xl mb-4">Most Frequent Ships</h2>
            <ul className="space-y-2">
              {topShips.map((ship) => (
                <li
                  key={ship.ship}
                  className="flex justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm"
                >
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

      {busiest2026Months.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Busiest Months (2026)</h2>
          <div className="flex flex-wrap gap-2">
            {busiest2026Months.map((month) => (
              <span
                key={month.label}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
              >
                {formatMonthLabel(month.label)} — {month.count} calls
              </span>
            ))}
          </div>
        </section>
      )}

      {monthPages.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Browse by Month</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {monthPages.slice(0, 18).map(({ slug, period }) => (
                <Link
                  key={`${slug}-${period}`}
                  href={`/ship-schedules/${slug}/${period}`}
                  className="card-gradient group flex h-full flex-col hover:border-caribbean-300"
                >
                  <span className="font-medium text-gray-900 capitalize">{slug.replace(/-/g, " ")}</span>
                  <span className="text-sm text-gray-600">{period.replace(/-/g, " ")}</span>
                  <NavCardCta className="pt-3">Open monthly schedule</NavCardCta>
                </Link>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
