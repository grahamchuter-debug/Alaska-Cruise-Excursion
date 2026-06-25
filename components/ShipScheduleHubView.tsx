import Link from "next/link";
import type { ShipSchedulePort } from "@/data/types";
import { ScheduleYearLinks } from "@/components/ScheduleYearLinks";
import { FAQSection } from "@/components/FAQSection";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { yearHubPath } from "@/lib/schedule-utils";
import { CruisePortInformationBox } from "@/components/CruisePortInformationBox";
import { getSchedulePageContentForPortHub } from "@/data/schedule-page-content";
import {
  SchedulePageContentSections,
  SchedulePageIntro,
} from "@/components/SchedulePageContentSections";
import { SchedulePassengerGuide } from "@/components/SchedulePassengerGuide";
import { ScheduleCoverageBanner } from "@/components/ScheduleCoverageBanner";
import { ScheduleComingSoonPanel } from "@/components/ScheduleComingSoonPanel";
import {
  ScheduleArrivalPlanningHeader,
  ScheduleJuneauPlanningSections,
  ScheduleVerifiedCallCount,
} from "@/components/ScheduleJuneauPlanningSections";
import { isLiveImportedSchedulePort } from "@/data/schedule-coverage";
import { getVerifiedCallCount } from "@/lib/schedule-import-audit";
import { NavCardCta } from "@/components/NavCardCta";

export function ShipScheduleHubView({ port }: { port: ShipSchedulePort }) {
  const pageContent = getSchedulePageContentForPortHub(port.slug);
  const faqs = pageContent?.faqs ?? port.faqs ?? [];
  const hasLiveData = isLiveImportedSchedulePort(port.slug);
  const verifiedCalls = getVerifiedCallCount(port.slug);

  return (
    <>
      <ScheduleCoverageBanner portSlug={port.slug} portName={port.name} />

      <CruisePortInformationBox portSlug={port.slug} />

      {port.slug === "juneau" && <ScheduleArrivalPlanningHeader />}

      {hasLiveData && (
        <ScheduleVerifiedCallCount totalCalls={verifiedCalls} portName={port.name} />
      )}

      {pageContent && <SchedulePageIntro content={pageContent} />}

      {!hasLiveData && (
        <ScheduleComingSoonPanel portSlug={port.slug} portName={port.name} variant="hub" />
      )}

      {hasLiveData && (
        <section className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Choose a Schedule Year</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Open the year that matches your sailing for monthly arrival and departure tables with verified
            ship calls.
          </p>
          {port.usesTender && (
            <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <strong>Tender port:</strong> {port.name} uses ship-to-shore tender boats. Published
              schedules may change with weather. Allow extra time when planning excursions.
            </p>
          )}
          <ScheduleYearLinks portSlug={port.slug} portName={port.name} prominent />
        </section>
      )}

      {pageContent && hasLiveData && (
        <SchedulePageContentSections content={pageContent} portName={port.name} />
      )}

      {port.slug === "juneau" && hasLiveData && (
        <ScheduleJuneauPlanningSections showSpecialistCard={false} />
      )}

      <section className="mb-12 rounded-xl border border-gray-200 bg-caribbean-50/40 p-6">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">All Ports by Year</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Compare {port.name} with every other Alaska port on the master year hubs.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={yearHubPath(2026)} className="btn-primary text-sm">
            2026 Alaska Schedules
          </Link>
          <Link href={yearHubPath(2027)} className="btn-secondary text-sm">
            2027 Alaska Schedules
          </Link>
        </div>
      </section>

      <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">Alaska Planning Tools</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Match excursions to verified schedule windows and compare busiest Alaska ports before you
          pick tours for {port.name}.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/alaska-cruise-excursion-planner" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
            <h3 className="font-semibold text-gray-900">Alaska Excursion Planner</h3>
            <p className="mt-2 text-sm text-gray-600">
              Match whale watching, glaciers, railways, and bear viewing to your ports.
            </p>
            <NavCardCta className="pt-4">Open excursion planner</NavCardCta>
          </Link>
          <Link href="/best-alaska-guides" className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
            <h3 className="font-semibold text-gray-900">Best Alaska Guides</h3>
            <p className="mt-2 text-sm text-gray-600">
              Authority guides for wildlife, glaciers, railways, and port planning.
            </p>
            <NavCardCta className="pt-4">Browse best guides</NavCardCta>
          </Link>
        </div>
      </section>

      <SchedulePassengerGuide
        portSlug={port.slug}
        excursionTypeSlugs={port.excursionTypeSlugs}
        variant="hub"
      />

      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      <div className="mt-10">
        <AuthorityHubLinks current="schedules" portSlug={port.slug} />
      </div>
    </>
  );
}
