import type { FeaturedPortCard } from "./types";
import { getAllPortSlugs } from "./ports";
import { schedulePorts } from "./schedules";
import { getSchedulePortCount } from "./content-inventory";

export const FEATURED_PORT_SLUGS = getAllPortSlugs();

export const featuredPortCards: FeaturedPortCard[] = [
  { slug: "juneau", description: "Whale watching, Mendenhall Glacier, and helicopter icefield landings from downtown docks.", bestFor: "Whales & glaciers" },
  { slug: "skagway", description: "White Pass Railway, Yukon scenery, and Gold Rush Broadway walkable from the pier.", bestFor: "Railway & history" },
  { slug: "ketchikan", description: "Misty Fjords flightseeing, totem parks, and seasonal bear viewing in the Tongass rainforest.", bestFor: "Flightseeing & bears" },
  { slug: "seward", description: "Kenai Fjords day cruises with glaciers, orcas, puffins, and sea otters.", bestFor: "Fjord wildlife" },
  { slug: "icy-strait", description: "Whale watching, ZipRider, and Tlingit culture at a compact tender port.", bestFor: "Whales & adventure" },
  { slug: "haines", description: "Eagle preserve floats, Chilkoot Lake wildlife, and quieter port days.", bestFor: "Eagles & nature" },
  { slug: "sitka", description: "Fortress of the Bear, Raptor Center, and Russian-American heritage.", bestFor: "Bears & culture" },
  { slug: "whittier", description: "Prince William Sound glacier cruises and Anchorage tunnel connections.", bestFor: "Sound glaciers" },
  { slug: "ward-cove", description: "Ketchikan-area berth — plan transfers before walkable downtown tours.", bestFor: "Transfer planning" },
  { slug: "denali", description: "Pre/post-cruise land extension — park buses, flightseeing, cruisetours.", bestFor: "Land extension" },
];

export const HOMEPAGE_SCHEDULE_FEATURED = [
  { slug: "juneau", status: "live" as const },
  { slug: "skagway", status: "coming-soon" as const },
  { slug: "ketchikan", status: "coming-soon" as const },
  { slug: "seward", status: "coming-soon" as const },
] as const;

/** @deprecated Use HOMEPAGE_SCHEDULE_FEATURED */
export const HOMEPAGE_SCHEDULE_SLUGS = HOMEPAGE_SCHEDULE_FEATURED.map((item) => item.slug);

export function getHomepageFaqs() {
  return [
    {
      question: "What is Alaska Cruise Excursion?",
      answer:
        "An independent Alaska cruise planning authority — compare ports, excursion types, ship schedules, and specialist local operators across Inside Passage and Gulf routes.",
    },
    {
      question: "Which Alaska port is best for whale watching?",
      answer: "Juneau and Icy Strait rank highest for dedicated whale tours. Seward combines whales with Kenai Fjords glacier scenery.",
    },
    {
      question: "Is this site bookable?",
      answer: "This is a planning hub — use enquiry CTAs and linked specialist sites when you are ready to book excursions.",
    },
    {
      question: "Which Alaska ports have live ship schedules?",
      answer:
        "Juneau is the only port with live imported ship schedules on this site today. Skagway, Ketchikan, Seward, Whittier, Haines, Sitka, Icy Strait, and Ward Cove have schedule hub pages while monthly data is imported and verified — we do not publish placeholder sailings.",
    },
    {
      question: "Does Victoria count as Alaska?",
      answer: "Victoria, BC is sometimes on repositioning itineraries but is not an Alaska port — it belongs to future Canada & New England content.",
    },
  ];
}

export function getHomepageSchedulePorts() {
  return HOMEPAGE_SCHEDULE_SLUGS.map((slug) => schedulePorts.find((p) => p.slug === slug)).filter(Boolean);
}
