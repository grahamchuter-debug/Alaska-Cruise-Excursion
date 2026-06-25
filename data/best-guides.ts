import type { BestGuidePage } from "./types";
import { whichAlaskaPortBestExcursionsGuide } from "./which-alaska-port-excursions-guide";

const sharedFaqs = [
  {
    question: "Should I book Alaska excursions through the cruise line?",
    answer:
      "Book your highest-priority excursion through the ship if you want the strongest return guarantee. Use linked specialist local operators to compare independent options, group sizes, and itineraries.",
  },
  {
    question: "When is the best time for Alaska cruise excursions?",
    answer: "May through September is the main season. Whale watching peaks June–August; bears peak July–September at salmon streams. May and September offer fewer crowds.",
  },
];

function guide(partial: BestGuidePage): BestGuidePage {
  return partial;
}

export const bestGuides: BestGuidePage[] = [
  whichAlaskaPortBestExcursionsGuide,
  guide({
    slug: "best-alaska-shore-excursions",
    seoTitle: "Best Alaska Shore Excursions | Authority Port Rankings",
    title: "Best Alaska Shore Excursions",
    metaDescription:
      "Ranked guide to the best Alaska shore excursions in Juneau, Skagway, Ketchikan, Seward, and Icy Strait — whales, glaciers, railways, and wildlife with specialist links.",
    heroSubtitle: "Activity-led port days across Alaska: signature excursions, pier logistics, and links to local specialist operators.",
    introduction:
      "Alaska cruise excursions centre on wildlife, glaciers, and scenic transport — not beaches. The best port days match one signature activity to your ship's timing: whales in Juneau, White Pass rail in Skagway, Kenai Fjords from Seward, or Misty Fjords flightseeing from Ketchikan.",
    introductionDetail:
      "This guide ranks Alaska ports and excursions by experience quality, cruise-schedule fit, and operator depth from our port authority research. Every ranked port links to an authority guide and vetted specialist website.",
    topPorts: [
      { slug: "juneau", reason: "Whale watching, Mendenhall Glacier, and helicopter icefield landings from downtown docks." },
      { slug: "skagway", reason: "White Pass Railway — Alaska's most iconic rail excursion." },
      { slug: "seward", reason: "Kenai Fjords day cruises combining glaciers, orcas, and puffins." },
      { slug: "ketchikan", reason: "Misty Fjords flightseeing and seasonal bear viewing at salmon streams." },
      { slug: "icy-strait", reason: "Compact whale-focused port with ZipRider and cultural programmes." },
      { slug: "haines", reason: "Eagle preserve floats and Chilkoot Lake wildlife without Skagway crowds." },
    ],
    recommendedExcursions: [
      { name: "Whale Watching Cruise", portSlug: "juneau", description: "Humpbacks in Stephens Passage with naturalist guides.", duration: "3-4 hours" },
      { name: "White Pass Railway", portSlug: "skagway", description: "Historic rail to the summit and alpine lakes.", duration: "3-4 hours" },
      { name: "Kenai Fjords Cruise", portSlug: "seward", description: "Glaciers and marine wildlife in one day boat.", duration: "6-8 hours" },
      { name: "Misty Fjords Flightseeing", portSlug: "ketchikan", description: "Floatplane over wilderness fjords and cliffs.", duration: "2-3 hours" },
      { name: "Prince William Sound Cruise", portSlug: "whittier", description: "Tidewater glaciers near Anchorage connections.", duration: "4-6 hours" },
      { name: "Eagle Preserve Float", portSlug: "haines", description: "Gentle river float through eagle habitat.", duration: "3-4 hours" },
    ],
    comparisonTable: [
      { portSlug: "juneau", portName: "Juneau", bestFor: "Whales & glaciers", bestExcursion: "Whale watching", transferTime: "Pier departures", rating: "4.9" },
      { portSlug: "skagway", portName: "Skagway", bestFor: "Railway", bestExcursion: "White Pass Railway", transferTime: "Walk to rail", rating: "4.9" },
      { portSlug: "seward", portName: "Seward", bestFor: "Fjord cruise", bestExcursion: "Kenai Fjords", transferTime: "Harbour walk", rating: "4.9" },
      { portSlug: "ketchikan", portName: "Ketchikan", bestFor: "Flightseeing", bestExcursion: "Misty Fjords", transferTime: "Airport transfer", rating: "4.8" },
      { portSlug: "icy-strait", portName: "Icy Strait", bestFor: "Whales & ZipRider", bestExcursion: "Whale watch", transferTime: "Tender", rating: "4.8" },
      { portSlug: "haines", portName: "Haines", bestFor: "Eagles", bestExcursion: "Eagle float", transferTime: "Shuttle", rating: "4.7" },
    ],
    passengerRecommendations: [
      { title: "One signature activity per port", advice: "Alaska port times rarely allow two major excursions — choose whales OR glacier OR rail." },
      { title: "Check pier assignment", advice: "Ward Cove vs downtown Ketchikan changes your logistics entirely." },
      { title: "Book rail and bears early", advice: "White Pass Railway and bear viewing sell out on peak summer weeks." },
      { title: "Plan for weather", advice: "Flightseeing and boat tours cancel — keep flexible backup options." },
      { title: "Use specialist local sites", advice: "Each port guide links to operators who know pier timing and return buffers." },
    ],
    faqs: [
      { question: "What are the best Alaska shore excursions overall?", answer: "Whale watching in Juneau, White Pass Railway in Skagway, Kenai Fjords from Seward, Misty Fjords flightseeing from Ketchikan, and bear viewing where seasonal." },
      ...sharedFaqs,
    ],
  }),
  guide({
    slug: "best-alaska-whale-watching-excursions",
    seoTitle: "Best Alaska Whale Watching Excursions | Port Rankings",
    title: "Best Alaska Whale Watching Excursions",
    metaDescription: "Ranked Alaska whale watching excursions in Juneau, Icy Strait, Sitka, and Seward with seasonality and cruise-schedule tips.",
    heroSubtitle: "Humpbacks, orcas, and marine tours sized for Alaska cruise port days.",
    introduction: "Humpback whales feed across Inside Passage and Gulf waters May through September. Juneau and Icy Strait lead for dedicated whale boats; Seward combines whales with Kenai Fjords scenery.",
    introductionDetail: "Morning departures usually deliver calmer seas. Tender ports (Icy Strait, Sitka) need extra return buffer.",
    topPorts: [
      { slug: "juneau", reason: "Highest volume of dedicated whale watching departures." },
      { slug: "icy-strait", reason: "Whale-focused port layout with strong summer sighting rates." },
      { slug: "sitka", reason: "Smaller boats in Sitka Sound — otters and whales combined." },
      { slug: "seward", reason: "Whales on Kenai Fjords routes — combine with glaciers." },
    ],
    recommendedExcursions: [
      { name: "Juneau Whale Watch", portSlug: "juneau", description: "Naturalist-led search in Stephens Passage.", duration: "3-4 hours" },
      { name: "Icy Strait Whale Tour", portSlug: "icy-strait", description: "Marine tour from Icy Strait Point.", duration: "3-4 hours" },
    ],
    comparisonTable: [
      { portSlug: "juneau", portName: "Juneau", bestFor: "Dedicated whale boats", bestExcursion: "Whale watch", transferTime: "Pier", rating: "4.9" },
      { portSlug: "icy-strait", portName: "Icy Strait", bestFor: "Compact whale port", bestExcursion: "Whale watch", transferTime: "Tender", rating: "4.8" },
    ],
    passengerRecommendations: [{ title: "Book morning tours", advice: "Calmer water and better light for photography." }],
    faqs: [{ question: "When is whale season?", answer: "May–September, peaking June–August for humpbacks." }, ...sharedFaqs],
  }),
  guide({
    slug: "best-alaska-glacier-excursions",
    seoTitle: "Best Alaska Glacier Excursions | Kenai Fjords, Mendenhall & More",
    title: "Best Alaska Glacier Excursions",
    metaDescription: "Best Alaska glacier excursions — Kenai Fjords, Mendenhall, Prince William Sound, and helicopter landings ranked for cruise passengers.",
    heroSubtitle: "Boat, trail, and helicopter access to Alaska's icefields.",
    introduction: "Glacier experiences range from Mendenhall's visitor centre trails to full-day Kenai Fjords boats and Prince William Sound cruises from Whittier.",
    introductionDetail: "Match tour length to port time. Full-day Kenai Fjords needs six to eight hours ashore.",
    topPorts: [
      { slug: "seward", reason: "Kenai Fjords tidewater glaciers." },
      { slug: "juneau", reason: "Mendenhall and helicopter landings." },
      { slug: "whittier", reason: "Prince William Sound glacier cruises." },
      { slug: "skagway", reason: "Helicopter glacier dog camps." },
    ],
    recommendedExcursions: [
      { name: "Kenai Fjords Cruise", portSlug: "seward", description: "Full-day fjord glaciers and wildlife.", duration: "6-8 hours" },
      { name: "Mendenhall Glacier Visit", portSlug: "juneau", description: "Visitor centre and Nugget Falls trail.", duration: "2-3 hours" },
    ],
    comparisonTable: [
      { portSlug: "seward", portName: "Seward", bestFor: "Fjord glaciers", bestExcursion: "Kenai Fjords", transferTime: "Harbour", rating: "4.9" },
      { portSlug: "juneau", portName: "Juneau", bestFor: "Accessible glacier", bestExcursion: "Mendenhall", transferTime: "Taxi", rating: "4.8" },
    ],
    passengerRecommendations: [{ title: "Dress warmly on boats", advice: "Deck temperatures stay cold even in summer." }],
    faqs: [{ question: "Can I walk on a glacier?", answer: "Helicopter tours from Juneau and Skagway offer short glacier walks on landings." }, ...sharedFaqs],
  }),
  guide({
    slug: "best-alaska-bear-viewing-excursions",
    seoTitle: "Best Alaska Bear Viewing Excursions | Ports & Seasonality",
    title: "Best Alaska Bear Viewing Excursions",
    metaDescription: "Best Alaska bear viewing for cruise passengers — Ketchikan streams, Haines lakes, Sitka sanctuary, and Icy Strait habitat.",
    heroSubtitle: "Brown bears at salmon streams and sanctuaries.",
    introduction: "Wild bear viewing peaks with salmon runs July through September. Sitka's Fortress of the Bear offers year-round sanctuary viewing for reliable encounters.",
    introductionDetail: "Permit-limited stream platforms book months ahead for peak weeks.",
    topPorts: [
      { slug: "ketchikan", reason: "Anan and Neets Bay stream viewing." },
      { slug: "haines", reason: "Chilkoot Lake drives." },
      { slug: "sitka", reason: "Fortress of the Bear sanctuary." },
      { slug: "icy-strait", reason: "Chichagof Island bear habitat tours." },
    ],
    recommendedExcursions: [
      { name: "Bear Viewing Day Trip", portSlug: "ketchikan", description: "Permit-controlled stream platforms.", duration: "5-6 hours" },
      { name: "Fortress of the Bear", portSlug: "sitka", description: "Sanctuary viewing for all ages.", duration: "2 hours" },
    ],
    comparisonTable: [
      { portSlug: "ketchikan", portName: "Ketchikan", bestFor: "Wild stream bears", bestExcursion: "Bear viewing", transferTime: "Boat/plane", rating: "4.8" },
      { portSlug: "sitka", portName: "Sitka", bestFor: "Sanctuary", bestExcursion: "Fortress of the Bear", transferTime: "Coach", rating: "4.7" },
    ],
    passengerRecommendations: [{ title: "Book wild viewing early", advice: "July–August slots sell out on popular streams." }],
    faqs: [{ question: "When is bear season?", answer: "Peak salmon runs July–September; sanctuaries operate all season." }, ...sharedFaqs],
  }),
  guide({
    slug: "best-alaska-cruise-ports",
    seoTitle: "Best Alaska Cruise Ports | Ranked for Excursions & Planning",
    title: "Best Alaska Cruise Ports",
    metaDescription: "Best Alaska cruise ports ranked for excursion depth, wildlife, glaciers, and cruise passenger logistics.",
    heroSubtitle: "Inside Passage and Gulf ports compared for your itinerary.",
    introduction: "Juneau, Skagway, and Ketchikan anchor Inside Passage loops. Seward and Whittier dominate Gulf endings. Haines, Sitka, and Icy Strait reward passengers who want quieter wildlife days.",
    introductionDetail: "Denali is a land extension — not a pier call — but essential for cruisetour planning.",
    topPorts: [
      { slug: "juneau", reason: "Deepest excursion menu — whales, glaciers, flightseeing." },
      { slug: "skagway", reason: "White Pass Railway essential experience." },
      { slug: "seward", reason: "Kenai Fjords — top Gulf highlight." },
      { slug: "ketchikan", reason: "Misty Fjords and bear viewing." },
      { slug: "icy-strait", reason: "Whale-focused private port." },
      { slug: "haines", reason: "Eagles and quiet wildlife." },
    ],
    recommendedExcursions: [],
    comparisonTable: [
      { portSlug: "juneau", portName: "Juneau", bestFor: "Variety", bestExcursion: "Whale watch", transferTime: "Dock", rating: "4.9" },
      { portSlug: "skagway", portName: "Skagway", bestFor: "Railway", bestExcursion: "White Pass", transferTime: "Walk", rating: "4.9" },
    ],
    passengerRecommendations: [{ title: "Match ports to interests", advice: "Use our excursion planner to align whales, bears, and glaciers with your itinerary." }],
    faqs: sharedFaqs,
  }),
  guide({
    slug: "best-time-to-cruise-alaska",
    seoTitle: "Best Time to Cruise Alaska | Seasons, Wildlife & Weather",
    title: "Best Time to Cruise Alaska",
    metaDescription: "Best time to cruise Alaska — May through September seasonality for whales, bears, glaciers, crowds, and weather.",
    heroSubtitle: "Month-by-month planning for wildlife, daylight, and crowd levels.",
    introduction: "Alaska's cruise season runs May through September. June and July offer peak whale activity and longest daylight. May and September bring fewer ships and lower prices with more rain.",
    introductionDetail: "Victoria, BC sometimes appears on repositioning itineraries — it is not an Alaska port but a common en-route stop before Canada & New England season.",
    topPorts: [
      { slug: "juneau", reason: "Strong all season — peak whales June–August." },
      { slug: "skagway", reason: "Railway operates full season." },
      { slug: "ketchikan", reason: "Bears peak mid-summer; rain year-round." },
    ],
    recommendedExcursions: [],
    comparisonTable: [],
    passengerRecommendations: [
      { title: "June–July for whales", advice: "Peak humpback activity and busiest ports." },
      { title: "July–September for bears", advice: "Salmon runs drive stream viewing." },
      { title: "May or September for value", advice: "Fewer ships — pack extra rain layers." },
    ],
    faqs: [
      { question: "Is Victoria part of Alaska cruising?", answer: "Victoria is in British Columbia, Canada — often a short stop on repositioning or mixed itineraries, not an Alaska excursion port." },
      { question: "What is the rainiest port?", answer: "Ketchikan averages 150+ inches annually — waterproof gear essential." },
      ...sharedFaqs,
    ],
  }),
  guide({
    slug: "alaska-cruise-with-denali",
    seoTitle: "Alaska Cruise with Denali | Land Extension Planning Guide",
    title: "Alaska Cruise with Denali",
    metaDescription: "Plan Alaska cruise with Denali land extensions — cruisetours, rail, park buses, and how Denali fits Gulf and Inside Passage itineraries.",
    heroSubtitle: "Pre- and post-cruise land tours to Denali National Park.",
    introduction: "Denali is not a ship port — it is the interior highlight on Alaska cruisetours. Passengers reach the park by Alaska Railroad or coach from Anchorage, Fairbanks, Seward, or Whittier connections.",
    introductionDetail: "Allow two to three nights for park buses, flightseeing, and weather buffers. Link to denalishoreexcursions.com for land tour depth.",
    topPorts: [
      { slug: "denali", reason: "Park entrance hub for buses and flightseeing." },
      { slug: "seward", reason: "Common rail connection on Gulf itineraries." },
      { slug: "whittier", reason: "Anchorage-area connection point." },
    ],
    recommendedExcursions: [
      { name: "Park Road Bus", portSlug: "denali", description: "Wildlife scanning into the park.", duration: "4-8 hours" },
      { name: "Denali Flightseeing", portSlug: "denali", description: "Summit views weather permitting.", duration: "1-2 hours" },
    ],
    comparisonTable: [],
    passengerRecommendations: [{ title: "Book lodges early", advice: "June–August park accommodation sells out months ahead." }],
    faqs: [{ question: "How many nights at Denali?", answer: "Two minimum; three recommended for flightseeing flexibility." }, ...sharedFaqs],
  }),
  guide({
    slug: "alaska-cruise-port-guides",
    seoTitle: "Alaska Cruise Port Guides | All Authority Port Pages",
    title: "Alaska Cruise Port Guides",
    metaDescription: "Index of Alaska cruise port authority guides — Juneau, Skagway, Ketchikan, Seward, Whittier, and more.",
    heroSubtitle: "Every Alaska port we cover with specialist booking links.",
    introduction: "Browse authority port guides for dock logistics, best excursions, and links to specialist local operators across Alaska's Inside Passage and Gulf ports.",
    introductionDetail: "Each guide includes FAQs, passenger tips, and cross-links to excursion types and ship schedules.",
    topPorts: [
      { slug: "juneau", reason: "Capital city port guide." },
      { slug: "skagway", reason: "Railway and Gold Rush guide." },
      { slug: "ketchikan", reason: "Rainforest and flightseeing guide." },
      { slug: "seward", reason: "Kenai Fjords gateway guide." },
    ],
    recommendedExcursions: [],
    comparisonTable: [],
    passengerRecommendations: [],
    faqs: sharedFaqs,
  }),
  guide({
    slug: "alaska-cruise-ship-schedules",
    seoTitle: "Alaska Cruise Ship Schedules | Port Call Planning Hub",
    title: "Alaska Cruise Ship Schedules",
    metaDescription: "Alaska cruise ship schedules hub — browse port calls by port, month, and year as verified data is imported.",
    heroSubtitle: "Plan excursions around your ship's arrival and departure.",
    introduction: "Ship schedules help you spot multi-ship days and plan excursion departures. Verified 2026 and 2027 data imports populate port, month, and analytics pages — empty until confirmed.",
    introductionDetail: "Start at the ship schedules hub and drill into your port-year page when data is available.",
    topPorts: [
      { slug: "juneau", reason: "Busiest Alaska schedule hub." },
      { slug: "ketchikan", reason: "High call volume including Ward Cove." },
      { slug: "skagway", reason: "Peak railway demand days." },
    ],
    recommendedExcursions: [],
    comparisonTable: [],
    passengerRecommendations: [{ title: "Check schedules before booking", advice: "Multi-ship days affect whale boats and railway availability." }],
    faqs: [{ question: "Where is schedule data?", answer: "Imports populate port JSON files — pages show planning content until verified rows exist." }, ...sharedFaqs],
  }),
  guide({
    slug: "alaska-cruise-excursion-planner",
    seoTitle: "Alaska Cruise Excursion Planner | Match Interests to Ports",
    title: "Alaska Cruise Excursion Planner",
    metaDescription: "Alaska cruise excursion planner — match whales, bears, glaciers, and railways to the best ports and months.",
    heroSubtitle: "Interest-led planning for Alaska cruise port days.",
    introduction: "Use the Alaska Excursion Finder to select interests — whales, bears, glaciers, eagles, dog sledding, railways, and more — and receive port, excursion type, and month recommendations.",
    introductionDetail: "This site is planning-only — use enquiry CTAs to connect with specialists when ready.",
    topPorts: [],
    recommendedExcursions: [],
    comparisonTable: [],
    passengerRecommendations: [],
    faqs: sharedFaqs,
  }),
];

export function getBestGuideBySlug(slug: string): BestGuidePage | undefined {
  return bestGuides.find((g) => g.slug === slug);
}

export function getAllBestGuideSlugs(): string[] {
  return bestGuides.map((g) => g.slug);
}
