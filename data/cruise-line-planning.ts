import type { CruiseLinePlanningProfile } from "./types";

const sharedBestGuides = [
  { label: "Best Caribbean Shore Excursions", href: "/best-caribbean-shore-excursions" },
  { label: "Best Family Excursions", href: "/best-caribbean-family-excursions" },
  { label: "Best Beach Excursions", href: "/best-caribbean-beach-excursions" },
  { label: "Best Snorkeling Excursions", href: "/best-caribbean-snorkeling-excursions" },
  { label: "Best Private Tours", href: "/best-caribbean-private-tours" },
];

const sharedPlanners = [
  { label: "Caribbean Cruise Planner", href: "/cruise-planner" },
  { label: "Eastern Caribbean Planner", href: "/eastern-caribbean-cruise-planner" },
  { label: "Western Caribbean Planner", href: "/western-caribbean-cruise-planner" },
  { label: "Southern Caribbean Planner", href: "/southern-caribbean-cruise-planner" },
];

const sharedScheduleLinks = [
  { label: "Ship Schedules Hub", href: "/ship-schedules" },
  { label: "2026 Caribbean Schedules", href: "/ship-schedules/2026" },
  { label: "2027 Caribbean Schedules", href: "/ship-schedules/2027" },
  { label: "Busiest Ports 2027", href: "/busiest-caribbean-cruise-ports-2027" },
];

