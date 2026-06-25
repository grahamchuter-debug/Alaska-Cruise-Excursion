import { getPortBySlug } from "@/data/ports";
import { getCruisePortNaming } from "@/data/cruise-port-naming";
import {
  getPortPlanningSnapshot,
  getPortPlanningCards,
  getTypicalCruiseDay,
} from "@/data/port-planning";
import {
  featuredFinderPortSlugs,
  portDayMistakes,
  travellerTypes,
  type FitnessLevel,
} from "@/data/excursion-finder";
import {
  generateExcursionFinderPlan,
  getMatchTierStyles,
  type FinderExcursionPick,
  type MatchTier,
} from "@/lib/excursion-finder-engine";
import {
  evaluatePortConfidence,
  getConfidenceStyles,
  type CruiseConfidenceAssessment,
  type ReturnConfidence,
} from "@/lib/cruise-confidence";
import type { TravellerTypeId, TimeInPort } from "@/data/excursion-finder";
import {
  formatScheduleDisplayDate,
  getDailyScheduleSummary,
  getRealScheduleEntries,
  getShipsInPortForDate,
  parsePassengerCount,
} from "@/lib/cruise-day-lookup";
import { getPassengerCapacityLabel } from "@/lib/ship-capacities";
import { getScheduleForPort, hasVerifiedScheduleData } from "@/data/schedules";
import type { PortPlanningSnapshot, ScheduleEntry } from "@/data/types";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";

export type CruiseDayPlanInterest =
  | "whales"
  | "bears"
  | "glaciers"
  | "railways"
  | "wildlife"
  | "culture"
  | "adventure";

export interface CruiseDayPlanInterestOption {
  id: CruiseDayPlanInterest;
  label: string;
  description: string;
  icon: string;
}

export const cruiseDayPlanInterests: CruiseDayPlanInterestOption[] = [
  { id: "whales", label: "Whales", description: "Humpback and marine wildlife tours", icon: "🐋" },
  { id: "bears", label: "Bears", description: "Brown bear viewing at streams and sanctuaries", icon: "🐻" },
  { id: "glaciers", label: "Glaciers", description: "Fjord cruises and icefield flightseeing", icon: "🏔️" },
  { id: "railways", label: "Railways", description: "White Pass and Alaska Railroad segments", icon: "🚂" },
  { id: "wildlife", label: "Wildlife", description: "Eagles, otters, and combined marine tours", icon: "🦅" },
  { id: "culture", label: "Culture", description: "Totem parks and native heritage", icon: "🎭" },
  { id: "adventure", label: "Adventure", description: "Kayaking, ZipRider, and active port days", icon: "⛰️" },
];

export const cruiseDayPlanActivityLevels: {
  id: FitnessLevel;
  label: string;
  description: string;
}[] = [
  { id: "easy", label: "Easy", description: "Minimal walking, beach transfers, calm water" },
  { id: "moderate", label: "Moderate", description: "Boat rides, uneven terrain, or moderate hiking" },
  { id: "active", label: "Active", description: "Waterfall hikes, long transfers, full-day adventure" },
];

export interface CruiseDayPlanInput {
  portSlug: string;
  date: string;
  interests: CruiseDayPlanInterest[];
  activityLevel: FitnessLevel;
}

export interface CruiseDayPlanPortOption {
  slug: string;
  name: string;
  region: string;
}

export interface CruiseDayPlanShipRow {
  ship: string;
  cruiseLine: string;
  arrival: string;
  departure: string;
  timeInPort: string;
  passengers: string;
}

export interface CruiseDayPlanRelatedExcursion {
  label: string;
  teaser: string;
  excursionTypeHref: string;
  guideHref: string;
}

export interface CruiseDayPlanScheduleInfo {
  hasVerifiedData: boolean;
  hasDateMatch: boolean;
  message: string;
  entries: ScheduleEntry[];
  scheduleHref?: string;
  scheduleFallbackNote?: string;
}

export interface CruiseDayPlanReturnAdvice {
  tenderRequired: boolean;
  tenderNote?: string;
  returnConfidence: ReturnConfidence;
  returnLabel: string;
  returnMessage: string;
  cruiseConfidence: CruiseConfidenceAssessment;
  supportingLabels: CruiseConfidenceAssessment["supportingLabels"];
  timeBuffer: string;
  portMistake?: { mistake: string; better: string };
  typicalReturnStep?: string;
}

