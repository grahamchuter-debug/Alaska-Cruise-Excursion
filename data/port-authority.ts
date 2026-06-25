import type { PortAuthorityContent } from "./types";

const authority: Record<string, PortAuthorityContent> = {
  juneau: {
    seoTitle: "Juneau Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Plan Juneau cruise port days with whale watching, Mendenhall Glacier, flightseeing, and links to juneaushoreexcursion.com.",
    whyVisit: [
      "Alaska's busiest cruise port with downtown docking",
      "World-class humpback whale watching May through September",
      "Mendenhall Glacier and helicopter icefield landings",
      "Compact downtown walkable from most berths",
    ],
    bestBeaches: [],
    bestForFamilies: [
      "Whale watching with naturalist guides",
      "Mendenhall Glacier visitor centre and trails",
      "Mount Roberts Tram alpine views",
      "Salmon bake and cultural shows",
    ],
    bestForCouples: [
      "Private whale watching charter",
      "Helicopter glacier landing for two",
      "Evening downtown stroll and seafood dinner",
    ],
    snorkelling: [],
    privateTours: [
      { name: "Private whale watching boat", description: "Dedicated vessel with flexible routing and photography time." },
      { name: "Private Mendenhall and town tour", description: "Custom glacier and downtown combination." },
    ],
  },
  skagway: {
    seoTitle: "Skagway Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Skagway authority guide to White Pass Railway, Yukon tours, dog sledding, and skagwayshoreexcursions.com.",
    whyVisit: [
      "White Pass & Yukon Route — iconic scenic railway",
      "Gold Rush Broadway walkable from pier",
      "Dog sledding and helicopter glacier camps",
      "Gateway to Yukon day trips",
    ],
    bestBeaches: [],
    bestForFamilies: ["White Pass Railway summit trip", "Dog sled summer cart rides", "Gold panning at Liarsville", "Downtown historic walking tour"],
    bestForCouples: ["Private White Pass charter car", "Yukon scenic coach for two", "Helicopter glacier dog camp"],
    snorkelling: [],
    privateTours: [
      { name: "Private White Pass rail car", description: "Reserved seating and custom pacing on premium rail products." },
      { name: "Private Yukon discovery", description: "Dedicated coach with border crossing handled." },
    ],
  },
  ketchikan: {
    seoTitle: "Ketchikan Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Ketchikan authority guide to Misty Fjords, bear viewing, totem parks, and ketchikanshoreexcursion.com.",
    whyVisit: [
      "Misty Fjords flightseeing — iconic wilderness scenery",
      "Totem Bight and Saxman Village cultural sites",
      "Bear viewing at salmon streams (seasonal)",
      "Walkable Creek Street from downtown berths",
    ],
    bestBeaches: [],
    bestForFamilies: ["Totem park tours", "Bering Sea Crab demonstration", "Creek Street and town walk", "Rainforest nature walks"],
    bestForCouples: ["Misty Fjords floatplane for two", "Private bear viewing day", "Waterfront dining on Creek Street"],
    snorkelling: [],
    privateTours: [
      { name: "Private Misty Fjords flight", description: "Small-group floatplane with custom routing." },
      { name: "Private Ketchikan highlights", description: "Totem parks, Creek Street, and scenic drives." },
    ],
  },
  "ward-cove": {
    seoTitle: "Ward Cove Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Ward Cove pier guide — transfers to Ketchikan, Misty Fjords pickups, and wardcoveshoreexcursions.com.",
    whyVisit: [
      "Ketchikan-area excursions with terminal meet points",
      "Misty Fjords and bear tours with Ward Cove pickup",
      "Modern cruise terminal for larger vessels",
      "Plan transfers before booking walkable tours",
    ],
    bestBeaches: [],
    bestForFamilies: ["Tours with explicit Ward Cove pickup", "Flightseeing with terminal meet", "Coach highlights with return guarantee"],
    bestForCouples: ["Private flightseeing from Ward Cove", "Bear viewing with included transfers"],
    snorkelling: [],
    privateTours: [
      { name: "Private Ward Cove transfer tour", description: "Dedicated vehicle to Creek Street and totem parks." },
    ],
  },
  "icy-strait": {
    seoTitle: "Icy Strait Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Icy Strait Point authority guide to whale watching, ZipRider, bear tours, and icystraitshoreexcursion.com.",
    whyVisit: [
      "Purpose-built port with whale watching focus",
      "ZipRider — longest zip line in North America",
      "Tlingit cultural performances",
      "Chichagof Island bear habitat",
    ],
    bestBeaches: [],
    bestForFamilies: ["Whale watching tours", "ZipRider (age/height limits apply)", "Cultural dance programmes", "Coastal nature walks"],
    bestForCouples: ["Private whale watching", "ZipRider adventure together", "Wilderness land tours"],
    snorkelling: [],
    privateTours: [{ name: "Private whale watch", description: "Smaller vessels with flexible timing at Icy Strait." }],
  },
  sitka: {
    seoTitle: "Sitka Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Sitka authority guide to bears, raptors, totem trails, and sitkashoreexcursion.com.",
    whyVisit: [
      "Fortress of the Bear sanctuary viewing",
      "Alaska Raptor Center eagle rehabilitation",
      "Sitka National Historical Park totem trail",
      "Russian-American heritage downtown",
    ],
    bestBeaches: [],
    bestForFamilies: ["Fortress of the Bear", "Raptor Center visits", "Totem trail walk", "Whale watching in Sitka Sound"],
    bestForCouples: ["Private wildlife tour", "Totem park and harbour walk", "Small-group whale watch"],
    snorkelling: [],
    privateTours: [{ name: "Private Sitka wildlife day", description: "Bears, raptors, and totem parks at your pace." }],
  },
  haines: {
    seoTitle: "Haines Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Haines authority guide to eagles, Chilkoot Lake, rafting, and hainesshoreexcursions.com.",
    whyVisit: [
      "Chilkat Eagle Preserve floating tours",
      "Chilkoot Lake wildlife drives",
      "Quieter port than Skagway",
      "Fort Seward historic district",
    ],
    bestBeaches: [],
    bestForFamilies: ["Eagle preserve float", "Gentle river floats", "Fort Seward walks"],
    bestForCouples: ["Private eagle float", "Chilkoot Lake scenic tour", "Quiet nature day"],
    snorkelling: [],
    privateTours: [{ name: "Private eagle and lake tour", description: "Custom wildlife routing from Portage Cove." }],
  },
  seward: {
    seoTitle: "Seward Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Seward authority guide to Kenai Fjords, Exit Glacier, and sewardshoreexcursion.com.",
    whyVisit: [
      "Kenai Fjords National Park day cruises",
      "Exit Glacier road access",
      "Alaska SeaLife Center on waterfront",
      "Rail link to Anchorage",
    ],
    bestBeaches: [],
    bestForFamilies: ["Half-day Kenai Fjords cruise", "SeaLife Center visit", "Exit Glacier short hike"],
    bestForCouples: ["Full-day Kenai Fjords", "Private fishing charter", "Dog sled on glacier"],
    snorkelling: [],
    privateTours: [{ name: "Private Kenai Fjords charter", description: "Custom boat timing for your group." }],
  },
  whittier: {
    seoTitle: "Whittier Shore Excursions & Cruise Port Authority Guide",
    seoDescription:
      "Whittier authority guide to Prince William Sound, Glacier Discovery train, and whittiershoreexcursions.com.",
    whyVisit: [
      "Prince William Sound glacier cruises",
      "Anton Anderson Tunnel access",
      "Glacier Discovery train segments",
      "Anchorage connection hub",
    ],
    bestBeaches: [],
    bestForFamilies: ["Half-day sound cruise", "Glacier Discovery train", "Portage Glacier tour"],
    bestForCouples: ["Sound cruise for two", "Kayaking in Blackstone Bay", "Rail scenic segment"],
    snorkelling: [],
    privateTours: [{ name: "Private sound cruise", description: "Flexible Prince William Sound routing." }],
  },
  denali: {
    seoTitle: "Denali Land Extensions & Cruisetour Authority Guide",
    seoDescription:
      "Denali pre/post-cruise planning — park buses, flightseeing, and denalishoreexcursions.com.",
    whyVisit: [
      "Denali National Park land extension hub",
      "Park road bus wildlife scanning",
      "Flightseeing for Denali peak views",
      "Alaska Railroad cruisetour connections",
    ],
    bestBeaches: [],
    bestForFamilies: ["Park bus with ranger narration", "Sled dog demonstrations", "Visitor centre exhibits"],
    bestForCouples: ["Flightseeing for two", "Rafting on Nenana River", "Lodge-based park days"],
    snorkelling: [],
    privateTours: [{ name: "Private flightseeing", description: "Small-plane Denali peak attempts." }],
  },
};

export function getPortAuthority(slug: string): PortAuthorityContent | undefined {
  return authority[slug];
}

export function getAllPortAuthoritySlugs(): string[] {
  return Object.keys(authority);
}
