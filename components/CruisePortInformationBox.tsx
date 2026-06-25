import { getPortBySlug } from "@/data/ports";
import { getCruisePortNaming } from "@/data/cruise-port-naming";

export function CruisePortInformationBox({
  portSlug,
  className = "mb-10",
}: {
  portSlug: string;
  className?: string;
}) {
  const port = getPortBySlug(portSlug);
  const naming = getCruisePortNaming(portSlug);
  if (!port || !naming) return null;

  return (
    <aside
      className={`rounded-2xl border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-50 via-white to-tropical-sand/30 p-6 sm:p-8 ${className}`}
      aria-label="Cruise port information"
    >
      <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        Cruise Port Information
      </h2>
      <p className="text-sm text-gray-600 mb-5">
        Itineraries often use island or country names. This is where your ship actually docks.
      </p>
      <dl className="space-y-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Destination passengers search for
          </dt>
          <dd className="mt-1 text-base font-semibold text-gray-900">{port.name}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Where cruise ships dock
          </dt>
          <dd className="mt-1 text-base font-medium text-gray-900">{naming.dockTown}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Cruise terminals & piers
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {naming.terminals.map((terminal) => (
              <span key={terminal} className="info-badge-teal">
                {terminal}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Other names on cruise itineraries
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {naming.alternativeNames.map((name) => (
              <span key={name} className="info-label">
                {name}
              </span>
            ))}
          </dd>
        </div>
      </dl>
      {naming.tenderNote && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Tender port:</strong> {naming.tenderNote}
        </p>
      )}
    </aside>
  );
}
