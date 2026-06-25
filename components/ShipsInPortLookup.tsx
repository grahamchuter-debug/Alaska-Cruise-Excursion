"use client";

import { useMemo, useState } from "react";
import {
  getScheduleForPort,
  hasVerifiedScheduleData,
  schedulePorts,
} from "@/data/schedules";
import { ScheduleWithCruiseDayLookup } from "@/components/ScheduleWithCruiseDayLookup";

/**
 * Reusable port + date lookup for a future /ships-in-port global page.
 * Pass verified schedule ports only; hides itself when no imported data exists.
 */
export function ShipsInPortLookup() {
  const portsWithData = useMemo(
    () => schedulePorts.filter((port) => hasVerifiedScheduleData(port.slug)),
    [],
  );

  const [portSlug, setPortSlug] = useState(portsWithData[0]?.slug ?? "");
  const port = portsWithData.find((item) => item.slug === portSlug);
  const entries = useMemo(() => getScheduleForPort(portSlug), [portSlug]);

  if (!port || portsWithData.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-caribbean-50 p-6 text-center text-sm text-gray-600">
        Ships-in-port lookup will appear here once additional port schedules are imported.
      </div>
    );
  }

  return (
    <ScheduleWithCruiseDayLookup
      entries={entries}
      portName={port.name}
      portSlug={port.slug}
      tableTitle={`Ships in ${port.name}`}
      ports={portsWithData.map((item) => ({ slug: item.slug, name: item.name }))}
      selectedPortSlug={portSlug}
      onPortChange={setPortSlug}
    />
  );
}
