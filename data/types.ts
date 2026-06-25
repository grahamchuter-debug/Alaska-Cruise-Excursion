export type PortImageTheme =
  | "beach"
  | "snorkel"
  | "rainforest"
  | "fortress"
  | "viewpoint"
  | "town"
  | "catamaran"
  | "wildlife";

export interface Port {
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  overview: string;
  bestFor: string;
  bestExcursions: ExcursionItem[];
  portInfo: PortInfo;
  passengerTips: string[];
  topAttractions: Attraction[];
  specialistUrl: string;
  specialistName: string;
  faqs: FAQ[];
  highlights: string[];
  imageAlt: string;
  imageTheme: PortImageTheme;
}

export interface PortRelatedLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface CruisePortNaming {
  dockTown: string;
  /** Geographic qualifier for titles when dockTown repeats the port name (e.g. "Jamaica"). */
  titleParenthetical?: string;
  alternativeNames: string[];
  terminals: string[];
  portGuideIntro: string;
  scheduleIntro: string;
  tenderNote?: string;
}

export interface ExcursionItem {
  name: string;
  description: string;
  duration: string;
  type: string;
  rating?: number;
}

export type TaxiNeeded = "yes" | "no" | "optional";
export type WalkingRealistic = "yes" | "no" | "depends";

/** Phase 1 logistics for each port's signature excursion. */
export interface SignatureExcursionLogistics {
  portSlug: string;
  excursionName: string;
  meetingPoint: string;
  distanceFromShip: string;
  walkingTime: string;
  taxiNeeded: TaxiNeeded;
  walkingRealistic: WalkingRealistic;
  likelyPier: string;
  /** Google Maps search or place URL when destination is well established. */
  googleMapsUrl?: string;
  googleMapsLabel?: string;
  passengerNote: string;
}

export const MEETING_POINT_DISCLAIMER =
  "Meeting points can vary by operator and ship berth. Always check your final voucher before travelling.";

export interface PortInfo {
  dockType: string;
  walkingDistance: string;
  tenderRequired: boolean;
  currency: string;
  language: string;
  timeZone: string;
  safetyNotes: string;
}

export interface Attraction {
  name: string;
  description: string;
  distance: string;
  /** Optional authority guide path on caribbeanshoreexcursion.com */
  guideHref?: string;
}

