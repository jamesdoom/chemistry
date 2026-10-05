import assert from "node:assert/strict";
import test from "node:test";
import { rutherfordLesson } from "../src/data/chapters/rutherfordLesson.ts";
import { scatteringCases } from "../src/data/scattering.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import { nextLearningLesson, topicMastery } from "../src/utils/learning.ts";
import { emptyProgress } from "../src/utils/storage.ts";
test("Rutherford retains stable curriculum identity and complete question feedback", () => {
  assert.equal(chapter11.sections[0]!.topics[0]!.id, "11.1-0");
  assert.equal(chapter11.sections[0]!.topics[0]!.lessonId, "rutherford");
  const questions = rutherfordLesson.steps.flatMap((s) =>
    s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
  );
  assert.equal(questions.length, 5);
  assert.equal(
    new Set(rutherfordLesson.steps.map((s) => s.id)).size,
    rutherfordLesson.steps.length,
  );
  for (const q of questions) {
    assert.equal(q.topicId, "11.1-0");
    assert.equal(q.hints.length, 2);
    assert.ok(q.choices!.some((c) => c.value === q.answer));
    for (const c of q.choices!)
      if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
  }
  const progress = emptyProgress();
  for (const lesson of lessons.filter((l) => l.id !== "rutherford"))
    progress.topics[lesson.topicId] = {
      completedSteps: lesson.steps.map((s) => s.id),
      results: {},
    };
  assert.equal(nextLearningLesson(progress).id, "rutherford");
  assert.equal(
    topicMastery("11.1-0", {
      completedSteps: [],
      results: {
        [questions[0]!.id]: {
          attempts: 1,
          correct: true,
          independent: true,
          helpUsed: false,
        },
      },
    }).percent,
    20,
  );
});
test("qualitative cases connect rarity and electrical repulsion to the nucleus", () => {
  assert.deepEqual(
    scatteringCases.map((c) => c.frequency),
    ["Most particles", "Some particles", "Very few particles"],
  );
  assert.match(scatteringCases[1]!.reason, /does not need to touch/);
  assert.match(scatteringCases[2]!.inference, /mass/);
});
