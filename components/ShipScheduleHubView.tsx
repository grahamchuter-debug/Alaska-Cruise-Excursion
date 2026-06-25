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
import { NavCardCta } from "@/components/NavCardCta";

export function ShipScheduleHubView({ port }: { port: ShipSchedulePort }) {
  const pageContent = getSchedulePageContentForPortHub(port.slug);
  const faqs = pageContent?.faqs ?? port.faqs ?? [];

  return (
    <>
      <CruisePortInformationBox portSlug={port.slug} />

      {pageContent && <SchedulePageIntro content={pageContent} />}

      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">Choose a Schedule Year</h2>
        {!pageContent && (
          <p className="text-gray-700 leading-relaxed text-lg mb-6 max-w-3xl">{port.intro}</p>
        )}
        {pageContent && (
          <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
            Open the year that matches your sailing for monthly arrival and departure tables. Compare
            both years from this hub if you are still choosing between 2026 and 2027 itineraries.
          </p>
        )}
        {port.usesTender && (
          <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Tender port:</strong> {port.name} uses ship-to-shore tender boats. Published
            schedules may change with weather. Allow extra time when planning excursions.
          </p>
        )}
        <ScheduleYearLinks portSlug={port.slug} portName={port.name} prominent />
      </section>

      {pageContent && (
        <SchedulePageContentSections content={pageContent} portName={port.name} />
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
