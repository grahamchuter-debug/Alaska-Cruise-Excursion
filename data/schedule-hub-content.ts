import type { SchedulePageContent } from "./schedule-page-types";
import {
  JUNEAU_SCHEDULE_INTRO,
  juneauPlanningYourDay,
} from "./juneau-schedule-planning";

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
    intro: `This ${name} schedule hub is ready for 2026 and 2027 Alaska cruise ship call data. Verified monthly tables publish as imports complete — we do not show placeholder sailings.`,
    heroSubtitle: `${name} Alaska cruise schedule hub — browse year pages and monthly ship lists as verified imports land.`,
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
  "juneau-hub": {
    intro: JUNEAU_SCHEDULE_INTRO,
    heroSubtitle:
      "Juneau cruise ship schedule hub — live imported ship calls for 2026 and 2027. Compare competing vessels on your pier day, then plan whale watching, Mendenhall Glacier, helicopter tours, and Tracy Arm trips around verified arrival windows.",
    whyPassengersUse: [
      "Juneau is Alaska's busiest cruise port — live imported schedules show how many ships share your downtown pier day.",
      "Morning whale-watching boats and helicopter glacier departures sell out fastest when multiple vessels call on the same date.",
      "Mendenhall Glacier taxis and Tracy Arm day boats need enough time ashore — match tour length to verified departure times.",
      "Downtown docking keeps transfers short, but gangway queues still build — plan a 45–60 minute return buffer before all-aboard.",
    ],
    planningYourDay: juneauPlanningYourDay,
    faqs: [
      {
        question: "Should I use the Juneau 2026 or 2027 schedule for excursion planning?",
        answer:
          "Open the year that matches your sailing. Monthly tables list ship names, arrival and departure times, and competing vessels on your pier day.",
      },
      {
        question: "How do I plan whale watching around the Juneau schedule?",
        answer:
          "Check how many ships call on your date, then book a morning whale-watching departure from downtown or Auke Bay. Multi-ship days fill popular operators by late morning.",
      },
      {
        question: "Can I fit Mendenhall Glacier and whale watching on one Juneau port day?",
        answer:
          "Yes on a typical 6–9 hour call if you book efficient tours or taxis. Allow 45–60 minutes round trip to Mendenhall plus 3–4 hours for whale watching — confirm your ship's departure before stacking both.",
      },
      {
        question: "When should I book helicopter glacier tours in Juneau?",
        answer:
          "As early as possible on peak summer weeks. Helicopters cancel in low cloud — keep a flexible backup such as whale watching or a downtown walk if weather shifts.",
      },
      {
        question: "Are Juneau arrival and departure times guaranteed?",
        answer:
          "No — published schedules are planning guides from verified imports. Weather, pier assignments, and cruise line changes can shift times. Confirm the daily program on your ship before disembarking.",
      },
    ],
    internalLinks: [
      {
        label: "Juneau 2026 Schedule",
        href: "/ship-schedules/juneau/2026",
        description: "Verified monthly ship calls for the 2026 Alaska season.",
      },
      {
        label: "Juneau 2027 Schedule",
        href: "/ship-schedules/juneau/2027",
        description: "Verified monthly ship calls for the 2027 Alaska season.",
      },
      {
        label: "Juneau port guide",
        href: "/ports/juneau",
        description: "Whale watching, glaciers, and downtown logistics.",
      },
      {
        label: "Juneau Shore Excursions",
        href: "https://juneaushoreexcursions.com",
        description: "Live tour listings, pier pickup, and operator pricing.",
        external: true,
      },
      {
        label: "Whale watching excursions",
        href: "/excursion-types/whale-watching",
        description: "How to book and time whale tours from cruise ships.",
      },
      {
        label: "Glacier excursions",
        href: "/excursion-types/glacier-tours",
        description: "Mendenhall, helicopters, and fjord day boats.",
      },
      {
        label: "Alaska Excursion Planner",
        href: "/alaska-cruise-excursion-planner",
        description: "Match excursions to your ports and interests.",
      },
    ],
    hubDetails: {
      popularExcursions: [
        {
          name: "Humpback whale watching",
          description: "Morning departures from downtown or Auke Bay — book early on multi-ship days.",
          duration: "3–4 hours",
        },
        {
          name: "Mendenhall Glacier visit",
          description: "Visitor centre and Nugget Falls trail — taxi or tour from the cruise docks.",
          duration: "2–3 hours",
        },
        {
          name: "Helicopter glacier landing",
          description: "Icefield flightseeing with short walks on the glacier when weather allows.",
          duration: "2–3 hours",
        },
      ],
      terminalInfo:
        "Franklin Street and South Franklin cruise terminals — most ships dock downtown within walking distance of State Street.",
      tenderVsDock: "Juneau uses downtown docks; no tender boats on standard cruise calls.",
      typicalTimeInPort: "Usually 6–9 hours — see monthly tables for verified averages on your sailing date.",
      bestExcursionTiming: [
        "Morning: whale watching and helicopter departures before clouds build",
        "Midday: Mendenhall Glacier taxi runs and shorter downtown walks",
        "Full port day only: Tracy Arm or Endicott Arm fjord cruises",
      ],
    },
  } satisfies SchedulePageContent,
  "skagway-hub": {
    intro:
      "Skagway has live imported cruise ship schedules for 2026 and 2027 — use monthly tables to plan White Pass Railway, downtown Gold Rush walks, and Yukon tours around verified arrival and departure windows.",
    heroSubtitle:
      "Skagway cruise ship schedule hub — live imported ship calls for 2026 and 2027. Compare multi-ship days before booking railway seats and signature excursions.",
    whyPassengersUse: [
      "Skagway is a compact downtown port — live schedules show how many ships share your pier day on peak railway weeks.",
      "White Pass & Yukon Route seats sell out fastest when multiple vessels call on the same date.",
      "Short port days suit downtown walks; full days suit summit railway runs and Yukon bus tours.",
      "Plan a 45–60 minute return buffer before all-aboard — gangway queues build on busy summer calls.",
    ],
    planningYourDay: {
      summary:
        "Start at this hub to pick 2026 or 2027, then match White Pass Railway or a downtown highlight to your verified in-port window.",
      typicalActivities: [
        "White Pass Railway summit run",
        "Downtown Gold Rush district",
        "Yukon bus tours",
      ],
      topAttractions: [
        "White Pass Railway summit run",
        "Downtown Gold Rush district",
        "Yukon bus tours",
      ],
      recommendedExcursions: [
        "White Pass & Yukon Route railway",
        "Dog sledding on glacier",
        "Chilkoot Trail highlights",
      ],
      timingConsiderations: [
        "Open your year page first, then the month that matches your sailing",
        "Book railway and dog-sledding early on peak June and July weeks",
        "Afternoon departures suit shorter downtown stops on tight schedules",
      ],
      returnGuidance:
        "Plan to be back at the gangway at least 45–60 minutes before published departure. Weather and pier assignments can shift — confirm times on your ship each morning.",
    },
    faqs: [
      {
        question: "Should I use the Skagway 2026 or 2027 schedule for excursion planning?",
        answer:
          "Open the year that matches your sailing. Monthly tables list ship names, arrival and departure times, and competing vessels on your pier day.",
      },
      {
        question: "When should I book White Pass Railway around the Skagway schedule?",
        answer:
          "As early as possible when multiple ships call on your date. Morning summit runs suit full port days; shorter calls may suit downtown walks instead.",
      },
      {
        question: "Are Skagway arrival and departure times guaranteed?",
        answer:
          "No — published schedules are planning guides from verified imports. Weather, pier assignments, and cruise line changes can shift times. Confirm the daily program on your ship.",
      },
    ],
    internalLinks: [
      {
        label: "Skagway 2026 Schedule",
        href: "/ship-schedules/skagway/2026",
        description: "Verified monthly ship calls for the 2026 Alaska season.",
      },
      {
        label: "Skagway 2027 Schedule",
        href: "/ship-schedules/skagway/2027",
        description: "Verified monthly ship calls for the 2027 Alaska season.",
      },
      {
        label: "Skagway port guide",
        href: "/ports/skagway",
        description: "White Pass Railway, downtown walks, and Gold Rush history.",
      },
      {
        label: "Skagway Shore Excursions",
        href: "https://skagwayshoreexcursions.com",
        description: "Live tour listings, pier pickup, and operator pricing.",
        external: true,
      },
      {
        label: "Railway excursions",
        href: "/excursion-types/railway-tours",
        description: "How to book and time scenic railway tours from cruise ships.",
      },
      {
        label: "Alaska Excursion Planner",
        href: "/alaska-cruise-excursion-planner",
        description: "Match excursions to your ports and interests.",
      },
    ],
    hubDetails: {
      popularExcursions: [
        {
          name: "White Pass & Yukon Route railway",
          description: "Summit run to the pass — book early on multi-ship days.",
          duration: "3–4 hours",
        },
        {
          name: "Downtown Gold Rush walk",
          description: "Broadway shops and historic district from the cruise pier.",
          duration: "1–2 hours",
        },
        {
          name: "Dog sledding on glacier",
          description: "Summer glacier camp experiences with transport from downtown.",
          duration: "2–3 hours",
        },
      ],
      terminalInfo:
        "Broadway cruise docks — most ships berth within walking distance of downtown Skagway.",
      tenderVsDock: "Skagway uses downtown docks; no tender boats on standard cruise calls.",
      typicalTimeInPort: "Usually 6–9 hours — see monthly tables for verified averages on your sailing date.",
      bestExcursionTiming: [
        "Morning: White Pass summit departures before peak crowds",
        "Midday: shorter downtown walks and museum visits",
        "Full port day only: Yukon bus tours beyond the pass",
      ],
    },
  } satisfies SchedulePageContent,
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
