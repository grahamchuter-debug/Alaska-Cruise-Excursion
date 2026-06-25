import type { ScheduleEntry } from "@/data/types";
import { ESTIMATED_PASSENGERS_PER_CALL } from "@/data/schedule-insights";
import { getScheduleForPort } from "@/data/schedules";

export type CrowdLevel = "Quiet" | "Moderate" | "Busy" | "Very Busy";

export interface DailyScheduleSummary {
  date: string;
  displayDate: string;
  shipCount: number;
  estimatedPassengers: number;
  cruiseLines: string[];
  busiestShip: { name: string; passengers: number } | null;
  crowdLevel: CrowdLevel;
  planningNote: string;
}

export interface PortOption {
  slug: string;
  name: string;
}

export function formatScheduleDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function parsePassengerCount(value?: string): number {
  if (!value || value === "-") return ESTIMATED_PASSENGERS_PER_CALL;
  const range = value.match(/(\d[\d,]*)\s*(?:-|to)\s*(\d[\d,]*)/i);
  if (range) {
    const max = Number.parseInt(range[2].replace(/,/g, ""), 10);
    return Number.isFinite(max) && max > 0 ? max : ESTIMATED_PASSENGERS_PER_CALL;
  }
  const num = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(num) && num > 0 ? num : ESTIMATED_PASSENGERS_PER_CALL;
}

export function getRealScheduleEntries(entries: ScheduleEntry[]): ScheduleEntry[] {
  return entries.filter((entry) => !entry.isPlaceholder);
}

export function getAvailableScheduleDates(entries: ScheduleEntry[]): string[] {
  return [...new Set(getRealScheduleEntries(entries).map((entry) => entry.date))].sort();
}

export function filterEntriesByDate(entries: ScheduleEntry[], date: string): ScheduleEntry[] {
  return entries.filter((entry) => entry.date === date);
}

export function getCrowdLevel(shipCount: number, estimatedPassengers: number): CrowdLevel {
  if (shipCount >= 5 || estimatedPassengers >= 15_000) return "Very Busy";
  if (shipCount >= 3 || estimatedPassengers >= 9_000) return "Busy";
  if (shipCount >= 2 || estimatedPassengers >= 4_500) return "Moderate";
  return "Quiet";
}

export function getCrowdLevelStyles(level: CrowdLevel): {
  badge: string;
  dot: string;
} {
  switch (level) {
    case "Quiet":
      return { badge: "bg-emerald-100 text-emerald-800 border-emerald-200", dot: "bg-emerald-500" };
    case "Moderate":
      return { badge: "bg-sky-100 text-sky-800 border-sky-200", dot: "bg-sky-500" };
    case "Busy":
      return { badge: "bg-amber-100 text-amber-800 border-amber-200", dot: "bg-amber-500" };
    case "Very Busy":
      return { badge: "bg-rose-100 text-rose-800 border-rose-200", dot: "bg-rose-500" };
  }
}

export function getDailyScheduleSummary(
  entries: ScheduleEntry[],
  date: string,
  portName?: string,
): DailyScheduleSummary | null {
  const dayEntries = filterEntriesByDate(getRealScheduleEntries(entries), date);
  if (dayEntries.length === 0) return null;

  const cruiseLines = [...new Set(dayEntries.map((entry) => entry.cruiseLine))].sort();
  let estimatedPassengers = 0;
  let busiestShip: DailyScheduleSummary["busiestShip"] = null;

  for (const entry of dayEntries) {
    const passengers = parsePassengerCount(entry.passengers);
    estimatedPassengers += passengers;
    if (!busiestShip || passengers > busiestShip.passengers) {
      busiestShip = { name: entry.ship, passengers };
    }
  }

  const crowdLevel = getCrowdLevel(dayEntries.length, estimatedPassengers);
  const displayDate = formatScheduleDisplayDate(date);

  let planningNote = `Review arrival and departure times before booking ${portName ?? "port"} shore excursions.`;
  if (crowdLevel === "Very Busy") {
    planningNote =
      "Very busy port day. Book whale watching, glacier tours, and railway excursions as early as possible and allow extra return time.";
  } else if (crowdLevel === "Busy") {
    planningNote =
      "Multiple ships share the port. Morning excursion departures and pre-booked transfers reduce queue time.";
  } else if (crowdLevel === "Moderate") {
    planningNote =
      "A typical multi-ship day. Independent operators with pier pickup still offer good availability with advance booking.";
  } else {
    planningNote =
      "A lighter port day. Good conditions for private tours, scenic walks, and flexible independent bookings.";
  }

  return {
    date,
    displayDate,
    shipCount: dayEntries.length,
    estimatedPassengers,
    cruiseLines,
    busiestShip,
    crowdLevel,
    planningNote,
  };
}

export function getShipsInPortForDate(portSlug: string, date: string): ScheduleEntry[] {
  return filterEntriesByDate(getScheduleForPort(portSlug), date);
}
