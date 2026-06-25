import type {
  PortPlanningCard,
  PortPlanningSnapshot,
  TypicalCruiseDayStep,
} from "./types";
import { getPortBySlug } from "./ports";
import { getPortAuthority } from "./port-authority";
import { cruiseLines } from "./cruise-lines";
import { getSimilarPortSlugs } from "./port-related";
import {
  getScheduleForPort,
  getShipCallCountForPortYear,
  getSchedulePortBySlug,
  hasVerifiedScheduleData,
} from "./schedules";
import { ESTIMATED_PASSENGERS_PER_CALL } from "./schedule-insights";

interface PortPlanningConfig {
  snapshot: Partial<PortPlanningSnapshot>;
  typicalCruiseDay: TypicalCruiseDayStep[];
  cardTeasers: {
    beaches: string;
    snorkeling: string;
    families: string;
    wildlife: string;
    private: string;
  };
}

const planningConfig: Record<string, PortPlanningConfig> = {
  "st-thomas": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at terminal",
      familyFriendly: "Excellent",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Taxi to Magens Bay or Red Hook ferry for St. John" },
      { time: "10:00 AM", activity: "Beach time or Trunk Bay snorkel" },
      { time: "1:00 PM", activity: "Lunch and optional Charlotte Amalie shopping" },
      { time: "3:30 PM", activity: "Return to Havensight or Crown Bay" },
    ],
    cardTeasers: {
      beaches: "Magens Bay calm swim day",
      snorkeling: "Sapphire Beach or St. John ferry",
      families: "Coral World and easy beach access",
      wildlife: "Reef fish at Coki and Sapphire",
      private: "Custom taxi or charter island loop",
    },
  },
  cozumel: {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low from downtown pier",
      familyFriendly: "Excellent",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Boat depart for Palancar Reef snorkel" },
      { time: "11:00 AM", activity: "Second reef stop or El Cielo sandbar" },
      { time: "1:30 PM", activity: "Downtown San Miguel lunch near pier" },
      { time: "3:30 PM", activity: "Walk back to ship at Punta Langosta" },
    ],
    cardTeasers: {
      beaches: "Palancar coast and beach clubs",
      snorkeling: "Palancar and Columbia Reef",
      families: "Chankanaab lagoon and glass-bottom boats",
      wildlife: "Reef turtles and tropical fish",
      private: "Private snorkel boat two-stop routes",
    },
  },
  aruba: {
    snapshot: {
      timeInPort: "8-10 hours typical",
      walkingRequired: "Low in Oranjestad",
      familyFriendly: "Very Good",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Catamaran snorkel sail or Eagle Beach transfer" },
      { time: "12:00 PM", activity: "Beach lunch and swim at Eagle or Palm Beach" },
      { time: "2:30 PM", activity: "Optional downtown shopping in Oranjestad" },
      { time: "4:00 PM", activity: "Return to cruise terminal" },
    ],
    cardTeasers: {
      beaches: "Eagle Beach and Baby Beach",
      snorkeling: "Boca Catalina and catamaran reefs",
      families: "De Palm Island and calm lagoons",
      wildlife: "Reef fish and sea turtles",
      private: "4x4 Arikok or custom beach loop",
    },
  },
  curacao: {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at Willemstad pier",
      familyFriendly: "Good",
      privateTourFriendly: "Very Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Walk Handelskade and Queen Emma Bridge" },
      { time: "10:30 AM", activity: "Tugboat Beach or reef snorkel boat" },
      { time: "1:00 PM", activity: "Lunch in Punda or Otrobanda" },
      { time: "3:30 PM", activity: "Return via floating bridge to ship" },
    ],
    cardTeasers: {
      beaches: "Grote Knip day trip option",
      snorkeling: "Tugboat Beach wreck snorkel",
      families: "Calm lagoon and town exploration",
      wildlife: "Reef fish at shore-access sites",
      private: "Custom Willemstad and beach route",
    },
  },
  "grand-cayman": {
    snapshot: {
      timeInPort: "6-8 hours typical (tender)",
      walkingRequired: "Minimal after tender",
      familyFriendly: "Excellent",
      privateTourFriendly: "Very Good",
      returnToShipConfidence: "Moderate (tender buffer)",
    },
    typicalCruiseDay: [
      { time: "8:00 AM", activity: "Disembark tender early for Stingray City boat" },
      { time: "10:30 AM", activity: "Sandbar stingray encounter" },
      { time: "1:00 PM", activity: "Seven Mile Beach or second snorkel stop" },
      { time: "3:00 PM", activity: "Tender return with 60-minute buffer" },
    ],
    cardTeasers: {
      beaches: "Seven Mile Beach organized access",
      snorkeling: "Cemetery Reef and reef combos",
      families: "Stingray City sandbar",
      wildlife: "Stingray City signature encounter",
      private: "Small-group Stingray and reef boats",
    },
  },
  "st-maarten": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at Philipsburg",
      familyFriendly: "Very Good",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Taxi to Maho Beach or Orient Bay" },
      { time: "11:00 AM", activity: "Beach club time on French or Dutch side" },
      { time: "1:30 PM", activity: "Philipsburg shopping strip" },
      { time: "3:30 PM", activity: "Return to Dr. A.C. Wathey terminal" },
    ],
    cardTeasers: {
      beaches: "Orient Bay and Great Bay",
      snorkeling: "Boat snorkel off Simpson Bay",
      families: "Beach clubs with facilities",
      wildlife: "Reef snorkel catamaran sails",
      private: "Dual-nation island custom tour",
    },
  },
  nassau: {
    snapshot: {
      timeInPort: "6-8 hours typical",
      walkingRequired: "Low in downtown Nassau",
      familyFriendly: "Excellent",
      privateTourFriendly: "Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Atlantis transfer or downtown heritage walk" },
      { time: "11:00 AM", activity: "Paradise Island beach or water park block" },
      { time: "1:30 PM", activity: "Straw Market and Bay Street shopping" },
      { time: "3:30 PM", activity: "Walk back to Prince George Wharf" },
    ],
    cardTeasers: {
      beaches: "Paradise Island and Cable Beach",
      snorkeling: "Rose Island catamaran trips",
      families: "Atlantis Aquaventure day pass",
      wildlife: "Swimming pigs flight or reef tours",
      private: "Custom Paradise Island driver day",
    },
  },
  roatan: {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at cruise piers",
      familyFriendly: "Very Good",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Taxi or tour to West Bay Beach" },
      { time: "10:30 AM", activity: "Offshore reef snorkel from beach" },
      { time: "1:00 PM", activity: "Lunch at West Bay or Mahogany Bay" },
      { time: "3:30 PM", activity: "Return to Coxen Hole or Mahogany Bay pier" },
    ],
    cardTeasers: {
      beaches: "West Bay and Tabyana Beach",
      snorkeling: "West Bay reef from shore",
      families: "Gumbalimba Park wildlife",
      wildlife: "Capuchins and iguanas at Gumbalimba",
      private: "Private driver West Bay loop",
    },
  },
  "costa-maya": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low in cruise village",
      familyFriendly: "Very Good",
      privateTourFriendly: "Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Coach to Chacchoben ruins or beach club" },
      { time: "11:30 AM", activity: "Ruins tour or Mahahual beach block" },
      { time: "1:30 PM", activity: "Lunch in port village or Mahahual" },
      { time: "3:30 PM", activity: "Return to cruise village pier" },
    ],
    cardTeasers: {
      beaches: "Mahahual village beach",
      snorkeling: "Reef tours from Mahahual",
      families: "Port pool and kayak lagoon",
      wildlife: "Reef snorkel and lagoon wildlife",
      private: "Chacchoben private van tour",
    },
  },
  "puerto-limon": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at cruise pier",
      familyFriendly: "Very Good",
      privateTourFriendly: "Very Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Coach to sloth sanctuary or Veragua Rainforest" },
      { time: "11:30 AM", activity: "Wildlife viewing or aerial tram canopy tour" },
      { time: "1:30 PM", activity: "Lunch stop or Cahuita beach extension" },
      { time: "3:30 PM", activity: "Return to Limón Cruise Terminal pier" },
    ],
    cardTeasers: {
      beaches: "Cahuita National Park beach",
      snorkeling: "Cahuita reef snorkel tours",
      families: "Sloth sanctuary wildlife day",
      wildlife: "Sloths, monkeys, and tropical birds",
      private: "Private sanctuary and rainforest tour",
    },
  },
  "puerto-plata": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at Amber Cove / Taíno Bay",
      familyFriendly: "Very Good",
      privateTourFriendly: "Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Coach to 27 Charcos or Teleférico cable car" },
      { time: "12:00 PM", activity: "Waterfall adventure or city heritage stop" },
      { time: "2:00 PM", activity: "Port pool time at Amber Cove" },
      { time: "4:00 PM", activity: "Return to scheduled pier" },
    ],
    cardTeasers: {
      beaches: "Cofresí and Amber Coast clubs",
      snorkeling: "Sosúa Bay reef boats",
      families: "Port pool and waterfall coaches",
      wildlife: "Reef snorkel north-coast trips",
      private: "Custom Amber Coast waterfall day",
    },
  },
  "ocho-rios": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at cruise pier",
      familyFriendly: "Very Good",
      privateTourFriendly: "Very Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "First-slot Dunn's River Falls climb" },
      { time: "11:00 AM", activity: "Mystic Mountain or beach transfer" },
      { time: "1:30 PM", activity: "Lunch near pier or island jerk stop" },
      { time: "3:30 PM", activity: "Return to Ocho Rios cruise terminal" },
    ],
    cardTeasers: {
      beaches: "Dunn's River base beach",
      snorkeling: "Reef boat north-coast trips",
      families: "Dunn's River and Dolphin Cove",
      wildlife: "Dolphin Cove lagoon encounters",
      private: "Private first-slot falls guide",
    },
  },
  falmouth: {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low in historic Falmouth",
      familyFriendly: "Very Good",
      privateTourFriendly: "Very Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Martha Brae bamboo rafting departure" },
      { time: "11:30 AM", activity: "Historic Falmouth walking tour" },
      { time: "1:30 PM", activity: "Optional Burwood Beach taxi stop" },
      { time: "3:30 PM", activity: "Return to Falmouth pier" },
    ],
    cardTeasers: {
      beaches: "Burwood Beach calm swim",
      snorkeling: "North-coast reef day trips",
      families: "Martha Brae rafting for mixed ages",
      wildlife: "River and lagoon birdlife",
      private: "Rafting plus custom heritage route",
    },
  },
  bonaire: {
    snapshot: {
      timeInPort: "6-8 hours typical",
      walkingRequired: "Low in Kralendijk",
      familyFriendly: "Good",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Guided shore reef snorkel or Washington Slagbaai safari" },
      { time: "12:00 PM", activity: "Flamingo salt flat viewing or Kralendijk waterfront lunch" },
      { time: "2:30 PM", activity: "Optional second reef site or donkey sanctuary stop" },
      { time: "4:00 PM", activity: "Return to Kralendijk cruise pier" },
    ],
    cardTeasers: {
      beaches: "Reef-entry shore sites with water shoes",
      snorkeling: "Marine park house reefs and Karpata",
      families: "Donkey sanctuary and beginner reef tours",
      wildlife: "Flamingo lagoons and reef fish",
      private: "Private reef charter or park jeep",
    },
  },
  tortola: {
    snapshot: {
      timeInPort: "6-8 hours typical (tender)",
      walkingRequired: "Minimal after tender",
      familyFriendly: "Good",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "Moderate (tender buffer)",
    },
    typicalCruiseDay: [
      { time: "8:00 AM", activity: "Disembark tender early for catamaran or Virgin Gorda tour" },
      { time: "11:00 AM", activity: "BVI snorkel sail or The Baths grotto walk" },
      { time: "1:30 PM", activity: "Cane Garden Bay beach or Road Town lunch" },
      { time: "3:00 PM", activity: "Tender return with 60-minute buffer" },
    ],
    cardTeasers: {
      beaches: "Cane Garden Bay and Virgin Gorda",
      snorkeling: "Norman Island caves and BVI reefs",
      families: "Half-day Cane Garden Bay with calm water",
      wildlife: "Reef fish on catamaran snorkel stops",
      private: "Private BVI catamaran charter",
    },
  },
  progreso: {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Shuttle from long pier",
      familyFriendly: "Very Good",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Coach to Mérida colonial center or Uxmal ruins" },
      { time: "12:00 PM", activity: "Plaza lunch or ruin tour completion" },
      { time: "2:00 PM", activity: "Progreso malecón beach or return from inland tour" },
      { time: "4:00 PM", activity: "Shuttle back along pier to ship" },
    ],
    cardTeasers: {
      beaches: "Progreso malecón Gulf beach",
      snorkeling: "Culture port, compare Cozumel for reefs",
      families: "Mérida plaza walk and Celestún boats",
      wildlife: "Celestún flamingo reserve seasonally",
      private: "Private Mérida or Uxmal van tour",
    },
  },
  samana: {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at cruise terminal",
      familyFriendly: "Good",
      privateTourFriendly: "Very Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Seasonal whale watching boat or El Limón waterfall trek" },
      { time: "12:00 PM", activity: "Waterfall swim or Playa Bonita beach block" },
      { time: "2:00 PM", activity: "Los Haitises mangrove boat or town waterfront" },
      { time: "4:00 PM", activity: "Return to Samaná cruise terminal" },
    ],
    cardTeasers: {
      beaches: "Playa Rincón and Playa Bonita",
      snorkeling: "Cayo Levantado on combination tours",
      families: "Whale watching ages 6+ in season",
      wildlife: "Humpback whales January to March",
      private: "Private whale boat or El Limón guide",
    },
  },
  "la-romana": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at Casa de Campo terminal",
      familyFriendly: "Very Good",
      privateTourFriendly: "Excellent",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:00 AM", activity: "Saona Island catamaran departure from terminal" },
      { time: "12:00 PM", activity: "Island beach, natural pool, and included lunch" },
      { time: "2:30 PM", activity: "Return sail or Altos de Chavón village stop" },
      { time: "4:00 PM", activity: "Back to Casa de Campo cruise pier" },
    ],
    cardTeasers: {
      beaches: "Saona Island national park beaches",
      snorkeling: "Catalina Island protected reef",
      families: "Saona catamaran with natural pool",
      wildlife: "Starfish shallows on Saona tours",
      private: "Private Saona Island charter",
    },
  },
  "montego-bay": {
    snapshot: {
      timeInPort: "7-9 hours typical",
      walkingRequired: "Low at cruise terminal",
      familyFriendly: "Very Good",
      privateTourFriendly: "Very Good",
      returnToShipConfidence: "High",
    },
    typicalCruiseDay: [
      { time: "8:30 AM", activity: "Taxi to Doctor's Cave Beach or Rose Hall tour" },
      { time: "11:30 AM", activity: "Hip Strip lunch or Margaritaville beach club" },
      { time: "2:00 PM", activity: "Optional resort beach pass or downtown browse" },
      { time: "4:00 PM", activity: "Return to Montego Bay cruise terminal" },
    ],
    cardTeasers: {
      beaches: "Doctor's Cave and resort day passes",
      snorkeling: "Marine park reef boat tours",
      families: "Margaritaville pool and water slide",
      wildlife: "Reef snorkel on organized boat tours",
      private: "Private MoBay highlights driver",
    },
  },
};

