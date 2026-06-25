import type { BestGuidePage, PortExcursionMatrixRow } from "./types";

const sharedFaqs = [
  {
    question: "Should I book Alaska excursions through the cruise line?",
    answer:
      "Book your highest-priority excursion through the ship if you want the strongest return guarantee. Use linked specialist local operators to compare independent options, group sizes, and itineraries.",
  },
  {
    question: "When is the best time for Alaska cruise excursions?",
    answer:
      "May through September is the main season. Whale watching peaks June–August; bears peak July–September at salmon streams. May and September offer fewer crowds.",
  },
];

const matrixScores = {
  juneau: {
    whaleWatching: "Excellent",
    bearViewing: "Good",
    glaciers: "Excellent",
    railways: "Limited",
    walkability: "Excellent",
    families: "Very Good",
    adventure: "Very Good",
    photography: "Excellent",
    value: "Good",
    firstTime: "Excellent",
  },
  skagway: {
    whaleWatching: "Limited",
    bearViewing: "Fair",
    glaciers: "Very Good",
    railways: "Excellent",
    walkability: "Excellent",
    families: "Very Good",
    adventure: "Very Good",
    photography: "Very Good",
    value: "Good",
    firstTime: "Excellent",
  },
  ketchikan: {
    whaleWatching: "Good",
    bearViewing: "Excellent",
    glaciers: "Good",
    railways: "Limited",
    walkability: "Very Good",
    families: "Good",
    adventure: "Good",
    photography: "Excellent",
    value: "Good",
    firstTime: "Very Good",
  },
  "ward-cove": {
    whaleWatching: "Good",
    bearViewing: "Excellent",
    glaciers: "Good",
    railways: "Limited",
    walkability: "Limited",
    families: "Good",
    adventure: "Good",
    photography: "Very Good",
    value: "Good",
    firstTime: "Good",
  },
  "icy-strait": {
    whaleWatching: "Excellent",
    bearViewing: "Very Good",
    glaciers: "Limited",
    railways: "Limited",
    walkability: "Good",
    families: "Very Good",
    adventure: "Excellent",
    photography: "Very Good",
    value: "Fair",
    firstTime: "Very Good",
  },
  sitka: {
    whaleWatching: "Very Good",
    bearViewing: "Very Good",
    glaciers: "Limited",
    railways: "Limited",
    walkability: "Good",
    families: "Excellent",
    adventure: "Good",
    photography: "Very Good",
    value: "Good",
    firstTime: "Good",
  },
  haines: {
    whaleWatching: "Good",
    bearViewing: "Very Good",
    glaciers: "Limited",
    railways: "Limited",
    walkability: "Good",
    families: "Good",
    adventure: "Very Good",
    photography: "Excellent",
    value: "Very Good",
    firstTime: "Good",
  },
  seward: {
    whaleWatching: "Very Good",
    bearViewing: "Good",
    glaciers: "Excellent",
    railways: "Good",
    walkability: "Good",
    families: "Very Good",
    adventure: "Very Good",
    photography: "Excellent",
    value: "Good",
    firstTime: "Excellent",
  },
  whittier: {
    whaleWatching: "Good",
    bearViewing: "Fair",
    glaciers: "Excellent",
    railways: "Good",
    walkability: "Good",
    families: "Good",
    adventure: "Good",
    photography: "Excellent",
    value: "Good",
    firstTime: "Good",
  },
  denali: {
    whaleWatching: "Land only",
    bearViewing: "Excellent",
    glaciers: "Good",
    railways: "Excellent",
    walkability: "Fair",
    families: "Good",
    adventure: "Very Good",
    photography: "Excellent",
    value: "Fair",
    firstTime: "Good",
  },
} as const satisfies Record<string, PortExcursionMatrixRow["scores"]>;

function matrixRow(
  portSlug: string,
  portName: string,
  portNote?: string,
): PortExcursionMatrixRow {
  return {
    portSlug,
    portName,
    portNote,
    scores: { ...matrixScores[portSlug as keyof typeof matrixScores] },
  };
}

