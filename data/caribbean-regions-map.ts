export interface CaribbeanMapRegion {
  id: string;
  name: string;
  bestFor: string;
  portSlugs: string[];
  plannerHref: string;
  portsHref: string;
  badge: string;
}

export const caribbeanMapRegions: CaribbeanMapRegion[] = [
  {
    id: "inside-passage",
    name: "Inside Passage",
    bestFor: "Whales, railways, totems & rainforest ports",
    portSlugs: ["juneau", "skagway", "ketchikan", "sitka", "haines", "icy-strait", "ward-cove"],
    plannerHref: "/alaska-cruise-excursion-planner",
    portsHref: "/inside-passage-cruise-ports",
    badge: "IP",
  },
  {
    id: "gulf-of-alaska",
    name: "Gulf of Alaska",
    bestFor: "Kenai Fjords, Prince William Sound & Anchorage connections",
    portSlugs: ["seward", "whittier"],
    plannerHref: "/alaska-cruise-excursion-planner",
    portsHref: "/gulf-of-alaska-cruise-ports",
    badge: "Gulf",
  },
  {
    id: "denali-land",
    name: "Denali Land Extension",
    bestFor: "Pre/post-cruise park buses & flightseeing",
    portSlugs: ["denali"],
    plannerHref: "/alaska-cruise-with-denali",
    portsHref: "/ports/denali",
    badge: "Park",
  },
];

export function getCaribbeanMapRegionById(id: string): CaribbeanMapRegion | undefined {
  return caribbeanMapRegions.find((region) => region.id === id);
}

export function getCaribbeanRegionIdForPlanner(_plannerSlug: string): string | undefined {
  return undefined;
}
