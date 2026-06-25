"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  featuredFinderPortSlugs,
  finderCruiseLines,
  finderShips,
  fitnessLevels,
  getFinderPortsGroupedByRegion,
  sailingMonths,
  timeInPortOptions,
  travellerTypes,
  type FitnessLevel,
  type TimeInPort,
  type TravellerTypeId,
} from "@/data/excursion-finder";
import {
  generateExcursionFinderPlan,
  getMatchTierStyles,
  getOverallMatchTier,
  type ExcursionFinderResult,
} from "@/lib/excursion-finder-engine";
import { FinderResultHighlights } from "@/components/FinderResultHighlights";
import { FinderPortPlanCard } from "@/components/FinderPortPlanCard";
import {
  buildCombinedCruisePlannerFromFinderContext,
  buildCruiseDayPlanFromFinderContext,
  getCruiseDayPlanDownloadUrl,
} from "@/lib/cruise-day-plan";
import { resolveItineraryPorts } from "@/lib/finder-itinerary-ports";
import { CombinedCruisePlannerDownloadButton } from "@/components/CombinedCruisePlannerDownloadButton";
import { CruiseDayPlanDownloadButton } from "@/components/CruiseDayPlanDownloadButton";
import { MatchReasonsPanel } from "@/components/MatchReasonsPanel";
import { HeroBackground } from "@/components/HeroBackground";
import { FINDER_INTEREST_ORDER } from "@/data/finder-interest-map";
import { FinderInterestRecommendations } from "@/components/FinderInterestRecommendations";
import { SCHEDULE_YEARS } from "@/lib/schedule-utils";

type FinderVariant = "home" | "page";

interface AlaskaExcursionFinderProps {
  variant?: FinderVariant;
  initialPorts?: string[];
  initialRouteId?: string;
}

