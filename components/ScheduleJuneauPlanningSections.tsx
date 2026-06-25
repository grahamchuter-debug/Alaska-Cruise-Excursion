import Link from "next/link";
import { excursionTypes } from "@/data/excursion-types";
import {
  JUNEAU_ARRIVAL_INTRO,
  JUNEAU_GLACIER_TIMING,
  JUNEAU_WHALE_TIMING,
  juneauPlanningYourDay,
} from "@/data/juneau-schedule-planning";
import { SpecialistPartnerCard } from "@/components/SpecialistPartnerCard";
import { NavCardCta } from "@/components/NavCardCta";

interface ScheduleJuneauPlanningSectionsProps {
  /** When set, copy references a specific month or year context */
  contextLabel?: string;
  showSpecialistCard?: boolean;
}

export function ScheduleArrivalPlanningHeader() {
  return (
    <section className="mb-10 rounded-2xl border-2 border-caribbean-300 bg-gradient-to-br from-caribbean-800 to-caribbean-600 p-6 sm:p-8 text-white shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caribbean-100">
        Cruise passenger guide
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
        I&apos;m arriving by cruise ship — what should I do in port?
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">{JUNEAU_ARRIVAL_INTRO}</p>
    </section>
  );
}

export function ScheduleVerifiedCallCount({
  totalCalls,
  year,
  portName = "Juneau",
}: {
  totalCalls: number;
  year?: number;
  portName?: string;
}) {
  if (totalCalls <= 0) return null;

  return (
    <section className="mb-8 rounded-xl border border-caribbean-200 bg-white p-5 shadow-sm sm:p-6">
      <dl className="flex flex-wrap items-end gap-6">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Verified ship calls</dt>
          <dd className="mt-1 font-display text-3xl font-bold text-caribbean-800">
            {totalCalls.toLocaleString()}
          </dd>
        </div>
        <div className="min-w-[12rem] flex-1">
          <p className="text-sm text-gray-700 leading-relaxed">
            {year
              ? `${portName} ${year} schedule — ${totalCalls.toLocaleString()} imported port calls with arrival and departure times. Use monthly tables to spot multi-ship days before booking whale watching or glacier tours.`
              : `${portName} live schedule — ${totalCalls.toLocaleString()} verified port calls imported. Browse by year and month to plan excursions around your ship window.`}
          </p>
        </div>
      </dl>
    </section>
  );
}

export function ScheduleJuneauPlanningSections({
  contextLabel,
  showSpecialistCard = true,
}: ScheduleJuneauPlanningSectionsProps) {
  const featuredTypes = ["whale-watching", "glacier-tours", "flightseeing", "dog-sledding"]
    .map((slug) => excursionTypes.find((type) => type.slug === slug))
    .filter(Boolean);

  return (
    <>
      <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">Best excursions from Juneau</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {contextLabel
            ? `For your ${contextLabel} port day, these are the experiences Juneau cruise passengers book most often — matched to downtown docking and typical 6–9 hour calls.`
            : "Juneau passengers usually anchor on one signature experience, then add shorter stops if time allows."}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {juneauPlanningYourDay.recommendedExcursions.map((name) => (
            <div key={name} className="rounded-xl border border-caribbean-100 bg-caribbean-50/40 p-4">
              <p className="font-semibold text-gray-900">{name}</p>
            </div>
          ))}
        </div>
        {featuredTypes.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Excursion type guides</h3>
            <div className="flex flex-wrap gap-2">
              {featuredTypes.map(
                (type) =>
                  type && (
                    <Link
                      key={type.slug}
                      href={`/excursion-types/${type.slug}`}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-caribbean-700 border border-caribbean-200 hover:bg-caribbean-50"
                    >
                      {type.name}
                    </Link>
                  ),
              )}
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/ports/juneau" className="btn-primary text-sm">
            Juneau port guide
          </Link>
          <Link href="/best-alaska-whale-watching-excursions" className="btn-secondary text-sm">
            Best whale watching guide
          </Link>
          <Link href="/best-alaska-glacier-excursions" className="btn-secondary text-sm">
            Best glacier excursions
          </Link>
        </div>
      </section>

      <section className="mb-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-gray-900">Best timing for whale watching</h3>
          <ul className="mt-4 space-y-2">
            {JUNEAU_WHALE_TIMING.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1 text-caribbean-600">•</span>
                {tip}
              </li>
            ))}
          </ul>
          <Link href="/excursion-types/whale-watching" className="mt-4 inline-flex text-sm font-medium text-caribbean-700 hover:underline">
            Whale watching excursion guide →
          </Link>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-gray-900">Best timing for glacier trips</h3>
          <ul className="mt-4 space-y-2">
            {JUNEAU_GLACIER_TIMING.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1 text-caribbean-600">•</span>
                {tip}
              </li>
            ))}
          </ul>
          <Link href="/excursion-types/glacier-tours" className="mt-4 inline-flex text-sm font-medium text-caribbean-700 hover:underline">
            Glacier excursions guide →
          </Link>
        </div>
      </section>

      {showSpecialistCard && (
        <section className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl mb-4">Book with the Juneau specialist</h2>
          <p className="text-sm text-gray-600 mb-4">
            Live tour listings, pier pickup details, and operator pricing on the dedicated local site.
          </p>
          <SpecialistPartnerCard portSlug="juneau" hidePortGuideLink />
        </section>
      )}
    </>
  );
}
