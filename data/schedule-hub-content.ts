import type { SchedulePageContent } from "./schedule-page-types";

function alaskaHub(
  slug: string,
  name: string,
  highlights: string[],
  excursions: string[],
  tenderNote?: string,
): SchedulePageContent {
  const tender =
    tenderNote ??
    "Most Alaska Inside Passage ports dock at the pier; confirm tender ports (Sitka, Icy Strait) on your ship's daily program.";
  return {
    intro: `This ${name} schedule hub is your entry point for 2026 and 2027 Alaska cruise ship call data. Compare years before opening monthly tables — knowing how many ships share your pier day helps when booking whale tours, railway seats, or flightseeing slots.`,
    heroSubtitle: `${name} Alaska cruise schedule hub — compare 2026 and 2027 ship calls and plan shore excursions around arrival and departure windows.`,
    whyPassengersUse: [
      `${name} is a key Alaska itinerary stop — this hub links to year pages with monthly ship lists as verified imports land.`,
      "Published arrival times frame how much time you have for signature excursions versus downtown exploration.",
      "Multi-ship days fill popular operators early — compare competing vessels on your exact date before you sail.",
      "Excursion planners use schedule data to match tour length to verified in-port windows rather than brochure guesses.",
    ],
    planningYourDay: {
      summary: `Start at this hub to pick 2026 or 2027, then match one headline ${name} experience to your verified in-port window.`,
      typicalActivities: highlights,
      topAttractions: highlights,
      recommendedExcursions: excursions,
      timingConsiderations: [
        "Open your port's year page first, then the month that matches your sailing",
        "Book rail, bear viewing, and flightseeing early on peak June and July weeks",
        "Add tender buffer time if your ship anchors rather than docks",
      ],
      returnGuidance:
        "Plan to be back at the gangway or tender pickup at least 45–60 minutes before published departure. Weather and pier assignments can shift — confirm times on your ship each morning.",
    },
    faqs: [
      {
        question: `Should I use the ${name} 2026 or 2027 schedule for excursion planning?`,
        answer: `Open the year that matches your sailing. Monthly tables show ship names, arrival times, and competing vessels on your pier day as verified data is imported.`,
      },
      {
        question: "Why check the schedule before booking shore excursions?",
        answer:
          "Your in-port window determines which tours are realistic. Matching excursions to verified schedule times reduces missed-departure risk on short port days.",
      },
      {
        question: "Are arrival and departure times guaranteed?",
        answer:
          "No — published schedules are planning guides. Weather, pier assignments, tender conditions, and cruise line changes can shift times. Always confirm the daily program on your ship.",
      },
    ],
    internalLinks: [
      {
        label: `${name} 2027 Schedule`,
        href: `/ship-schedules/${slug}/2027`,
        description: "Monthly ship calls for the 2027 Alaska season.",
      },
      {
        label: "All Alaska Schedules",
        href: "/ship-schedules",
        description: "Master schedule hub for every Alaska port.",
      },
      {
        label: "Alaska Excursion Planner",
        href: "/alaska-cruise-excursion-planner",
        description: "Match excursions to your ports and interests.",
      },
    ],
    hubDetails: {
      popularExcursions: excursions.slice(0, 3).map((excursionName) => ({
        name: excursionName,
        description: `Popular ${excursionName.toLowerCase()} option — confirm timing against your ship's schedule.`,
        duration: "3–5 hours",
      })),
      terminalInfo: `${name} cruise terminal — confirm pier assignment on your ship's daily program.`,
      tenderVsDock: tender,
      typicalTimeInPort: "Varies by ship — see monthly tables when verified data is available.",
      bestExcursionTiming: [
        "Book signature tours before you sail on peak-season multi-ship days",
        "Morning slots suit wildlife and flightseeing; afternoon suits shorter downtown stops",
      ],
    },
  };
}

export const scheduleHubContent = {
  "juneau-hub": alaskaHub(
    "juneau",
    "Juneau",
    ["Whale watching from Auke Bay", "Mendenhall Glacier visits", "Downtown State Street walks"],
    ["Humpback whale watching", "Mendenhall Glacier tour", "Helicopter glacier landing"],
  ),
  "skagway-hub": alaskaHub(
    "skagway",
    "Skagway",
    ["White Pass Railway summit run", "Downtown Gold Rush district", "Yukon bus tours"],
    ["White Pass & Yukon Route railway", "Dog sledding on glacier", "Chilkoot Trail highlights"],
  ),
  "ketchikan-hub": alaskaHub(
    "ketchikan",
    "Ketchikan",
    ["Creek Street and totem parks", "Misty Fjords flightseeing", "Salmon fishing charters"],
    ["Misty Fjords flightseeing", "Bear viewing at Neets Bay", "Totem Bight State Park tour"],
  ),
  "ward-cove-hub": alaskaHub(
    "ward-cove",
    "Ward Cove",
    ["Confirm Ketchikan pier vs Ward Cove berth", "Misty Fjords by floatplane", "Totem heritage tours"],
    ["Misty Fjords flightseeing", "Bear viewing", "Ketchikan heritage tour"],
    "Ward Cove is a separate berth from downtown Ketchikan — confirm which pier your ship uses before booking walkable tours.",
  ),
  "icy-strait-hub": alaskaHub(
    "icy-strait",
    "Icy Strait",
    ["ZipRider and coastal trails", "Whale watching from Hoonah", "Native cultural experiences"],
    ["Whale watching", "Bear search coastal tour", "ZipRider adventure"],
    "Icy Strait Point uses tenders — add 20–30 minutes each way when planning return times.",
  ),
  "sitka-hub": alaskaHub(
    "sitka",
    "Sitka",
    ["Sitka National Historical Park totems", "Raptor Centre visits", "Sea otter and whale tours"],
    ["Sea otter and wildlife cruise", "Fortress of the Bear", "Sitka cultural tour"],
    "Sitka may use tender or dock landings — confirm on your ship's daily program.",
  ),
  "haines-hub": alaskaHub(
    "haines",
    "Haines",
    ["Chilkoot Lake bear viewing", "Bald eagle preserve", "Kayaking on Lynn Canal"],
    ["Chilkoot Lake bear viewing", "Eagle preserve float", "Fjord kayaking"],
  ),
  "seward-hub": alaskaHub(
    "seward",
    "Seward",
    ["Kenai Fjords wildlife cruises", "Alaska SeaLife Center", "Resurrection Bay kayaking"],
    ["Kenai Fjords National Park cruise", "Wildlife and glacier boat tour", "SeaLife Center visit"],
  ),
  "whittier-hub": alaskaHub(
    "whittier",
    "Whittier",
    ["Prince William Sound glacier cruises", "Anton Anderson Memorial Tunnel", "Kayaking in Passage Canal"],
    ["Prince William Sound glacier cruise", "Wildlife and glacier tour", "Passage Canal kayak"],
  ),
} satisfies Record<string, SchedulePageContent>;
