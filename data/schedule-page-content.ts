import type { ScheduleYear } from "@/lib/schedule-utils";
import { getAverageTimeInPort } from "./port-planning";
import { scheduleHubContent } from "./schedule-hub-content";
import { SCHEDULE_HUB_PORT_SLUGS, type ScheduleHubPortSlug, type SchedulePageContent, type SchedulePageContentKey } from "./schedule-page-types";

export type {
  ScheduleHubPortSlug,
  SchedulePageContent,
  SchedulePageContentKey,
  PlanningYourDayContent,
  SchedulePageInternalLink,
  ScheduleHubDetails,
} from "./schedule-page-types";

export { SCHEDULE_HUB_PORT_SLUGS } from "./schedule-page-types";

const alaskaPlanning = {
  summary:
    "Every Alaska port day follows the same rhythm — confirm your ship's times, pick one anchor experience (whales, glaciers, rail, or bears), then layer shorter stops around safe return margins.",
  typicalActivities: [
    "Morning whale watching or wildlife cruises while marine activity peaks",
    "Midday glacier flightseeing or railway runs when weather windows are clearest",
    "Afternoon downtown walks or shorter cultural stops on late-departure days",
  ],
  topAttractions: [
    "Juneau — Mendenhall Glacier, whale watching, and downtown State Street",
    "Skagway — White Pass Railway and Gold Rush historic district",
    "Ketchikan — totem parks, Misty Fjords flightseeing, and Creek Street",
    "Seward — Kenai Fjords National Park wildlife and glacier cruises",
  ],
  recommendedExcursions: [
    "Whale watching and marine wildlife tours on Inside Passage ports",
    "White Pass Railway and Alaska Railroad segments on Skagway and Gulf routes",
    "Bear viewing and flightseeing when port windows allow half-day or longer tours",
  ],
  timingConsiderations: [
    "Open your port's year page first, then the month that matches your sailing",
    "Book rail, bear viewing, and flightseeing early on peak June and July weeks",
    "Tender ports (Sitka, Icy Strait) need extra return buffer beyond published departure",
  ],
  returnGuidance:
    "Plan to be back at the gangway or tender pickup at least 45–60 minutes before published departure. Weather, pier assignments, and tunnel or flight delays can shift timing — confirm on your ship each morning.",
};

