"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { getTopExcursionLabel, searchPorts } from "@/lib/port-search";
import { getPortGuideCount } from "@/data/content-inventory";

const DEBOUNCE_MS = 250;

interface PortSearchProps {
  /** Pre-fill query (optional; use syncQueryFromUrl on /ports for JSON-LD SearchAction) */
  initialQuery?: string;
  /** Read and sync ?q= from the URL on mount (static export safe) */
  syncQueryFromUrl?: boolean;
  /** Homepage hero vs full ports hub layout */
  variant?: "home" | "page";
  /** Max results before "view all" hint (home variant) */
  maxResults?: number;
  className?: string;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export function PortSearch({
  initialQuery = "",
  syncQueryFromUrl = false,
  variant = "page",
  maxResults,
  className = "",
}: PortSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    if (!syncQueryFromUrl || typeof window === "undefined") return;
    const urlQuery = new URLSearchParams(window.location.search).get("q")?.trim() ?? "";
    if (urlQuery) {
      setQuery(urlQuery);
      setDebouncedQuery(urlQuery);
    }
  }, [syncQueryFromUrl]);

  useEffect(() => {
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  const syncUrl = useCallback(
    (value: string) => {
      if (!syncQueryFromUrl || typeof window === "undefined") return;
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set("q", value);
      } else {
        url.searchParams.delete("q");
      }
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    },
    [syncQueryFromUrl],
  );

  useEffect(() => {
    syncUrl(debouncedQuery);
  }, [debouncedQuery, syncUrl]);

  const results = useMemo(() => searchPorts(debouncedQuery), [debouncedQuery]);
  const resultLimit = maxResults ?? (variant === "home" ? 6 : undefined);
  const visibleResults = resultLimit ? results.slice(0, resultLimit) : results;
  const hasQuery = debouncedQuery.length > 0;
  const isHome = variant === "home";

  return (
    <div
      className={`${className}`}
      role="search"
      aria-label="Search Alaska cruise ports"
    >
      <div
        className={`relative ${
          isHome
            ? "rounded-2xl border border-white/20 bg-white/10 p-1 backdrop-blur-sm"
            : "rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50/80 via-white to-tropical-sand/20 p-1 shadow-sm"
        }`}
      >
        <div
          className={`flex items-center gap-3 rounded-[calc(1rem-1px)] px-4 py-3 sm:px-5 sm:py-4 ${
            isHome ? "bg-white/95" : "bg-white/80"
          }`}
        >
          <SearchIcon className="h-5 w-5 shrink-0 text-caribbean-600" />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by port, country, region, or excursion…"
            autoComplete="off"
            enterKeyHint="search"
            className="min-h-[44px] w-full flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-500 focus:outline-none"
            aria-controls="port-search-results"
            aria-describedby="port-search-hint"
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

      <p
        id="port-search-hint"
        className={`mt-2 text-sm ${isHome ? "text-caribbean-100/90" : "text-gray-600"}`}
      >
        {hasQuery
          ? `${results.length} port${results.length === 1 ? "" : "s"} match “${debouncedQuery}”`
          : `Search ${getPortGuideCount()} authority ports by name, country, region, or popular excursions.`}
      </p>

      {hasQuery && (
        <div
          id="port-search-results"
          className={`mt-4 space-y-3 ${isHome ? "max-w-3xl" : ""}`}
          aria-live="polite"
        >
          {visibleResults.length === 0 ? (
            <div
              className={`rounded-xl border px-5 py-8 text-center ${
                isHome
                  ? "border-white/20 bg-white/10 text-caribbean-50"
                  : "border-caribbean-100 bg-caribbean-50/40 text-gray-700"
              }`}
            >
              <p className="font-display text-lg font-bold">No ports found</p>
              <p className="mt-2 text-sm opacity-90">
                Try a port name (Juneau, Skagway), region (Inside Passage, Gulf of Alaska), or
                excursion (snorkeling, Stingray City).
              </p>
            </div>
          ) : (
            visibleResults.map(({ port }) => {
              const scheduleCta = getBestScheduleUrl({ portSlug: port.slug });

              return (
                <article
                  key={port.slug}
                  className={`rounded-xl border p-4 sm:p-5 ${
                    isHome
                      ? "border-white/15 bg-white/95 shadow-md"
                      : "border-caribbean-100 bg-white shadow-sm"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold text-gray-900">{port.name}</h3>
                      <p className="mt-0.5 text-sm text-gray-600">
                        {port.country}
                        <span className="mx-1.5 text-gray-300" aria-hidden="true">
                          ·
                        </span>
                        {port.region}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {getTopExcursionLabel(port)}
                      </p>
                    </div>
                    <span className="info-badge-subtle shrink-0 self-start">
                      {port.bestFor}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/ports/${port.slug}`}
                      className="inline-flex min-h-[44px] items-center rounded-lg bg-caribbean-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-caribbean-800 focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:ring-offset-2"
                    >
                      Port guide
                    </Link>
                    {scheduleCta && (
                      <Link
                        href={scheduleCta.href}
                        className="inline-flex min-h-[44px] items-center rounded-lg border border-caribbean-200 bg-white px-4 py-2 text-sm font-semibold text-caribbean-700 transition-colors hover:border-caribbean-300 hover:bg-caribbean-50 focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:ring-offset-2"
                      >
                        Ship schedule
                      </Link>
                    )}
                    <ExcursionCardCTAs portSlug={port.slug} specialistOnly className="inline-flex" />
                  </div>
                </article>
              );
            })
          )}

          {resultLimit && results.length > resultLimit && (
            <p className={`text-sm ${isHome ? "text-caribbean-100" : "text-gray-600"}`}>
              Showing {resultLimit} of {results.length} matches.{" "}
              <Link
                href={`/ports?q=${encodeURIComponent(debouncedQuery)}`}
                className={`font-semibold underline underline-offset-2 ${
                  isHome ? "text-white hover:text-caribbean-50" : "text-caribbean-700 hover:text-caribbean-800"
                }`}
              >
                View all on ports page
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
