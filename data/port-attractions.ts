import type { AttractionGuidePage } from "./types";

const HUB_NASSAU_PORT = "/ports/nassau";
const HUB_NASSAU_SCHEDULE = "/ship-schedules/nassau";
const HUB_NASSAU_SPECIALIST = "https://nassaucruiseexcursions.com";
const HUB_BAHAMAS_PLANNER = "/bahamas-cruise-planner";

const HUB_GRAND_CAYMAN_PORT = "/ports/grand-cayman";
const HUB_GRAND_CAYMAN_SCHEDULE = "/ship-schedules/grand-cayman";
const HUB_GRAND_CAYMAN_SPECIALIST = "https://grandcaymanshoreexcursion.com";

const HUB_ST_MAARTEN_PORT = "/ports/st-maarten";
const HUB_ST_MAARTEN_SCHEDULE = "/ship-schedules/st-maarten";
const HUB_ST_MAARTEN_SPECIALIST = "https://stmaartenshoreexcursions.com";
const HUB_VIRGIN_ISLANDS_PLANNER = "/virgin-islands-cruise-planner";

const HUB_COZUMEL_PORT = "/ports/cozumel";
const HUB_COZUMEL_SCHEDULE = "/ship-schedules/cozumel";
const HUB_COZUMEL_SPECIALIST = "https://cozumelcruiseexcursion.com";
const HUB_MEXICAN_CARIBBEAN_PLANNER = "/mexican-caribbean-cruise-planner";

const HUB_BEACH_EXCURSIONS = "/best-caribbean-beach-excursions";
const HUB_SNORKEL_EXCURSIONS = "/best-caribbean-snorkeling-excursions";
const HUB_WILDLIFE_EXCURSIONS = "/best-caribbean-wildlife-excursions";

