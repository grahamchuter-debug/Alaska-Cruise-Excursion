import type { ScheduleEntry } from "@/data/types";
import { ShipNameLink } from "@/components/ShipNameLink";

function getEntryNotes(entry: ScheduleEntry): string {
  if (entry.notes) return entry.notes;
  if (entry.cruiseLine.toLowerCase().includes("verify")) return "Verify with cruise line";
  return "n/a";
}

export function ScheduleTable({
  entries,
  portName,
  showNotes = false,
  highlightedDate,
}: {
  entries: ScheduleEntry[];
  portName?: string;
  showNotes?: boolean;
  highlightedDate?: string;
}) {
  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-caribbean-50 p-8 text-center">
        <p className="text-gray-700 font-medium">
          Alaska cruise ship schedule for {portName ?? "this port"} is coming soon.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Verified ship calls will appear here once imported. We do not publish placeholder sailings
          — confirm times with your cruise line before booking excursions.
        </p>
      </div>
    );
  }

  const realEntries = entries.filter((e) => !e.isPlaceholder);
  const shipCount = realEntries.length;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-caribbean-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Ship</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Cruise Line</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Arrival</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Departure</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Time in Port</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Passenger Capacity</th>
            {showNotes && (
              <th className="px-4 py-3 text-left text-sm font-semibold">Notes</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {entries.map((entry, i) => {
            const isHighlighted = Boolean(highlightedDate && entry.date === highlightedDate);
            return (
            <tr
              key={`${entry.date}-${entry.ship}-${i}`}
              id={isHighlighted ? `schedule-row-${entry.date}-${i}` : undefined}
              className={
                entry.isPlaceholder
                  ? "bg-amber-50/80"
                  : isHighlighted
                    ? "bg-caribbean-100 ring-2 ring-inset ring-caribbean-400"
                    : undefined
              }
            >
              <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{entry.date}</td>
              <td className="px-4 py-3 text-sm">
                <ShipNameLink name={entry.ship} />
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{entry.cruiseLine}</td>
              <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{entry.arrival}</td>
              <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{entry.departure}</td>
              <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                {entry.timeInPort ?? "n/a"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{entry.passengers ?? "n/a"}</td>
              {showNotes && (
                <td className="px-4 py-3 text-sm text-gray-600">{getEntryNotes(entry)}</td>
              )}
            </tr>
          );
          })}
        </tbody>
      </table>
      <p className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
        {entries.some((e) => e.isPlaceholder)
          ? "Placeholder rows indicate months awaiting verified schedule import. Arrival and departure times are subject to change."
          : `${shipCount} ship${shipCount !== 1 ? "s" : ""} scheduled. Arrivals and departures are subject to change by cruise lines and port authorities.`}
      </p>
    </div>
  );
}
