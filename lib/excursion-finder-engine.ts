import { getPortBySlug } from "@/data/ports";
import { getShipBySlug } from "@/data/ships";
import { getCruiseLineBySlug } from "@/data/cruise-lines";
import {
  getPortPlanningSnapshot,
  getTypicalCruiseDay,
  getPortPlanningCards,
} from "@/data/port-planning";
import { portExcursionAuthority } from "@/data/port-excursion-authority";
import { topicClusters } from "@/data/topic-clusters";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import {
  evaluateCruiseConfidence,
  getConfidenceStyles,
  parseDurationHours,
  CRUISE_CONFIDENCE_LABELS,
  type CruiseConfidenceAssessment,
  type ReturnConfidence,
} from "@/lib/cruise-confidence";
import { excursionTypeImageTheme } from "@/lib/port-themes";
import type { PortImageTheme } from "@/data/types";
import type {
  FitnessLevel,
  TimeInPort,
  TravellerTypeId,
} from "@/data/excursion-finder";
import {
  buildInterestInsights,
  getRecommendedPortsForInterests,
  type FinderInterestInsight,
} from "@/data/finder-interest-map";

export type { ReturnConfidence, FinderInterestInsight };

export type MatchTier = "Excellent Match" | "Strong Match" | "Good Match" | "Possible Match";

/** Upper bound used internally by scoreExcursion, ranking uses raw values on this scale. */
export const MAX_RAW_EXCURSION_SCORE = 1.2;

export interface FinderExcursionPick {
  name: string;
  description: string;
  duration: string;
  type: string;
  rating?: number;
  matchReason: string;
}

export interface PortExcursionPlan {
  portSlug: string;
  portName: string;
  region: string;
  bestFor: string;
  recommended: FinderExcursionPick;
  alternate?: FinderExcursionPick;
  bestForTags: string[];
  matchReasons: string[];
  returnConfidence: ReturnConfidence;
  returnLabel: string;
  returnMessage: string;
  cruiseConfidence: CruiseConfidenceAssessment;
  supportingLabels: CruiseConfidenceAssessment["supportingLabels"];
  dayPlan: string[];
  portGuideHref: string;
  specialistUrl: string;
  specialistName: string;
  scheduleHref?: string;
  scheduleFallbackNote?: string;
  portMatchScore: number;
  portMatchLabel: MatchTier;
}

export interface FinderBestPortHighlight {
  slug: string;
  name: string;
  excursion: string;
  whyItStandsOut: string;
  cruisePassengerFit: string;
  imageTheme: PortImageTheme;
}

export interface FinderHiddenGemHighlight {
  slug: string;
  name: string;
  excursion: string;
  whyMostMissIt: string;
  whatMakesSpecial: string;
  imageTheme: PortImageTheme;
}

export interface FinderExcursionTypeHighlight {
  type: string;
  whyPassengersLoveIt: string;
  typicalDuration: string;
  bestTravellerType: string;
  imageTheme: PortImageTheme;
}

export interface ExcursionFinderResult {
  matchScore: number;
  matchLabel: MatchTier;
  overallMatchReasons: string[];
  bestPort: FinderBestPortHighlight | null;
  bestExcursionType: FinderExcursionTypeHighlight | null;
  hiddenGem: FinderHiddenGemHighlight | null;
  portPlans: PortExcursionPlan[];
  interestInsights: FinderInterestInsight[];
  summaryLine: string;
  portsAutoRecommended: boolean;
}

export interface ExcursionFinderInput {
  portSlugs: string[];
  travellerTypes: TravellerTypeId[];
  fitnessLevel: FitnessLevel;
  timeInPort: TimeInPort;
  sailingMonth?: string;
  sailingYear?: number;
  shipSlug?: string;
  cruiseLineSlug?: string;
}

const hiddenGemSlugs = new Set([
  "haines",
  "sitka",
  "icy-strait",
  "ward-cove",
  "whittier",
  "seward",
]);

