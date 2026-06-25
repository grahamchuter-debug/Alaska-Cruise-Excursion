/**
 * CruiseTimetables Alaska port slugs, display names, and itinerary regex patterns.
 * Shared by import-schedules, warm-schedule-cache, and import-schedules-slow.
 */

function itinerary(portLabel) {
  const escaped = portLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `${escaped}\\s*\\(\\s*(\\d{1,2}\\s+\\w{3})(?:\\s+(\\d{4})-(\\d{4})|\\s+a(\\d{4})|\\s+d(\\d{4}))?\\s*\\)`,
    "i",
  );
}

export const PORT_CONFIG = {
  juneau: {
    name: "Juneau",
    itineraryPortRegex: itinerary("Juneau, Alaska"),
    parseMode: "itinerary",
  },
  skagway: {
    name: "Skagway",
    itineraryPortRegex: itinerary("Skagway, Alaska"),
    parseMode: "itinerary",
  },
  ketchikan: {
    name: "Ketchikan",
    itineraryPortRegex: itinerary("Ketchikan, Alaska"),
    parseMode: "itinerary",
  },
  "ward-cove": {
    name: "Ward Cove",
    itineraryPortRegex: itinerary("Ward Cove, Alaska"),
    parseMode: "itinerary",
  },
  "icy-strait": {
    name: "Icy Strait",
    parseMode: "table",
    tenderNote: "Tender port — allow 20–30 minutes each way beyond published times.",
  },
  sitka: {
    name: "Sitka",
    itineraryPortRegex: itinerary("Sitka, Alaska"),
    parseMode: "itinerary",
    tenderNote: "May use tender or dock — confirm on your ship's daily program.",
  },
  haines: {
    name: "Haines",
    itineraryPortRegex: itinerary("Haines, Alaska"),
    parseMode: "itinerary",
  },
  seward: {
    name: "Seward",
    itineraryPortRegex: itinerary("Seward, Alaska"),
    parseMode: "itinerary",
  },
  whittier: {
    name: "Whittier",
    itineraryPortRegex: itinerary("Whittier, Alaska"),
    parseMode: "itinerary",
  },
};

export const ALL_PORT_SLUGS = Object.keys(PORT_CONFIG);
