import Link from "next/link";
import type { ShipSchedulePort } from "@/data/types";
import {
  getScheduleForPort,
  getScheduleForPortYear,
  hasVerifiedScheduleDataForYear,
} from "@/data/schedules";
import { ScheduleYearLinks } from "@/components/ScheduleYearLinks";
import { yearHubPath, type ScheduleYear } from "@/lib/schedule-utils";
import { getPortBySlug } from "@/data/ports";
import { excursionTypes } from "@/data/excursion-types";
import { ScheduleHub } from "@/components/ScheduleHub";
import { ScheduleMonthLinkGrid } from "@/components/ScheduleMonthLinkGrid";
import { SpecialistPartnerCard } from "@/components/SpecialistPartnerCard";
import { FAQSection } from "@/components/FAQSection";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { NavCardCta } from "@/components/NavCardCta";
import { SCHEDULE_PLANNING_TIPS } from "@/data/schedule-content";
import { getSchedulePageContentForPortYear, getSchedulePageContentForPortHub } from "@/data/schedule-page-content";
import {
  SchedulePageContentSections,
} from "@/components/SchedulePageContentSections";
import { hasShipSchedule } from "@/lib/routes";
import { CruisePortInformationBox } from "@/components/CruisePortInformationBox";
import { getScheduleIntro } from "@/lib/cruise-port-display";

import { JUNEAU_SCHEDULE_PLANNING_TIPS, JUNEAU_SCHEDULE_INTRO } from "@/data/juneau-schedule-planning";
import { isLiveImportedSchedulePort } from "@/data/schedule-coverage";
import { ScheduleCoverageBanner } from "@/components/ScheduleCoverageBanner";
import { ScheduleComingSoonPanel } from "@/components/ScheduleComingSoonPanel";
import {
  ScheduleArrivalPlanningHeader,
  ScheduleJuneauPlanningSections,
  ScheduleVerifiedCallCount,
} from "@/components/ScheduleJuneauPlanningSections";
import { getVerifiedCallCount } from "@/lib/schedule-import-audit";

import { SchedulePassengerGuide } from "@/components/SchedulePassengerGuide";

