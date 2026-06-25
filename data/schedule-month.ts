import type { FAQ, ScheduleEntry, ShipSchedulePort } from "./types";
import { ESTIMATED_PASSENGERS_PER_CALL } from "./schedule-insights";
import { getUniqueCruiseLines } from "@/lib/schedule-utils";
import { formatMonthLabel, getMonthName } from "@/lib/schedule-utils";
import {
  augmentMetadataDescription,
  augmentMetadataTitle,
  formatDestinationWithDock,
  getScheduleMonthHeroTitle,
} from "@/lib/cruise-port-display";

export interface MonthlyScheduleStats {
  shipCalls: number;
  estimatedPassengers: number;
  busiestDay: { date: string; count: number } | null;
  cruiseLines: string[];
  planningTip: string;
}

function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getBusiestScheduledDay(entries: ScheduleEntry[]): { date: string; count: number } | null {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    counts.set(entry.date, (counts.get(entry.date) ?? 0) + 1);
  }

  let busiest: { date: string; count: number } | null = null;
  for (const [date, count] of counts) {
    if (!busiest || count > busiest.count) {
      busiest = { date, count };
    }
  }

  return busiest;
}

export function getMonthlyScheduleStats(
  entries: ScheduleEntry[],
  port: ShipSchedulePort,
  monthKey: string,
): MonthlyScheduleStats {
  const shipCalls = entries.length;
  const busiestDay = getBusiestScheduledDay(entries);
  const cruiseLines = getUniqueCruiseLines(entries);
  const monthName = getMonthName(monthKey);

  let planningTip =
    `Review arrival and departure times for your ship before booking ${port.name} shore excursions in ${monthName}.`;

  if (busiestDay && busiestDay.count >= 3) {
    planningTip = `${formatDisplayDate(busiestDay.date)} is the busiest day this month with ${busiestDay.count} scheduled ship calls. Book whale watching, glacier tours, and popular excursions early on that date.`;
  } else if (shipCalls >= 40) {
    planningTip = `${monthName} is a high-volume month at ${port.name}. Compare independent operators that guarantee on-time pier return before choosing your port-day activities.`;
  } else if (port.usesTender) {
    planningTip = `${port.name} uses tenders. On ${monthName} port days, allow 20-40 minutes each way and keep 60-90 minutes before published departure.`;
  }

  return {
    shipCalls,
    estimatedPassengers: shipCalls * ESTIMATED_PASSENGERS_PER_CALL,
    busiestDay,
    cruiseLines,
    planningTip,
  };
}

export function getMonthlyScheduleFaqs(
  port: ShipSchedulePort,
  monthKey: string,
  entries: ScheduleEntry[],
): FAQ[] {
  const monthLabel = formatMonthLabel(monthKey);
  const uniqueShips = [...new Set(entries.map((entry) => entry.ship))].sort();
  const shipList =
    uniqueShips.length <= 8
      ? uniqueShips.join(", ")
      : `${uniqueShips.slice(0, 8).join(", ")}, and ${uniqueShips.length - 8} more`;

  return [
    {
      question: `Which cruise ships visit ${port.name} in ${monthLabel}?`,
      answer:
        uniqueShips.length > 0
          ? `This page lists ${uniqueShips.length} scheduled vessel${uniqueShips.length !== 1 ? "s" : ""} in ${monthLabel}, including ${shipList}. Use the schedule table for exact arrival and departure times.`
          : `No verified ship calls are listed for ${port.name} in ${monthLabel}.`,
    },
    {
      question: "How accurate are cruise ship schedules?",
      answer:
        "Published schedules are planning guides sourced from verified imports. They are not guaranteed. Weather, tender conditions, and cruise line itinerary changes can alter arrival and departure times.",
    },
    {
      question: "Can arrival and departure times change?",
      answer:
        "Yes. Cruise lines and port authorities adjust times for weather, pier traffic, tender operations, and operational delays. Check your ship's daily program on port day before disembarking.",
    },
    {
      question: "How early should I book a shore excursion?",
      answer:
        `Once you confirm your ship's in-port window from this ${monthLabel} schedule, book must-do tours at least one to two weeks ahead on busy call days. Popular whale watching, glacier, and wildlife excursions sell out fastest when multiple ships share the port.`,
    },
    {
      question: "How much time should I leave before returning to the ship?",
      answer:
        "Plan to be at the terminal or tender pickup point 30-60 minutes before published departure. Add extra buffer on tender ports, full-day tours, and dates with multiple ships in port.",
    },
  ];
}

export function getMonthlyPageTitle(
  portName: string,
  monthKey: string,
  portSlug?: string,
): string {
  if (portSlug) return getScheduleMonthHeroTitle(portSlug, portName, monthKey);
  return `${portName} Cruise Ship Schedule, ${formatMonthLabel(monthKey)}`;
}

export function getMonthlySeoTitle(
  portName: string,
  monthKey: string,
  portSlug?: string,
): string {
  const monthLabel = formatMonthLabel(monthKey);
  const destination = portSlug ? formatDestinationWithDock(portName, portSlug) : portName;
  return `${destination} Cruise Ship Schedule ${monthLabel} | Cruise Calls & Port Times`;
}

export function getMonthlyMetaDescription(
  portName: string,
  monthKey: string,
  shipCalls: number,
  portSlug?: string,
): string {
  const monthLabel = formatMonthLabel(monthKey);
  const callNote =
    shipCalls > 0
      ? `${shipCalls} scheduled cruise call${shipCalls !== 1 ? "s" : ""}`
      : "scheduled cruise calls";
  const baseDescription = `View the ${portName} cruise ship schedule for ${monthLabel}, including ${callNote}, arrival times, departure times and planning tips for shore excursions.`;
  return portSlug
    ? augmentMetadataDescription(baseDescription, portSlug, "schedule")
    : baseDescription;
}
