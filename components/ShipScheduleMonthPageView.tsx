import Link from "next/link";
import type { ScheduleEntry, ShipSchedulePort } from "@/data/types";
import { ScheduleWithCruiseDayLookup } from "@/components/ScheduleWithCruiseDayLookup";
import { FAQSection } from "@/components/FAQSection";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { NavCardCta } from "@/components/NavCardCta";
import { SpecialistLocalGuide } from "@/components/SpecialistLocalGuide";
import { getPortBySlug } from "@/data/ports";
import { hasShipSchedule } from "@/lib/routes";
import { excursionTypes } from "@/data/excursion-types";
import {
  getMonthlyMetaDescription,
  getMonthlyScheduleFaqs,
  getMonthlyScheduleStats,
} from "@/data/schedule-month";
import {
  formatMonthLabel,
  getAdjacentVerifiedMonthKeys,
  portHubPath,
  portMonthPath,
  portYearPath,
  yearHubPath,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import { getVerifiedMonthKeysForPort } from "@/data/schedules";
import { CruisePortInformationBox } from "@/components/CruisePortInformationBox";
import { getScheduleIntro } from "@/lib/cruise-port-display";

function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ShipScheduleMonthPageView({
  port,
  monthKey,
  entries,
}: {
  port: ShipSchedulePort;
  monthKey: string;
  entries: ScheduleEntry[];
}) {
  const monthLabel = formatMonthLabel(monthKey);
  const year = Number(monthKey.split("-")[0]) as ScheduleYear;
  const stats = getMonthlyScheduleStats(entries, port, monthKey);
  const faqs = getMonthlyScheduleFaqs(port, monthKey, entries);
  const authorityPort = getPortBySlug(port.slug);
  const monthKeys = getVerifiedMonthKeysForPort(port.slug);
  const { prev, next } = getAdjacentVerifiedMonthKeys(monthKeys, monthKey);

  const relatedPorts = port.relatedPortSlugs
    .map((slug) => getPortBySlug(slug))
    .filter(Boolean);

  const excursions = port.excursionTypeSlugs
    .map((slug) => excursionTypes.find((type) => type.slug === slug))
    .filter(Boolean);
  const scheduleIntro = getScheduleIntro(port.slug);

  return (
    <>
      <CruisePortInformationBox portSlug={port.slug} />

      <section className="mb-10">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">{monthLabel} Schedule Overview</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {scheduleIntro ??
            `This page lists cruise ships scheduled to call at ${port.name} during ${monthLabel}, including arrival and departure times where available.`}{" "}
          Use it to plan shore excursions around your ship&apos;s published port window.
        </p>
        {port.usesTender && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Tender port:</strong> {port.name} uses ship-to-shore tender boats. Allow extra
            return time on {monthLabel} port days.
          </p>
        )}
      </section>

      <section className="mb-10 rounded-2xl border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-50 via-white to-tropical-sand/30 p-6 sm:p-8">
        <h2 className="section-title text-2xl sm:text-3xl mb-5">{monthLabel} Summary</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Ship calls</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">{stats.shipCalls}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Estimated passenger capacity
            </dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              {stats.estimatedPassengers.toLocaleString()}
              <span className="block text-xs font-normal text-gray-500 mt-1">
                Sourced from CruiseMapper passenger ratings where available; otherwise estimated at 3,000 guests per call
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Busiest scheduled day
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">
              {stats.busiestDay
                ? `${formatDisplayDate(stats.busiestDay.date)} (${stats.busiestDay.count} ships)`
                : "Not available"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Main cruise lines
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">
              {stats.cruiseLines.length > 0 ? stats.cruiseLines.join(", ") : "Not available"}
            </dd>
          </div>
        </dl>
        <p className="mt-5 text-sm text-gray-700 leading-relaxed">
          <strong>Planning tip:</strong> {stats.planningTip}
        </p>
      </section>

      <nav className="mb-8 flex flex-wrap gap-3" aria-label="Monthly schedule navigation">
        {prev ? (
          <Link href={portMonthPath(port.slug, prev)} className="btn-secondary text-sm">
            ← {formatMonthLabel(prev)}
          </Link>
        ) : (
          <span className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm text-gray-400">
            No earlier month
          </span>
        )}
        {next ? (
          <Link href={portMonthPath(port.slug, next)} className="btn-secondary text-sm">
            {formatMonthLabel(next)} →
          </Link>
        ) : (
          <span className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm text-gray-400">
            No later month
          </span>
        )}
        <Link href={portYearPath(port.slug, year)} className="btn-primary text-sm">
          Full {year} schedule
        </Link>
        <Link href={yearHubPath(year)} className="btn-secondary text-sm">
          All {year} Caribbean schedules
        </Link>
        <Link href={portHubPath(port.slug)} className="btn-secondary text-sm">
          {port.name} schedule hub
        </Link>
      </nav>

      <section className="mb-12">
        <ScheduleWithCruiseDayLookup
          entries={entries}
          portName={port.name}
          portSlug={port.slug}
          showNotes
          tableTitle={`${monthLabel} Schedule Table`}
        />
      </section>

      <section className="mb-12 rounded-xl border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-50 to-white p-6 sm:p-8">
        <h2 className="section-title text-2xl sm:text-3xl mb-3">Plan Your Excursion</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Once you know your ship arrival and departure time, compare shore excursions for{" "}
          {port.name}. Start with our authority port guide, then browse specialist local operators
          with pier-aware pickup and return guarantees.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/ports/${port.slug}`} className="btn-primary text-sm">
            {port.name} port guide &amp; excursions
          </Link>
          {authorityPort && (
            <a
              href={authorityPort.specialistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              {authorityPort.specialistName}
            </a>
          )}
          <Link href="/ship-schedules" className="btn-secondary text-sm">
            Ship schedules hub
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-6">Related Links</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link href={`/ports/${port.slug}`} className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
            <span className="font-medium text-gray-900">{port.name} authority guide</span>
            <span className="block text-sm text-gray-600 mt-1">
              Excursions, beaches, port logistics, and passenger tips
            </span>
            <NavCardCta className="pt-4">View {port.name} port guide</NavCardCta>
          </Link>
          {authorityPort && (
            <a
              href={authorityPort.specialistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-gradient group flex h-full flex-col hover:border-caribbean-300"
            >
              <span className="font-medium text-gray-900">{authorityPort.specialistName}</span>
              <span className="block text-sm text-gray-600 mt-1">
                Live tour listings, local pricing, and pier pickup details
              </span>
              <NavCardCta className="pt-4">Book with {authorityPort.specialistName}</NavCardCta>
            </a>
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

      {authorityPort && (
        <div className="mb-12">
          <SpecialistLocalGuide portSlug={port.slug} />
        </div>
      )}

      <FAQSection faqs={faqs} />

      <p className="mt-8 text-sm text-gray-500">
        {getMonthlyMetaDescription(port.name, monthKey, stats.shipCalls, port.slug)} Arrival and departure
        times are subject to change. Confirm final times with your cruise line before disembarking.
      </p>

      <div className="mt-10">
        <AuthorityHubLinks current="schedules" portSlug={port.slug} />
      </div>
    </>
  );
}
