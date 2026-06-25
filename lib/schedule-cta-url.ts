import { hasVerifiedScheduleDataForMonth } from "@/data/schedules";
import { hasShipSchedule } from "@/lib/routes";
import {
  MONTH_LABELS,
  SCHEDULE_YEARS,
  getMonthKey,
  isValidScheduleYear,
  portHubPath,
  portMonthPath,
  portYearPath,
  type ScheduleYear,
} from "@/lib/schedule-utils";

export const SCHEDULE_MONTH_FALLBACK_NOTE =
  "Cruise schedule information is updated regularly — open the port schedule hub for the latest monthly calls.";

export const SCHEDULE_YEAR_FALLBACK_NOTE =
  "Cruise schedule information is updated regularly — view the live port schedule for current sailing dates.";

export interface ScheduleCtaInput {
  portSlug: string;
  year?: number | string | null;
  month?: number | string | null;
}

export interface ScheduleCtaResult {
  href: string;
  fallbackNote?: string;
}

function parseYearNumber(year: number | string): number | null {
  const value = typeof year === "number" ? year : Number(String(year).trim());
  return Number.isInteger(value) ? value : null;
}

function parseMonthNumber(month: number | string): number | null {
  if (typeof month === "number") {
    return month >= 1 && month <= 12 ? month : null;
  }

  const trimmed = month.trim();

  const asNumber = Number(trimmed);
  if (Number.isInteger(asNumber) && asNumber >= 1 && asNumber <= 12) {
    return asNumber;
  }

  const monthIndex = MONTH_LABELS.findIndex(
    (label) => label.toLowerCase() === trimmed.toLowerCase(),
  );
  return monthIndex >= 0 ? monthIndex + 1 : null;
}

function findVerifiedMonthKey(portSlug: string, month: number): string | null {
  for (const year of SCHEDULE_YEARS) {
    const monthKey = getMonthKey(year, month);
    if (hasVerifiedScheduleDataForMonth(portSlug, monthKey)) {
      return monthKey;
    }
  }
  return null;
}

export function getBestScheduleUrl(input: ScheduleCtaInput): ScheduleCtaResult | null {
  if (!hasShipSchedule(input.portSlug)) {
    return null;
  }

  const year =
    input.year != null && input.year !== "" ? parseYearNumber(input.year) : null;
  const month =
    input.month != null && input.month !== "" ? parseMonthNumber(input.month) : null;

  if (month && year && isValidScheduleYear(year)) {
    const monthKey = getMonthKey(year, month);
    if (hasVerifiedScheduleDataForMonth(input.portSlug, monthKey)) {
      return { href: portMonthPath(input.portSlug, monthKey) };
    }

    return {
      href: portYearPath(input.portSlug, year as ScheduleYear),
      fallbackNote: SCHEDULE_MONTH_FALLBACK_NOTE,
    };
  }

  if (month && (!year || !isValidScheduleYear(year))) {
    const verifiedMonthKey = findVerifiedMonthKey(input.portSlug, month);
    if (verifiedMonthKey) {
      return {
        href: portMonthPath(input.portSlug, verifiedMonthKey),
        ...(year && !isValidScheduleYear(year)
          ? { fallbackNote: SCHEDULE_YEAR_FALLBACK_NOTE }
          : {}),
      };
    }

    return {
      href: portHubPath(input.portSlug),
      fallbackNote: SCHEDULE_MONTH_FALLBACK_NOTE,
    };
  }

  if (year && isValidScheduleYear(year)) {
    return { href: portYearPath(input.portSlug, year as ScheduleYear) };
  }

  if (year) {
    return {
      href: portHubPath(input.portSlug),
      fallbackNote: SCHEDULE_YEAR_FALLBACK_NOTE,
    };
  }

  return { href: portHubPath(input.portSlug) };
}
