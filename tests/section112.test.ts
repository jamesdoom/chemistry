import assert from "node:assert/strict";
import test from "node:test";
import { section112Assessment } from "../src/data/chapters/section112Assessment.ts";
import { assessments } from "../src/data/assessments.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import { gradeNumericAnswer } from "../src/utils/light.ts";
test("Section 11.2 assessment covers three lessons with valid recommendations and photon calculation", () => {
  assert.equal(chapter11.sections[1]!.topics[3]!.assessmentId, "11.2-3");
  assert.equal(assessments.filter((a) => a.sectionNumber === "11.2").length, 1);
  const qs = section112Assessment.questions;
  assert.equal(qs.length, 10);
  assert.equal(new Set(qs.map((q) => q.id)).size, 10);
  assert.deepEqual(
    new Set(qs.map((q) => q.reviewTo)),
    new Set([
      "/lessons/hydrogen-levels",
      "/lessons/bohr-model",
      "/lessons/wave-mechanical",
    ]),
  );
  for (const q of qs) {
    assert.ok(q.reviewRecommendation);
    assert.ok(lessons.some((l) => q.reviewTo === `/lessons/${l.id}`));
    assert.equal(q.hints.length, 2);
    if (q.numericAnswer) {
      assert.equal(
        gradeNumericAnswer(
          q.answer,
          q.numericAnswer.value,
          q.numericAnswer.relativeTolerance,
        ).correct,
        true,
      );
      assert.equal(
        gradeNumericAnswer(
          "2.18e-18",
          q.numericAnswer.value,
          q.numericAnswer.relativeTolerance,
        ).correct,
        false,
      );
    } else
      for (const c of q.choices!)
        if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
  }
});
