import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getCruiseLineBySlug } from "../data/cruise-lines";
import { getShipBySlug } from "../data/ships";
import { buildCombinedCruisePlannerFromFinderContext } from "../lib/cruise-day-plan";
import { buildCombinedCruisePlannerPdfBlobAsync } from "../lib/cruise-day-plan-pdf";
import { loadPdfBrandAssetsFromDisk } from "../lib/pdf-brand-assets-server";
import { resolveItineraryPorts } from "../lib/finder-itinerary-ports";

interface TestScenario {
  label: string;
  shipSlug: string;
}

const SCENARIOS: TestScenario[] = [
  { label: "Norwegian Viva", shipSlug: "viva" },
  { label: "Regal Princess", shipSlug: "regal-princess" },
  { label: "MSC World America", shipSlug: "world-america" },
];

const PROJECT_ROOT = join(import.meta.dirname, "..");
const SAMPLES_DIR = join(PROJECT_ROOT, "samples", "cruise-planners");
const assets = loadPdfBrandAssetsFromDisk(PROJECT_ROOT);

async function runScenario(scenario: TestScenario): Promise<string> {
  const portSlugs = resolveItineraryPorts({ shipSlug: scenario.shipSlug });

  if (portSlugs.length === 0) {
    throw new Error(`${scenario.label}: no ports resolved`);
  }

  const ship = getShipBySlug(scenario.shipSlug);
  const line = ship ? getCruiseLineBySlug(ship.cruiseLineSlug) : undefined;

  const combined = buildCombinedCruisePlannerFromFinderContext({
    portSlugs,
    travellerTypes: ["first-time", "whales"],
    fitnessLevel: "easy",
    sailingMonth: "March",
    sailingYear: 2027,
    cruiseLineName: line?.name,
    shipName: ship?.name,
  });

  if (!combined) {
    throw new Error(`${scenario.label}: failed to build planner input`);
  }

  if (combined.portPlans.length !== portSlugs.length) {
    throw new Error(
      `${scenario.label}: expected ${portSlugs.length} port plans, got ${combined.portPlans.length}`,
    );
  }

  const blob = await buildCombinedCruisePlannerPdfBlobAsync(combined, assets);
  const buffer = Buffer.from(await blob.arrayBuffer());

  if (buffer.byteLength < 8000) {
    throw new Error(`${scenario.label}: PDF too small (${buffer.byteLength} bytes)`);
  }

  const outPath = join(SAMPLES_DIR, `cruise-planner-${scenario.shipSlug}.pdf`);
  writeFileSync(outPath, buffer);

  console.log(`  ✓ ${scenario.label}: ${combined.portPlans.length} ports, ${buffer.byteLength} bytes`);
  console.log(`    ${outPath}`);
  for (const plan of combined.portPlans) {
    console.log(`    · ${plan.portName}: ${plan.recommendedExcursions.primary.name}`);
  }

  return outPath;
}

async function main(): Promise<void> {
  mkdirSync(SAMPLES_DIR, { recursive: true });

  console.log("Combined Cruise Planner PDF smoke tests\n");
  const paths: string[] = [];
  for (const scenario of SCENARIOS) {
    paths.push(await runScenario(scenario));
  }
  console.log("\nAll PDF scenarios passed");
  console.log(`\nSample PDFs written to ${SAMPLES_DIR}/`);
  for (const p of paths) {
    console.log(`  ${p}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
