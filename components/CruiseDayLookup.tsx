"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { ScheduleEntry } from "@/data/types";
import {
  formatScheduleDisplayDate,
  getAvailableScheduleDates,
  getCrowdLevelStyles,
  getDailyScheduleSummary,
  type PortOption,
} from "@/lib/cruise-day-lookup";

interface CruiseDayLookupProps {
  entries: ScheduleEntry[];
  portName: string;
  portSlug?: string;
  selectedDate: string;
  onDateChange: (date: string) => void;
  ports?: PortOption[];
  selectedPortSlug?: string;
  onPortChange?: (slug: string) => void;
}

export function CruiseDayLookup({
  entries,
  portName,
  portSlug,
  selectedDate,
  onDateChange,
  ports,
  selectedPortSlug,
  onPortChange,
}: CruiseDayLookupProps) {
  const planPortSlug = portSlug ?? selectedPortSlug;
  const availableDates = useMemo(() => getAvailableScheduleDates(entries), [entries]);
  const summary = useMemo(
    () => (selectedDate ? getDailyScheduleSummary(entries, selectedDate, portName) : null),
    [entries, selectedDate, portName],
  );

  if (availableDates.length === 0) {
    return null;
  }

  const crowdStyles = summary ? getCrowdLevelStyles(summary.crowdLevel) : null;

  return (
    <section
      aria-labelledby="find-my-cruise-day-heading"
      className="mb-8 overflow-hidden rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50 via-white to-tropical-sand/30 p-5 shadow-sm sm:p-6"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caribbean-700">
          Quick cruise day lookup
        </p>
        <h2 id="find-my-cruise-day-heading" className="mt-2 font-display text-xl font-bold text-gray-900 sm:text-2xl">
          Find My Cruise Day
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Select your port call date to filter the schedule, see crowd levels, and jump straight to your ship.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ports && ports.length > 1 && onPortChange && (
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Port</span>
            <select
              value={selectedPortSlug ?? ""}
              onChange={(event) => onPortChange(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            >
              {ports.map((port) => (
                <option key={port.slug} value={port.slug}>
                  {port.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block sm:col-span-2 lg:col-span-1">
          <span className="text-sm font-medium text-gray-700">Cruise date</span>
          <select
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
          >
            <option value="">All dates in this schedule</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {formatScheduleDisplayDate(date)}
              </option>
            ))}
          </select>
        </label>

        {selectedDate && (
          <div className="flex items-end sm:col-span-2 lg:col-span-1">
            <button
              type="button"
              onClick={() => onDateChange("")}
              className="btn-secondary w-full text-sm sm:w-auto"
            >
              Show all dates
            </button>
          </div>
        )}
      </div>

      {summary && crowdStyles && (
        <div className="mt-6 rounded-xl border border-caribbean-100 bg-white/90 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">Daily summary</p>
              <p className="mt-1 font-display text-lg font-bold text-gray-900">{summary.displayDate}</p>
            </div>
            <span
              className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-xs font-semibold ${crowdStyles.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${crowdStyles.dot}`} />
              {summary.crowdLevel}
            </span>
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Ships in port</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">{summary.shipCount}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Estimated passenger capacity
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {summary.estimatedPassengers.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Busiest ship</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {summary.busiestShip
                  ? `${summary.busiestShip.name} (${summary.busiestShip.passengers.toLocaleString()})`
                  : "Not available"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Cruise lines visiting</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {summary.cruiseLines.length > 0 ? summary.cruiseLines.join(", ") : "Not available"}
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Planning tip:</span> {summary.planningNote}
          </p>
          {planPortSlug && selectedDate && (
            <Link
              href={`/cruise-day-plan?port=${planPortSlug}&date=${selectedDate}`}
              className="mt-4 inline-flex items-center rounded-lg bg-caribbean-700 px-4 py-2 text-sm font-semibold text-white hover:bg-caribbean-800"
            >
              Build printable cruise day plan for this date →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