function deriveWalkingLabel(tenderRequired: boolean, walkingDistance: string): string {
  if (tenderRequired) return "Minimal after tender";
  if (/walk/i.test(walkingDistance)) return "Low at terminal";
  if (/minute/i.test(walkingDistance)) return "Low to moderate";
  return "Varies by excursion";
}

function parseTimeInPortHours(value: string): number | null {
  const hours = value.match(/(\d+)\s*h/i);
  const mins = value.match(/(\d+)\s*m/i);
  if (!hours) return null;
  return Number(hours[1]) + (mins ? Number(mins[1]) / 60 : 0);
}

export function getAverageTimeInPort(slug: string): string | null {
  const entries = getScheduleForPort(slug).filter((e) => e.timeInPort && e.timeInPort !== "-");
  if (entries.length < 5) return null;

  const hours = entries
    .map((e) => parseTimeInPortHours(e.timeInPort ?? ""))
    .filter((v): v is number => v !== null);
  if (hours.length === 0) return null;

  const avg = hours.reduce((sum, h) => sum + h, 0) / hours.length;
  const rounded = Math.round(avg * 10) / 10;
  return `~${rounded}h average (verified calls)`;
}

export function getPortPlanningSnapshot(slug: string): PortPlanningSnapshot | null {
  const port = getPortBySlug(slug);
  if (!port) return null;

  const config = planningConfig[slug];
  const verifiedTime = getAverageTimeInPort(slug);

  return {
    timeInPort: verifiedTime ?? config?.snapshot.timeInPort ?? "6-9 hours typical",
    bestFor: port.bestFor,
    walkingRequired:
      config?.snapshot.walkingRequired ??
      deriveWalkingLabel(port.portInfo.tenderRequired, port.portInfo.walkingDistance),
    familyFriendly: config?.snapshot.familyFriendly ?? "Very Good",
    privateTourFriendly: config?.snapshot.privateTourFriendly ?? "Very Good",
    returnToShipConfidence:
      config?.snapshot.returnToShipConfidence ??
      (port.portInfo.tenderRequired ? "Moderate (tender buffer)" : "High"),
  };
}

