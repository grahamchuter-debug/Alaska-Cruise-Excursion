"use client";

import { useEffect, useMemo, useState } from "react";
import type { ScheduleEntry } from "@/data/types";
import { CruiseDayLookup } from "@/components/CruiseDayLookup";
import { ScheduleTable } from "@/components/ScheduleTable";
import { getRealScheduleEntries, type PortOption } from "@/lib/cruise-day-lookup";

interface ScheduleWithCruiseDayLookupProps {
  entries: ScheduleEntry[];
  portName: string;
  portSlug?: string;
  tableTitle?: string;
  ports?: PortOption[];
  selectedPortSlug?: string;
  onPortChange?: (slug: string) => void;
}

export function ScheduleWithCruiseDayLookup({
  entries,
  portName,
  portSlug,
  tableTitle = "Schedule Table",
  ports,
  selectedPortSlug,
  onPortChange,
}: ScheduleWithCruiseDayLookupProps) {
  const [selectedDate, setSelectedDate] = useState("");

  const lookupEntries = useMemo(() => getRealScheduleEntries(entries), [entries]);

  const displayEntries = useMemo(() => {
    if (!selectedDate) return entries;
    const filtered = entries.filter((entry) => entry.date === selectedDate);
    return filtered.length > 0 ? filtered : entries;
  }, [entries, selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;
    const frame = window.requestAnimationFrame(() => {
      const firstMatch = document.querySelector(`[id^="schedule-row-${selectedDate}-"]`);
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      document.getElementById("schedule-table-anchor")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedDate, displayEntries]);

  return (
    <>
      <CruiseDayLookup
        entries={lookupEntries}
        portName={portName}
        portSlug={portSlug}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        ports={ports}
        selectedPortSlug={selectedPortSlug}
        onPortChange={onPortChange}
      />

      <section id="schedule-table-anchor" className="scroll-mt-24">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">{tableTitle}</h2>
        {selectedDate && (
          <p className="mb-4 text-sm text-gray-600">
            Showing ships scheduled for your selected cruise date. Matching rows are highlighted below.
          </p>
        )}
        <ScheduleTable
          entries={displayEntries}
          portName={portName}
          highlightedDate={selectedDate || undefined}
        />
      </section>
    </>
  );
}
