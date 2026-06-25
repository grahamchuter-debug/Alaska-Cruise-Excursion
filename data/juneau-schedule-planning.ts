import type { PlanningYourDayContent } from "./schedule-page-types";

export const JUNEAU_SCHEDULE_PLANNING_TIPS = [
  "Book morning whale-watching departures early on multi-ship days — downtown excursion docks fill quickly from May through September.",
  "Mendenhall Glacier is taxi-distance from the cruise terminal; allow 45–60 minutes round trip plus visitor centre time.",
  "Helicopter glacier landings cancel in low cloud — keep a backup plan such as whale watching or a downtown walk.",
  "Tracy Arm and Endicott Arm full-day fjord trips need a long port window; confirm your arrival and departure before booking.",
  "Taxis and ride-shares serve the cruise docks, but tour operators with pier pickup reduce return-to-ship risk on busy days.",
  "Plan to be back at the gangway at least 45–60 minutes before published departure — Juneau docks downtown, but excursion traffic still backs up.",
] as const;

export const juneauPlanningYourDay: PlanningYourDayContent = {
  summary:
    "Juneau ships dock downtown, so most signature excursions start within minutes of the gangway. Match one anchor experience — whales, Mendenhall Glacier, helicopter flightseeing, or a Tracy Arm day boat — to your verified in-port window, then layer shorter stops if time allows.",
  typicalActivities: [
    "Morning humpback whale watching from Auke Bay or downtown excursion docks",
    "Mendenhall Glacier visitor centre, Nugget Falls trail, and photo stops via taxi or tour",
    "Helicopter glacier landings and icefield flightseeing when weather windows are clear",
    "Full-day Tracy Arm or Endicott Arm fjord cruises when your ship allows 8+ hours ashore",
    "Afternoon State Street walks, Mount Roberts Tram, and salmon bakes on late-departure days",
  ],
  topAttractions: [
    "Mendenhall Glacier & Visitor Center",
    "Auke Bay whale watching departures",
    "Helicopter glacier landings on the Juneau Icefield",
    "Tracy Arm / Endicott Arm tidewater glacier day boats",
    "Mount Roberts Tram above downtown",
  ],
  recommendedExcursions: [
    "Humpback whale watching with naturalist guides",
    "Mendenhall Glacier tour with guaranteed return timing",
    "Helicopter glacier landing or dog-sled camp combo",
    "Tracy Arm fjord wildlife and glacier cruise",
  ],
  timingConsiderations: [
    "Open your Juneau monthly schedule first — multi-ship days sell out whale boats and helicopters earliest",
    "Morning departures suit whale watching; glacier helicopters need clearer midday weather",
    "Tracy Arm trips typically need a full port day — avoid if your departure is before mid-afternoon",
    "Taxi queues grow when several ships share downtown — book tours with pier pickup when possible",
  ],
  returnGuidance:
    "Juneau uses downtown docks, but still plan to be at the gangway 45–60 minutes before all-aboard. Independent taxis and ride-shares can queue on peak summer days — operators with pier return guarantees reduce missed-ship risk.",
};

export const JUNEAU_SCHEDULE_INTRO =
  "Juneau is Alaska's busiest cruise port and the only destination on this site with live imported ship schedules today. Use monthly tables to see competing vessels on your pier day, then book whale watching, Mendenhall Glacier visits, helicopter tours, or Tracy Arm trips around verified arrival and departure windows.";

export const JUNEAU_MONTH_PLANNING_INTRO =
  "Use this month's verified ship list to time whale watching, Mendenhall Glacier taxis, helicopter departures, and Tracy Arm day boats. Downtown docks keep transfers short, but popular operators still sell out when multiple ships share the port.";
