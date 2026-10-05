import assert from "node:assert/strict";
import test from "node:test";
import { atomicProperties } from "../src/utils/atomicProperties.ts";
import { periodicAtoms, periodicGroups } from "../src/data/periodicTable.ts";
import {
  topicQuestionIds,
  topicMastery,
  nextLearningLesson,
} from "../src/utils/learning.ts";
import { lessons } from "../src/data/chapters/chapter11.ts";
import { emptyProgress } from "../src/utils/storage.ts";
test("neutral first-18 properties match periods, valence counts, and modern groups", () => {
  const expected = [
    [1, 1, 1],
    [1, 2, 18],
    [2, 1, 1],
    [2, 2, 2],
    [2, 3, 13],
    [2, 4, 14],
    [2, 5, 15],
    [2, 6, 16],
    [2, 7, 17],
    [2, 8, 18],
    [3, 1, 1],
    [3, 2, 2],
    [3, 3, 13],
    [3, 4, 14],
    [3, 5, 15],
    [3, 6, 16],
    [3, 7, 17],
    [3, 8, 18],
  ];
  for (let i = 0; i < 18; i++) {
    const result = atomicProperties(i + 1);
    assert.deepEqual(
      [result.period, result.valenceElectrons, result.group],
      expected[i],
    );
    assert.equal(
      result.configuration.reduce((sum, p) => sum + p.count, 0),
      i + 1,
    );
  }
  assert.throws(() => atomicProperties(19), RangeError);
  assert.equal(periodicAtoms.length, 18);
  assert.equal(
    new Set(periodicAtoms.map((a) => `${a.period}:${a.group}`)).size,
    18,
  );
  assert.ok(periodicAtoms.every((atom) => periodicGroups.includes(atom.group)));
});
test("new lesson evidence is independent of earlier results and scores supported answers", () => {
  assert.equal(topicQuestionIds("electron-arrangements").length, 21);
  const ids = topicQuestionIds("configurations-periodic-table");
  assert.equal(ids.length, 6);
  assert.equal(new Set(ids).size, 6);
  const result = {
    attempts: 1,
    correct: true,
    independent: true,
    helpUsed: false,
  };
  const progress = {
    completedSteps: [],
    results: Object.fromEntries(
      ids.map((id, i) => [
        id,
        { ...result, independent: i !== 0, helpUsed: i === 0 },
      ]),
    ),
  };
  assert.equal(
    topicMastery("configurations-periodic-table", progress).percent,
    92,
  );
  assert.equal(topicMastery("electron-arrangements", progress).percent, 0);
});
test("continue learning chooses the unfinished current lesson or next available lesson", () => {
  const progress = emptyProgress();
  assert.equal(nextLearningLesson(progress).id, "first-18");
  progress.topics["electron-arrangements"] = {
    completedSteps: lessons[0]!.steps.map((s) => s.id),
    results: {},
  };
  assert.equal(nextLearningLesson(progress).id, "periodic-table");
  progress.currentTopicId = "configurations-periodic-table";
  progress.topics[progress.currentTopicId] = {
    completedSteps: ["valence-concept"],
    results: {},
  };
  assert.equal(nextLearningLesson(progress).id, "periodic-table");
  progress.topics[progress.currentTopicId]!.completedSteps =
    lessons[1]!.steps.map((s) => s.id);
  assert.equal(nextLearningLesson(progress).id, "periodic-table");
  progress.currentTopicId = "not-in-this-release";
  assert.equal(nextLearningLesson(progress).id, "first-18");
});
