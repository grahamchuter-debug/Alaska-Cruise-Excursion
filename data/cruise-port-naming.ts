import type { CruisePortNaming } from "./types";

/**
 * Maps each port slug to dock towns, terminals, and clarifying copy.
 * Search-friendly destination names stay on port.name / URLs.
 */
export const cruisePortNaming: Record<string, CruisePortNaming> = {
  "st-thomas": {
    dockTown: "Charlotte Amalie",
    terminals: ["Havensight Cruise Pier", "Crown Bay Cruise Terminal"],
    alternativeNames: [
      "U.S. Virgin Islands",
      "St Thomas USVI",
      "St. Thomas Virgin Islands",
    ],
    portGuideIntro:
      "Most cruise ships visiting St. Thomas dock in Charlotte Amalie at Havensight or Crown Bay. Cruise itineraries may refer to St. Thomas, Charlotte Amalie, or the U.S. Virgin Islands, but these generally refer to the same cruise destination.",
    scheduleIntro:
      "Most cruise ships scheduled at St. Thomas arrive in Charlotte Amalie at Havensight or Crown Bay. Itineraries may list St. Thomas or Charlotte Amalie, both refer to the same port area for planning shore excursions.",
  },
  cozumel: {
    dockTown: "San Miguel de Cozumel",
    terminals: ["Punta Langosta Pier", "International Pier", "Puerta Maya Cruise Center"],
    alternativeNames: ["Cozumel Mexico", "Cozumel Island", "Quintana Roo"],
    portGuideIntro:
      "Cruise ships calling at Cozumel dock in San Miguel de Cozumel at Punta Langosta, the International Pier, or Puerta Maya. Itineraries usually say Cozumel, but your ship ties up at one of these downtown piers.",
    scheduleIntro:
      "Cozumel cruise schedules cover arrivals at Punta Langosta, the International Pier, and Puerta Maya in San Miguel de Cozumel. Your itinerary may only say Cozumel, but published times apply to these pier locations.",
  },
  aruba: {
    dockTown: "Oranjestad",
    terminals: ["Oranjestad Cruise Terminal (downtown berths)"],
    alternativeNames: ["Aruba Netherlands", "Port of Oranjestad", "Aruba Island"],
    portGuideIntro:
      "Cruise ships visiting Aruba dock in Oranjestad at the downtown cruise terminal within walking distance of shops and taxis. Itineraries list Aruba, but your gangway opens onto Oranjestad's waterfront.",
    scheduleIntro:
      "Aruba cruise ship schedules show arrivals and departures at Oranjestad's downtown cruise terminal. Itineraries may say Aruba only, but ships dock in Oranjestad for shore excursion planning.",
  },
  curacao: {
    dockTown: "Willemstad",
    terminals: ["Mathey Wharf", "Mega Pier (Willemstad)"],
    alternativeNames: ["Curaçao Netherlands", "Curacao", "Curacao Island"],
    portGuideIntro:
      "Cruise ships calling at Curaçao dock in Willemstad at Mathey Wharf or the Mega Pier, steps from the UNESCO-listed Handelskade waterfront. Itineraries may say Curaçao or Curacao, but ships berth in Willemstad harbor.",
    scheduleIntro:
      "Curaçao cruise schedules reflect ship calls at Willemstad's Mathey Wharf and Mega Pier. Your itinerary may list Curaçao or Curacao, but arrival times apply to these Willemstad terminals.",
  },
  bonaire: {
    dockTown: "Kralendijk",
    terminals: ["Kralendijk Cruise Pier"],
    alternativeNames: ["Bonaire Caribbean", "Bonaire Island", "Kralendijk Bonaire"],
    portGuideIntro:
      "Cruise ships visiting Bonaire dock in Kralendijk at the town-center cruise pier. Itineraries list Bonaire, but your ship ties up along Kralendijk's compact waterfront within minutes of dive shops and restaurants.",
    scheduleIntro:
      "Bonaire cruise ship schedules cover calls at the Kralendijk cruise pier. Itineraries may say Bonaire only, but published port times refer to docking in Kralendijk.",
  },
  "grand-cayman": {
    dockTown: "George Town",
    terminals: ["George Town Tender Anchorage"],
    alternativeNames: ["Cayman Islands", "Grand Cayman Island", "George Town Cayman"],
    tenderNote: "Ships anchor offshore; passengers tender into George Town.",
    portGuideIntro:
      "Cruise ships visiting Grand Cayman anchor in George Town harbor and passengers tender to the George Town waterfront. Itineraries say Grand Cayman, but your port day begins at the tender landing in George Town, not at a walk-off pier.",
    scheduleIntro:
      "Grand Cayman cruise schedules list ship calls at George Town, where vessels anchor and use tenders. Itineraries may say Grand Cayman, but planning should assume tender time to George Town on port day.",
  },
  "st-maarten": {
    dockTown: "Philipsburg",
    terminals: ["Dr. A.C. Wathey Cruise & Cargo Facility"],
    alternativeNames: [
      "SXM",
      "Sint Maarten",
      "St Martin",
      "Saint Martin",
      "St. Maarten Dutch side",
    ],
    portGuideIntro:
      "Cruise ships calling at St. Maarten dock in Philipsburg at the Dr. A.C. Wathey Cruise Facility. Itineraries may list St. Maarten, Sint Maarten, or St. Martin, but ships berth on the Dutch side in Philipsburg.",
    scheduleIntro:
      "St. Maarten cruise schedules show arrivals at the Dr. A.C. Wathey terminal in Philipsburg. Itineraries may use St. Maarten, Sint Maarten, or St. Martin, but ship times apply to Philipsburg docking.",
  },
  tortola: {
    dockTown: "Road Town",
    terminals: ["Road Town Tender Landing"],
    alternativeNames: [
      "Tortola BVI",
      "British Virgin Islands",
      "Road Town Tortola",
    ],
    tenderNote: "Ships anchor in the harbor; passengers tender into Road Town.",
    portGuideIntro:
      "Cruise ships visiting Tortola anchor in Road Town harbor and passengers tender to the Road Town waterfront. Itineraries may say Tortola or the British Virgin Islands, but your port day starts at the tender landing in Road Town.",
    scheduleIntro:
      "Tortola cruise schedules reflect ship calls at Road Town, where vessels anchor and use tenders. Itineraries may list Tortola or the BVI, but allow tender time to Road Town when reading arrival times.",
  },
  nassau: {
    dockTown: "Nassau",
    terminals: ["Prince George Wharf"],
    alternativeNames: ["Nassau Bahamas", "New Providence", "Paradise Island (nearby)"],
    portGuideIntro:
      "Cruise ships calling at Nassau dock at Prince George Wharf along the downtown waterfront. Itineraries list Nassau or the Bahamas; your gangway opens onto Bay Street and the cruise port area in central Nassau.",
    scheduleIntro:
      "Nassau cruise ship schedules cover arrivals at Prince George Wharf downtown. Itineraries may say Nassau or the Bahamas, but published times apply to this main cruise pier.",
  },
  roatan: {
    dockTown: "Coxen Hole & Mahogany Bay",
    terminals: ["Mahogany Bay Cruise Center", "Coxen Hole Cruise Terminal"],
    alternativeNames: ["Roatan Honduras", "Roatán", "Mahogany Bay", "Coxen Hole"],
    portGuideIntro:
      "Cruise ships visiting Roatán dock at either Mahogany Bay Cruise Center or the Coxen Hole terminal. Itineraries list Roatán or Roatan, but your pier assignment determines taxi times and excursion pickup, check which terminal your ship uses.",
    scheduleIntro:
      "Roatán cruise schedules include calls at Mahogany Bay and Coxen Hole. Itineraries may say Roatán or Roatan only, but arrival times correspond to one of these two cruise terminals.",
  },
  "costa-maya": {
    dockTown: "Mahahual",
    terminals: ["Costa Maya Cruise Port (Mahahual village)"],
    alternativeNames: ["Costa Maya Mexico", "Mahahual", "Quintana Roo"],
    portGuideIntro:
      "Cruise ships calling at Costa Maya dock at the purpose-built cruise port in Mahahual village. Itineraries say Costa Maya, but your ship ties up at the Mahahual pier with the cruise village immediately ashore.",
    scheduleIntro:
      "Costa Maya cruise schedules show arrivals at the Mahahual cruise port. Itineraries list Costa Maya, but ship times apply to the village pier, not mainland Mexico ports.",
  },
  "puerto-limon": {
    dockTown: "Limón",
    terminals: ["Limón Cruise Terminal (JAPDEVA pier)"],
    alternativeNames: ["Puerto Limon Costa Rica", "Limón", "Puerto Limón CR", "Limon Cruise Port"],
    portGuideIntro:
      "Cruise ships calling at Puerto Limón dock at the Limón Cruise Terminal pier on Costa Rica's Caribbean coast. Itineraries may list Puerto Limón, Limón, or Costa Rica; your gangway opens onto the JAPDEVA terminal with organized excursion departures nearby.",
    scheduleIntro:
      "Puerto Limón cruise schedules cover arrivals at the Limón Cruise Terminal. Itineraries may say Puerto Limón, Limón, or Costa Rica, but published times apply to this Caribbean coast pier.",
  },
  progreso: {
    dockTown: "Progreso",
    terminals: ["Progreso International Terminal (long pier)"],
    alternativeNames: ["Progreso Mexico", "Yucatán", "Mérida (excursion gateway)"],
    portGuideIntro:
      "Cruise ships visiting Progreso dock at the Progreso International Terminal at the end of the Yucatán's long cruise pier. Itineraries may say Progreso or Yucatán; most excursions depart from the terminal area toward Mérida or Mayan sites inland.",
    scheduleIntro:
      "Progreso cruise schedules list calls at the Progreso International Terminal. Itineraries may say Progreso or Yucatán, but arrival and departure times apply to this pier, allow shuttle time along the cruise terminal access road.",
  },
  "puerto-plata": {
    dockTown: "Amber Cove & Taíno Bay",
    terminals: ["Amber Cove Cruise Center", "Taíno Bay Cruise Port"],
    alternativeNames: [
      "Amber Cove Dominican Republic",
      "Taíno Bay",
      "Puerto Plata city (nearby)",
    ],
    portGuideIntro:
      "Cruise ships calling at Puerto Plata dock at Amber Cove or Taíno Bay on the Dominican Republic's Amber Coast. Itineraries may list Puerto Plata, Amber Cove, or Taíno Bay, all refer to these cruise terminals, not downtown Puerto Plata city directly.",
    scheduleIntro:
      "Puerto Plata cruise schedules cover ship calls at Amber Cove and Taíno Bay. Itineraries may say Puerto Plata, Amber Cove, or Taíno Bay, but published times apply to whichever terminal your ship is assigned.",
  },
  samana: {
    dockTown: "Samaná",
    terminals: ["Samaná Cruise Terminal"],
    alternativeNames: [
      "Samana Dominican Republic",
      "Santa Bárbara de Samaná",
      "Samaná Bay",
    ],
    portGuideIntro:
      "Cruise ships visiting Samaná dock at the Samaná cruise terminal on the bay. Itineraries may list Samaná or Samana on the Dominican Republic's northeast peninsula, both refer to this port area for whale-watching and waterfall excursions.",
    scheduleIntro:
      "Samaná cruise ship schedules show arrivals at the Samaná cruise terminal. Itineraries may say Samaná or Samana, but port times apply to this bay-side terminal.",
  },
  "la-romana": {
    dockTown: "La Romana",
    terminals: ["Casa de Campo Cruise Port"],
    alternativeNames: [
      "La Romana Dominican Republic",
      "Casa de Campo",
      "Bayahibe (excursion launch point)",
    ],
    portGuideIntro:
      "Cruise ships calling at La Romana dock at the Casa de Campo Cruise Port southeast of the city. Itineraries list La Romana, but ships berth at this dedicated terminal, the main gateway for Saona Island catamaran excursions.",
    scheduleIntro:
      "La Romana cruise schedules reflect calls at the Casa de Campo Cruise Port. Itineraries may say La Romana only, but arrival times apply to this terminal rather than downtown La Romana.",
  },
  "ocho-rios": {
    dockTown: "Ocho Rios",
    terminals: ["Ocho Rios Cruise Pier"],
    alternativeNames: ["Ocho Rios Jamaica", "Jamaica north coast", "Ocho Rios Bay"],
    portGuideIntro:
      "Cruise ships visiting Ocho Rios dock at the Ocho Rios cruise pier on Jamaica's north coast. Itineraries may say Ocho Rios or Jamaica, for cruise passengers, the port day centers on this pier near Dunn's River Falls and Mystic Mountain.",
    scheduleIntro:
      "Ocho Rios cruise schedules list arrivals at the Ocho Rios cruise pier. Itineraries may say Ocho Rios or Jamaica north coast, but published times apply to this docking location.",
  },
  falmouth: {
    dockTown: "Falmouth",
    titleParenthetical: "Jamaica",
    terminals: ["Historic Falmouth Pier"],
    alternativeNames: ["Falmouth Jamaica", "Jamaica north coast", "Trelawny"],
    portGuideIntro:
      "Cruise ships calling at Falmouth dock at the Historic Falmouth Pier in the restored Georgian port town. Itineraries may list Falmouth or Jamaica, your gangway opens onto the heritage waterfront within walking distance of the town center.",
    scheduleIntro:
      "Falmouth cruise schedules show ship calls at the Historic Falmouth Pier. Itineraries may say Falmouth or Jamaica, but arrival and departure times apply to this north-coast cruise terminal.",
  },
  "montego-bay": {
    dockTown: "Montego Bay",
    terminals: ["Montego Bay Cruise Terminal"],
    alternativeNames: [
      "Montego Bay Jamaica",
      "MoBay",
      "Jamaica north coast",
    ],
    portGuideIntro:
      "Cruise ships visiting Montego Bay dock at the Montego Bay cruise terminal on Jamaica's north coast. Itineraries may say Montego Bay, MoBay, or Jamaica, your port day starts at this terminal with taxis to Doctor's Cave Beach and the Hip Strip.",
    scheduleIntro:
      "Montego Bay cruise schedules cover arrivals at the Montego Bay cruise terminal. Itineraries may list Montego Bay or MoBay, but published port times apply to this docking location.",
  },
};

export function getCruisePortNaming(slug: string): CruisePortNaming | undefined {
  return cruisePortNaming[slug];
}
