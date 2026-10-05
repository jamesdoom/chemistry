import assert from "node:assert/strict";
import test from "node:test";
import { calculateMastery } from "../src/utils/mastery.ts";
import {
  loadProgress,
  saveProgress,
  emptyProgress,
} from "../src/utils/storage.ts";
test("mastery distinguishes no evidence, supported success, and independent success", () => {
  assert.deepEqual(calculateMastery(undefined, 3), {
    percent: 0,
    state: "NOT_STARTED",
  });
  assert.equal(
    calculateMastery({ completedSteps: ["concept"], results: {} }, 3).state,
    "LEARNING",
  );
  const supported = {
    attempts: 2,
    correct: true,
    independent: false,
    helpUsed: true,
  };
  assert.equal(
    calculateMastery(
      {
        completedSteps: [],
        results: { a: supported, b: supported, c: supported },
      },
      3,
    ).percent,
    50,
  );
  const independent = { ...supported, independent: true, helpUsed: false };
  assert.deepEqual(
    calculateMastery(
      {
        completedSteps: [],
        results: { a: independent, b: independent, c: independent },
      },
      3,
    ),
    { percent: 100, state: "MASTERED" },
  );
  assert.equal(
    calculateMastery(
      { completedSteps: [], results: { a: { ...supported, correct: false } } },
      3,
    ).percent,
    0,
  );
});
test("storage roundtrips progress and rejects damaged data", () => {
  let stored: string | null = null;
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: () => stored,
      setItem: (_key: string, value: string) => {
        stored = value;
      },
    },
  });
  const progress = emptyProgress();
  progress.xp = 10;
  progress.topics.test = {
    completedSteps: ["concept"],
    results: {
      q: { attempts: 1, correct: true, independent: true, helpUsed: false },
    },
  };
  assert.equal(saveProgress(progress), true);
  assert.deepEqual(loadProgress(), progress);
  stored = "{bad";
  assert.deepEqual(loadProgress(), emptyProgress());
  stored =
    '{"version":1,"xp":10,"currentTopicId":"test","topics":{"test":{"completedSteps":[],"results":{"q":null}}}}';
  assert.deepEqual(loadProgress(), emptyProgress());
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get: () => {
      throw new Error("blocked");
    },
  });
  assert.deepEqual(loadProgress(), emptyProgress());
  assert.equal(saveProgress(progress), false);
});
