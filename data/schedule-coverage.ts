import { getAllSchedulePortSlugs, getSchedulePortBySlug, hasVerifiedScheduleData } from "./schedules";

export type ScheduleCoverageStatus = "live" | "coming-soon" | "framework";

/** Ports with verified imported ship-call rows in data/imported-schedules. */
export function getLiveImportedSchedulePorts(): string[] {
  return getAllSchedulePortSlugs().filter((slug) => hasVerifiedScheduleData(slug));
}

export function isLiveImportedSchedulePort(slug: string): boolean {
  return hasVerifiedScheduleData(slug);
}

export function getScheduleCoverageStatus(slug: string): ScheduleCoverageStatus {
  if (hasVerifiedScheduleData(slug)) return "live";
  return "coming-soon";
}

export function getLiveImportedPortCount(): number {
  return getLiveImportedSchedulePorts().length;
}

const HOMEPAGE_SCHEDULE_SLUGS = ["juneau", "skagway", "ketchikan", "seward"] as const;

export function getHomepageScheduleFeatured() {
  return HOMEPAGE_SCHEDULE_SLUGS.map((slug) => ({
    slug,
    status: hasVerifiedScheduleData(slug) ? ("live" as const) : ("coming-soon" as const),
  }));
}

export const SCHEDULE_IMPORT_QUEUE = [
  "ketchikan",
  "seward",
  "whittier",
  "haines",
  "sitka",
  "icy-strait",
  "ward-cove",
] as const;

function formatPortName(slug: string): string {
  return getSchedulePortBySlug(slug)?.name ?? slug.replace(/-/g, " ");
}

export function getScheduleCoverageSummary(): string {
  const live = getLiveImportedSchedulePorts().map(formatPortName);
  if (live.length === 0) {
    return "Verified Alaska ship schedules are imported port by port — we never show placeholder sailings. Hub pages are live while monthly data is checked and published.";
  }
  if (live.length === 1) {
    return `${live[0]} has live imported ship schedules on this site today. Other Alaska hub ports have framework pages while monthly data is imported and verified — we never show placeholder sailings.`;
  }
  const last = live.pop();
  return `${live.join(", ")} and ${last} have live imported ship schedules. Remaining hub ports update as monthly imports are verified — we never show placeholder sailings.`;
}

/** @deprecated Use getLiveImportedSchedulePorts() */
export function getLiveImportedSchedulePortSlugs(): string[] {
  return getLiveImportedSchedulePorts();
}
