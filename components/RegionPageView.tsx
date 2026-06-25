import Link from "next/link";
import type { RegionPage } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { excursionTypes } from "@/data/excursion-types";
import { getRegionBySlug } from "@/data/regions";
import { getRegionalPlannersByRegionPage } from "@/data/regional-cruise-planners";
import { hasShipSchedule } from "@/lib/routes";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { SpecialistLocalGuideSection } from "@/components/SpecialistLocalGuide";
import { NavCardCta } from "@/components/NavCardCta";

export function RegionPageView({ region }: { region: RegionPage }) {
  const ports = region.portSlugs
    .map((slug) => getPortBySlug(slug))
    .filter(Boolean);

  const excursions = region.excursionTypeSlugs
    .map((slug) => excursionTypes.find((e) => e.slug === slug))
    .filter(Boolean);

  const relatedRegions = region.relatedRegionSlugs
    .map((slug) => getRegionBySlug(slug))
    .filter(Boolean);

  const regionalPlanners = getRegionalPlannersByRegionPage(region.slug);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Caribbean Ports", path: "/ports" },
    { name: region.title.replace(" Guide", ""), path: `/${region.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          travelGuideSchema({
            title: region.title,
            description: region.overview,
            path: `/${region.slug}`,
          }),
        ]}
      />
      <PageHero title={region.title} subtitle={region.heroSubtitle} />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">About This Region</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{region.overview}</p>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Compare Ports</h2>
            <p className="text-gray-700 leading-relaxed">{region.portComparison}</p>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Recommended Excursions</h2>
            <ul className="space-y-3">
              {region.recommendedExcursions.map((exc) => (
                <li key={exc} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white text-xs">
                    ✓
                  </span>
                  {exc}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Authority Port Guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {ports.map(
                (port) =>
                  port && (
                    <div key={port.slug} className="card-gradient">
                      <h3 className="font-display text-lg font-bold text-gray-900">
                        <Link href={`/ports/${port.slug}`} className="hover:text-caribbean-700">
                          {port.name}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{port.tagline}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link href={`/ports/${port.slug}`} className="btn-primary text-xs">
                          Port Guide
                        </Link>
                        {hasShipSchedule(port.slug) && (
                          <Link
                            href={`/ship-schedules/${port.slug}`}
                            className="btn-secondary text-xs"
                          >
                            Ship Schedule
                          </Link>
                        )}
                        <a
                          href={port.specialistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs"
                        >
                          {port.specialistName}
                        </a>
                      </div>
                    </div>
                  )
              )}
            </div>
          </section>

          <SpecialistLocalGuideSection
            portSlugs={region.portSlugs}
            intro="Each port in this region has a dedicated local specialist website with live tour listings, transparent local pricing, and pier pickup details, the next step after reading this regional overview."
          />

          {regionalPlanners.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Regional Cruise Planners</h2>
              <p className="text-gray-700 mb-6">
                Go deeper with port comparisons, beach picks, private tours, and family excursion recommendations for this region.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {regionalPlanners.map((planner) => (
                  <Link key={planner.slug} href={`/${planner.slug}`} className="card-gradient group flex h-full flex-col">
                    <h3 className="font-semibold text-gray-900">{planner.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{planner.heroSubtitle}</p>
                    <NavCardCta className="pt-4">Open regional planner</NavCardCta>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Excursion Types</h2>
            <div className="flex flex-wrap gap-2">
              {excursions.map(
                (type) =>
                  type && (
                    <Link
                      key={type.slug}
                      href={`/excursion-types/${type.slug}`}
                      className="rounded-full bg-caribbean-50 px-4 py-2 text-sm font-medium text-caribbean-700 hover:bg-caribbean-100"
                    >
                      {type.name}
                    </Link>
                  )
              )}
            </div>
          </section>

          {relatedRegions.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Other Caribbean Regions</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedRegions.map(
                  (r) =>
                    r && (
                      <Link
                        key={r.slug}
                        href={`/${r.slug}`}
                        className="card hover:border-caribbean-200 flex h-full flex-col"
                      >
                        <span className="font-semibold text-gray-900">{r.title.replace(" Guide", "")}</span>
                        <NavCardCta className="pt-3">View region guide</NavCardCta>
                      </Link>
                    )
                )}
              </div>
            </section>
          )}

          <AuthorityHubLinks current="regions" />
        </div>
      </section>
    </>
  );
}
