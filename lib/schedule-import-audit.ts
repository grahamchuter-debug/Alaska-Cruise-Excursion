import type { ScheduleEntry } from "@/data/types";
import { getAllSchedulePortSlugs, getScheduleForPort, portSchedules } from "@/data/schedules";

export interface ScheduleRowIssue {
  portSlug: string;
  index: number;
  date?: string;
  ship?: string;
  issues: string[];
}

export interface ScheduleImportAudit {
  portSlug: string;
  totalRows: number;
  verifiedRows: number;
  placeholderRows: number;
  invalidRows: ScheduleRowIssue[];
}

function validateEntry(entry: ScheduleEntry, index: number, portSlug: string): ScheduleRowIssue | null {
  if (entry.isPlaceholder) return null;

  const issues: string[] = [];
  if (!entry.date || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    issues.push("invalid or missing date (YYYY-MM-DD)");
  }
  if (!entry.ship?.trim()) issues.push("missing ship name");
  if (!entry.cruiseLine?.trim()) issues.push("missing cruise line");
  if (!entry.arrival?.trim()) issues.push("missing arrival time");
  if (!entry.departure?.trim()) issues.push("missing departure time");

  if (issues.length === 0) return null;

  return {
    portSlug,
    index,
    date: entry.date,
    ship: entry.ship,
    issues,
  };
}

export function auditScheduleImports(): ScheduleImportAudit[] {
  return getAllSchedulePortSlugs().map((portSlug) => {
    const entries = portSchedules[portSlug] ?? [];
    const invalidRows: ScheduleRowIssue[] = [];

    entries.forEach((entry, index) => {
      const issue = validateEntry(entry, index, portSlug);
      if (issue) invalidRows.push(issue);
    });

    return {
      portSlug,
      totalRows: entries.length,
      verifiedRows: entries.filter((e) => !e.isPlaceholder).length,
      placeholderRows: entries.filter((e) => e.isPlaceholder).length,
      invalidRows,
    };
  });
}

export function getVerifiedCallCount(portSlug: string, year?: number): number {
  const entries = getScheduleForPort(portSlug).filter((e) => !e.isPlaceholder);
  if (!year) return entries.length;
  return entries.filter((e) => e.date.startsWith(`${year}-`)).length;
}