export function getTypicalCruiseDay(slug: string): TypicalCruiseDayStep[] {
  return planningConfig[slug]?.typicalCruiseDay ?? [];
}

export function getCruiseLinesForPort(slug: string) {
  return cruiseLines.filter((line) => line.popularPorts.some((p) => p.slug === slug));
}

export function getPortPlanningCards(slug: string): PortPlanningCard[] {
  const port = getPortBySlug(slug);
  if (!port) return [];

  const topExcursion = port.bestExcursions[0]?.name ?? "Local operator tours";

  return [
    {
      label: "Whales",
      href: "/excursion-types/whale-watching",
      guideHref: "/best-alaska-whale-watching-excursions",
      teaser: topExcursion,
      tone: "wildlife",
    },
    {
      label: "Glaciers",
      href: "/excursion-types/glacier-tours",
      guideHref: "/best-alaska-glacier-excursions",
      teaser: port.bestFor,
      tone: "wildlife",
    },
    {
      label: "Bears",
      href: "/excursion-types/bear-viewing",
      guideHref: "/best-alaska-bear-viewing-excursions",
      teaser: "Stream and sanctuary bear viewing",
      tone: "wildlife",
    },
    {
      label: "Railways",
      href: "/excursion-types/railway-tours",
      guideHref: "/best-alaska-shore-excursions",
      teaser: "White Pass and scenic Alaska rail",
      tone: "family",
    },
    {
      label: "Wildlife",
      href: "/excursion-types/wildlife-cruises",
      guideHref: "/best-alaska-whale-watching-excursions",
      teaser: "Marine wildlife and fjord cruises",
      tone: "wildlife",
    },
    {
      label: "Culture",
      href: "/excursion-types/native-culture",
      guideHref: "/best-alaska-shore-excursions",
      teaser: "Totem parks and native heritage",
      tone: "family",
    },
    {
      label: "Adventure",
      href: "/excursion-types/kayaking",
      guideHref: "/best-alaska-shore-excursions",
      teaser: "Kayaking, flightseeing, and active port days",
      tone: "private",
    },
  ];
}