const schedulePageContent: Record<SchedulePageContentKey, SchedulePageContent> = {
  ...scheduleHubContent,
  home: {
    intro:
      "This is the starting point for Alaska cruise ship schedules. Juneau is the only port with live imported ship calls today — browse monthly tables there first. Hub pages for Skagway, Ketchikan, Seward, and other ports are ready while additional monthly data is imported and verified. We never show placeholder sailings.",
    heroSubtitle:
      "Alaska cruise ship schedules — Juneau has live imported data today. Additional ports are added as monthly imports are verified.",
    whyPassengersUse: [
      "Match shore excursions to your actual in-port window before you enquire — whale tours, White Pass Railway, and bear viewing all need enough time ashore.",
      "Spot busy pier days when multiple ships share Juneau or Ketchikan so you can book early or choose less crowded alternatives.",
      "Build a realistic return buffer: docked ports still need 45–60 minutes before all-aboard; tender ports like Sitka and Icy Strait need extra margin.",
      "Compare 2026 versus 2027 call patterns when choosing between Inside Passage loops and Gulf one-way itineraries.",
    ],
    planningYourDay: alaskaPlanning,
    faqs: [
      {
        question: "Which Alaska ports have live schedule data?",
        answer:
          "Juneau is the only port with live imported ship schedules on this site today. Other hub ports (Skagway, Ketchikan, Seward, Whittier, Haines, Sitka, Icy Strait, Ward Cove) show framework pages until verified monthly imports are published.",
      },
      {
        question: "Why check the schedule before booking shore excursions?",
        answer:
          "Your in-port window determines which tours are realistic. A full day in Skagway suits White Pass Railway; a short Juneau call may suit whale watching downtown better than a helicopter landing. Matching excursions to schedule times reduces missed-departure risk.",
      },
      {
        question: "Do busy port days affect excursion availability?",
        answer:
          "Yes. When multiple ships call at Juneau or Skagway in peak season, popular whale boats, railway seats, and flightseeing slots fill faster. The schedule shows competing vessels on your pier day so you can reserve early.",
      },
      {
        question: "Are arrival and departure times on this hub guaranteed?",
        answer:
          "No — published schedules are planning guides. Weather, pier assignments, tender conditions, and cruise line changes can shift times. Always confirm the daily program on your ship before leaving for an independent excursion.",
      },
    ],
    internalLinks: [
      { label: "2026 Alaska Schedules", href: "/ship-schedules/2026", description: "Master hub for 2026 port calls." },
      { label: "2027 Alaska Schedules", href: "/ship-schedules/2027", description: "Master hub for 2027 port calls." },
      { label: "Alaska Excursion Planner", href: "/alaska-cruise-excursion-planner", description: "Match excursions to ports and interests." },
      { label: "Juneau Schedule Hub", href: "/ship-schedules/juneau", description: "Live imported schedule — Alaska's busiest port." },
      { label: "Skagway Schedule Hub", href: "/ship-schedules/skagway", description: "Coming soon — import pending." },
      { label: "Seward Schedule Hub", href: "/ship-schedules/seward", description: "Coming soon — import pending." },
    ],
  },
  "year-2026": {
    intro:
      "The 2026 master hub collects Alaska cruise ship schedules in one place so you can compare call volumes before locking in shore excursions. Every listed port has a dedicated 2026 page with monthly tables — verified rows appear as imports land; empty months show a clear placeholder.",
    heroSubtitle:
      "Master 2026 Alaska hub: browse every port, compare ship calls as data imports, and plan shore excursions around published arrival and departure times.",
    whyPassengersUse: [
      "Compare how many ships call at each Alaska port across 2026 before choosing Inside Passage versus Gulf itineraries.",
      "Identify peak multi-ship weeks at Juneau and Skagway when whale tours and railway seats sell out earliest.",
      "Anchor excursion planning to verified arrival and departure windows instead of guessing from brochure itineraries.",
      "Cross-check 2026 against 2027 sail dates when deciding between back-to-back Alaska seasons.",
    ],
    planningYourDay: {
      ...alaskaPlanning,
      summary:
        "Use the 2026 hub to map your full itinerary, then open each port's year page for month-by-month ship lists and passenger planning detail.",
    },
    faqs: [
      {
        question: "Which Alaska ports have 2026 schedule data?",
        answer:
          "Only Juneau has verified imported 2026 ship calls published today. Other hub ports have framework year pages — empty months mean imports are pending, not invented sailings.",
      },
      {
        question: "How should I use the 2026 rankings table?",
        answer:
          "Once imports land, ports are ranked by verified call volume. Use this to spot the busiest terminals before booking whale tours, railway seats, or flightseeing on your exact pier day.",
      },
      {
        question: "Can I plan excursions before schedule data is imported?",
        answer:
          "Yes — use port guides and the excursion planner for options, then confirm timing against your ship's daily program and monthly schedule tables when verified rows are available.",
      },
    ],
    internalLinks: [
      { label: "2027 Alaska Schedules", href: "/ship-schedules/2027", description: "Compare the following season." },
      { label: "Juneau 2026", href: "/ship-schedules/juneau/2026", description: "Juneau monthly ship calls." },
      { label: "Skagway 2026", href: "/ship-schedules/skagway/2026", description: "Skagway monthly ship calls." },
      { label: "All Schedule Hubs", href: "/ship-schedules", description: "Return to the master schedule hub." },
    ],
  },
  "year-2027": {
    intro:
      "The 2027 master hub collects Alaska cruise ship schedules in one place so you can compare call volumes before locking in shore excursions. Every listed port has a dedicated 2027 page with monthly tables — verified rows are imported from monthly source data as it becomes available.",
    heroSubtitle:
      "Master 2027 Alaska hub: browse every port, compare ship calls as data imports, and plan shore excursions around published arrival and departure times.",
    whyPassengersUse: [
      "Compare how many ships call at each Alaska port across 2027 before choosing Inside Passage versus Gulf itineraries.",
      "Identify peak multi-ship weeks at Juneau and Ketchikan when wildlife tours and flightseeing sell out earliest.",
      "Anchor excursion bookings to verified arrival and departure windows instead of guessing from brochure itineraries.",
      "Cross-check 2027 against 2026 sail dates when your travel dates span seasons.",
    ],
    planningYourDay: {
      ...alaskaPlanning,
      summary:
        "Use the 2027 hub to map your full itinerary, then open each port's year page for month-by-month ship lists and passenger planning detail.",
    },
    faqs: [
      {
        question: "Which Alaska ports have 2027 schedule data?",
        answer:
          "Only Juneau has verified imported 2027 ship calls published today. Skagway, Ketchikan, Seward, and other hubs will populate month by month as imports complete.",
      },
      {
        question: "How should I use the 2027 rankings table?",
        answer:
          "Once imports land, ports are ranked by verified call volume. Juneau, Skagway, and Ketchikan typically lead Inside Passage traffic — use rankings to plan around busy pier days.",
      },
      {
        question: "Are 2027 times final?",
        answer:
          "No — schedules are planning guides. Weather, pier assignments, and cruise line changes can shift times. Always confirm on your ship before leaving for an independent excursion.",
      },
    ],
    internalLinks: [
      { label: "2026 Alaska Schedules", href: "/ship-schedules/2026", description: "Compare the prior season." },
      { label: "Juneau 2027", href: "/ship-schedules/juneau/2027", description: "Juneau monthly ship calls." },
      { label: "Ketchikan 2027", href: "/ship-schedules/ketchikan/2027", description: "Ketchikan monthly ship calls." },
      { label: "All Schedule Hubs", href: "/ship-schedules", description: "Return to the master schedule hub." },
    ],
  },
};

