# Cruise Planner Ship & Itinerary Audit

Audit date: 2026-06-14

## Scope

Reviewed how cruise line, ship, sailing year, and sailing month affect Caribbean Excursion Finder port selection, recommendations, Cruise Day Plan PDFs, Combined Cruise Planner PDFs, and ship schedule links.

## How selection works

| Input | Affects port presets? | Affects schedule links? |
| --- | --- | --- |
| Cruise line | Yes — line `popularPorts` fallback when no ship selected | Yes (via ship when selected) |
| Ship | Yes — `commonPortSlugs` in `data/ships.ts`, sliced to 5 visible ports | Yes |
| Sailing year | No | Yes — `getBestScheduleUrl` |
| Sailing month | No | Yes — `getBestScheduleUrl` |

Resolution order (`lib/finder-itinerary-ports.ts`):

1. Ship `commonPortSlugs` filtered to visible ports (homepage: 19 featured ports; full finder: all ports)
2. Cruise line `popularPorts` fallback if ship missing or has no visible ports
3. Empty if neither is set

## Bug fixed

**Issue:** `CaribbeanExcursionFinder` keyed itinerary updates by `ports.join(",")` only. Switching between ships (or line → ship) that resolved to the same five ports did not re-apply presets or clear recommendation results — ship-specific excursion boosts and PDF metadata stayed stale.

**Fix:** Key by `${cruiseLineSlug}|${shipSlug}`; clear ref and results when cruise line changes.

## Ships audited (20)

All ships have ship-specific `commonPortSlugs`. No ship relies on cruise-line fallback when a ship is selected.

| Ship | Line | commonPortSlugs (full list) | Homepage preset (≤5) | Line fallback (no ship) | Rec vs ports | Primary route |
| --- | --- | --- | --- | --- | --- | --- |
| Icon of the Seas | Royal Caribbean | cozumel, st-thomas, nassau, roatan, st-maarten, aruba | cozumel, st-thomas, nassau, roatan, st-maarten | cozumel, st-thomas, roatan, nassau, aruba | OK | 7-night Eastern Caribbean: St. Thomas, St. Maarten, and… |
| Star of the Seas | Royal Caribbean | cozumel, st-thomas, nassau, roatan, costa-maya, st-maarten | cozumel, st-thomas, nassau, roatan, costa-maya | cozumel, st-thomas, roatan, nassau, aruba | OK | 7-night Eastern Caribbean with St. Thomas and Philipsbu… |
| Wonder of the Seas | Royal Caribbean | cozumel, st-thomas, nassau, roatan, aruba, grand-cayman | cozumel, st-thomas, nassau, roatan, aruba | cozumel, st-thomas, roatan, nassau, aruba | OK | 7-night Eastern Caribbean: St. Thomas, St. Maarten, Nas… |
| Utopia of the Seas | Royal Caribbean | nassau, cozumel, costa-maya | nassau, cozumel, costa-maya | cozumel, st-thomas, roatan, nassau, aruba | OK | 3-4 night Bahamas with Nassau and Perfect Day at CocoCa… |
| Symphony of the Seas | Royal Caribbean | cozumel, st-thomas, nassau, roatan, st-maarten | cozumel, st-thomas, nassau, roatan, st-maarten | cozumel, st-thomas, roatan, nassau, aruba | OK | 7-night Eastern Caribbean: St. Thomas, St. Maarten, and… |
| Mardi Gras | Carnival | nassau, puerto-plata, cozumel, costa-maya, st-maarten, grand-cayman | nassau, puerto-plata, cozumel, costa-maya, st-maarten | cozumel, grand-cayman, roatan, puerto-plata, nassau | OK | 6-8 night Eastern Caribbean with Amber Cove and St. Maa… |
| Carnival Celebration | Carnival | nassau, puerto-plata, cozumel, costa-maya, st-maarten, grand-cayman | nassau, puerto-plata, cozumel, costa-maya, st-maarten | cozumel, grand-cayman, roatan, puerto-plata, nassau | OK | 6-8 night Eastern Caribbean with Amber Cove and St. Maa… |
| Carnival Jubilee | Carnival | cozumel, costa-maya, roatan, nassau | cozumel, costa-maya, roatan, nassau | cozumel, grand-cayman, roatan, puerto-plata, nassau | OK | 7-night Western Caribbean from Galveston: Cozumel, Roat… |
| Norwegian Prima | Norwegian | cozumel, st-thomas, nassau, st-maarten, costa-maya, roatan | cozumel, st-thomas, nassau, st-maarten, costa-maya | st-thomas, st-maarten, cozumel, ocho-rios, nassau | OK | 7-night Eastern Caribbean: St. Thomas, St. Maarten, and… |
| Norwegian Viva | Norwegian | st-thomas, st-maarten, nassau, cozumel, roatan | st-thomas, st-maarten, nassau, cozumel, roatan | st-thomas, st-maarten, cozumel, ocho-rios, nassau | OK | 7-night Eastern Caribbean with St. Thomas and St. Maart… |
| Norwegian Aqua | Norwegian | cozumel, costa-maya, roatan, st-thomas, nassau | cozumel, costa-maya, roatan, st-thomas, nassau | st-thomas, st-maarten, cozumel, ocho-rios, nassau | OK | 7-night Eastern Caribbean: St. Thomas, St. Maarten, and… |
| MSC World America | MSC | cozumel, costa-maya, roatan, nassau, puerto-plata | cozumel, costa-maya, roatan, nassau, puerto-plata | nassau, cozumel, st-maarten, puerto-plata, roatan | OK | 7-night Bahamas and Caribbean with Ocean Cay and Nassau… |
| MSC Seascape | MSC | cozumel, costa-maya, nassau, puerto-plata, roatan | cozumel, costa-maya, nassau, puerto-plata, roatan | nassau, cozumel, st-maarten, puerto-plata, roatan | OK | 7-night Western Caribbean from Galveston: Cozumel, Roat… |
| MSC Seashore | MSC | nassau, cozumel, st-maarten, puerto-plata | nassau, cozumel, st-maarten, puerto-plata | nassau, cozumel, st-maarten, puerto-plata, roatan | OK | 7-night Eastern Caribbean with St. Maarten and Ocean Ca… |
| Celebrity Beyond | Celebrity | cozumel, st-maarten, aruba, curacao, st-thomas | cozumel, st-maarten, aruba, curacao, st-thomas | st-thomas, st-maarten, aruba, cozumel, curacao | OK | 7-night Eastern Caribbean with St. Thomas and St. Maart… |
| Celebrity Ascent | Celebrity | st-thomas, st-maarten, puerto-plata, aruba, curacao | st-thomas, st-maarten, puerto-plata, aruba, curacao | st-thomas, st-maarten, aruba, cozumel, curacao | OK | 7-night Eastern Caribbean with St. Thomas and St. Maart… |
| Celebrity Apex | Celebrity | cozumel, aruba, st-maarten, grand-cayman, st-thomas | cozumel, aruba, st-maarten, grand-cayman, st-thomas | st-thomas, st-maarten, aruba, cozumel, curacao | OK | 7-night Eastern Caribbean with St. Maarten and St. Thom… |
| Sun Princess | Princess | st-thomas, st-maarten, cozumel, aruba, grand-cayman, roatan | st-thomas, st-maarten, cozumel, aruba, grand-cayman | st-thomas, aruba, cozumel, grand-cayman, costa-maya | OK | 7-night Eastern Caribbean with St. Thomas and St. Maart… |
| Enchanted Princess | Princess | st-thomas, cozumel, grand-cayman, st-maarten, ocho-rios | st-thomas, cozumel, grand-cayman, st-maarten, ocho-rios | st-thomas, aruba, cozumel, grand-cayman, costa-maya | OK | 7-night Eastern Caribbean with St. Thomas and St. Maart… |
| Regal Princess | Princess | st-thomas, nassau, st-maarten, grand-cayman, falmouth | st-thomas, nassau, st-maarten, grand-cayman, falmouth | st-thomas, aruba, cozumel, grand-cayman, costa-maya | OK | 7-night Eastern Caribbean with St. Thomas and St. Maart… |

