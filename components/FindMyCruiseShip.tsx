"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPortBySlug } from "@/data/ports";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import {
  getSchedulePortsForShip,
  getShipSearchCount,
  getShipSearchQuickPicks,
  searchShips,
  type ShipSearchIndexEntry,
} from "@/lib/ship-search";

const DEBOUNCE_MS = 250;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function ShipResultCard({ entry }: { entry: ShipSearchIndexEntry }) {
  const schedulePorts = getSchedulePortsForShip(entry.commonPortSlugs);

  return (
    <article className="rounded-xl border border-caribbean-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">
            <Link href={`/cruise-lines/${entry.cruiseLineSlug}`} className="hover:underline">
              {entry.cruiseLineName}
            </Link>
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-gray-900">{entry.name}</h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{entry.tagline}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Common Caribbean ports</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {entry.commonPortSlugs.map((portSlug) => {
            const port = getPortBySlug(portSlug);
            if (!port) return null;
            return (
              <Link
                key={portSlug}
                href={`/ports/${portSlug}`}
                className="inline-flex min-h-[36px] items-center rounded-full border border-caribbean-100 bg-caribbean-50 px-3 py-1 text-xs font-medium text-caribbean-800 transition-colors hover:border-caribbean-200 hover:bg-caribbean-100"
              >
                {port.name}
              </Link>
            );
          })}
        </div>
      </div>

      {schedulePorts.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Available schedules</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {schedulePorts.map((portSlug) => {
              const port = getPortBySlug(portSlug);
              const scheduleCta = getBestScheduleUrl({ portSlug });
              if (!port || !scheduleCta) return null;
              return (
                <Link
                  key={portSlug}
                  href={scheduleCta.href}
                  className="inline-flex min-h-[36px] items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-caribbean-200 hover:bg-caribbean-50 hover:text-caribbean-800"
                >
                  {port.name} schedule
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/ships/${entry.slug}`}
          className="inline-flex min-h-[44px] items-center rounded-lg bg-caribbean-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-caribbean-800 focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:ring-offset-2"
        >
          Ship guide
        </Link>
        <Link
          href={`/cruise-lines/${entry.cruiseLineSlug}`}
          className="inline-flex min-h-[44px] items-center rounded-lg border border-caribbean-200 bg-white px-4 py-2 text-sm font-semibold text-caribbean-700 transition-colors hover:border-caribbean-300 hover:bg-caribbean-50 focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:ring-offset-2"
        >
          {entry.cruiseLineName}
        </Link>
        {entry.commonPortSlugs[0] && (
          <Link
            href={`/ports/${entry.commonPortSlugs[0]}`}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-caribbean-200 bg-white px-4 py-2 text-sm font-semibold text-caribbean-700 transition-colors hover:border-caribbean-300 hover:bg-caribbean-50 focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:ring-offset-2"
          >
            Top port guide
          </Link>
        )}
      </div>
    </article>
  );
}

export function FindMyCruiseShip() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const quickPicks = useMemo(() => getShipSearchQuickPicks(), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => searchShips(debouncedQuery), [debouncedQuery]);
  const hasQuery = debouncedQuery.length > 0;

  return (
    <section
      aria-labelledby="find-my-cruise-ship-heading"
      className="section-padding border-b border-caribbean-100 bg-white"
    >
      <div className="container-wide max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caribbean-600">Ship lookup</p>
        <h2 id="find-my-cruise-ship-heading" className="section-title mt-2">
          Find My Cruise Ship
        </h2>
        <p className="section-subtitle">
          Search by ship name to see your cruise line, typical Caribbean ports, ship planning guide, port guides, and
          schedule hubs.
        </p>

        <div className="mt-8 rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50/80 via-white to-tropical-sand/20 p-1 shadow-sm">
          <div className="flex items-center gap-3 rounded-[calc(1rem-1px)] bg-white/80 px-4 py-3 sm:px-5 sm:py-4">
            <SearchIcon className="h-5 w-5 shrink-0 text-caribbean-600" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by ship name — e.g. Icon of the Seas, Wonder of the Seas, MSC World America"
              autoComplete="off"
              enterKeyHint="search"
              className="min-h-[44px] w-full flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-500 focus:outline-none"
              aria-controls="ship-search-results"
              aria-describedby="ship-search-hint"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-caribbean-700 hover:bg-caribbean-50 focus:outline-none focus:ring-2 focus:ring-caribbean-500"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <p id="ship-search-hint" className="mt-2 text-sm text-gray-600">
          {hasQuery
            ? `${results.length} ship${results.length === 1 ? "" : "s"} match “${debouncedQuery}”`
            : `Search ${getShipSearchCount()} Caribbean ship guides by name or cruise line.`}
        </p>

        {!hasQuery && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Popular ships</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {quickPicks.map((ship) => (
                <button
                  key={ship.slug}
                  type="button"
                  onClick={() => setQuery(ship.name)}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-caribbean-200 bg-white px-4 py-2 text-sm font-medium text-caribbean-800 transition-colors hover:border-caribbean-300 hover:bg-caribbean-50 focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                >
                  {ship.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasQuery && (
          <div id="ship-search-results" className="mt-6 space-y-4" aria-live="polite">
            {results.length === 0 ? (
              <div className="rounded-xl border border-caribbean-100 bg-caribbean-50/40 px-5 py-8 text-center text-gray-700">
                <p className="font-display text-lg font-bold text-gray-900">No ships found</p>
                <p className="mt-2 text-sm">
                  Try a ship name (Icon of the Seas, Carnival Horizon) or cruise line (Royal Caribbean, MSC).
                </p>
                <Link href="/ships" className="btn-secondary mt-4 inline-flex text-sm">
                  Browse all ship guides
                </Link>
              </div>
            ) : (
              results.map(({ entry }) => <ShipResultCard key={entry.slug} entry={entry} />)
            )}
          </div>
        )}

        <p className="mt-6 text-sm text-gray-600">
          Need the full directory?{" "}
          <Link href="/ships" className="font-semibold text-caribbean-700 hover:underline">
            View all ship guides
          </Link>
        </p>
      </div>
    </section>
  );
}