export interface AttractionGuidePage {
  slug: string;
  portSlug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  whatItIs: string;
  whyCruisePassengersVisit: string;
  distanceFromPort: string;
  bestFor: string[];
  facilities: string[];
  timeNeeded: string;
  cruiseSuitability: string;
  recommendedExcursions: { name: string; description: string; href?: string }[];
  relatedGuideHrefs: { label: string; href: string }[];
  faqs: FAQ[];
  category: "beach" | "sightseeing" | "town";
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ComparisonCategory {
  portA: string;
  portB: string;
}

export interface ComparisonTableRow {
  category: string;
  portA: string;
  portB: string;
}

export interface Comparison {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  portA: string;
  portB: string;
  portASlug: string;
  portBSlug: string;
  summary: string;
  overview: ComparisonCategory;
  beaches: ComparisonCategory;
  excursions: ComparisonCategory;
  families: ComparisonCategory;
  couples: ComparisonCategory;
  snorkeling: ComparisonCategory;
  foodAndDrink: ComparisonCategory;
  easeFromPort: ComparisonCategory;
  bestForFirstTimers: ComparisonCategory;
  cruisePortExperience?: ComparisonCategory;
  bestOverall: string;
  comparisonTable: ComparisonTableRow[];
  verdict: string;
  faqs: FAQ[];
  clusterSlugs?: string[];
  relatedComparisonSlugs?: string[];
}

export interface ClusterComparisonRow {
  portSlug: string;
  portName: string;
  bestFor: string;
  bestExcursion: string;
  beachQuality: string;
  snorkelling: string;
  families: string;
  privateTours: string;
  easeFromShip: string;
}

export interface ClusterPortDayPlans {
  portSlug: string;
  easyDay: string;
  adventureDay: string;
  beachDay: string;
  privateTourDay: string;
}

export interface ClusterTravellerPick {
  travellerType: string;
  portSlug: string;
  excursionName: string;
  description: string;
  guideHref: string;
}

export interface TopicClusterData {
  slug: string;
  portSlugs: string[];
  portCardNotes: Record<string, { shortDescription: string; topExcursionType: string }>;
  comparisonTable: ClusterComparisonRow[];
  dayPlans: ClusterPortDayPlans[];
  travellerPicks: ClusterTravellerPick[];
  comparisonSlugs: string[];
  bestGuideSlugs: string[];
  nextStepCta: string;
}

export interface BestGuidePort {
  slug: string;
  reason: string;
}

export interface BestGuideExcursion {
  name: string;
  portSlug: string;
  description: string;
  duration: string;
}

export interface BestGuideTableRow {
  portSlug: string;
  portName: string;
  bestFor: string;
  bestExcursion: string;
  transferTime: string;
  rating: string;
}

export type PortExcursionScoreTier =
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Fair"
  | "Limited"
  | "Land only";

export interface PortExcursionCategoryScores {
  whaleWatching: PortExcursionScoreTier;
  bearViewing: PortExcursionScoreTier;
  glaciers: PortExcursionScoreTier;
  railways: PortExcursionScoreTier;
  walkability: PortExcursionScoreTier;
  families: PortExcursionScoreTier;
  adventure: PortExcursionScoreTier;
  photography: PortExcursionScoreTier;
  value: PortExcursionScoreTier;
  firstTime: PortExcursionScoreTier;
}

export interface PortExcursionMatrixRow {
  portSlug: string;
  portName: string;
  /** e.g. pre/post-cruise land extension — not a pier call */
  portNote?: string;
  scores: PortExcursionCategoryScores;
}

export interface PortCategoryVerdict {
  category: string;
  winnerSlug: string;
  winnerName: string;
  verdict: string;
  runnerUpSlug?: string;
  runnerUpName?: string;
}

export interface PassengerRecommendation {
  title: string;
  advice: string;
}

export interface BestForCategoryPick {
  category: string;
  description: string;
  portSlug: string;
  excursionName: string;
}

export interface BestGuideSeasonality {
  caribbeanOverview: string;
  bestMonths: string;
  seaConditions: string;
  portNotes?: { portSlug: string; note: string }[];
}

export interface ShoreVsBoatRow {
  aspect: string;
  shoreEntry: string;
  boatRequired: string;
}

export interface ShoreVsBoatComparison {
  introduction: string;
  rows: ShoreVsBoatRow[];
}

export interface PricingBand {
  tier: string;
  range: string;
  description: string;
  examplePorts: string;
}

export interface TrustSignal {
  title: string;
  detail: string;
}

export interface AdditionalPortSection {
  slug: string;
  heading: string;
  reason: string;
  recommendedExcursion: { name: string; description: string; duration: string };
}

export interface BestGuidePage {
  slug: string;
  seoTitle: string;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  introduction: string;
  introductionDetail: string;
  topPorts: BestGuidePort[];
  recommendedExcursions: BestGuideExcursion[];
  comparisonTable: BestGuideTableRow[];
  passengerRecommendations: PassengerRecommendation[];
  faqs: FAQ[];
  excursionTypeSlug?: string;
  bestForCategories?: BestForCategoryPick[];
  seasonality?: BestGuideSeasonality;
  shoreVsBoat?: ShoreVsBoatComparison;
  pricingBands?: PricingBand[];
  trustSignals?: TrustSignal[];
  additionalPortSections?: AdditionalPortSection[];
  portExcursionMatrix?: PortExcursionMatrixRow[];
  categoryVerdicts?: PortCategoryVerdict[];
}

export interface PortExcursionAuthorityRow {
  portSlug: string;
  portName: string;
  bestExcursion: string;
  duration: string;
  bestFor: string;
  activityLevel: "Easy" | "Moderate" | "Active";
  whyRecommended: string;
}

export interface PortExcursionCategoryPick {
  portSlug: string;
  excursionName: string;
  description: string;
}

export interface PortExcursionAuthorityPage {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  introduction: string;
  introductionDetail: string;
  portTable: PortExcursionAuthorityRow[];
  bestBeachExcursions: PortExcursionCategoryPick[];
  bestSnorkellingExcursions: PortExcursionCategoryPick[];
  bestWildlifeExcursions: PortExcursionCategoryPick[];
  bestFamilyExcursions: PortExcursionCategoryPick[];
  bestPrivateExcursions: PortExcursionCategoryPick[];
  faqs: FAQ[];
}

export interface ItineraryDayPlan {
  portSlug: string;
  title: string;
  morning: string;
  afternoon: string;
  tip: string;
}

export interface ItineraryPortRecommendation {
  portSlug: string;
  title: string;
  advice: string;
}

export interface ItineraryExcursion {
  name: string;
  portSlug: string;
  description: string;
}

export interface ItineraryPlannerPage {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  overview: string;
  overviewDetail: string;
  itineraryHighlights: string[];
  topPortSlugs: string[];
  bestExcursions: ItineraryExcursion[];
  suggestedDayPlans: ItineraryDayPlan[];
  bestBeaches: ItineraryPortRecommendation[];
  bestSnorkelling: ItineraryPortRecommendation[];
  familyRecommendations: ItineraryPortRecommendation[];
  privateTourRecommendations: ItineraryPortRecommendation[];
  regionPageSlug: string;
  bestGuideSlugs: string[];
  faqs: FAQ[];
}

export interface ExcursionTypePortRecommendation {
  portSlug: string;
  portName: string;
  excursions: string[];
}

export interface ExcursionTypeLink {
  href: string;
  label: string;
  description?: string;
}

export interface ExcursionTypeSpecialistSite {
  portSlug: string;
  portName: string;
  siteLabel: string;
  siteUrl: string;
}

export interface ExcursionTypeImage {
  src: string;
  alt: string;
}

export interface ExcursionTypeSuitability {
  family: string;
  firstTimeCruisers: string;
  mobility: string;
}

export interface ExcursionType {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  whatToExpect: string[];
  bestPorts: { slug: string; name: string; reason: string }[];
  tips: string[];
  faqs: FAQ[];
  whyPassengersChoose?: string[];
  suitability?: ExcursionTypeSuitability;
  /** Enriched in excursion-type-pathways.ts */
  recommendedByPort?: ExcursionTypePortRecommendation[];
  authoritySectionTitle?: string;
  authorityLinks?: ExcursionTypeLink[];
  specialistSectionTitle?: string;
  specialistSites?: ExcursionTypeSpecialistSite[];
  bookingPathways?: ExcursionTypeLink[];
  heroImage?: ExcursionTypeImage;
  categoryImage?: ExcursionTypeImage;
}

export interface CruiseLineItinerary {
  name: string;
  duration: string;
  ports: string;
  description: string;
}

export interface CruiseLineExcursionRec {
  name: string;
  portSlug: string;
  description: string;
  duration: string;
}

export interface CruiseLinePortRecommendation {
  title: string;
  portSlug: string;
  advice: string;
}

export interface CruiseLine {
  slug: string;
  pageSlug: string;
  name: string;
  tagline: string;
  seoTitle: string;
  metaDescription: string;
  overview: string;
  overviewDetail: string;
  caribbeanRoutes: string[];
  popularItineraries: CruiseLineItinerary[];
  popularPorts: { slug: string; name: string }[];
  recommendedExcursions: CruiseLineExcursionRec[];
  familyRecommendations: CruiseLinePortRecommendation[];
  beachRecommendations: CruiseLinePortRecommendation[];
  adventureRecommendations: CruiseLinePortRecommendation[];
  comparisonTable: BestGuideTableRow[];
  excursionTips: string[];
  bookingTips: string[];
  faqs: FAQ[];
}

export interface CruiseLineExcursionCategory {
  category: string;
  href: string;
  picks: { name: string; portSlug: string; description: string }[];
}

export interface CruiseLinePlanningProfile {
  fleetSize: string;
  passengerProfile: string;
  bestFor: string[];
  shipSlugs: string[];
  excursionCategories: CruiseLineExcursionCategory[];
  planningAdvice: {
    independentExcursions: string;
    returnTiming: string;
    tenderPorts: string;
    peakDays: string;
    bookingAdvice: string;
  };
  plannerLinks: { label: string; href: string }[];
  comparisonLinks: { label: string; href: string }[];
  bestGuideLinks: { label: string; href: string }[];
}

export interface ShipRecommendation {
  title: string;
  portSlug: string;
  advice: string;
}

export interface CruiseShip {
  slug: string;
  name: string;
  cruiseLineSlug: string;
  seoTitle: string;
  metaDescription: string;
  tagline: string;
  overview: string;
  caribbeanItineraries: string[];
  commonPortSlugs: string[];
  recommendedExcursions: { name: string; portSlug: string; description: string }[];
  familyRecommendations?: ShipRecommendation[];
  beachRecommendations?: ShipRecommendation[];
  snorkellingRecommendations?: ShipRecommendation[];
  privateTourRecommendations?: ShipRecommendation[];
  relatedShipSlugs?: string[];
  planningAdvice: string[];
  faqs: FAQ[];
  featuredPage: boolean;
}

export interface ShipSchedulePort {
  slug: string;
  name: string;
  country: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  scheduleOverview: string;
  planningTips?: string[];
  faqs?: FAQ[];
  relatedPortSlugs: string[];
  excursionTypeSlugs: string[];
  usesTender?: boolean;
}

export interface ScheduleEntry {
  date: string;
  ship: string;
  cruiseLine: string;
  arrival: string;
  departure: string;
  timeInPort?: string;
  passengers?: string;
  notes?: string;
  isPlaceholder?: boolean;
  verified?: boolean;
  source?: string;
}

export interface CruiseTip {
  title: string;
  excerpt: string;
  content: string;
}

export interface FeaturedPortCard {
  slug: string;
  description: string;
  bestFor: string;
}

export interface BeachGuide {
  name: string;
  description: string;
}

export interface SnorkelSite {
  site: string;
  description: string;
}

export interface PrivateTourOption {
  name: string;
  description: string;
}

export interface PortAuthorityContent {
  seoTitle: string;
  seoDescription: string;
  whyVisit: string[];
  bestBeaches: BeachGuide[];
  bestForFamilies: string[];
  bestForCouples: string[];
  snorkelling: SnorkelSite[];
  privateTours: PrivateTourOption[];
}

export interface PortPlanningSnapshot {
  timeInPort: string;
  bestFor: string;
  walkingRequired: string;
  familyFriendly: string;
  privateTourFriendly: string;
  returnToShipConfidence: string;
}

export interface TypicalCruiseDayStep {
  time: string;
  activity: string;
}

export interface PortPlanningCard {
  label: string;
  href: string;
  guideHref: string;
  teaser: string;
  tone: "sand" | "reef" | "family" | "wildlife" | "private";
}

export interface RegionalCruisePlannerPage {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  overview: string;
  overviewDetail: string;
  portComparison: string;
  comparisonTable: BestGuideTableRow[];
  topPortSlugs: string[];
  bestExcursions: ItineraryExcursion[];
  bestBeaches: ItineraryPortRecommendation[];
  privateTourRecommendations: ItineraryPortRecommendation[];
  familyRecommendations: ItineraryPortRecommendation[];
  regionPageSlug: string;
  parentPlannerSlug: string;
  relatedRegionalPlannerSlugs: string[];
  excursionTypeSlugs: string[];
  bestGuideSlugs: string[];
  faqs: FAQ[];
}

export interface RegionPage {
  slug: string;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  overview: string;
  portComparison: string;
  recommendedExcursions: string[];
  portSlugs: string[];
  excursionTypeSlugs: string[];
  relatedRegionSlugs: string[];
}
