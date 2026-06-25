import type { TravellerTypeId } from "@/data/excursion-finder";
import { travellerTypes } from "@/data/excursion-finder";
import { getPortBySlug } from "@/data/ports";
import { excursionTypes } from "@/data/excursion-types";
import { formatSpecialistDomain } from "@/lib/specialist-links";

/** Activity-led interest options shown in the finder (canonical order). */
export const FINDER_INTEREST_ORDER: TravellerTypeId[] = [
  "whales",
  "bears",
  "glaciers",
  "railways",
  "flightseeing",
  "dog-sledding",
  "kayaking",
  "native-culture",
  "fishing",
  "photography",
  "scenic-cruising",
];

export const interestExcursionTypeSlug: Record<TravellerTypeId, string> = {
  whales: "whale-watching",
  bears: "bear-viewing",
  glaciers: "glacier-tours",
  eagles: "wildlife-cruises",
  "dog-sledding": "dog-sledding",
  railways: "railway-tours",
  kayaking: "kayaking",
  "native-culture": "native-culture",
  photography: "photography",
  fishing: "fishing",
  flightseeing: "flightseeing",
  "scenic-cruising": "wildlife-cruises",
  "first-time": "whale-watching",
};

export const interestPortRankings: Record<TravellerTypeId, string[]> = {
  whales: ["juneau", "icy-strait", "sitka", "seward"],
  bears: ["ketchikan", "haines", "sitka", "icy-strait"],
  glaciers: ["juneau", "seward", "whittier", "skagway"],
  eagles: ["haines", "sitka", "juneau", "ketchikan"],
  "dog-sledding": ["skagway", "juneau", "seward", "denali"],
  railways: ["skagway", "whittier", "denali", "seward"],
  kayaking: ["whittier", "juneau", "ketchikan", "haines"],
  "native-culture": ["ketchikan", "sitka", "icy-strait", "juneau"],
  photography: ["haines", "juneau", "seward", "denali"],
  fishing: ["ketchikan", "seward", "whittier", "sitka"],
  flightseeing: ["ketchikan", "juneau", "denali", "skagway"],
  "scenic-cruising": ["seward", "whittier", "juneau", "sitka"],
  "first-time": ["juneau", "skagway", "ketchikan", "seward"],
};

export const interestPeakMonths: Record<TravellerTypeId, string[]> = {
  whales: ["June", "July", "August"],
  bears: ["July", "August", "September"],
  glaciers: ["May", "June", "July", "August", "September"],
  eagles: ["November", "December", "January", "February", "March"],
  "dog-sledding": ["May", "June", "July", "August", "September"],
  railways: ["May", "June", "July", "August", "September"],
  kayaking: ["June", "July", "August"],
  "native-culture": ["May", "June", "July", "August", "September"],
  photography: ["June", "July", "August", "September"],
  fishing: ["May", "June", "July", "August", "September"],
  flightseeing: ["May", "June", "July", "August", "September"],
  "scenic-cruising": ["May", "June", "July", "August", "September"],
  "first-time": ["June", "July", "August"],
};

export const interestGuideSlugs: Partial<Record<TravellerTypeId, string>> = {
  whales: "best-alaska-whale-watching-excursions",
  bears: "best-alaska-bear-viewing-excursions",
  glaciers: "best-alaska-glacier-excursions",
  "scenic-cruising": "best-alaska-glacier-excursions",
  photography: "best-alaska-shore-excursions",
  "first-time": "best-alaska-shore-excursions",
};

const portReasonByInterest: Partial<Record<TravellerTypeId, Record<string, string>>> = {
  whales: {
    juneau: "Consistent humpback encounters in Auke Bay and Stephens Passage",
    "icy-strait": "Compact whale-focused port with strong summer sighting rates",
    sitka: "Smaller boats in Sitka Sound — whales plus sea otters",
    seward: "Kenai Fjords cruises combine whales with glacier scenery",
  },
  bears: {
    ketchikan: "Anan and Neets Bay stream viewing in peak salmon season",
    haines: "Chilkoot Lake and river corridors with brown bear habitat",
    sitka: "Fortress of the Bear sanctuary — reliable for all ages",
    "icy-strait": "Chichagof Island has among Alaska's highest bear densities",
  },
  glaciers: {
    juneau: "Mendenhall Glacier and helicopter icefield landings",
    seward: "Kenai Fjords tidewater glaciers and marine wildlife",
    whittier: "Prince William Sound glacier cruises",
    skagway: "Helicopter glacier camps and icefield flightseeing",
  },
  flightseeing: {
    ketchikan: "Misty Fjords floatplane routes — iconic wilderness scenery",
    juneau: "Helicopter glacier landings on the icefield",
    denali: "Denali peak flightseeing from park entrance",
    skagway: "Helicopter glacier and dog camp combinations",
  },
  railways: {
    skagway: "White Pass & Yukon Route — Alaska's iconic cruise rail",
    whittier: "Glacier Discovery train through tunnel and alpine valleys",
    denali: "Alaska Railroad hub for cruisetour land extensions",
    seward: "Coastal Classic rail link to Anchorage",
  },
  "scenic-cruising": {
    seward: "Kenai Fjords — glaciers, puffins, otters, and whales",
    whittier: "Prince William Sound glacier and marine routes",
    juneau: "Tracy Arm / Endicott Arm full-day fjord trips",
    sitka: "Sitka Sound marine wildlife on smaller vessels",
  },
};