export interface CruiseDayPlanRecommendedExcursions {
  primary: FinderExcursionPick;
  alternate?: FinderExcursionPick;
  matchScore: number;
  matchLabel: MatchTier;
  matchReasons: string[];
  bestForTags: string[];
}

export interface CruiseDayPlanPortInformation {
  name: string;
  region: string;
  country: string;
  bestFor: string;
  dockTown?: string;
  terminals: string[];
  intro?: string;
  tenderNote?: string;
  overview: string;
  portGuideHref: string;
}

export interface CruiseDayPlanItineraryStep {
  time: string;
  activity: string;
}

export interface CruiseDayPlan {
  portSlug: string;
  portName: string;
  date: string;
  displayDate: string;
  interests: CruiseDayPlanInterest[];
  activityLevel: FitnessLevel;
  generatedAt: string;
  itinerary: CruiseDayPlanItineraryStep[];
  recommendedExcursions: CruiseDayPlanRecommendedExcursions;
  portInformation: CruiseDayPlanPortInformation;
  passengerSnapshot: PortPlanningSnapshot;
  relatedExcursions: CruiseDayPlanRelatedExcursion[];
  scheduleInfo: CruiseDayPlanScheduleInfo;
  shipsSummary: ReturnType<typeof getDailyScheduleSummary>;
  shipsInPort: CruiseDayPlanShipRow[];
  returnToShipAdvice: CruiseDayPlanReturnAdvice;
}

const interestToCardLabel: Partial<Record<CruiseDayPlanInterest, string>> = {
  whales: "Whales",
  bears: "Bears",
  glaciers: "Glaciers",
  railways: "Railways",
  wildlife: "Wildlife",
  culture: "Culture",
  adventure: "Adventure",
};

const interestToTravellerType: Partial<Record<CruiseDayPlanInterest, TravellerTypeId>> = {
  whales: "whales",
  bears: "bears",
  glaciers: "glaciers",
  railways: "railways",
  wildlife: "eagles",
  culture: "native-culture",
  adventure: "kayaking",
};

export function getCruiseDayPlanPortOptions(): CruiseDayPlanPortOption[] {
  return featuredFinderPortSlugs
    .map((slug) => {
      const port = getPortBySlug(slug);
      return port ? { slug, name: port.name, region: port.region } : null;
    })
    .filter(Boolean) as CruiseDayPlanPortOption[];
}

export function isValidCruiseDayPlanInterest(value: string): value is CruiseDayPlanInterest {
  return cruiseDayPlanInterests.some((option) => option.id === value);
}

export function parseCruiseDayPlanInterests(raw: string | null | undefined): CruiseDayPlanInterest[] {
  if (!raw) return ["whales"];
  const parsed = raw
    .split(",")
    .map((part) => part.trim())
    .filter(isValidCruiseDayPlanInterest);
  return parsed.length > 0 ? parsed : ["whales"];
}

export function interestsToTravellerTypes(interests: CruiseDayPlanInterest[]): TravellerTypeId[] {
  const types = new Set<TravellerTypeId>();
  for (const interest of interests) {
    const mapped = interestToTravellerType[interest];
    if (mapped) types.add(mapped);
    if (interest === "wildlife") types.add("photography");
  }
  if (types.size === 0) types.add("first-time");
  return [...types];
}

function parseTimeInPortHours(value: string): number | null {
  const hours = value.match(/(\d+)\s*h/i);
  const mins = value.match(/(\d+)\s*m/i);
  if (!hours) return null;
  return Number(hours[1]) + (mins ? Number(mins[1]) / 60 : 0);
}

function inferTimeInPort(entries: ScheduleEntry[]): TimeInPort {
  const hours = entries
    .map((entry) => parseTimeInPortHours(entry.timeInPort ?? ""))
    .filter((value): value is number => value !== null);

  if (hours.length === 0) return "6-8";

  const avg = hours.reduce((sum, value) => sum + value, 0) / hours.length;
  if (avg < 4) return "under-4";
  if (avg < 6) return "4-6";
  if (avg < 8) return "6-8";
  return "8-plus";
}

