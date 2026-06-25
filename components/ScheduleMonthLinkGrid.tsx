import Link from "next/link";
import {
  formatMonthLabel,
  portMonthPath,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import { getVerifiedMonthKeysForPortYear } from "@/data/schedules";

export function ScheduleMonthLinkGrid({
  portSlug,
  portName,
  year,
}: {
  portSlug: string;
  portName: string;
  year: ScheduleYear;
}) {
  const monthKeys = getVerifiedMonthKeysForPortYear(portSlug, year);

  if (monthKeys.length === 0) return null;

  return (
    <section className="mb-10 rounded-xl border border-caribbean-200 bg-caribbean-50/40 p-6">
      <h2 className="section-title text-2xl sm:text-3xl mb-2">
        {portName} Monthly Schedules for {year}
      </h2>
      <p className="text-sm text-gray-600 mb-5">
        Open a dedicated monthly page with verified ship calls, arrival and departure times, and
        planning tips for that month.
      </p>
      <div className="flex flex-wrap gap-2">
        {monthKeys.map((monthKey) => (
          <Link
            key={monthKey}
            href={portMonthPath(portSlug, monthKey)}
            className="rounded-lg border border-caribbean-200 bg-white px-3 py-2 text-sm font-medium text-caribbean-800 hover:border-caribbean-400 hover:bg-caribbean-50 transition-colors"
          >
            {formatMonthLabel(monthKey)}
          </Link>
        ))}
      </div>
    </section>
  );
}
