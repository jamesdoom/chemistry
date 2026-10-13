import assert from "node:assert/strict";
import test from "node:test";
import {
  radiusGraphData,
  graphPoint,
  graphEntryFeedback,
} from "../src/data/atomicRadiusGraph.ts";
test("illustrative graph has consistent coordinates and distinguishes swapped axes", () => {
  assert.equal(radiusGraphData.length, 18);
  assert.equal(new Set(radiusGraphData.map((d) => d.atomicNumber)).size, 18);
  assert.deepEqual(graphPoint(1, 0), { x: 60, y: 270 });
  assert.ok(graphPoint(11, 210).y < graphPoint(10, 60).y);
  assert.equal(graphEntryFeedback(3, "170").correct, true);
  assert.match(graphEntryFeedback(3, "3").message, /horizontal axis/);
  assert.equal(graphEntryFeedback(3, "").correct, false);
  assert.equal(graphEntryFeedback(3, "NaN").correct, false);
});
