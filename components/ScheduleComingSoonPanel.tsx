import Link from "next/link";
import { getPortBySlug } from "@/data/ports";
import { SpecialistPartnerCard } from "@/components/SpecialistPartnerCard";
import { NavCardCta } from "@/components/NavCardCta";

interface ScheduleComingSoonPanelProps {
  portSlug: string;
  portName: string;
  variant?: "hub" | "year";
  year?: number;
}

export function ScheduleComingSoonPanel({
  portSlug,
  portName,
  variant = "hub",
  year,
}: ScheduleComingSoonPanelProps) {
  const port = getPortBySlug(portSlug);

  return (
    <section className="mb-12 rounded-2xl border-2 border-dashed border-caribbean-200 bg-gradient-to-br from-caribbean-50/80 via-white to-tropical-sand/20 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">Schedule import pending</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
        {portName} ship schedule coming soon
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
        {variant === "year" && year
          ? `Verified ${year} ship calls for ${portName} are not published yet. We do not show placeholder sailings — monthly tables will appear here after import and review.`
          : `Verified ship schedules for ${portName} are being imported. Use the resources below to plan your port day while monthly data is prepared.`}
      </p>
      <p className="mt-3 text-sm text-gray-600">
        See a live example on the{" "}
        <Link href="/ship-schedules/juneau" className="font-medium text-caribbean-700 hover:underline">
          Juneau cruise ship schedule
        </Link>{" "}
        — Alaska&apos;s only port with imported data today.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href={`/ports/${portSlug}`} className="card-gradient group flex h-full flex-col hover:border-caribbean-300">
          <h3 className="font-semibold text-gray-900">{portName} port guide</h3>
          <p className="mt-2 text-sm text-gray-600 flex-1">
            Dock logistics, top excursions, and passenger tips for your cruise day.
          </p>
          <NavCardCta className="pt-4">Open port guide</NavCardCta>
        </Link>

        <Link
          href="/alaska-cruise-excursion-planner"
          className="card-gradient group flex h-full flex-col hover:border-caribbean-300"
        >
          <h3 className="font-semibold text-gray-900">Alaska cruise planner</h3>
          <p className="mt-2 text-sm text-gray-600 flex-1">
            Match whales, bears, glaciers, and railways to your ports and sailing month.
          </p>
          <NavCardCta className="pt-4">Open excursion finder</NavCardCta>
        </Link>

        <Link
          href="/best-alaska-shore-excursions"
          className="card-gradient group flex h-full flex-col hover:border-caribbean-300"
        >
          <h3 className="font-semibold text-gray-900">Best Alaska shore excursions</h3>
          <p className="mt-2 text-sm text-gray-600 flex-1">
            Authority-ranked wildlife, glacier, and railway guides across Alaska ports.
          </p>
          <NavCardCta className="pt-4">Browse best guides</NavCardCta>
        </Link>

        {port && (
          <div>
            <SpecialistPartnerCard portSlug={portSlug} variant="compact" hidePortGuideLink />
          </div>
        )}
      </div>
    </section>
  );
}