export const whichAlaskaPortBestExcursionsGuide: BestGuidePage = {
  slug: "which-alaska-cruise-port-has-the-best-excursions",
  seoTitle: "Which Alaska Cruise Port Has the Best Excursions? | Port Comparison",
  title: "Which Alaska Cruise Port Has the Best Excursions?",
  metaDescription:
    "Compare Alaska cruise ports for whale watching, bear viewing, glaciers, railways, families, adventure, and value — Juneau, Skagway, Ketchikan, Seward, Denali land tours, and more.",
  heroSubtitle:
    "Head-to-head Alaska port rankings across ten excursion priorities — with verdicts, comparison tables, and links to every authority port guide.",
  introduction:
    "There is no single “best” Alaska port for every passenger — but there is a best port for what you care about most. Juneau leads on variety and first-time pier days; Skagway owns the railway; Seward and Whittier dominate glacier boats; Ketchikan and Haines excel for bears and rainforest photography; Icy Strait compresses whales and adventure into one tender port.",
  introductionDetail:
    "This guide scores ten Alaska destinations across whale watching, bear viewing, glaciers, railways, walkability, families, adventure, photography, value, and first-time cruise passenger experience. Denali is included as a pre- or post-cruise land extension — not a pier call. Victoria, British Columbia is not an Alaska port and is excluded from this comparison.",
  topPorts: [
    {
      slug: "juneau",
      reason:
        "Deepest excursion menu from downtown docks — whales, Mendenhall Glacier, helicopters, and Tracy Arm day boats in one port day.",
    },
    {
      slug: "seward",
      reason:
        "Kenai Fjords National Park cruises combine tidewater glaciers, orcas, puffins, and sea otters — Alaska's top Gulf highlight.",
    },
    {
      slug: "skagway",
      reason:
        "White Pass & Yukon Route railway — the iconic Alaska rail experience steps from the pier.",
    },
    {
      slug: "ketchikan",
      reason:
        "Misty Fjords flightseeing, salmon-stream bear viewing, and totem heritage in Tongass rainforest.",
    },
    {
      slug: "icy-strait",
      reason:
        "Compact whale-focused tender port with ZipRider, coastal trails, and strong summer sighting rates.",
    },
    {
      slug: "haines",
      reason:
        "Eagle preserve floats, Chilkoot Lake wildlife, and quieter photography days without Skagway crowds.",
    },
    {
      slug: "sitka",
      reason:
        "Fortress of the Bear, Raptor Center, sea otters, and Russian-American heritage on Baranof Island.",
    },
    {
      slug: "whittier",
      reason:
        "Prince William Sound glacier cruises and Alaska Railroad connections through the Anton Anderson Tunnel.",
    },
    {
      slug: "ward-cove",
      reason:
        "Same Ketchikan-area experiences as downtown — but confirm Ward Cove pickup before booking walkable tours.",
    },
    {
      slug: "denali",
      reason:
        "Pre/post-cruise land hub — park buses, flightseeing, and tundra wildlife on Alaska cruisetours (not a ship port).",
    },
  ],
  portExcursionMatrix: [
    matrixRow("juneau", "Juneau"),
    matrixRow("skagway", "Skagway"),
    matrixRow("ketchikan", "Ketchikan"),
    matrixRow("ward-cove", "Ward Cove", "Ketchikan-area berth — shuttle to downtown"),
    matrixRow("icy-strait", "Icy Strait"),
    matrixRow("sitka", "Sitka"),
    matrixRow("haines", "Haines"),
    matrixRow("seward", "Seward"),
    matrixRow("whittier", "Whittier"),
    matrixRow("denali", "Denali", "Pre/post-cruise land — not a pier call"),
  ],
  categoryVerdicts: [
    {
      category: "Whale watching",
      winnerSlug: "juneau",
      winnerName: "Juneau",
      runnerUpSlug: "icy-strait",
      runnerUpName: "Icy Strait",
      verdict:
        "Juneau runs the highest volume of dedicated whale boats from downtown and Auke Bay with naturalist guides. Icy Strait matches sighting quality in a smaller tender port — choose Icy Strait if your itinerary already includes Juneau glaciers.",
    },
    {
      category: "Bear viewing",
      winnerSlug: "ketchikan",
      winnerName: "Ketchikan",
      runnerUpSlug: "haines",
      runnerUpName: "Haines",
      verdict:
        "Ketchikan-area salmon-stream bear tours (Neets Bay, Anan) are Alaska's strongest wild bear experiences for cruise passengers. Haines adds Chilkoot Lake and brown-bear habitat with fewer ships — Sitka's Fortress of the Bear suits families wanting reliable sanctuary viewing.",
    },
    {
      category: "Glaciers",
      winnerSlug: "seward",
      winnerName: "Seward",
      runnerUpSlug: "juneau",
      runnerUpName: "Juneau",
      verdict:
        "Kenai Fjords day cruises deliver tidewater glaciers plus marine wildlife in one Gulf boat day. Juneau adds Mendenhall trails and helicopter landings from downtown; Whittier's Prince William Sound suits Anchorage-area itineraries.",
    },
    {
      category: "Railways",
      winnerSlug: "skagway",
      winnerName: "Skagway",
      runnerUpSlug: "denali",
      runnerUpName: "Denali (land)",
      verdict:
        "White Pass & Yukon Route from Skagway pier is Alaska's essential scenic railway for cruise passengers. Denali cruisetours add Alaska Railroad segments on land extensions — not a same-day pier experience.",
    },
    {
      category: "Walkability",
      winnerSlug: "juneau",
      winnerName: "Juneau",
      runnerUpSlug: "skagway",
      runnerUpName: "Skagway",
      verdict:
        "Juneau and Skagway both dock at compact downtown waterfronts — whale boats, shops, and museums within minutes of the gangway. Ward Cove and Sitka require transfers; Icy Strait is walkable inside the port site only.",
    },
    {
      category: "Families",
      winnerSlug: "sitka",
      winnerName: "Sitka",
      runnerUpSlug: "juneau",
      runnerUpName: "Juneau",
      verdict:
        "Sitka combines Fortress of the Bear, the Raptor Center, and manageable tour lengths on a less hectic port day. Juneau offers the broadest family menu if you want one major wildlife or glacier highlight plus downtown time.",
    },
    {
      category: "Adventure",
      winnerSlug: "icy-strait",
      winnerName: "Icy Strait",
      runnerUpSlug: "skagway",
      runnerUpName: "Skagway",
      verdict:
        "ZipRider, coastal bear searches, and whale boats pack high-adrenaline options into a single tender site. Skagway adds helicopter glacier dog camps and Yukon coach adventures for longer port windows.",
    },
    {
      category: "Photography",
      winnerSlug: "haines",
      winnerName: "Haines",
      runnerUpSlug: "ketchikan",
      runnerUpName: "Ketchikan",
      verdict:
        "Haines and Ketchikan deliver misty rainforest, eagles, totems, and alpine lake reflections with fewer downtown crowds than Juneau. Seward and Whittier excel for glacier-and-wildlife seascapes.",
    },
    {
      category: "Value",
      winnerSlug: "haines",
      winnerName: "Haines",
      runnerUpSlug: "ketchikan",
      runnerUpName: "Ketchikan",
      verdict:
        "Lower ship volume at Haines often means better last-minute tour availability and less premium pricing than Juneau peak weeks. Ketchikan's free totem parks and walkable Creek Street add value on shorter port days.",
    },
    {
      category: "Best first-time experience",
      winnerSlug: "juneau",
      winnerName: "Juneau",
      runnerUpSlug: "skagway",
      runnerUpName: "Skagway",
      verdict:
        "First-time Alaska cruisers should anchor on Juneau (whales or Mendenhall) or Skagway (White Pass Railway) — both deliver signature experiences with straightforward pier logistics. Add Seward or Ketchikan on Gulf or bear-focused itineraries.",
    },
  ],
  recommendedExcursions: [
    {
      name: "Humpback Whale Watching",
      portSlug: "juneau",
      description: "Naturalist-led search in Stephens Passage from downtown excursion docks.",
      duration: "3–4 hours",
    },
    {
      name: "White Pass Railway Summit",
      portSlug: "skagway",
      description: "Historic narrow-gauge rail past waterfalls and alpine lakes.",
      duration: "3–4 hours",
    },
    {
      name: "Kenai Fjords National Park Cruise",
      portSlug: "seward",
      description: "Glaciers, orcas, puffins, and sea otters in Resurrection Bay.",
      duration: "6–8 hours",
    },
    {
      name: "Misty Fjords Flightseeing",
      portSlug: "ketchikan",
      description: "Floatplane over sea cliffs and wilderness fjords.",
      duration: "2–3 hours",
    },
    {
      name: "ZipRider & Whale Watching",
      portSlug: "icy-strait",
      description: "Combine North America's longest zip line with a marine wildlife tour.",
      duration: "4–5 hours",
    },
    {
      name: "Fortress of the Bear & Raptor Center",
      portSlug: "sitka",
      description: "Reliable bear and eagle viewing with educational programmes.",
      duration: "3–4 hours",
    },
    {
      name: "Chilkoot Lake Wildlife Tour",
      portSlug: "haines",
      description: "Scenic drive searching for bears, moose, and eagles at alpine lake.",
      duration: "3–4 hours",
    },
    {
      name: "Prince William Sound Glacier Cruise",
      portSlug: "whittier",
      description: "Tidewater glaciers and marine wildlife near the cruise terminal.",
      duration: "4–6 hours",
    },
    {
      name: "Denali Park Road Bus",
      portSlug: "denali",
      description: "Guided transit into the park with wildlife scanning — cruisetour land add-on.",
      duration: "4–8 hours",
    },
  ],
  comparisonTable: [
    {
      portSlug: "juneau",
      portName: "Juneau",
      bestFor: "Overall variety",
      bestExcursion: "Whale watching",
      transferTime: "Downtown dock",
      rating: "4.9",
    },
    {
      portSlug: "seward",
      portName: "Seward",
      bestFor: "Glacier fjords",
      bestExcursion: "Kenai Fjords",
      transferTime: "Harbour walk",
      rating: "4.9",
    },
    {
      portSlug: "skagway",
      portName: "Skagway",
      bestFor: "Railway",
      bestExcursion: "White Pass Railway",
      transferTime: "Pier to rail",
      rating: "4.9",
    },
    {
      portSlug: "ketchikan",
      portName: "Ketchikan",
      bestFor: "Bears & flightseeing",
      bestExcursion: "Misty Fjords",
      transferTime: "Downtown dock",
      rating: "4.8",
    },
    {
      portSlug: "icy-strait",
      portName: "Icy Strait",
      bestFor: "Whales & adventure",
      bestExcursion: "Whale watch",
      transferTime: "Tender",
      rating: "4.8",
    },
    {
      portSlug: "haines",
      portName: "Haines",
      bestFor: "Eagles & value",
      bestExcursion: "Eagle preserve float",
      transferTime: "Shuttle",
      rating: "4.7",
    },
    {
      portSlug: "sitka",
      portName: "Sitka",
      bestFor: "Family wildlife",
      bestExcursion: "Fortress of the Bear",
      transferTime: "Tender / dock",
      rating: "4.7",
    },
    {
      portSlug: "whittier",
      portName: "Whittier",
      bestFor: "Prince William Sound",
      bestExcursion: "Glacier cruise",
      transferTime: "Terminal",
      rating: "4.7",
    },
    {
      portSlug: "ward-cove",
      portName: "Ward Cove",
      bestFor: "Ketchikan-area tours",
      bestExcursion: "Misty Fjords",
      transferTime: "Shuttle needed",
      rating: "4.6",
    },
    {
      portSlug: "denali",
      portName: "Denali",
      bestFor: "Land extension",
      bestExcursion: "Park road bus",
      transferTime: "Land only",
      rating: "4.8",
    },
  ],
  passengerRecommendations: [
    {
      title: "Pick one signature activity per port day",
      advice:
        "Alaska port times rarely allow two major excursions. Use the comparison matrix to choose whales OR glacier OR railway — then add a short downtown stop if time allows.",
    },
    {
      title: "Match the port to your cruise itinerary type",
      advice:
        "Inside Passage loops favour Juneau, Skagway, and Ketchikan. One-way Gulf sailings add Seward or Whittier. Denali belongs on a cruisetour land segment — not a pier day.",
    },
    {
      title: "Confirm pier assignment before booking",
      advice:
        "Ward Cove vs downtown Ketchikan and tender vs dock at Sitka change your logistics entirely. Read each port authority guide before locking in independent tours.",
    },
    {
      title: "Book railways and bears early",
      advice:
        "White Pass Railway, salmon-stream bear viewing, and peak-summer whale boats sell out on multi-ship weeks — especially June through August.",
    },
    {
      title: "Use specialist sites for live pricing",
      advice:
        "Every port below links to a dedicated specialist operator site with pier-aware pickup, return guarantees, and current tour availability.",
    },
  ],
  faqs: [
    {
      question: "Which Alaska cruise port has the best excursions overall?",
      answer:
        "Juneau offers the deepest combination of whales, glaciers, flightseeing, and walkable downtown access from the pier. Skagway and Seward are close behind for railway and Kenai Fjords experiences respectively — the “best” port depends on your priorities.",
    },
    {
      question: "Is Denali included in this comparison?",
      answer:
        "Yes — as a pre- or post-cruise land destination on Alaska cruisetours. Cruise ships do not dock at Denali; passengers reach the park by Alaska Railroad or coach from Anchorage, Fairbanks, Seward, or Whittier connections.",
    },
    {
      question: "Is Victoria, BC an Alaska excursion port?",
      answer:
        "No. Victoria is in British Columbia, Canada — sometimes a short stop on repositioning itineraries, but not an Alaska wildlife or glacier port. This guide covers Alaska cruise and land destinations only.",
    },
    {
      question: "Ward Cove or downtown Ketchikan — which is better for excursions?",
      answer:
        "Same excursion region, different pier. Downtown Ketchikan is walkable to Creek Street and totem parks. Ward Cove requires shuttles — book tours with explicit Ward Cove pickup.",
    },
    {
      question: "Juneau or Icy Strait for whale watching?",
      answer:
        "Both offer excellent humpback tours. Juneau adds glaciers and more tour variety; Icy Strait compresses whales and adventure into one tender port with less town sprawl.",
    },
    {
      question: "Seward or Whittier for glacier cruises?",
      answer:
        "Seward for longer Kenai Fjords wildlife cruises. Whittier for Prince William Sound and easier Anchorage-area connections through the rail-highway tunnel.",
    },
    ...sharedFaqs,
  ],
};
