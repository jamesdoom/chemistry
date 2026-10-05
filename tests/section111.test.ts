import assert from "node:assert/strict";
import test from "node:test";
import { section111Assessment } from "../src/data/chapters/section111Assessment.ts";
import { assessments } from "../src/data/assessments.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import { gradeNumericAnswer } from "../src/utils/light.ts";
import {
  assessmentSummary,
  updateAssessmentAnswer,
} from "../src/utils/assessment.ts";
test("assessment registry, stable IDs, targeted review links, and three calculations", () => {
  assert.equal(chapter11.sections[0]!.topics[3]!.assessmentId, "11.1-3");
  assert.equal(new Set(assessments.map((a) => a.id)).size, assessments.length);
  assert.equal(
    new Set(assessments.map((a) => a.sectionNumber)).size,
    assessments.length,
  );
  assert.equal(section111Assessment.questions.length, 10);
  assert.equal(
    section111Assessment.questions.filter((q) => q.numericAnswer).length,
    3,
  );
  const allIds = assessments.flatMap((a) => a.questions.map((q) => q.id));
  assert.equal(new Set(allIds).size, allIds.length);
  for (const q of section111Assessment.questions) {
    assert.ok(q.reviewRecommendation);
    assert.ok(lessons.some((l) => q.reviewTo === `/lessons/${l.id}`));
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
    else {
      assert.ok(q.choices!.some((c) => c.value === q.answer));
      for (const c of q.choices!)
        if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
    }
  }
});
test("report distinguishes supported calculations from first-try conceptual evidence", () => {
  const ids = section111Assessment.questions.map((q) => q.id);
  const results = Object.fromEntries(
    ids.map((id, i) => [
      id,
      { ...updateAssessmentAnswer(undefined, true, i === 4), completed: true },
    ]),
  );
  const summary = assessmentSummary({ results }, ids);
  assert.equal(summary.percent, 90);
  assert.equal(summary.complete, true);
  assert.equal(gradeNumericAnswer("1e6", 1e15, 0.01).correct, false);
  assert.equal(gradeNumericAnswer("1.99e-19", 1.9878e-19, 0.01).correct, true);
  assert.equal(gradeNumericAnswer("-5e-19", 5e-19, 0.01).correct, false);
});
