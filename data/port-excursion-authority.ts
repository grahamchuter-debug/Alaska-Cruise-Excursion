import type { PortExcursionAuthorityPage } from "./types";

export const portExcursionAuthority: PortExcursionAuthorityPage = {
  slug: "best-alaska-shore-excursions",
  title: "Best Shore Excursion at Every Alaska Port",
  seoTitle: "Best Shore Excursion at Every Alaska Port | Authority Guide",
  metaDescription: "Best shore excursion at every Alaska cruise port — Juneau, Skagway, Ketchikan, Seward, and more with specialist links.",
  heroSubtitle: "One signature excursion per Alaska port with authority guides and specialist operator links.",
  introduction: "Each Alaska port has a defining excursion — whale watching in Juneau, White Pass in Skagway, Kenai Fjords from Seward. This guide maps the top pick at every port we cover.",
  introductionDetail: "Open port authority guides for logistics, then use specialist sites to compare independent tour options.",
  portTable: [
    { portSlug: "juneau", portName: "Juneau", bestExcursion: "Whale Watching Cruise", duration: "3-4 hours", bestFor: "Wildlife", activityLevel: "Easy", whyRecommended: "Alaska's most reliable dedicated whale watching from downtown piers." },
    { portSlug: "skagway", portName: "Skagway", bestExcursion: "White Pass Railway", duration: "3-4 hours", bestFor: "Railway", activityLevel: "Easy", whyRecommended: "Iconic narrow-gauge rail through alpine scenery." },
    { portSlug: "ketchikan", portName: "Ketchikan", bestExcursion: "Misty Fjords Flightseeing", duration: "2-3 hours", bestFor: "Flightseeing", activityLevel: "Easy", whyRecommended: "Wilderness fjords inaccessible by road or day boat." },
    { portSlug: "seward", portName: "Seward", bestExcursion: "Kenai Fjords Cruise", duration: "6-8 hours", bestFor: "Glaciers & wildlife", activityLevel: "Easy", whyRecommended: "Combined tidewater glaciers, orcas, and puffins." },
    { portSlug: "whittier", portName: "Whittier", bestExcursion: "Prince William Sound Cruise", duration: "4-6 hours", bestFor: "Glaciers", activityLevel: "Easy", whyRecommended: "Tidewater glaciers with Anchorage-area connections." },
    { portSlug: "icy-strait", portName: "Icy Strait", bestExcursion: "Whale Watching", duration: "3-4 hours", bestFor: "Wildlife", activityLevel: "Easy", whyRecommended: "Whale-focused port with strong summer sighting rates." },
    { portSlug: "haines", portName: "Haines", bestExcursion: "Eagle Preserve Float", duration: "3-4 hours", bestFor: "Eagles", activityLevel: "Easy", whyRecommended: "Chilkat Eagle Preserve is among Alaska's best raptor habitat." },
    { portSlug: "sitka", portName: "Sitka", bestExcursion: "Fortress of the Bear", duration: "2 hours", bestFor: "Bears", activityLevel: "Easy", whyRecommended: "Reliable brown bear viewing for all ages." },
    { portSlug: "ward-cove", portName: "Ward Cove", bestExcursion: "Misty Fjords (Ward Cove pickup)", duration: "2-3 hours", bestFor: "Flightseeing", activityLevel: "Easy", whyRecommended: "Same Ketchikan-area highlight with explicit terminal pickup." },
    { portSlug: "denali", portName: "Denali", bestExcursion: "Park Road Bus Tour", duration: "4-8 hours", bestFor: "Land extension", activityLevel: "Easy", whyRecommended: "Wildlife scanning into Denali National Park on cruisetours." },
  ],
  bestBeachExcursions: [],
  bestSnorkellingExcursions: [],
  bestWildlifeExcursions: [
    { portSlug: "juneau", excursionName: "Whale Watching", description: "Humpbacks in Stephens Passage." },
    { portSlug: "ketchikan", excursionName: "Bear Viewing", description: "Seasonal stream platforms." },
    { portSlug: "haines", excursionName: "Eagle Preserve Float", description: "River float through eagle habitat." },
  ],
  bestFamilyExcursions: [
    { portSlug: "sitka", excursionName: "Fortress of the Bear", description: "Sanctuary viewing for mixed ages." },
    { portSlug: "juneau", excursionName: "Mendenhall Glacier", description: "Accessible trails and visitor centre." },
  ],
  bestPrivateExcursions: [
    { portSlug: "juneau", excursionName: "Private whale charter", description: "Flexible photography routing." },
    { portSlug: "skagway", excursionName: "Private White Pass car", description: "Reserved rail seating." },
  ],
  faqs: [
    { question: "What is the best excursion in Juneau?", answer: "Whale watching ranks highest for first-time visitors; add Mendenhall if time allows." },
    { question: "Is Denali a cruise port?", answer: "No — Denali is a land extension on cruisetours, not a pier call." },
  ],
};