function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function AlaskaExcursionFinder({
  variant = "page",
  initialPorts = [],
  initialRouteId,
}: AlaskaExcursionFinderProps) {
  const groupedPorts = useMemo(() => getFinderPortsGroupedByRegion(), []);
  const visiblePortSlugs = useMemo(
    () =>
      variant === "home"
        ? featuredFinderPortSlugs
        : groupedPorts.flatMap((g) => g.ports.map((p) => p.slug)),
    [variant, groupedPorts],
  );

  const interestOptions = useMemo(
    () =>
      FINDER_INTEREST_ORDER.map((id) => travellerTypes.find((type) => type.id === id)).filter(
        (type): type is (typeof travellerTypes)[number] => Boolean(type),
      ),
    [],
  );

  const [cruiseLineSlug, setCruiseLineSlug] = useState("");
  const [shipSlug, setShipSlug] = useState("");
  const [sailingMonth, setSailingMonth] = useState("");
  const [sailingYear, setSailingYear] = useState<number | "">("");
  const [selectedPorts, setSelectedPorts] = useState<string[]>(initialPorts);
  const [selectedTravellers, setSelectedTravellers] = useState<TravellerTypeId[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>("easy");
  const [timeInPort, setTimeInPort] = useState<TimeInPort>("6-8");
  const [result, setResult] = useState<ExcursionFinderResult | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const itineraryPortsKeyRef = useRef<string | null>(null);

  const shipsForLine = useMemo(
    () => (cruiseLineSlug ? finderShips.filter((ship) => ship.cruiseLineSlug === cruiseLineSlug) : finderShips),
    [cruiseLineSlug],
  );

  const applyPorts = useCallback((portSlugs: string[]) => {
    setSelectedPorts(portSlugs);
    setResult(null);
    setHasGenerated(false);
  }, []);

  useEffect(() => {
    if (initialPorts.length > 0) {
      applyPorts(initialPorts);
    }
  }, [initialPorts, applyPorts]);

  useEffect(() => {
    if (!initialRouteId) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("route") === initialRouteId && initialPorts.length > 0) {
      applyPorts(initialPorts);
    }
  }, [initialRouteId, initialPorts, applyPorts]);

  useEffect(() => {
    if (!shipSlug && !cruiseLineSlug) {
      itineraryPortsKeyRef.current = null;
      return;
    }
    const ports = resolveItineraryPorts({
      shipSlug: shipSlug || undefined,
      cruiseLineSlug: cruiseLineSlug || undefined,
      visiblePortSlugs: visiblePortSlugs,
    });
    if (ports.length === 0) return;

    const identityKey = `${cruiseLineSlug}|${shipSlug}`;
    if (itineraryPortsKeyRef.current === identityKey) return;
    itineraryPortsKeyRef.current = identityKey;

    setSelectedPorts(ports);
    setResult(null);
    setHasGenerated(false);
  }, [shipSlug, cruiseLineSlug, visiblePortSlugs]);

  const handleGenerate = () => {
    const plan = generateExcursionFinderPlan({
      portSlugs: selectedPorts,
      travellerTypes: selectedTravellers,
      fitnessLevel,
      timeInPort,
      sailingMonth: sailingMonth || undefined,
      sailingYear: sailingYear === "" ? undefined : sailingYear,
      shipSlug: shipSlug || undefined,
      cruiseLineSlug: cruiseLineSlug || undefined,
    });
    setResult(plan);
    setHasGenerated(true);
    if (plan && variant === "page") {
      document.getElementById("alaska-excursion-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const canGenerate = selectedTravellers.length > 0;

  const combinedPlanner = useMemo(() => {
    if (!result) return null;
    const portSlugs = result.portPlans
      .map((plan) => plan.portSlug)
      .filter((slug) => featuredFinderPortSlugs.includes(slug));
    if (portSlugs.length === 0) return null;

    const cruiseLineName = finderCruiseLines.find((line) => line.slug === cruiseLineSlug)?.name;
    const shipName = finderShips.find((ship) => ship.slug === shipSlug)?.name;

    return buildCombinedCruisePlannerFromFinderContext({
      portSlugs,
      travellerTypes: selectedTravellers,
      fitnessLevel,
      sailingMonth: sailingMonth || undefined,
      sailingYear: sailingYear === "" ? undefined : sailingYear,
      cruiseLineName,
      shipName,
    });
  }, [result, cruiseLineSlug, shipSlug, selectedTravellers, fitnessLevel, sailingMonth, sailingYear]);

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="alaska-excursion-finder-heading"
        className="overflow-hidden rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50 via-tropical-sand/40 to-white p-5 shadow-sm sm:p-6 lg:p-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caribbean-700">
              Smart excursion planner · Version 1.0
            </p>
            <h2
              id="alaska-excursion-finder-heading"
              className="mt-2 font-display text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              Alaska Excursion Finder™
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Start with your interests — whales, bears, glaciers, railways, and more. We recommend the best Alaska
              ports, excursion types, seasons, authority guides, and local specialist sites for your cruise.
            </p>
          </div>
          {variant === "home" && (
            <Link href="/alaska-cruise-excursion-planner" className="btn-secondary shrink-0 text-sm">
              Open full finder
            </Link>
          )}
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-900">What do you want to do in Alaska?</p>
          <p className="text-xs text-gray-500">
            Select one or more interests. We recommend ports, excursion types, seasons, guides, and specialist sites.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {interestOptions.map((traveller) => {
              const active = selectedTravellers.includes(traveller.id);
              return (
                <button
                  key={traveller.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setSelectedTravellers((current) => toggleInList(current, traveller.id))
                  }
                  className={`rounded-xl border p-3 text-left transition-all ${
                    active
                      ? "border-caribbean-600 bg-white shadow-md ring-2 ring-caribbean-200"
                      : "border-caribbean-100 bg-white/80 hover:border-caribbean-300"
                  }`}
                >
                  <span className="text-xl" aria-hidden>
                    {traveller.icon}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{traveller.shortLabel}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{traveller.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Sailing month</span>
            <select
              value={sailingMonth}
              onChange={(event) => setSailingMonth(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            >
              <option value="">Select month (optional)</option>
              {sailingMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Sailing year</span>
            <select
              value={sailingYear}
              onChange={(event) =>
                setSailingYear(event.target.value === "" ? "" : Number(event.target.value))
              }
              className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            >
              <option value="">Select year (optional)</option>
              {SCHEDULE_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Typical time in port</span>
            <select
              value={timeInPort}
              onChange={(event) => setTimeInPort(event.target.value as TimeInPort)}
              className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            >
              {timeInPortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Cruise line</span>
            <select
              value={cruiseLineSlug}
              onChange={(event) => {
                itineraryPortsKeyRef.current = null;
                setCruiseLineSlug(event.target.value);
                setShipSlug("");
                setResult(null);
                setHasGenerated(false);
              }}
              className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            >
              <option value="">Select cruise line (optional)</option>
              {finderCruiseLines.map((line) => (
                <option key={line.slug} value={line.slug}>
                  {line.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Ship</span>
            <select
              value={shipSlug}
              onChange={(event) => setShipSlug(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
            >
              <option value="">Select ship (optional)</option>
              {shipsForLine.map((ship) => (
                <option key={ship.slug} value={ship.slug}>
                  {ship.name}
                </option>
              ))}
            </select>
          </label>

          <div>
            <p className="text-sm font-semibold text-gray-900">Fitness level</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {fitnessLevels.map((level) => {
                const active = fitnessLevel === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFitnessLevel(level.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-caribbean-700 bg-caribbean-700 text-white"
                        : "border-caribbean-200 bg-white text-gray-700 hover:border-caribbean-400"
                    }`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-caribbean-200 bg-white/70 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Ports on your itinerary (optional)</p>
              <p className="text-xs text-gray-500">
                {selectedPorts.length === 0
                  ? "Leave blank and we will recommend the best ports for your interests."
                  : shipSlug || cruiseLineSlug
                    ? "Ports update when you change ship or cruise line. You can still adjust manually."
                    : "Refine which ports appear in your personalised plan."}
              </p>
              {selectedPorts.length > 0 && (
                <p className="mt-1 text-xs font-medium text-caribbean-700" aria-live="polite">
                  {selectedPorts.length} port{selectedPorts.length === 1 ? "" : "s"} selected
                </p>
              )}
            </div>
            {variant === "home" && (
              <Link href="/alaska-cruise-excursion-planner#all-ports" className="text-xs font-medium text-caribbean-700 hover:underline">
                Need every port?
              </Link>
            )}
          </div>

          {variant === "home" ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {groupedPorts
                .flatMap((group) => group.ports)
                .filter((port) => featuredFinderPortSlugs.includes(port.slug))
                .map((port) => {
                  const active = selectedPorts.includes(port.slug);
                  return (
                    <button
                      key={port.slug}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedPorts((current) => toggleInList(current, port.slug))}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? "border-caribbean-700 bg-caribbean-700 text-white"
                          : "border-caribbean-200 bg-white text-gray-700 hover:border-caribbean-400"
                      }`}
                    >
                      {port.name}
                    </button>
                  );
                })}
            </div>
          ) : (
            <div id="all-ports" className="mt-4 space-y-4">
              {groupedPorts.map((group) => (
                <div key={group.region}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-caribbean-600">{group.region}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.ports.map((port) => {
                      const active = selectedPorts.includes(port.slug);
                      return (
                        <button
                          key={port.slug}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedPorts((current) => toggleInList(current, port.slug))}
                          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "border-caribbean-700 bg-caribbean-700 text-white"
                              : "border-caribbean-200 bg-white text-gray-700 hover:border-caribbean-400"
                          }`}
                        >
                          {port.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate My Alaska Excursion Plan
          </button>
          {!canGenerate && (
            <p className="text-sm text-gray-500">Select at least one interest to generate recommendations.</p>
          )}
        </div>
      </section>

      {hasGenerated && !result && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Select at least one interest to generate recommendations.
        </div>
      )}

      {result && (
        <section id="alaska-excursion-results" className="space-y-8">
          <div className="card-editorial overflow-hidden">
            <div className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
              <div className="absolute inset-0">
                <HeroBackground />
              </div>
              <div className="relative">
                <p className="text-sm font-medium text-caribbean-100">
                  Your Alaska cruise match
                </p>
                <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold shadow-sm backdrop-blur-sm ${getMatchTierStyles(result.matchLabel)}`}
                    >
                      {result.matchLabel}
                    </span>
                    <p className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
                      {result.matchScore}
                      <span className="text-2xl font-normal text-caribbean-100">/100</span>
                    </p>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90">
                      {result.summaryLine}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <MatchReasonsPanel
                matchLabel={result.matchLabel}
                reasons={result.overallMatchReasons}
                className="max-w-3xl"
              />
              {result.portsAutoRecommended && (
                <p className="text-sm text-gray-600">
                  Ports were recommended from your interests — add specific itinerary ports above to refine this plan.
                </p>
              )}
              <FinderInterestRecommendations
                insights={result.interestInsights}
                sailingMonth={sailingMonth || undefined}
              />
              <FinderResultHighlights
                bestPort={result.bestPort}
                bestExcursionType={result.bestExcursionType}
                hiddenGem={result.hiddenGem}
              />
            </div>
          </div>

          <div className="card-feature">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="section-eyebrow">Your personalised guide</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-gray-900 sm:text-2xl">
                  One PDF for your whole cruise
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Includes all selected ports, recommended excursions, return-to-ship advice and schedule links in
                  one guide.
                </p>
              </div>
              {combinedPlanner && (
                <CombinedCruisePlannerDownloadButton
                  planner={combinedPlanner}
                  variant="premium"
                  leadMetadata={{
                    cruiseLineSlug: cruiseLineSlug || undefined,
                    cruiseLineName: finderCruiseLines.find((line) => line.slug === cruiseLineSlug)?.name,
                    shipSlug: shipSlug || undefined,
                    shipName: finderShips.find((ship) => ship.slug === shipSlug)?.name,
                    sailingMonth: sailingMonth || undefined,
                    sailingYear: sailingYear === "" ? undefined : sailingYear,
                  }}
                />
              )}
            </div>

            <details className="group mt-6 border-t border-caribbean-200/90 pt-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-gray-700 marker:content-none [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-base font-semibold text-gray-800">Need just one port?</span>
                  <span className="mt-0.5 block text-xs font-normal text-gray-500">
                    Download individual port guides below.
                  </span>
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition group-open:rotate-180"
                  aria-hidden
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.portPlans.map((plan) => {
                  const dayPlanPdf = featuredFinderPortSlugs.includes(plan.portSlug)
                    ? buildCruiseDayPlanFromFinderContext({
                        portSlug: plan.portSlug,
                        travellerTypes: selectedTravellers,
                        fitnessLevel,
                        sailingMonth: sailingMonth || undefined,
                        sailingYear: sailingYear === "" ? undefined : sailingYear,
                      })
                    : null;
                  if (!dayPlanPdf) return null;
                  return (
                    <CruiseDayPlanDownloadButton
                      key={plan.portSlug}
                      plan={dayPlanPdf}
                      wrapperClassName="inline-flex flex-col items-start"
                      className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50/90 px-3 py-2 text-xs font-medium text-gray-600 shadow-none transition hover:border-caribbean-200 hover:bg-white hover:text-caribbean-800"
                      label={`${plan.portName} only`}
                      showPrintFallback={false}
                    />
                  );
                })}
              </div>
            </details>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-gray-900">Port-by-port excursion plans</h3>
              <p className="mt-1 text-sm text-gray-600">
                Detailed picks with return-to-ship confidence for each recommended port.
              </p>
            </div>
            {result.portPlans.map((plan) => {
              const dayPlanPdf = featuredFinderPortSlugs.includes(plan.portSlug)
                ? buildCruiseDayPlanFromFinderContext({
                    portSlug: plan.portSlug,
                    travellerTypes: selectedTravellers,
                    fitnessLevel,
                    sailingMonth: sailingMonth || undefined,
                    sailingYear: sailingYear === "" ? undefined : sailingYear,
                  })
                : null;

              return (
                <FinderPortPlanCard
                  key={plan.portSlug}
                  plan={plan}
                  dayPlanActions={
                    <>
                      {dayPlanPdf ? (
                        <CruiseDayPlanDownloadButton plan={dayPlanPdf} className="btn-secondary text-xs" />
                      ) : (
                        <Link
                          href={getCruiseDayPlanDownloadUrl({ portSlug: plan.portSlug })}
                          className="btn-secondary text-xs"
                        >
                          Download PDF
                        </Link>
                      )}
                    </>
                  }
                />
              );
            })}
          </div>

          <p className="text-sm text-gray-500">
            Rules based recommendations only. Always confirm excursion duration and all aboard times with your operator.
            and cruise line.
          </p>
        </section>
      )}
    </div>
  );
}