export const portAttractionGuides: AttractionGuidePage[] = [
  {
    slug: "atlantis-nassau",
    portSlug: "nassau",
    title: "Atlantis Paradise Island Nassau Cruise Guide",
    seoTitle: "Atlantis Nassau Guide for Cruise Passengers",
    metaDescription:
      "Atlantis Paradise Island Nassau cruise guide: Aquaventure water park, beach access, distance from Prince George Wharf, day-pass tips, time needed, and recommended Nassau shore excursions.",
    heroSubtitle:
      "Paradise Island's iconic resort — water slides, marine habitats, and beaches a short bridge ride from downtown Nassau.",
    category: "sightseeing",
    whatItIs:
      "Atlantis is a sprawling resort complex on Paradise Island across the bridge from downtown Nassau. Cruise passengers typically visit via day passes for Aquaventure water park, marine exhibits including The Dig aquarium, and resort beaches rather than staying overnight.",
    whyCruisePassengersVisit:
      "Families and first-time Bahamas visitors choose Atlantis for a turnkey resort day — thrilling slides, lazy rivers, dolphin encounters (booked separately), and photo-worthy lagoons without flying to an outer island. It is the highest-profile attraction within easy reach of the cruise pier.",
    distanceFromPort:
      "About 2 miles (3 km) from Prince George Wharf — roughly 10 minutes by taxi or organized shuttle across the Paradise Island bridge. Some excursions include pier pickup.",
    bestFor: ["Families", "Water park lovers", "First-time Nassau visitors", "Rainy-day backup", "Resort beach day"],
    facilities: [
      "Aquaventure water slides and lazy river",
      "The Dig aquarium and marine habitats",
      "Resort beaches and pools (pass-dependent)",
      "Restaurants and snack bars",
      "Lockers and towel rentals",
      "Gift shops and casino (adults)",
    ],
    timeNeeded:
      "Allow 5–6 hours for Aquaventure and beach time with transport. Half-day passes exist but feel rushed on busy ship days — full port calls work best.",
    cruiseSuitability:
      "Excellent on 7+ hour port calls when day passes are secured in advance. Less ideal on short calls or when passes sell out — have a downtown or beach backup plan.",
    recommendedExcursions: [
      {
        name: "Atlantis Aquaventure Day Pass",
        description: "Full water park access with agreed return transfer — the most reliable way to secure timing on multi-ship days.",
        href: `${HUB_NASSAU_SPECIALIST}/family-tours`,
      },
      {
        name: "Paradise Island Beach Day",
        description: "Beach-focused Atlantis access when you want sand and pools without every slide.",
        href: `${HUB_NASSAU_SPECIALIST}/beaches`,
      },
    ],
    relatedGuideHrefs: [
      { label: "Nassau port guide", href: HUB_NASSAU_PORT },
      { label: "Nassau ship schedule", href: HUB_NASSAU_SCHEDULE },
      { label: "Bahamas cruise planner", href: HUB_BAHAMAS_PLANNER },
      { label: "Caribbean family excursions", href: "/best-caribbean-family-excursions" },
      { label: "Nassau beach excursions", href: `${HUB_NASSAU_SPECIALIST}/beaches` },
    ],
    faqs: [
      {
        question: "Can cruise passengers visit Atlantis without a hotel stay?",
        answer:
          "Yes. Day passes are sold for Aquaventure, beach access, and marine exhibits. Inventory is limited on busy cruise days — book through your cruise line or a specialist operator early.",
      },
      {
        question: "How do I get from the Nassau cruise pier to Atlantis?",
        answer:
          "Licensed taxis queue at Prince George Wharf. Agree the fare before departing. Many organized excursions include pier pickup and a set return time.",
      },
      {
        question: "Is Atlantis worth it for adults without children?",
        answer:
          "Adults enjoy The Dig aquarium, casino, and quieter beach areas. Aquaventure skews family-heavy — couples often prefer Blue Lagoon, Rose Island sails, or a downtown culture walk instead.",
      },
      {
        question: "What should I bring to Atlantis?",
        answer:
          "Bring reef-safe sunscreen, a cover-up, water shoes for pool decks, and a waterproof phone pouch. Lockers are available but add cost — travel light if possible.",
      },
    ],
  },
  {
    slug: "stingray-city-grand-cayman",
    portSlug: "grand-cayman",
    title: "Stingray City Grand Cayman Cruise Guide",
    seoTitle: "Stingray City Grand Cayman Guide for Cruise Passengers",
    metaDescription:
      "Stingray City Grand Cayman cruise guide: shallow sandbar stingrays, tender port logistics, boat transfer time, safety tips, and recommended Grand Cayman shore excursions.",
    heroSubtitle:
      "Stand in waist-deep Caribbean water while wild southern stingrays glide around you — Grand Cayman's signature wildlife experience.",
    category: "sightseeing",
    whatItIs:
      "Stingray City is a shallow sandbar in North Sound where southern stingrays gather, accustomed to decades of guided visits. Boats anchor in knee- to waist-deep water so passengers can stand, feed, and photograph rays under crew supervision.",
    whyCruisePassengersVisit:
      "There is nothing quite like it in the Caribbean — close wildlife contact without diving certification. Cruise passengers book morning boat tours to beat crowds and combine the sandbar with a snorkel stop or Seven Mile Beach time on the same port day.",
    distanceFromPort:
      "Roughly 4 miles (6 km) by boat from George Town tender landing — about 25–35 minutes each way depending on operator and sea conditions. No road access.",
    bestFor: ["Wildlife lovers", "First-time snorkelers", "Families with older children", "Photography", "Bucket-list experiences"],
    facilities: [
      "No fixed facilities on the sandbar itself",
      "Boats provide life vests and sometimes snorkel gear",
      "Restrooms on larger tour vessels only",
      "Changing areas back at George Town marina",
      "Gift shops near tender landing",
    ],
    timeNeeded:
      "Most Stingray City excursions run 3–4 hours including boat transfer and 45–60 minutes in the water. Add time for tender queues in George Town.",
    cruiseSuitability:
      "Excellent on standard port calls when seas are calm. Tender delays and weather cancellations are common — book early departures and keep a flexible backup if your ship shares the harbor with others.",
    recommendedExcursions: [
      {
        name: "Stingray City Sandbar Tour",
        description: "Morning boat trip with crew briefing and sandbar time — the classic Grand Cayman cruise excursion.",
        href: `${HUB_GRAND_CAYMAN_SPECIALIST}/adventure-tours`,
      },
      {
        name: "Stingray City & Reef Snorkel Combo",
        description: "Pairs the sandbar with a second snorkel stop when you want a fuller marine day.",
        href: `${HUB_GRAND_CAYMAN_SPECIALIST}/snorkeling`,
      },
    ],
    relatedGuideHrefs: [
      { label: "Grand Cayman port guide", href: HUB_GRAND_CAYMAN_PORT },
      { label: "Grand Cayman ship schedule", href: HUB_GRAND_CAYMAN_SCHEDULE },
      { label: "Bahamas & Cayman cruise planner", href: HUB_BAHAMAS_PLANNER },
      { label: "Caribbean wildlife excursions", href: HUB_WILDLIFE_EXCURSIONS },
      { label: "Grand Cayman snorkeling tours", href: `${HUB_GRAND_CAYMAN_SPECIALIST}/snorkeling` },
    ],
    faqs: [
      {
        question: "Is Stingray City safe for cruise passengers?",
        answer:
          "Yes when you follow crew instructions. Avoid stepping on rays, keep feet shuffling, and hold squid feed with a flat palm as directed. Pregnant passengers and very young children should check operator policies.",
      },
      {
        question: "Do I need to know how to swim for Stingray City?",
        answer:
          "You stand in shallow water, but basic water comfort helps. Life vests are available. Non-swimmers can usually participate with crew assistance.",
      },
      {
        question: "Why book an early Stingray City tour?",
        answer:
          "Morning trips see fewer boats and calmer water. Afternoon sandbar visits get crowded when multiple ships tender into George Town.",
      },
      {
        question: "What happens if tender boats are cancelled?",
        answer:
          "Rough seas can suspend Grand Cayman tenders entirely. If you booked independently, contact your operator immediately. Ship-sponsored tours usually rebook or refund.",
      },
    ],
  },
  {
    slug: "maho-beach-st-maarten",
    portSlug: "st-maarten",
    title: "Maho Beach St. Maarten Cruise Guide",
    seoTitle: "Maho Beach St. Maarten Plane Spotting Guide for Cruise Passengers",
    metaDescription:
      "Maho Beach St. Maarten cruise guide: aircraft landing over Princess Juliana Airport, taxi time from the cruise pier, safety rules, time needed, and recommended shore excursions.",
    heroSubtitle:
      "Watch jumbo jets descend directly over the sand at Princess Juliana Airport — one of the Caribbean's most famous spectacles.",
    category: "beach",
    whatItIs:
      "Maho Beach is a narrow strip of sand at the end of Princess Juliana International Airport's runway on the Dutch side of St. Maarten. Beach bars like Sunset Bar & Grill cater to plane spotters who time arrivals for dramatic low flyover photos and videos.",
    whyCruisePassengersVisit:
      "Aviation enthusiasts and social-media travelers come for the adrenaline of aircraft passing just overhead. It is a short taxi from the cruise pier and pairs easily with Philipsburg shopping or an afternoon Orient Bay block.",
    distanceFromPort:
      "About 5 miles (8 km) from the Dr. A.C. Wathey Cruise Facility — roughly 15–20 minutes by taxi across the island's Dutch side.",
    bestFor: ["Plane spotting", "Unique photos", "Short sightseeing blocks", "Aviation enthusiasts", "Beach bar afternoons"],
    facilities: [
      "Sunset Bar & Grill and beach bars with flight boards",
      "Chair and umbrella rentals (vendor-dependent)",
      "Restrooms through beach businesses",
      "Taxi drop-off at beach access points",
      "Nearby Maho village shops",
    ],
    timeNeeded:
      "Allow 2–3 hours to check flight schedules, see several landings, and enjoy the beach bar. Combine with Orient Bay or Philipsburg for a full port day.",
    cruiseSuitability:
      "Good on most port calls when flight schedules cooperate. Jet blast from departing aircraft is dangerous — stay behind barriers and follow bar staff guidance. Not ideal for young children near the runway fence.",
    recommendedExcursions: [
      {
        name: "Maho Beach & Plane Spotting Tour",
        description: "Organized transfer with schedule awareness — avoids guessing which arrivals are worth waiting for.",
        href: `${HUB_ST_MAARTEN_SPECIALIST}/adventure-tours`,
      },
      {
        name: "Maho & Orient Bay Combo",
        description: "Pairs plane spotting with French-side beach club time on one dual-nation port day.",
        href: `${HUB_ST_MAARTEN_SPECIALIST}/beaches`,
      },
    ],
    relatedGuideHrefs: [
      { label: "St. Maarten port guide", href: HUB_ST_MAARTEN_PORT },
      { label: "St. Maarten ship schedule", href: HUB_ST_MAARTEN_SCHEDULE },
      { label: "Virgin Islands cruise planner", href: HUB_VIRGIN_ISLANDS_PLANNER },
      { label: "Orient Bay guide", href: "/orient-bay-st-maarten" },
      { label: "Caribbean beach excursions", href: HUB_BEACH_EXCURSIONS },
    ],
    faqs: [
      {
        question: "Is Maho Beach dangerous?",
        answer:
          "Jet blast from departing aircraft can throw sand and debris with serious force. Stay behind marked barriers, never hang on the airport fence, and follow Sunset Bar safety briefings.",
      },
      {
        question: "How do I know when planes land at Maho Beach?",
        answer:
          "Beach bars post arrival boards and apps track SXM schedules. Larger intercontinental jets make the most dramatic passes — midday often sees heavy traffic.",
      },
      {
        question: "Can I swim at Maho Beach?",
        answer:
          "Yes in calm conditions, but the beach is narrow and busy. Many visitors treat it as a spotting viewpoint with drinks rather than a long swim day.",
      },
      {
        question: "Is Maho Beach walking distance from the cruise pier?",
        answer:
          "No. The airport is on the opposite side of the Dutch side from Great Bay. Licensed taxis are the practical option.",
      },
    ],
  },
  {
    slug: "orient-bay-st-maarten",
    portSlug: "st-maarten",
    title: "Orient Bay St. Maarten Cruise Guide",
    seoTitle: "Orient Bay Beach St. Maarten Guide for Cruise Passengers",
    metaDescription:
      "Orient Bay St. Maarten cruise guide: French-side beach clubs, taxi time from the cruise pier, facilities, time needed, Euros vs cards, and recommended St. Maarten shore excursions.",
    heroSubtitle:
      "St. Martin's liveliest beach strip — club-style loungers, turquoise water, and a French-Caribbean atmosphere on the island's windward coast.",
    category: "beach",
    whatItIs:
      "Orient Bay (often called Orient Beach) is a long curve of sand on the French side of St. Martin, lined with beach clubs offering chairs, umbrellas, food service, and water sports. The atmosphere is more European beach resort than quiet hideaway.",
    whyCruisePassengersVisit:
      "Cruise passengers cross to the French side for a proper beach-club day — predictable loungers, table service, jet skis, and kite surfing when wind cooperates. It contrasts with Maho's spectacle or Philipsburg's shopping focus.",
    distanceFromPort:
      "About 8 miles (13 km) from the cruise pier — roughly 25–30 minutes by taxi through Marigot and over the island's ridge roads.",
    bestFor: ["Beach club days", "Couples", "Water sports", "French-side culture", "Full afternoon beach blocks"],
    facilities: [
      "Multiple beach clubs with chair and umbrella rentals",
      "Restaurants and beach bars (Kakao, Bikini Beach, etc.)",
      "Jet ski and kayak rentals",
      "Restrooms and showers through clubs",
      "Parking and taxi drop-off at club entrances",
    ],
    timeNeeded:
      "Plan 4–5 hours for a relaxed club day plus transfers. Half-day visits feel rushed once you factor in the cross-island taxi.",
    cruiseSuitability:
      "Very good on full port days. Orient Bay is clothing-optional in sections — choose family-oriented clubs if traveling with children. Bring Euros or a card for French-side vendors.",
    recommendedExcursions: [
      {
        name: "Orient Bay Beach Day",
        description: "Organized club access with reserved loungers and agreed return time — simplifies French-side logistics.",
        href: `${HUB_ST_MAARTEN_SPECIALIST}/beaches`,
      },
      {
        name: "French Side Island Tour",
        description: "Combines Orient Bay with Marigot market and Grand Case dining viewpoints.",
        href: `${HUB_ST_MAARTEN_SPECIALIST}/private-tours`,
      },
    ],
    relatedGuideHrefs: [
      { label: "St. Maarten port guide", href: HUB_ST_MAARTEN_PORT },
      { label: "St. Maarten ship schedule", href: HUB_ST_MAARTEN_SCHEDULE },
      { label: "Maho Beach guide", href: "/maho-beach-st-maarten" },
      { label: "Virgin Islands cruise planner", href: HUB_VIRGIN_ISLANDS_PLANNER },
      { label: "Caribbean beach excursions", href: HUB_BEACH_EXCURSIONS },
    ],
    faqs: [
      {
        question: "Is Orient Bay the same as Orient Beach?",
        answer:
          "Yes — Orient Bay and Orient Beach refer to the same French-side stretch. Cruise materials often use either name.",
      },
      {
        question: "Do I need Euros at Orient Bay?",
        answer:
          "The French side prefers Euros, but major beach clubs accept credit cards. Carry some Euros for taxis and smaller vendors.",
      },
      {
        question: "Which Orient Bay beach club is best for cruise passengers?",
        answer:
          "Kakao and Bikini Beach are popular with organized excursions. Tell your driver your club name and confirm chair rental is included in excursion packages.",
      },
      {
        question: "Can I combine Orient Bay and Maho Beach in one day?",
        answer:
          "Yes on a full port call. Many passengers do Maho plane spotting in the morning and Orient Bay club time in the afternoon — allow 5–6 hours total plus pier buffer.",
      },
    ],
  },
  {
    slug: "palancar-reef-cozumel",
    portSlug: "cozumel",
    title: "Palancar Reef Cozumel Cruise Guide",
    seoTitle: "Palancar Reef Cozumel Snorkeling Guide for Cruise Passengers",
    metaDescription:
      "Palancar Reef Cozumel cruise guide: world-famous reef snorkeling, boat time from San Miguel piers, marine life, time needed, and recommended Cozumel shore excursions.",
    heroSubtitle:
      "Cathedral coral formations and crystal visibility on the Mesoamerican Barrier Reef — Cozumel's signature snorkel and dive site.",
    category: "beach",
    whatItIs:
      "Palancar Reef is a sprawling coral reef system off Cozumel's southwest coast, famous for towering coral pinnacles, swim-through arches, and exceptional water clarity. Snorkelers visit by boat; divers explore deeper sections of the same reef complex.",
    whyCruisePassengersVisit:
      "Reef enthusiasts prioritize Palancar because it delivers Caribbean-grade coral and fish life within a half-day boat trip from the cruise piers. It anchors most Cozumel snorkel sails alongside sister sites like Columbia Reef.",
    distanceFromPort:
      "About 8–10 miles (13–16 km) south by boat from San Miguel cruise piers — roughly 20–30 minutes each way depending on operator and mooring zone.",
    bestFor: ["Snorkeling", "Reef photography", "First-time Caribbean snorkelers", "Boat-based port days", "Marine life lovers"],
    facilities: [
      "No shore facilities at the reef itself",
      "Boats provide snorkel gear and life vests",
      "Some tours include lunch and open bar",
      "Restrooms on larger vessels only",
      "Marine park fees often included in tour price",
    ],
    timeNeeded:
      "Typical Palancar snorkel sails run 3–4 hours with one or two in-water sessions. Allow 4–5 hours total including pier check-in and gear fitting.",
    cruiseSuitability:
      "Excellent on standard western Caribbean port calls. Strong currents can occur — follow guide instructions and stay with your group. Beginners should choose reputable operators with small group ratios.",
    recommendedExcursions: [
      {
        name: "Palancar Reef Snorkel Sail",
        description: "Boat trip with guided snorkel at Palancar's coral formations — the definitive Cozumel reef introduction.",
        href: `${HUB_COZUMEL_SPECIALIST}/snorkeling`,
      },
      {
        name: "Palancar & El Cielo Combo",
        description: "Pairs reef snorkel with the shallow starfish sandbar for a varied marine day.",
        href: `${HUB_COZUMEL_SPECIALIST}/catamaran-cruises`,
      },
    ],
    relatedGuideHrefs: [
      { label: "Cozumel port guide", href: HUB_COZUMEL_PORT },
      { label: "Cozumel ship schedule", href: HUB_COZUMEL_SCHEDULE },
      { label: "Mexican Caribbean cruise planner", href: HUB_MEXICAN_CARIBBEAN_PLANNER },
      { label: "Caribbean snorkeling excursions", href: HUB_SNORKEL_EXCURSIONS },
      { label: "Cozumel family excursions", href: `${HUB_COZUMEL_SPECIALIST}/family-tours` },
    ],
    faqs: [
      {
        question: "Is Palancar Reef good for beginner snorkelers?",
        answer:
          "Yes with a guided boat tour. Guides brief on entry technique and current awareness. Floating life vests help nervous swimmers.",
      },
      {
        question: "How does Palancar compare to Columbia Reef?",
        answer:
          "Palancar is known for dramatic coral formations and swim-throughs. Columbia Reef nearby often has more fish density and turtle sightings. Many tours visit both.",
      },
      {
        question: "Can I reach Palancar Reef without a boat?",
        answer:
          "No practical shore access for cruise passengers. Licensed snorkel and dive boats depart from San Miguel marinas near the cruise piers.",
      },
      {
        question: "What is the best time of day to snorkel Palancar?",
        answer:
          "Morning trips usually have calmer seas and better visibility before afternoon wind chop. Early departures also beat the busiest mooring crowds.",
      },
    ],
  },
];

const guideBySlug = Object.fromEntries(
  portAttractionGuides.map((guide) => [guide.slug, guide]),
) as Record<string, AttractionGuidePage>;

export function getPortAttractionGuideBySlug(slug: string): AttractionGuidePage | undefined {
  return guideBySlug[slug];
}

export function getPortAttractionGuideSlugs(): string[] {
  return portAttractionGuides.map((guide) => guide.slug);
}

export function getPortAttractionGuides(): AttractionGuidePage[] {
  return portAttractionGuides;
}
