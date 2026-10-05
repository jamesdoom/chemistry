import assert from "node:assert/strict";
import test from "node:test";
import {
  updateAssessmentAnswer,
  assessmentSummary,
} from "../src/utils/assessment.ts";
import { section114Assessment } from "../src/data/chapters/section114Assessment.ts";
import { loadProgress, emptyProgress } from "../src/utils/storage.ts";
test("assessment retains first-attempt evidence through retries and support", () => {
  const wrong = updateAssessmentAnswer(undefined, false, false);
  const retry = updateAssessmentAnswer(wrong, true, false);
  assert.equal(retry.firstCorrect, false);
  const supported = updateAssessmentAnswer(undefined, true, true);
  assert.equal(supported.firstCorrect, false);
  const correct = {
    ...updateAssessmentAnswer(undefined, true, false),
    completed: true,
  };
  const summary = assessmentSummary(
    { results: { a: correct, b: { ...retry, completed: true } } },
    ["a", "b"],
  );
  assert.deepEqual(summary, {
    strong: 1,
    total: 2,
    percent: 50,
    complete: true,
    completed: 2,
  });
  assert.equal(assessmentSummary(undefined, []).complete, false);
});
test("assessment data has unique questions, valid answers, and review routes", () => {
  const questions = section114Assessment.questions;
  assert.equal(questions.length, 10);
  assert.equal(new Set(questions.map((q) => q.id)).size, 10);
  for (const q of questions) {
    assert.ok(q.choices?.some((c) => c.value === q.answer));
    assert.equal(q.hints.length, 2);
    assert.ok(q.reviewTo.startsWith("/lessons/"));
    for (const choice of q.choices!)
      if (choice.value !== q.answer)
        assert.ok(q.misconceptionFeedback[choice.value]);
  }
});
test("optional assessment storage preserves old progress and drops damaged assessment only", () => {
  const old = emptyProgress();
  old.xp = 40;
  let stored = JSON.stringify(old);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { getItem: () => stored },
  });
  assert.deepEqual(loadProgress(), old);
  const attempt = {
    results: {
      q: { ...updateAssessmentAnswer(undefined, true, false), completed: true },
    },
  };
  stored = JSON.stringify({ ...old, assessments: { check: attempt } });
  assert.deepEqual(loadProgress().assessments?.check, attempt);
  stored = JSON.stringify({
    ...old,
    assessments: { check: { results: { q: null } } },
  });
  assert.deepEqual(loadProgress(), old);
});
