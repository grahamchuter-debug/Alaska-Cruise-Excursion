import { getSchedulePortCount } from "./content-inventory";
import {
  getAllSchedulePortSlugs,
  getScheduleForPortYear,
  getSchedulePortBySlug,
  getShipCallCountForPortYear,
  schedulePorts,
} from "./schedules";
import { getEntryMonthKey, MONTH_LABELS } from "../lib/schedule-utils";

/** Industry-average estimate when published passenger counts are unavailable. */
export const ESTIMATED_PASSENGERS_PER_CALL = 3000;

export interface PortYearStats {
  slug: string;
  name: string;
  country: string;
  region: string;
  shipCalls: number;
  estimatedPassengers: number | null;
  hasVerifiedData: boolean;
}

export interface MonthlyCallStats {
  monthKey: string;
  monthLabel: string;
  shipCalls: number;
}

function getPortRegion(slug: string): string {
  const regions: Record<string, string> = {
    juneau: "Inside Passage",
    skagway: "Inside Passage",
    ketchikan: "Inside Passage",
    "ward-cove": "Inside Passage",
    "icy-strait": "Inside Passage",
    sitka: "Inside Passage",
    haines: "Inside Passage",
    seward: "Gulf of Alaska",
    whittier: "Gulf of Alaska",
  };
  return regions[slug] ?? "Alaska";
}

export function getPortYearStats(slug: string, year: number): PortYearStats | undefined {
  const port = getSchedulePortBySlug(slug);
  if (!port) return undefined;

  const shipCalls = getShipCallCountForPortYear(slug, year);
  const hasVerifiedData = shipCalls > 0;

  return {
    slug,
    name: port.name,
    country: port.country,
    region: getPortRegion(slug),
    shipCalls,
    estimatedPassengers: hasVerifiedData ? shipCalls * ESTIMATED_PASSENGERS_PER_CALL : null,
    hasVerifiedData,
  };
}

export function getAllPortYearStats(year: number): PortYearStats[] {
  return getAllSchedulePortSlugs()
    .map((slug) => getPortYearStats(slug, year))
    .filter((stats): stats is PortYearStats => Boolean(stats));
}

export function getVerifiedPortRankings(year: number): PortYearStats[] {
  return getAllPortYearStats(year)
    .filter((stats) => stats.hasVerifiedData)
    .sort((a, b) => b.shipCalls - a.shipCalls);
}

export function getMonthlyCallTotals(year: number): MonthlyCallStats[] {
  const totals = new Map<string, number>();

  for (const port of schedulePorts) {
    for (const entry of getScheduleForPortYear(port.slug, year)) {
      const monthKey = getEntryMonthKey(entry);
      totals.set(monthKey, (totals.get(monthKey) ?? 0) + 1);
    }
  }

  return [...totals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, shipCalls]) => {
      const month = Number(monthKey.split("-")[1]);
      const yearNum = Number(monthKey.split("-")[0]);
      return {
        monthKey,
        monthLabel: `${MONTH_LABELS[month - 1]} ${yearNum}`,
        shipCalls,
      };
    });
}

export function getPeakMonths(year: number, limit = 5): MonthlyCallStats[] {
  return [...getMonthlyCallTotals(year)].sort((a, b) => b.shipCalls - a.shipCalls).slice(0, limit);
}

export function getAlaskaScheduleInsights(year: 2026 | 2027) {
  const schedulePortCount = getSchedulePortCount();
  const rankings = getVerifiedPortRankings(year);
  const leader = rankings[0];

  return {
    intro: `This hub ranks Alaska cruise ports using verified ${year} ship call data where imported. ${schedulePortCount} ports have schedule framework pages; passenger figures use a 3,000-guest industry average when cruise lines do not publish capacity.`,
    planningInsights: [
      leader
        ? `${leader.name} leads verified ${year} call volume among imported schedules — book whale tours, railway seats, and flightseeing early on multi-ship weeks.`
        : "Juneau, Skagway, and Ketchikan typically lead Inside Passage call volume once imports complete.",
      "Tender ports (Sitka, Icy Strait) need 45–60 minutes return buffer beyond published departure times.",
      "Gulf ports (Seward, Whittier) often anchor one-way itineraries — match Kenai Fjords or Prince William Sound tours to your ship's window.",
      "Compare monthly schedule pages to spot quieter pier days before booking independent operators.",
      "Ward Cove shares the Ketchikan area — confirm which berth your ship uses before booking walkable downtown tours.",
    ],
    faqs: [
      {
        question: `Which Alaska cruise port has the most ship calls in ${year}?`,
        answer: leader
          ? `Among verified schedules on this site, ${leader.name} has the highest ${year} ship call count with ${leader.shipCalls} imported calls. Rankings update as more monthly imports complete.`
          : `Rankings populate as verified ${year} monthly imports complete. Open each port hub to see current call totals.`,
      },
      {
        question: "How are passenger estimates calculated?",
        answer:
          "When cruise lines do not publish capacity, we multiply verified ship calls by 3,000 guests as a conservative industry average. Treat these as planning estimates, not official port authority totals.",
      },
      {
        question: "Why do some ports show zero verified calls?",
        answer:
          "Only ports with completed imports display verified totals. Ward Cove may remain empty until a dedicated source is available — we do not invent placeholder sailings.",
      },
    ],
  };
}

export function getBusiestPorts2027Insights() {
  return getAlaskaScheduleInsights(2027);
}

/** @deprecated Use getAlaskaScheduleInsights() */
export const busiestPorts2027Insights = getBusiestPorts2027Insights();

export const calendar2027Insights = {
  intro:
    "Use this Alaska cruise season guide alongside verified ship schedules. Peak wildlife and glacier touring runs May through September, with June and July the busiest Inside Passage months.",
  regionalPatterns: [
    {
      region: "Inside Passage",
      bestMonths: "May through September",
      notes: "Juneau, Skagway, and Ketchikan anchor most 7-night loops. Whale activity peaks June–August.",
      portSlugs: ["juneau", "skagway", "ketchikan", "sitka", "haines", "icy-strait"],
    },
    {
      region: "Gulf of Alaska",
      bestMonths: "May through September",
      notes: "Seward and Whittier bookend one-way Gulf routes with Kenai Fjords and Prince William Sound excursions.",
      portSlugs: ["seward", "whittier"],
    },
  ],
  seasonalNotes: [
    {
      title: "Early season (May)",
      description:
        "Fewer ships and cooler weather — good for railway and culture tours; wildlife viewing builds through the month.",
    },
    {
      title: "Peak season (June–July)",
      description:
        "Highest call volumes at Juneau and Skagway. Book whale watching, White Pass Railway, and bear viewing early.",
    },
    {
      title: "Late season (August–September)",
      description:
        "Still strong sailing traffic with autumn colour in Haines and Sitka. Weather windows matter more for flightseeing.",
    },
  ],
  faqs: [
    {
      question: "What is the busiest cruise month in Alaska for 2027?",
      answer:
        "Based on verified schedules as imports complete, July and August typically show the highest combined Inside Passage call totals.",
    },
    {
      question: "When is the best time for whale watching?",
      answer:
        "Humpback season runs May through September with peak activity June–August in Juneau and Icy Strait waters.",
    },
    {
      question: "How do I use schedules with excursion planning?",
      answer:
        "Open your port's year page, confirm arrival and departure on your sailing date, then use the Alaska excursion planner to match tour length to your window.",
    },
  ],
};
