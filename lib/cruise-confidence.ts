import { getPortBySlug } from "@/data/ports";
import { getPortPlanningSnapshot } from "@/data/port-planning";
import type { ExcursionItem, PortExcursionAuthorityRow } from "@/data/types";
import type { TimeInPort } from "@/data/excursion-finder";

/** Internal scale used by legacy consumers (finder engine, day plan). */
export type ReturnConfidence = "high" | "moderate" | "caution";

export type CruiseConfidenceLevel = "high" | "medium" | "plan-carefully";

export type CruiseConfidenceLabelId =
  | "cruise-passenger-friendly"
  | "good-return-buffer"
  | "first-time-cruisers"
  | "short-transfer-times"
  | "independent-exploration-friendly";

export interface CruiseConfidenceInput {
  portSlug: string;
  duration?: string;
  activityLevel?: string;
  excursionType?: string;
  bestFor?: string;
  timeInPort?: TimeInPort;
}

export interface CruiseConfidenceAssessment {
  level: CruiseConfidenceLevel;
  /** Display title, e.g. HIGH CONFIDENCE */
  title: string;
  /** Short badge label */
  headline: string;
  /** Compliant planning guidance — never a guarantee */
  guidance: string;
  supportingLabels: CruiseConfidenceLabelId[];
  legacyLevel: ReturnConfidence;
  factors: {
    durationFit: "strong" | "moderate" | "tight";
    transferEase: "short" | "moderate" | "long";
    returnBuffer: "generous" | "standard" | "limited";
    passengerFit: "excellent" | "good" | "selective";
  };
}

export const CRUISE_CONFIDENCE_DISCLAIMER =
  "Planning guidance only — confirm all-aboard times with your cruise line and excursion operator. Ships depart on schedule.";

export const CRUISE_CONFIDENCE_LABELS: Record<
  CruiseConfidenceLabelId,
  { label: string; description: string }
> = {
  "cruise-passenger-friendly": {
    label: "Cruise Passenger Friendly",
    description: "Typical port logistics suit organised shore excursions and cruise-day pacing.",
  },
  "good-return-buffer": {
    label: "Good Return Buffer",
    description: "Duration and transfer patterns usually leave comfortable time before all-aboard.",
  },
  "first-time-cruisers": {
    label: "Suitable For First-Time Cruisers",
    description: "Straightforward logistics and moderate activity make this a sensible first port day.",
  },
  "short-transfer-times": {
    label: "Short Transfer Times",
    description: "Excursion pickup or main sights are typically close to the cruise terminal.",
  },
  "independent-exploration-friendly": {
    label: "Independent Exploration Friendly",
    description: "Walking distance and pier access support self-guided time ashore with planning.",
  },
};

const CONFIDENCE_TITLES: Record<CruiseConfidenceLevel, string> = {
  high: "High Confidence",
  medium: "Medium Confidence",
  "plan-carefully": "Plan Carefully",
};