const travellerTypeLabels: Record<TravellerTypeId, string> = {
  whales: "Whale watchers",
  bears: "Bear viewers",
  glaciers: "Glacier explorers",
  eagles: "Eagle watchers",
  "dog-sledding": "Dog sledding fans",
  railways: "Railway fans",
  kayaking: "Kayakers",
  "native-culture": "Culture seekers",
  photography: "Photographers",
  fishing: "Anglers",
  flightseeing: "Flightseeing passengers",
  "scenic-cruising": "Scenic cruise fans",
  "first-time": "First-time cruisers",
};

const excursionTypeKeywords: Record<TravellerTypeId, string[]> = {
  whales: ["whale", "humpback", "marine"],
  bears: ["bear", "salmon", "sanctuary"],
  glaciers: ["glacier", "fjord", "icefield", "flightsee"],
  eagles: ["eagle", "raptor", "bird"],
  "dog-sledding": ["dog", "sled", "husky"],
  railways: ["rail", "train", "white pass"],
  kayaking: ["kayak", "paddle"],
  "native-culture": ["totem", "heritage", "culture", "native"],
  photography: ["photo", "scenic", "landscape"],
  fishing: ["fish", "salmon", "halibut"],
  flightseeing: ["helicopter", "floatplane", "flightsee", "misty fjords"],
  "scenic-cruising": ["fjord", "kenai", "sound", "wildlife cruise", "marine"],
  "first-time": [],
};

const fitnessPenalties: Record<FitnessLevel, Record<string, number>> = {
  easy: { active: -0.35, moderate: -0.1, easy: 0.2 },
  moderate: { active: -0.15, moderate: 0.15, easy: 0.05 },
  active: { active: 0.25, moderate: 0.1, easy: -0.1 },
};

function parseDurationHoursFromText(duration: string): number {
  return parseDurationHours(duration);
}

function inferActivityLevel(type: string, duration: string): "easy" | "moderate" | "active" {
  const lower = `${type} ${duration}`.toLowerCase();
  if (/helicopter|hike|zip|kayak|atv|climb|summit/.test(lower)) return "active";
  if (/bear|whale|kayak|rail|culture|boat|fjord/.test(lower)) return "moderate";
  return "easy";
}

function timeBudgetHours(timeInPort: TimeInPort): number {
  switch (timeInPort) {
    case "under-4":
      return 3.5;
    case "4-6":
      return 5;
    case "6-8":
      return 7;
    case "8-plus":
      return 9;
  }
}

function scoreExcursion(
  excursion: { name: string; description: string; duration: string; type: string; rating?: number },
  travellerTypes: TravellerTypeId[],
  fitnessLevel: FitnessLevel,
  timeInPort: TimeInPort,
): number {
  let score = excursion.rating ? excursion.rating / 5 : 0.75;
  const haystack = `${excursion.name} ${excursion.description} ${excursion.type}`.toLowerCase();

  for (const traveller of travellerTypes) {
    if (traveller === "first-time") {
      score += 0.08;
      continue;
    }
    const keywords = excursionTypeKeywords[traveller];
    if (keywords.some((keyword) => haystack.includes(keyword))) {
      score += 0.18;
    }
  }

  const activity = inferActivityLevel(excursion.type, excursion.duration);
  score += fitnessPenalties[fitnessLevel][activity];

  const hoursNeeded = parseDurationHoursFromText(excursion.duration);
  const budget = timeBudgetHours(timeInPort);
  if (hoursNeeded > budget - 1.5) score -= 0.35;
  else if (hoursNeeded <= budget - 2) score += 0.1;

  return Math.max(0, Math.min(MAX_RAW_EXCURSION_SCORE, score));
}

export function normalizeExcursionScore(rawScore: number): number {
  return Math.min(
    100,
    Math.max(0, Math.round((rawScore / MAX_RAW_EXCURSION_SCORE) * 100)),
  );
}

export function getMatchTier(normalizedScore: number): MatchTier {
  if (normalizedScore >= 85) return "Excellent Match";
  if (normalizedScore >= 70) return "Strong Match";
  if (normalizedScore >= 55) return "Good Match";
  return "Possible Match";
}