## Data changes in this audit

| Ship | Change | Rationale |
| --- | --- | --- |
| Norwegian Prima | Replaced Ocho Rios recommended excursion with Roatan; added `costa-maya` to `commonPortSlugs` | Prima Western itineraries list Cozumel, Roatan, Costa Maya — not Ocho Rios |
| Norwegian Viva | Added `roatan`; Eastern-first port order | Western route parity; distinct preset from Prima/Aqua |
| Norwegian Aqua | Western-first order with `costa-maya` | Matches stated Western Caribbean deployment |
| Carnival Celebration | Added `costa-maya` | Western route parity with Mardi Gras Excel-class programming |
| Celebrity Beyond | Added `curacao` | Southern Caribbean itineraries include Curacao |

## Shared homepage presets (expected)

Some sister ships resolve to the same five homepage ports. This is realistic for identical deployment classes. The identity-key fix ensures ship-specific recommendations and PDF metadata still refresh.

| Shared preset | Ships |
| --- | --- |
| cozumel, st-thomas, nassau, roatan, st-maarten | Icon of the Seas, Symphony of the Seas |
| nassau, puerto-plata, cozumel, costa-maya, st-maarten | Mardi Gras, Carnival Celebration |

## Fallbacks & uncertainties

| Topic | Notes |
| --- | --- |
| Cruise line fallback | Used only when ship is not selected. Norwegian line default includes `ocho-rios`, which does not apply to all NCL ships — ship selection is preferred. |
| Homepage port cap | `featuredFinderPortSlugs` limits homepage to 19 ports; Utopia shows 3 ports; Seashore shows 4. Full finder page shows all resolved ports up to 5. |
| Private islands | CocoCay, Ocean Cay, Great Stirrup Cay, Princess Cays are not in port presets (not bookable excursion ports). |
| Select Southern deployments | Wonder, Icon, Symphony occasionally call Aruba; aruba is listed but not on every sailing. |
| Regal Princess `falmouth` | Used on extended Jamaica routes; not on every Regal sailing. |
| Enchanted Princess `ocho-rios` | Western Caribbean sailings only; Eastern weeks omit Jamaica. |

## Propagation checklist (after ship/line change)

| Surface | Updates on ship change? |
| --- | --- |
| Highlighted port chips | Yes — `selectedPorts` reset via identity key |
| Recommendation results | Yes — `result` cleared; user re-generates |
| Cruise Day Plan PDF | Yes — built from new `result.portPlans` + sailing month/year |
| Combined Cruise Planner PDF | Yes — uses new ports + ship/line names in metadata |
| Ship schedule links | Yes — schedule URLs use ship slug + sailing month/year |

## Re-run audit

```bash
npx tsx scripts/audit-ship-itineraries.ts
```
