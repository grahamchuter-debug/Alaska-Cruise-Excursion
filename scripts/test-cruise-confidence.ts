import assert from "node:assert/strict";
import {
  evaluateAuthorityRowConfidence,
  evaluateCruiseConfidence,
  evaluatePortConfidence,
  formatConfidenceTitle,
} from "../lib/cruise-confidence";
import { portExcursionAuthority } from "../data/port-excursion-authority";

function testPortLevels() {
  const cozumel = evaluatePortConfidence("cozumel");
  assert.equal(cozumel.level, "high");
  assert.ok(cozumel.supportingLabels.length > 0);

  const grandCayman = evaluatePortConfidence("grand-cayman");
  assert.ok(["medium", "plan-carefully", "high"].includes(grandCayman.level));
}

function testAuthorityRows() {
  for (const row of portExcursionAuthority.portTable.slice(0, 5)) {
    const assessment = evaluateAuthorityRowConfidence(row);
    assert.ok(assessment.title.length > 0);
    assert.ok(assessment.guidance.length > 0);
    assert.ok(!/guaranteed|ship will wait/i.test(assessment.guidance));
  }
}

function testTightSchedule() {
  const tight = evaluateCruiseConfidence({
    portSlug: "grand-cayman",
    duration: "6-7 hours",
    excursionType: "Wildlife",
    timeInPort: "under-4",
  });
  assert.equal(tight.level, "plan-carefully");
  assert.equal(formatConfidenceTitle(tight.level), "PLAN CAREFULLY");
}

testPortLevels();
testAuthorityRows();
testTightSchedule();
console.log("cruise-confidence tests passed");
