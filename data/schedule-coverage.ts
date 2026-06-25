import { hasVerifiedScheduleData } from "./schedules";

/** Ports with verified imported ship-call data live on the site. */
export const LIVE_IMPORTED_SCHEDULE_PORTS = ["juneau"] as const;

export type LiveImportedSchedulePort = (typeof LIVE_IMPORTED_SCHEDULE_PORTS)[number];

/** Featured on the homepage schedule section — only Juneau is live today. */
export const HOMEPAGE_SCHEDULE_FEATURED = [
  { slug: "juneau", status: "live" as const },
  { slug: "skagway", status: "coming-soon" as const },
  { slug: "ketchikan", status: "coming-soon" as const },
  { slug: "seward", status: "coming-soon" as const },
] as const;

export const SCHEDULE_IMPORT_QUEUE = [
  "skagway",
  "ketchikan",
  "seward",
  "whittier",
  "haines",
  "sitka",
  "icy-strait",
  "ward-cove",
] as const;

export type ScheduleCoverageStatus = "live" | "coming-soon" | "framework";

export function isLiveImportedSchedulePort(slug: string): slug is LiveImportedSchedulePort {
  return LIVE_IMPORTED_SCHEDULE_PORTS.includes(slug as LiveImportedSchedulePort);
}

export function getScheduleCoverageStatus(slug: string): ScheduleCoverageStatus {
  if (isLiveImportedSchedulePort(slug)) return "live";
  if (hasVerifiedScheduleData(slug)) return "live";
  return "coming-soon";
}

export function getLiveImportedPortCount(): number {
  return LIVE_IMPORTED_SCHEDULE_PORTS.filter((slug) => hasVerifiedScheduleData(slug)).length;
}

export const SCHEDULE_COVERAGE_SUMMARY =
  "Juneau is the only Alaska port with live imported ship schedules today. Skagway, Ketchikan, Seward, and other hub ports have framework pages while monthly data is imported and verified — we never show placeholder sailings.";
