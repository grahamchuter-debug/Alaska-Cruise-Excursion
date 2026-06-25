"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NavCardCta } from "@/components/NavCardCta";

export interface ShipsHubShip {
  slug: string;
  name: string;
  tagline: string;
  cruiseLineSlug: string;
  cruiseLineName: string;
  featuredPage: boolean;
}

const LINE_ORDER = [
  "royal-caribbean",
  "carnival",
  "norwegian",
  "msc",
  "celebrity",
  "princess",
];

export function ShipsHub({
  ships,
  basePath = "/ships",
  cruiseLinesBasePath = "/cruise-lines",
}: {
  ships: ShipsHubShip[];
  basePath?: string;
  cruiseLinesBasePath?: string;
}) {
  const [query, setQuery] = useState("");
  const [lineFilter, setLineFilter] = useState<string>("all");

  const cruiseLines = useMemo(() => {
    const seen = new Map<string, string>();
    for (const ship of ships) {
      if (!seen.has(ship.cruiseLineSlug)) {
        seen.set(ship.cruiseLineSlug, ship.cruiseLineName);
      }
    }
    return LINE_ORDER.filter((slug) => seen.has(slug)).map((slug) => ({
      slug,
      name: seen.get(slug)!,
    }));
  }, [ships]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ships.filter((ship) => {
      const matchesLine = lineFilter === "all" || ship.cruiseLineSlug === lineFilter;
      const matchesQuery =
        !q ||
        ship.name.toLowerCase().includes(q) ||
        ship.tagline.toLowerCase().includes(q) ||
        ship.cruiseLineName.toLowerCase().includes(q);
      return matchesLine && matchesQuery;
    });
  }, [ships, query, lineFilter]);

  const featured = filtered.filter((s) => s.featuredPage);
  const byLine = LINE_ORDER.map((lineSlug) => ({
    lineSlug,
    lineName: cruiseLines.find((l) => l.slug === lineSlug)?.name ?? lineSlug,
    ships: filtered.filter((s) => s.cruiseLineSlug === lineSlug),
  })).filter((group) => group.ships.length > 0);

  return (
    <div className="space-y-12">
      <section className="rounded-xl border border-caribbean-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="ship-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search ships
            </label>
            <input
              id="ship-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ship or cruise line..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            />
          </div>
          <div className="sm:w-56">
            <label htmlFor="line-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Cruise line
            </label>
            <select
              id="line-filter"
              value={lineFilter}
              onChange={(e) => setLineFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            >
              <option value="all">All cruise lines</option>
              {cruiseLines.map((line) => (
                <option key={line.slug} value={line.slug}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Showing {filtered.length} of {ships.length} Alaska ship guides
        </p>
      </section>

      {featured.length > 0 && (
        <section>
          <h2 className="section-title text-2xl sm:text-3xl mb-6">Featured Ship Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((ship) => (
              <Link key={ship.slug} href={`${basePath}/${ship.slug}`} className="card-gradient group flex h-full flex-col">
                <p className="text-xs font-medium text-caribbean-600">{ship.cruiseLineName}</p>
                <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-caribbean-700 mt-1">
                  {ship.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{ship.tagline}</p>
                <NavCardCta className="pt-4">View {ship.name} ship guide</NavCardCta>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-6">All Ships by Cruise Line</h2>
        {byLine.length === 0 ? (
          <p className="text-gray-600">No ships match your search. Try a different name or cruise line.</p>
        ) : (
          <div className="space-y-10">
            {byLine.map((group) => (
              <div key={group.lineSlug}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    <Link href={`${cruiseLinesBasePath}/${group.lineSlug}`} className="hover:text-caribbean-700">
                      {group.lineName}
                    </Link>
                  </h3>
                  <Link
                    href={`${cruiseLinesBasePath}/${group.lineSlug}`}
                    className="text-sm text-caribbean-700 hover:underline"
                  >
                    Cruise line hub →
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.ships.map((ship) => (
                    <Link
                      key={ship.slug}
                      href={`${basePath}/${ship.slug}`}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-caribbean-200 hover:shadow-sm transition-all"
                    >
                      <span className="font-medium text-gray-900">{ship.name}</span>
                      <span className="block text-xs text-gray-500 mt-1 line-clamp-2">{ship.tagline}</span>
                      <span className="block text-xs text-caribbean-700 mt-2 font-medium">Ship guide →</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
