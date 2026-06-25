import type { CruiseShip } from "./types";

export const ships: CruiseShip[] = [
  {
    slug: "discovery-princess",
    name: "Discovery Princess",
    cruiseLineSlug: "princess-cruises",
    seoTitle: "Discovery Princess Alaska Cruises | Ports & Excursions",
    metaDescription: "Plan Discovery Princess Alaska cruises with Juneau, Skagway, and Ketchikan excursion links.",
    tagline: "Princess Alaska sailings with Inside Passage port calls",
    overview: "Discovery Princess operates seasonal Alaska itineraries with calls at major Inside Passage ports.",
    caribbeanItineraries: ["7-night Inside Passage from Seattle", "Voyage of the Glaciers"],
    commonPortSlugs: ["juneau", "skagway", "ketchikan", "icy-strait"],
    recommendedExcursions: [
      { name: "Whale Watching", portSlug: "juneau", description: "Signature Juneau wildlife experience." },
      { name: "White Pass Railway", portSlug: "skagway", description: "Book early on Discovery Princess Skagway days." },
    ],
    planningAdvice: ["Book White Pass and bear tours early on peak summer sailings."],
    faqs: [{ question: "Where does Discovery Princess sail in Alaska?", answer: "Typical Inside Passage ports including Juneau, Skagway, and Ketchikan." }],
    featuredPage: true,
  },
  {
    slug: "koningsdam",
    name: "Koningsdam",
    cruiseLineSlug: "holland-america",
    seoTitle: "Koningsdam Alaska Cruises | Ports & Excursions",
    metaDescription: "Koningsdam Alaska cruise planning with port guides and excursion recommendations.",
    tagline: "Holland America Alaska heritage routes",
    overview: "Koningsdam serves Alaska with Holland America's long-standing port network and cruisetour connections.",
    caribbeanItineraries: ["7-night Alaska from Seattle", "14-night Alaska collectibles"],
    commonPortSlugs: ["juneau", "skagway", "sitka", "ketchikan"],
    recommendedExcursions: [
      { name: "Kenai Fjords Cruise", portSlug: "seward", description: "On Gulf-ending itineraries." },
      { name: "Misty Fjords Flightseeing", portSlug: "ketchikan", description: "Weather-dependent floatplane highlight." },
    ],
    planningAdvice: ["HAL Alaska guests often combine ship days with Denali land extensions."],
    faqs: [{ question: "Does Koningsdam include Denali?", answer: "Denali is a land extension — not a pier call. See Alaska cruise with Denali guide." }],
    featuredPage: true,
  },
  {
    slug: "ovation-of-the-seas",
    name: "Ovation of the Seas",
    cruiseLineSlug: "royal-caribbean",
    seoTitle: "Ovation of the Seas Alaska Cruises | Ports & Excursions",
    metaDescription: "Ovation of the Seas Alaska planning — Juneau, Skagway, Icy Strait excursions.",
    tagline: "Royal Caribbean Alaska from Seattle",
    overview: "Ovation of the Seas brings high-capacity Alaska sailing with major Inside Passage ports.",
    caribbeanItineraries: ["7-night Alaska from Seattle"],
    commonPortSlugs: ["juneau", "skagway", "ketchikan", "icy-strait"],
    recommendedExcursions: [
      { name: "Helicopter Glacier Landing", portSlug: "juneau", description: "Premium icefield experience." },
      { name: "ZipRider", portSlug: "icy-strait", description: "Signature Icy Strait adventure." },
    ],
    planningAdvice: ["Multi-ship days in Juneau require early whale tour booking."],
    faqs: [{ question: "Does Ovation visit Icy Strait?", answer: "Many Royal Caribbean Alaska itineraries include Icy Strait Point tender calls." }],
    featuredPage: true,
  },
];

export function getShipBySlug(slug: string): CruiseShip | undefined {
  return ships.find((s) => s.slug === slug);
}

export function getAllShipSlugs(): string[] {
  return ships.map((s) => s.slug);
}

export function getShipsByCruiseLine(cruiseLineSlug: string): CruiseShip[] {
  return ships.filter((s) => s.cruiseLineSlug === cruiseLineSlug);
}

export function getFeaturedShips(): CruiseShip[] {
  return ships.filter((ship) => ship.featuredPage);
}

export function getFeaturedShipSlugs(): string[] {
  return getFeaturedShips().map((ship) => ship.slug);
}
