import { getAllPortAuthoritySlugs } from "./port-authority";
import { getAllComparisonSlugs } from "./comparisons";
import { getAllCruiseLineSlugs } from "./cruise-lines";
import { getAllShipSlugs } from "./ships";
import { itineraryPlanners } from "./itinerary-planners";
import { regionalCruisePlanners } from "./regional-cruise-planners";
import { caribbeanMapRegions } from "./caribbean-regions-map";
import {
  getAllSchedulePortSlugs,
  getAllVerifiedMonthPageParams,
} from "./schedules";
import { SCHEDULE_YEARS } from "@/lib/schedule-utils";

export interface ContentInventory {
  portGuides: number;
  shipSchedulePorts: number;
  cruiseLines: number;
  cruiseShips: number;
  comparisonPages: number;
  cruisePlannerPages: number;
  scheduleHubPages: number;
  scheduleYearPages: number;
  monthlySchedulePages: number;
}

export interface PlannerStatCard {
  label: string;
  count: number;
  href: string;
}

/** Count published authority port guides (matches /ports/[slug] routes). */
export function getPortGuideCount(): number {
  return getAllPortAuthoritySlugs().length;
}

/** Count ports with ship schedule hub pages (matches /ship-schedules/[slug] routes). */
export function getSchedulePortCount(): number {
  return getAllSchedulePortSlugs().length;
}

/** Count Alaska map / explore-by-region cards. */
export function getAlaskaMapRegionCount(): number {
  return caribbeanMapRegions.length;
}

/** Unique itinerary + regional cruise planner pages (no double-counting shared slugs). */
export function getCruisePlannerPageCount(): number {
  const slugs = new Set([
    ...itineraryPlanners.map((planner) => planner.slug),
    ...regionalCruisePlanners.map((planner) => planner.slug),
  ]);
  return slugs.size;
}

export function getContentInventory(): ContentInventory {
  const shipSchedulePorts = getSchedulePortCount();

  return {
    portGuides: getPortGuideCount(),
    shipSchedulePorts,
    cruiseLines: getAllCruiseLineSlugs().length,
    cruiseShips: getAllShipSlugs().length,
    comparisonPages: getAllComparisonSlugs().length,
    cruisePlannerPages: getCruisePlannerPageCount(),
    scheduleHubPages: shipSchedulePorts,
    scheduleYearPages: shipSchedulePorts * SCHEDULE_YEARS.length,
    monthlySchedulePages: getAllVerifiedMonthPageParams().length,
  };
}

/** Homepage Cruise Planner statistics, total content assets, not category counts. */
export function getPlannerStatCards(): PlannerStatCard[] {
  const inventory = getContentInventory();

  return [
    { label: "Port Guides", count: inventory.portGuides, href: "/ports" },
    {
      label: "Ship Schedule Ports",
      count: inventory.shipSchedulePorts,
      href: "/ship-schedules",
    },
    { label: "Cruise Lines", count: inventory.cruiseLines, href: "/alaska-cruise-lines" },
    { label: "Cruise Ships", count: inventory.cruiseShips, href: "/alaska-cruise-ships" },
    {
      label: "Comparison Pages",
      count: inventory.comparisonPages,
      href: "/best-alaska-guides",
    },
    {
      label: "Cruise Planner",
      count: 1,
      href: "/alaska-cruise-excursion-planner",
    },
  ];
}