export function getOverallMatchTier(matchScore: number): MatchTier {
  return getMatchTier(matchScore);
}

function getAuthorityExcursion(portSlug: string) {
  return portExcursionAuthority.portTable.find((row) => row.portSlug === portSlug);
}

function getTravellerClusterPick(portSlug: string, travellerTypes: TravellerTypeId[]) {
  const typeMap: Partial<Record<TravellerTypeId, string>> = {
    whales: "Whale watchers",
    bears: "Bear viewers",
    glaciers: "Glacier explorers",
    eagles: "Wildlife lovers",
    "dog-sledding": "Active travellers",
    railways: "Railway fans",
    kayaking: "Active travellers",
    "native-culture": "Culture seekers",
    photography: "Photographers",
    fishing: "Anglers",
    flightseeing: "Flightseeing fans",
    "scenic-cruising": "Scenic cruisers",
    "first-time": "First-time cruisers",
  };

  for (const traveller of travellerTypes) {
    const label = typeMap[traveller];
    if (!label) continue;
    for (const cluster of topicClusters) {
      const pick = cluster.travellerPicks.find(
        (p) => p.portSlug === portSlug && p.travellerType === label,
      );
      if (pick) return pick;
    }
  }
  return null;
}

function buildExcursionPick(
  portSlug: string,
  travellerTypes: TravellerTypeId[],
  fitnessLevel: FitnessLevel,
  timeInPort: TimeInPort,
  shipSlug?: string,
): { primary: FinderExcursionPick; alternate?: FinderExcursionPick; score: number } {
  const port = getPortBySlug(portSlug);
  if (!port) {
    return {
      primary: {
        name: "Port guide review",
        description: "Open the authority port guide for excursion options.",
        duration: "Varies",
        type: "Planning",
        matchReason: "Port data unavailable",
      },
      score: 0,
    };
  }

  const clusterPick = getTravellerClusterPick(portSlug, travellerTypes);
  const scored = port.bestExcursions
    .map((excursion) => ({
      excursion,
      score: scoreExcursion(excursion, travellerTypes, fitnessLevel, timeInPort),
    }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  const alternate = scored[1];

  let primary: FinderExcursionPick;
  if (clusterPick && best && best.score < 0.85) {
    primary = {
      name: clusterPick.excursionName,
      description: clusterPick.description,
      duration: best?.excursion.duration ?? "4-5 hours",
      type: best?.excursion.type ?? "Curated pick",
      rating: best?.excursion.rating,
      matchReason: `Matched to ${clusterPick.travellerType.toLowerCase()} style`,
    };
  } else if (best) {
    const authority = getAuthorityExcursion(portSlug);
    primary = {
      name: best.excursion.name,
      description: best.excursion.description,
      duration: best.excursion.duration,
      type: best.excursion.type,
      rating: best.excursion.rating,
      matchReason: authority
        ? authority.whyRecommended.slice(0, 120) + (authority.whyRecommended.length > 120 ? "…" : "")
        : `Top-rated ${best.excursion.type.toLowerCase()} fit for your cruise day`,
    };
  } else {
    const authority = getAuthorityExcursion(portSlug);
    primary = {
      name: authority?.bestExcursion ?? `${port.name} highlight tour`,
      description: authority?.whyRecommended ?? port.tagline,
      duration: authority?.duration ?? "4-5 hours",
      type: authority?.bestFor ?? port.bestFor,
      matchReason: "Signature port excursion",
    };
  }

  const altPick = alternate
    ? {
        name: alternate.excursion.name,
        description: alternate.excursion.description,
        duration: alternate.excursion.duration,
        type: alternate.excursion.type,
        rating: alternate.excursion.rating,
        matchReason: `Strong alternate ${alternate.excursion.type.toLowerCase()} option`,
      }
    : undefined;

  let score = best?.score ?? 0.6;
  const ship = shipSlug ? getShipBySlug(shipSlug) : undefined;
  if (ship) {
    const shipRec = ship.recommendedExcursions.find((rec) => rec.portSlug === portSlug);
    if (shipRec) {
      score += 0.12;
      if (primary.name !== shipRec.name) {
        primary = {
          name: shipRec.name,
          description: shipRec.description,
          duration: primary.duration,
          type: primary.type,
          rating: primary.rating,
          matchReason: `Recommended for ${ship.name} passengers`,
        };
      } else {
        primary = {
          ...primary,
          matchReason: `Recommended for ${ship.name} passengers`,
        };
      }
    }
    const portRank = ship.commonPortSlugs.indexOf(portSlug);
    if (portRank >= 0) {
      score += Math.max(0.04, 0.14 - portRank * 0.025);
    }
  }

  return { primary, alternate: altPick, score };
}

function getReturnConfidence(
  portSlug: string,
  excursionDuration: string,
  timeInPort: TimeInPort,
  excursionType?: string,
  bestFor?: string,
): CruiseConfidenceAssessment {
  return evaluateCruiseConfidence({
    portSlug,
    duration: excursionDuration,
    excursionType,
    bestFor,
    timeInPort,
  });
}

function buildBestForTags(
  portSlug: string,
  travellerTypes: TravellerTypeId[],
  excursionType: string,
): string[] {
  const tags = new Set<string>();
  for (const traveller of travellerTypes) {
    tags.add(travellerTypeLabels[traveller]);
  }
  const cards = getPortPlanningCards(portSlug);
  for (const card of cards) {
    if (
      (travellerTypes.includes("whales") && card.label === "Whales") ||
      (travellerTypes.includes("glaciers") && card.label === "Glaciers") ||
      (travellerTypes.includes("bears") && card.label === "Bears") ||
      (travellerTypes.includes("railways") && card.label === "Railways") ||
      (travellerTypes.includes("native-culture") && card.label === "Culture") ||
      (travellerTypes.includes("flightseeing") && card.label === "Flightseeing") ||
      (travellerTypes.includes("scenic-cruising") && card.label === "Wildlife")
    ) {
      tags.add(card.label);
    }
  }
  tags.add(excursionType);
  return [...tags].slice(0, 4);
}

function buildDayPlan(portSlug: string, excursionName: string): string[] {
  const typical = getTypicalCruiseDay(portSlug);
  if (typical.length > 0) {
    return typical.map((step) => `${step.time}: ${step.activity}`);
  }
  return [
    "Disembark promptly and meet your excursion at the pier or approved pickup point",
    `Morning or early afternoon: ${excursionName}`,
    "Allow time for lunch near the port if your schedule permits",
    "Return to the gangway with at least 45 to 60 minutes before all-aboard",
  ];
}

function isLowWalking(snapshot: ReturnType<typeof getPortPlanningSnapshot>): boolean {
  if (!snapshot?.walkingRequired) return false;
  const value = snapshot.walkingRequired.toLowerCase();
  return value.includes("low") || value.includes("minimal");
}

function isFamilyFriendly(snapshot: ReturnType<typeof getPortPlanningSnapshot>): boolean {
  if (!snapshot?.familyFriendly) return false;
  const value = snapshot.familyFriendly.toLowerCase();
  return value.includes("excellent") || value.includes("very good");
}

export function buildMatchReasons(options: {
  portSlug: string;
  travellerTypes: TravellerTypeId[];
  fitnessLevel: FitnessLevel;
  timeInPort: TimeInPort;
  excursion: FinderExcursionPick;
  returnConfidence: ReturnConfidence;
  rawScore: number;
  shipSlug?: string;
  cruiseLineSlug?: string;
}): string[] {
  const {
    portSlug,
    travellerTypes,
    fitnessLevel,
    timeInPort,
    excursion,
    returnConfidence,
    rawScore,
    shipSlug,
    cruiseLineSlug,
  } = options;
  const port = getPortBySlug(portSlug);
  const snapshot = getPortPlanningSnapshot(portSlug);
  const haystack = `${excursion.name} ${excursion.description} ${excursion.type}`.toLowerCase();
  const reasons: string[] = [];
  const seen = new Set<string>();

  const add = (reason: string) => {
    if (seen.has(reason) || reasons.length >= 4) return;
    seen.add(reason);
    reasons.push(reason);
  };

  if (shipSlug) {
    const ship = getShipBySlug(shipSlug);
    if (ship?.commonPortSlugs.includes(portSlug)) {
      add(`Typical ${ship.name} Alaska port stop`);
    }
  } else if (cruiseLineSlug) {
    const line = getCruiseLineBySlug(cruiseLineSlug);
    if (line?.popularPorts.some((entry) => entry.slug === portSlug)) {
      add(`Common ${line.name} Alaska itinerary port`);
    }
  }

  for (const traveller of travellerTypes) {
    if (traveller === "first-time") {
      add(
        isFamilyFriendly(snapshot) || /whale|glacier|rail|bear/.test(haystack)
          ? "Iconic Alaska highlights with straightforward port logistics"
          : "Suitable for first-time cruisers with straightforward port logistics",
      );
      break;
    }
  }

  for (const traveller of travellerTypes) {
    const keywords = excursionTypeKeywords[traveller];
    if (keywords.length > 0 && keywords.some((keyword) => haystack.includes(keyword))) {
      add(`Aligned with your ${travellerTypeLabels[traveller].toLowerCase()} preferences`);
      break;
    }
  }

  if (isLowWalking(snapshot) && !port?.portInfo.tenderRequired) {
    add("Short transfer times from the cruise terminal");
  } else if (port && !port.portInfo.tenderRequired) {
    add("Direct pier access keeps your port day simple");
  }

  if (returnConfidence === "high") {
    add("Good return-to-ship confidence for this excursion length");
  } else if (returnConfidence === "moderate") {
    add("Works with a standard return buffer if timings are confirmed");
  }

  const hoursNeeded = parseDurationHoursFromText(excursion.duration);
  const budget = timeBudgetHours(timeInPort);
  if (hoursNeeded <= budget - 2) {
    add("Fits comfortably within your time ashore");
  }

  const activity = inferActivityLevel(excursion.type, excursion.duration);
  if (fitnessLevel === activity) {
    add(`Matches your ${fitnessLevel} activity level`);
  } else if (fitnessLevel === "easy" && activity === "moderate") {
    add("Moderate activity with operator support for mixed fitness groups");
  }

  if (rawScore >= 0.9) {
    add("Top-scoring excursion for your selected traveller style");
  }

  if (snapshot?.privateTourFriendly && travellerTypes.includes("photography")) {
    add("Strong small-group and photography-friendly tour options");
  }

  if (reasons.length < 3 && port?.bestFor) {
    add(`Strong fit for ${port.bestFor.toLowerCase()} port days`);
  }

  return reasons.slice(0, 4);
}

function buildPassengerFitLine(plan: PortExcursionPlan): string {
  if (plan.supportingLabels.length > 0) {
    return plan.supportingLabels
      .slice(0, 2)
      .map((id) => CRUISE_CONFIDENCE_LABELS[id].label)
      .join(" · ");
  }
  return `${plan.cruiseConfidence.title} — ${plan.bestFor}`;
}

function buildBestPortHighlight(plan: PortExcursionPlan): FinderBestPortHighlight {
  const port = getPortBySlug(plan.portSlug);
  return {
    slug: plan.portSlug,
    name: plan.portName,
    excursion: plan.recommended.name,
    whyItStandsOut: port?.tagline ?? plan.bestFor,
    cruisePassengerFit: buildPassengerFitLine(plan),
    imageTheme: port?.imageTheme ?? "wildlife",
  };
}

function buildHiddenGemHighlight(plan: PortExcursionPlan): FinderHiddenGemHighlight {
  const port = getPortBySlug(plan.portSlug);
  return {
    slug: plan.portSlug,
    name: plan.portName,
    excursion: plan.recommended.name,
    whyMostMissIt: `Often overshadowed by headline Inside Passage hubs — ${plan.portName} rewards passengers who look beyond the obvious port-day picks.`,
    whatMakesSpecial:
      plan.recommended.description.length > 40
        ? plan.recommended.description
        : (port?.overview.split(". ")[0] ?? plan.bestFor) + ".",
    imageTheme: port?.imageTheme ?? "viewpoint",
  };
}

function buildExcursionTypeHighlight(
  type: string,
  portPlans: PortExcursionPlan[],
  travellerTypes: TravellerTypeId[],
): FinderExcursionTypeHighlight {
  const matching = portPlans.filter((plan) => plan.recommended.type === type);
  const travellerLabel =
    travellerTypes.map((id) => travellerTypeLabels[id]).slice(0, 2).join(" & ") || "Cruise passengers";

  return {
    type,
    whyPassengersLoveIt: `The most repeated experience style across your itinerary — ideal for passengers who want a consistent ${type.toLowerCase()} rhythm from port to port.`,
    typicalDuration: matching[0]?.recommended.duration ?? "4–5 hours",
    bestTravellerType: travellerLabel,
    imageTheme: excursionTypeImageTheme(type),
  };
}

function buildOverallMatchReasons(
  input: ExcursionFinderInput,
  portPlans: PortExcursionPlan[],
  matchScore: number,
): string[] {
  const bestPlan = portPlans[0];
  if (!bestPlan) return [];

  const reasons = [...bestPlan.matchReasons];
  const seen = new Set(reasons);

  for (const traveller of input.travellerTypes.slice(0, 2)) {
    const line = `Personalised for ${travellerTypeLabels[traveller].toLowerCase()}`;
    if (!seen.has(line) && reasons.length < 4) {
      seen.add(line);
      reasons.push(line);
    }
  }

  if (input.portSlugs.length > 1 && reasons.length < 4) {
    reasons.push(`Compared across ${input.portSlugs.length} ports on your itinerary`);
  }

  if (matchScore >= 85 && reasons.length < 4) {
    reasons.push("High overall Alaska Cruise Match across your selections");
  }

  return reasons.slice(0, 4);
}

export function generateExcursionFinderPlan(input: ExcursionFinderInput): ExcursionFinderResult | null {
  if (input.travellerTypes.length === 0) {
    return null;
  }

  const portsAutoRecommended = input.portSlugs.length === 0;
  const resolvedPorts =
    input.portSlugs.length > 0
      ? [...new Set(input.portSlugs)]
      : getRecommendedPortsForInterests(input.travellerTypes, 6);

  const uniquePorts = resolvedPorts.filter((slug) => getPortBySlug(slug));
  if (uniquePorts.length === 0) {
    return null;
  }

  const interestInsights = buildInterestInsights(input.travellerTypes, input.sailingMonth);

  const ship = input.shipSlug ? getShipBySlug(input.shipSlug) : undefined;
  const itineraryOrder = ship?.commonPortSlugs ?? [];

  const portPlans = uniquePorts
    .map((portSlug) => {
      const port = getPortBySlug(portSlug)!;
      const pick = buildExcursionPick(
        portSlug,
        input.travellerTypes,
        input.fitnessLevel,
        input.timeInPort,
        input.shipSlug,
      );
      const returnInfo = getReturnConfidence(
        portSlug,
        pick.primary.duration,
        input.timeInPort,
        pick.primary.type,
        port.bestFor,
      );
      const normalizedScore = normalizeExcursionScore(pick.score);
      const scheduleCta = getBestScheduleUrl({
        portSlug,
        month: input.sailingMonth,
        year: input.sailingYear,
      });

      return {
        portSlug,
        portName: port.name,
        region: port.region,
        bestFor: port.bestFor,
        recommended: pick.primary,
        alternate: pick.alternate,
        bestForTags: buildBestForTags(portSlug, input.travellerTypes, pick.primary.type),
        matchReasons: buildMatchReasons({
          portSlug,
          travellerTypes: input.travellerTypes,
          fitnessLevel: input.fitnessLevel,
          timeInPort: input.timeInPort,
          excursion: pick.primary,
          returnConfidence: returnInfo.legacyLevel,
          rawScore: pick.score,
          shipSlug: input.shipSlug,
          cruiseLineSlug: input.cruiseLineSlug,
        }),
        returnConfidence: returnInfo.legacyLevel,
        returnLabel: returnInfo.headline,
        returnMessage: returnInfo.guidance,
        cruiseConfidence: returnInfo,
        supportingLabels: returnInfo.supportingLabels,
        dayPlan: buildDayPlan(portSlug, pick.primary.name),
        portGuideHref: `/ports/${portSlug}`,
        specialistUrl: port.specialistUrl,
        specialistName: port.specialistName,
        scheduleHref: scheduleCta?.href,
        scheduleFallbackNote: scheduleCta?.fallbackNote,
        rawScore: pick.score,
        itineraryRank: itineraryOrder.indexOf(portSlug),
        portMatchScore: normalizedScore,
        portMatchLabel: getMatchTier(normalizedScore),
      };
    })
    .sort((a, b) => {
      if (itineraryOrder.length > 0) {
        const aRank = a.itineraryRank >= 0 ? a.itineraryRank : 999;
        const bRank = b.itineraryRank >= 0 ? b.itineraryRank : 999;
        if (aRank !== bRank) return aRank - bRank;
      }
      return b.rawScore - a.rawScore;
    })
    .map(({ rawScore: _rawScore, itineraryRank: _itineraryRank, ...plan }) => plan);

  const avgPortScore =
    portPlans.reduce((sum, plan) => sum + plan.portMatchScore, 0) / portPlans.length;
  const travellerBonus = Math.min(12, input.travellerTypes.length * 3);
  const cautionPenalty = portPlans.filter((p) => p.returnConfidence === "caution").length * 8;
  const moderatePenalty = portPlans.filter((p) => p.returnConfidence === "moderate").length * 3;
  const matchScore = Math.max(
    35,
    Math.min(98, Math.round(avgPortScore * 0.75 + travellerBonus + 18 - cautionPenalty - moderatePenalty)),
  );

  const best = portPlans[0];
  const hiddenGemPlan =
    portPlans.find((plan) => hiddenGemSlugs.has(plan.portSlug) && plan.portMatchScore >= 65) ??
    portPlans.find((plan) => hiddenGemSlugs.has(plan.portSlug));

  const excursionTypeCounts = new Map<string, number>();
  for (const plan of portPlans) {
    excursionTypeCounts.set(plan.recommended.type, (excursionTypeCounts.get(plan.recommended.type) ?? 0) + 1);
  }
  const bestExcursionTypeEntry = [...excursionTypeCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  const travellerSummary = input.travellerTypes
    .map((id) => travellerTypeLabels[id])
    .slice(0, 3)
    .join(", ");

  const activitySummary = portsAutoRecommended
    ? `Activity-led plan for ${travellerSummary} across ${uniquePorts.map((slug) => getPortBySlug(slug)?.name ?? slug).join(", ")}.`
    : `${matchScore}/100 Alaska Cruise Match for ${uniquePorts.length} port${uniquePorts.length === 1 ? "" : "s"}, optimised for ${travellerSummary}.`;

  return {
    matchScore,
    matchLabel: getOverallMatchTier(matchScore),
    overallMatchReasons: buildOverallMatchReasons(input, portPlans, matchScore),
    bestPort: best ? buildBestPortHighlight(best) : null,
    bestExcursionType: bestExcursionTypeEntry
      ? buildExcursionTypeHighlight(bestExcursionTypeEntry[0], portPlans, input.travellerTypes)
      : null,
    hiddenGem: hiddenGemPlan ? buildHiddenGemHighlight(hiddenGemPlan) : null,
    portPlans,
    interestInsights,
    portsAutoRecommended,
    summaryLine: activitySummary,
  };
}

export { getConfidenceStyles };

export function getMatchTierStyles(tier: MatchTier) {
  switch (tier) {
    case "Excellent Match":
      return "bg-caribbean-700 text-white";
    case "Strong Match":
      return "bg-caribbean-100 text-caribbean-800 border border-caribbean-200";
    case "Good Match":
      return "bg-sky-100 text-sky-800 border border-sky-200";
    case "Possible Match":
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
}
