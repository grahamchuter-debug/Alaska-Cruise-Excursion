import type { RegionalCruisePlannerPage } from "./types";

export const regionalCruisePlanners: RegionalCruisePlannerPage[] = [];

export function getRegionalCruisePlannerBySlug(_slug: string): RegionalCruisePlannerPage | undefined {
  return undefined;
}

export function getAllRegionalCruisePlannerSlugs(): string[] {
  return [];
}

export function getRegionalPlannersByParentPlanner(_parentSlug: string): RegionalCruisePlannerPage[] {
  return [];
}

export function getRegionalPlannersByRegionPage(_regionSlug: string): RegionalCruisePlannerPage[] {
  return [];
}
