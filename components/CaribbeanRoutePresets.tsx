import Link from "next/link";
import { popularCaribbeanRoutes } from "@/data/excursion-finder";
import { getPortBySlug } from "@/data/ports";
import { NavCardIcon } from "@/components/NavCardIcon";
import { NavCardCta } from "@/components/NavCardCta";

interface CaribbeanRoutePresetsProps {
  linkToFinder?: boolean;
}

export function CaribbeanRoutePresets({ linkToFinder = true }: CaribbeanRoutePresetsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {popularCaribbeanRoutes.map((route) => {
        const portNames = route.portSlugs
          .map((slug) => getPortBySlug(slug)?.name)
          .filter(Boolean)
          .join(", ");

        const inner = (
          <>
            <div className="flex items-start gap-4">
              <NavCardIcon icon="route" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">Cruise route</p>
                <h3 className="mt-1 font-display text-lg font-bold text-gray-900 transition-colors group-hover:text-caribbean-800">
                  {route.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{portNames}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {route.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-caribbean-50 px-2.5 py-1 text-xs font-medium text-caribbean-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <NavCardCta className="pt-4">
              {linkToFinder ? "Use in finder" : "Open route"}
            </NavCardCta>
          </>
        );

        if (linkToFinder) {
          return (
            <Link
              key={route.id}
              href={`/caribbean-excursion-finder?route=${route.id}`}
              className="nav-card group flex h-full flex-col"
            >
              {inner}
            </Link>
          );
        }

        return (
          <div key={route.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            {inner}
          </div>
        );
      })}
    </div>
  );
}