function buildReturnBuffer(tenderRequired: boolean, confidence: ReturnConfidence): string {
  if (tenderRequired) {
    return confidence === "caution"
      ? "Allow 75–90 minutes before all-aboard for tender queues and weather delays."
      : "Allow 60–75 minutes before all-aboard on tender port days.";
  }
  if (confidence === "caution") {
    return "Allow at least 60 minutes before all-aboard when excursion timing is tight.";
  }
  return "Allow 45–60 minutes before all-aboard as a standard cruise-day buffer.";
}

function buildScheduleMessage(
  portSlug: string,
  portName: string,
  date: string,
  hasVerified: boolean,
  dateEntries: ScheduleEntry[],
): string {
  if (hasVerified && dateEntries.length > 0) {
    return `Schedule snapshot for ${formatScheduleDisplayDate(date)} at ${portName}. Arrival and departure times below are from our imported port schedules.`;
  }

  if (hasVerified) {
    return `View the live schedule hub for the latest arrivals and departures at ${portName}.`;
  }

  return `View the live schedule hub for the latest arrivals and departures at ${portName}.`;
}

function mapShipRows(entries: ScheduleEntry[]): CruiseDayPlanShipRow[] {
  return getRealScheduleEntries(entries).map((entry) => ({
    ship: entry.ship,
    cruiseLine: entry.cruiseLine,
    arrival: entry.arrival,
    departure: entry.departure,
    timeInPort: entry.timeInPort && entry.timeInPort !== "-" ? entry.timeInPort : "—",
    passengers:
      entry.passengers && entry.passengers !== "-"
        ? entry.passengers
        : getPassengerCapacityLabel(entry.ship) ?? "Est. ~3,500",
  }));
}

function filterRelatedExcursions(
  portSlug: string,
  interests: CruiseDayPlanInterest[],
): CruiseDayPlanRelatedExcursion[] {
  const cards = getPortPlanningCards(portSlug);
  const selectedLabels = new Set(
    interests.map((interest) => interestToCardLabel[interest]).filter(Boolean) as string[],
  );

  const filtered =
    selectedLabels.size > 0
      ? cards.filter((card) => selectedLabels.has(card.label))
      : cards;

  const cultureAndAdventure =
    interests.includes("culture") || interests.includes("adventure")
      ? [
          {
            label: "Adventure & Culture",
            teaser: "Ruins, rainforest routes, and active port-day highlights",
            excursionTypeHref: "/excursion-types/adventure-tours",
            guideHref: "/best-caribbean-shore-excursions",
          },
        ]
      : [];

  return [
    ...filtered.map((card) => ({
      label: card.label,
      teaser: card.teaser,
      excursionTypeHref: card.href,
      guideHref: card.guideHref,
    })),
    ...cultureAndAdventure,
  ];
}

