import assert from "node:assert/strict";
import test from "node:test";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import { assessments } from "../src/data/assessments.ts";
import { chapter11Review } from "../src/data/chapters/chapter11Review.ts";
import {
  chapterSummary,
  chapterEntries,
  reviewRecommendations,
} from "../src/utils/chapterReview.ts";
import { topicQuestionIds } from "../src/utils/learning.ts";
import {
  emptyProgress,
  saveProgress,
  loadProgress,
} from "../src/utils/storage.ts";
import { gradeNumericAnswer } from "../src/utils/light.ts";
test("all 15 curriculum entries resolve to authored functional content with help and feedback", () => {
  const topics = chapter11.sections.flatMap((s) => s.topics);
  assert.equal(topics.length, 15);
  assert.equal(new Set(topics.map((t) => t.id)).size, 15);
  assert.equal(lessons.length, 11);
  assert.equal(assessments.filter((a) => a.scope !== "chapter").length, 4);
  for (const topic of topics) {
    assert.ok(!!topic.lessonId !== !!topic.assessmentId);
    const lesson = lessons.find((l) => l.id === topic.lessonId);
    const assessment = assessments.find((a) => a.id === topic.assessmentId);
    assert.ok(lesson || assessment);
    if (lesson) {
      assert.equal(lesson.topicId, topic.id);
      assert.equal(
        new Set(lesson.steps.map((s) => s.id)).size,
        lesson.steps.length,
      );
      assert.ok(
        lesson.steps.some(
          (s) => s.kind === "explanation" && s.explanations.length >= 3,
        ),
      );
      assert.ok(
        lesson.steps.some((s) => s.kind === "example" && s.steps.length >= 3),
      );
      assert.ok(
        lesson.steps.some(
          (s) =>
            !["explanation", "example", "practice", "checkpoint"].includes(
              s.kind,
            ),
        ),
      );
    }
    const qs =
      assessment?.questions ??
      lesson!.steps.flatMap((s) =>
        s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
      );
    assert.ok(qs.length > 0);
    for (const q of qs) {
      assert.equal(q.topicId, topic.id);
      assert.ok(q.hints.length >= 2);
      assert.ok(q.explanation);
      assert.ok(q.workedSolution.length >= 3);
      assert.ok(
        q.fallbackFeedback || Object.keys(q.misconceptionFeedback).length,
      );
      if (q.choices) {
        assert.ok(q.choices.some((c) => c.value === q.answer));
        for (const c of q.choices)
          if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
      }
    }
  }
  assert.equal(
    chapterEntries(emptyProgress()).filter((e) => e.kind === "unavailable")
      .length,
    0,
  );
});
test("all 15 persisted entries can complete, with full lesson mastery and independent assessment evidence", () => {
  const p = emptyProgress();
  for (const l of lessons)
    p.topics[l.topicId] = {
      completedSteps: l.steps.map((s) => s.id),
      results: Object.fromEntries(
        topicQuestionIds(l.topicId).map((id) => [
          id,
          { attempts: 1, correct: true, independent: true, helpUsed: false },
        ]),
      ),
    };
  p.assessments = Object.fromEntries(
    assessments
      .filter((a) => a.scope !== "chapter")
      .map((a) => [
        a.id,
        {
          results: Object.fromEntries(
            a.questions.map((q) => [
              q.id,
              {
                attempts: 1,
                firstCorrect: true,
                correct: true,
                helpUsed: false,
                completed: true,
              },
            ]),
          ),
        },
      ]),
  );
  let stored = "";
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      setItem: (_key: string, value: string) => {
        stored = value;
      },
      getItem: () => stored,
    },
  });
  assert.equal(saveProgress(p), true);
  const restored = loadProgress();
  assert.deepEqual(restored, p);
  const summary = chapterSummary(restored);
  assert.equal(summary.total, 15);
  assert.equal(summary.completed, 15);
  assert.equal(summary.mastery, 100);
  assert.deepEqual(reviewRecommendations(restored), []);
  assert.equal(chapterSummary(emptyProgress()).completed, 0);
  assert.equal(chapterSummary(emptyProgress()).mastery, 0);
});
test("weak review paths ignore untouched and retired evidence and combine latest reports with lesson practice", () => {
  const p = emptyProgress();
  assert.deepEqual(reviewRecommendations(p), []);
  const l = lessons[0]!;
  const id = topicQuestionIds(l.topicId)[0]!;
  p.topics[l.topicId] = {
    completedSteps: [],
    results: {
      retired: {
        attempts: 1,
        correct: false,
        independent: false,
        helpUsed: false,
      },
    },
  };
  assert.deepEqual(reviewRecommendations(p), []);
  p.topics[l.topicId]!.results[id] = {
    attempts: 1,
    correct: true,
    independent: false,
    helpUsed: true,
  };
  const a = assessments.find((a) => a.sectionNumber === "11.4")!;
  const q = a.questions.find((q) => q.reviewTo === `/lessons/${l.id}`)!;
  p.assessments = {
    [a.id]: {
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
  const paths = reviewRecommendations(p);
  assert.equal(paths.length, 1);
  assert.equal(paths[0]!.to, `/lessons/${l.id}`);
  assert.equal(paths[0]!.reasons.length, 2);
  p.assessments[a.id] = { results: {} };
  assert.equal(reviewRecommendations(p)[0]!.reasons.length, 1);
});
test("mixed chapter check covers every learning topic with valid review routes and a numerical energy gap", () => {
  const qs = chapter11Review.questions;
  assert.equal(qs.length, 12);
  assert.equal(chapter11Review.scope, "chapter");
  assert.equal(new Set(qs.map((q) => q.id)).size, 12);
  assert.deepEqual(
    new Set(qs.map((q) => q.reviewTo)),
    new Set(lessons.map((l) => `/lessons/${l.id}`)),
  );
  for (const q of qs) {
    assert.equal(q.topicId, chapter11Review.id);
    assert.ok(q.reviewRecommendation);
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
      assert.ok(q.choices?.some((c) => c.value === q.answer));
      for (const c of q.choices ?? [])
        if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
    }
  }
});