export function getExcursionTypeNameForInterest(interestId: TravellerTypeId): string {
  const slug = interestExcursionTypeSlug[interestId];
  return excursionTypes.find((type) => type.slug === slug)?.name ?? slug;
}

export function getPortReasonForInterest(interestId: TravellerTypeId, portSlug: string): string {
  const custom = portReasonByInterest[interestId]?.[portSlug];
  if (custom) return custom;
  const port = getPortBySlug(portSlug);
  const type = excursionTypes.find((t) => t.slug === interestExcursionTypeSlug[interestId]);
  const bestPort = type?.bestPorts.find((p) => p.slug === portSlug);
  return bestPort?.reason ?? port?.bestFor ?? "Strong fit for this activity";
}

export function getRecommendedPortsForInterests(
  interests: TravellerTypeId[],
  limit = 6,
  preferredPorts: string[] = [],
): string[] {
  const scores = new Map<string, number>();

  for (const slug of preferredPorts) {
    scores.set(slug, (scores.get(slug) ?? 0) + 10);
  }

  for (const interest of interests) {
    const ranked = interestPortRankings[interest] ?? [];
    ranked.forEach((slug, index) => {
      scores.set(slug, (scores.get(slug) ?? 0) + Math.max(1, 6 - index));
    });
  }

  return [...scores.entries()]
    .filter(([slug]) => getPortBySlug(slug))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug]) => slug);
}

export function getSeasonNoteForInterest(
  interestId: TravellerTypeId,
  sailingMonth?: string,
): string {
  const peaks = interestPeakMonths[interestId].filter((m) =>
    ["May", "June", "July", "August", "September"].includes(m),
  );
  const peakText =
    peaks.length > 0 ? `Peak months: ${peaks.join(", ")}` : "Season varies by operator";

  if (!sailingMonth) return peakText;

  if (peaks.includes(sailingMonth)) {
    return `${sailingMonth} is a strong month for this activity. ${peakText}.`;
  }
  if (["May", "September"].includes(sailingMonth)) {
    return `${sailingMonth} is shoulder season — workable with the right operator. ${peakText}.`;
  }
  return peakText;
}

export interface FinderInterestInsight {
  interestId: TravellerTypeId;
  interestLabel: string;
  excursionTypeSlug: string;
  excursionTypeName: string;
  bestPorts: { slug: string; name: string; reason: string }[];
  peakMonths: string[];
  seasonNote: string;
  guideHref?: string;
  guideLabel?: string;
  specialistSites: { portSlug: string; portName: string; domain: string }[];
}

export function buildInterestInsights(
  interests: TravellerTypeId[],
  sailingMonth?: string,
): FinderInterestInsight[] {
  return interests.map((interestId) => {
    const option = travellerTypes.find((t) => t.id === interestId);
    const excursionTypeSlug = interestExcursionTypeSlug[interestId];
    const guideSlug = interestGuideSlugs[interestId];
    const portSlugs = (interestPortRankings[interestId] ?? []).slice(0, 3);

    return {
      interestId,
      interestLabel: option?.shortLabel ?? interestId,
      excursionTypeSlug,
      excursionTypeName: getExcursionTypeNameForInterest(interestId),
      bestPorts: portSlugs.map((slug) => ({
        slug,
        name: getPortBySlug(slug)?.name ?? slug,
        reason: getPortReasonForInterest(interestId, slug),
      })),
      peakMonths: interestPeakMonths[interestId].filter((m) =>
        ["May", "June", "July", "August", "September"].includes(m),
      ),
      seasonNote: getSeasonNoteForInterest(interestId, sailingMonth),
      guideHref: guideSlug ? `/${guideSlug}` : undefined,
      guideLabel: guideSlug ? "Authority guide" : undefined,
      specialistSites: portSlugs
        .map((portSlug) => {
          const port = getPortBySlug(portSlug);
          if (!port) return null;
          return {
            portSlug,
            portName: port.name,
            domain: formatSpecialistDomain(port.specialistUrl),
          };
        })
        .filter((row): row is NonNullable<typeof row> => row !== null),
    };
  });
}