export function generateCruiseDayPlan(input: CruiseDayPlanInput): CruiseDayPlan | null {
  const port = getPortBySlug(input.portSlug);
  const snapshot = getPortPlanningSnapshot(input.portSlug);
  if (!port || !snapshot || !featuredFinderPortSlugs.includes(input.portSlug)) {
    return null;
  }

  const naming = getCruisePortNaming(input.portSlug);
  const dateEntries = getShipsInPortForDate(input.portSlug, input.date);
  const realDateEntries = getRealScheduleEntries(dateEntries);
  const timeInPort = inferTimeInPort(realDateEntries);
  const travellerTypes = interestsToTravellerTypes(input.interests);

  const finderResult = generateExcursionFinderPlan({
    portSlugs: [input.portSlug],
    travellerTypes,
    fitnessLevel: input.activityLevel,
    timeInPort,
  });

  const portPlan = finderResult?.portPlans[0];
  const typicalDay = getTypicalCruiseDay(input.portSlug);
  const portMistake = portDayMistakes.find((item) => item.portSlug === input.portSlug);
  const tenderRequired = port.portInfo.tenderRequired;
  const returnAdvice = portPlan
    ? {
        tenderRequired,
        tenderNote: naming?.tenderNote,
        returnConfidence: portPlan.returnConfidence,
        returnLabel: portPlan.returnLabel,
        returnMessage: portPlan.returnMessage,
        cruiseConfidence: portPlan.cruiseConfidence,
        supportingLabels: portPlan.supportingLabels,
        timeBuffer: buildReturnBuffer(tenderRequired, portPlan.returnConfidence),
        portMistake: portMistake
          ? { mistake: portMistake.mistake, better: portMistake.better }
          : undefined,
        typicalReturnStep: typicalDay[typicalDay.length - 1]?.activity,
      }
    : (() => {
        const fallbackConfidence = evaluatePortConfidence(input.portSlug);
        return {
          tenderRequired,
          tenderNote: naming?.tenderNote,
          returnConfidence: fallbackConfidence.legacyLevel,
          returnLabel: fallbackConfidence.headline,
          returnMessage: fallbackConfidence.guidance,
          cruiseConfidence: fallbackConfidence,
          supportingLabels: fallbackConfidence.supportingLabels,
          timeBuffer: buildReturnBuffer(tenderRequired, fallbackConfidence.legacyLevel),
          portMistake: portMistake
            ? { mistake: portMistake.mistake, better: portMistake.better }
            : undefined,
          typicalReturnStep: typicalDay[typicalDay.length - 1]?.activity,
        };
      })();

  const hasVerified = hasVerifiedScheduleData(input.portSlug);
  const allEntries = getScheduleForPort(input.portSlug);
  const [yearPart, monthPart] = input.date.split("-");
  const scheduleCta = getBestScheduleUrl({
    portSlug: input.portSlug,
    year: yearPart,
    month: monthPart,
  });

  return {
    portSlug: input.portSlug,
    portName: port.name,
    date: input.date,
    displayDate: formatScheduleDisplayDate(input.date),
    interests: input.interests,
    activityLevel: input.activityLevel,
    generatedAt: new Date().toISOString(),
    itinerary: getTypicalCruiseDay(input.portSlug),
    recommendedExcursions: {
      primary: portPlan?.recommended ?? {
        name: port.bestExcursions[0]?.name ?? `${port.name} highlight tour`,
        description: port.bestExcursions[0]?.description ?? port.tagline,
        duration: port.bestExcursions[0]?.duration ?? "4-5 hours",
        type: port.bestExcursions[0]?.type ?? port.bestFor,
        matchReason: "Signature port excursion",
      },
      alternate: portPlan?.alternate,
      matchScore: portPlan?.portMatchScore ?? 70,
      matchLabel: portPlan?.portMatchLabel ?? "Good Match",
      matchReasons: portPlan?.matchReasons ?? [],
      bestForTags: portPlan?.bestForTags ?? [],
    },
    portInformation: {
      name: port.name,
      region: port.region,
      country: port.country,
      bestFor: port.bestFor,
      dockTown: naming?.dockTown,
      terminals: naming?.terminals ?? [],
      intro: naming?.portGuideIntro,
      tenderNote: naming?.tenderNote,
      overview: port.overview,
      portGuideHref: `/ports/${input.portSlug}`,
    },
    passengerSnapshot: snapshot,
    relatedExcursions: filterRelatedExcursions(input.portSlug, input.interests),
    scheduleInfo: {
      hasVerifiedData: hasVerified,
      hasDateMatch: realDateEntries.length > 0,
      message: buildScheduleMessage(
        input.portSlug,
        port.name,
        input.date,
        hasVerified,
        realDateEntries,
      ),
      entries: realDateEntries,
      scheduleHref: scheduleCta?.href,
      scheduleFallbackNote: scheduleCta?.fallbackNote,
    },
    shipsSummary: getDailyScheduleSummary(allEntries, input.date, port.name),
    shipsInPort: mapShipRows(dateEntries),
    returnToShipAdvice: returnAdvice,
  };
}

export function buildCruiseDayPlanSearchParams(input: CruiseDayPlanInput): URLSearchParams {
  const params = new URLSearchParams({
    port: input.portSlug,
    date: input.date,
    interests: input.interests.join(","),
    activity: input.activityLevel,
  });
  return params;
}

const monthNameToNumber: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

/** Sensible default when a cruise date is not yet known (e.g. excursion finder). */
export function getDefaultCruiseDayPlanDate(sailingMonth?: string, sailingYear?: number): string {
  const today = new Date();
  if (sailingMonth && monthNameToNumber[sailingMonth]) {
    const month = monthNameToNumber[sailingMonth];
    let year = sailingYear ?? today.getFullYear();
    if (!sailingYear && month < today.getMonth() + 1) year += 1;
    return `${year}-${String(month).padStart(2, "0")}-15`;
  }
  const fallback = new Date(today.getFullYear(), today.getMonth() + 2, 15);
  return fallback.toISOString().slice(0, 10);
}

