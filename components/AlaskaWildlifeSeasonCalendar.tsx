import Link from "next/link";
import { getPortBySlug } from "@/data/ports";
import {
  ALASKA_CRUISE_SEASON_MONTHS,
  alaskaSeasonActivities,
  seasonRatingLabels,
  seasonRatingStyles,
} from "@/data/alaska-excursion-seasons";

export function AlaskaWildlifeSeasonCalendar() {
  return (
    <section className="mb-12">
      <div className="mb-8 max-w-3xl">
        <p className="section-eyebrow">May through September</p>
        <h2 className="section-title mt-1">Alaska Wildlife &amp; Excursion Season Calendar</h2>
        <p className="section-subtitle mt-2">
          When to plan whale watching, bears, eagles, salmon runs, glacier cruises, dog sledding, fishing, and
          photography on a typical Alaska cruise — with links to excursion types and port guides.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-caribbean-50">
              <th className="px-4 py-3 font-semibold text-gray-900">Activity</th>
              {ALASKA_CRUISE_SEASON_MONTHS.map((month) => (
                <th key={month} className="px-3 py-3 text-center font-semibold text-gray-900">
                  {month}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold text-gray-900">Top ports</th>
            </tr>
          </thead>
          <tbody>
            {alaskaSeasonActivities.map((activity) => (
              <tr key={activity.id} className="border-b border-gray-100 align-top">
                <td className="px-4 py-4">
                  <Link
                    href={`/excursion-types/${activity.excursionTypeSlug}`}
                    className="font-semibold text-caribbean-700 hover:underline"
                  >
                    {activity.label}
                  </Link>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-gray-600">{activity.summary}</p>
                  {activity.guideSlug && (
                    <Link
                      href={`/${activity.guideSlug}`}
                      className="mt-2 inline-flex text-xs font-medium text-caribbean-700 hover:underline"
                    >
                      Authority guide →
                    </Link>
                  )}
                </td>
                {ALASKA_CRUISE_SEASON_MONTHS.map((month) => {
                  const entry = activity.months.find((row) => row.month === month);
                  const rating = entry?.rating ?? "limited";
                  return (
                    <td key={month} className="px-3 py-4 text-center">
                      <span
                        className={`inline-flex min-w-[4.5rem] justify-center rounded-full px-2 py-1 text-[11px] font-semibold ${seasonRatingStyles[rating]}`}
                      >
                        {seasonRatingLabels[rating]}
                      </span>
                    </td>
                  );
                })}
                <td className="px-4 py-4">
                  <ul className="space-y-1 text-xs text-gray-700">
                    {activity.topPortSlugs.map((slug) => {
                      const port = getPortBySlug(slug);
                      return (
                        <li key={slug}>
                          <Link href={`/ports/${slug}`} className="font-medium text-caribbean-700 hover:underline">
                            {port?.name ?? slug}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500 leading-relaxed">
        Season ratings reflect typical May–September cruise windows — not live wildlife guarantees. Shoulder months
        can still deliver excellent excursions with the right operator and weather.
      </p>
    </section>
  );
}
