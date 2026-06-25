"use client";

import Link from "next/link";
import { CruiseConfidenceCard } from "@/components/CruiseConfidenceCard";
import { CruiseConfidenceLabels } from "@/components/CruiseConfidenceLabels";
import type { CruiseDayPlan } from "@/lib/cruise-day-plan";
import { getMatchTierStyles } from "@/lib/cruise-day-plan";
import { getCrowdLevelStyles } from "@/lib/cruise-day-lookup";
import { CruiseDayPlanDownloadButton } from "@/components/CruiseDayPlanDownloadButton";
import { BookingJourneyPanel } from "@/components/BookingJourneyPanel";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { MatchReasonsPanel } from "@/components/MatchReasonsPanel";
import { ShipNameLink } from "@/components/ShipNameLink";
import { cruiseDayPlanInterests } from "@/lib/cruise-day-plan";

interface CruiseDayPlanViewProps {
  plan: CruiseDayPlan;
  variant?: "screen" | "print";
}

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function interestLabels(ids: CruiseDayPlan["interests"]) {
  return ids
    .map((id) => cruiseDayPlanInterests.find((option) => option.id === id)?.label ?? id)
    .join(", ");
}

export function CruiseDayPlanView({ plan, variant = "screen" }: CruiseDayPlanViewProps) {
  const isPrint = variant === "print";
  const matchStyles = getMatchTierStyles(plan.recommendedExcursions.matchLabel);
  const crowdStyles = plan.shipsSummary ? getCrowdLevelStyles(plan.shipsSummary.crowdLevel) : null;

  return (
    <article
      id="cruise-day-plan-results"
      className={`cruise-day-plan-document space-y-8 ${isPrint ? "print-only-layout bg-white p-0" : "mt-10"}`}
    >
      {!isPrint && (
        <div className="flex flex-col gap-4 rounded-2xl border border-caribbean-200 bg-gradient-to-r from-caribbean-700 to-caribbean-800 p-5 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between print:hidden">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caribbean-100">
              Your personalised plan
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              {plan.portName} · {plan.displayDate}
            </h2>
            <p className="mt-1 text-sm text-caribbean-100">
              {interestLabels(plan.interests)} · {plan.activityLevel} activity
            </p>
          </div>
          <CruiseDayPlanDownloadButton
            plan={plan}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-caribbean-800 shadow-sm transition hover:bg-caribbean-50"
          />
        </div>
      )}

      {isPrint && (
        <header className="border-b border-gray-300 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Caribbean Cruise Day Plan
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-gray-900">
            {plan.portName}
          </h1>
          <p className="mt-1 text-lg text-gray-700">{plan.displayDate}</p>
          <p className="mt-2 text-sm text-gray-600">
            Interests: {interestLabels(plan.interests)} · Activity: {plan.activityLevel}
          </p>
        </header>
      )}

      {/* 1. Recommended Excursions */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-gray-900">Recommended Excursions</h3>
        <p className="mt-1 text-sm text-gray-600">
          Matched to your interests and activity level using port authority data.
        </p>
        <div className="mt-4 rounded-xl border border-caribbean-200 bg-caribbean-50/50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-800">Top pick</p>
              <h4 className="mt-1 text-lg font-bold text-gray-900">{plan.recommendedExcursions.primary.name}</h4>
            </div>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${matchStyles}`}>
              {plan.recommendedExcursions.matchLabel} · {plan.recommendedExcursions.matchScore}/100
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-700">{plan.recommendedExcursions.primary.description}</p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">Duration</dt>
              <dd className="font-medium text-gray-900">{plan.recommendedExcursions.primary.duration}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">Type</dt>
              <dd className="font-medium text-gray-900">{plan.recommendedExcursions.primary.type}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">Why it fits</dt>
              <dd className="font-medium text-gray-900">{plan.recommendedExcursions.primary.matchReason}</dd>
            </div>
          </dl>
          <MatchReasonsPanel
            matchLabel={plan.recommendedExcursions.matchLabel}
            reasons={plan.recommendedExcursions.matchReasons}
            className="mt-4"
          />
          <CruiseConfidenceLabels
            labels={plan.returnToShipAdvice.supportingLabels}
            className="mt-4"
            compact
          />
          {plan.recommendedExcursions.bestForTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {plan.recommendedExcursions.bestForTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-caribbean-200 bg-white px-2.5 py-1 text-xs font-medium text-caribbean-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {!isPrint && (
            <ExcursionCardCTAs
              portSlug={plan.portSlug}
              excursionType={plan.recommendedExcursions.primary.type}
              text={`${plan.recommendedExcursions.primary.name} ${plan.recommendedExcursions.primary.description}`}
              className="mt-4 print:hidden"
            />
          )}
        </div>
        {plan.recommendedExcursions.alternate && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Alternate pick</p>
            <h4 className="mt-1 font-semibold text-gray-900">{plan.recommendedExcursions.alternate.name}</h4>
            <p className="mt-2 text-sm text-gray-700">{plan.recommendedExcursions.alternate.description}</p>
            <p className="mt-2 text-xs text-gray-500">
              {plan.recommendedExcursions.alternate.duration} · {plan.recommendedExcursions.alternate.type}
            </p>
            {!isPrint && (
              <ExcursionCardCTAs
                portSlug={plan.portSlug}
                excursionType={plan.recommendedExcursions.alternate.type}
                text={`${plan.recommendedExcursions.alternate.name} ${plan.recommendedExcursions.alternate.description}`}
                className="mt-3 print:hidden"
              />
            )}
          </div>
        )}
      </section>

      {/* Cruise Day Itinerary */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-gray-900">Cruise Day Itinerary</h3>
        <p className="mt-1 text-sm text-gray-600">A typical pacing guide for your port day ashore.</p>
        {plan.itinerary.length > 0 ? (
          <ol className="mt-4 space-y-3">
            {plan.itinerary.map((step) => (
              <li key={`${step.time}-${step.activity}`} className="flex gap-3 text-sm text-gray-700">
                <span className="shrink-0 font-semibold text-caribbean-800">{step.time}</span>
                <span>{step.activity}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-sm text-gray-700">
            Disembark promptly, enjoy your recommended excursion, allow time for lunch near port, and return
            with a generous all-aboard buffer.
          </p>
        )}
      </section>

      {/* 2. Port Information */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-gray-900">Port Information</h3>
        <p className="mt-1 text-sm text-gray-600">
          {plan.portInformation.region} · {plan.portInformation.country} · Best for {plan.portInformation.bestFor}
        </p>
        {plan.portInformation.intro && (
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{plan.portInformation.intro}</p>
        )}
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {plan.portInformation.dockTown && (
            <SnapshotItem label="Dock town" value={plan.portInformation.dockTown} />
          )}
          {plan.portInformation.terminals.length > 0 && (
            <SnapshotItem label="Terminals" value={plan.portInformation.terminals.join(" · ")} />
          )}
        </dl>
        {plan.portInformation.tenderNote && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Tender port:</strong> {plan.portInformation.tenderNote}
          </p>
        )}
        <p className="mt-4 text-sm leading-relaxed text-gray-700 line-clamp-4 print:line-clamp-none">
          {plan.portInformation.overview}
        </p>
        {!isPrint && (
          <ExcursionCardCTAs
            portSlug={plan.portSlug}
            excursionType={plan.recommendedExcursions.primary.type}
            text={`${plan.recommendedExcursions.primary.name} ${plan.recommendedExcursions.primary.description}`}
            className="mt-4 print:hidden"
          />
        )}
      </section>

      {/* 3. Cruise Passenger Snapshot */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50 via-white to-tropical-sand/30 p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-gray-900">Cruise Passenger Snapshot</h3>
        <p className="mt-1 text-sm text-gray-600">Six signals to decide how to spend your day ashore.</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SnapshotItem label="Time in Port" value={plan.passengerSnapshot.timeInPort} />
          <SnapshotItem label="Best For" value={plan.passengerSnapshot.bestFor} />
          <SnapshotItem label="Walking Required" value={plan.passengerSnapshot.walkingRequired} />
          <SnapshotItem label="Family Friendly" value={plan.passengerSnapshot.familyFriendly} />
          <SnapshotItem label="Private Tour Friendly" value={plan.passengerSnapshot.privateTourFriendly} />
          <SnapshotItem label="Return to Ship Confidence" value={plan.passengerSnapshot.returnToShipConfidence} />
        </dl>
      </section>

      {/* 4. Related Excursions */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-gray-900">Related Excursions</h3>
        <p className="mt-1 text-sm text-gray-600">Excursion types and best-guide links aligned with your interests.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {plan.relatedExcursions.map((item) => (
            <div key={`${item.label}-${item.guideHref}`} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">{item.label}</h4>
              <p className="mt-2 text-sm text-gray-600">{item.teaser}</p>
              {!isPrint && (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium print:hidden">
                  <Link href={item.excursionTypeHref} className="text-caribbean-800 hover:underline">
                    Excursion type →
                  </Link>
                  <Link href={item.guideHref} className="text-caribbean-700 hover:underline">
                    Best guide →
                  </Link>
                </div>
              )}
              {isPrint && (
                <p className="mt-2 text-xs text-gray-500">
                  {item.excursionTypeHref} · {item.guideHref}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Schedule Information */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-gray-900">Schedule Information</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{plan.scheduleInfo.message}</p>
        {plan.scheduleInfo.hasDateMatch && plan.scheduleInfo.entries.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-2 pr-4">Ship</th>
                  <th className="py-2 pr-4">Line</th>
                  <th className="py-2 pr-4">Arrival</th>
                  <th className="py-2 pr-4">Departure</th>
                  <th className="py-2">Time in port</th>
                </tr>
              </thead>
              <tbody>
                {plan.scheduleInfo.entries.map((entry) => (
                  <tr key={`${entry.date}-${entry.ship}`} className="border-b border-gray-100">
                    <td className="py-2 pr-4">
                      <ShipNameLink name={entry.ship} className="font-medium text-gray-900" />
                    </td>
                    <td className="py-2 pr-4 text-gray-700">{entry.cruiseLine}</td>
                    <td className="py-2 pr-4 text-gray-700">{entry.arrival}</td>
                    <td className="py-2 pr-4 text-gray-700">{entry.departure}</td>
                    <td className="py-2 text-gray-700">{entry.timeInPort ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!isPrint && plan.scheduleInfo.scheduleHref && (
          <>
            <Link href={plan.scheduleInfo.scheduleHref} className="mt-4 inline-block text-sm font-medium text-caribbean-700 hover:underline print:hidden">
              View full {plan.portName} ship schedule →
            </Link>
            {plan.scheduleInfo.scheduleFallbackNote && (
              <p className="mt-2 text-xs text-gray-500 print:hidden">{plan.scheduleInfo.scheduleFallbackNote}</p>
            )}
          </>
        )}
      </section>

      {/* 6. Ships In Port Summary */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-gray-900">Ships In Port Summary</h3>
        {plan.shipsSummary ? (
          <>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${crowdStyles?.badge}`}>
                {plan.shipsSummary.crowdLevel}
              </span>
              <span className="text-sm text-gray-700">
                {plan.shipsSummary.shipCount} ship{plan.shipsSummary.shipCount === 1 ? "" : "s"} · ~
                {plan.shipsSummary.estimatedPassengers.toLocaleString()} passengers
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-700">{plan.shipsSummary.planningNote}</p>
            {plan.shipsSummary.busiestShip && (
              <p className="mt-2 text-sm text-gray-600">
                Largest call: {plan.shipsSummary.busiestShip.name} (~
                {plan.shipsSummary.busiestShip.passengers.toLocaleString()} passengers)
              </p>
            )}
            {plan.shipsInPort.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {plan.shipsInPort.map((ship) => (
                  <li key={ship.ship} className="text-sm text-gray-700">
                    <ShipNameLink name={ship.ship} />
                    <span className="text-gray-600">
                      {" "}
                      · {ship.cruiseLine} · {ship.arrival}–{ship.departure} · {ship.passengers} pax
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="mt-3 text-sm text-gray-700">
            No verified ship schedule for this date yet. Use the activity estimate above and confirm your
            ship&apos;s published all-aboard time before booking independent excursions.
          </p>
        )}
      </section>

      {/* 7. Cruise Confidence */}
      <section className="cruise-day-plan-section break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <CruiseConfidenceCard assessment={plan.returnToShipAdvice.cruiseConfidence} />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {plan.returnToShipAdvice.tenderRequired && (
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">Tender port</span>
          )}
        </div>
        <p className="mt-3 rounded-lg bg-caribbean-50 px-4 py-3 text-sm font-medium text-caribbean-900">
          {plan.returnToShipAdvice.timeBuffer}
        </p>
        {plan.returnToShipAdvice.tenderNote && (
          <p className="mt-3 text-sm text-gray-600">{plan.returnToShipAdvice.tenderNote}</p>
        )}
        {plan.returnToShipAdvice.typicalReturnStep && (
          <p className="mt-3 text-sm text-gray-600">
            <strong>Typical return:</strong> {plan.returnToShipAdvice.typicalReturnStep}
          </p>
        )}
        {plan.returnToShipAdvice.portMistake && (
          <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50/80 p-4">
            <p className="text-sm font-semibold text-rose-900">{plan.returnToShipAdvice.portMistake.mistake}</p>
            <p className="mt-2 text-sm text-rose-800">{plan.returnToShipAdvice.portMistake.better}</p>
          </div>
        )}
      </section>

      {isPrint && (
        <footer className="border-t border-gray-300 pt-4 text-xs text-gray-500">
          Generated by caribbeanshoreexcursion.com · For planning only — confirm times with your cruise line and tour operator.
        </footer>
      )}

      {!isPrint && (
        <>
          <BookingJourneyPanel
            portSlug={plan.portSlug}
            title={`Book ${plan.portName} shore excursions`}
            description="Your day plan is ready — compare recommended excursions with local specialists, open the full port guide, or check ship schedules for your sailing date."
            className="print:hidden"
          />
          <div className="flex justify-center print:hidden">
            <CruiseDayPlanDownloadButton plan={plan} />
          </div>
        </>
      )}
    </article>
  );
}
