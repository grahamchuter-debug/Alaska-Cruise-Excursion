import { ships } from "../data/ships";
import { featuredFinderPortSlugs } from "../data/excursion-finder";
import { resolveItineraryPorts, getSuggestedPortsForCruiseLine } from "../lib/finder-itinerary-ports";
import { getCruiseLineBySlug } from "../data/cruise-lines";

function auditShipItineraries(): void {
  const issues: string[] = [];

  for (const ship of ships) {
    const homePorts = resolveItineraryPorts({
      shipSlug: ship.slug,
      visiblePortSlugs: featuredFinderPortSlugs,
    });
    const fullPorts = resolveItineraryPorts({ shipSlug: ship.slug });

    if (ship.commonPortSlugs.length === 0) {
      issues.push(`${ship.slug}: missing commonPortSlugs`);
    }
    if (fullPorts.length === 0) {
      issues.push(`${ship.slug}: resolves to zero ports on full finder`);
    }

    for (const rec of ship.recommendedExcursions) {
      if (!ship.commonPortSlugs.includes(rec.portSlug)) {
        issues.push(
          `${ship.slug}: recommended excursion "${rec.name}" uses ${rec.portSlug} (not in commonPortSlugs)`,
        );
      }
    }

    const line = getCruiseLineBySlug(ship.cruiseLineSlug)?.name ?? ship.cruiseLineSlug;
    const lineFallback = getSuggestedPortsForCruiseLine(ship.cruiseLineSlug);
    console.log(
      `${ship.name} (${line}) → homepage: [${homePorts.join(", ")}] | full: [${fullPorts.join(", ")}] | line fallback: [${lineFallback.join(", ")}]`,
    );
  }

  if (issues.length > 0) {
    console.error("\nIssues found:");
    for (const issue of issues) console.error(`  - ${issue}`);
    process.exit(1);
  }

  console.log(`\n${ships.length} ships audited — no data issues found.`);
}

auditShipItineraries();
