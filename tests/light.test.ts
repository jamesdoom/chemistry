import assert from "node:assert/strict";
import test from "node:test";
import { lightProperties, gradeNumericAnswer } from "../src/utils/light.ts";
import { lightLesson } from "../src/data/chapters/lightLesson.ts";
import { chapter11 } from "../src/data/chapters/chapter11.ts";
import { topicMastery } from "../src/utils/learning.ts";
test("vacuum wavelength conversion and photon relationships", () => {
  const a = lightProperties(400),
    b = lightProperties(800);
  assert.ok(Math.abs(a.wavelengthM - 4e-7) < 1e-20);
  assert.equal(a.frequency / b.frequency, 2);
  assert.equal(a.photonEnergy / b.photonEnergy, 2);
  assert.ok(Math.abs(lightProperties(600).frequency - 5e14) < 1);
});
test("numeric grading accepts rounded scientific notation and rejects invalid input", () => {
  for (const input of ["2.65e-19", "2.6504E-19", " 2.65e−19 "])
    assert.equal(gradeNumericAnswer(input, 2.6504e-19, 0.01).correct, true);
  for (const input of [
    "2.65e19",
    "2.6504e-20",
    "0",
    "-1",
    "Infinity",
    "NaN",
    "2.65e-19 J",
    "alert(1)",
    "1e999",
    "1e-999",
    "",
  ])
    assert.equal(gradeNumericAnswer(input, 2.6504e-19, 0.01).correct, false);
  assert.equal(gradeNumericAnswer("600000", 6e14, 0.01).correct, false);
});
test("light curriculum identity, questions, and independent topic mastery", () => {
  assert.equal(chapter11.sections[0]!.topics[1]!.id, "11.1-1");
  assert.equal(chapter11.sections[0]!.topics[1]!.lessonId, "energy-light");
  const qs = lightLesson.steps.flatMap((s) =>
    s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
  );
  assert.equal(qs.length, 5);
  assert.equal(
    new Set(lightLesson.steps.map((s) => s.id)).size,
    lightLesson.steps.length,
  );
  for (const q of qs) {
    assert.equal(q.topicId, "11.1-1");
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
  }
  assert.equal(
    topicMastery("11.1-1", {
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
});