export type PortActivityTier = "Very High" | "High" | "Moderate" | "Seasonal";

export interface PortActivityEstimate {
  activityTier: PortActivityTier;
  peakSeason: string;
  planningNote: string;
}

const portActivityEstimates: Record<string, PortActivityEstimate> = {
  "st-thomas": {
    activityTier: "Very High",
    peakSeason: "December – April",
    planningNote:
      "Among the busiest Eastern Caribbean ports. Multi-ship days fill Magens Bay and St. John ferries early.",
  },
  cozumel: {
    activityTier: "Very High",
    peakSeason: "November – April",
    planningNote:
      "One of the world's busiest cruise ports. Multiple daily calls at peak are common, book reef tours early.",
  },
  aruba: {
    activityTier: "High",
    peakSeason: "January – May",
    planningNote:
      "Steady Southern Caribbean traffic outside the hurricane belt. Extended evening departures are common.",
  },
  "grand-cayman": {
    activityTier: "Very High",
    peakSeason: "November – April",
    planningNote:
      "Major Western Caribbean hub with tender operations. Allow 30–60 minutes each way for Stingray City boats.",
  },
  nassau: {
    activityTier: "Very High",
    peakSeason: "Year-round; peaks on short cruises",
    planningNote:
      "Bahamas itineraries from Florida keep Nassau busy year-round. Atlantis and reef tours sell out on busy weeks.",
  },
  roatan: {
    activityTier: "High",
    peakSeason: "November – April",
    planningNote:
      "Western Caribbean loops call Roatán regularly. West Bay reef access stays less crowded than Cozumel.",
  },
  "st-maarten": {
    activityTier: "High",
    peakSeason: "December – April",
    planningNote:
      "Eastern Caribbean winter traffic drives heavy Philipsburg and beach-club demand on multi-ship days.",
  },
  "puerto-plata": {
    activityTier: "High",
    peakSeason: "December – April",
    planningNote:
      "Growing Eastern Caribbean stop at Amber Cove and Taíno Bay. Waterfall coaches need timed port returns.",
  },
  "costa-maya": {
    activityTier: "High",
    peakSeason: "November – April",
    planningNote:
      "Western Caribbean anchor port paired with Cozumel. Chacchoben ruins and Mahahual beach compete for morning slots.",
  },
  "puerto-limon": {
    activityTier: "Moderate",
    peakSeason: "October – April",
    planningNote:
      "Panama Canal and Southern Caribbean routes call Limón seasonally. Rainforest and sanctuary tours need timed pier returns.",
  },
  "ocho-rios": {
    activityTier: "Moderate",
    peakSeason: "January – March",
    planningNote:
      "Verified calls cluster in Q1. Book first-slot Dunn's River Falls climbs on busy schedule weeks.",
  },
  curacao: {
    activityTier: "High",
    peakSeason: "January – May",
    planningNote:
      "Steady Southern Caribbean traffic with strong Willemstad walkability. West-coast cove snorkel tours need taxi timing.",
  },
  falmouth: {
    activityTier: "Moderate",
    peakSeason: "November – April",
    planningNote:
      "Quieter Jamaica alternative to Ocho Rios. Martha Brae rafting and Luminous Lagoon evening tours need disciplined return buffers.",
  },
  bonaire: {
    activityTier: "Moderate",
    peakSeason: "January – May",
    planningNote:
      "Less frequent Southern Caribbean call than Aruba. Book guided reef snorkel or flamingo tours early on shared pier days.",
  },
  tortola: {
    activityTier: "Moderate",
    peakSeason: "November – April",
    planningNote:
      "Tender port with BVI sailing focus. Virgin Gorda day trips and catamaran sails need full-day planning and early tender disembarkation.",
  },
  progreso: {
    activityTier: "Moderate",
    peakSeason: "November – April",
    planningNote:
      "Western Caribbean culture port with long pier shuttle time. Uxmal and Mérida tours need early coach departures for safe returns.",
  },
  samana: {
    activityTier: "Seasonal",
    peakSeason: "January – March (whales)",
    planningNote:
      "Whale watching peaks in winter; outside season waterfall and beach excursions carry the port day. Book licensed operators with ship-time monitoring.",
  },
  "la-romana": {
    activityTier: "Moderate",
    peakSeason: "December – April",
    planningNote:
      "Saona Island catamaran days are full-time commitments. Confirm all-aboard time before booking Altos de Chavón add-ons.",
  },
  "montego-bay": {
    activityTier: "Moderate",
    peakSeason: "November – April",
    planningNote:
      "Resort beach and Rose Hall tours suit shorter port windows. Dunn's River extensions from MoBay require 90-minute drives each way.",
  },
};

