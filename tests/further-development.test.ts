import assert from "node:assert/strict";
import test from "node:test";
import {
  sublevelCapacities,
  energyComparisons,
} from "../src/data/multiElectron.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
test("capacities derive from orbital count and energy picture distinguishes hydrogen", () => {
  assert.deepEqual(
    sublevelCapacities.map((s) => s.count),
    [1, 3, 5, 7],
  );
  assert.deepEqual(
    sublevelCapacities.map((s) => s.capacity),
    [2, 6, 10, 14],
  );
  assert.equal(energyComparisons[0].sY, energyComparisons[0].pY);
  assert.ok(energyComparisons[1].sY > energyComparisons[1].pY);
});
test("further development registers stable topic and provides diagnostic help", () => {
  assert.equal(
    chapter11.sections[2]!.topics[1]!.lessonId,
    "further-development",
  );
  const lesson = lessons.find((l) => l.id === "further-development")!;
  assert.equal(lesson.topicId, "11.3-1");
  const qs = lesson.steps.flatMap((s) =>
    s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
  );
  assert.equal(qs.length, 5);
  assert.equal(new Set(qs.map((q) => q.id)).size, 5);
  for (const q of qs) {
    assert.equal(q.topicId, lesson.topicId);
    assert.equal(q.hints.length, 2);
    assert.ok(q.workedSolution.length >= 3);
    for (const c of q.choices ?? [])
      assert.ok(c.value === q.answer || q.misconceptionFeedback[c.value]);
  }
  const config = qs.find((q) => q.id === "further-configuration")!;
  assert.equal(
    config.choices?.find((c) => c.value === config.answer)?.label,
    "1s2 2s2 2p6 3s2 3p4",
  );
});
