import type { TopicClusterData } from "./types";
import { getRegionalCruisePlannerBySlug } from "./regional-cruise-planners";
import { getItineraryPlannerBySlug } from "./itinerary-planners";

export const ALL_TOPIC_CLUSTER_SLUGS = [
  "abc-islands-cruise-planner",
  "virgin-islands-cruise-planner",
  "bahamas-cruise-planner",
  "dominican-republic-cruise-planner",
  "jamaica-cruise-planner",
  "mexican-caribbean-cruise-planner",
  "central-america-cruise-planner",
  "eastern-caribbean-cruise-planner",
  "western-caribbean-cruise-planner",
  "southern-caribbean-cruise-planner",
] as const;

const sharedBestGuides = [
  "best-caribbean-shore-excursions",
  "best-caribbean-beach-excursions",
  "best-caribbean-snorkeling-excursions",
  "best-caribbean-family-excursions",
  "best-caribbean-private-tours",
];

export const topicClusters: TopicClusterData[] = [
  {
    slug: "abc-islands-cruise-planner",
    portSlugs: ["aruba", "curacao", "bonaire"],
    portCardNotes: {
      aruba: {
        shortDescription:
          "Year-round sunshine, wide white-sand beaches, and the easiest pier-to-beach logistics in the Southern Caribbean.",
        topExcursionType: "Beach & catamaran",
      },
      curacao: {
        shortDescription:
          "UNESCO waterfront culture, Dutch-Caribbean dining, and west-coast snorkel coves a short taxi from Willemstad.",
        topExcursionType: "Culture & reef snorkel",
      },
      bonaire: {
        shortDescription:
          "Marine park shore diving, flamingo salt flats, and conservation-focused reef days from Kralendijk pier.",
        topExcursionType: "Reef snorkel & wildlife",
      },
    },
    comparisonTable: [
      {
        portSlug: "aruba",
        portName: "Aruba",
        bestFor: "Reliable beach days",
        bestExcursion: "Eagle Beach and west-coast catamaran",
        beachQuality: "Excellent wide sand",
        snorkelling: "Good wreck and bay sites",
        families: "Very strong",
        privateTours: "Excellent SUV and beach combos",
        easeFromShip: "Very easy pier walk",
      },
      {
        portSlug: "curacao",
        portName: "Curacao",
        bestFor: "Culture plus diving",
        bestExcursion: "Willemstad walk and west-cove snorkel",
        beachQuality: "Good cove beaches",
        snorkelling: "Excellent reef quality",
        families: "Strong with planning",
        privateTours: "Very good custom routes",
        easeFromShip: "Easy downtown access",
      },
      {
        portSlug: "bonaire",
        portName: "Bonaire",
        bestFor: "Marine park reefs",
        bestExcursion: "Shore reef snorkel tour",
        beachQuality: "Reef-entry focused",
        snorkelling: "Excellent protected reefs",
        families: "Good with reef guides",
        privateTours: "Excellent charters",
        easeFromShip: "Very easy pier walk",
      },
    ],
    dayPlans: [
      {
        portSlug: "aruba",
        easyDay: "Taxi to Eagle Beach, chair rental, and a short downtown stroll near Oranjestad before return.",
        adventureDay: "Arikok north-coast 4x4 to Natural Pool with guided swim stop when conditions allow.",
        beachDay: "Morning at Eagle Beach, afternoon De Palm Island or catamaran sail along the west coast.",
        privateTourDay: "Private SUV loop covering California Lighthouse, north coast, and a final beach stop on your schedule.",
      },
      {
        portSlug: "curacao",
        easyDay: "Walk Handelskade from the pier, explore Punda, and add a short Willemstad food stop.",
        adventureDay: "Christoffel hike or off-road park route paired with a west-coast snorkel cove.",
        beachDay: "Grote Knip or Porto Mari with pre-booked taxi timing for a full beach afternoon.",
        privateTourDay: "Private driver combining old town, local market, and a west-coast snorkel stop.",
      },
      {
        portSlug: "bonaire",
        easyDay: "Guided beginner reef snorkel with Kralendijk waterfront lunch.",
        adventureDay: "Washington Slagbaai park jeep with flamingo lagoon stops.",
        beachDay: "Reef-entry shore snorkel at a marine park site with water shoes.",
        privateTourDay: "Private reef charter or flamingo and salt flat safari on your schedule.",
      },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "aruba", excursionName: "De Palm Island day pass", description: "All-inclusive water park, snorkel areas, and lunch in one controlled setting.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "aruba", excursionName: "Sunset catamaran sail", description: "Trade-wind sailing with cocktails along Aruba's calm west coast.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "aruba", excursionName: "Eagle Beach transfer", description: "The simplest high-reward beach day in the ABC route.", guideHref: "/ports/aruba" },
      { travellerType: "Active travellers", portSlug: "curacao", excursionName: "Arikok-style off-road and cove combo", description: "Rugged scenery plus reef time on Curacao's less resort-focused side.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "aruba", excursionName: "Eagle Beach morning", description: "Top-ranked Caribbean sand with reliable swim conditions.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "curacao", excursionName: "West-coast reef snorkel", description: "Healthy hard and soft coral in protected coves.", guideHref: "/best-caribbean-snorkeling-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "bonaire", excursionName: "Marine park shore snorkel", description: "Protected house reefs with flamingo lagoon add-ons.", guideHref: "/best-caribbean-snorkeling-excursions" },
    ],
    comparisonSlugs: ["aruba-vs-curacao", "aruba-vs-bonaire", "bonaire-vs-curacao"],
    bestGuideSlugs: [...sharedBestGuides, "best-caribbean-couple-excursions"],
    nextStepCta:
      "Choose Aruba or Curacao for your next Southern Caribbean call, check ship schedules if your sailing is set, then compare shore excursions by beach, reef, or culture focus.",
  },
  {
    slug: "virgin-islands-cruise-planner",
    portSlugs: ["st-thomas", "st-maarten", "tortola"],
    portCardNotes: {
      "st-thomas": {
        shortDescription:
          "Magens Bay, St. John ferry access, and duty-free Charlotte Amalie within minutes of Havensight or Crown Bay.",
        topExcursionType: "Beach & island hop",
      },
      "st-maarten": {
        shortDescription:
          "Dual-nation port days pairing Dutch Philipsburg with French Orient Bay beaches and Maho plane spotting.",
        topExcursionType: "Beach & culture split",
      },
      tortola: {
        shortDescription:
          "BVI catamaran sailing, Virgin Gorda day trips, and quieter English-speaking island days via Road Town tender.",
        topExcursionType: "Catamaran & sailing",
      },
    },
    comparisonTable: [
      {
        portSlug: "st-thomas",
        portName: "St. Thomas",
        bestFor: "Beaches & St. John access",
        bestExcursion: "Magens Bay and optional St. John ferry",
        beachQuality: "Excellent Magens Bay",
        snorkelling: "Very good Sapphire Beach",
        families: "Excellent",
        privateTours: "Excellent taxi tours",
        easeFromShip: "Very easy pier access",
      },
      {
        portSlug: "st-maarten",
        portName: "St. Maarten",
        bestFor: "Dual-nation beach days",
        bestExcursion: "Orient Bay and Philipsburg loop",
        beachQuality: "Very good Orient Bay",
        snorkelling: "Good boat snorkel sails",
        families: "Strong",
        privateTours: "Very good island splits",
        easeFromShip: "Easy pier, taxi needed",
      },
      {
        portSlug: "tortola",
        portName: "Tortola",
        bestFor: "BVI sailing & coves",
        bestExcursion: "Catamaran snorkel sail",
        beachQuality: "Very good Cane Garden Bay",
        snorkelling: "Excellent BVI reef stops",
        families: "Good with sailing tours",
        privateTours: "Excellent charters",
        easeFromShip: "Tender port",
      },
    ],
    dayPlans: [
      {
        portSlug: "st-thomas",
        easyDay: "Magens Bay transfer, short downtown browse, and return with a wide time buffer.",
        adventureDay: "St. John ferry to Trunk Bay snorkel trail plus scenic Red Hook stops.",
        beachDay: "Full morning at Magens Bay with chair rental and calm swim time.",
        privateTourDay: "Private taxi hitting Magens Bay, Mountain Top, and Red Hook on your timeline.",
      },
      {
        portSlug: "st-maarten",
        easyDay: "Philipsburg waterfront walk, short shopping, and a taxi to a nearby beach club.",
        adventureDay: "Maho plane spotting, Orient Bay water sports, and French-side Marigot stop.",
        beachDay: "Orient Bay beach club day with lunch and loungers on the French side.",
        privateTourDay: "Private driver splitting Dutch shopping, French beach, and scenic overlooks.",
      },
      {
        portSlug: "tortola",
        easyDay: "Tender to Road Town, Cane Garden Bay taxi, and waterfront lunch.",
        adventureDay: "Full-day Virgin Gorda and The Baths grotto excursion.",
        beachDay: "Half-day Cane Garden Bay with calm swim time.",
        privateTourDay: "Private BVI catamaran charter with custom snorkel and beach stops.",
      },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "st-thomas", excursionName: "Coral World Ocean Park", description: "Touch pools and observatory without long boat transfers.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "st-maarten", excursionName: "Tintamarre catamaran", description: "Uninhabited islet snorkel sail off the Dutch coast.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "st-thomas", excursionName: "Magens Bay beach day", description: "The classic Eastern Caribbean introduction port.", guideHref: "/ports/st-thomas" },
      { travellerType: "Active travellers", portSlug: "st-maarten", excursionName: "Maho and Orient Bay combo", description: "High-energy dual-nation day with beach and aviation spectacle.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "st-thomas", excursionName: "Magens Bay morning", description: "Horseshoe bay with calm water in most conditions.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "st-thomas", excursionName: "St. John Trunk Bay trail", description: "National Park snorkel trail via short ferry.", guideHref: "/best-caribbean-snorkeling-excursions" },
      { travellerType: "First-time cruisers", portSlug: "tortola", excursionName: "BVI catamaran snorkel sail", description: "Quieter sailing alternative to busy USVI port days.", guideHref: "/ports/tortola" },
    ],
    comparisonSlugs: ["st-thomas-vs-st-maarten", "st-thomas-vs-tortola", "st-maarten-vs-tortola"],
    bestGuideSlugs: sharedBestGuides,
    nextStepCta:
      "Pick St. Thomas for island-hopping beaches or St. Maarten for a two-nation port day, confirm your ship schedule, then book excursions with guaranteed pier return.",
  },
  {
    slug: "bahamas-cruise-planner",
    portSlugs: ["nassau", "grand-cayman"],
    portCardNotes: {
      nassau: {
        shortDescription:
          "Walkable Prince George Wharf, Atlantis on Paradise Island, and quick catamaran snorkel sails close to port.",
        topExcursionType: "Waterpark & reef",
      },
      "grand-cayman": {
        shortDescription:
          "Tender port famous for Stingray City sandbar wildlife and Seven Mile Beach, with clear reef snorkel options.",
        topExcursionType: "Wildlife & beach",
      },
    },
    comparisonTable: [
      {
        portSlug: "nassau",
        portName: "Nassau",
        bestFor: "Atlantis & downtown",
        bestExcursion: "Atlantis Aquaventure or Rose Island snorkel",
        beachQuality: "Very good Paradise Island",
        snorkelling: "Good catamaran reefs",
        families: "Excellent",
        privateTours: "Good downtown combos",
        easeFromShip: "Very easy walkable pier",
      },
      {
        portSlug: "grand-cayman",
        portName: "Grand Cayman",
        bestFor: "Stingray City wildlife",
        bestExcursion: "Stingray sandbar and reef snorkel",
        beachQuality: "Excellent Seven Mile",
        snorkelling: "Very good Cemetery Reef",
        families: "Excellent wildlife day",
        privateTours: "Excellent charter boats",
        easeFromShip: "Tender adds 30-40 min",
      },
    ],
    dayPlans: [
      {
        portSlug: "nassau",
        easyDay: "Downtown Nassau walking loop, Junkanoo Beach, and optional short Paradise Island taxi.",
        adventureDay: "Atlantis Aquaventure full day or powerboat adventure to outer cays.",
        beachDay: "Cable Beach or Atlantis beach pass with pool access.",
        privateTourDay: "Private Rose Island snorkel charter with custom departure time.",
      },
      {
        portSlug: "grand-cayman",
        easyDay: "Morning Stingray City tender boat, light downtown browse, and early return.",
        adventureDay: "Stingray City plus Cemetery Reef snorkel on a two-stop wildlife morning.",
        beachDay: "Seven Mile Beach break with organized tender-aware transport.",
        privateTourDay: "Private early Stingray charter before group boats arrive.",
      },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "nassau", excursionName: "Atlantis Aquaventure", description: "Caribbean's premier family waterpark day from Paradise Island.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "grand-cayman", excursionName: "Private Stingray charter", description: "Early-morning sandbar visit with smaller crowds.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "nassau", excursionName: "Downtown and beach sampler", description: "Low-logistics introduction to Bahamas port days.", guideHref: "/ports/nassau" },
      { travellerType: "Active travellers", portSlug: "grand-cayman", excursionName: "Stingray and reef combo", description: "Wildlife sandbar paired with afternoon snorkel sail.", guideHref: "/best-caribbean-wildlife-excursions" },
      { travellerType: "Beach lovers", portSlug: "nassau", excursionName: "Paradise Island beach day", description: "Pools plus beach within a short boat or taxi ride.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "grand-cayman", excursionName: "Stingray City sandbar", description: "Wild stingrays in shallow water, unique to Grand Cayman.", guideHref: "/best-caribbean-wildlife-excursions" },
    ],
    comparisonSlugs: ["grand-cayman-vs-nassau"],
    bestGuideSlugs: [...sharedBestGuides, "best-caribbean-wildlife-excursions"],
    nextStepCta:
      "Decide between Nassau resort-style days and Grand Cayman wildlife tenders, check your 2026 or 2027 ship schedule, then compare operators with on-time return policies.",
  },
  {
    slug: "dominican-republic-cruise-planner",
    portSlugs: ["puerto-plata", "samana", "la-romana"],
    portCardNotes: {
      "puerto-plata": {
        shortDescription:
          "Amber Coast calls at Amber Cove or Puerto Plata with Teleférico views, waterfalls, and colonial city culture.",
        topExcursionType: "Adventure & culture",
      },
      samana: {
        shortDescription:
          "Northeast peninsula port for seasonal whale watching, El Limón waterfall, and secluded Playa Rincón escapes.",
        topExcursionType: "Wildlife & rainforest",
      },
      "la-romana": {
        shortDescription:
          "Southeast gateway for Saona Island catamarans, Altos de Chavón village, and Catalina Island reef snorkel.",
        topExcursionType: "Island catamaran",
      },
    },
    comparisonTable: [
      {
        portSlug: "puerto-plata",
        portName: "Puerto Plata",
        bestFor: "Waterfalls & cable car",
        bestExcursion: "Teleférico and Damajagua falls",
        beachQuality: "Good organized beaches",
        snorkelling: "Moderate boat options",
        families: "Strong with planning",
        privateTours: "Excellent private drivers",
        easeFromShip: "Good pier access",
      },
      {
        portSlug: "samana",
        portName: "Samaná",
        bestFor: "Whales & rainforest",
        bestExcursion: "Humpback whale watching",
        beachQuality: "Excellent secluded beaches",
        snorkelling: "Moderate island stops",
        families: "Good ages 6+ for whales",
        privateTours: "Very good nature guides",
        easeFromShip: "Good pier access",
      },
      {
        portSlug: "la-romana",
        portName: "La Romana",
        bestFor: "Island catamaran days",
        bestExcursion: "Saona Island sail",
        beachQuality: "Excellent island beaches",
        snorkelling: "Good Catalina Island reef",
        families: "Very strong",
        privateTours: "Excellent charters",
        easeFromShip: "Very easy pier",
      },
    ],
    dayPlans: [
      {
        portSlug: "puerto-plata",
        easyDay: "Teleférico morning, short old-town walk, and Amber Cove pool relaxation.",
        adventureDay: "Damajagua waterfalls climb with early departure slot.",
        beachDay: "Organized beach transfer or Amber Cove facilities day.",
        privateTourDay: "Private countryside route with waterfall, viewpoint, and beach on your timing.",
      },
      {
        portSlug: "samana",
        easyDay: "Playa Bonita beach with organized transport and waterfront lunch.",
        adventureDay: "El Limón waterfall horseback trek with swim at the cascade.",
        beachDay: "Playa Rincón boat transfer for a secluded full-day beach.",
        privateTourDay: "Private whale watching boat in peak season or custom waterfall route.",
      },
      {
        portSlug: "la-romana",
        easyDay: "Altos de Chavón village walk with river gorge views.",
        adventureDay: "Full-day Saona Island catamaran with natural pool stop.",
        beachDay: "Catalina Island snorkel and beach combo.",
        privateTourDay: "Private Saona charter with custom beach and snorkel timing.",
      },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "puerto-plata", excursionName: "Teleférico cable car", description: "Scenic ride popular with school-age children.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "puerto-plata", excursionName: "Historic district and tastings", description: "Colonial architecture with local food stops.", guideHref: "/ports/puerto-plata" },
      { travellerType: "First-time cruisers", portSlug: "puerto-plata", excursionName: "Amber Cove port day", description: "Low-stress pools and facilities without long transfers.", guideHref: "/ports/puerto-plata" },
      { travellerType: "Active travellers", portSlug: "puerto-plata", excursionName: "27 Waterfalls of Damajagua", description: "Signature Dominican adventure excursion.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "puerto-plata", excursionName: "Guided beach transfer", description: "Organized transport protects return timing inland.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "puerto-plata", excursionName: "Rainforest waterfall route", description: "Tropical river and canopy settings on guided tours.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Wildlife/nature lovers", portSlug: "samana", excursionName: "Humpback whale watching", description: "Seasonal breeding-ground boat tours in Samaná Bay.", guideHref: "/best-caribbean-wildlife-excursions" },
      { travellerType: "Beach lovers", portSlug: "la-romana", excursionName: "Saona Island catamaran", description: "National park island beaches with natural pool stops.", guideHref: "/best-caribbean-beach-excursions" },
    ],
    comparisonSlugs: [
      "amber-cove-vs-puerto-plata",
      "puerto-plata-vs-samana",
      "la-romana-vs-puerto-plata",
    ],
    bestGuideSlugs: sharedBestGuides,
    nextStepCta:
      "Confirm whether your ship uses Amber Cove or Puerto Plata downtown, review the port schedule, then book one anchor excursion with safe return margin.",
  },
  {
    slug: "jamaica-cruise-planner",
    portSlugs: ["ocho-rios", "falmouth", "montego-bay"],
    portCardNotes: {
      "ocho-rios": {
        shortDescription:
          "North-coast adventure hub for Dunn's River Falls, Mystic Mountain, and rainforest zip-lines.",
        topExcursionType: "Waterfalls & adventure",
      },
      falmouth: {
        shortDescription:
          "Heritage port with Martha Brae rafting, cultural routes, and Montego Bay area beach access.",
        topExcursionType: "Culture & scenic river",
      },
      "montego-bay": {
        shortDescription:
          "Resort capital with Doctor's Cave Beach, Rose Hall Great House, and Hip Strip beach clubs.",
        topExcursionType: "Beach & heritage",
      },
    },
    comparisonTable: [
      {
        portSlug: "ocho-rios",
        portName: "Ocho Rios",
        bestFor: "Waterfall adventures",
        bestExcursion: "Dunn's River Falls early entry",
        beachQuality: "Good add-on beaches",
        snorkelling: "Moderate boat snorkel",
        families: "Strong with pacing",
        privateTours: "Very good early charters",
        easeFromShip: "Easy pier, inland drives",
      },
      {
        portSlug: "falmouth",
        portName: "Falmouth",
        bestFor: "Culture & river scenery",
        bestExcursion: "Martha Brae rafting",
        beachQuality: "Good resort beaches",
        snorkelling: "Moderate packages",
        families: "Strong river options",
        privateTours: "Excellent drivers",
        easeFromShip: "Good pier access",
      },
      {
        portSlug: "montego-bay",
        portName: "Montego Bay",
        bestFor: "Resort beaches",
        bestExcursion: "Doctor's Cave Beach",
        beachQuality: "Excellent Hip Strip beaches",
        snorkelling: "Moderate marine park boats",
        families: "Very strong",
        privateTours: "Very good drivers",
        easeFromShip: "Easy pier access",
      },
    ],
    dayPlans: [
      {
        portSlug: "ocho-rios",
        easyDay: "Dolphin Cove lagoon or short beach club without a full falls climb.",
        adventureDay: "Early Dunn's River Falls climb plus optional Mystic Mountain add-on.",
        beachDay: "Beach club afternoon after a short morning scenic stop.",
        privateTourDay: "Private early falls slot before group tour arrivals.",
      },
      {
        portSlug: "falmouth",
        easyDay: "Martha Brae river raft and heritage walking loop near port.",
        adventureDay: "River rafting morning with a curated food and culture afternoon.",
        beachDay: "Resort beach transfer with organized return transport.",
        privateTourDay: "Private driver for beach, river, and culinary stops on flexible timing.",
      },
      {
        portSlug: "montego-bay",
        easyDay: "Doctor's Cave Beach with Hip Strip lunch and short downtown browse.",
        adventureDay: "Rose Hall Great House tour with rum tasting and viewpoint stops.",
        beachDay: "Resort beach day pass or Margaritaville pool and slide complex.",
        privateTourDay: "Private MoBay highlights loop with beach and heritage on your schedule.",
      },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "ocho-rios", excursionName: "Gentler falls alternatives", description: "Scenic parks when full climbs are too demanding for younger children.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "falmouth", excursionName: "Martha Brae rafting", description: "Slow-paced scenic river experience.", guideHref: "/ports/falmouth" },
      { travellerType: "First-time cruisers", portSlug: "ocho-rios", excursionName: "Dunn's River Falls", description: "Jamaica's signature cruise port experience.", guideHref: "/ports/ocho-rios" },
      { travellerType: "Active travellers", portSlug: "ocho-rios", excursionName: "Mystic Mountain bobsled", description: "Rainforest adrenaline paired with north-coast views.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "falmouth", excursionName: "Resort beach day", description: "Predictable facilities with guided pier transfers.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "ocho-rios", excursionName: "Rainforest adventure parks", description: "Tropical canopy settings with guided supervision.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "montego-bay", excursionName: "Doctor's Cave Beach", description: "Classic MoBay swim beach with Hip Strip facilities.", guideHref: "/best-caribbean-beach-excursions" },
    ],
    comparisonSlugs: [
      "ocho-rios-vs-falmouth",
      "ocho-rios-vs-montego-bay",
      "falmouth-vs-montego-bay",
    ],
    bestGuideSlugs: sharedBestGuides,
    nextStepCta:
      "Use Ocho Rios for your adventure anchor and Falmouth for a relaxed second Jamaica day, check ship schedules for both ports, then book with generous return buffers.",
  },
  {
    slug: "mexican-caribbean-cruise-planner",
    portSlugs: ["cozumel", "costa-maya", "progreso"],
    portCardNotes: {
      cozumel: {
        shortDescription:
          "Mesoamerican Barrier Reef access, Mayan ruin combos, and three cruise piers with strong operator choice.",
        topExcursionType: "Reef snorkel & ruins",
      },
      "costa-maya": {
        shortDescription:
          "Purpose-built Mahahual cruise village with Chacchoben ruins and relaxed beach club options nearby.",
        topExcursionType: "Ruins & beach village",
      },
      progreso: {
        shortDescription:
          "Yucatán Gulf pier gateway to colonial Mérida, Uxmal ruins, and Celestún flamingo reserves.",
        topExcursionType: "Culture & ruins",
      },
    },
    comparisonTable: [
      {
        portSlug: "cozumel",
        portName: "Cozumel",
        bestFor: "World-class snorkelling",
        bestExcursion: "Palancar two-stop reef sail",
        beachQuality: "Very good club beaches",
        snorkelling: "Excellent marine park",
        families: "Excellent",
        privateTours: "Excellent reef boats",
        easeFromShip: "Very easy pier access",
      },
      {
        portSlug: "costa-maya",
        portName: "Costa Maya",
        bestFor: "Ruins plus village beach",
        bestExcursion: "Chacchoben and Mahahual beach",
        beachQuality: "Good village beaches",
        snorkelling: "Moderate near village",
        families: "Strong",
        privateTours: "Good small groups",
        easeFromShip: "Excellent village pier",
      },
      {
        portSlug: "progreso",
        portName: "Progreso",
        bestFor: "Mérida culture & Uxmal",
        bestExcursion: "Mérida colonial tour",
        beachQuality: "Moderate Gulf beach",
        snorkelling: "Limited reef access",
        families: "Very good",
        privateTours: "Excellent private vans",
        easeFromShip: "Long pier shuttle",
      },
    ],
    dayPlans: [
      {
        portSlug: "cozumel",
        easyDay: "Chankanaab lagoon snorkel and beach close to the pier.",
        adventureDay: "Tulum express or ATV jungle route with afternoon reef snorkel.",
        beachDay: "Mr. Sanchos or similar day club with ferry-return timing built in.",
        privateTourDay: "Private Palancar reef boat with two stops on your departure schedule.",
      },
      {
        portSlug: "costa-maya",
        easyDay: "Cruise village pools, shopping, and short Mahahual beach walk.",
        adventureDay: "Chacchoben ruins morning with disciplined return for afternoon beach.",
        beachDay: "Mahahual beach club with loungers and lunch included.",
        privateTourDay: "Private ruins tour with custom beach extension when in-port time allows.",
      },
      {
        portSlug: "progreso",
        easyDay: "Mérida plaza walk with cathedral and market stops.",
        adventureDay: "Early Uxmal ruins departure with hacienda lunch.",
        beachDay: "Progreso malecón beach break after a short cultural morning.",
        privateTourDay: "Private Mérida or Celestún flamingo tour on custom timing.",
      },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "cozumel", excursionName: "Chankanaab Park", description: "Protected lagoon, beach, and facilities near the pier.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "cozumel", excursionName: "Private El Cielo catamaran", description: "Sandbar and reef sail with smaller groups.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "cozumel", excursionName: "Palancar snorkel sail", description: "The definitive Western Caribbean reef introduction.", guideHref: "/ports/cozumel" },
      { travellerType: "Active travellers", portSlug: "costa-maya", excursionName: "Chacchoben ruins tour", description: "Mayan archaeology without mainland ferry complexity.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "costa-maya", excursionName: "Mahahual beach club", description: "Relaxed white sand without Cozumel-level crowds.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "cozumel", excursionName: "Columbia Deep snorkel", description: "Healthy reef fish, rays, and occasional turtles.", guideHref: "/best-caribbean-snorkeling-excursions" },
      { travellerType: "First-time cruisers", portSlug: "progreso", excursionName: "Mérida colonial tour", description: "Yucatán culture port distinct from reef-focused Cozumel.", guideHref: "/ports/progreso" },
    ],
    comparisonSlugs: [
      "roatan-vs-cozumel",
      "cozumel-vs-costa-maya",
      "cozumel-vs-progreso",
      "costa-maya-vs-progreso",
    ],
    bestGuideSlugs: sharedBestGuides,
    nextStepCta:
      "Split Cozumel for reef depth and Costa Maya for ruins or village beach value, verify ship schedules, then compare independent operators with pier pickup.",
  },
  {
    slug: "central-america-cruise-planner",
    portSlugs: ["roatan", "costa-maya", "puerto-limon"],
    portCardNotes: {
      roatan: {
        shortDescription:
          "Mahogany Bay reef access, West Bay white sand, and among the Caribbean's best-value snorkel days.",
        topExcursionType: "Reef snorkel & beach",
      },
      "costa-maya": {
        shortDescription:
          "Compact cruise village with Mayan ruin routes and low-stress Mahahual beach clubs.",
        topExcursionType: "Ruins & relaxed beach",
      },
      "puerto-limon": {
        shortDescription:
          "Costa Rica rainforest wildlife, sloth sanctuaries, and Caribbean coast snorkel at Cahuita.",
        topExcursionType: "Wildlife & rainforest",
      },
    },
    comparisonTable: [
      {
        portSlug: "roatan",
        portName: "Roatan",
        bestFor: "Reef value snorkeling",
        bestExcursion: "West Bay beach and reef",
        beachQuality: "Excellent West Bay",
        snorkelling: "Excellent value reefs",
        families: "Very strong",
        privateTours: "Excellent taxi value",
        easeFromShip: "Very easy Mahogany Bay",
      },
      {
        portSlug: "costa-maya",
        portName: "Costa Maya",
        bestFor: "Ruins and village pacing",
        bestExcursion: "Chacchoben and beach club",
        beachQuality: "Good Mahahual",
        snorkelling: "Moderate",
        families: "Strong",
        privateTours: "Good",
        easeFromShip: "Excellent pier village",
      },
      {
        portSlug: "puerto-limon",
        portName: "Puerto Limón",
        bestFor: "Rainforest wildlife",
        bestExcursion: "Sloth sanctuary tour",
        beachQuality: "Good at Cahuita",
        snorkelling: "Moderate Cahuita reef",
        families: "Very strong",
        privateTours: "Very good",
        easeFromShip: "Easy pier docking",
      },
    ],
    dayPlans: [
      {
        portSlug: "roatan",
        easyDay: "West Bay taxi, beach chairs, and snorkel directly off the sand.",
        adventureDay: "Gumbalimba Park wildlife and zip-line with afternoon reef boat.",
        beachDay: "Tabyana or West Bay full-day with short pier transfer.",
        privateTourDay: "Private West Bay driver and custom snorkel boat departure.",
      },
      {
        portSlug: "costa-maya",
        easyDay: "Village facilities and short Mahahual stroll without long coach time.",
        adventureDay: "Chacchoben ruins with a single disciplined afternoon stop only.",
        beachDay: "Mahahual loungers, lunch, and calm swim time.",
        privateTourDay: "Small-group ruins tour with optional private beach extension.",
      },
      {
        portSlug: "puerto-limon",
        easyDay: "Sloth sanctuary morning with short rainforest walk and pier return.",
        adventureDay: "Veragua Rainforest aerial tram and zip-line with waterfall trail.",
        beachDay: "Cahuita National Park snorkel and protected Caribbean beach time.",
        privateTourDay: "Private sanctuary tour with custom Cahuita coast extension.",
      },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "roatan", excursionName: "Gumbalimba Park", description: "Wildlife, zip-lines, and beach in one Mahogany Bay transfer.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "roatan", excursionName: "Private reef snorkel boat", description: "Intimate reef stops at lower Caribbean pricing.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "roatan", excursionName: "West Bay Beach break", description: "Simple, high-quality white sand day.", guideHref: "/ports/roatan" },
      { travellerType: "Active travellers", portSlug: "costa-maya", excursionName: "Chacchoben ruins", description: "Accessible Mayan site with manageable transfers.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "roatan", excursionName: "West Bay full day", description: "Caribbean-quality sand at strong value.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "puerto-limon", excursionName: "Sloth sanctuary tour", description: "Guaranteed sloth and monkey encounters in Costa Rica rainforest.", guideHref: "/best-caribbean-wildlife-excursions" },
    ],
    comparisonSlugs: ["roatan-vs-cozumel"],
    bestGuideSlugs: sharedBestGuides,
    nextStepCta:
      "Pair Roatan reef value with Costa Maya ruin-and-beach pacing and Puerto Limón wildlife on Western Caribbean weeks, check schedules, then book specialists with pier return guarantees.",
  },
  {
    slug: "eastern-caribbean-cruise-planner",
    portSlugs: ["st-thomas", "st-maarten", "puerto-plata", "nassau", "tortola", "samana", "la-romana"],
    portCardNotes: {
      "st-thomas": { shortDescription: "Magens Bay and St. John access from a no-tender pier.", topExcursionType: "Beach & ferry" },
      "st-maarten": { shortDescription: "French and Dutch beaches in one Philipsburg call.", topExcursionType: "Dual-nation beach" },
      "puerto-plata": { shortDescription: "Dominican waterfalls, cable car, and Amber Cove convenience.", topExcursionType: "Adventure" },
      nassau: { shortDescription: "Bahamas waterparks and walkable downtown from Prince George Wharf.", topExcursionType: "Family resort" },
      tortola: { shortDescription: "BVI catamaran sailing and Virgin Gorda day trips via Road Town tender.", topExcursionType: "Catamaran & sailing" },
      samana: { shortDescription: "Seasonal whale watching, El Limón waterfall, and secluded Playa Rincón.", topExcursionType: "Wildlife & rainforest" },
      "la-romana": { shortDescription: "Saona Island catamarans, Altos de Chavón village, and Catalina reef snorkel.", topExcursionType: "Island catamaran" },
    },
    comparisonTable: [
      { portSlug: "st-thomas", portName: "St. Thomas", bestFor: "Beach variety", bestExcursion: "Magens Bay and St. John", beachQuality: "Excellent", snorkelling: "Very good", families: "Excellent", privateTours: "Excellent", easeFromShip: "Very easy" },
      { portSlug: "st-maarten", portName: "St. Maarten", bestFor: "Two-nation day", bestExcursion: "Orient Bay club", beachQuality: "Very good", snorkelling: "Good", families: "Strong", privateTours: "Very good", easeFromShip: "Easy" },
      { portSlug: "puerto-plata", portName: "Puerto Plata", bestFor: "Adventure culture", bestExcursion: "Teleférico and falls", beachQuality: "Good", snorkelling: "Moderate", families: "Strong", privateTours: "Excellent", easeFromShip: "Good" },
      { portSlug: "nassau", portName: "Nassau", bestFor: "Atlantis families", bestExcursion: "Aquaventure day pass", beachQuality: "Very good", snorkelling: "Good", families: "Excellent", privateTours: "Good", easeFromShip: "Very easy" },
      { portSlug: "tortola", portName: "Tortola", bestFor: "BVI sailing", bestExcursion: "Catamaran snorkel sail", beachQuality: "Very good", snorkelling: "Excellent", families: "Good", privateTours: "Excellent", easeFromShip: "Tender port" },
      { portSlug: "samana", portName: "Samaná", bestFor: "Whales & rainforest", bestExcursion: "Humpback whale watching", beachQuality: "Excellent secluded", snorkelling: "Moderate", families: "Good ages 6+", privateTours: "Very good", easeFromShip: "Good pier" },
      { portSlug: "la-romana", portName: "La Romana", bestFor: "Island catamaran", bestExcursion: "Saona Island sail", beachQuality: "Excellent island", snorkelling: "Good Catalina", families: "Very strong", privateTours: "Excellent", easeFromShip: "Very easy" },
    ],
    dayPlans: [
      { portSlug: "st-thomas", easyDay: "Magens Bay and Charlotte Amalie browse.", adventureDay: "St. John Trunk Bay ferry day.", beachDay: "Full Magens Bay with facilities.", privateTourDay: "Private island taxi loop." },
      { portSlug: "st-maarten", easyDay: "Philipsburg and short beach taxi.", adventureDay: "Maho and Orient Bay combo.", beachDay: "Orient Bay club loungers.", privateTourDay: "French-Dutch private split." },
      { portSlug: "puerto-plata", easyDay: "Teleférico and Amber Cove pool.", adventureDay: "Damajagua waterfalls.", beachDay: "Organized beach transfer.", privateTourDay: "Private countryside driver." },
      { portSlug: "nassau", easyDay: "Downtown walk and Junkanoo Beach.", adventureDay: "Atlantis Aquaventure.", beachDay: "Paradise Island beach pass.", privateTourDay: "Private Rose Island snorkel." },
      { portSlug: "tortola", easyDay: "Cane Garden Bay taxi and waterfront lunch.", adventureDay: "Virgin Gorda and The Baths grotto day.", beachDay: "Half-day Cane Garden Bay swim.", privateTourDay: "Private BVI catamaran charter." },
      { portSlug: "samana", easyDay: "Playa Bonita beach with organized transport.", adventureDay: "El Limón waterfall horseback trek.", beachDay: "Playa Rincón boat transfer.", privateTourDay: "Private whale watching or waterfall route." },
      { portSlug: "la-romana", easyDay: "Altos de Chavón village walk.", adventureDay: "Full-day Saona Island catamaran.", beachDay: "Catalina Island snorkel and beach.", privateTourDay: "Private Saona charter." },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "nassau", excursionName: "Atlantis Aquaventure", description: "Best Eastern family waterpark day.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "st-maarten", excursionName: "Orient Bay cabana", description: "French-side beach with lunch service.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "st-thomas", excursionName: "Magens Bay", description: "Classic Eastern Caribbean beach introduction.", guideHref: "/ports/st-thomas" },
      { travellerType: "Active travellers", portSlug: "puerto-plata", excursionName: "Damajagua falls", description: "High-energy Dominican adventure.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "st-thomas", excursionName: "Magens Bay day", description: "Top-ranked calm swimming bay.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "st-thomas", excursionName: "St. John snorkel trail", description: "National Park underwater trail.", guideHref: "/best-caribbean-snorkeling-excursions" },
      { travellerType: "Couples", portSlug: "tortola", excursionName: "Private BVI catamaran", description: "Custom sailing to Norman Island caves and secluded coves.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "samana", excursionName: "Humpback whale watching", description: "Seasonal breeding grounds in Samaná Bay.", guideHref: "/best-caribbean-wildlife-excursions" },
      { travellerType: "Beach lovers", portSlug: "la-romana", excursionName: "Saona Island catamaran", description: "National park island beaches with natural pool stops.", guideHref: "/best-caribbean-beach-excursions" },
    ],
    comparisonSlugs: [
      "st-thomas-vs-st-maarten",
      "st-thomas-vs-tortola",
      "st-maarten-vs-tortola",
      "amber-cove-vs-puerto-plata",
      "puerto-plata-vs-samana",
      "la-romana-vs-puerto-plata",
      "grand-cayman-vs-nassau",
    ],
    bestGuideSlugs: sharedBestGuides,
    nextStepCta:
      "Map each Eastern Caribbean port day to one clear style, check 2026 and 2027 schedules where available, then open authority guides and specialist sites to book.",
  },
  {
    slug: "western-caribbean-cruise-planner",
    portSlugs: ["cozumel", "roatan", "grand-cayman", "costa-maya", "ocho-rios", "puerto-limon", "progreso", "falmouth", "montego-bay"],
    portCardNotes: {
      cozumel: { shortDescription: "Barrier reef capital with ruin-and-reef combo potential.", topExcursionType: "Snorkelling" },
      roatan: { shortDescription: "Reef quality rivalling Cozumel at lower prices.", topExcursionType: "Beach reef" },
      "grand-cayman": { shortDescription: "Tender wildlife sandbar and Seven Mile Beach.", topExcursionType: "Wildlife" },
      "costa-maya": { shortDescription: "Village pier with ruins and Mahahual beach clubs.", topExcursionType: "Ruins" },
      "ocho-rios": { shortDescription: "Jamaica waterfall and rainforest adventure port.", topExcursionType: "Waterfalls" },
      "puerto-limon": { shortDescription: "Costa Rica sloth sanctuaries and Veragua rainforest adventures.", topExcursionType: "Wildlife" },
      progreso: { shortDescription: "Yucatán Gulf pier gateway to Mérida culture and Uxmal ruins.", topExcursionType: "Culture & ruins" },
      falmouth: { shortDescription: "Heritage port with Martha Brae rafting and north-coast culture.", topExcursionType: "River & culture" },
      "montego-bay": { shortDescription: "Resort beaches, Rose Hall estate, and Hip Strip beach clubs.", topExcursionType: "Beach & heritage" },
    },
    comparisonTable: [
      { portSlug: "cozumel", portName: "Cozumel", bestFor: "Reef depth", bestExcursion: "Palancar snorkel sail", beachQuality: "Very good", snorkelling: "Excellent", families: "Excellent", privateTours: "Excellent", easeFromShip: "Very easy" },
      { portSlug: "roatan", portName: "Roatan", bestFor: "Reef value", bestExcursion: "West Bay snorkel", beachQuality: "Excellent", snorkelling: "Excellent", families: "Very strong", privateTours: "Excellent", easeFromShip: "Very easy" },
      { portSlug: "grand-cayman", portName: "Grand Cayman", bestFor: "Stingrays", bestExcursion: "Stingray City", beachQuality: "Excellent", snorkelling: "Very good", families: "Excellent", privateTours: "Excellent", easeFromShip: "Tender port" },
      { portSlug: "costa-maya", portName: "Costa Maya", bestFor: "Ruins pace", bestExcursion: "Chacchoben combo", beachQuality: "Good", snorkelling: "Moderate", families: "Strong", privateTours: "Good", easeFromShip: "Excellent" },
      { portSlug: "ocho-rios", portName: "Ocho Rios", bestFor: "Waterfalls", bestExcursion: "Dunn's River Falls", beachQuality: "Good add-on", snorkelling: "Moderate", families: "Strong", privateTours: "Very good", easeFromShip: "Good pier" },
      { portSlug: "puerto-limon", portName: "Puerto Limón", bestFor: "Rainforest wildlife", bestExcursion: "Sloth sanctuary tour", beachQuality: "Good Cahuita", snorkelling: "Moderate", families: "Very strong", privateTours: "Very good", easeFromShip: "Easy pier" },
      { portSlug: "progreso", portName: "Progreso", bestFor: "Mérida culture", bestExcursion: "Mérida colonial tour", beachQuality: "Moderate Gulf", snorkelling: "Limited", families: "Very good", privateTours: "Excellent", easeFromShip: "Long pier shuttle" },
      { portSlug: "falmouth", portName: "Falmouth", bestFor: "River scenery", bestExcursion: "Martha Brae rafting", beachQuality: "Good resort", snorkelling: "Moderate", families: "Strong", privateTours: "Excellent", easeFromShip: "Good pier" },
      { portSlug: "montego-bay", portName: "Montego Bay", bestFor: "Resort beaches", bestExcursion: "Doctor's Cave Beach", beachQuality: "Excellent Hip Strip", snorkelling: "Moderate", families: "Very strong", privateTours: "Very good", easeFromShip: "Easy pier" },
    ],
    dayPlans: [
      { portSlug: "cozumel", easyDay: "Chankanaab lagoon day.", adventureDay: "Tulum and reef combo.", beachDay: "Beach club with lunch.", privateTourDay: "Private reef two-stop boat." },
      { portSlug: "roatan", easyDay: "West Bay taxi day.", adventureDay: "Gumbalimba and reef.", beachDay: "West Bay full afternoon.", privateTourDay: "Private driver and snorkel." },
      { portSlug: "grand-cayman", easyDay: "Morning stingray sandbar.", adventureDay: "Stingray plus reef sail.", beachDay: "Seven Mile organized break.", privateTourDay: "Private stingray charter." },
      { portSlug: "costa-maya", easyDay: "Village pool day.", adventureDay: "Chacchoben ruins morning.", beachDay: "Mahahual club loungers.", privateTourDay: "Small-group ruin tour." },
      { portSlug: "ocho-rios", easyDay: "Short beach club recovery.", adventureDay: "Early Dunn's River climb.", beachDay: "Beach after scenic stop.", privateTourDay: "Private falls first slot." },
      { portSlug: "puerto-limon", easyDay: "Sloth sanctuary morning tour.", adventureDay: "Veragua tram and zip-line.", beachDay: "Cahuita snorkel and beach.", privateTourDay: "Private wildlife and coast tour." },
      { portSlug: "progreso", easyDay: "Mérida plaza walk with cathedral stops.", adventureDay: "Early Uxmal ruins departure.", beachDay: "Progreso malecón beach break.", privateTourDay: "Private Mérida or Celestún tour." },
      { portSlug: "falmouth", easyDay: "Martha Brae raft and heritage walk.", adventureDay: "River rafting with culture afternoon.", beachDay: "Resort beach transfer.", privateTourDay: "Private beach and river combo." },
      { portSlug: "montego-bay", easyDay: "Doctor's Cave Beach and Hip Strip lunch.", adventureDay: "Rose Hall Great House tour.", beachDay: "Resort beach day pass.", privateTourDay: "Private MoBay highlights loop." },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "cozumel", excursionName: "Chankanaab Park", description: "Secure lagoon and beach near pier.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "grand-cayman", excursionName: "Private stingray boat", description: "Early sandbar with smaller groups.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "roatan", excursionName: "West Bay beach", description: "Simple high-quality reef beach day.", guideHref: "/ports/roatan" },
      { travellerType: "Active travellers", portSlug: "ocho-rios", excursionName: "Dunn's River Falls", description: "Signature Jamaica climb experience.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "roatan", excursionName: "West Bay white sand", description: "Top value beach in the Western Caribbean.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "grand-cayman", excursionName: "Stingray City", description: "Unique shallow sandbar wildlife encounter.", guideHref: "/best-caribbean-wildlife-excursions" },
      { travellerType: "First-time cruisers", portSlug: "progreso", excursionName: "Mérida colonial tour", description: "Yucatán culture port distinct from reef-focused Cozumel.", guideHref: "/ports/progreso" },
      { travellerType: "Couples", portSlug: "falmouth", excursionName: "Martha Brae rafting", description: "Slow-paced scenic river through jungle channels.", guideHref: "/ports/falmouth" },
      { travellerType: "Beach lovers", portSlug: "montego-bay", excursionName: "Doctor's Cave Beach", description: "Classic MoBay swim beach with Hip Strip facilities.", guideHref: "/best-caribbean-beach-excursions" },
    ],
    comparisonSlugs: [
      "roatan-vs-cozumel",
      "cozumel-vs-costa-maya",
      "cozumel-vs-progreso",
      "costa-maya-vs-progreso",
      "ocho-rios-vs-falmouth",
      "ocho-rios-vs-montego-bay",
      "falmouth-vs-montego-bay",
      "grand-cayman-vs-nassau",
    ],
    bestGuideSlugs: [...sharedBestGuides, "best-caribbean-wildlife-excursions"],
    nextStepCta:
      "Assign each Western Caribbean port a distinct role (reef, wildlife, ruins, or falls), verify ship schedules, then compare specialists before peak port days sell out.",
  },
  {
    slug: "southern-caribbean-cruise-planner",
    portSlugs: ["aruba", "curacao", "st-maarten", "bonaire"],
    portCardNotes: {
      aruba: { shortDescription: "Hurricane-belt escape with Eagle Beach reliability.", topExcursionType: "Beach & sail" },
      curacao: { shortDescription: "Dutch Caribbean culture and superior cove snorkelling.", topExcursionType: "Culture & dive" },
      "st-maarten": { shortDescription: "Southern loop stop with Orient Bay and Philipsburg energy.", topExcursionType: "Beach club" },
      bonaire: { shortDescription: "Marine park shore reefs and flamingo wildlife outside the hurricane belt.", topExcursionType: "Reef & wildlife" },
    },
    comparisonTable: [
      { portSlug: "aruba", portName: "Aruba", bestFor: "Sun reliability", bestExcursion: "Eagle Beach catamaran", beachQuality: "Excellent", snorkelling: "Good", families: "Excellent", privateTours: "Excellent", easeFromShip: "Very easy" },
      { portSlug: "curacao", portName: "Curacao", bestFor: "Culture and reefs", bestExcursion: "Willemstad and cove snorkel", beachQuality: "Good coves", snorkelling: "Excellent", families: "Strong", privateTours: "Very good", easeFromShip: "Easy" },
      { portSlug: "st-maarten", portName: "St. Maarten", bestFor: "Lively beach clubs", bestExcursion: "Orient Bay day", beachQuality: "Very good", snorkelling: "Good", families: "Strong", privateTours: "Very good", easeFromShip: "Easy" },
      { portSlug: "bonaire", portName: "Bonaire", bestFor: "Marine park reefs", bestExcursion: "Shore reef snorkel", beachQuality: "Reef-entry", snorkelling: "Excellent", families: "Good", privateTours: "Excellent", easeFromShip: "Very easy" },
    ],
    dayPlans: [
      { portSlug: "aruba", easyDay: "Eagle Beach and downtown browse.", adventureDay: "Arikok 4x4 north coast.", beachDay: "Full Eagle or Palm Beach club.", privateTourDay: "Private island SUV tour." },
      { portSlug: "curacao", easyDay: "Willemstad walking morning.", adventureDay: "Park hike and cove snorkel.", beachDay: "Grote Knip afternoon.", privateTourDay: "Private town and reef combo." },
      { portSlug: "st-maarten", easyDay: "Philipsburg and short beach.", adventureDay: "Maho and Orient Bay.", beachDay: "Orient Bay club lunch.", privateTourDay: "Dual-nation private driver." },
      { portSlug: "bonaire", easyDay: "Guided reef snorkel and Kralendijk walk.", adventureDay: "Washington Slagbaai park safari.", beachDay: "Shore reef entry with water shoes.", privateTourDay: "Private reef charter or flamingo tour." },
    ],
    travellerPicks: [
      { travellerType: "Families", portSlug: "aruba", excursionName: "De Palm Island", description: "All-inclusive island day with water park.", guideHref: "/best-caribbean-family-excursions" },
      { travellerType: "Couples", portSlug: "aruba", excursionName: "Sunset catamaran", description: "Reliable evening sailing outside hurricane belt.", guideHref: "/best-caribbean-couple-excursions" },
      { travellerType: "First-time cruisers", portSlug: "aruba", excursionName: "Eagle Beach transfer", description: "Low-stress Southern Caribbean beach day.", guideHref: "/ports/aruba" },
      { travellerType: "Active travellers", portSlug: "curacao", excursionName: "Off-road and snorkel combo", description: "Culture plus reef in one paced day.", guideHref: "/excursion-types/adventure-tours" },
      { travellerType: "Beach lovers", portSlug: "aruba", excursionName: "Eagle Beach morning", description: "Wide sand with trade-wind cooling.", guideHref: "/best-caribbean-beach-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "curacao", excursionName: "West-coast reef snorkel", description: "Protected coves with healthy coral.", guideHref: "/best-caribbean-snorkeling-excursions" },
      { travellerType: "Wildlife/nature lovers", portSlug: "bonaire", excursionName: "Marine park shore snorkel", description: "Caribbean's healthiest accessible reefs with flamingo lagoon add-ons.", guideHref: "/best-caribbean-snorkeling-excursions" },
    ],
    comparisonSlugs: ["aruba-vs-curacao", "aruba-vs-bonaire", "bonaire-vs-curacao"],
    bestGuideSlugs: [...sharedBestGuides, "best-caribbean-couple-excursions"],
    nextStepCta:
      "Balance Aruba beach reliability with Curacao culture on Southern routes, check schedules, then compare shore excursions before winter peak weeks fill up.",
  },
];

export function getTopicCluster(slug: string): TopicClusterData | undefined {
  return topicClusters.find((cluster) => cluster.slug === slug);
}

export function getClustersForPort(portSlug: string): TopicClusterData[] {
  return topicClusters.filter((cluster) => cluster.portSlugs.includes(portSlug));
}

export function getPrimaryClusterForPort(portSlug: string): TopicClusterData | undefined {
  const clusters = getClustersForPort(portSlug);
  return clusters.sort((a, b) => a.portSlugs.length - b.portSlugs.length)[0];
}

export function getClusterPageTitle(slug: string): string {
  return (
    getRegionalCruisePlannerBySlug(slug)?.title ??
    getItineraryPlannerBySlug(slug)?.title ??
    slug
  );
}

export function getClusterLinksForComparison(comparisonSlug: string): { slug: string; title: string }[] {
  return topicClusters
    .filter((cluster) => cluster.comparisonSlugs.includes(comparisonSlug))
    .map((cluster) => ({
      slug: cluster.slug,
      title: getClusterPageTitle(cluster.slug),
    }));
}
