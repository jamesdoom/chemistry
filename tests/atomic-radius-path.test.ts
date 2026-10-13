import assert from "node:assert/strict";
import test from "node:test";
import { focusedLessons } from "../src/data/focusedLessons.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import { topicMastery, topicQuestionIds } from "../src/utils/learning.ts";
test("focused lessons preserve the original curriculum and isolate new evidence", () => {
  assert.equal(chapter11.sections.flatMap((s) => s.topics).length, 15);
  assert.equal(lessons.length, 11);
  for (const l of focusedLessons) {
    assert.ok(!lessons.some((old) => old.topicId === l.topicId));
    const qs = l.steps.flatMap((s) =>
      s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
    );
    for (const q of qs) {
      assert.equal(q.topicId, l.topicId);
      assert.equal(q.hints.length, 2);
      assert.ok(q.workedSolution.length >= 3);
      for (const c of q.choices ?? [])
        assert.ok(c.value === q.answer || q.misconceptionFeedback[c.value]);
    }
    assert.deepEqual(
      topicQuestionIds(l.topicId),
      qs.map((q) => q.id),
    );
    assert.equal(
      topicMastery(l.topicId, {
        completedSteps: [],
        results: {
          retired: {
            attempts: 1,
            correct: true,
            independent: true,
            helpUsed: false,
          },
        },
      }).percent,
      0,
    );
  }
});
