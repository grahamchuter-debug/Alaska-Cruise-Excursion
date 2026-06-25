import Link from "next/link";
import type { PortExcursionPlan } from "@/lib/excursion-finder-engine";
import { getMatchTierStyles } from "@/lib/excursion-finder-engine";
import { getPortBySlug } from "@/data/ports";
import { excursionTypeImageTheme } from "@/lib/port-themes";
import { DestinationHeroBand } from "@/components/DestinationHeroBand";
import { CruiseConfidenceBadge } from "@/components/CruiseConfidenceBadge";
import { CruiseConfidenceCard } from "@/components/CruiseConfidenceCard";
import { CruiseConfidenceLabels } from "@/components/CruiseConfidenceLabels";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { MatchReasonsPanel } from "@/components/MatchReasonsPanel";

interface FinderPortPlanCardProps {
  plan: PortExcursionPlan;
  dayPlanActions?: React.ReactNode;
}

export function FinderPortPlanCard({ plan, dayPlanActions }: FinderPortPlanCardProps) {
  const port = getPortBySlug(plan.portSlug);
  const matchStyles = getMatchTierStyles(plan.portMatchLabel);

  return (
    <article className="card-editorial overflow-hidden">
      <div className="relative">
        <DestinationHeroBand
          imageTheme={port?.imageTheme ?? "beach"}
          imageAlt={port?.imageAlt ?? `${plan.portName} cruise port`}
          title={plan.portName}
          subtitle={plan.bestFor}
          eyebrow={plan.region}
          heightClass="h-40 sm:h-44"
          portSlug={plan.portSlug}
        />
        <div className="absolute right-4 top-4 flex flex-wrap items-center justify-end gap-2 sm:right-5 sm:top-5">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm ${matchStyles}`}>
            {plan.portMatchLabel}
          </span>
          <CruiseConfidenceBadge level={plan.cruiseConfidence.level} />
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-5">
        <div className="border-b border-gray-100/90 p-5 sm:p-7 lg:col-span-3 lg:border-b-0 lg:border-r">
          <DestinationHeroBand
            imageTheme={excursionTypeImageTheme(plan.recommended.type)}
            imageAlt={`${plan.recommended.name} excursion`}
            title={plan.recommended.name}
            subtitle={plan.recommended.type}
            eyebrow="Recommended experience"
            heightClass="h-28 sm:h-32"
            portSlug={plan.portSlug}
          />

          <p className="mt-5 text-xs font-medium text-gray-500">Why we recommend it</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{plan.recommended.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
              {plan.recommended.duration}
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
              {plan.recommended.type}
            </span>
          </div>

          <CruiseConfidenceLabels labels={plan.supportingLabels} className="mt-4" compact />

          <MatchReasonsPanel
            matchLabel={plan.portMatchLabel}
            reasons={plan.matchReasons}
            className="mt-5"
          />

          {plan.alternate && (
            <p className="mt-5 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 text-sm text-gray-700">
              <span className="font-medium text-gray-900">Also consider:</span> {plan.alternate.name}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {plan.bestForTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <ExcursionCardCTAs
            portSlug={plan.portSlug}
            excursionType={plan.recommended.type}
            text={`${plan.recommended.name} ${plan.recommended.description}`}
            className="mt-6"
          />
        </div>

        <div className="space-y-5 bg-gradient-to-b from-gray-50/80 to-white p-5 sm:p-7 lg:col-span-2">
          <CruiseConfidenceCard assessment={plan.cruiseConfidence} showDisclaimer={false} />

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500">Your day ashore</p>
            <ol className="relative mt-4 space-y-4 border-l border-caribbean-200/80 pl-4">
              {plan.dayPlan.map((step) => (
                <li key={step} className="relative text-sm leading-relaxed text-gray-700">
                  <span className="absolute -left-[1.35rem] top-1.5 h-2 w-2 rounded-full bg-caribbean-600 ring-2 ring-white" />
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <p className="text-xs leading-relaxed text-gray-500">
            Independent planning guidance — confirm all-aboard times with your operator.
          </p>

          <div className="flex flex-wrap gap-2">
            <Link href={plan.portGuideHref} className="btn-secondary text-xs">
              Port guide
            </Link>
            {dayPlanActions}
          </div>
        </div>
      </div>
    </article>
  );
}
