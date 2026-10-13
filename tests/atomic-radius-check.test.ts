import assert from "node:assert/strict";
import test from "node:test";
import { atomicRadiusAssessment } from "../src/data/chapters/atomicRadiusAssessment.ts";
import { focusedLessons } from "../src/data/focusedLessons.ts";
import { assessments, allAssessments } from "../src/data/assessments.ts";
import {
  reviewRecommendations,
  chapterSummary,
} from "../src/utils/chapterReview.ts";
import { emptyProgress } from "../src/utils/storage.ts";
test("focused check has its own identity and all review routes resolve to authored lessons", () => {
  assert.equal(atomicRadiusAssessment.questions.length, 6);
  assert.ok(!assessments.some((a) => a.id === atomicRadiusAssessment.id));
  assert.equal(
    allAssessments.filter((a) => a.id === atomicRadiusAssessment.id).length,
    1,
  );
  for (const q of atomicRadiusAssessment.questions) {
    assert.equal(q.topicId, atomicRadiusAssessment.id);
    assert.ok(focusedLessons.some((l) => q.reviewTo === `/lessons/${l.id}`));
    assert.ok(q.reviewRecommendation);
    for (const c of q.choices ?? [])
      assert.ok(c.value === q.answer || q.misconceptionFeedback[c.value]);
  }
  const p = emptyProgress();
  const q = atomicRadiusAssessment.questions[3]!;
  p.assessments = {
    [atomicRadiusAssessment.id]: {
      results: {
        [q.id]: {
          attempts: 2,
          firstCorrect: false,
          correct: true,
          helpUsed: false,
          completed: true,
        },
      },
    },
  };
  assert.equal(reviewRecommendations(p)[0]!.to, q.reviewTo);
  assert.equal(chapterSummary(p).completed, 0);
  assert.equal(chapterSummary(p).mastery, 0);
});
