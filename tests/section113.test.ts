import assert from "node:assert/strict";
import test from "node:test";
import { section113Assessment } from "../src/data/chapters/section113Assessment.ts";
import { assessments } from "../src/data/assessments.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import {
  assessmentSummary,
  updateAssessmentAnswer,
} from "../src/utils/assessment.ts";
test("Section 11.3 uses stable topic identity and diagnostic review data", () => {
  assert.equal(chapter11.sections[2]!.topics[2]!.assessmentId, "11.3-2");
  assert.equal(assessments.filter((a) => a.sectionNumber === "11.3").length, 1);
  const qs = section113Assessment.questions;
  assert.equal(qs.length, 10);
  assert.equal(new Set(qs.map((q) => q.id)).size, 10);
  assert.deepEqual(
    new Set(qs.map((q) => q.reviewTo)),
    new Set(["/lessons/hydrogen-orbitals", "/lessons/further-development"]),
  );
  for (const q of qs) {
    assert.equal(q.topicId, "11.3-2");
    assert.ok(q.reviewRecommendation);
    assert.ok(lessons.some((l) => q.reviewTo === `/lessons/${l.id}`));
    assert.equal(q.hints.length, 2);
    assert.ok(q.workedSolution.length >= 3);
    if (q.choices) {
      assert.ok(q.choices.some((c) => c.value === q.answer));
      for (const c of q.choices)
        if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
    } else assert.ok(q.fallbackFeedback);
  }
  assert.equal(qs.find((q) => q.id.endsWith("-counts"))!.answer, "9");
  for (const rule of ["pauli", "hund", "aufbau"])
    assert.equal(qs.find((q) => q.id.endsWith("-" + rule))!.answer, rule);
});
test("Section 11.3 report counts first-try reasoning separately from corrections and support", () => {
  const qs = section113Assessment.questions;
  const results = Object.fromEntries(
    qs.map((q, i) => {
      let r = updateAssessmentAnswer(undefined, i !== 0, false);
      if (i === 0) r = updateAssessmentAnswer(r, true, false);
      if (i === 2) r = updateAssessmentAnswer(undefined, true, true);
      return [q.id, { ...r, completed: true }];
    }),
  );
  assert.equal(
    assessmentSummary(
      { results },
      qs.map((q) => q.id),
    ).percent,
    80,
  );
  assert.equal(results[qs[0]!.id]!.firstCorrect, false);
  assert.equal(results[qs[2]!.id]!.helpUsed, true);
});