export function getSchedulePageContentKey(
  page: "home" | { year: ScheduleYear } | { portSlug: string; year: ScheduleYear },
): SchedulePageContentKey | null {
  if (page === "home") return "home";
  if ("year" in page && !("portSlug" in page)) return `year-${page.year}` as SchedulePageContentKey;
  if ("portSlug" in page && "year" in page) {
    const key = `${page.portSlug}-${page.year}` as SchedulePageContentKey;
    return key in schedulePageContent ? key : null;
  }
  return null;
}

export function getSchedulePageContent(key: SchedulePageContentKey): SchedulePageContent {
  return schedulePageContent[key];
}

export function getSchedulePageContentForPortYear(
  portSlug: string,
  year: ScheduleYear,
): SchedulePageContent | null {
  const key = getSchedulePageContentKey({ portSlug, year });
  return key ? getSchedulePageContent(key) : null;
}

export function getSchedulePageContentForPortHub(portSlug: string): SchedulePageContent | null {
  const key = `${portSlug}-hub` as SchedulePageContentKey;
  if (!(key in schedulePageContent)) return null;

  const content = schedulePageContent[key];
  const verifiedTime = getAverageTimeInPort(portSlug);
  if (!verifiedTime || !content.hubDetails) return content;

  return {
    ...content,
    hubDetails: {
      ...content.hubDetails,
      typicalTimeInPort: `${verifiedTime} — derived from verified schedule imports at this port.`,
    },
  };
}

export function isScheduleHubPortSlug(slug: string): slug is ScheduleHubPortSlug {
  return (SCHEDULE_HUB_PORT_SLUGS as readonly string[]).includes(slug);
}
