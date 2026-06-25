import type { CruiseLine } from "./types";

const emptyTable = [{ portSlug: "juneau", portName: "Juneau", bestFor: "Whales", bestExcursion: "Whale watch", transferTime: "Pier", rating: "4.9" }];

function line(
  slug: string,
  name: string,
  tagline: string,
  ports: { slug: string; name: string }[],
  routes: string[],
): CruiseLine {
  return {
    slug,
    pageSlug: slug,
    name,
    tagline,
    seoTitle: `${name} Alaska Cruises | Ports, Excursions & Planning`,
    metaDescription: `Plan ${name} Alaska cruises with port recommendations for Juneau, Skagway, Ketchikan, and Seward plus shore excursion links.`,
    overview: `${name} operates Alaska Inside Passage and Gulf itineraries with port calls suited to wildlife, glacier, and scenic rail excursions.`,
    overviewDetail: `Alaska sailings fill quickly in June and July — book signature excursions like White Pass Railway and bear viewing early when ${name} publishes port times.`,
    caribbeanRoutes: routes,
    popularItineraries: [
      { name: "Inside Passage Classic", duration: "7 nights", ports: "Juneau, Skagway, Ketchikan", description: "Southeast Alaska highlights with glacier and wildlife ports." },
      { name: "Gulf of Alaska", duration: "7 nights", ports: "Seward or Whittier, Juneau, Skagway", description: "One-way route combining Gulf and Inside Passage." },
    ],
    popularPorts: ports,
    recommendedExcursions: [
      { name: "Whale Watching", portSlug: "juneau", description: "Humpback tours from downtown Juneau.", duration: "3-4 hours" },
      { name: "White Pass Railway", portSlug: "skagway", description: "Scenic rail to the summit.", duration: "3-4 hours" },
    ],
    familyRecommendations: [{ title: "Kenai Fjords half-day", portSlug: "seward", advice: "Suitable for mixed ages on Gulf itineraries." }],
    beachRecommendations: [],
    adventureRecommendations: [{ title: "Misty Fjords flightseeing", portSlug: "ketchikan", advice: "Weather-dependent — book flexible days." }],
    comparisonTable: emptyTable,
    excursionTips: ["Book rail and bear tours early on peak weeks.", "Confirm Ward Cove vs Ketchikan pier assignment."],
    bookingTips: ["Use ship booking for one must-do; compare independent operators for others.", "Check tender ports — Icy Strait and Sitka need buffer time."],
    faqs: [
      { question: `Does ${name} sail Alaska?`, answer: `${name} offers seasonal Alaska itineraries May through September on Inside Passage and Gulf routes.` },
      { question: "Which ports does Alaska include?", answer: "Typical calls include Juneau, Skagway, Ketchikan, Sitka, Icy Strait, Haines, Seward, and Whittier depending on itinerary." },
    ],
  };
}

const alaskaPorts = [
  { slug: "juneau", name: "Juneau" },
  { slug: "skagway", name: "Skagway" },
  { slug: "ketchikan", name: "Ketchikan" },
  { slug: "seward", name: "Seward" },
];

export const cruiseLines: CruiseLine[] = [
  line("princess-cruises", "Princess Cruises", "Alaska cruisetours and Inside Passage specialist", alaskaPorts, [
    "7-night Inside Passage from Seattle or Vancouver",
    "Voyage of the Glaciers Gulf routes",
    "Cruisetours with Denali land extensions",
  ]),
  line("holland-america", "Holland America Line", "Long Alaska heritage and Denali cruisetours", alaskaPorts, [
    "7-14 night Alaska itineraries",
    "Denali and Yukon land extensions",
    "Glacier Bay scenic cruising",
  ]),
  line("royal-caribbean", "Royal Caribbean", "Big-ship Alaska with activity-forward port days", alaskaPorts, [
    "7-night Alaska from Seattle",
    "Inside Passage with Icy Strait Point",
  ]),
  line("norwegian-cruise-line", "Norwegian Cruise Line", "Freestyle Alaska cruising", alaskaPorts, [
    "7-night Alaska from Seattle",
    "One-way Gulf and Inside Passage mixes",
  ]),
  line("celebrity-cruises", "Celebrity Cruises", "Premium Alaska itineraries", alaskaPorts, [
    "7-night Alaska from Vancouver or Seattle",
  ]),
  line("viking-cruises", "Viking", "Small-ship Alaska exploration", [
    { slug: "sitka", name: "Sitka" },
    { slug: "ketchikan", name: "Ketchikan" },
    { slug: "juneau", name: "Juneau" },
  ], ["10-11 night Alaska & Inside Passage"]),
];

export function getCruiseLineBySlug(slug: string): CruiseLine | undefined {
  return cruiseLines.find((l) => l.slug === slug);
}

export function getCruiseLineByPageSlug(pageSlug: string): CruiseLine | undefined {
  return cruiseLines.find((l) => l.pageSlug === pageSlug);
}

export function getAllCruiseLineSlugs(): string[] {
  return cruiseLines.map((l) => l.slug);
}

export function getAllCruiseLinePageSlugs(): string[] {
  return cruiseLines.map((l) => l.pageSlug);
}
