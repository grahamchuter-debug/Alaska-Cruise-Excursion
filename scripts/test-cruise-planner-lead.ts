import {
  isValidPlannerEmail,
  normalizePlannerEmail,
  type CruisePlannerLeadRecord,
} from "../lib/cruise-planner-lead-capture";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

function testEmailValidation(): void {
  assert(isValidPlannerEmail("user@example.com"), "valid email should pass");
  assert(isValidPlannerEmail("  USER@Example.COM  "), "trimmed valid email should pass");
  assert(!isValidPlannerEmail(""), "empty email should fail");
  assert(!isValidPlannerEmail("not-an-email"), "invalid email should fail");
  assert(normalizePlannerEmail("  User@Example.COM ") === "user@example.com", "normalize email");
}

function testLeadRecordShape(): void {
  const record: CruisePlannerLeadRecord = {
    email: "cruiser@example.com",
    marketingConsent: false,
    cruiseLineSlug: "royal-caribbean",
    cruiseLineName: "Royal Caribbean",
    shipSlug: "icon-of-the-seas",
    shipName: "Icon of the Seas",
    sailingMonth: "March",
    sailingYear: 2027,
    portSlugs: ["cozumel", "nassau"],
    portNames: ["Cozumel", "Nassau"],
    capturedAt: new Date().toISOString(),
  };

  assert(record.marketingConsent === false, "marketing consent should be stored as false by default");
  assert(record.portSlugs.length === 2, "port slugs should be stored");
}

function main(): void {
  testEmailValidation();
  testLeadRecordShape();
  console.log("Cruise planner lead capture tests passed");
}

main();
