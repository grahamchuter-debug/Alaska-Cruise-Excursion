import type { SignatureExcursionLogistics } from "./types";

const VOUCHER_MEETING = "Confirm meeting point on your final voucher.";

function mapsQuery(label: string, query: string): { googleMapsUrl: string; googleMapsLabel: string } {
  return {
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    googleMapsLabel: label,
  };
}

/** Signature excursion logistics — one row per port (Phase 1). */
export const signatureExcursionLogistics: SignatureExcursionLogistics[] = [
  {
    portSlug: "st-thomas",
    excursionName: "Magens Bay Beach Day",
    meetingPoint: "Cruise terminal taxi stand at Havensight or Crown Bay — your pier assignment is on your voucher.",
    distanceFromShip: "About 3 miles (5 km) from the Charlotte Amalie cruise terminals.",
    walkingTime: "Not realistic on foot from the pier.",
    taxiNeeded: "yes",
    walkingRealistic: "no",
    likelyPier: "Havensight Cruise Pier or Crown Bay Cruise Terminal",
    ...mapsQuery("Open Magens Bay on Google Maps", "Magens Bay Beach St Thomas USVI"),
    passengerNote:
      "St. Thomas taxis are unmetered. Agree your round-trip fare and return time with the driver before you leave the port.",
  },
  {
    portSlug: "cozumel",
    excursionName: "Palancar Reef Snorkel",
    meetingPoint: "Organized tour check-in at your cruise pier plaza in San Miguel de Cozumel.",
    distanceFromShip: "Reef sites are offshore — typically 10–20 minutes by boat from town.",
    walkingTime: "Short walk within the pier area only; the reef itself requires a boat.",
    taxiNeeded: "no",
    walkingRealistic: "depends",
    likelyPier: "Punta Langosta Pier, International Pier, or Puerta Maya Cruise Center",
    ...mapsQuery("Open Palancar Reef on Google Maps", "Palancar Reef Cozumel Mexico"),
    passengerNote:
      "Boat snorkel tours usually include pier pickup. If you book independently, confirm which pier your operator uses.",
  },
  {
    portSlug: "aruba",
    excursionName: "Eagle Beach & Snorkel Sail",
    meetingPoint: "Catamaran or tour desk near the Oranjestad cruise terminal waterfront.",
    distanceFromShip: "Sail and beach stops are a short ride from downtown Oranjestad.",
    walkingTime: "A few minutes on foot to nearby marina check-in desks; the sail itself is by boat.",
    taxiNeeded: "optional",
    walkingRealistic: "depends",
    likelyPier: "Oranjestad Cruise Terminal (downtown berths)",
    ...mapsQuery("Open Eagle Beach on Google Maps", "Eagle Beach Aruba"),
    passengerNote:
      "Many passengers walk from the gangway to nearby catamaran docks. Confirm your operator's check-in location on your voucher.",
  },
  {
    portSlug: "curacao",
    excursionName: "Tugboat Beach Snorkel",
    meetingPoint: "Organized tour pickup at your Willemstad cruise terminal — Mathey Wharf or Mega Pier.",
    distanceFromShip: "About 15–20 minutes by road to the Tugboat Beach snorkel area.",
    walkingTime: "Not walkable from the cruise piers.",
    taxiNeeded: "optional",
    walkingRealistic: "no",
    likelyPier: "Mathey Wharf or Mega Pier (Willemstad)",
    ...mapsQuery("Open Tugboat Beach on Google Maps", "Tugboat Beach Curacao"),
    passengerNote:
      "Most snorkel tours include port pickup. DIY travellers can taxi to Caracasbaai / Tugboat area — confirm access with your operator.",
  },
  {
    portSlug: "grand-cayman",
    excursionName: "Stingray City Sandbar",
    meetingPoint: "George Town tender landing, then your tour operator's boat dock in the harbour.",
    distanceFromShip: "About 25–40 minutes by boat from George Town to the sandbar.",
    walkingTime: "Short walk from tender pier to boat dock; sandbar visit is by boat only.",
    taxiNeeded: "no",
    walkingRealistic: "no",
    likelyPier: "George Town tender anchorage (ships anchor offshore)",
    ...mapsQuery("Open Stingray City on Google Maps", "Stingray City Sandbar Grand Cayman"),
    passengerNote:
      "Allow extra time for tender boats from your ship before your Stingray City departure. Book the earliest boat slot when possible.",
  },
  {
    portSlug: "st-maarten",
    excursionName: "Orient Bay Beach Club",
    meetingPoint: "Philipsburg cruise terminal taxi stand or organized coach pickup at Dr. A.C. Wathey terminal.",
    distanceFromShip: "About 25 minutes by road to Orient Bay on the French side.",
    walkingTime: "Not walkable from the cruise pier.",
    taxiNeeded: "yes",
    walkingRealistic: "no",
    likelyPier: "Dr. A.C. Wathey Cruise & Cargo Facility (Philipsburg)",
    ...mapsQuery("Open Orient Bay on Google Maps", "Orient Bay Beach St Martin"),
    passengerNote:
      "Orient Bay is on the French side — carry photo ID. Shared taxis and organized transfers are the usual approach for cruise passengers.",
  },
  {
    portSlug: "nassau",
    excursionName: "Atlantis Aquaventure",
    meetingPoint: "Prince George Wharf cruise port, then taxi or arranged transfer to Paradise Island.",
    distanceFromShip: "About 3 miles (5 km) to Atlantis on Paradise Island — roughly 10 minutes by taxi.",
    walkingTime: "Not practical on foot from the downtown cruise pier.",
    taxiNeeded: "yes",
    walkingRealistic: "no",
    likelyPier: "Prince George Wharf (downtown Nassau)",
    ...mapsQuery("Open Atlantis Paradise Island on Google Maps", "Atlantis Paradise Island Bahamas"),
    passengerNote:
      "Pre-booked Atlantis passes often include transport details. Confirm whether your package covers the bridge/taxi transfer.",
  },
  {
    portSlug: "roatan",
    excursionName: "West Bay Beach & Snorkel",
    meetingPoint: "Your assigned cruise terminal — Mahogany Bay Cruise Center or Coxen Hole terminal.",
    distanceFromShip: "About 20 minutes by taxi from Mahogany Bay to West Bay (varies by terminal).",
    walkingTime: "Not walkable from either cruise terminal.",
    taxiNeeded: "yes",
    walkingRealistic: "no",
    likelyPier: "Mahogany Bay Cruise Center or Coxen Hole Cruise Terminal",
    ...mapsQuery("Open West Bay Beach on Google Maps", "West Bay Beach Roatan Honduras"),
    passengerNote:
      "Check which terminal your ship uses before booking — taxi times differ between Mahogany Bay and Coxen Hole.",
  },
  {
    portSlug: "costa-maya",
    excursionName: "Chacchoben Ruins & Mahahual Beach",
    meetingPoint: "Costa Maya cruise port coach pickup in the Mahahual village terminal area.",
    distanceFromShip: "Mahahual village is at the pier; Chacchoben ruins are roughly 1 hour inland by coach.",
    walkingTime: "Village beach is walkable from the pier; ruins require an organized coach.",
    taxiNeeded: "optional",
    walkingRealistic: "depends",
    likelyPier: "Costa Maya Cruise Port (Mahahual village)",
    ...mapsQuery("Open Chacchoben on Google Maps", "Chacchoben Mayan Ruins Costa Maya"),
    passengerNote:
      "Combo tours handle both sites on one coach. Beach-only days can stay in the port village without a long transfer.",
  },
  {
    portSlug: "puerto-plata",
    excursionName: "27 Charcos Waterfalls",
    meetingPoint: "Excursion desk at Amber Cove or Taíno Bay — confirm which terminal your ship uses.",
    distanceFromShip: "Roughly 30–45 minutes by coach to the Damajagua / 27 Waterfalls area (varies by operator).",
    walkingTime: "Coach transfer only — not walkable from the cruise terminals.",
    taxiNeeded: "no",
    walkingRealistic: "no",
    likelyPier: "Amber Cove Cruise Center or Taíno Bay Cruise Port",
    ...mapsQuery("Open 27 Waterfalls on Google Maps", "27 Charcos de Damajagua Puerto Plata"),
    passengerNote:
      "This is an active waterfall hike — wear water shoes and follow your guide. Puerto Plata ships berth at Amber Cove or Taíno Bay, not downtown city piers.",
  },
  {
    portSlug: "ocho-rios",
    excursionName: "Dunn's River Falls Climb",
    meetingPoint: "Ocho Rios cruise pier or nearby coach pickup — confirm exact location on your voucher.",
    distanceFromShip: "About 5–10 minutes by road from the cruise pier to Dunn's River Falls.",
    walkingTime: "Short drive only — not a practical walk from the pier.",
    taxiNeeded: "optional",
    walkingRealistic: "depends",
    likelyPier: "Ocho Rios Cruise Pier",
    ...mapsQuery("Open Dunn's River Falls on Google Maps", "Dunn's River Falls Ocho Rios Jamaica"),
    passengerNote:
      "Book the first morning slot when possible to avoid crowds. The falls climb is guided — follow the human chain formation.",
  },
  {
    portSlug: "falmouth",
    excursionName: "Martha Brae River Rafting",
    meetingPoint: "Historic Falmouth Pier area — organized coach pickup near the terminal.",
    distanceFromShip: "Roughly 20–30 minutes by coach to the Martha Brae rafting launch (varies by operator).",
    walkingTime: "Coach transfer only.",
    taxiNeeded: "no",
    walkingRealistic: "no",
    likelyPier: "Historic Falmouth Pier",
    ...mapsQuery("Open Martha Brae on Google Maps", "Martha Brae River Rafting Jamaica"),
    passengerNote:
      "Falmouth is a quieter Jamaica port — most rafting tours include round-trip coach from the pier.",
  },
  {
    portSlug: "puerto-limon",
    excursionName: "Sloth Sanctuary Tour",
    meetingPoint: "Limón Cruise Terminal (JAPDEVA pier) excursion meeting area.",
    distanceFromShip: "Sanctuary locations are inland — typically 30–60 minutes by coach depending on the operator.",
    walkingTime: "Coach transfer only.",
    taxiNeeded: "no",
    walkingRealistic: "no",
    likelyPier: "Limón Cruise Terminal (JAPDEVA pier)",
    passengerNote:
      "Rainforest wildlife tours depart from the terminal area. Wear light layers — Limón can be humid even on cloudy days.",
  },
  {
    portSlug: "bonaire",
    excursionName: "Marine Park Shore Reef Snorkel",
    meetingPoint: "Kralendijk cruise pier or nearby dive/snorkel shop — confirm on your voucher.",
    distanceFromShip: "Many marine park sites are a short taxi ride or brief walk from the waterfront.",
    walkingTime: "Some shore snorkel sites are walkable from Kralendijk; others need a short taxi.",
    taxiNeeded: "optional",
    walkingRealistic: "depends",
    likelyPier: "Kralendijk Cruise Pier",
    ...mapsQuery("Open Bonaire National Marine Park on Google Maps", "Bonaire National Marine Park"),
    passengerNote:
      "Bonaire is famous for shore snorkeling with marked sites. If you rent gear, confirm how you will return to the ship on time.",
  },
  {
    portSlug: "tortola",
    excursionName: "BVI Catamaran Snorkel Sail",
    meetingPoint: "Road Town tender landing, then marina check-in for your catamaran — confirm on your voucher.",
    distanceFromShip: "Catamarans depart from Road Town harbour — short walk from the tender pier.",
    walkingTime: "Usually a few minutes on foot from tender landing to marina docks.",
    taxiNeeded: "no",
    walkingRealistic: "depends",
    likelyPier: "Road Town tender landing (ships anchor in harbour)",
    passengerNote:
      "Allow tender time from your ship before catamaran check-in. BVI sails may visit multiple coves — confirm return timing with the crew.",
  },
  {
    portSlug: "progreso",
    excursionName: "Mérida Colonial City Tour",
    meetingPoint: "Progreso International Terminal coach pickup at the end of the cruise pier.",
    distanceFromShip: "Mérida city centre is roughly 30–40 minutes inland by coach from Progreso.",
    walkingTime: "Coach transfer to Mérida; walking happens in the colonial centre on the tour.",
    taxiNeeded: "no",
    walkingRealistic: "no",
    likelyPier: "Progreso International Terminal (long pier)",
    ...mapsQuery("Open Mérida centro on Google Maps", "Merida Yucatan Mexico historic centre"),
    passengerNote:
      "Allow time for the shuttle along the long pier access road before your coach departs.",
  },
  {
    portSlug: "samana",
    excursionName: "Humpback Whale Watching",
    meetingPoint: "Samaná cruise terminal or bay-side excursion dock — confirm on your voucher.",
    distanceFromShip: "Short transfer to whale-watching boats in Samaná Bay.",
    walkingTime: "Usually a short walk or brief transfer from the terminal to the boat.",
    taxiNeeded: "optional",
    walkingRealistic: "depends",
    likelyPier: "Samaná Cruise Terminal",
    ...mapsQuery("Open Samaná Bay on Google Maps", "Samaná Bay Dominican Republic"),
    passengerNote:
      "Peak humpback season is typically January through March. Outside that window, operators may offer different wildlife or bay tours.",
  },
  {
    portSlug: "la-romana",
    excursionName: "Saona Island Catamaran",
    meetingPoint: "Casa de Campo Cruise Port — catamaran check-in at or near the terminal.",
    distanceFromShip: "Saona Island is reached by catamaran — crossing time varies (often 45–90 minutes each way).",
    walkingTime: "Boat excursion only after terminal check-in.",
    taxiNeeded: "no",
    walkingRealistic: "no",
    likelyPier: "Casa de Campo Cruise Port",
    ...mapsQuery("Open Saona Island on Google Maps", "Saona Island Dominican Republic"),
    passengerNote:
      "Full-day catamaran tours include lunch and beach time on Saona. Confirm all-aboard time with the crew before you explore.",
  },
  {
    portSlug: "montego-bay",
    excursionName: "Doctor's Cave Beach Day",
    meetingPoint: "Montego Bay cruise terminal taxi stand — confirm on your voucher.",
    distanceFromShip: "About 3 miles (5 km) to Doctor's Cave Beach on the Hip Strip — roughly 10–15 minutes by taxi.",
    walkingTime: "Not realistic on foot from the cruise terminal.",
    taxiNeeded: "yes",
    walkingRealistic: "no",
    likelyPier: "Montego Bay Cruise Terminal",
    ...mapsQuery("Open Doctor's Cave Beach on Google Maps", "Doctors Cave Beach Montego Bay Jamaica"),
    passengerNote:
      "Doctor's Cave has an entry fee for beach facilities. Agree your taxi return time before you head to the Hip Strip.",
  },
];

/** Ports where meeting point detail is operator-specific — use voucher fallback in copy. */
export const signatureExcursionLogisticsByPort: Record<string, SignatureExcursionLogistics> =
  Object.fromEntries(signatureExcursionLogistics.map((row) => [row.portSlug, row]));

export function getSignatureExcursionLogistics(portSlug: string): SignatureExcursionLogistics | undefined {
  return signatureExcursionLogisticsByPort[portSlug];
}

export { VOUCHER_MEETING };
