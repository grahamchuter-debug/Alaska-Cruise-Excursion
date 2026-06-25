import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/paths";
import { getAllPortSlugs } from "@/data/ports";
import { getAllComparisonSlugs } from "@/data/comparisons";
import { getAllExcursionTypeSlugs } from "@/data/excursion-types";
import { getAllCruiseLineSlugs } from "@/data/cruise-lines";
import { getAllShipSlugs } from "@/data/ships";
import { getAllSchedulePortSlugs, getAllVerifiedMonthPageParams } from "@/data/schedules";
import { SCHEDULE_YEARS } from "@/lib/schedule-utils";
import { getAllRegionSlugs } from "@/data/regions";
import { getAllBestGuideSlugs } from "@/data/best-guides";
import { portExcursionAuthority } from "@/data/port-excursion-authority";

export const dynamic = "force-static";

function sitemapEntry(
  path: string,
  now: Date,
  changeFrequency: "weekly" | "monthly" | "daily",
  priority: number,
) {
  return {
    url: absoluteUrl(SITE.url, path),
    lastModified: now,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/ports", priority: 0.9 },
    { path: "/excursion-types", priority: 0.9 },
    { path: "/alaska-cruise-excursion-planner", priority: 0.95 },
    { path: "/cruise-day-plan", priority: 0.88 },
    { path: "/plan-my-alaska-cruise", priority: 0.85 },
    { path: "/best-alaska-guides", priority: 0.92 },
    { path: "/alaska-faq", priority: 0.8 },
    { path: "/alaska-cruise-port-guides", priority: 0.88 },
    { path: "/alaska-cruise-ship-schedules", priority: 0.88 },
    { path: "/ship-schedules", priority: 0.85 },
    { path: "/ship-schedules/2026", priority: 0.9 },
    { path: "/ship-schedules/2027", priority: 0.9 },
    { path: "/alaska-cruise-lines", priority: 0.8 },
    { path: "/alaska-cruise-ships", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ].map(({ path, priority }) => sitemapEntry(path, now, "weekly", priority));

  const portPages = getAllPortSlugs().map((slug) =>
    sitemapEntry(`/ports/${slug}`, now, "weekly", 0.9),
  );

  const comparePages = getAllComparisonSlugs().map((slug) =>
    sitemapEntry(`/${slug}`, now, "monthly", 0.75),
  );

  const excursionPages = getAllExcursionTypeSlugs().map((slug) =>
    sitemapEntry(`/excursion-types/${slug}`, now, "monthly", 0.8),
  );

  const cruiseLinePages = getAllCruiseLineSlugs().map((slug) =>
    sitemapEntry(`/alaska-cruise-lines/${slug}`, now, "monthly", 0.75),
  );

  const shipPages = getAllShipSlugs().map((slug) =>
    sitemapEntry(`/alaska-cruise-ships/${slug}`, now, "monthly", 0.72),
  );

  const scheduleHubPages = getAllSchedulePortSlugs().map((slug) =>
    sitemapEntry(`/ship-schedules/${slug}`, now, "daily", 0.65),
  );

  const scheduleYearPages = getAllSchedulePortSlugs().flatMap((slug) =>
    SCHEDULE_YEARS.map((year) =>
      sitemapEntry(`/ship-schedules/${slug}/${year}`, now, "daily", 0.7),
    ),
  );

  const scheduleMonthPages = getAllVerifiedMonthPageParams().map(({ slug, period }) =>
    sitemapEntry(`/ship-schedules/${slug}/${period}`, now, "daily", 0.68),
  );

  const regionPages = getAllRegionSlugs().map((slug) =>
    sitemapEntry(`/${slug}`, now, "weekly", 0.85),
  );

  const bestGuidePages = getAllBestGuideSlugs().map((slug) =>
    sitemapEntry(`/${slug}`, now, "weekly", 0.9),
  );

  const flagshipAuthorityPage = sitemapEntry(
    `/${portExcursionAuthority.slug}`,
    now,
    "weekly",
    0.95,
  );

  return [
    flagshipAuthorityPage,
    ...staticPages,
    ...bestGuidePages,
    ...regionPages,
    ...portPages,
    ...comparePages,
    ...excursionPages,
    ...cruiseLinePages,
    ...shipPages,
    ...scheduleHubPages,
    ...scheduleYearPages,
    ...scheduleMonthPages,
  ];
}