export function parseDurationHours(duration: string): number {
  const range = duration.match(/(\d+)\s*-\s*(\d+)/);
  if (range) return (Number(range[1]) + Number(range[2])) / 2;
  const single = duration.match(/(\d+)/);
  return single ? Number(single[1]) : 4;
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

function parseTypicalPortHours(snapshot: ReturnType<typeof getPortPlanningSnapshot>): number {
  if (!snapshot?.timeInPort) return 7;
  const range = snapshot.timeInPort.match(/(\d+)\s*-\s*(\d+)/);
  if (range) return (Number(range[1]) + Number(range[2])) / 2;
  const single = snapshot.timeInPort.match(/(\d+)/);
  return single ? Number(single[1]) : 7;
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

function isPrivateTourFriendly(snapshot: ReturnType<typeof getPortPlanningSnapshot>): boolean {
  if (!snapshot?.privateTourFriendly) return false;
  const value = snapshot.privateTourFriendly.toLowerCase();
  return value.includes("excellent") || value.includes("very good");
}

function inferActivityLevel(activityLevel?: string, excursionType?: string, duration?: string): string {
  const haystack = `${activityLevel ?? ""} ${excursionType ?? ""} ${duration ?? ""}`.toLowerCase();
  if (/active|strenuous|hike|zip|atv|falls/.test(haystack)) return "active";
  if (/moderate|snorkel|reef|boat|culture/.test(haystack)) return "moderate";
  return "easy";
}

function snapshotConfidenceBias(snapshot: ReturnType<typeof getPortPlanningSnapshot>): number {
  if (!snapshot?.returnToShipConfidence) return 0;
  const value = snapshot.returnToShipConfidence.toLowerCase();
  if (value.includes("moderate") || value.includes("tender")) return -1;
  if (value.includes("high")) return 1;
  return 0;
}

function buildSupportingLabels(options: {
  tenderRequired: boolean;
  durationFit: CruiseConfidenceAssessment["factors"]["durationFit"];
  transferEase: CruiseConfidenceAssessment["factors"]["transferEase"];
  returnBuffer: CruiseConfidenceAssessment["factors"]["returnBuffer"];
  passengerFit: CruiseConfidenceAssessment["factors"]["passengerFit"];
  activity: string;
  bestFor?: string;
  snapshot: ReturnType<typeof getPortPlanningSnapshot>;
}): CruiseConfidenceLabelId[] {
  const labels: CruiseConfidenceLabelId[] = [];
  const {
    tenderRequired,
    durationFit,
    transferEase,
    returnBuffer,
    passengerFit,
    activity,
    bestFor,
    snapshot,
  } = options;

  if (
    passengerFit !== "selective" &&
    activity === "easy" &&
    (isFamilyFriendly(snapshot) || !tenderRequired)
  ) {
    labels.push("cruise-passenger-friendly");
  }

  if (returnBuffer === "generous" || (returnBuffer === "standard" && durationFit === "strong")) {
    labels.push("good-return-buffer");
  }

  if (
    activity === "easy" &&
    isLowWalking(snapshot) &&
    (bestFor?.toLowerCase().includes("first") ||
      passengerFit === "excellent" ||
      snapshot?.bestFor?.toLowerCase().includes("first"))
  ) {
    labels.push("first-time-cruisers");
  }

  if (transferEase === "short" || isLowWalking(snapshot)) {
    labels.push("short-transfer-times");
  }

  if (
    !tenderRequired &&
    (isLowWalking(snapshot) || isPrivateTourFriendly(snapshot)) &&
    transferEase !== "long"
  ) {
    labels.push("independent-exploration-friendly");
  }

  return labels.slice(0, 4);
}

export function evaluateCruiseConfidence(input: CruiseConfidenceInput): CruiseConfidenceAssessment {
  const port = getPortBySlug(input.portSlug);
  const snapshot = getPortPlanningSnapshot(input.portSlug);
  const tenderRequired = port?.portInfo.tenderRequired ?? false;
  const duration = input.duration ?? "4-5 hours";
  const hoursNeeded = parseDurationHours(duration);
  const timeInPort = input.timeInPort ?? "6-8";
  const budget = timeBudgetHours(timeInPort);
  const typicalHours = parseTypicalPortHours(snapshot);
  const activity = inferActivityLevel(input.activityLevel, input.excursionType, duration);

  let durationFit: CruiseConfidenceAssessment["factors"]["durationFit"] = "strong";
  if (hoursNeeded > budget - 1.25 || hoursNeeded > typicalHours - 2.5) {
    durationFit = "tight";
  } else if (hoursNeeded > budget - 2 || hoursNeeded > typicalHours - 3.5) {
    durationFit = "moderate";
  }

  let transferEase: CruiseConfidenceAssessment["factors"]["transferEase"] = "moderate";
  if (isLowWalking(snapshot) || /beach|town|downtown|pier|terminal/.test(`${input.excursionType ?? ""}`.toLowerCase())) {
    transferEase = "short";
  } else if (activity === "active" || hoursNeeded >= 6) {
    transferEase = "long";
  }

  let returnBuffer: CruiseConfidenceAssessment["factors"]["returnBuffer"] = "standard";
  if (tenderRequired || durationFit === "tight" || timeInPort === "under-4") {
    returnBuffer = "limited";
  } else if (durationFit === "strong" && !tenderRequired && hoursNeeded <= budget - 2.5) {
    returnBuffer = "generous";
  }

  let passengerFit: CruiseConfidenceAssessment["factors"]["passengerFit"] = "good";
  if (activity === "easy" && (isFamilyFriendly(snapshot) || isLowWalking(snapshot))) {
    passengerFit = "excellent";
  } else if (activity === "active" || tenderRequired) {
    passengerFit = "selective";
  }

  let score = 0;
  if (durationFit === "strong") score += 2;
  else if (durationFit === "moderate") score += 1;
  else score -= 2;

  if (transferEase === "short") score += 1;
  else if (transferEase === "long") score -= 1;

  if (returnBuffer === "generous") score += 2;
  else if (returnBuffer === "standard") score += 1;
  else score -= 2;

  if (passengerFit === "excellent") score += 1;
  else if (passengerFit === "selective") score -= 1;

  score += snapshotConfidenceBias(snapshot);

  let level: CruiseConfidenceLevel;
  let legacyLevel: ReturnConfidence;
  let guidance: string;

  if (score <= -1 || (tenderRequired && durationFit === "tight")) {
    level = "plan-carefully";
    legacyLevel = "caution";
    guidance = tenderRequired
      ? "Tender ports need early departure and a generous return buffer. Confirm pier pickup and all-aboard with your operator — planning ahead reduces stress."
      : "This excursion can work on a cruise day, but timings are tighter. Confirm duration, transfers, and your ship's all-aboard time before booking.";
  } else if (score <= 2 || durationFit === "moderate" || returnBuffer === "limited") {
    level = "medium";
    legacyLevel = "moderate";
    guidance =
      "Typical cruise-day patterns support this choice with standard planning. Confirm excursion end time and allow buffer before all-aboard.";
  } else {
    level = "high";
    legacyLevel = "high";
    guidance =
      "Port timing, transfer patterns, and excursion length align well for cruise passengers who plan a standard return buffer before all-aboard.";
  }

  const title = CONFIDENCE_TITLES[level];
  const supportingLabels = buildSupportingLabels({
    tenderRequired,
    durationFit,
    transferEase,
    returnBuffer,
    passengerFit,
    activity,
    bestFor: input.bestFor,
    snapshot,
  });

  return {
    level,
    title,
    headline: title,
    guidance,
    supportingLabels,
    legacyLevel,
    factors: { durationFit, transferEase, returnBuffer, passengerFit },
  };
}

export function evaluatePortConfidence(portSlug: string): CruiseConfidenceAssessment {
  const authority = getPortBySlug(portSlug);
  const snapshot = getPortPlanningSnapshot(portSlug);
  const signature = authority?.bestExcursions[0];
  return evaluateCruiseConfidence({
    portSlug,
    duration: signature?.duration ?? "4-5 hours",
    excursionType: signature?.type,
    activityLevel: signature?.type,
    bestFor: snapshot?.bestFor,
    timeInPort: "6-8",
  });
}

export function evaluateAuthorityRowConfidence(row: PortExcursionAuthorityRow): CruiseConfidenceAssessment {
  return evaluateCruiseConfidence({
    portSlug: row.portSlug,
    duration: row.duration,
    activityLevel: row.activityLevel,
    bestFor: row.bestFor,
    excursionType: row.bestFor,
    timeInPort: "6-8",
  });
}

export function evaluateExcursionConfidence(
  portSlug: string,
  excursion: Pick<ExcursionItem, "duration" | "type"> & { name?: string },
): CruiseConfidenceAssessment {
  return evaluateCruiseConfidence({
    portSlug,
    duration: excursion.duration,
    excursionType: excursion.type,
    activityLevel: excursion.type,
    timeInPort: "6-8",
  });
}

export function legacyToCruiseConfidenceLevel(legacy: ReturnConfidence): CruiseConfidenceLevel {
  switch (legacy) {
    case "high":
      return "high";
    case "moderate":
      return "medium";
    case "caution":
      return "plan-carefully";
  }
}

export function cruiseConfidenceFromLegacy(
  legacy: ReturnConfidence,
  guidance: string,
  supportingLabels: CruiseConfidenceLabelId[] = [],
): CruiseConfidenceAssessment {
  const level = legacyToCruiseConfidenceLevel(legacy);
  return {
    level,
    title: CONFIDENCE_TITLES[level],
    headline: CONFIDENCE_TITLES[level],
    guidance,
    supportingLabels,
    legacyLevel: legacy,
    factors: {
      durationFit: legacy === "high" ? "strong" : legacy === "moderate" ? "moderate" : "tight",
      transferEase: "moderate",
      returnBuffer: legacy === "high" ? "generous" : legacy === "moderate" ? "standard" : "limited",
      passengerFit: "good",
    },
  };
}

export function getCruiseConfidenceStyles(level: CruiseConfidenceLevel | ReturnConfidence) {
  const normalized =
    level === "high" || level === "moderate" || level === "caution"
      ? legacyToCruiseConfidenceLevel(level)
      : level;

  switch (normalized) {
    case "high":
      return {
        badge: "bg-emerald-100 text-emerald-900 border-emerald-200",
        dot: "bg-emerald-500",
        card: "border-emerald-200 bg-emerald-50/60",
        accent: "text-emerald-800",
      };
    case "medium":
      return {
        badge: "bg-amber-100 text-amber-900 border-amber-200",
        dot: "bg-amber-500",
        card: "border-amber-200 bg-amber-50/60",
        accent: "text-amber-900",
      };
    case "plan-carefully":
      return {
        badge: "bg-rose-100 text-rose-900 border-rose-200",
        dot: "bg-rose-500",
        card: "border-rose-200 bg-rose-50/60",
        accent: "text-rose-900",
      };
  }
}

/** @deprecated Use getCruiseConfidenceStyles */
export function getConfidenceStyles(confidence: ReturnConfidence) {
  return getCruiseConfidenceStyles(confidence);
}

export function formatConfidenceTitle(level: CruiseConfidenceLevel): string {
  return CONFIDENCE_TITLES[level].toUpperCase();
}
