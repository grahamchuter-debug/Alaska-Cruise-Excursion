import Link from "next/link";
import { regions } from "@/data/regions";
import { bestGuides } from "@/data/best-guides";
import { comparisons } from "@/data/comparisons";
import { cruiseLines } from "@/data/cruise-lines";
import { hasShipSchedule } from "@/lib/routes";

const hubLinks = [
  { href: "/", label: "Homepage" },
  { href: "/ports", label: "All Ports" },
  { href: "/excursion-types", label: "Activities" },
  { href: "/ship-schedules", label: "Ship Schedules" },
  { href: "/alaska-cruise-excursion-planner", label: "Excursion Finder" },
  { href: "/alaska-cruise-lines", label: "Cruise Lines" },
  { href: "/alaska-cruise-ships", label: "Ships" },
  { href: "/best-alaska-guides", label: "Best Guides" },
] as const;

export function AuthorityHubLinks({
  current,
  portSlug,
}: {
  current?: "ports" | "schedules" | "regions" | "home";
  portSlug?: string;
}) {
  return (
    <section className="rounded-xl border border-caribbean-100 bg-caribbean-50/50 p-6">
      <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Alaska Authority Hub</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {hubLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-caribbean-700 border border-caribbean-100 hover:border-caribbean-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="mb-4">
        <Link
          href="/best-alaska-shore-excursions"
          className="block rounded-lg bg-caribbean-700 text-white px-4 py-3 text-sm font-semibold hover:bg-caribbean-800 mb-3"
        >
          Best Alaska shore excursions →
        </Link>
      </div>

      <div className="mb-4">
        <span className="text-xs text-gray-500 w-full mb-2 block">Authority guides</span>
        <div className="flex flex-wrap gap-2">
          {bestGuides.slice(0, 5).map((guide) => (
            <Link
              key={guide.slug}
              href={`/${guide.slug}`}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
            >
              {guide.title.replace("Best Alaska ", "").replace("Alaska ", "")}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-xs text-gray-500 w-full mb-2 block">Cruise lines</span>
        <div className="flex flex-wrap gap-2">
          {cruiseLines.map((line) => (
            <Link
              key={line.slug}
              href={`/alaska-cruise-lines/${line.slug}`}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
            >
              {line.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-xs text-gray-500 w-full mb-2 block">Port comparisons</span>
        <div className="flex flex-wrap gap-2">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/${comp.slug}`}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
            >
              {comp.portA} vs {comp.portB}
            </Link>
          ))}
        </div>
      </div>

      {current === "schedules" && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 w-full mb-1">Schedule years</span>
          <Link href="/ship-schedules/2026" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-caribbean-700 border border-caribbean-100">
            2026 Schedules
          </Link>
          <Link href="/ship-schedules/2027" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-caribbean-700 border border-caribbean-100">
            2027 Schedules
          </Link>
        </div>
      )}

      {current !== "regions" && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 w-full mb-1">Region guides</span>
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/${region.slug}`}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 hover:border-caribbean-200"
            >
              {region.title.replace(" Guide", "")}
            </Link>
          ))}
        </div>
      )}
      {portSlug && (
        <div className="mt-3 flex flex-wrap gap-2">
          {current !== "ports" && (
            <Link href={`/ports/${portSlug}`} className="btn-secondary text-xs">
              Port Authority Guide
            </Link>
          )}
          {hasShipSchedule(portSlug) && (
            <Link href={`/ship-schedules/${portSlug}`} className="btn-secondary text-xs">
              Ship Schedule
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