export interface PortPopularityStats {
  hasVerifiedData: boolean;
  calls2026: number;
  calls2027: number;
  busiestYear: number | null;
  busiestYearCalls: number;
  estimatedPassengers: number | null;
  peakMonths: string[];
  activityTier: PortActivityTier;
  peakSeason: string;
  planningNote: string;
  note: string;
}

export function getPortActivityEstimate(slug: string): PortActivityEstimate {
  const schedulePort = getSchedulePortBySlug(slug);
  return (
    portActivityEstimates[slug] ?? {
      activityTier: "Moderate",
      peakSeason: "May – September",
      planningNote:
        schedulePort?.scheduleOverview?.slice(0, 160) ??
        "Book wildlife, glacier, and railway excursions early on peak summer port days.",
    }
  );
}

export function getPortPopularityStats(slug: string): PortPopularityStats {
  const calls2026 = getShipCallCountForPortYear(slug, 2026);
  const calls2027 = getShipCallCountForPortYear(slug, 2027);
  const hasVerifiedData = hasVerifiedScheduleData(slug);
  const activity = getPortActivityEstimate(slug);

  const entries = getScheduleForPort(slug);
  const monthCounts = new Map<string, number>();
  for (const entry of entries) {
    const monthKey = entry.date.slice(0, 7);
    monthCounts.set(monthKey, (monthCounts.get(monthKey) ?? 0) + 1);
  }

  const peakMonths = [...monthCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => {
      const [year, month] = key.split("-");
      const date = new Date(Number(year), Number(month) - 1, 1);
      return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    });

  const busiestYear = calls2027 >= calls2026 ? (calls2027 > 0 ? 2027 : calls2026 > 0 ? 2026 : null) : 2026;
  const busiestYearCalls = busiestYear === 2027 ? calls2027 : calls2026;
  const estimatedPassengers = hasVerifiedData
    ? busiestYearCalls * ESTIMATED_PASSENGERS_PER_CALL
    : null;

  let note = activity.planningNote;
  if (hasVerifiedData) {
    note =
      peakMonths.length > 0
        ? `${activity.planningNote} Busiest imported months: ${peakMonths.join(", ")}.`
        : activity.planningNote;
  }

  return {
    hasVerifiedData,
    calls2026,
    calls2027,
    busiestYear,
    busiestYearCalls,
    estimatedPassengers,
    peakMonths,
    activityTier: activity.activityTier,
    peakSeason: activity.peakSeason,
    planningNote: activity.planningNote,
    note,
  };
}

export function getSimilarPorts(slug: string) {
  return getSimilarPortSlugs(slug)
    .map((relSlug) => getPortBySlug(relSlug))
    .filter(Boolean);
}
