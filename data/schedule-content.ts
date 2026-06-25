import type { FAQ } from "./types";

export const SCHEDULE_PLANNING_TIPS = [
  "Check published arrival and departure times before booking any shore excursion or independent tour.",
  "Leave enough buffer to return to the ship. Most lines require you back 30-60 minutes before departure.",
  "Some Caribbean ports use tender boats instead of dockside berthing; tender queues add time to your port day.",
  "Private tours and independent operators should confirm pier pickup and return times against your ship schedule.",
  "Peak call days with multiple ships in port can sell out popular beaches, catamarans, and Stingray-style tours early.",
] as const;

export const SCHEDULE_FAQS: FAQ[] = [
  {
    question: "How do I read the cruise ship schedule?",
    answer:
      "Each row lists the date a ship is due in port, the vessel and cruise line, published arrival and departure times, and estimated time in port. Use the month navigation to browse available months.",
  },
  {
    question: "Can ship arrival times change?",
    answer:
      "Yes. Cruise lines and port authorities can adjust arrival and departure times because of weather, tender conditions, traffic at the pier, or itinerary changes. Always check the daily program on your ship and with the shore excursion desk on port day.",
  },
  {
    question: "How much time should I leave before returning to the ship?",
    answer:
      "Plan to be back at the terminal or tender pickup point at least 30-60 minutes before your ship's published departure. Add extra time on tender ports, busy multi-ship days, and excursions that travel far from the pier.",
  },
  {
    question: "Should I book excursions before I cruise?",
    answer:
      "Book your must-do excursion early if you are visiting on a busy schedule day or want a specific operator. Once you know your ship's in-port window from this schedule, compare independent and specialist options that guarantee on-time return.",
  },
  {
    question: "Are cruise ship schedules always accurate?",
    answer:
      "Published schedules are planning guides, not guarantees. We update this page as verified data becomes available and mark months still being imported as 'Schedule data being updated'. Confirm final times with your cruise line before disembarking.",
  },
];
