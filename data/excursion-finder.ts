import { ports } from "./ports";
import { cruiseLines } from "./cruise-lines";
import { ships } from "./ships";
import { portExcursionAuthority } from "./port-excursion-authority";

export type TravellerTypeId =
  | "whales"
  | "bears"
  | "glaciers"
  | "eagles"
  | "dog-sledding"
  | "railways"
  | "kayaking"
  | "native-culture"
  | "photography"
  | "fishing"
  | "first-time";

export type FitnessLevel = "easy" | "moderate" | "active";
export type TimeInPort = "under-4" | "4-6" | "6-8" | "8-plus";

export interface TravellerTypeOption {
  id: TravellerTypeId;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
}

export interface AlaskaRoutePreset {
  id: string;
  title: string;
  portSlugs: string[];
  tags: string[];
  description: string;
}

export interface PortDayMistake {
  portSlug: string;
  mistake: string;
  better: string;
}

export const travellerTypes: TravellerTypeOption[] = [
  { id: "whales", label: "Whale Watcher", shortLabel: "Whales", description: "Humpbacks and marine wildlife tours", icon: "🐋" },
  { id: "bears", label: "Bear Viewer", shortLabel: "Bears", description: "Brown bears at streams and sanctuaries", icon: "🐻" },
  { id: "glaciers", label: "Glacier Explorer", shortLabel: "Glaciers", description: "Fjord cruises and icefield flightseeing", icon: "🏔️" },
  { id: "eagles", label: "Eagle Watcher", shortLabel: "Eagles", description: "Bald eagles and raptor centres", icon: "🦅" },
  { id: "dog-sledding", label: "Dog Sledding", shortLabel: "Sled dogs", description: "Husky teams and glacier camps", icon: "🛷" },
  { id: "railways", label: "Railway Fan", shortLabel: "Railways", description: "White Pass and Alaska Railroad", icon: "🚂" },
  { id: "kayaking", label: "Kayaker", shortLabel: "Kayaking", description: "Paddle protected bays and fjords", icon: "🛶" },
  { id: "native-culture", label: "Culture", shortLabel: "Culture", description: "Totem parks and native heritage", icon: "🎭" },
  { id: "photography", label: "Photographer", shortLabel: "Photos", description: "Wildlife and landscape tours", icon: "📷" },
  { id: "fishing", label: "Angler", shortLabel: "Fishing", description: "Salmon and halibut charters", icon: "🎣" },
  { id: "first-time", label: "First Alaska Cruise", shortLabel: "First visit", description: "Iconic highlights without over-planning", icon: "⚓" },
];

export const fitnessLevels: { id: FitnessLevel; label: string; description: string }[] = [
  { id: "easy", label: "Easy", description: "Boat tours, rail, and short walks" },
  { id: "moderate", label: "Moderate", description: "Kayaking, stream platforms, longer hikes" },
  { id: "active", label: "Active", description: "Helicopter landings, full-day fjord boats" },
];

export const timeInPortOptions: { id: TimeInPort; label: string; hours: number }[] = [
  { id: "under-4", label: "Under 4 hours", hours: 3.5 },
  { id: "4-6", label: "4 to 6 hours", hours: 5 },
  { id: "6-8", label: "6 to 8 hours", hours: 7 },
  { id: "8-plus", label: "8+ hours", hours: 9 },
];

export const sailingMonths = ["May", "June", "July", "August", "September"];

export const popularCaribbeanRoutes: AlaskaRoutePreset[] = [
  {
    id: "inside-passage-classic",
    title: "Inside Passage Classic",
    portSlugs: ["juneau", "skagway", "ketchikan"],
    tags: ["Whales", "Railway", "Flightseeing"],
    description: "Southeast Alaska highlights on a typical 7-night loop.",
  },
  {
    id: "gulf-ending",
    title: "Gulf of Alaska Ending",
    portSlugs: ["juneau", "skagway", "seward"],
    tags: ["Glaciers", "Kenai Fjords"],
    description: "Inside Passage plus Kenai Fjords finish.",
  },
  {
    id: "wildlife-focus",
    title: "Wildlife Focus",
    portSlugs: ["juneau", "haines", "sitka", "icy-strait"],
    tags: ["Whales", "Eagles", "Bears"],
    description: "Ports prioritising marine and land wildlife.",
  },
  {
    id: "first-timer-favourites",
    title: "First-Timer Favourites",
    portSlugs: ["juneau", "skagway", "ketchikan", "seward"],
    tags: ["Iconic highlights", "Easy logistics"],
    description: "The ports most first-time Alaska cruisers remember.",
  },
];

export const portDayMistakes: PortDayMistake[] = [
  { portSlug: "ketchikan", mistake: "Booking walkable-only tours without checking Ward Cove pier", better: "Confirm downtown vs Ward Cove before booking." },
  { portSlug: "skagway", mistake: "Stacking Yukon tour and White Pass on a short port day", better: "Choose one major excursion per port." },
  { portSlug: "seward", mistake: "Booking 8-hour Kenai Fjords on a short port call", better: "Match tour length to published departure time." },
  { portSlug: "icy-strait", mistake: "Tendering late on a short Icy Strait call", better: "Tender early and pick one headline activity." },
  { portSlug: "juneau", mistake: "Stacking helicopter and full whale watch on 6-hour port", better: "One signature activity plus short town time." },
];

export const finderFaqs = [
  {
    question: "How does the Alaska Excursion Finder work?",
    answer: "Select interests, ports, and port time — the finder recommends excursions, specialist sites, and return-to-ship confidence using rules-based logic (not live booking data).",
  },
  {
    question: "Can I book excursions here?",
    answer: "This site is for planning. Use enquiry CTAs and linked specialist operators when ready to book.",
  },
  {
    question: "What do return-to-ship confidence labels mean?",
    answer: "Green fits your stated port time. Amber means confirm timings with operators. Red means avoid long tours unless you have extended port time.",
  },
];

export const featuredFinderPortSlugs = [
  "juneau",
  "skagway",
  "ketchikan",
  "seward",
  "whittier",
  "icy-strait",
  "sitka",
  "haines",
  "ward-cove",
  "denali",
];

export function getFinderPortsGroupedByRegion() {
  const grouped = new Map<string, typeof ports>();
  for (const port of ports) {
    const list = grouped.get(port.region) ?? [];
    list.push(port);
    grouped.set(port.region, list);
  }
  return [...grouped.entries()].map(([region, regionPorts]) => ({
    region,
    ports: regionPorts.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

export function getRoutePresetById(id: string): AlaskaRoutePreset | undefined {
  return popularCaribbeanRoutes.find((route) => route.id === id);
}

export function getPortComparisonRows() {
  return portExcursionAuthority.portTable.map((row) => ({
    portSlug: row.portSlug,
    portName: row.portName,
    bestFor: row.bestFor,
    topExcursion: row.bestExcursion,
    duration: row.duration,
    activityLevel: row.activityLevel,
  }));
}

export const finderCruiseLines = cruiseLines.map((line) => ({
  slug: line.slug,
  name: line.name,
}));

export const finderShips = ships.map((ship) => ({
  slug: ship.slug,
  name: ship.name,
  cruiseLineSlug: ship.cruiseLineSlug,
  commonPortSlugs: ship.commonPortSlugs,
}));
