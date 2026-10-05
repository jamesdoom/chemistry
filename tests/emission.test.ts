import assert from "node:assert/strict";
import test from "node:test";
import {
  energyTransitions,
  transitionFacts,
  illustrativeLevels,
  illustrativeLines,
} from "../src/data/energyTransitions.ts";
import { emissionLesson } from "../src/data/chapters/emissionLesson.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import { nextLearningLesson, topicMastery } from "../src/utils/learning.ts";
import { emptyProgress } from "../src/utils/storage.ts";
import { gradeNumericAnswer } from "../src/utils/light.ts";
test("energy transfer direction, conservation, and lines use gaps rather than levels", () => {
  assert.deepEqual(
    illustrativeLevels.map((l) => l.energy),
    [0, 2, 5],
  );
  for (const t of energyTransitions) {
    const f = transitionFacts(t.id);
    assert.equal(f.photonEnergy, Math.abs(f.delta));
    assert.equal(f.absorption, f.delta > 0);
    assert.ok(f.photonEnergy > 0);
  }
  assert.equal(transitionFacts("absorb").delta, 2);
  assert.equal(transitionFacts("emit-small").delta, -2);
  assert.equal(transitionFacts("emit-large").delta, -5);
  const emitted = [
    ...new Set(
      energyTransitions
        .filter((t) => !transitionFacts(t.id).absorption)
        .map((t) => transitionFacts(t.id).photonEnergy),
    ),
  ].sort((a, b) => a - b);
  assert.deepEqual(emitted, illustrativeLines);
  assert.throws(() => transitionFacts("unknown"));
});
test("emission lesson preserves identity, isolated mastery, and continuation", () => {
  assert.equal(chapter11.sections[0]!.topics[2]!.id, "11.1-2");
  assert.equal(chapter11.sections[0]!.topics[2]!.lessonId, "atomic-emission");
  const qs = emissionLesson.steps.flatMap((s) =>
    s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
  );
  assert.equal(qs.length, 5);
  assert.equal(
    new Set(emissionLesson.steps.map((s) => s.id)).size,
    emissionLesson.steps.length,
  );
  for (const q of qs) {
    assert.equal(q.topicId, "11.1-2");
    assert.equal(q.hints.length, 2);
    if (q.numericAnswer)
      assert.equal(
        gradeNumericAnswer(
          q.answer,
          q.numericAnswer.value,
          q.numericAnswer.relativeTolerance,
        ).correct,
        true,
      );
    else
      for (const c of q.choices!)
        if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
  }
  assert.equal(
    topicMastery("11.1-2", {
      completedSteps: [],
      results: {
        [qs[0]!.id]: {
          attempts: 1,
          correct: true,
          independent: true,
          helpUsed: false,
        },
      },
    }).percent,
    20,
  );
  const progress = emptyProgress();
  for (const l of lessons.filter((l) => l.id !== "atomic-emission"))
    progress.topics[l.topicId] = {
      completedSteps: l.steps.map((s) => s.id),
      results: {},
    };
  assert.equal(nextLearningLesson(progress).id, "atomic-emission");
});