const travellerTypeToInterests: Partial<Record<TravellerTypeId, CruiseDayPlanInterest[]>> = {
  "first-time": ["whales", "glaciers"],
  whales: ["whales"],
  bears: ["bears"],
  glaciers: ["glaciers"],
  eagles: ["wildlife"],
  "dog-sledding": ["adventure"],
  railways: ["railways"],
  kayaking: ["adventure"],
  "native-culture": ["culture"],
  photography: ["wildlife"],
  fishing: ["adventure"],
};

export function travellerTypesToInterests(travellerTypes: TravellerTypeId[]): CruiseDayPlanInterest[] {
  const interests = new Set<CruiseDayPlanInterest>();
  for (const type of travellerTypes) {
    for (const interest of travellerTypeToInterests[type] ?? []) {
      interests.add(interest);
    }
  }
  return interests.size > 0 ? [...interests] : ["whales"];
}

export function buildCruiseDayPlanFromFinderContext(options: {
  portSlug: string;
  travellerTypes: TravellerTypeId[];
  fitnessLevel: FitnessLevel;
  sailingMonth?: string;
  sailingYear?: number;
  date?: string;
}): CruiseDayPlan | null {
  return generateCruiseDayPlan({
    portSlug: options.portSlug,
    date: options.date ?? getDefaultCruiseDayPlanDate(options.sailingMonth, options.sailingYear),
    interests: travellerTypesToInterests(options.travellerTypes),
    activityLevel: options.fitnessLevel,
  });
}

export interface CombinedCruisePlannerInput {
  cruiseLineName?: string;
  shipName?: string;
  sailingMonth?: string;
  sailingYear?: number;
  travellerTypeLabels: string[];
  fitnessLevelLabel: string;
  portPlans: CruiseDayPlan[];
  generatedAt: string;
}

function getTravellerTypeLabels(ids: TravellerTypeId[]): string[] {
  return ids.map((id) => travellerTypes.find((type) => type.id === id)?.label ?? id);
}

export function buildCombinedCruisePlannerFromFinderContext(options: {
  portSlugs: string[];
  travellerTypes: TravellerTypeId[];
  fitnessLevel: FitnessLevel;
  sailingMonth?: string;
  sailingYear?: number;
  cruiseLineName?: string;
  shipName?: string;
}): CombinedCruisePlannerInput | null {
  const portPlans = options.portSlugs
    .map((portSlug) =>
      buildCruiseDayPlanFromFinderContext({
        portSlug,
        travellerTypes: options.travellerTypes,
        fitnessLevel: options.fitnessLevel,
        sailingMonth: options.sailingMonth,
        sailingYear: options.sailingYear,
      }),
    )
    .filter((plan): plan is CruiseDayPlan => plan !== null);

  if (portPlans.length === 0) return null;

  const fitnessLevelLabel =
    cruiseDayPlanActivityLevels.find((level) => level.id === options.fitnessLevel)?.label ??
    options.fitnessLevel;

  return {
    cruiseLineName: options.cruiseLineName,
    shipName: options.shipName,
    sailingMonth: options.sailingMonth,
    sailingYear: options.sailingYear,
    travellerTypeLabels: getTravellerTypeLabels(options.travellerTypes),
    fitnessLevelLabel,
    portPlans,
    generatedAt: new Date().toISOString(),
  };
}

export function getCruiseDayPlanDownloadUrl(
  input: Pick<CruiseDayPlanInput, "portSlug"> & Partial<CruiseDayPlanInput>,
): string {
  const params = buildCruiseDayPlanSearchParams({
    portSlug: input.portSlug,
    date: input.date ?? getDefaultCruiseDayPlanDate(),
    interests: input.interests ?? ["whales"],
    activityLevel: input.activityLevel ?? "easy",
  });
  params.set("download", "1");
  return `/cruise-day-plan?${params.toString()}`;
}

export { getConfidenceStyles, getMatchTierStyles, parsePassengerCount };