export const cruiseLinePlanning: Record<string, CruiseLinePlanningProfile> = {
  "royal-caribbean": {
    fleetSize: "28+ ships (largest cruise fleet worldwide)",
    passengerProfile:
      "Multi-generational families, first-time cruisers, and activity-focused travelers who want big-ship entertainment paired with high-energy port days.",
    bestFor: ["Families", "Adventure", "Beaches", "First-time cruisers", "Reef snorkeling"],
    shipSlugs: [
      "icon-of-the-seas",
      "star-of-the-seas",
      "wonder-of-the-seas",
      "utopia-of-the-seas",
      "symphony-of-the-seas",
    ],
    excursionCategories: [
      {
        category: "Best Family Excursions",
        href: "/best-caribbean-family-excursions",
        picks: [
          {
            name: "Chankanaab Beach Park",
            portSlug: "cozumel",
            description: "Snorkel lagoon, dolphins, and beach in one secure location near the pier.",
          },
          {
            name: "Blue Lagoon Island",
            portSlug: "nassau",
            description: "Shallow-water beach day with optional dolphin programs for mixed-age groups.",
          },
          {
            name: "Coral World Ocean Park",
            portSlug: "st-thomas",
            description: "Touch pools and underwater observatory without long boat transfers.",
          },
        ],
      },
      {
        category: "Best Beach Excursions",
        href: "/best-caribbean-beach-excursions",
        picks: [
          {
            name: "Magens Bay Beach Day",
            portSlug: "st-thomas",
            description: "Calm horseshoe bay with facilities, ideal for relaxed Royal Caribbean port days.",
          },
          {
            name: "Eagle Beach Catamaran",
            portSlug: "aruba",
            description: "Trade-wind sailing with wide white-sand beach time on Southern routes.",
          },
          {
            name: "West Bay Beach Break",
            portSlug: "roatan",
            description: "Reef snorkeling directly off the beach at strong Caribbean value.",
          },
        ],
      },
      {
        category: "Best Snorkeling Excursions",
        href: "/best-caribbean-snorkeling-excursions",
        picks: [
          {
            name: "El Cielo and Palancar Reef",
            portSlug: "cozumel",
            description: "Two-stop snorkel sail to Cozumel's signature sandbar and marine park reefs.",
          },
          {
            name: "Sapphire Beach Reef",
            portSlug: "st-thomas",
            description: "Quick reef access from Red Hook with optional St. John extension.",
          },
          {
            name: "West End Reef Snorkel",
            portSlug: "roatan",
            description: "Fewer boats than Cozumel with healthy coral close to Mahogany Bay.",
          },
        ],
      },
      {
        category: "Best Private Tours",
        href: "/best-caribbean-private-tours",
        picks: [
          {
            name: "Private El Cielo Catamaran",
            portSlug: "cozumel",
            description: "Custom reef and sandbar timing away from megaship group boats.",
          },
          {
            name: "Private St. Thomas Island Tour",
            portSlug: "st-thomas",
            description: "Taxi tour hitting Magens Bay, overlooks, and Red Hook on your schedule.",
          },
          {
            name: "Private Arikok 4x4",
            portSlug: "aruba",
            description: "North-coast off-road route to Natural Pool and lighthouse viewpoints.",
          },
        ],
      },
    ],
    planningAdvice: {
      independentExcursions:
        "Royal Caribbean passengers save significantly booking Cozumel, Roatan, and St. Thomas tours through specialist local sites. Verify pier pickup and on-time return guarantees before paying.",
      returnTiming:
        "On 7-night sailings allow 90 minutes before all-aboard on Western Caribbean port days. Short 3-4 night Bahamas cruises need tighter buffers, often 60-75 minutes.",
      tenderPorts:
        "Grand Cayman is the most common tender on Royal Caribbean Caribbean weeks. Book morning Stingray City tours and confirm last tender time before adding afternoon activities.",
      peakDays:
        "Cozumel, Nassau, and St. Thomas peak when multiple Oasis and Icon-class ships overlap. Use our ship schedule pages to see call counts on your date.",
      bookingAdvice:
        "Book reef and waterpark excursions before embarkation on holiday weeks. Keep one port day flexible for independent beach taxis in Aruba or St. Maarten.",
    },
    plannerLinks: [
      ...sharedPlanners,
      { label: "Bahamas Cruise Planner", href: "/bahamas-cruise-planner" },
      { label: "Mexican Caribbean Planner", href: "/mexican-caribbean-cruise-planner" },
      ...sharedScheduleLinks,
    ],
    comparisonLinks: [
      { label: "Roatan vs Cozumel", href: "/compare/roatan-vs-cozumel" },
      { label: "St. Thomas vs St. Maarten", href: "/compare/st-thomas-vs-st-maarten" },
      { label: "Grand Cayman vs Nassau", href: "/compare/grand-cayman-vs-nassau" },
    ],
    bestGuideLinks: sharedBestGuides,
  },
  carnival: {
    fleetSize: "27+ ships (largest US passenger fleet by volume)",
    passengerProfile:
      "Value-conscious families and groups who want fun-focused ship experiences with casual, activity-heavy Caribbean port days.",
    bestFor: ["Families", "Groups", "Beaches", "Adventure", "Budget-friendly cruising"],
    shipSlugs: ["mardi-gras", "celebration", "jubilee"],
    excursionCategories: [
      {
        category: "Best Family Excursions",
        href: "/best-caribbean-family-excursions",
        picks: [
          {
            name: "Atlantis Aquaventure",
            portSlug: "nassau",
            description: "Full waterpark day on Paradise Island, a Carnival Nassau favorite.",
          },
          {
            name: "De Palm Island All-Inclusive",
            portSlug: "aruba",
            description: "Water park, snorkel areas, and lunch on Southern Carnival routes.",
          },
          {
            name: "Amber Cove Port Pool",
            portSlug: "puerto-plata",
            description: "Low-stress family day at Carnival's Dominican port complex.",
          },
        ],
      },
      {
        category: "Best Beach Excursions",
        href: "/best-caribbean-beach-excursions",
        picks: [
          {
            name: "Cable Beach Day",
            portSlug: "nassau",
            description: "Accessible beach with chair rentals close to downtown Nassau.",
          },
          {
            name: "Seven Mile Beach Break",
            portSlug: "grand-cayman",
            description: "Organized beach transport handles tender timing around peak crowds.",
          },
          {
            name: "Orient Bay Beach Club",
            portSlug: "st-maarten",
            description: "Lively French-side beach with restaurants and loungers.",
          },
        ],
      },
      {
        category: "Best Snorkeling Excursions",
        href: "/best-caribbean-snorkeling-excursions",
        picks: [
          {
            name: "Palancar Two-Stop Snorkel",
            portSlug: "cozumel",
            description: "Classic Western Caribbean reef circuit on Carnival Jubilee and Celebration routes.",
          },
          {
            name: "Cemetery Reef Sail",
            portSlug: "grand-cayman",
            description: "Pairs well with a morning Stingray City run on tender days.",
          },
          {
            name: "Rose Island Reef Catamaran",
            portSlug: "nassau",
            description: "Reliable half-day snorkel close to Prince George Wharf.",
          },
        ],
      },
      {
        category: "Best Private Tours",
        href: "/best-caribbean-private-tours",
        picks: [
          {
            name: "Private Cozumel Jeep Tour",
            portSlug: "cozumel",
            description: "Ruins, beaches, and San Miguel dining without rigid group schedules.",
          },
          {
            name: "Private Stingray City Boat",
            portSlug: "grand-cayman",
            description: "Early departure avoids peak sandbar crowds on tender port days.",
          },
          {
            name: "Private Damajagua Falls",
            portSlug: "puerto-plata",
            description: "Smaller groups move faster through waterfall climbs on Dominican calls.",
          },
        ],
      },
    ],
    planningAdvice: {
      independentExcursions:
        "Carnival's shore excursion credits are useful, but Cozumel and Roatan independents often beat pricing. Specialist port sites list Carnival-friendly pickup points.",
      returnTiming:
        "Carnival port days are often eight to ten hours on 7-night sailings. Avoid stacking long ruin tours with afternoon beach plans unless your in-port window exceeds nine hours.",
      tenderPorts:
        "Grand Cayman and occasional Falmouth calls require tenders. Carnival's own tours guarantee tender priority; independents must drop you back with 60+ minutes to spare.",
      peakDays:
        "Nassau and Cozumel peak when multiple Excel-class and Conquest-class ships overlap. Holiday weeks bring the heaviest downtown crowds in Nassau.",
      bookingAdvice:
        "Use Fun Hub credits on signature tours, then book second-choice ports independently. Confirm Amber Cove vs Puerto Plata pier on Dominican sailings.",
    },
    plannerLinks: [
      ...sharedPlanners,
      { label: "Bahamas Cruise Planner", href: "/bahamas-cruise-planner" },
      { label: "Dominican Republic Planner", href: "/dominican-republic-cruise-planner" },
      { label: "Jamaica Cruise Planner", href: "/jamaica-cruise-planner" },
      ...sharedScheduleLinks,
    ],
    comparisonLinks: [
      { label: "Amber Cove vs Puerto Plata", href: "/compare/amber-cove-vs-puerto-plata" },
      { label: "Grand Cayman vs Nassau", href: "/compare/grand-cayman-vs-nassau" },
      { label: "Ocho Rios vs Falmouth", href: "/compare/ocho-rios-vs-falmouth" },
    ],
    bestGuideLinks: sharedBestGuides,
  },
  norwegian: {
    fleetSize: "19+ ships with expanding Prima-class Caribbean capacity",
    passengerProfile:
      "Freestyle cruisers who want flexible dining schedules, varied entertainment, and port days without rigid traditional cruise timing.",
    bestFor: ["Couples", "Groups", "Flexible schedules", "Adventure", "Beaches"],
    shipSlugs: ["prima", "viva", "aqua"],
    excursionCategories: [
      {
        category: "Best Family Excursions",
        href: "/best-caribbean-family-excursions",
        picks: [
          {
            name: "Chankanaab Park Day",
            portSlug: "cozumel",
            description: "All-in-one snorkel lagoon and beach for freestyle family port days.",
          },
          {
            name: "Stingray City Sandbar",
            portSlug: "grand-cayman",
            description: "Waist-deep wildlife encounter suitable for school-age children.",
          },
          {
            name: "Gumbalimba Park",
            portSlug: "roatan",
            description: "Wildlife, zip-lines, and beach combo near Mahogany Bay.",
          },
        ],
      },
      {
        category: "Best Beach Excursions",
        href: "/best-caribbean-beach-excursions",
        picks: [
          {
            name: "Magens Bay",
            portSlug: "st-thomas",
            description: "Calm swimming bay with facilities on Eastern NCL weeks.",
          },
          {
            name: "West Bay Beach",
            portSlug: "roatan",
            description: "White sand and clear water at strong value on Western routes.",
          },
          {
            name: "Orient Bay",
            portSlug: "st-maarten",
            description: "Beach club day on French side with lunch and loungers.",
          },
        ],
      },
      {
        category: "Best Snorkeling Excursions",
        href: "/best-caribbean-snorkeling-excursions",
        picks: [
          {
            name: "Columbia Deep Reef",
            portSlug: "cozumel",
            description: "Deeper wall snorkel for experienced swimmers on NCL Western weeks.",
          },
          {
            name: "Trunk Bay Trail",
            portSlug: "st-thomas",
            description: "Ferry to St. John for the famous underwater snorkeling trail.",
          },
          {
            name: "West End Reef Boat",
            portSlug: "roatan",
            description: "Small-group reef stops with fewer boats than Cozumel.",
          },
        ],
      },
      {
        category: "Best Private Tours",
        href: "/best-caribbean-private-tours",
        picks: [
          {
            name: "Private St. Thomas Taxi Tour",
            portSlug: "st-thomas",
            description: "Custom Magens Bay, Mountain Top, and ferry timing.",
          },
          {
            name: "Private Cozumel Snorkel Boat",
            portSlug: "cozumel",
            description: "Two reef stops on your departure schedule.",
          },
          {
            name: "Private West Bay Driver",
            portSlug: "roatan",
            description: "Best-value custom beach day in the Western Caribbean.",
          },
        ],
      },
    ],
    planningAdvice: {
      independentExcursions:
        "NCL's freestyle model suits independent excursions well. Book through specialist port sites for Cozumel and St. Thomas, where pier pickup is standard.",
      returnTiming:
        "Without fixed dining seatings you have more morning flexibility, but still allow 90 minutes before all-aboard on full-day tours.",
      tenderPorts:
        "Grand Cayman tenders are the main Caribbean timing risk on NCL itineraries. Great Stirrup Cay is a ship-focused day, not an independent excursion port.",
      peakDays:
        "Cozumel and St. Thomas see peak demand when NCL Prima-class and Royal megaships share a date. Check schedules before booking.",
      bookingAdvice:
        "Use NCL's excursion guarantee for tender ports, then book reef and beach days independently at Cozumel and Roatan for better pricing.",
    },
    plannerLinks: [
      ...sharedPlanners,
      { label: "Virgin Islands Planner", href: "/virgin-islands-cruise-planner" },
      { label: "Mexican Caribbean Planner", href: "/mexican-caribbean-cruise-planner" },
      ...sharedScheduleLinks,
    ],
    comparisonLinks: [
      { label: "Roatan vs Cozumel", href: "/compare/roatan-vs-cozumel" },
      { label: "St. Thomas vs St. Maarten", href: "/compare/st-thomas-vs-st-maarten" },
      { label: "Grand Cayman vs Nassau", href: "/compare/grand-cayman-vs-nassau" },
    ],
    bestGuideLinks: sharedBestGuides,
  },
  msc: {
    fleetSize: "22+ ships (fastest-growing global fleet)",
    passengerProfile:
      "European and international travelers, families, and value seekers experiencing Caribbean cruising with a Mediterranean onboard style.",
    bestFor: ["Families", "Value cruising", "Beaches", "International travelers", "Ocean Cay days"],
    shipSlugs: ["world-america", "msc-seascape", "msc-seashore"],
    excursionCategories: [
      {
        category: "Best Family Excursions",
        href: "/best-caribbean-family-excursions",
        picks: [
          {
            name: "Cable Beach and Downtown",
            portSlug: "nassau",
            description: "Flexible beach and culture combo on MSC Nassau calls.",
          },
          {
            name: "Chankanaab Lagoon",
            portSlug: "cozumel",
            description: "Protected snorkel area and beach close to the pier.",
          },
          {
            name: "Teleférico Cable Car",
            portSlug: "puerto-plata",
            description: "Scenic Dominican ride popular with school-age children.",
          },
        ],
      },
      {
        category: "Best Beach Excursions",
        href: "/best-caribbean-beach-excursions",
        picks: [
          {
            name: "Eagle Beach Day",
            portSlug: "aruba",
            description: "Reliable sunshine outside the hurricane belt on Southern weeks.",
          },
          {
            name: "Costa Maya Beach Club",
            portSlug: "costa-maya",
            description: "Purpose-built port complex with pool and beach access.",
          },
          {
            name: "Orient Bay Club",
            portSlug: "st-maarten",
            description: "French-side beach with full facilities.",
          },
        ],
      },
      {
        category: "Best Snorkeling Excursions",
        href: "/best-caribbean-snorkeling-excursions",
        picks: [
          {
            name: "Palancar Reef Sail",
            portSlug: "cozumel",
            description: "Strong value two-stop snorkel on MSC Western Caribbean routes.",
          },
          {
            name: "Boca Catalina Bay",
            portSlug: "aruba",
            description: "Calm beginner-friendly snorkel on Southern sailings.",
          },
          {
            name: "Mahogany Bay Reef",
            portSlug: "roatan",
            description: "Short transfer to healthy reef sites near the pier.",
          },
        ],
      },
      {
        category: "Best Private Tours",
        href: "/best-caribbean-private-tours",
        picks: [
          {
            name: "Private Cozumel Reef Boat",
            portSlug: "cozumel",
            description: "Custom departure times away from large group boats.",
          },
          {
            name: "Private Damajagua Falls",
            portSlug: "puerto-plata",
            description: "Smaller groups on Dominican adventure days.",
          },
          {
            name: "Private St. Maarten Island Tour",
            portSlug: "st-maarten",
            description: "Split Dutch shopping and French beach time on your schedule.",
          },
        ],
      },
    ],
    planningAdvice: {
      independentExcursions:
        "MSC passengers often find the best value booking Cozumel and Nassau tours through specialist local operators. Confirm English-speaking guides when booking.",
      returnTiming:
        "MSC port times are competitive with other major lines. Allow 75-90 minutes return buffer on full-day Dominican adventure tours.",
      tenderPorts:
        "Most MSC Caribbean calls are pier ports. Amber Cove uses a dedicated pier; confirm Puerto Plata downtown vs Amber Cove on your sailing.",
      peakDays:
        "Miami weekend departures can stack multiple MSC and Carnival ships in Nassau and Cozumel. Check our 2026 and 2027 schedule hubs.",
      bookingAdvice:
        "Ocean Cay MSC Marine Reserve days are ship-focused. Book independent Nassau and Cozumel tours only on standard port calls, not private island days.",
    },
    plannerLinks: [
      ...sharedPlanners,
      { label: "Bahamas Cruise Planner", href: "/bahamas-cruise-planner" },
      { label: "Dominican Republic Planner", href: "/dominican-republic-cruise-planner" },
      ...sharedScheduleLinks,
    ],
    comparisonLinks: [
      { label: "Amber Cove vs Puerto Plata", href: "/compare/amber-cove-vs-puerto-plata" },
      { label: "Aruba vs Curacao", href: "/compare/aruba-vs-curacao" },
      { label: "Roatan vs Cozumel", href: "/compare/roatan-vs-cozumel" },
    ],
    bestGuideLinks: sharedBestGuides,
  },
  princess: {
    fleetSize: "17+ ships with Sphere and Royal-class Caribbean deployment",
    passengerProfile:
      "Mature couples, repeat cruisers, and relaxed travelers who prefer structured port days with premium service and longer Southern Caribbean options.",
    bestFor: ["Couples", "Relaxation", "Southern Caribbean", "Beaches", "Wildlife"],
    shipSlugs: ["sun-princess", "enchanted-princess", "regal-princess"],
    excursionCategories: [
      {
        category: "Best Family Excursions",
        href: "/best-caribbean-family-excursions",
        picks: [
          {
            name: "Coral World Ocean Park",
            portSlug: "st-thomas",
            description: "Touch pools and observatory suited to Princess Eastern weeks.",
          },
          {
            name: "Cayman Turtle Centre",
            portSlug: "grand-cayman",
            description: "Pairs with afternoon beach time on tender port days.",
          },
          {
            name: "Chankanaab Park",
            portSlug: "cozumel",
            description: "Secure lagoon snorkel and beach for multi-generational groups.",
          },
        ],
      },
      {
        category: "Best Beach Excursions",
        href: "/best-caribbean-beach-excursions",
        picks: [
          {
            name: "Trunk Bay Beach",
            portSlug: "st-thomas",
            description: "National Park beach via St. John ferry, a Princess favorite.",
          },
          {
            name: "Eagle Beach",
            portSlug: "aruba",
            description: "Long beach windows on Southern Caribbean Sun Princess sailings.",
          },
          {
            name: "Seven Mile Beach",
            portSlug: "grand-cayman",
            description: "Classic white-sand day with organized tender-aware transport.",
          },
        ],
      },
      {
        category: "Best Snorkeling Excursions",
        href: "/best-caribbean-snorkeling-excursions",
        picks: [
          {
            name: "Sapphire Beach Reef",
            portSlug: "st-thomas",
            description: "Accessible reef snorkeling with optional St. John extension.",
          },
          {
            name: "Stingray City and Reef",
            portSlug: "grand-cayman",
            description: "Wildlife sandbar plus afternoon reef snorkel on tender days.",
          },
          {
            name: "Palancar Gardens",
            portSlug: "cozumel",
            description: "Gentle reef formations ideal for relaxed snorkelers.",
          },
        ],
      },
      {
        category: "Best Private Tours",
        href: "/best-caribbean-private-tours",
        picks: [
          {
            name: "Private Stingray City Charter",
            portSlug: "grand-cayman",
            description: "Early-morning small boat avoids peak sandbar crowds.",
          },
          {
            name: "Private St. Thomas Island Tour",
            portSlug: "st-thomas",
            description: "Custom Magens Bay and Red Hook ferry timing.",
          },
          {
            name: "Private Aruba North Coast 4x4",
            portSlug: "aruba",
            description: "Natural Pool and lighthouse route on Southern weeks.",
          },
        ],
      },
    ],
    planningAdvice: {
      independentExcursions:
        "Princess passengers often prefer the security of ship tours at Grand Cayman, but St. Thomas and Aruba independents work well with reputable operators.",
      returnTiming:
        "Princess Southern Caribbean sailings often allow longer port windows. Still keep 90 minutes before all-aboard on St. John ferry days.",
      tenderPorts:
        "Grand Cayman is the primary tender port on Princess Caribbean itineraries. Princess Cays is a ship-focused private destination day.",
      peakDays:
        "St. Thomas and St. Maarten peak when multiple Princess and Royal ships overlap in winter season. Use schedule pages to plan Magens Bay timing.",
      bookingAdvice:
        "Book Grand Cayman and signature wildlife tours through Princess or trusted independents before sailing. Save Aruba beach days for independent taxis.",
    },
    plannerLinks: [
      ...sharedPlanners,
      { label: "Virgin Islands Planner", href: "/virgin-islands-cruise-planner" },
      { label: "ABC Islands Planner", href: "/abc-islands-cruise-planner" },
      ...sharedScheduleLinks,
    ],
    comparisonLinks: [
      { label: "St. Thomas vs St. Maarten", href: "/compare/st-thomas-vs-st-maarten" },
      { label: "Aruba vs Curacao", href: "/compare/aruba-vs-curacao" },
      { label: "Grand Cayman vs Nassau", href: "/compare/grand-cayman-vs-nassau" },
    ],
    bestGuideLinks: sharedBestGuides,
  },
  celebrity: {
    fleetSize: "15+ ships with Edge-class premium Caribbean focus",
    passengerProfile:
      "Upscale couples and discerning travelers who want modern design, culinary experiences, and curated port days with smaller-group excursion formats.",
    bestFor: ["Couples", "Luxury", "Culinary travel", "Southern Caribbean", "Snorkeling"],
    shipSlugs: ["beyond", "ascent", "apex"],
    excursionCategories: [
      {
        category: "Best Family Excursions",
        href: "/best-caribbean-family-excursions",
        picks: [
          {
            name: "De Palm Island",
            portSlug: "aruba",
            description: "All-inclusive island day with water park on Southern Celebrity routes.",
          },
          {
            name: "Chankanaab Premium Day",
            portSlug: "cozumel",
            description: "Upscale beach club format with snorkel lagoon access.",
          },
          {
            name: "Coral World Visit",
            portSlug: "st-thomas",
            description: "Marine park with observatory suited to mixed-age groups.",
          },
        ],
      },
      {
        category: "Best Beach Excursions",
        href: "/best-caribbean-beach-excursions",
        picks: [
          {
            name: "Eagle Beach Cabana",
            portSlug: "aruba",
            description: "Private lounging with lunch on reliable Southern Caribbean weather.",
          },
          {
            name: "Orient Bay Premium Club",
            portSlug: "st-maarten",
            description: "Upscale French-side beach with curated service.",
          },
          {
            name: "Magens Bay Morning",
            portSlug: "st-thomas",
            description: "Calm bay swim before afternoon shopping in Charlotte Amalie.",
          },
        ],
      },
      {
        category: "Best Snorkeling Excursions",
        href: "/best-caribbean-snorkeling-excursions",
        picks: [
          {
            name: "Small-Group Palancar Sail",
            portSlug: "cozumel",
            description: "Premium reef snorkel with fewer passengers than mass-market boats.",
          },
          {
            name: "Tintamarre Catamaran",
            portSlug: "st-maarten",
            description: "Uninhabited islet snorkel sail off the Dutch coast.",
          },
          {
            name: "Boca Catalina Snorkel",
            portSlug: "aruba",
            description: "Calm bay snorkel paired with sunset sailing on Southern weeks.",
          },
        ],
      },
      {
        category: "Best Private Tours",
        href: "/best-caribbean-private-tours",
        picks: [
          {
            name: "Private El Cielo Charter",
            portSlug: "cozumel",
            description: "Champagne service and custom reef timing for couples.",
          },
          {
            name: "Private St. Thomas Catamaran",
            portSlug: "st-thomas",
            description: "Outer cay sail avoiding crowded group boats.",
          },
          {
            name: "Private Aruba Sunset Sail",
            portSlug: "aruba",
            description: "Evening catamaran with snorkel stop on longer port days.",
          },
        ],
      },
    ],
    planningAdvice: {
      independentExcursions:
        "Celebrity passengers often prefer small-group independents in Cozumel and St. Thomas. Specialist sites list premium operators matching Celebrity's upscale expectations.",
      returnTiming:
        "Celebrity sometimes offers longer port stays on Southern routes. For standard seven-hour calls, cap full-day tours at five hours including transfers.",
      tenderPorts:
        "Grand Cayman tenders require careful planning. Celebrity's smaller-group tours often include tender priority; confirm before booking independents.",
      peakDays:
        "Aruba and St. Maarten are less crowded than Cozumel but still busy on winter Tuesdays and Saturdays when multiple premium ships call.",
      bookingAdvice:
        "Book Celebrity specialty dining and signature excursions early. Reserve private catamarans in Cozumel and St. Thomas at least three weeks ahead in peak season.",
    },
    plannerLinks: [
      ...sharedPlanners,
      { label: "ABC Islands Planner", href: "/abc-islands-cruise-planner" },
      { label: "Virgin Islands Planner", href: "/virgin-islands-cruise-planner" },
      ...sharedScheduleLinks,
    ],
    comparisonLinks: [
      { label: "Aruba vs Curacao", href: "/compare/aruba-vs-curacao" },
      { label: "St. Thomas vs St. Maarten", href: "/compare/st-thomas-vs-st-maarten" },
      { label: "Roatan vs Cozumel", href: "/compare/roatan-vs-cozumel" },
    ],
    bestGuideLinks: [
      ...sharedBestGuides,
      { label: "Best Couple Excursions", href: "/best-caribbean-couple-excursions" },
      { label: "Best Catamaran Cruises", href: "/best-caribbean-catamaran-cruises" },
    ],
  },
};

export function getCruiseLinePlanning(slug: string): CruiseLinePlanningProfile | undefined {
  return cruiseLinePlanning[slug];
}
