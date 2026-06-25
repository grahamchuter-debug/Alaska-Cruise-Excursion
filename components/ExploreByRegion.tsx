import Link from "next/link";
import { caribbeanMapRegions } from "@/data/caribbean-regions-map";
import { getPortBySlug } from "@/data/ports";

interface ExploreByRegionProps {
  /** Region id to visually highlight (e.g. on a planner page) */
  highlightRegionId?: string;
  /** Show section heading and intro copy */
  showHeader?: boolean;
  heading?: string;
  subtitle?: string;
  /** Tighter layout for in-page planner sections */
  variant?: "default" | "compact";
  className?: string;
}

function RegionBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-50 to-white font-display text-xs font-bold tracking-wide text-caribbean-800 shadow-sm"
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

function RouteConnector() {
  return (
    <svg
      className="pointer-events-none absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-caribbean-300 lg:block xl:-right-4 xl:w-8"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12 C10 12, 12 4, 20 4 C24 4, 26 8, 30 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        strokeLinecap="round"
      />
      <circle cx="30" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function RegionCard({
  region,
  highlighted,
  compact,
  showConnector,
}: {
  region: (typeof caribbeanMapRegions)[number];
  highlighted: boolean;
  compact: boolean;
  showConnector: boolean;
}) {
  return (
    <article
      className={`card-editorial-static relative flex h-full flex-col ${
        highlighted ? "ring-2 ring-caribbean-200 ring-offset-2" : ""
      } ${compact ? "p-4" : "p-5 sm:p-6"}`}
    >
      {showConnector && <RouteConnector />}

      <div className="flex items-start gap-3">
        <RegionBadge label={region.badge} />
        <div className="min-w-0 flex-1">
          <h3
            className={`font-display font-semibold text-gray-900 ${
              compact ? "text-base" : "text-lg"
            }`}
          >
            {region.name}
          </h3>
          <p className={`mt-1 text-caribbean-700 font-medium ${compact ? "text-xs" : "text-sm"}`}>
            Best for: {region.bestFor}
          </p>
        </div>
      </div>

      <div className={`mt-4 flex flex-wrap gap-1.5 ${compact ? "gap-1" : "gap-1.5"}`}>
        {region.portSlugs.map((slug) => {
          const port = getPortBySlug(slug);
          if (!port) return null;
          return (
            <Link
              key={slug}
              href={`/ports/${slug}`}
              className={`info-badge-subtle transition-colors hover:border hover:border-caribbean-200 hover:bg-caribbean-100/80 ${
                compact ? "text-[11px]" : ""
              }`}
            >
              {port.name}
            </Link>
          );
        })}
      </div>

      <div className={`mt-auto flex flex-wrap gap-2 ${compact ? "mt-4 pt-3" : "mt-5 pt-4"} border-t border-caribbean-100/80`}>
        <Link
          href={region.plannerHref}
          className={`inline-flex items-center rounded-lg bg-caribbean-700 font-semibold text-white transition-colors hover:bg-caribbean-800 focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:ring-offset-2 ${
            compact ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-sm"
          }`}
          aria-label={`Open ${region.name} cruise planner`}
        >
          Region planner
        </Link>
        <Link
          href={region.portsHref}
          className={`inline-flex items-center rounded-lg border border-caribbean-200 bg-white font-semibold text-caribbean-700 transition-colors hover:border-caribbean-300 hover:bg-caribbean-50 focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:ring-offset-2 ${
            compact ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-sm"
          }`}
          aria-label={`View ${region.name} cruise ports`}
        >
          View ports
        </Link>
      </div>
    </article>
  );
}

export function ExploreByRegion({
  highlightRegionId,
  showHeader = true,
  heading = "Caribbean Cruise Map",
  subtitle = `Explore ${caribbeanMapRegions.length} cruise regions across the Caribbean — compare included ports, find the best fit for your travel style, and jump to regional planners.`,
  variant = "default",
  className = "",
}: ExploreByRegionProps) {
  const compact = variant === "compact";

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      aria-labelledby={showHeader ? "explore-by-region-heading" : undefined}
    >
      {/* Map-inspired background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-caribbean-50/80 via-white to-tropical-sand/20" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="region-map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0e7490" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#region-map-grid)" />
        </svg>
        <div className="absolute left-[8%] top-[15%] h-32 w-32 rounded-full bg-caribbean-200/20 blur-3xl" />
        <div className="absolute bottom-[10%] right-[12%] h-40 w-40 rounded-full bg-tropical-sand/30 blur-3xl" />
      </div>

      <div className={`relative ${compact ? "" : "container-wide"}`}>
        {showHeader && (
          <div className={`${compact ? "mb-6" : "mb-10"} text-center sm:text-left`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caribbean-600">
              Explore by region
            </p>
            <h2
              id="explore-by-region-heading"
              className={`section-title mt-2 ${compact ? "text-2xl sm:text-3xl" : ""}`}
            >
              {heading}
            </h2>
            <p className={`section-subtitle mx-auto sm:mx-0 ${compact ? "text-base" : ""}`}>{subtitle}</p>
          </div>
        )}

        <div
          className={`grid gap-4 sm:grid-cols-2 ${compact ? "lg:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"}`}
          role="list"
        >
          {caribbeanMapRegions.map((region, index) => {
            const showConnector =
              !compact && (index + 1) % 4 !== 0 && index < caribbeanMapRegions.length - 1;

            return (
              <div key={region.id} role="listitem" className="relative">
                <RegionCard
                  region={region}
                  highlighted={highlightRegionId === region.id}
                  compact={compact}
                  showConnector={showConnector}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
