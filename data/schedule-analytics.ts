import type { ScheduleEntry } from "./types";
import type { ScheduleYear } from "@/lib/schedule-utils";
import { getEntryMonthKey } from "@/lib/schedule-utils";
import {
  getAllSchedulePortSlugs,
  getScheduleForPort,
  getScheduleForPortYear,
  getSchedulePortBySlug,
  getShipCallCountForPortYear,
  schedulePorts,
} from "./schedules";

export interface CountRow {
  label: string;
  count: number;
  slug?: string;
  href?: string;
}

export interface PortCallSummary {
  slug: string;
  name: string;
  count: number;
  hasVerifiedData: boolean;
}

export interface CruiseLineSummary {
  cruiseLine: string;
  count: number;
  ports: string[];
}

export interface ShipSummary {
  ship: string;
  cruiseLine: string;
  count: number;
  ports: string[];
}

function verifiedEntries(entries: ScheduleEntry[]): ScheduleEntry[] {
  return entries.filter((entry) => !entry.isPlaceholder);
}

export function getTotalCallsByPort(slug: string): number {
  return verifiedEntries(getScheduleForPort(slug)).length;
}

export function getTotalCallsByYear(year: number): number {
  return getAllSchedulePortSlugs().reduce(
    (sum, slug) => sum + getShipCallCountForPortYear(slug, year),
    0,
  );
}

export function getTotalCallsByMonth(monthKey: string): number {
  return schedulePorts.reduce((sum, port) => {
    return (
      sum +
      verifiedEntries(getScheduleForPort(port.slug)).filter(
        (entry) => getEntryMonthKey(entry) === monthKey,
      ).length
    );
  }, 0);
}

export function getBusiestPorts(limit = 10, year?: number): PortCallSummary[] {
  return getAllSchedulePortSlugs()
    .map((slug) => {
      const port = getSchedulePortBySlug(slug);
      const count = year
        ? getShipCallCountForPortYear(slug, year)
        : getTotalCallsByPort(slug);
      return {
        slug,
        name: port?.name ?? slug,
        count,
        hasVerifiedData: count > 0,
      };
    })
    .filter((row) => row.hasVerifiedData)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getBusiestMonths(year: number, limit = 12): CountRow[] {
  const totals = new Map<string, number>();
  for (const port of schedulePorts) {
    for (const entry of getScheduleForPortYear(port.slug, year)) {
      const monthKey = getEntryMonthKey(entry);
      totals.set(monthKey, (totals.get(monthKey) ?? 0) + 1);
    }
  }
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([monthKey, count]) => ({ label: monthKey, count }));
}

export function getMostFrequentShips(year?: number, limit = 10): ShipSummary[] {
  const counts = new Map<string, { ship: string; cruiseLine: string; count: number; ports: Set<string> }>();

  for (const port of schedulePorts) {
    const entries = year ? getScheduleForPortYear(port.slug, year) : getScheduleForPort(port.slug);
    for (const entry of verifiedEntries(entries)) {
      const key = entry.ship.toLowerCase();
      const existing = counts.get(key);
      if (existing) {
        existing.count += 1;
        existing.ports.add(port.slug);
      } else {
        counts.set(key, {
          ship: entry.ship,
          cruiseLine: entry.cruiseLine,
          count: 1,
          ports: new Set([port.slug]),
        });
      }
    }
  }

  return [...counts.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((row) => ({
      ship: row.ship,
      cruiseLine: row.cruiseLine,
      count: row.count,
      ports: [...row.ports],
    }));
}

export function getMostFrequentCruiseLines(year?: number, limit = 10): CruiseLineSummary[] {
  const counts = new Map<string, { cruiseLine: string; count: number; ports: Set<string> }>();

  for (const port of schedulePorts) {
    const entries = year ? getScheduleForPortYear(port.slug, year) : getScheduleForPort(port.slug);
    for (const entry of verifiedEntries(entries)) {
      const line = entry.cruiseLine || "Unknown";
      const existing = counts.get(line);
      if (existing) {
        existing.count += 1;
        existing.ports.add(port.slug);
      } else {
        counts.set(line, { cruiseLine: line, count: 1, ports: new Set([port.slug]) });
      }
    }
  }

  return [...counts.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((row) => ({
      cruiseLine: row.cruiseLine,
      count: row.count,
      ports: [...row.ports],
    }));
}

export function getSchedulesByPortYearMonth(
  portSlug: string,
  year: ScheduleYear,
  monthKey: string,
): ScheduleEntry[] {
  return verifiedEntries(getScheduleForPortYear(portSlug, year)).filter(
    (entry) => getEntryMonthKey(entry) === monthKey,
  );
}

export function getFutureCallsByShip(shipName: string, fromDate = new Date()): ScheduleEntry[] {
  const isoToday = fromDate.toISOString().slice(0, 10);
  const needle = shipName.toLowerCase();
  return schedulePorts
    .flatMap((port) => getScheduleForPort(port.slug))
    .filter(
      (entry) =>
        !entry.isPlaceholder &&
        entry.ship.toLowerCase().includes(needle) &&
        entry.date >= isoToday,
    )
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getCruiseLineSummaries(year?: number): CruiseLineSummary[] {
  return getMostFrequentCruiseLines(year, 20);
}

export function getVerifiedCallTotalsByYear(): Record<ScheduleYear, number> {
  return {
    2026: getTotalCallsByYear(2026),
    2027: getTotalCallsByYear(2027),
  };
}

export function getVerifiedCallTotalsByPort(): PortCallSummary[] {
  return getAllSchedulePortSlugs()
    .map((slug) => {
      const port = getSchedulePortBySlug(slug);
      const count = getTotalCallsByPort(slug);
      return { slug, name: port?.name ?? slug, count, hasVerifiedData: count > 0 };
    })
    .sort((a, b) => b.count - a.count);
}

export function getMonthsWithVerifiedCalls(year: number): CountRow[] {
  return getBusiestMonths(year, 12)
    .filter((row) => row.label.startsWith(`${year}-`))
    .sort((a, b) => a.label.localeCompare(b.label));
}