export function ShipSchedulePageView({
  port,
  year,
}: {
  port: ShipSchedulePort;
  year?: ScheduleYear;
}) {
  const schedule = year ? getScheduleForPortYear(port.slug, year) : getScheduleForPort(port.slug);
  const authorityPort = getPortBySlug(port.slug);
  const planningTips =
    port.slug === "juneau" ? [...JUNEAU_SCHEDULE_PLANNING_TIPS] : (port.planningTips ?? SCHEDULE_PLANNING_TIPS);
  const pageContent = year ? getSchedulePageContentForPortYear(port.slug, year) : null;
  const hubContent = getSchedulePageContentForPortHub(port.slug);
  const displayContent = pageContent ?? (port.slug === "juneau" ? hubContent : null);
  const faqs = pageContent?.faqs ?? port.faqs ?? [];

  const relatedPorts = port.relatedPortSlugs
    .map((slug) => getPortBySlug(slug))
    .filter(Boolean);

  const excursions = port.excursionTypeSlugs
    .map((slug) => excursionTypes.find((e) => e.slug === slug))
    .filter(Boolean);
  const scheduleIntro =
    port.slug === "juneau"
      ? JUNEAU_SCHEDULE_INTRO
      : pageContent?.intro ?? getScheduleIntro(port.slug) ?? port.intro;

  const hasYearData = year ? hasVerifiedScheduleDataForYear(port.slug, year) : isLiveImportedSchedulePort(port.slug);
  const verifiedCalls = year ? getVerifiedCallCount(port.slug, year) : getVerifiedCallCount(port.slug);

  return (
    <>
      <ScheduleCoverageBanner portSlug={port.slug} portName={port.name} variant="compact" />

      <CruisePortInformationBox portSlug={port.slug} />

      {port.slug === "juneau" && hasYearData && <ScheduleArrivalPlanningHeader />}

      {isLiveImportedSchedulePort(port.slug) && hasYearData && (
        <ScheduleVerifiedCallCount
          totalCalls={verifiedCalls}
          year={year}
          portName={port.name}
        />
      )}

      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">How This Schedule Helps You Plan</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{scheduleIntro}</p>
        {port.usesTender && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Tender port:</strong> {port.name} uses ship-to-shore tender boats. Published
            schedules may change with weather. Allow extra time when planning excursions.
          </p>
        )}
        {!port.usesTender && port.slug === "juneau" && (
          <p className="mt-4 rounded-lg border border-caribbean-200 bg-caribbean-50 px-4 py-3 text-sm text-caribbean-900">
            <strong>Downtown dock:</strong> Most Juneau ships berth at the downtown cruise terminal — whale
            tours, Mendenhall Glacier taxis, and helicopter pickups start near the pier. Plan 45–60 minutes
            return buffer before all-aboard even on docked calls.
          </p>
        )}
        {!isLiveImportedSchedulePort(port.slug) && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Schedule coming soon:</strong> Verified ship rows for {port.name} are not published yet. We
            do not show placeholder sailings — use the planning links below while imports complete.
          </p>
        )}
      </section>

      {year && !hasYearData && (
        <ScheduleComingSoonPanel
          portSlug={port.slug}
          portName={port.name}
          variant="year"
          year={year}
        />
      )}

      {displayContent && hasYearData && (
        <SchedulePageContentSections content={displayContent} portName={port.name} />
      )}

      {year && hasYearData && (
        <section className="mb-8">
          <div className="mb-4 flex flex-wrap gap-3">
            <Link href={yearHubPath(year)} className="text-sm font-medium text-caribbean-700 hover:text-caribbean-800">
              ← All {year} Alaska schedules
            </Link>
          </div>
          <ScheduleYearLinks portSlug={port.slug} portName={port.name} currentYear={year} />
        </section>
      )}

      {year && hasYearData && (
        <ScheduleMonthLinkGrid portSlug={port.slug} portName={port.name} year={year} />
      )}

      {hasYearData && (
      <ScheduleHub
        entries={schedule}
        portName={port.name}
        portSlug={port.slug}
        scheduleOverview={port.scheduleOverview}
        year={year}
      />
      )}

      {hasYearData && (
      <SchedulePassengerGuide
        portSlug={port.slug}
        year={year}
        excursionTypeSlugs={port.excursionTypeSlugs}
      />
      )}

      {port.slug === "juneau" && hasYearData && (
        <ScheduleJuneauPlanningSections
          contextLabel={year ? `${year} sailing` : undefined}
          showSpecialistCard={false}
        />
      )}

      {hasYearData && (
      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Cruise Planning Tips</h2>
        <ul className="space-y-3">
          {planningTips.map((tip) => (
            <li key={tip} className="flex items-start gap-3 text-gray-700">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white text-xs">
                ✓
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </section>
      )}

      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Related Links</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Authority port page</h3>
            <Link href={`/ports/${port.slug}`} className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
              <span className="font-medium text-gray-900">{port.name} shore excursions guide</span>
              <span className="block text-sm text-gray-600 mt-1">
                Excursions, port logistics, and passenger tips
              </span>
              <NavCardCta className="pt-4">View {port.name} port guide</NavCardCta>
            </Link>
          </div>
          {authorityPort && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Local specialist partner</h3>
              <SpecialistPartnerCard portSlug={port.slug} variant="compact" hidePortGuideLink />
            </div>
          )}
        </div>

        {excursions.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Excursion types for {port.name}</h3>
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
                  ),
              )}
            </div>
          </div>
        )}

        {relatedPorts.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Nearby cruise ports</h3>
            <div className="flex flex-wrap gap-2">
              {relatedPorts.map(
                (related) =>
                  related && (
                    <Link
                      key={related.slug}
                      href={`/ports/${related.slug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
                    >
                      {related.name}
                    </Link>
                  ),
              )}
              {relatedPorts.map(
                (related) =>
                  related &&
                  hasShipSchedule(related.slug) && (
                    <Link
                      key={`sched-${related.slug}`}
                      href={`/ship-schedules/${related.slug}`}
                      className="rounded-full bg-caribbean-50 px-3 py-1.5 text-xs font-medium text-caribbean-700 hover:bg-caribbean-100"
                    >
                      {related.name} schedule
                    </Link>
                  ),
              )}
            </div>
          </div>
        )}
      </section>
      {year && (
        <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Alaska Planning Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/alaska-cruise-excursion-planner" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
              <h3 className="font-semibold text-gray-900">Alaska Excursion Planner</h3>
              <p className="mt-2 text-sm text-gray-600">
                Match excursions to your port schedule and interests.
              </p>
              <NavCardCta className="pt-4">Open excursion planner</NavCardCta>
            </Link>
            <Link href="/best-alaska-guides" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
              <h3 className="font-semibold text-gray-900">Best Alaska Guides</h3>
              <p className="mt-2 text-sm text-gray-600">
                Wildlife, glaciers, railways, and port planning authority guides.
              </p>
              <NavCardCta className="pt-4">Browse best guides</NavCardCta>
            </Link>
          </div>
        </section>
      )}

      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      <div className="mt-10">
        <AuthorityHubLinks current="schedules" portSlug={port.slug} />
      </div>
    </>
  );
}
