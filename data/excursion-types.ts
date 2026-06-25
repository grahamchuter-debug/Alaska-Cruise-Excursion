import type { ExcursionType } from "./types";

export const excursionTypes: ExcursionType[] = [
  {
    slug: "whale-watching",
    name: "Whale Watching",
    tagline: "Humpbacks, orcas, and marine wildlife on Alaska cruise port days",
    overview:
      "Alaska is among the world's best whale-watching destinations. Humpback whales feed in Inside Passage waters May through September, with peak activity in June and July. Juneau, Icy Strait, Sitka, and Seward offer dedicated marine tours sized for cruise schedules — choose morning departures for calmer seas and better photography light.",
    whatToExpect: [
      "Naturalist-guided boat tours of 3-4 hours typical for cruise port calls",
      "Humpback whales most common; orcas and porpoises possible",
      "Rain and wind — dress in waterproof layers",
      "Guaranteed sightings policies vary by operator",
      "Return-to-ship timing built into reputable tours",
    ],
    bestPorts: [
      { slug: "juneau", name: "Juneau", reason: "Consistent humpback populations in Auke Bay and Stephens Passage" },
      { slug: "icy-strait", name: "Icy Strait", reason: "Compact port focused on whale watching with strong summer sighting rates" },
      { slug: "sitka", name: "Sitka", reason: "Smaller boats in Sitka Sound — sea otters and whales combined" },
      { slug: "seward", name: "Seward", reason: "Kenai Fjords cruises include whales alongside glaciers" },
    ],
    tips: [
      "Book early on multi-ship days in Juneau",
      "Morning tours usually have calmer water",
      "Bring binoculars and a waterproof camera case",
      "Motion sickness medication helps on open-water routes",
      "Compare Icy Strait vs Juneau if your itinerary includes both",
    ],
    faqs: [
      { question: "When is whale season in Alaska?", answer: "Humpbacks are most reliable May through September, peaking June–August. Some operators run shoulder-season tours in April and October." },
      { question: "Which Alaska port is best for whale watching?", answer: "Juneau and Icy Strait rank highest for dedicated whale tours. Seward combines whales with Kenai Fjords glacier scenery." },
      { question: "Are whale tours safe for cruise schedules?", answer: "Reputable operators design tours around typical port windows. Confirm return guarantees and allow tender buffer time at Icy Strait and Sitka." },
    ],
    whyPassengersChoose: [
      "Alaska humpback encounters are among the most memorable cruise experiences worldwide.",
      "Dedicated whale boats carry naturalists who interpret behaviour and photography timing.",
      "Morning departures fit well before afternoon glacier or town activities.",
    ],
    suitability: {
      family: "Excellent — most tours welcome children with life jackets provided.",
      firstTimeCruisers: "Ideal signature Alaska experience for first-time visitors.",
      mobility: "Boat boarding may require stairs — check accessible options with operators.",
    },
  },
  {
    slug: "bear-viewing",
    name: "Bear Viewing",
    tagline: "Brown and black bears at salmon streams and sanctuaries",
    overview:
      "Bear viewing in Alaska ranges from sanctuary visits (Sitka, predictable) to wild stream platforms (Ketchikan, Haines, season-limited). Peak salmon runs drive the best wild encounters — typically July through early September. Tours are permit-limited and book far in advance.",
    whatToExpect: [
      "Small groups with strict wildlife protocols",
      "Seasonal availability tied to salmon runs",
      "Full-day trips from some ports (Ketchikan, Haines)",
      "Sanctuary options for reliable viewing without long transfers",
      "Bear-aware briefing before every tour",
    ],
    bestPorts: [
      { slug: "ketchikan", name: "Ketchikan", reason: "Anan and Neets Bay bear viewing — peak summer salmon season" },
      { slug: "haines", name: "Haines", reason: "Chilkoot Lake and river corridors with brown bear habitat" },
      { slug: "sitka", name: "Sitka", reason: "Fortress of the Bear sanctuary — reliable for all ages" },
      { slug: "icy-strait", name: "Icy Strait", reason: "Chichagof Island has one of Alaska's highest bear densities" },
    ],
    tips: [
      "Book wild bear tours months ahead for July–August",
      "Fortress of the Bear suits passengers wanting guaranteed viewing",
      "Never approach bears independently",
      "Waterproof boots help on stream platforms",
      "Check fitness requirements — some hikes are moderate",
    ],
    faqs: [
      { question: "When can I see bears in Alaska?", answer: "Wild stream viewing peaks July–September with salmon runs. Sanctuaries operate throughout the cruise season." },
      { question: "Is bear viewing safe?", answer: "Guided tours with permits follow strict protocols. Sanctuary viewing is controlled and family-friendly." },
      { question: "Which port is best for bears?", answer: "Ketchikan for wild stream platforms; Sitka for reliable sanctuary viewing; Haines for lake and river combinations." },
    ],
    whyPassengersChoose: [
      "Wild bear encounters are a defining Alaska wildlife experience.",
      "Sanctuary options provide accessibility when wild tours sell out.",
      "Naturalist guides interpret behaviour safely and ethically.",
    ],
    suitability: {
      family: "Sanctuary tours excellent; wild stream tours often age-restricted.",
      firstTimeCruisers: "Fortress of the Bear or organised stream tours suit first visits.",
      mobility: "Stream platforms may involve uneven terrain — check tour grading.",
    },
  },
  {
    slug: "glacier-tours",
    name: "Glacier Tours",
    tagline: "Mendenhall, Kenai Fjords, Prince William Sound, and icefield flightseeing",
    overview:
      "Glacier experiences define Alaska cruising — from road-accessible Mendenhall near Juneau to full-day Kenai Fjords boats from Seward and Prince William Sound cruises from Whittier. Helicopter landings add premium icefield access when weather cooperates.",
    whatToExpect: [
      "Boat tours of 4-8 hours for fjord glaciers",
      "Visitor centre and trail access at Mendenhall and Exit Glacier",
      "Helicopter tours of 2-3 hours with possible glacier landing",
      "Weather cancellations common — flexible planning essential",
      "Calving events unpredictable but unforgettable",
    ],
    bestPorts: [
      { slug: "juneau", name: "Juneau", reason: "Mendenhall Glacier and helicopter icefield landings" },
      { slug: "seward", name: "Seward", reason: "Kenai Fjords tidewater glaciers and marine wildlife" },
      { slug: "whittier", name: "Whittier", reason: "Prince William Sound glacier cruises" },
      { slug: "skagway", name: "Skagway", reason: "Helicopter glacier dog camps and icefield flightseeing" },
    ],
    tips: [
      "Match tour length to port time — Kenai Fjords needs 6+ hours for full-day routes",
      "Helicopter tours cancel in low cloud — have backup plans",
      "Dress warmly on boat decks even in summer",
      "Morning light improves photography on glacier faces",
      "Combine glacier boat with one town activity only on long port days",
    ],
    faqs: [
      { question: "Which Alaska glacier tour is best?", answer: "Kenai Fjords from Seward for combined glaciers and wildlife. Mendenhall for easy access from Juneau. Prince William Sound from Whittier for tidewater glaciers near Anchorage connections." },
      { question: "Can I walk on a glacier?", answer: "Helicopter landing tours from Juneau and Skagway offer short glacier walks. Most boat tours view glaciers from the water." },
      { question: "What if my glacier tour is cancelled?", answer: "Weather cancellations are common. Book early in the cruise if possible and keep a flexible backup excursion." },
    ],
    whyPassengersChoose: [
      "Tidewater glaciers calving into fjords are unique to high-latitude coasts.",
      "Kenai Fjords and Prince William Sound combine glaciers with whales and seabirds.",
      "Helicopter landings deliver icefield access impossible from road or boat alone.",
    ],
    suitability: {
      family: "Boat tours suit all ages; helicopter tours often have minimum ages.",
      firstTimeCruisers: "Mendenhall or a half-day fjord cruise are ideal introductions.",
      mobility: "Boat tours generally accessible; helicopter requires boarding assistance.",
    },
  },
  {
    slug: "dog-sledding",
    name: "Dog Sledding",
    tagline: "Meet mushers and ride with Alaskan husky teams",
    overview:
      "Dog sledding on Alaska cruise port days typically uses wheeled carts in summer or snow patches on glaciers via helicopter. Skagway, Juneau, and Seward offer the strongest options — from historic camp visits to glacier helicopter combos.",
    whatToExpect: [
      "Meet Iditarod and local mushers with their teams",
      "Summer cart rides or glacier snow patches",
      "Helicopter combos add flightseeing and glacier landing",
      "Duration usually 2-3 hours",
      "Interactive — passengers often help harness dogs",
    ],
    bestPorts: [
      { slug: "skagway", name: "Skagway", reason: "Multiple dog camps including glacier helicopter combos" },
      { slug: "juneau", name: "Juneau", reason: "Helicopter glacier dog sledding on the icefield" },
      { slug: "seward", name: "Seward", reason: "Summer glacier dog camps via helicopter" },
      { slug: "denali", name: "Denali", reason: "Land extension demonstrations at park entrance" },
    ],
    tips: [
      "Helicopter dog sledding sells out and is weather-dependent",
      "Cart rides suit passengers avoiding flights",
      "Bring layers — glacier camps are cold even in summer",
      "Book early on Skagway multi-ship days",
      "Photography opportunities with puppies and teams",
    ],
    faqs: [
      { question: "Is there snow for dog sledding in summer?", answer: "Glacier camps via helicopter maintain snow patches. Ground camps use wheeled carts on summer trails." },
      { question: "Which port has the best dog sledding?", answer: "Skagway for variety; Juneau and Seward for glacier helicopter combinations." },
      { question: "Is dog sledding good for children?", answer: "Most camps welcome families. Helicopter combos may have minimum age and weight limits." },
    ],
    whyPassengersChoose: [
      "Meeting working sled dog teams connects passengers to Alaska's mushing culture.",
      "Glacier combos pair iconic dogs with icefield flightseeing.",
      "Cart rides offer the experience without helicopter cost.",
    ],
    suitability: {
      family: "Excellent at ground camps; check age limits on helicopter tours.",
      firstTimeCruisers: "Memorable, distinctly Alaskan highlight.",
      mobility: "Cart rides generally accessible; glacier camps require helicopter boarding.",
    },
  },
  {
    slug: "flightseeing",
    name: "Flightseeing",
    tagline: "Floatplanes and helicopters over fjords, icefields, and Misty Fjords",
    overview:
      "Alaska flightseeing reveals scale impossible from sea level — Misty Fjords from Ketchikan, Juneau Icefield glaciers, Denali peaks, and Skagway alpine passes. Floatplanes and helicopters operate from multiple ports; weather is the main constraint.",
    whatToExpect: [
      "Tours of 1-3 hours depending on route",
      "Floatplane or helicopter with 4-6 passengers typical",
      "Glacier landings on premium helicopter tours",
      "Cancellations or reroutes in low cloud",
      "Weight limits and minimum passenger rules apply",
    ],
    bestPorts: [
      { slug: "ketchikan", name: "Ketchikan", reason: "Misty Fjords floatplane routes — iconic wilderness scenery" },
      { slug: "juneau", name: "Juneau", reason: "Helicopter glacier landings on the icefield" },
      { slug: "denali", name: "Denali", reason: "Denali peak flightseeing from park entrance" },
      { slug: "skagway", name: "Skagway", reason: "Helicopter glacier and dog camp combinations" },
    ],
    tips: [
      "Book flexible days — weather cancellations are frequent",
      "Morning flights often have clearer conditions",
      "Declare accurate passenger weights for safety",
      "Motion sickness less common than boat tours but possible",
      "Misty Fjords sells out on Ketchikan peak days",
    ],
    faqs: [
      { question: "Floatplane or helicopter?", answer: "Floatplanes excel at Misty Fjords and fjord scenery. Helicopters allow glacier landings and tighter manoeuvring." },
      { question: "What happens if weather cancels?", answer: "Operators refund or rebook. Build flexibility into your cruise itinerary." },
      { question: "Is flightseeing worth the cost?", answer: "For many passengers it is the highlight of an Alaska cruise — scenery unavailable any other way." },
    ],
    whyPassengersChoose: [
      "Aerial views reveal Alaska's scale — fjords, icefields, and peaks in one flight.",
      "Glacier landings on helicopter tours are once-in-a-lifetime experiences.",
      "Misty Fjords floatplane routes access wilderness without full-day boats.",
    ],
    suitability: {
      family: "Age and weight limits apply — check per operator.",
      firstTimeCruisers: "Misty Fjords or Mendenhall helicopter are strong first-flight choices.",
      mobility: "Boarding small aircraft requires step access — limited wheelchair options.",
    },
  },
  {
    slug: "railway-tours",
    name: "Railway Tours",
    tagline: "White Pass Railway, Alaska Railroad, and scenic rail segments",
    overview:
      "Rail journeys are among Alaska's signature experiences. Skagway's White Pass & Yukon Route climbs to alpine scenery and the Canadian border. Whittier and Seward connect to Alaska Railroad segments. Denali cruisetours use rail as primary transport between ports and the interior.",
    whatToExpect: [
      "White Pass tours of 3-4 hours from Skagway",
      "Alaska Railroad scenic segments from Whittier or Seward",
      "Narrated historic routes with photo stops",
      "Limited capacity — advance booking essential",
      "Passport needed for Yukon extensions",
    ],
    bestPorts: [
      { slug: "skagway", name: "Skagway", reason: "White Pass & Yukon Route — Alaska's iconic cruise rail" },
      { slug: "whittier", name: "Whittier", reason: "Glacier Discovery train through tunnel and alpine valleys" },
      { slug: "denali", name: "Denali", reason: "Alaska Railroad hub for cruisetour land extensions" },
      { slug: "seward", name: "Seward", reason: "Coastal Classic rail link to Anchorage" },
    ],
    tips: [
      "Book White Pass immediately after booking cruise — it sells out",
      "Sit on the left going up White Pass for best views (varies by direction)",
      "Yukon routes need passport and full port day",
      "Rail segments pair well with one other short activity, not two majors",
      "Denali rail requires separate cruisetour planning",
    ],
    faqs: [
      { question: "Is the White Pass Railway worth it?", answer: "Yes — one of the most popular Alaska cruise excursions. Choose summit or extended routes based on port time." },
      { question: "Can I combine rail with other tours?", answer: "White Pass half-day leaves time for downtown Skagway. Avoid stacking rail with Yukon coach on short port calls." },
      { question: "Does the Alaska Railroad connect cruise ports?", answer: "Seward, Whittier (via bus/tunnel), and Anchorage connect on the rail network. Denali is the interior cruisetour anchor." },
    ],
    whyPassengersChoose: [
      "Historic narrow-gauge engineering through alpine passes is uniquely Alaskan.",
      "Rail removes road stress — narrated scenery with predictable timing.",
      "White Pass pairs naturally with Skagway's compact Gold Rush town.",
    ],
    suitability: {
      family: "Excellent — all ages enjoy narrated scenic rail.",
      firstTimeCruisers: "White Pass is a top first-timer pick at Skagway.",
      mobility: "Accessible coaches available on main routes — request when booking.",
    },
  },
  {
    slug: "wildlife-cruises",
    name: "Wildlife Cruises",
    tagline: "Kenai Fjords, Prince William Sound, and marine wildlife day boats",
    overview:
      "Wildlife cruises combine glaciers, seabirds, sea otters, orcas, and humpbacks in one port day. Kenai Fjords from Seward and Prince William Sound from Whittier are the headline routes — longer than dedicated whale watches but richer in combined scenery.",
    whatToExpect: [
      "Full or half-day boat tours of 4-8 hours",
      "Onboard naturalists and warm cabin areas",
      "Lunch sometimes included on full-day routes",
      "Weather-dependent routing",
      "Wildlife sightings vary — no guarantees except effort",
    ],
    bestPorts: [
      { slug: "seward", name: "Seward", reason: "Kenai Fjords — glaciers, puffins, otters, and whales" },
      { slug: "whittier", name: "Whittier", reason: "Prince William Sound glacier and marine routes" },
      { slug: "juneau", name: "Juneau", reason: "Tracy Arm / Endicott Arm full-day fjord trips" },
      { slug: "sitka", name: "Sitka", reason: "Sitka Sound marine wildlife on smaller vessels" },
    ],
    tips: [
      "Confirm port length before booking 8-hour Kenai Fjords tours",
      "Dress in warm layers for open decks",
      "Binoculars essential for puffins and distant orcas",
      "Seasickness medication for Gulf of Alaska routes",
      "Morning departures often smoother",
    ],
    faqs: [
      { question: "Kenai Fjords or Prince William Sound?", answer: "Kenai Fjords from Seward is longer and wildlife-richer. Prince William Sound from Whittier suits shorter port days and Anchorage connections." },
      { question: "How long are wildlife cruises?", answer: "Half-day 4-6 hours; full-day 6-8 hours. Match to your ship's departure time." },
      { question: "Will I see orcas?", answer: "Possible but not guaranteed. Resurrection Bay and Kenai Fjords have resident and transient orca populations." },
    ],
    whyPassengersChoose: [
      "Combined glacier and wildlife in one booking simplifies port planning.",
      "Kenai Fjords ranks among North America's top day-boat experiences.",
      "Naturalists identify seabirds, marine mammals, and glacier features.",
    ],
    suitability: {
      family: "Good — choose half-day routes with younger children.",
      firstTimeCruisers: "Kenai Fjords half-day is a strong Gulf of Alaska introduction.",
      mobility: "Boats have indoor seating; deck access may involve stairs.",
    },
  },
  {
    slug: "kayaking",
    name: "Kayaking",
    tagline: "Paddle calm bays, fjords, and coastal waters near glacier termini",
    overview:
      "Kayaking in Alaska ranges from gentle paddles in protected bays to glacier-adjacent tours in Prince William Sound. Experience levels vary — beginner tours use stable tandem kayaks with guides; advanced routes require fitness and cold-water awareness.",
    whatToExpect: [
      "Guided tours of 3-5 hours typical",
      "Dry suits or waterproof gear often provided",
      "Tandem kayaks common for beginners",
      "Wildlife encounters possible — maintain distance",
      "Weather cancellations in high wind",
    ],
    bestPorts: [
      { slug: "whittier", name: "Whittier", reason: "Blackstone Bay glacier kayaking" },
      { slug: "juneau", name: "Juneau", reason: "Channel and island paddles near Auke Bay" },
      { slug: "ketchikan", name: "Ketchikan", reason: "Rainforest coastline and protected inlets" },
      { slug: "haines", name: "Haines", reason: "Calm water options near Chilkoot Inlet" },
    ],
    tips: [
      "No prior experience needed on beginner tours",
      "Bring synthetic layers under provided gear",
      "Check minimum age requirements",
      "Allow buffer for changing weather",
      "Photography requires waterproof protection",
    ],
    faqs: [
      { question: "Do I need kayaking experience?", answer: "Beginner tours teach basics. Glacier-adjacent routes may require prior paddling or good fitness." },
      { question: "Is kayaking safe near glaciers?", answer: "Guides maintain safe distances from calving zones. Tours cancel if conditions are unsafe." },
      { question: "Which port is best for kayaking?", answer: "Whittier for glacier-adjacent paddling; Juneau and Ketchikan for beginner-friendly protected waters." },
    ],
    whyPassengersChoose: [
      "Water-level perspective on coastline and wildlife unavailable from larger boats.",
      "Small group sizes compared with big-ship excursions.",
      "Active adventure without helicopter or long hikes.",
    ],
    suitability: {
      family: "Age minimums typically 8-12 — check operators.",
      firstTimeCruisers: "Beginner tours in Juneau or Ketchikan suit first paddlers.",
      mobility: "Requires boarding kayak from water or dock — limited accessibility.",
    },
  },
  {
    slug: "fishing",
    name: "Fishing",
    tagline: "Salmon and halibut charters on Alaska cruise port days",
    overview:
      "Alaska fishing charters operate from Ketchikan, Seward, Whittier, and other ports with half-day salmon or halibut trips sized for cruise schedules. Licences and gear are typically included; catch processing and shipping can be arranged for serious anglers.",
    whatToExpect: [
      "Half-day charters of 4-6 hours typical",
      "Rod, tackle, and licence often included",
      "Salmon peak varies by species and port",
      "Catch limits regulated by Alaska Fish and Game",
      "Smaller boats — seasickness possible",
    ],
    bestPorts: [
      { slug: "ketchikan", name: "Ketchikan", reason: "Salmon capital — multiple species and charter fleet" },
      { slug: "seward", name: "Seward", reason: "Halibut and salmon in Resurrection Bay" },
      { slug: "whittier", name: "Whittier", reason: "Prince William Sound halibut and salmon" },
      { slug: "sitka", name: "Sitka", reason: "Sitka Sound salmon and bottom fishing" },
    ],
    tips: [
      "Book early in peak salmon weeks",
      "Confirm catch processing if you want fish shipped home",
      "Dress warmly — open-ocean fishing is cold",
      "Motion sickness medication recommended",
      "One fishing trip fills most of a port day",
    ],
    faqs: [
      { question: "Can I fish on a cruise port day?", answer: "Yes — half-day charters are designed around ship schedules. Full-day trips need long port calls." },
      { question: "When is salmon season?", answer: "Varies by species and port — generally May through September with peaks in mid-summer." },
      { question: "Can I ship my catch home?", answer: "Many operators arrange processing and frozen shipping — confirm costs and timing when booking." },
    ],
    whyPassengersChoose: [
      "Alaska offers world-class salmon and halibut fishing.",
      "Charter captains know cruise timing and return guarantees.",
      "Half-day trips fit one excursion per port day.",
    ],
    suitability: {
      family: "Family charters available — check age policies.",
      firstTimeCruisers: "No licence or experience needed on guided charters.",
      mobility: "Boat boarding requires mobility — deck can be slippery.",
    },
  },
  {
    slug: "native-culture",
    name: "Native Culture",
    tagline: "Tlingit, Haida, and Alaska Native heritage experiences",
    overview:
      "Alaska Native cultural excursions include totem park visits, dance performances, carving demonstrations, and storytelling. Ketchikan, Sitka, and Icy Strait offer the strongest cruise-port programmes — often combinable with wildlife or town tours in half a day.",
    whatToExpect: [
      "Totem pole parks and cultural centres",
      "Live dance and storytelling at Icy Strait and some ports",
      "Museum visits in Sitka and Ketchikan",
      "Respectful, educational framing from native guides",
      "Duration typically 1-3 hours standalone",
    ],
    bestPorts: [
      { slug: "ketchikan", name: "Ketchikan", reason: "Totem Bight, Saxman Village, and rich Tlingit heritage" },
      { slug: "sitka", name: "Sitka", reason: "Sitka National Historical Park totem trail" },
      { slug: "icy-strait", name: "Icy Strait", reason: "Tlingit-owned port with cultural performances" },
      { slug: "juneau", name: "Juneau", reason: "Alaska State Museum and native art galleries" },
    ],
    tips: [
      "Combine cultural sites with a short town walk",
      "Photography etiquette varies — ask before filming performances",
      "Totem parks are outdoors — rain gear needed",
      "Support native-owned operators where available",
      "Allow time at Sitka's totem trail — worth unhurried visit",
    ],
    faqs: [
      { question: "Which port is best for totem poles?", answer: "Ketchikan's Totem Bight and Saxman Village; Sitka National Historical Park totem trail." },
      { question: "Are cultural tours authentic?", answer: "Native-owned and tribal-affiliated programmes at Icy Strait and organised totem park tours offer authentic interpretation." },
      { question: "Can I fit culture into a wildlife port day?", answer: "Yes — totem parks and museums often need only 1-2 hours alongside a half-day wildlife tour." },
    ],
    whyPassengersChoose: [
      "Totem poles and native storytelling deepen understanding of Southeast Alaska.",
      "Cultural sites are often walkable or short transfers from pier.",
      "Combines well with whale or bear tours for balanced port days.",
    ],
    suitability: {
      family: "Excellent — totem parks engage all ages.",
      firstTimeCruisers: "Accessible introduction to Alaska Native heritage.",
      mobility: "Totem trails may be uneven — paved options at some parks.",
    },
  },
  {
    slug: "photography",
    name: "Photography",
    tagline: "Wildlife, glaciers, and landscape tours for serious photographers",
    overview:
      "Photography-focused tours prioritise golden-hour light, wildlife positioning, and glacier viewpoints over generic sightseeing. Juneau whales, Haines eagles, Kenai Fjords seabirds, and Denali landscapes attract dedicated photo excursions — some with pro guides and small groups.",
    whatToExpect: [
      "Small groups with extended time at key viewpoints",
      "Early-morning or late-afternoon departures when offered",
      "Tripods allowed on some land tours",
      "Boat tours with open deck time",
      "Weather dictates success — flexibility required",
    ],
    bestPorts: [
      { slug: "haines", name: "Haines", reason: "Eagle photography at Chilkat Preserve" },
      { slug: "juneau", name: "Juneau", reason: "Whale tails and Mendenhall glacier compositions" },
      { slug: "seward", name: "Seward", reason: "Puffins, otters, and glacier calving on Kenai Fjords" },
      { slug: "denali", name: "Denali", reason: "Tundra landscapes and peak flightseeing" },
    ],
    tips: [
      "Bring telephoto lens for wildlife — 200mm minimum recommended",
      "Rain covers protect gear in Southeast Alaska",
      "Book eagle tours in Haines for October–February peak or summer alternatives",
      "Morning whale light in Juneau is exceptional",
      "Disable flash near wildlife",
    ],
    faqs: [
      { question: "Are there photo-specific tours?", answer: "Some operators offer photography-focused departures — check specialist local sites for each port." },
      { question: "Best port for eagle photography?", answer: "Haines and the Chilkat Eagle Preserve — winter peak but summer tours available." },
      { question: "Can I photograph whales from shore?", answer: "Boat tours deliver far better angles. Shore viewing is limited at most ports." },
    ],
    whyPassengersChoose: [
      "Alaska delivers iconic wildlife and landscape subjects in compact itineraries.",
      "Small-group photo tours reduce crowding at key viewpoints.",
      "Naturalist guides help anticipate animal behaviour for better shots.",
    ],
    suitability: {
      family: "General wildlife tours suit casual photographers; dedicated tours suit enthusiasts.",
      firstTimeCruisers: "Any whale or glacier tour offers strong photo opportunities.",
      mobility: "Varies by tour — boat and vehicle-based tours most accessible.",
    },
  },
];

export function getExcursionTypeBySlug(slug: string): ExcursionType | undefined {
  return excursionTypes.find((t) => t.slug === slug);
}

export function getAllExcursionTypeSlugs(): string[] {
  return excursionTypes.map((t) => t.slug);
}
