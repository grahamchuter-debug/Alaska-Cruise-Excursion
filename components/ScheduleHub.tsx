"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ScheduleEntry } from "@/data/types";
import { ScheduleWithCruiseDayLookup } from "@/components/ScheduleWithCruiseDayLookup";
import {
  formatMonthLabel,
  getAllMonthKeys,
  getMonthKeysForYear,
  getMonthsWithEntries,
  getDisplayEntries,
  getUniqueCruiseLines,
  portMonthPath,
} from "@/lib/schedule-utils";

export function ScheduleHub({
  entries,
  portName,
  portSlug,
  scheduleOverview,
  year,
}: {
  entries: ScheduleEntry[];
  portName: string;
  portSlug?: string;
  scheduleOverview?: string;
  year?: number;
}) {
  const monthsWithData = useMemo(() => getMonthsWithEntries(entries), [entries]);
  const allMonths = useMemo(
    () => (year ? getMonthKeysForYear(year) : getAllMonthKeys()),
    [year],
  );
  const cruiseLines = useMemo(() => getUniqueCruiseLines(entries), [entries]);

  const defaultMonth = monthsWithData[0] ?? allMonths[0];
  const [activeMonth, setActiveMonth] = useState(defaultMonth);

  const filtered = useMemo(
    () => getDisplayEntries(entries, activeMonth, portName),
    [entries, activeMonth, portName],
  );

  return (
    <div className="space-y-8">
      {scheduleOverview && (
        <section>
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Schedule Overview</h2>
          <p className="text-gray-700 leading-relaxed">{scheduleOverview}</p>
        </section>
      )}

      {cruiseLines.length > 0 && (
        <section>
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Cruise Lines Visiting</h2>
          <div className="flex flex-wrap gap-2">
            {cruiseLines.map((line) => (
              <span key={line} className="info-badge-subtle">
                {line}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-4">
          {year ? `${year} Monthly Schedule` : "Monthly Schedule"}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Select a month to view scheduled ship calls with date, ship, cruise line, arrival,
          departure, time in port, and passenger capacity.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {allMonths.map((monthKey) => {
            const hasData = monthsWithData.includes(monthKey);
            const isActive = activeMonth === monthKey;
            const monthPageHref = portSlug && hasData ? portMonthPath(portSlug, monthKey) : null;
            const className = `rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "bg-caribbean-700 text-white"
                : hasData
                  ? "bg-caribbean-50 text-caribbean-700 hover:bg-caribbean-100"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`;

            if (monthPageHref) {
              return (
                <Link
                  key={monthKey}
                  href={monthPageHref}
                  className={`${className} ${isActive ? "" : "border border-caribbean-100"}`}
                >
                  {formatMonthLabel(monthKey)}
                </Link>
              );
            }

            return (
              <button
                key={monthKey}
                type="button"
                onClick={() => setActiveMonth(monthKey)}
                className={className}
                aria-pressed={isActive}
              >
                {formatMonthLabel(monthKey)}
              </button>
            );
          })}
        </div>
        <ScheduleWithCruiseDayLookup
          entries={filtered}
          portName={portName}
          portSlug={portSlug}
          tableTitle={`${formatMonthLabel(activeMonth)} at ${portName}`}
        />
      </section>
    </div>
  );
}
