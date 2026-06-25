import Link from "next/link";
import { SCHEDULE_YEARS } from "@/lib/schedule-utils";
import { getScheduleYearHubContent } from "@/data/schedule-year-hubs";
import { getVerifiedPortRankings } from "@/data/schedule-insights";
import { getSchedulePortCount } from "@/data/content-inventory";
import { yearHubPath } from "@/lib/schedule-utils";

export function ScheduleYearHeroCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {SCHEDULE_YEARS.map((year) => {
        const content = getScheduleYearHubContent(year);
        const verifiedCount = getVerifiedPortRankings(year).length;
        const totalCalls = getVerifiedPortRankings(year).reduce(
          (sum, port) => sum + port.shipCalls,
          0,
        );

        return (
          <Link
            key={year}
            href={yearHubPath(year)}
            className="group relative overflow-hidden rounded-2xl border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-700 to-caribbean-900 p-8 text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:border-caribbean-300"
          >
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Master schedule hub
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{year} Schedules</h2>
            <p className="mt-3 text-lg text-caribbean-50">{content.heroSubtitle}</p>
            <p className="mt-4 text-sm text-caribbean-100">
              {verifiedCount > 0
                ? `${totalCalls.toLocaleString()} verified ship calls — Juneau only today; more Alaska ports importing`
                : `${getSchedulePortCount()} port hubs tracked — verified monthly data rolls out port by port`}
            </p>
            <span className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-caribbean-800 group-hover:bg-caribbean-50">
              Open {year} Alaska schedules
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
