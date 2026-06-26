/** Infer cruise line from ship name when source data does not include it. */
export function inferCruiseLineFromShip(ship: string): string | null {
  const s = ship.trim();
  if (!s) return null;

  if (/^Norwegian\b/i.test(s)) return "Norwegian Cruise Line";
  if (/^Carnival\b/i.test(s)) return "Carnival Cruise Line";
  if (/^Disney\b/i.test(s)) return "Disney Cruise Line";
  if (/^Celebrity\b/i.test(s)) return "Celebrity Cruises";
  if (/^MSC\b/i.test(s)) return "MSC Cruises";
  if (/\bPrincess\b/i.test(s)) return "Princess Cruises";
  if (/\bOf The Seas\b/i.test(s)) return "Royal Caribbean";
  if (/^Star Of The Seas|^Icon Of The Seas|^Wonder Of The Seas|^Harmony Of The Seas/i.test(s)) {
    return "Royal Caribbean";
  }
  if (/^Grandeur Of The Seas|^Rhapsody Of The Seas|^Enchantment Of The Seas/i.test(s)) {
    return "Royal Caribbean";
  }
  if (/^Azamara\b/i.test(s)) return "Azamara";
  if (
    /^(Nieuw Amsterdam|Eurodam|Westerdam|Zaandam|Noordam|Oosterdam|Volendam|Rotterdam|Koningsdam|Zuiderdam|Nieuw Statendam)\b/i.test(
      s,
    )
  ) {
    return "Holland America Line";
  }
  if (/^Holland America\b/i.test(s)) return "Holland America Line";
  if (/^Viking\b/i.test(s)) return "Viking Ocean Cruises";
  if (/^Seabourn\b/i.test(s)) return "Seabourn";
  if (/^Oceania\b/i.test(s)) return "Oceania Cruises";
  if (/^Regent\b|^Seven Seas\b/i.test(s)) return "Regent Seven Seas";
  if (/\bSeven Seas\b/i.test(s)) return "Regent Seven Seas";
  if (/^Marella\b/i.test(s)) return "Marella Cruises";
  if (/^Silver\b/i.test(s)) return "Silversea";
  if (/^Wind Star|^Star Pride|^Star Legend|^Star Seeker/i.test(s)) return "Windstar Cruises";
  if (/^Crystal\b/i.test(s)) return "Crystal Cruises";
  if (/^Explora\b/i.test(s)) return "Explora Journeys";
  if (/^Brilliant Lady|^Resilient Lady|^Valiant Lady|^Scarlet Lady/i.test(s)) return "Virgin Voyages";
  if (/^Queen (Mary|Elizabeth|Victoria)\b/i.test(s)) return "Cunard";

  return null;
}

export function resolveCruiseLine(ship: string, stored?: string): string {
  if (stored && stored !== "Verify with cruise line") return stored;
  return inferCruiseLineFromShip(ship) ?? stored ?? "Unknown";
}
