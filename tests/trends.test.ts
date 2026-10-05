import assert from "node:assert/strict";
import test from "node:test";
import { trendComparisons } from "../src/data/atomicTrends.ts";
import { trendsLesson } from "../src/data/chapters/trendsLesson.ts";
import { periodicAtoms } from "../src/data/periodicTable.ts";
import {
  topicQuestionIds,
  topicMastery,
  nextLearningLesson,
} from "../src/utils/learning.ts";
import { lessons } from "../src/data/chapters/chapter11.ts";
import { emptyProgress } from "../src/utils/storage.ts";
test("authored comparisons distinguish normal directions from sublevel and pairing exceptions", () => {
  const winners: Record<string, number> = {
    "size-down": 11,
    "size-across": 11,
    "ie-down": 3,
    "ie-across": 17,
    "ie-pairing-exception": 7,
    "ie-sublevel-exception": 4,
  };
  for (const comparison of trendComparisons) {
    assert.equal(comparison.favoredAtomicNumber, winners[comparison.id]);
    assert.ok(
      comparison.atomicNumbers.includes(comparison.favoredAtomicNumber),
    );
    assert.ok(
      comparison.atomicNumbers.every((n) =>
        periodicAtoms.some((a) => a.atomicNumber === n),
      ),
    );
  }
  assert.equal(trendComparisons.filter((c) => c.exception).length, 2);
  const down = trendComparisons.find((c) => c.id === "size-down")!;
  assert.equal(
    periodicAtoms.find((a) => a.atomicNumber === down.atomicNumbers[0])!.group,
    periodicAtoms.find((a) => a.atomicNumber === down.atomicNumbers[1])!.group,
  );
  const across = trendComparisons.find((c) => c.id === "size-across")!;
  assert.equal(
    periodicAtoms.find((a) => a.atomicNumber === across.atomicNumbers[0])!
      .period,
    periodicAtoms.find((a) => a.atomicNumber === across.atomicNumbers[1])!
      .period,
  );
});
test("new choices and exploration IDs are valid content with complete help paths", () => {
  assert.equal(trendsLesson.steps.length, 13);
  assert.equal(
    new Set(trendsLesson.steps.map((s) => s.id)).size,
    trendsLesson.steps.length,
  );
  for (const step of trendsLesson.steps) {
    if (step.kind === "trend-explorer") {
      assert.ok(
        trendComparisons.some((c) => c.id === step.initialComparisonId),
      );
      assert.ok(
        step.requiredComparisonIds.every((id) =>
          trendComparisons.some((c) => c.id === id),
        ),
      );
      assert.ok(step.requiredComparisonIds.includes("ie-pairing-exception"));
    }
    if (step.kind === "visual" && step.visual.kind === "trend-comparison")
      assert.ok(
        trendComparisons.some((c) => c.id === step.visual.comparisonId),
      );
    if (step.kind === "practice" || step.kind === "checkpoint") {
      const question = step.question;
      assert.ok(question.choices?.some((c) => c.value === question.answer));
      assert.equal(
        new Set(question.choices?.map((c) => c.value)).size,
        question.choices?.length,
      );
      assert.equal(question.topicId, "atomic-properties");
      assert.equal(question.hints.length, 2);
      assert.ok(question.workedSolution.length >= 3);
      assert.ok(
        question.choices
          ?.filter((c) => c.value !== question.answer)
          .every((c) => !!question.misconceptionFeedback[c.value]),
      );
    }
  }
});
test("trend results are isolated and continuation advances to the third lesson", () => {
  const ids = topicQuestionIds("atomic-properties");
  assert.equal(ids.length, 7);
  assert.equal(topicQuestionIds("electron-arrangements").length, 21);
  assert.equal(topicQuestionIds("configurations-periodic-table").length, 6);
  const success = {
    attempts: 1,
    correct: true,
    independent: true,
    helpUsed: false,
  };
  const topic = {
    completedSteps: [],
    results: Object.fromEntries(
      ids.map((id, i) => [
        id,
        { ...success, independent: i !== 0, helpUsed: i === 0 },
      ]),
    ),
  };
  assert.equal(topicMastery("atomic-properties", topic).percent, 93);
  assert.equal(topicMastery("electron-arrangements", topic).percent, 0);
  const progress = emptyProgress();
  for (const lesson of lessons.slice(0, 2))
    progress.topics[lesson.topicId] = {
      completedSteps: lesson.steps.map((s) => s.id),
      results: {},
    };
  assert.equal(nextLearningLesson(progress).id, "atomic-trends");
});
