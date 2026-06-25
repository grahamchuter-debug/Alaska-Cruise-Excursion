import type { ScheduleEntry, ShipSchedulePort } from "./types";
import { getPassengerCapacityLabel } from "@/lib/ship-capacities";
import {
  filterEntriesByMonth,
  getMonthsWithEntries,
  monthKeyToSlug,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import { SCHEDULE_FAQS, SCHEDULE_PLANNING_TIPS } from "./schedule-content";
import juneauSchedule from "./imported-schedules/juneau.json";
import skagwaySchedule from "./imported-schedules/skagway.json";
import ketchikanSchedule from "./imported-schedules/ketchikan.json";
import wardCoveSchedule from "./imported-schedules/ward-cove.json";
import icyStraitSchedule from "./imported-schedules/icy-strait.json";
import sitkaSchedule from "./imported-schedules/sitka.json";
import hainesSchedule from "./imported-schedules/haines.json";
import sewardSchedule from "./imported-schedules/seward.json";
import whittierSchedule from "./imported-schedules/whittier.json";

export const TOP_SCHEDULE_PORT_SLUGS = [
  "juneau",
  "ketchikan",
  "skagway",
  "seward",
  "whittier",
  "icy-strait",
  "sitka",
  "haines",
  "ward-cove",
] as const;

const scheduleMeta = (
  slug: string,
  name: string,
  description: string,
  relatedPortSlugs: string[],
  excursionTypeSlugs: string[],
  extra?: Partial<ShipSchedulePort>,
): ShipSchedulePort => ({
  slug,
  name,
  country: "United States (Alaska)",
  seoTitle: `${name} Cruise Ship Schedule 2026 & 2027`,
  metaDescription: `${name} Alaska cruise ship schedule — browse port calls by month and year. Plan shore excursions around arrival and departure times when verified data is available.`,
  intro: `This ${name} cruise ship schedule page helps Alaska cruise passengers plan shore excursions around published port times. Browse by year and month as verified schedule data is imported — no placeholder sailings are shown.`,
  description,
  scheduleOverview: `Schedule analytics (busiest months, top ships, and cruise lines) populate automatically when verified ${name} port call data is imported. Use this hub to link excursion planning with your ship's arrival window.`,
  relatedPortSlugs,
  excursionTypeSlugs,
  planningTips: [...SCHEDULE_PLANNING_TIPS],
  faqs: SCHEDULE_FAQS,
  ...extra,
});

export const schedulePorts: ShipSchedulePort[] = [
  scheduleMeta(
    "juneau",
    "Juneau",
    "Alaska's busiest cruise port with downtown docking.",
    ["skagway", "ketchikan", "icy-strait"],
    ["whale-watching", "glacier-tours", "flightseeing", "dog-sledding"],
    {
      seoTitle: "Juneau Cruise Ship Schedule 2026 & 2027 | Ships in Port Alaska",
      metaDescription:
        "Juneau Alaska cruise ship schedule with verified 2026 and 2027 port calls. See ships in port by month, plan whale watching and glacier excursions around arrival and departure times.",
    },
  ),
  scheduleMeta(
    "skagway",
    "Skagway",
    "White Pass Railway port at the head of Taiya Inlet.",
    ["haines", "juneau", "ketchikan"],
    ["railway-tours", "dog-sledding", "flightseeing", "glacier-tours"],
  ),
  scheduleMeta(
    "ketchikan",
    "Ketchikan",
    "Inside Passage port with downtown berths and totem heritage.",
    ["ward-cove", "juneau", "sitka"],
    ["bear-viewing", "flightseeing", "fishing", "native-culture"],
  ),
  scheduleMeta(
    "ward-cove",
    "Ward Cove",
    "Ketchikan-area berth for larger vessels — confirm pier before booking walkable tours.",
    ["ketchikan", "juneau", "sitka"],
    ["flightseeing", "bear-viewing", "fishing", "native-culture"],
  ),
  scheduleMeta(
    "icy-strait",
    "Icy Strait",
    "Tender port at Icy Strait Point near Hoonah.",
    ["juneau", "sitka", "haines"],
    ["whale-watching", "bear-viewing", "native-culture", "wildlife-cruises"],
    { usesTender: true, planningTips: [...SCHEDULE_PLANNING_TIPS, "Icy Strait uses tenders — add 20-30 minutes each way when planning return times."] },
  ),
  scheduleMeta(
    "sitka",
    "Sitka",
    "Baranof Island port with tender or dock landings.",
    ["juneau", "ketchikan", "haines"],
    ["bear-viewing", "whale-watching", "native-culture", "photography"],
    { usesTender: true },
  ),
  scheduleMeta(
    "haines",
    "Haines",
    "Eagle and Chilkoot Lake port — often paired with Skagway on itineraries.",
    ["skagway", "juneau", "icy-strait"],
    ["bear-viewing", "photography", "kayaking", "wildlife-cruises"],
  ),
  scheduleMeta(
    "seward",
    "Seward",
    "Gulf of Alaska gateway to Kenai Fjords National Park.",
    ["whittier", "juneau", "haines"],
    ["wildlife-cruises", "glacier-tours", "fishing", "dog-sledding"],
  ),
  scheduleMeta(
    "whittier",
    "Whittier",
    "Prince William Sound port connected to Anchorage via tunnel.",
    ["seward", "juneau", "haines"],
    ["glacier-tours", "wildlife-cruises", "railway-tours", "kayaking"],
  ),
];

export const portSchedules: Record<string, ScheduleEntry[]> = {
  juneau: juneauSchedule as ScheduleEntry[],
  skagway: skagwaySchedule as ScheduleEntry[],
  ketchikan: ketchikanSchedule as ScheduleEntry[],
  "ward-cove": wardCoveSchedule as ScheduleEntry[],
  "icy-strait": icyStraitSchedule as ScheduleEntry[],
  sitka: sitkaSchedule as ScheduleEntry[],
  haines: hainesSchedule as ScheduleEntry[],
  seward: sewardSchedule as ScheduleEntry[],
  whittier: whittierSchedule as ScheduleEntry[],
};

export function getSchedulePortBySlug(slug: string): ShipSchedulePort | undefined {
  return schedulePorts.find((p) => p.slug === slug);
}

function enrichScheduleEntry(entry: ScheduleEntry): ScheduleEntry {
  if (entry.passengers && entry.passengers !== "-") return entry;
  const passengers = getPassengerCapacityLabel(entry.ship);
  return passengers ? { ...entry, passengers } : entry;
}

export function getScheduleForPort(slug: string): ScheduleEntry[] {
  return (portSchedules[slug] ?? []).map(enrichScheduleEntry);
}

export function getScheduleForPortYear(slug: string, year: number): ScheduleEntry[] {
  const prefix = `${year}-`;
  return getScheduleForPort(slug).filter((entry) => entry.date.startsWith(prefix));
}

export function getShipCallCountForPortYear(slug: string, year: number): number {
  return getScheduleForPortYear(slug, year).filter((entry) => !entry.isPlaceholder).length;
}

export function getAllSchedulePortSlugs(): string[] {
  return schedulePorts.map((p) => p.slug);
}

export function hasVerifiedScheduleData(slug: string): boolean {
  return (portSchedules[slug] ?? []).some((e) => !e.isPlaceholder);
}

export function hasVerifiedScheduleDataForYear(slug: string, year: number): boolean {
  return getShipCallCountForPortYear(slug, year) > 0;
}

export function getVerifiedScheduleEntriesForMonth(
  slug: string,
  monthKey: string,
): ScheduleEntry[] {
  return filterEntriesByMonth(getScheduleForPort(slug), monthKey).filter(
    (entry) => !entry.isPlaceholder,
  );
}

export function getVerifiedMonthKeysForPort(slug: string): string[] {
  return getMonthsWithEntries(getScheduleForPort(slug));
}

export function getVerifiedMonthKeysForPortYear(slug: string, year: ScheduleYear): string[] {
  return getVerifiedMonthKeysForPort(slug).filter((key) => key.startsWith(`${year}-`));
}

export function getAllVerifiedMonthPageParams(): { slug: string; period: string }[] {
  return getAllSchedulePortSlugs().flatMap((slug) =>
    getVerifiedMonthKeysForPort(slug).map((monthKey) => ({
      slug,
      period: monthKeyToSlug(monthKey),
    })),
  );
}

export function hasVerifiedScheduleDataForMonth(slug: string, monthKey: string): boolean {
  return getVerifiedScheduleEntriesForMonth(slug, monthKey).length > 0;
}

export function getScheduleStatus(slug: string): "empty" | "partial" | "verified" {
  const entries = portSchedules[slug] ?? [];
  if (entries.length === 0) return "empty";
  const hasReal = entries.some((e) => !e.isPlaceholder);
  return hasReal ? "verified" : "partial";
}
