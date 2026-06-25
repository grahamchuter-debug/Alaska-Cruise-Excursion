import type { ShipRecommendation } from "./types";

export interface ShipSectionData {
  familyRecommendations: ShipRecommendation[];
  beachRecommendations: ShipRecommendation[];
  snorkellingRecommendations: ShipRecommendation[];
  privateTourRecommendations: ShipRecommendation[];
  relatedShipSlugs: string[];
}

type SectionInput = Omit<ShipSectionData, "relatedShipSlugs"> & { relatedShipSlugs: string[] };

function sections(data: SectionInput): ShipSectionData {
  return data;
}

export const shipSectionData: Record<string, ShipSectionData> = {
  "icon-of-the-seas": sections({
    relatedShipSlugs: ["star-of-the-seas", "wonder-of-the-seas", "symphony-of-the-seas", "utopia-of-the-seas"],
    familyRecommendations: [
      { title: "Chankanaab Beach Park", portSlug: "cozumel", advice: "All-in-one lagoon, beach, and dolphin programs within a short taxi of Icon's Cozumel piers." },
      { title: "Blue Lagoon Island day", portSlug: "nassau", advice: "Controlled shallow beach with optional dolphin encounters, ideal for mixed-age groups on Nassau calls." },
      { title: "Coral World Ocean Park", portSlug: "st-thomas", advice: "Touch tanks and underwater observatory without long boat transfers from Havensight." },
    ],
    beachRecommendations: [
      { title: "Magens Bay full morning", portSlug: "st-thomas", advice: "Icon passengers rank Magens Bay highest for calm swimming on Eastern Caribbean weeks." },
      { title: "Eagle Beach catamaran combo", portSlug: "aruba", advice: "Trade-wind sailing paired with wide white sand on Southern Caribbean select sailings." },
      { title: "West Bay reef beach day", portSlug: "roatan", advice: "Snorkel directly off the sand with short Mahogany Bay transfers on Western routes." },
    ],
    snorkellingRecommendations: [
      { title: "El Cielo and Palancar two-stop", portSlug: "cozumel", advice: "Book first departure when multiple megaships share Cozumel to beat reef crowding." },
      { title: "Sapphire Beach reef morning", portSlug: "st-thomas", advice: "Quick reef access from Red Hook with optional St. John ferry extension on longer calls." },
      { title: "West End reef snorkel", portSlug: "roatan", advice: "Fewer boats than Cozumel with healthy coral close to the cruise pier." },
    ],
    privateTourRecommendations: [
      { title: "Private El Cielo catamaran", portSlug: "cozumel", advice: "Custom sandbar and reef timing away from Oasis-class group boats." },
      { title: "Private St. Thomas island taxi", portSlug: "st-thomas", advice: "Magens Bay, Mountain Top, and Red Hook on your schedule with a dedicated driver." },
      { title: "Private Arikok north-coast 4x4", portSlug: "aruba", advice: "Natural Pool and lighthouse viewpoints with flexible stop lengths." },
    ],
  }),
  "star-of-the-seas": sections({
    relatedShipSlugs: ["icon-of-the-seas", "wonder-of-the-seas", "symphony-of-the-seas", "utopia-of-the-seas"],
    familyRecommendations: [
      { title: "De Palm Island pass", portSlug: "aruba", advice: "Water park and snorkel areas in one controlled setting on Southern weeks." },
      { title: "Mr. Sanchos beach club", portSlug: "cozumel", advice: "Pool, beach, and lunch packages with predictable pier-return shuttles." },
      { title: "Magens Bay with facilities", portSlug: "st-thomas", advice: "Chair rentals and calm water suit school-age children on busy Eastern calls." },
    ],
    beachRecommendations: [
      { title: "Orient Bay beach club", portSlug: "st-maarten", advice: "French-side loungers and lunch on Star's Eastern Caribbean rotations." },
      { title: "Eagle Beach morning transfer", portSlug: "aruba", advice: "Reliable wide sand outside hurricane season on Southern sailings." },
      { title: "Tabyana Beach break", portSlug: "roatan", advice: "Quieter alternative to West Bay when Mahogany Bay feels crowded." },
    ],
    snorkellingRecommendations: [
      { title: "Palancar reef sail", portSlug: "cozumel", advice: "Star's Western weeks sell out reef boats fastest; reserve before embarkation." },
      { title: "Tintamarre catamaran", portSlug: "st-maarten", advice: "Uninhabited islet snorkel sail off the Dutch coast." },
      { title: "Gumbalimba reef add-on", portSlug: "roatan", advice: "Pair wildlife park morning with afternoon reef time at West Bay." },
    ],
    privateTourRecommendations: [
      { title: "Private Tulum and reef combo", portSlug: "cozumel", advice: "Mainland ruins morning with afternoon snorkel on a custom timeline." },
      { title: "Private Orient Bay driver", portSlug: "st-maarten", advice: "Split Philipsburg shopping and French-side beach on flexible timing." },
      { title: "Private West Bay snorkel boat", portSlug: "roatan", advice: "Small-group reef stops with departure matched to Star's port hours." },
    ],
  }),
  "wonder-of-the-seas": sections({
    relatedShipSlugs: ["symphony-of-the-seas", "icon-of-the-seas", "star-of-the-seas", "utopia-of-the-seas"],
    familyRecommendations: [
      { title: "Atlantis Aquaventure", portSlug: "nassau", advice: "Full waterpark day when Wonder's Nassau window supports six-plus hours ashore." },
      { title: "Dolphin Cove lagoon", portSlug: "cozumel", advice: "Beach and dolphin programs without mainland ferry complexity." },
      { title: "Stingray City family boat", portSlug: "grand-cayman", advice: "Shallow sandbar wildlife suited to school-age children on tender days." },
    ],
    beachRecommendations: [
      { title: "Seven Mile Beach break", portSlug: "grand-cayman", advice: "Organized tender-aware transport protects return timing on Wonder's Cayman calls." },
      { title: "Eagle Beach afternoon", portSlug: "aruba", advice: "Wide sand with trade-wind cooling on Southern Caribbean extensions." },
      { title: "Magens Bay with chairs", portSlug: "st-thomas", advice: "Wonder's most-booked beach day on Eastern Caribbean loops." },
    ],
    snorkellingRecommendations: [
      { title: "Stingray City plus reef", portSlug: "grand-cayman", advice: "Morning sandbar visit paired with Cemetery Reef on two-stop wildlife tours." },
      { title: "Sapphire Beach reef", portSlug: "st-thomas", advice: "Strong snorkel potential without committing to a full St. John transfer day." },
      { title: "Columbia Deep snorkel", portSlug: "cozumel", advice: "Healthy reef fish and rays on Wonder's Western Caribbean reef days." },
    ],
    privateTourRecommendations: [
      { title: "Private stingray charter", portSlug: "grand-cayman", advice: "Early sandbar visit before group boats arrive on tender port days." },
      { title: "Private island highlights taxi", portSlug: "st-thomas", advice: "Custom Magens Bay and overlook pacing for mixed-interest groups." },
      { title: "Private Aruba SUV loop", portSlug: "aruba", advice: "California Lighthouse, north coast, and final beach stop on your schedule." },
    ],
  }),
  "utopia-of-the-seas": sections({
    relatedShipSlugs: ["icon-of-the-seas", "wonder-of-the-seas", "symphony-of-the-seas", "star-of-the-seas"],
    familyRecommendations: [
      { title: "Atlantis half-day pass", portSlug: "nassau", advice: "Choose slide-focused packages when Utopia's Nassau call is under eight hours." },
      { title: "Rose Island catamaran", portSlug: "nassau", advice: "Compact reef sail suited to short Bahamas port windows." },
      { title: "Chankanaab lagoon day", portSlug: "cozumel", advice: "Snorkel and beach close to the pier on Western sampler sailings." },
    ],
    beachRecommendations: [
      { title: "Cable Beach quick transfer", portSlug: "nassau", advice: "Shorter beach day when Perfect Day or tight Nassau timing limits options." },
      { title: "Paradise Island beach pass", portSlug: "nassau", advice: "Pools plus beach within a short boat ride on full Nassau calls." },
      { title: "Mr. Sanchos day club", portSlug: "cozumel", advice: "All-inclusive beach club with ferry-return timing built in." },
    ],
    snorkellingRecommendations: [
      { title: "Rose Island reef snorkel", portSlug: "nassau", advice: "Half-day format preserves return buffer on 3-4 night sailings." },
      { title: "Chankanaab lagoon snorkel", portSlug: "cozumel", advice: "Protected lagoon entry ideal for first-time snorkelers." },
      { title: "Palancar express sail", portSlug: "cozumel", advice: "Single-reef stop when your Cozumel window is under five hours." },
    ],
    privateTourRecommendations: [
      { title: "Private Nassau coastal driver", portSlug: "nassau", advice: "Flexible viewpoints and beach stops on short-call schedules." },
      { title: "Private Cozumel reef boat", portSlug: "cozumel", advice: "One or two reef stops timed to Utopia's tighter Western port hours." },
      { title: "Private downtown and beach sampler", portSlug: "nassau", advice: "Low-logistics introduction when this is your first Bahamas port day." },
    ],
  }),
  "symphony-of-the-seas": sections({
    relatedShipSlugs: ["wonder-of-the-seas", "icon-of-the-seas", "star-of-the-seas", "utopia-of-the-seas"],
    familyRecommendations: [
      { title: "Perfect Day alternative: Nassau Atlantis", portSlug: "nassau", advice: "When Symphony skips private island days, Atlantis delivers similar family energy." },
      { title: "Chankanaab all-ages day", portSlug: "cozumel", advice: "Secure lagoon environment near Symphony's Cozumel piers." },
      { title: "Magens Bay family default", portSlug: "st-thomas", advice: "Calm horseshoe bay remains Symphony's easiest Eastern family beach." },
    ],
    beachRecommendations: [
      { title: "Magens Bay morning", portSlug: "st-thomas", advice: "Start early on multi-ship St. Thomas days for chair availability." },
      { title: "Orient Bay club day", portSlug: "st-maarten", advice: "French-side facilities on Symphony's dual-nation port calls." },
      { title: "West Bay white sand", portSlug: "roatan", advice: "High-value beach day on Western Caribbean Symphony weeks." },
    ],
    snorkellingRecommendations: [
      { title: "Palancar two-stop sail", portSlug: "cozumel", advice: "Symphony's signature Western reef experience; book before holiday sailings." },
      { title: "Sapphire Beach morning snorkel", portSlug: "st-thomas", advice: "Reef access without St. John ferry complexity." },
      { title: "West Bay off-the-beach snorkel", portSlug: "roatan", advice: "Healthy coral with fewer boats than peak Cozumel mornings." },
    ],
    privateTourRecommendations: [
      { title: "Private Cozumel reef charter", portSlug: "cozumel", advice: "Avoid Oasis-class group boat crowding with custom departure times." },
      { title: "Private St. Maarten split day", portSlug: "st-maarten", advice: "Maho spotting and Orient Bay on a dedicated driver schedule." },
      { title: "Private Roatan West Bay loop", portSlug: "roatan", advice: "Taxi and snorkel boat combo with flexible Mahogany Bay return." },
    ],
  }),
  "mardi-gras": sections({
    relatedShipSlugs: ["celebration", "jubilee"],
    familyRecommendations: [
      { title: "Damajagua gentler route", portSlug: "puerto-plata", advice: "Waterfall adventure with guide supervision when younger children join the climb." },
      { title: "Chankanaab family day", portSlug: "cozumel", advice: "Controlled snorkel lagoon and beach on Mardi Gras Western weeks." },
      { title: "Stingray sandbar family boat", portSlug: "grand-cayman", advice: "Shallow wildlife encounter; book first tender slot on busy days." },
    ],
    beachRecommendations: [
      { title: "Half Moon Cay ship day", portSlug: "nassau", advice: "Use Nassau independent beach tours only on dedicated port calls, not private island days." },
      { title: "Mahahual beach club", portSlug: "costa-maya", advice: "Relaxed loungers after a disciplined Chacchoben ruins morning." },
      { title: "Seven Mile organized break", portSlug: "grand-cayman", advice: "Tender-aware transport with lunch included on Mardi Gras Cayman calls." },
    ],
    snorkellingRecommendations: [
      { title: "Cozumel reef snorkel sail", portSlug: "cozumel", advice: "Carnival passengers save by booking Palancar sails through local specialists." },
      { title: "Stingray plus reef combo", portSlug: "grand-cayman", advice: "Two-stop wildlife morning before afternoon beach recovery." },
      { title: "Roatan West Bay reef", portSlug: "roatan", advice: "Strong value reef day when Mardi Gras adds Western Caribbean ports." },
    ],
    privateTourRecommendations: [
      { title: "Private Amber Cove driver", portSlug: "puerto-plata", advice: "Custom Teleférico, waterfall, or beach pacing for Dominican calls." },
      { title: "Private Cozumel two-stop boat", portSlug: "cozumel", advice: "Smaller groups with pier pickup and guaranteed return." },
      { title: "Private Grand Cayman stingray charter", portSlug: "grand-cayman", advice: "Early departure before Carnival group boats fill the sandbar." },
    ],
  }),
  celebration: sections({
    relatedShipSlugs: ["mardi-gras", "jubilee"],
    familyRecommendations: [
      { title: "Amber Cove port facilities", portSlug: "puerto-plata", advice: "Low-stress pools and zip-line when you want a shorter Dominican transfer day." },
      { title: "Atlantis Aquaventure", portSlug: "nassau", advice: "Reserve early when Celebration shares Nassau with other Carnival megaships." },
      { title: "De Palm Island style beach club", portSlug: "cozumel", advice: "All-inclusive water play near Celebration's Western Caribbean calls." },
    ],
    beachRecommendations: [
      { title: "Orient Bay French-side club", portSlug: "st-maarten", advice: "Celebration's top Eastern beach day with lunch service and loungers." },
      { title: "Cable Beach Nassau break", portSlug: "nassau", advice: "Calmer urban beach profile than downtown Junkanoo spots." },
      { title: "Mr. Sanchos Cozumel", portSlug: "cozumel", advice: "Predictable facilities with organized pier shuttles." },
    ],
    snorkellingRecommendations: [
      { title: "Palancar marine park sail", portSlug: "cozumel", advice: "Celebration Western weeks: first boat out reduces reef traffic." },
      { title: "Rose Island catamaran", portSlug: "nassau", advice: "Outer-reef snorkel away from downtown cruise crowds." },
      { title: "Sapphire Beach reef", portSlug: "st-thomas", advice: "Quick snorkel add-on when Celebration calls St. Thomas on Eastern routes." },
    ],
    privateTourRecommendations: [
      { title: "Private Dominican countryside tour", portSlug: "puerto-plata", advice: "Waterfall, viewpoint, and beach on flexible Celebration port timing." },
      { title: "Private Nassau island charter", portSlug: "nassau", advice: "Rose Island or similar cay with custom departure." },
      { title: "Private St. Maarten dual-nation driver", portSlug: "st-maarten", advice: "Philipsburg and Orient Bay without fixed large-group pacing." },
    ],
  }),
  jubilee: sections({
    relatedShipSlugs: ["mardi-gras", "celebration"],
    familyRecommendations: [
      { title: "Gumbalimba Park wildlife day", portSlug: "roatan", advice: "Zip-lines, animals, and beach combo from Mahogany Bay on Jubilee Western weeks." },
      { title: "Chankanaab lagoon", portSlug: "cozumel", advice: "Texas-departure passengers often rank Cozumel as Jubilee's best family port." },
      { title: "Costa Maya village pools", portSlug: "costa-maya", advice: "Low-transfer family day when you skip inland ruin coaches." },
    ],
    beachRecommendations: [
      { title: "West Bay full day", portSlug: "roatan", advice: "Jubilee's signature white-sand day from Galveston Western routes." },
      { title: "Mahahual beach club", portSlug: "costa-maya", advice: "Village pier walk to loungers without Cozumel-level crowds." },
      { title: "Mr. Sanchos beach club", portSlug: "cozumel", advice: "All-inclusive day with built-in return shuttles." },
    ],
    snorkellingRecommendations: [
      { title: "West Bay off-the-sand snorkel", portSlug: "roatan", advice: "Best reef value on Jubilee's Western Caribbean programming." },
      { title: "Palancar two-stop reef", portSlug: "cozumel", advice: "Book independently for better pricing than peak Carnival group rates." },
      { title: "Chankanaab lagoon snorkel", portSlug: "cozumel", advice: "Protected entry for first-time snorkelers close to the pier." },
    ],
    privateTourRecommendations: [
      { title: "Private Roatan driver and snorkel", portSlug: "roatan", advice: "West Bay taxi plus custom reef boat departure from Galveston weeks." },
      { title: "Private Chacchoben and beach", portSlug: "costa-maya", advice: "Ruins morning with single disciplined beach extension." },
      { title: "Private Cozumel El Cielo sail", portSlug: "cozumel", advice: "Sandbar and reef on Jubilee's longer Cozumel port days." },
    ],
  }),
  prima: sections({
    relatedShipSlugs: ["viva", "aqua"],
    familyRecommendations: [
      { title: "Coral World Ocean Park", portSlug: "st-thomas", advice: "NCL freestyle timing pairs well with a morning Coral World visit before beach time." },
      { title: "Chankanaab family lagoon", portSlug: "cozumel", advice: "Secure snorkel and beach environment on Prima Western weeks." },
      { title: "Great Stirrup Cay ship day", portSlug: "nassau", advice: "Plan independent Nassau tours only on standard port calls, not private island stops." },
    ],
    beachRecommendations: [
      { title: "Magens Bay relaxed morning", portSlug: "st-thomas", advice: "Prima Eastern Caribbean passengers favor Magens for calm swimming." },
      { title: "Orient Bay cabana day", portSlug: "st-maarten", advice: "French-side beach club with lunch on freestyle-schedule port days." },
      { title: "West Bay beach break", portSlug: "roatan", advice: "Strong value sand day on Prima Western reef routes." },
    ],
    snorkellingRecommendations: [
      { title: "Salsa Salsa beach snorkel", portSlug: "cozumel", advice: "Popular NCL-format snorkel and culture combo on Cozumel calls." },
      { title: "Catamaran to St. John waters", portSlug: "st-thomas", advice: "Sail-and-snorkel day when Prima's St. Thomas call is long enough." },
      { title: "West End reef snorkel", portSlug: "roatan", advice: "Healthy coral with smaller groups than peak Cozumel mornings." },
    ],
    privateTourRecommendations: [
      { title: "Private St. Maarten island drive", portSlug: "st-maarten", advice: "Maho plane spotting and Orient Bay on custom NCL-friendly timing." },
      { title: "Private Cozumel reef boat", portSlug: "cozumel", advice: "Freestyle dining ashore works best with afternoon-return private charters." },
      { title: "Private Magens and overlook taxi", portSlug: "st-thomas", advice: "Dedicated driver for mixed beach and photo stops." },
    ],
  }),
  viva: sections({
    relatedShipSlugs: ["prima", "aqua"],
    familyRecommendations: [
      { title: "Dolphin Cove Cozumel", portSlug: "cozumel", advice: "Beach lagoon programs without mainland ferry time on Viva Western sailings." },
      { title: "Blue Lagoon Nassau", portSlug: "nassau", advice: "Shallow-water beach day with optional dolphin add-ons." },
      { title: "Gumbalimba wildlife park", portSlug: "roatan", advice: "Rainforest animals and zip-lines near Mahogany Bay." },
    ],
    beachRecommendations: [
      { title: "Orient Bay loungers", portSlug: "st-maarten", advice: "Viva's top French-side beach day on Eastern Caribbean loops." },
      { title: "Eagle Beach transfer", portSlug: "aruba", advice: "Reliable wide sand when Viva includes Southern Caribbean ports." },
      { title: "Cable Beach Nassau", portSlug: "nassau", advice: "Flexible beach time paired with short downtown browsing." },
    ],
    snorkellingRecommendations: [
      { title: "Palancar reef snorkel sail", portSlug: "cozumel", advice: "Viva mirrors Prima-class demand; reserve reef boats early." },
      { title: "Sapphire Beach reef", portSlug: "st-thomas", advice: "Accessible reef without full St. John commitment." },
      { title: "West Bay snorkel off sand", portSlug: "roatan", advice: "Excellent value on Viva's Western Caribbean deployments." },
    ],
    privateTourRecommendations: [
      { title: "Private Orient Bay and Philipsburg", portSlug: "st-maarten", advice: "Dual-nation pacing without fixed tour-bus schedules." },
      { title: "Private Nassau Rose Island charter", portSlug: "nassau", advice: "Outer cay snorkel with flexible freestyle return timing." },
      { title: "Private Roatan West Bay driver", portSlug: "roatan", advice: "Custom beach and snorkel stop lengths for small groups." },
    ],
  }),
  aqua: sections({
    relatedShipSlugs: ["prima", "viva"],
    familyRecommendations: [
      { title: "Chankanaab Park day pass", portSlug: "cozumel", advice: "Aqua's newest NCL capacity means Cozumel sells out fastest; book early." },
      { title: "Coral World touch pools", portSlug: "st-thomas", advice: "Short transfer from pier with educational exhibits for children." },
      { title: "Costa Maya village family day", portSlug: "costa-maya", advice: "Pools and beach walk without long coach transfers." },
    ],
    beachRecommendations: [
      { title: "Magens Bay chairs and swim", portSlug: "st-thomas", advice: "Aqua Eastern routes: classic calm bay with facilities." },
      { title: "Mahahual beach club", portSlug: "costa-maya", advice: "Low-stress white sand from the cruise village pier." },
      { title: "Paradise Island beach pass", portSlug: "nassau", advice: "Resort-style beach when Aqua includes Bahamas calls." },
    ],
    snorkellingRecommendations: [
      { title: "El Cielo sandbar sail", portSlug: "cozumel", advice: "Signature southern Cozumel snorkel route on Aqua Western weeks." },
      { title: "St. John ferry snorkel trail", portSlug: "st-thomas", advice: "National Park underwater trail when port time allows ferry margin." },
      { title: "Roatan reef boat morning", portSlug: "roatan", advice: "Calmer reefs before afternoon heat and group boat peak." },
    ],
    privateTourRecommendations: [
      { title: "Private Cozumel culture and reef", portSlug: "cozumel", advice: "Downtown tasting stop plus afternoon private snorkel boat." },
      { title: "Private St. Thomas Magens taxi", portSlug: "st-thomas", advice: "Freestyle-friendly custom pacing for couples and families." },
      { title: "Private Chacchoben small group", portSlug: "costa-maya", advice: "Mayan ruins with optional private beach extension." },
    ],
  }),
  "world-america": sections({
    relatedShipSlugs: ["msc-seascape", "msc-seashore"],
    familyRecommendations: [
      { title: "Ocean Cay ship-focused day", portSlug: "nassau", advice: "Reserve independent Nassau tours for standard port calls only." },
      { title: "Chankanaab lagoon", portSlug: "cozumel", advice: "MSC Western weeks: secure family snorkel near the pier." },
      { title: "Teleférico cable car", portSlug: "puerto-plata", advice: "Scenic Dominican ride popular with school-age children." },
    ],
    beachRecommendations: [
      { title: "Cable Beach Nassau combo", portSlug: "nassau", advice: "Flexible beach and downtown pairing on World America Nassau calls." },
      { title: "Mahahual loungers", portSlug: "costa-maya", advice: "Village beach clubs without Cozumel ferry complexity." },
      { title: "Orient Bay afternoon", portSlug: "st-maarten", advice: "French-side beach when World America runs Eastern routes." },
    ],
    snorkellingRecommendations: [
      { title: "Palancar two-stop snorkel", portSlug: "cozumel", advice: "MSC passengers often find strong independent pricing on Cozumel reef boats." },
      { title: "Roatan West Bay reef", portSlug: "roatan", advice: "Value reef day when World America includes Western Caribbean ports." },
      { title: "Curacao Blue Bay snorkel", portSlug: "curacao", advice: "Protected bay entry on select Southern/Eastern MSC rotations." },
    ],
    privateTourRecommendations: [
      { title: "Private Cozumel reef charter", portSlug: "cozumel", advice: "Custom reef stops with MSC pier pickup guarantees." },
      { title: "Private Puerto Plata driver", portSlug: "puerto-plata", advice: "Waterfall, Teleférico, or beach on flexible timing." },
      { title: "Private St. Maarten panoramic tour", portSlug: "st-maarten", advice: "Dutch and French highlights with custom beach stop." },
    ],
  }),
  "msc-seascape": sections({
    relatedShipSlugs: ["world-america", "msc-seashore"],
    familyRecommendations: [
      { title: "Gumbalimba wildlife", portSlug: "roatan", advice: "Zip-line and animal encounters on Seascape Western Caribbean weeks from Galveston." },
      { title: "Costa Maya village pools", portSlug: "costa-maya", advice: "Short pier walk to facilities when you skip ruin coaches." },
      { title: "Chankanaab family day", portSlug: "cozumel", advice: "All-ages lagoon and beach on Seascape Miami and Galveston routes." },
    ],
    beachRecommendations: [
      { title: "West Bay full afternoon", portSlug: "roatan", advice: "Seascape's best-value sand day on Western loops." },
      { title: "Mahahual beach club", portSlug: "costa-maya", advice: "Relaxed loungers after a short village stroll." },
      { title: "Ocean Cay alternative: Nassau beach", portSlug: "nassau", advice: "Independent beach day on non-private-island calls." },
    ],
    snorkellingRecommendations: [
      { title: "West Bay off-the-beach snorkel", portSlug: "roatan", advice: "Top reef value port on Seascape Western programming." },
      { title: "Palancar reef sail", portSlug: "cozumel", advice: "Book through specialists for competitive MSC-week pricing." },
      { title: "Chankanaab lagoon snorkel", portSlug: "cozumel", advice: "Protected entry ideal for beginner snorkelers." },
    ],
    privateTourRecommendations: [
      { title: "Private Roatan snorkel charter", portSlug: "roatan", advice: "Small-boat reef stops with Mahogany Bay pickup." },
      { title: "Private Chacchoben ruins tour", portSlug: "costa-maya", advice: "Single-anchor culture day with strict return checkpoint." },
      { title: "Private Cozumel beach club transfer", portSlug: "cozumel", advice: "Custom club choice with pier-return shuttle timing." },
    ],
  }),
  "msc-seashore": sections({
    relatedShipSlugs: ["world-america", "msc-seascape"],
    familyRecommendations: [
      { title: "Damajagua waterfall adventure", portSlug: "puerto-plata", advice: "Active Dominican day when Seashore calls Amber Cove or Puerto Plata." },
      { title: "Chankanaab Park", portSlug: "cozumel", advice: "Family lagoon day on Seashore Western Caribbean rotations." },
      { title: "Cable Beach Nassau", portSlug: "nassau", advice: "Controlled beach environment on Eastern MSC weeks." },
    ],
    beachRecommendations: [
      { title: "Orient Bay club lunch", portSlug: "st-maarten", advice: "French-side beach day on Seashore Eastern routes from Port Canaveral." },
      { title: "Mahahual village beach", portSlug: "costa-maya", advice: "Low-transfer beach club from the cruise pier." },
      { title: "Eagle Beach taxi day", portSlug: "aruba", advice: "Wide sand on select Southern Caribbean Seashore sailings." },
    ],
    snorkellingRecommendations: [
      { title: "Cozumel marine park sail", portSlug: "cozumel", advice: "Seashore sells out morning reef boats on holiday weeks." },
      { title: "Curacao west-coast coves", portSlug: "curacao", advice: "Healthy reef on MSC Southern Caribbean extensions." },
      { title: "St. Maarten catamaran snorkel", portSlug: "st-maarten", advice: "Boat-based reef access on Eastern deployments." },
    ],
    privateTourRecommendations: [
      { title: "Private Willemstad and cove combo", portSlug: "curacao", advice: "Culture morning plus west-coast snorkel on Southern weeks." },
      { title: "Private Puerto Plata countryside", portSlug: "puerto-plata", advice: "Custom waterfall or Teleférico pacing." },
      { title: "Private Cozumel two-reef boat", portSlug: "cozumel", advice: "Palancar and Colombia stops on your departure schedule." },
    ],
  }),
  beyond: sections({
    relatedShipSlugs: ["ascent", "apex"],
    familyRecommendations: [
      { title: "Chankanaab cultural lagoon", portSlug: "cozumel", advice: "Premium ship pairs well with a relaxed Cozumel lagoon day for families." },
      { title: "De Palm Island pass", portSlug: "aruba", advice: "All-inclusive island day on Beyond Southern Caribbean sailings." },
      { title: "Magens Bay with facilities", portSlug: "st-thomas", advice: "Calm swimming bay suited to Celebrity's longer port times." },
    ],
    beachRecommendations: [
      { title: "Orient Bay premium cabana", portSlug: "st-maarten", advice: "French-side service matches Beyond's upscale passenger profile." },
      { title: "Eagle Beach morning", portSlug: "aruba", advice: "Reliable Southern Caribbean sand on Beyond's Aruba calls." },
      { title: "Seven Mile tender-aware break", portSlug: "grand-cayman", advice: "Organized beach transfer with strict tender return margin." },
    ],
    snorkellingRecommendations: [
      { title: "Luxury catamaran snorkel sail", portSlug: "st-thomas", advice: "Beyond passengers favor smaller-group sailing formats." },
      { title: "Palancar premium reef boat", portSlug: "cozumel", advice: "High-quality reef stops with fewer passengers per guide." },
      { title: "Aruba west-coast snorkel coves", portSlug: "aruba", advice: "Clear water on Southern Caribbean extensions." },
    ],
    privateTourRecommendations: [
      { title: "Private French-Dutch culinary tour", portSlug: "st-maarten", advice: "Chef-led tastings paired with beach time on custom timing." },
      { title: "Private Aruba sunset sail", portSlug: "aruba", advice: "Couple-focused sailing on late-departure Southern calls." },
      { title: "Private Cozumel culture and reef", portSlug: "cozumel", advice: "Tequila heritage stop plus private afternoon snorkel boat." },
    ],
  }),
  ascent: sections({
    relatedShipSlugs: ["beyond", "apex"],
    familyRecommendations: [
      { title: "Coral World Ocean Park", portSlug: "st-thomas", advice: "Educational marine exhibits without long transfers on Ascent Eastern weeks." },
      { title: "Gumbalimba family wildlife", portSlug: "roatan", advice: "Rainforest park day when Ascent includes Western Caribbean ports." },
      { title: "Amber Cove pool day", portSlug: "puerto-plata", advice: "Low-stress Dominican facilities for mixed-age groups." },
    ],
    beachRecommendations: [
      { title: "Grote Knip cove afternoon", portSlug: "curacao", advice: "Premium cove beach on Ascent Southern Caribbean loops." },
      { title: "Magens Bay chair rental", portSlug: "st-thomas", advice: "Classic Eastern Caribbean beach with calm entry." },
      { title: "Eagle Beach catamaran combo", portSlug: "aruba", advice: "Sailing plus wide sand on Southern routes." },
    ],
    snorkellingRecommendations: [
      { title: "Curacao west-coast reef", portSlug: "curacao", advice: "Protected coves with healthy hard and soft coral." },
      { title: "St. Thomas luxury catamaran", portSlug: "st-thomas", advice: "Small-group sail to nearby snorkel sites." },
      { title: "Cozumel El Cielo sandbar", portSlug: "cozumel", advice: "Premium southern reef route on Western Ascent sailings." },
    ],
    privateTourRecommendations: [
      { title: "Private Curacao old town and cove", portSlug: "curacao", advice: "Willemstad culture plus west-coast snorkel on one driver schedule." },
      { title: "Private St. Thomas Magens and ferry option", portSlug: "st-thomas", advice: "Custom beach day with optional St. John extension." },
      { title: "Private Aruba north-coast SUV", portSlug: "aruba", advice: "Natural Pool and lighthouse with flexible beach finale." },
    ],
  }),
  apex: sections({
    relatedShipSlugs: ["beyond", "ascent"],
    familyRecommendations: [
      { title: "Dolphin Cove lagoon", portSlug: "cozumel", advice: "Apex Western weeks: secure programs without mainland travel." },
      { title: "Stingray City family sandbar", portSlug: "grand-cayman", advice: "Wildlife day suited to Apex tender port calls." },
      { title: "Teleférico Dominican ride", portSlug: "puerto-plata", advice: "Scenic cable car when Apex includes Amber Coast stops." },
    ],
    beachRecommendations: [
      { title: "Orient Bay French club", portSlug: "st-maarten", advice: "Established Apex Eastern Caribbean beach favorite." },
      { title: "Eagle Beach reliability", portSlug: "aruba", advice: "Southern Caribbean wide sand with trade-wind cooling." },
      { title: "Seven Mile organized day", portSlug: "grand-cayman", advice: "Premium beach transfer with tender timing built in." },
    ],
    snorkellingRecommendations: [
      { title: "Grand Cayman stingray and reef", portSlug: "grand-cayman", advice: "Two-stop wildlife morning on Apex tender days." },
      { title: "Palancar snorkel sail", portSlug: "cozumel", advice: "Apex's most-booked Western Caribbean water experience." },
      { title: "Aruba reef catamaran", portSlug: "aruba", advice: "Sail-and-snorkel on Southern Caribbean Apex routes." },
    ],
    privateTourRecommendations: [
      { title: "Private stingray early charter", portSlug: "grand-cayman", advice: "Beat group boat crowds on Apex Grand Cayman calls." },
      { title: "Private St. Maarten culinary split", portSlug: "st-maarten", advice: "French-side lunch and Dutch-side shopping on custom timing." },
      { title: "Private Cozumel premium reef boat", portSlug: "cozumel", advice: "Two reef stops with small-group service standards." },
    ],
  }),
  "sun-princess": sections({
    relatedShipSlugs: ["enchanted-princess", "regal-princess"],
    familyRecommendations: [
      { title: "Coral World touch exhibits", portSlug: "st-thomas", advice: "Princess families favor short-transfer marine parks on Eastern weeks." },
      { title: "Chankanaab lagoon day", portSlug: "cozumel", advice: "Secure snorkel environment on Sun Princess Western routes." },
      { title: "Princess Cays ship day", portSlug: "nassau", advice: "Book independent Nassau excursions only on dedicated port calls." },
    ],
    beachRecommendations: [
      { title: "Trunk Bay via St. John ferry", portSlug: "st-thomas", advice: "National Park beach when Sun Princess allows a long St. Thomas call." },
      { title: "Eagle Beach catamaran", portSlug: "aruba", advice: "Southern Caribbean sailing plus sand on Sun Princess extended routes." },
      { title: "Seven Mile tender-aware break", portSlug: "grand-cayman", advice: "Organized beach day with Princess-friendly return buffers." },
    ],
    snorkellingRecommendations: [
      { title: "St. John underwater trail", portSlug: "st-thomas", advice: "Ferry to Trunk Bay snorkel trail on longer Eastern port days." },
      { title: "Palancar reef Princess sail", portSlug: "cozumel", advice: "Structured snorkel with reliable pier return on Western weeks." },
      { title: "Roatan West Bay reef", portSlug: "roatan", advice: "Value reef snorkeling on Sun Princess Western Caribbean calls." },
    ],
    privateTourRecommendations: [
      { title: "Private Stingray City charter", portSlug: "grand-cayman", advice: "Early sandbar visit before Princess group boats on tender days." },
      { title: "Private Magens and St. John option", portSlug: "st-thomas", advice: "Custom island pacing for couples and small families." },
      { title: "Private Aruba coast sail", portSlug: "aruba", advice: "Sunset or daytime catamaran on Southern Caribbean sailings." },
    ],
  }),
  "enchanted-princess": sections({
    relatedShipSlugs: ["sun-princess", "regal-princess"],
    familyRecommendations: [
      { title: "Atlantis Aquaventure", portSlug: "nassau", advice: "Full waterpark day when Enchanted Princess includes Nassau on Eastern routes." },
      { title: "Dunn's River gentler alternative", portSlug: "ocho-rios", advice: "Scenic park options when full falls climb is too demanding for younger children." },
      { title: "Chankanaab family lagoon", portSlug: "cozumel", advice: "All-ages snorkel and beach on Enchanted Western weeks." },
    ],
    beachRecommendations: [
      { title: "Magens Bay morning", portSlug: "st-thomas", advice: "Enchanted's signature Eastern Caribbean calm bay day." },
      { title: "Orient Bay club", portSlug: "st-maarten", advice: "French-side loungers on dual-nation port calls." },
      { title: "Seven Mile Beach break", portSlug: "grand-cayman", advice: "Tender-aware organized transport on Cayman tender days." },
    ],
    snorkellingRecommendations: [
      { title: "Sapphire Beach reef", portSlug: "st-thomas", advice: "Accessible reef without St. John ferry time commitment." },
      { title: "Stingray City and reef combo", portSlug: "grand-cayman", advice: "Princess passengers book early for morning wildlife slots." },
      { title: "Cozumel two-stop reef sail", portSlug: "cozumel", advice: "Palancar-quality snorkeling on Enchanted Western routes." },
    ],
    privateTourRecommendations: [
      { title: "Private Dunn's River first slot", portSlug: "ocho-rios", advice: "Early falls entry before group tour arrivals on Jamaica calls." },
      { title: "Private Grand Cayman wildlife boat", portSlug: "grand-cayman", advice: "Custom stingray and snorkel pacing on tender port days." },
      { title: "Private St. Thomas island taxi", portSlug: "st-thomas", advice: "Magens Bay, overlooks, and harbor browse on your timeline." },
    ],
  }),
  "regal-princess": sections({
    relatedShipSlugs: ["sun-princess", "enchanted-princess"],
    familyRecommendations: [
      { title: "Rose Island catamaran", portSlug: "nassau", advice: "Half-day reef sail suited to Regal's Bahamas-forward itineraries." },
      { title: "Coral World Ocean Park", portSlug: "st-thomas", advice: "Short pier transfer with touch pools for mixed-age groups." },
      { title: "Martha Brae gentle rafting", portSlug: "falmouth", advice: "Slow-paced river day when Regal includes Jamaica heritage ports." },
    ],
    beachRecommendations: [
      { title: "Magens Bay chair day", portSlug: "st-thomas", advice: "Regal Eastern Caribbean passengers rank Magens highest." },
      { title: "Paradise Island beach pass", portSlug: "nassau", advice: "Resort-style beach on Regal Bahamas combination sailings." },
      { title: "Orient Bay afternoon", portSlug: "st-maarten", advice: "French-side beach club on Eastern loops." },
    ],
    snorkellingRecommendations: [
      { title: "Rose Island reef snorkel", portSlug: "nassau", advice: "Outer reef away from downtown Nassau crowds." },
      { title: "Trunk Bay ferry snorkel", portSlug: "st-thomas", advice: "National Park trail when Regal's St. Thomas call is long enough." },
      { title: "Stingray City morning", portSlug: "grand-cayman", advice: "Wildlife sandbar on Regal tender port days." },
    ],
    privateTourRecommendations: [
      { title: "Private Nassau coastal highlights", portSlug: "nassau", advice: "Custom viewpoints, food, and beach for repeat visitors." },
      { title: "Private St. Maarten dual-nation driver", portSlug: "st-maarten", advice: "Philipsburg and Orient Bay without rigid group timing." },
      { title: "Private Falmouth heritage loop", portSlug: "falmouth", advice: "Historic town walk plus Martha Brae on flexible scheduling." },
    ],
  }),
};

export function getShipSections(slug: string): ShipSectionData | undefined {
  return shipSectionData[slug];
}
