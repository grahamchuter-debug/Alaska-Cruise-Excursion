import Link from "next/link";
import type { CruiseLine } from "@/data/types";
import { getCruiseLinePlanning } from "@/data/cruise-line-planning";
import { getShipsByCruiseLine } from "@/data/ships";
import { CARIBBEAN_HUB_PORT_SLUGS } from "@/data/cruise-line-ports";
import { getPortBySlug } from "@/data/ports";
import { hasShipSchedule } from "@/lib/routes";
import { getPortGuideCount } from "@/data/content-inventory";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { NavCardCta } from "@/components/NavCardCta";

interface CruiseLinePlanningSectionsProps {
  line: CruiseLine;
  variant?: "hub" | "guide";
}

function PlanningLinkGrid({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-caribbean-200 bg-white px-3 py-2 text-sm text-caribbean-800 hover:bg-caribbean-50 hover:border-caribbean-300 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CruiseLinePlanningSections({
  line,
  variant = "hub",
}: CruiseLinePlanningSectionsProps) {
  const planning = getCruiseLinePlanning(line.slug);
  const ships = getShipsByCruiseLine(line.slug);
  const popularPortSet = new Set(line.popularPorts.map((p) => p.slug));

  if (!planning) return null;

  return (
    <div className="space-y-12">
      {variant === "hub" && (
        <div className="mb-2">
          <Link href={`/${line.pageSlug}`} className="btn-primary text-sm">
            {line.name} Shore Excursions Authority Guide
          </Link>
        </div>
      )}
      {variant === "guide" && (
        <div className="mb-2">
          <Link href={`/cruise-lines/${line.slug}`} className="text-sm text-caribbean-700 hover:underline">
            {line.name} cruise line hub →
          </Link>
        </div>
      )}

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-4">Cruise Line Overview</h2>
        <p className="text-gray-700 leading-relaxed text-lg mb-4">{line.overview}</p>
        <p className="text-gray-700 leading-relaxed mb-6">{line.overviewDetail}</p>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-caribbean-100 bg-caribbean-50/40 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Fleet Size</dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">{planning.fleetSize}</dd>
          </div>
          <div className="rounded-xl border border-caribbean-100 bg-caribbean-50/40 p-4 sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Passenger Profile</dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">{planning.passengerProfile}</dd>
          </div>
        </dl>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Best For</p>
          <div className="flex flex-wrap gap-2">
            {planning.bestFor.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-caribbean-700 px-3 py-1 text-xs font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Typical Caribbean Itineraries</h3>
          <ul className="space-y-2">
            {line.caribbeanRoutes.map((route) => (
              <li key={route} className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="mt-0.5 text-caribbean-500">→</span>
                {route}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <h2 className="section-title text-2xl sm:text-3xl">Popular Caribbean Ships</h2>
          <Link href="/ships" className="text-sm text-caribbean-700 hover:underline shrink-0">
            Browse all ships →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {ships.map((ship) => (
            <Link key={ship.slug} href={`/ships/${ship.slug}`} className="card-gradient group flex h-full flex-col">
              <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-caribbean-700">
                {ship.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{ship.tagline}</p>
              {ship.caribbeanItineraries.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {ship.caribbeanItineraries.slice(0, 2).map((itinerary) => (
                    <li key={itinerary} className="text-xs text-gray-500">
                      {itinerary}
                    </li>
                  ))}
                </ul>
              )}
              <NavCardCta className="pt-4">View {ship.name} ship guide</NavCardCta>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-2">Caribbean Ports Frequently Visited</h2>
        <p className="text-sm text-gray-600 mb-6">
          Standard Caribbean hub ports for {line.name} passengers. Ports marked as popular appear on most{" "}
          {line.name} itineraries. Each card links to our port guide, ship schedules, and specialist local
          booking sites.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {CARIBBEAN_HUB_PORT_SLUGS.map((portSlug) => {
            const port = getPortBySlug(portSlug);
            if (!port) return null;
            const isPopular = popularPortSet.has(portSlug);
            return (
              <div
                key={portSlug}
                className={`rounded-xl border p-4 ${isPopular ? "border-caribbean-300 bg-caribbean-50/50" : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">
                    <Link href={`/ports/${portSlug}`} className="hover:text-caribbean-700">
                      {port.name}
                    </Link>
                  </h3>
                  {isPopular && (
                    <span className="shrink-0 rounded bg-caribbean-700 px-2 py-0.5 text-xs font-medium text-white">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-caribbean-600">{port.bestFor}</p>
                <ExcursionCardCTAs portSlug={portSlug} className="mt-4" />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Best Excursions by Cruise Line</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {planning.excursionCategories.map((category) => (
            <div key={category.category} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="font-semibold text-gray-900">{category.category}</h3>
                <Link href={category.href} className="text-xs text-caribbean-700 hover:underline shrink-0">
                  Full guide →
                </Link>
              </div>
              <ul className="space-y-3">
                {category.picks.map((pick) => {
                  const port = getPortBySlug(pick.portSlug);
                  return (
                    <li key={`${pick.portSlug}-${pick.name}`}>
                      <p className="font-medium text-gray-900 text-sm">{pick.name}</p>
                      <p className="text-xs text-caribbean-700">
                        <Link href={`/ports/${pick.portSlug}`} className="hover:underline">
                          {port?.name ?? pick.portSlug}
                        </Link>
                      </p>
                      <p className="mt-1 text-xs text-gray-600 leading-relaxed">{pick.description}</p>
                      <ExcursionCardCTAs
                        portSlug={pick.portSlug}
                        guideHref={category.href}
                        sectionHint={category.category}
                        text={`${pick.name} ${pick.description}`}
                        className="mt-2"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-50 via-white to-tropical-sand/30 p-6 sm:p-8">
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Cruise Line Planning Advice</h2>
        <dl className="space-y-5">
          {(
            [
              ["Independent Excursions", planning.planningAdvice.independentExcursions],
              ["Return-to-Ship Timing", planning.planningAdvice.returnTiming],
              ["Tender Ports", planning.planningAdvice.tenderPorts],
              ["Peak Cruise Days", planning.planningAdvice.peakDays],
              ["Booking Advice", planning.planningAdvice.bookingAdvice],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <dt className="font-semibold text-gray-900">{label}</dt>
              <dd className="mt-1 text-sm text-gray-700 leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>
        {line.excursionTips.length > 0 && (
          <div className="mt-8 pt-6 border-t border-caribbean-200">
            <h3 className="font-semibold text-gray-900 mb-3">Additional Excursion Tips</h3>
            <ul className="space-y-2">
              {line.excursionTips.slice(0, 3).map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-caribbean-600">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Plan Your Caribbean Cruise</h2>
        <div className="space-y-8 rounded-xl border border-gray-200 bg-white p-6">
          <PlanningLinkGrid title="Cruise Planners" links={planning.plannerLinks} />
          <PlanningLinkGrid title="Port Comparisons" links={planning.comparisonLinks} />
          <PlanningLinkGrid title="Best Excursion Guides" links={planning.bestGuideLinks} />
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">All Port Guides</h3>
            <Link href="/ports" className="text-sm text-caribbean-700 hover:underline">
              Browse all {getPortGuideCount()} Caribbean port authority guides →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
