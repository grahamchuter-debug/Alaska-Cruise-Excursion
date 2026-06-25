import type { RegionPage } from "./types";

export const regions: RegionPage[] = [
  {
    slug: "inside-passage-cruise-ports",
    title: "Inside Passage Alaska Cruise Ports",
    metaDescription: "Inside Passage Alaska cruise ports — Juneau, Skagway, Ketchikan, Sitka, Haines, and Icy Strait excursion planning.",
    heroSubtitle: "Southeast Alaska ports connected by protected waterways and rainforest scenery.",
    overview: "Inside Passage itineraries visit Southeast Alaska ports with direct docking or tender access. Whales, glaciers, railways, and native culture define the best port days.",
    portComparison: "Juneau offers the widest excursion menu. Skagway is essential for White Pass Railway. Ketchikan leads flightseeing and bears. Haines and Icy Strait suit wildlife-focused passengers.",
    recommendedExcursions: ["Whale watching in Juneau", "White Pass Railway in Skagway", "Misty Fjords from Ketchikan", "Eagle floats in Haines"],
    portSlugs: ["juneau", "skagway", "ketchikan", "sitka", "haines", "icy-strait", "ward-cove"],
    excursionTypeSlugs: ["whale-watching", "glacier-tours", "railway-tours", "bear-viewing"],
    relatedRegionSlugs: ["gulf-of-alaska-cruise-ports"],
  },
  {
    slug: "gulf-of-alaska-cruise-ports",
    title: "Gulf of Alaska Cruise Ports",
    metaDescription: "Gulf of Alaska cruise ports — Seward and Whittier Kenai Fjords and Prince William Sound planning.",
    heroSubtitle: "Open-ocean Gulf ports with glacier fjords and Anchorage connections.",
    overview: "Gulf of Alaska routes often start or end at Seward or Whittier with Kenai Fjords and Prince William Sound as headline excursions.",
    portComparison: "Seward delivers Kenai Fjords — longer, wildlife-richer day boats. Whittier suits Prince William Sound and shorter Anchorage tunnel connections.",
    recommendedExcursions: ["Kenai Fjords from Seward", "Prince William Sound from Whittier", "Exit Glacier visit"],
    portSlugs: ["seward", "whittier"],
    excursionTypeSlugs: ["wildlife-cruises", "glacier-tours", "fishing"],
    relatedRegionSlugs: ["inside-passage-cruise-ports"],
  },
];

export function getRegionBySlug(slug: string): RegionPage | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getAllRegionSlugs(): string[] {
  return regions.map((r) => r.slug);
}
