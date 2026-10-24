import assert from "node:assert/strict";
import { splitLegacyIntermediateUnits, resolveLegacyLevel, contentLevel, audioLevelFolder, timeFramesFor, LEVEL_VERBS, LEGACY_INTERMEDIATE_VERBS } from "./levels";

// old units 0-6 = reflexives (B), 7-17 = non-reflexives (A)
assert.deepEqual(splitLegacyIntermediateUnits([0, 6, 7, 17]), { a: [0, 10], b: [0, 6] });
assert.equal(resolveLegacyLevel("Intermediate", "trouver"), "Intermediate A");
assert.equal(resolveLegacyLevel("Intermediate", "se souvenir"), "Intermediate B");
assert.equal(resolveLegacyLevel("Elementary", "dire"), "Elementary");
assert.equal(contentLevel("Intermediate B"), "Intermediate");
assert.equal(audioLevelFolder("Intermediate A"), "intermediate");
assert.equal(timeFramesFor("Intermediate A").length, 4);
assert.equal(timeFramesFor("Novice").length, 3);
assert.equal(LEVEL_VERBS["Intermediate A"].length + LEVEL_VERBS["Intermediate B"].length, LEGACY_INTERMEDIATE_VERBS.length);
console.log("levels: all assertions passed");
