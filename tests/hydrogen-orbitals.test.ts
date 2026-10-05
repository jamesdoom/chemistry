import assert from "node:assert/strict";
import test from "node:test";
import {
  sublevelsForLevel,
  pOrientations,
} from "../src/data/hydrogenOrbitals.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
test("allowed sublevels give 1, 4, 9 orbitals for the first three levels", () => {
  for (const n of [1, 2, 3])
    assert.equal(
      sublevelsForLevel(n).reduce((sum, s) => sum + s.count, 0),
      n * n,
    );
  assert.deepEqual(
    sublevelsForLevel(1).map((s) => s.letter),
    ["s"],
  );
  assert.deepEqual(
    sublevelsForLevel(3).map((s) => s.letter),
    ["s", "p", "d"],
  );
  assert.deepEqual(
    pOrientations.map((p) => p.id),
    ["x", "y", "z"],
  );
});
test("hydrogen orbitals uses stable curriculum identity and complete misconception help", () => {
  assert.equal(chapter11.sections[2]!.topics[0]!.lessonId, "hydrogen-orbitals");
  const lesson = lessons.find((l) => l.id === "hydrogen-orbitals")!;
  assert.equal(lesson.topicId, "11.3-0");
  const qs = lesson.steps.flatMap((s) =>
    s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
  );
  assert.equal(qs.length, 4);
  for (const q of qs) {
    assert.equal(q.topicId, lesson.topicId);
    assert.equal(q.hints.length, 2);
    assert.ok(q.workedSolution.length >= 3);
    for (const c of q.choices ?? [])
      assert.ok(c.value === q.answer || q.misconceptionFeedback[c.value]);
  }
});
