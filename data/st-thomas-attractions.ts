import type { AttractionGuidePage } from "./types";

const HUB_BEACH_GUIDE = "https://stthomasshoreexcursion.com/st-thomas-beach-excursions.html";
const HUB_PORT_GUIDE = "/ports/st-thomas";

export const stThomasAttractionGuides: AttractionGuidePage[] = [
  {
    slug: "magens-bay-st-thomas",
    portSlug: "st-thomas",
    title: "Magens Bay St. Thomas Cruise Guide",
    seoTitle: "Magens Bay St. Thomas Guide for Cruise Passengers",
    metaDescription:
      "Magens Bay cruise guide: calm horseshoe beach, taxi times from Havensight and Crown Bay, facilities, time needed, and the best organized beach excursions for St. Thomas port days.",
    heroSubtitle:
      "The Caribbean's most famous cruise-day beach — calm water, full facilities, and reliable taxi access from both St. Thomas terminals.",
    category: "beach",
    whatItIs:
      "Magens Bay is a mile-long horseshoe beach on St. Thomas's north shore, protected by hills that keep the water unusually calm compared with most Caribbean swim spots. A small admission fee supports restrooms, showers, food vendors, and chair rentals on site.",
    whyCruisePassengersVisit:
      "Cruise passengers choose Magens Bay because it delivers a classic Caribbean beach photo without rough surf or long boat transfers. The bay suits non-swimmers, families, and first-time visitors who want a predictable, facility-rich beach day within a 15–20 minute taxi ride of Havensight or Crown Bay.",
    distanceFromPort: "About 3 miles (5 km) north of Charlotte Amalie — roughly 15–20 minutes by taxi from Havensight or Crown Bay, depending on traffic.",
    bestFor: ["Calm swimming", "Families", "First-time Caribbean visitors", "Photography", "Relaxation"],
    facilities: [
      "Restrooms and freshwater showers",
      "Chair and umbrella rentals",
      "Snack bar and picnic areas",
      "Lifeguards on busy days",
      "Parking and taxi drop-off area",
    ],
    timeNeeded: "Allow 3–5 hours for a meaningful visit including transport. Half-day organized excursions typically block 4–5 hours with return buffer.",
    cruiseSuitability:
      "Excellent for standard 7–9 hour port calls. Magens Bay is the safest signature beach choice in St. Thomas when you want calm water and on-site amenities without a boat transfer.",
    recommendedExcursions: [
      {
        name: "Magens Bay Beach Day",
        description: "Organized taxi or coach transfer with agreed return time — the most reliable way to avoid fare confusion on busy ship days.",
      },
      {
        name: "Shopping, Sightseeing & Beach Combo",
        description: "Pairs a shorter Magens Bay stop with Charlotte Amalie viewpoints and shopping when you want variety in one port day.",
        href: "https://stthomasshoreexcursion.com/st-thomas-shopping-sightseeing-beach-tour.html",
      },
    ],
    relatedGuideHrefs: [
      { label: "St. Thomas beach excursions", href: HUB_BEACH_GUIDE },
      { label: "St. Thomas port guide", href: HUB_PORT_GUIDE },
      { label: "Sapphire Beach guide", href: "/sapphire-beach-st-thomas" },
    ],
    faqs: [
      {
        question: "How much does Magens Bay cost for cruise passengers?",
        answer:
          "Magens Bay charges a modest per-person entry fee (cash or card accepted on most days). Chair rentals are extra. Organized excursions sometimes include entry — confirm when booking.",
      },
      {
        question: "Is Magens Bay crowded when cruise ships are in port?",
        answer:
          "Yes on multi-ship days, especially late morning. Arrive before 10:00 AM or book an organized morning transfer for the best chair selection and quieter water.",
      },
      {
        question: "Can I taxi to Magens Bay on my own?",
        answer:
          "Yes. Licensed taxis queue at both cruise terminals. Agree the round-trip fare and pickup time before you leave — St. Thomas taxis are unmetered.",
      },
      {
        question: "Is Magens Bay good for snorkeling?",
        answer:
          "Magens Bay is primarily a swim and relax beach, not a reef snorkel site. For snorkeling, pair your day with Sapphire Beach, Coki Beach, or a sail to Buck Island instead.",
      },
    ],
  },
  {
    slug: "sapphire-beach-st-thomas",
    portSlug: "st-thomas",
    title: "Sapphire Beach St. Thomas Cruise Guide",
    seoTitle: "Sapphire Beach St. Thomas Snorkel & Beach Guide",
    metaDescription:
      "Sapphire Beach St. Thomas guide for cruise passengers: reef snorkeling east of Red Hook, distance from the port, facilities, time needed, and recommended shore excursions.",
    heroSubtitle:
      "Turquoise water and a healthy fringing reef just east of Red Hook — one of St. Thomas's best snorkel-from-shore beaches.",
    category: "beach",
    whatItIs:
      "Sapphire Beach (often called Sapphire Bay) is a east-end beach near Red Hook with clear water, a fringing reef close to shore, and beach bars that rent snorkel gear and chairs. Resorts and villas line the hillside above the sand.",
    whyCruisePassengersVisit:
      "Passengers who want reef time without a full catamaran booking come here for easy shore snorkeling, paddleboard rentals, and strong photo backdrops of Pillsbury Sound and nearby islands.",
    distanceFromPort:
      "About 8 miles from Havensight (20–25 minutes by taxi) or slightly less from Crown Bay via the north side. Red Hook ferry terminal is nearby if you are continuing to St. John.",
    bestFor: ["Snorkeling", "Couples", "Water sports", "Scenic views", "Half-day beach blocks"],
    facilities: [
      "Beach bars and casual dining",
      "Snorkel and paddleboard rentals",
      "Chair rentals (vendor-dependent)",
      "Restrooms at beach businesses",
      "Taxi drop-off along the beach road",
    ],
    timeNeeded: "Plan 3–4 hours minimum for snorkel and beach time plus transfers. Allow longer if combining with a St. John ferry.",
    cruiseSuitability:
      "Very good for passengers comfortable with a 20+ minute taxi ride. Less ideal if your ship has a short port call or you need maximum on-site facilities like Magens Bay.",
    recommendedExcursions: [
      {
        name: "Sapphire Beach Snorkel",
        description: "Half-day transfer with gear and beach time at the reef — popular when you want snorkel without a boat tour.",
      },
      {
        name: "Private Sapphire Beach Tour",
        description: "Custom timing and stops for groups who want flexible east-end beach time.",
        href: "https://stthomasshoreexcursion.com/private-sapphire-beach-tour-st-thomas.html",
      },
    ],
    relatedGuideHrefs: [
      { label: "St. Thomas snorkeling tours", href: "https://stthomasshoreexcursion.com/st-thomas-snorkeling-tours.html" },
      { label: "St. Thomas port guide", href: HUB_PORT_GUIDE },
      { label: "Coki Beach guide", href: "/coki-beach-st-thomas" },
    ],
    faqs: [
      {
        question: "Can you snorkel from shore at Sapphire Beach?",
        answer:
          "Yes. A fringing reef sits a short swim from the beach. Morning conditions are usually clearest before afternoon wind chop.",
      },
      {
        question: "How does Sapphire Beach compare to Magens Bay?",
        answer:
          "Magens Bay is calmer and more facility-heavy for pure swimming. Sapphire Beach is better when snorkeling and turquoise-water photos are the priority.",
      },
      {
        question: "Is Sapphire Beach near the St. John ferry?",
        answer:
          "Yes. Red Hook ferry terminal is minutes away — useful if you want a split day between St. Thomas reef time and St. John.",
      },
    ],
  },
  {
    slug: "coki-beach-st-thomas",
    portSlug: "st-thomas",
    title: "Coki Beach St. Thomas Cruise Guide",
    seoTitle: "Coki Beach St. Thomas Snorkeling Guide for Cruise Passengers",
    metaDescription:
      "Coki Beach St. Thomas cruise guide: lively reef snorkeling beside Coral World, taxi time from the port, facilities, cruise suitability, and family-friendly excursion tips.",
    heroSubtitle:
      "St. Thomas's most accessible reef beach — lively atmosphere, easy gear rentals, and Coral World Ocean Park next door.",
    category: "beach",
    whatItIs:
      "Coki Beach is a compact east-end swim beach beside Coral World Ocean Park. Vendor stalls, music, and equipment rentals create a busier atmosphere than Magens Bay, with reef entry directly from the sand on calm days.",
    whyCruisePassengersVisit:
      "Families and snorkelers use Coki when they want guaranteed gear rentals, quick reef access, and the option to add Coral World's touch pools and underwater observatory without a boat tour.",
    distanceFromPort: "About 7–8 miles from downtown terminals — roughly 20–25 minutes by taxi, similar timing to Sapphire Beach.",
    bestFor: ["Snorkeling", "Families with older children", "Coral World combo days", "Gear rental on arrival"],
    facilities: [
      "Snorkel gear rentals on the beach",
      "Food vendors and beach bars",
      "Coral World Ocean Park adjacent",
      "Chair rentals",
      "Taxi stand at peak hours",
    ],
    timeNeeded: "Allow 3–4 hours for beach snorkel only, or 5–6 hours if pairing with Coral World.",
    cruiseSuitability:
      "Good on full port days. The beach can feel crowded when multiple ships are in port — arrive early for calmer water and easier gear rental.",
    recommendedExcursions: [
      {
        name: "Coral World & Coki Beach",
        description: "Combines marine park exhibits with reef snorkel time — strong family option east of Charlotte Amalie.",
      },
      {
        name: "St. Thomas snorkeling tours",
        description: "Boat-based alternatives when you prefer guided reef stops over a busy shore beach.",
        href: "https://stthomasshoreexcursion.com/st-thomas-snorkeling-tours.html",
      },
    ],
    relatedGuideHrefs: [
      { label: "St. Thomas family excursions", href: "https://stthomasshoreexcursion.com/st-thomas-cruise-excursions-for-families.html" },
      { label: "St. Thomas port guide", href: HUB_PORT_GUIDE },
      { label: "Sapphire Beach guide", href: "/sapphire-beach-st-thomas" },
    ],
    faqs: [
      {
        question: "Is Coki Beach good for beginner snorkelers?",
        answer:
          "Yes on calm mornings. Rent gear on site and stay inside the buoyed swim area. Afternoon wind can reduce visibility and increase chop.",
      },
      {
        question: "Do I need to visit Coral World to use Coki Beach?",
        answer:
          "No. The beach is public, though parking and access paths run beside the park. Many passengers buy a Coral World ticket for exhibits plus beach time.",
      },
      {
        question: "Is Coki Beach family friendly?",
        answer:
          "Generally yes for school-age children who are comfortable in lively beach settings. It is busier and more commercial than Magens Bay or Lindquist Beach.",
      },
    ],
  },
  {
    slug: "secret-harbour-st-thomas",
    portSlug: "st-thomas",
    title: "Secret Harbour St. Thomas Cruise Guide",
    seoTitle: "Secret Harbour Beach St. Thomas Guide for Cruise Passengers",
    metaDescription:
      "Secret Harbour St. Thomas guide: calm resort cove snorkeling, distance from the cruise port, facilities, time needed, and cruise-friendly excursion planning tips.",
    heroSubtitle:
      "A sheltered east-end cove with calm water, reef snorkeling, and a relaxed resort-beach feel away from the busiest tourist strips.",
    category: "beach",
    whatItIs:
      "Secret Harbour is a protected bay on St. Thomas's south-east coast with a resort beach club atmosphere, calm swim conditions, and house-reef snorkeling suitable for beginners on clear days.",
    whyCruisePassengersVisit:
      "Couples and snorkelers choose Secret Harbour when they want quieter water than Coki Beach with more structure than a fully public strip — chair service, a beach bar, and easy entry to a small reef.",
    distanceFromPort: "Roughly 6–7 miles from Charlotte Amalie terminals — about 20–30 minutes by taxi depending on route and traffic.",
    bestFor: ["Calm water snorkeling", "Couples", "Relaxed resort beach day", "Less crowded than Coki"],
    facilities: [
      "Resort beach bar and restaurant",
      "Chair and umbrella rentals",
      "Snorkel gear rental (availability varies)",
      "Restrooms through beach club",
      "Protected swim area",
    ],
    timeNeeded: "Plan 3–4 hours including transfers for snorkel and lunch. Half-day excursions work well on 7–8 hour port calls.",
    cruiseSuitability:
      "Strong for passengers who want snorkeling without a boat tour but prefer calmer vibes than Coki Beach. Confirm resort day-pass or excursion access before you travel independently.",
    recommendedExcursions: [
      {
        name: "St. Thomas Resort Beach Day",
        description: "Organized resort-beach access with transport — useful when you want guaranteed facilities and return timing.",
        href: "https://stthomasshoreexcursion.com/st-thomas-resort-beach-day.html",
      },
      {
        name: "Snorkeling tours",
        description: "Boat tours that visit outer reefs when you want more marine life variety than the house reef.",
        href: "https://stthomasshoreexcursion.com/st-thomas-snorkeling-tours.html",
      },
    ],
    relatedGuideHrefs: [
      { label: "St. Thomas beach excursions", href: HUB_BEACH_GUIDE },
      { label: "St. Thomas port guide", href: HUB_PORT_GUIDE },
      { label: "Magens Bay guide", href: "/magens-bay-st-thomas" },
    ],
    faqs: [
      {
        question: "Is Secret Harbour the same as Secret Harbor Beach Resort?",
        answer:
          "Yes — the beach is associated with the resort on the bay. Cruise passengers usually arrive via excursion, day pass, or taxi drop-off at the beach club entrance.",
      },
      {
        question: "Can you snorkel at Secret Harbour without staying at the resort?",
        answer:
          "Day visitors can typically access the beach through the beach bar area. Excursion bookings often include chair rental and facility access — confirm inclusions.",
      },
      {
        question: "How does Secret Harbour compare to Sapphire Beach?",
        answer:
          "Both offer east-end snorkeling. Secret Harbour is usually quieter and more sheltered; Sapphire Beach has more open-water views and a livelier strip.",
      },
    ],
  },
  {
    slug: "paradise-point-skyride-st-thomas",
    portSlug: "st-thomas",
    title: "Paradise Point Skyride St. Thomas Cruise Guide",
    seoTitle: "Paradise Point Skyride St. Thomas Guide for Cruise Passengers",
    metaDescription:
      "Paradise Point Skyride St. Thomas guide: aerial tram views over Charlotte Amalie harbour, walking distance from Havensight, time needed, and how to fit the Skyride into a cruise port day.",
    heroSubtitle:
      "A short cable-car ride to panoramic harbour views — one of the easiest sightseeing stops from the Havensight cruise terminal.",
    category: "sightseeing",
    whatItIs:
      "Paradise Point Skyride is an aerial tram that climbs above Charlotte Amalie to a lookout with harbour views, a snack bar, and gift shops. The ride itself is the main attraction rather than a long hike or beach block.",
    whyCruisePassengersVisit:
      "Passengers docked at Havensight use the Skyride for a quick, low-effort highlight when they want photos over the bay, cruise ships, and downtown rooftops without renting a taxi for a full island tour.",
    distanceFromPort:
      "About a 5–10 minute walk from Havensight Cruise Pier along the waterfront. From Crown Bay, allow 15–20 minutes by taxi to the Havensight base station.",
    bestFor: ["Scenic photos", "First-time visitors", "Short sightseeing blocks", "Families with strollers", "Havensight pier passengers"],
    facilities: [
      "Summit snack bar and restrooms",
      "Gift shop at base and top",
      "Parrot photo opportunities (vendor)",
      "Wheelchair access to base station (confirm current policy)",
      "Taxi rank nearby at Havensight",
    ],
    timeNeeded: "Allow 60–90 minutes including queue, tram ride, and viewpoint time. Pair with downtown shopping for a half-day plan.",
    cruiseSuitability:
      "Excellent filler activity on any port call length. Ideal when you want a structured stop before or after Magens Bay or shopping without committing to a half-day tour.",
    recommendedExcursions: [
      {
        name: "Shopping, Sightseeing & Beach Combo",
        description: "Often includes a viewpoint or downtown stop — compare whether Paradise Point is explicit on the itinerary.",
        href: "https://stthomasshoreexcursion.com/st-thomas-shopping-sightseeing-beach-tour.html",
      },
      {
        name: "Private island highlights tour",
        description: "Custom taxi routes can add Paradise Point before a beach transfer.",
        href: "https://stthomasshoreexcursion.com/private-st-thomas-tours.html",
      },
    ],
    relatedGuideHrefs: [
      { label: "Charlotte Amalie guide", href: "/charlotte-amalie-st-thomas" },
      { label: "St. Thomas port guide", href: HUB_PORT_GUIDE },
      { label: "Mountain Top guide", href: "/mountain-top-st-thomas" },
    ],
    faqs: [
      {
        question: "Is Paradise Point walking distance from the cruise ship?",
        answer:
          "From Havensight, yes — it is one of the few major attractions reachable on foot along the harbour front. Crown Bay passengers should taxi to the Havensight base.",
      },
      {
        question: "How long is the Paradise Point tram ride?",
        answer:
          "The ride is a few minutes each way. Most visitors spend 30–45 minutes at the summit including photos and refreshments.",
      },
      {
        question: "Is Paradise Point better than Mountain Top?",
        answer:
          "Paradise Point is faster and walkable from Havensight with harbour-focused views. Mountain Top is a longer taxi ride with broader island panoramas and banana daiquiri stops.",
      },
    ],
  },
  {
    slug: "mountain-top-st-thomas",
    portSlug: "st-thomas",
    title: "Mountain Top St. Thomas Cruise Guide",
    seoTitle: "Mountain Top St. Thomas Viewpoint Guide for Cruise Passengers",
    metaDescription:
      "Mountain Top St. Thomas guide: famous island lookout above Magens Bay, taxi time from the cruise port, time needed, and how to combine Mountain Top with beach excursions.",
    heroSubtitle:
      "St. Thomas's classic island panorama — sweeping views over Magens Bay, neighboring islands, and the Caribbean beyond.",
    category: "sightseeing",
    whatItIs:
      "Mountain Top is a hillside lookout on St. Thomas's north ridge, famous for wide-angle views over Magens Bay and the surrounding islands. A snack bar serves drinks (including the well-known banana daiquiri) and light bites.",
    whyCruisePassengersVisit:
      "Island tours and taxi routes stop here because it delivers the postcard St. Thomas view in a single 20–30 minute visit — easy to pair with Magens Bay beach time on the same north-shore run.",
    distanceFromPort:
      "About 4–5 miles uphill from Charlotte Amalie — roughly 20–25 minutes by taxi, often combined with Magens Bay on the same route.",
    bestFor: ["Panoramic photos", "Island overview", "Combo with Magens Bay", "First-time visitors", "Short scenic stops"],
    facilities: [
      "Lookout terraces and photo spots",
      "Snack bar and bar service",
      "Gift shop",
      "Restrooms",
      "Parking for taxis and tour vans",
    ],
    timeNeeded: "Plan 30–45 minutes at the viewpoint. Most passengers visit as part of a 4–5 hour north-shore loop with Magens Bay.",
    cruiseSuitability:
      "Very good when bundled with beach or shopping stops. Rarely a standalone full-day activity — best as part of a structured island tour on 6+ hour port calls.",
    recommendedExcursions: [
      {
        name: "Shopping, Sightseeing & Beach Combo",
        description: "Classic combo tours often include a north-shore viewpoint stop before beach time.",
        href: "https://stthomasshoreexcursion.com/st-thomas-shopping-sightseeing-beach-tour.html",
      },
      {
        name: "Private St. Thomas tours",
        description: "Set your own order of Magens Bay, Mountain Top, and Red Hook viewpoints.",
        href: "https://stthomasshoreexcursion.com/private-st-thomas-tours.html",
      },
    ],
    relatedGuideHrefs: [
      { label: "Magens Bay guide", href: "/magens-bay-st-thomas" },
      { label: "Paradise Point Skyride", href: "/paradise-point-skyride-st-thomas" },
      { label: "St. Thomas port guide", href: HUB_PORT_GUIDE },
    ],
    faqs: [
      {
        question: "Can I visit Mountain Top and Magens Bay in one port day?",
        answer:
          "Yes — they are on the same north-shore loop. Many organized tours and taxis stop at Mountain Top before or after Magens Bay beach time.",
      },
      {
        question: "Is Mountain Top the same as Paradise Point?",
        answer:
          "No. Paradise Point is a tram near Havensight overlooking the harbour. Mountain Top is a hill lookout above Magens Bay with a broader island panorama.",
      },
      {
        question: "Do I need a tour to reach Mountain Top?",
        answer:
          "Taxis can drive to the lookout, but agreeing on stops and wait time is essential. Organized tours simplify timing back to the ship.",
      },
    ],
  },
  {
    slug: "charlotte-amalie-st-thomas",
    portSlug: "st-thomas",
    title: "Charlotte Amalie St. Thomas Cruise Guide",
    seoTitle: "Charlotte Amalie St. Thomas Port Town Guide for Cruise Passengers",
    metaDescription:
      "Charlotte Amalie St. Thomas guide: duty-free shopping, historic downtown walks from the cruise pier, time needed, safety tips, and how to combine town time with beach excursions.",
    heroSubtitle:
      "The U.S. Virgin Islands capital at your pier — colonial streets, duty-free shopping, and waterfront walks without a taxi.",
    category: "town",
    whatItIs:
      "Charlotte Amalie is the capital and cruise port town of St. Thomas, wrapping around Charlotte Amalie Harbour with Danish-colonial architecture, Main Street shopping, historic steps, and waterfront promenades near Havensight.",
    whyCruisePassengersVisit:
      "Passengers walk off the ship into duty-free jewelry, liquor, and souvenir shopping, plus quick visits to Blackbeard's Castle, Fort Christian, and harbour viewpoints when they want a low-transfer port day.",
    distanceFromPort:
      "Havensight passengers reach Main Street in 10–15 minutes on foot. Crown Bay requires a 10-minute taxi to downtown. Most shopping streets are compact and walkable once you arrive.",
    bestFor: ["Duty-free shopping", "Historic walking tours", "Short port days", "Rainy-day backup plans", "Combining with Skyride or beach tours"],
    facilities: [
      "Main Street and Back Street shops",
      "Restaurants and cafes downtown",
      "ATMs and pharmacies",
      "Taxi stands at terminals and downtown",
      "Public restrooms in shopping areas (limited)",
    ],
    timeNeeded: "Allow 2–3 hours for focused shopping and a waterfront stroll. Full combo tours with beach stops need 5–6 hours total.",
    cruiseSuitability:
      "Ideal when you want minimal transfer risk — especially from Havensight. Pair with Paradise Point or a short taxi beach if you want sand time the same day.",
    recommendedExcursions: [
      {
        name: "Shopping, Sightseeing & Beach Combo",
        description: "Structured Charlotte Amalie shopping with island viewpoints and beach time in one cruise-timed itinerary.",
        href: "https://stthomasshoreexcursion.com/st-thomas-shopping-sightseeing-beach-tour.html",
      },
      {
        name: "Havensight port & town walk",
        description: "Self-guided option when your ship docks at Havensight — shopping, waterfront, and optional Skyride.",
      },
    ],
    relatedGuideHrefs: [
      { label: "Paradise Point Skyride", href: "/paradise-point-skyride-st-thomas" },
      { label: "St. Thomas beach excursions", href: HUB_BEACH_GUIDE },
      { label: "St. Thomas port guide", href: HUB_PORT_GUIDE },
    ],
    faqs: [
      {
        question: "Is Charlotte Amalie walkable from the cruise ship?",
        answer:
          "From Havensight, yes — Main Street and the waterfront are reachable on foot. Crown Bay passengers should taxi to downtown unless you only plan terminal-area shopping.",
      },
      {
        question: "What is Charlotte Amalie famous for on cruise days?",
        answer:
          "Duty-free shopping (jewelry, watches, liquor), Danish colonial architecture, and harbour views. It is one of the Caribbean's best walkable shopping ports.",
      },
      {
        question: "Can I combine Charlotte Amalie shopping with a beach?",
        answer:
          "Yes. Combo shore excursions morning sightseeing and shopping with an afternoon Magens Bay or resort beach block — the most efficient pattern on first visits.",
      },
      {
        question: "Is downtown Charlotte Amalie safe for cruise passengers?",
        answer:
          "Tourist shopping streets are busy and generally safe in daylight. Use licensed taxis at night, avoid isolated alleys, and keep normal city awareness with valuables.",
      },
    ],
  },
];

const guideBySlug = Object.fromEntries(
  stThomasAttractionGuides.map((guide) => [guide.slug, guide]),
) as Record<string, AttractionGuidePage>;

export function getAttractionGuideBySlug(slug: string): AttractionGuidePage | undefined {
  return guideBySlug[slug];
}

export function getAllAttractionGuideSlugs(): string[] {
  return stThomasAttractionGuides.map((guide) => guide.slug);
}

export function getStThomasAttractionGuides(): AttractionGuidePage[] {
  return stThomasAttractionGuides;
}
