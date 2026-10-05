import assert from "node:assert/strict";
import test from "node:test";
import {
  hydrogenEnergy,
  hydrogenTransition,
  HYDROGEN_BINDING_ENERGY,
} from "../src/data/hydrogen.ts";
import { chapter11, lessons } from "../src/data/chapters/chapter11.ts";
import { hydrogenLevelsLesson } from "../src/data/chapters/hydrogenLevelsLesson.ts";
import { bohrLesson } from "../src/data/chapters/bohrLesson.ts";
import { topicMastery, nextLearningLesson } from "../src/utils/learning.ts";
import { emptyProgress } from "../src/utils/storage.ts";
test("hydrogen levels crowd toward zero with correct excitation, emission, ionization", () => {
  assert.equal(hydrogenEnergy(1), -HYDROGEN_BINDING_ENERGY);
  assert.equal(hydrogenEnergy(2), -HYDROGEN_BINDING_ENERGY / 4);
  assert.ok(hydrogenEnergy(3) > hydrogenEnergy(2));
  assert.ok(hydrogenEnergy(3) < 0);
  assert.ok(hydrogenTransition("excite").delta > 0);
  assert.ok(hydrogenTransition("return").delta < 0);
  assert.ok(
    hydrogenTransition("small-gap").photonEnergy <
      hydrogenTransition("return").photonEnergy,
  );
  assert.equal(hydrogenTransition("ionize-ground").final, 0);
  assert.equal(
    hydrogenTransition("ionize-ground").photonEnergy,
    HYDROGEN_BINDING_ENERGY,
  );
  assert.ok(
    hydrogenTransition("ionize-excited").photonEnergy <
      hydrogenTransition("ionize-ground").photonEnergy,
  );
  for (const n of [0, -1, 2.5, NaN, Infinity])
    assert.throws(() => hydrogenEnergy(n));
  assert.throws(() => hydrogenTransition("unknown"));
});
test("two lessons retain separate evidence and ordered continuation", () => {
  assert.equal(chapter11.sections[1]!.topics[0]!.lessonId, "hydrogen-levels");
  assert.equal(chapter11.sections[1]!.topics[1]!.lessonId, "bohr-model");
  for (const lesson of [hydrogenLevelsLesson, bohrLesson]) {
    assert.equal(lesson.steps.length, 7);
    const qs = lesson.steps.flatMap((s) =>
      s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
    );
    assert.equal(qs.length, 4);
    for (const q of qs) {
      assert.equal(q.topicId, lesson.topicId);
      assert.equal(q.hints.length, 2);
      assert.ok(q.choices!.some((c) => c.value === q.answer));
      for (const c of q.choices!)
        if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
    }
    assert.equal(
      topicMastery(lesson.topicId, {
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
      25,
    );
  }
  const p = emptyProgress();
  for (const l of lessons.filter(
    (l) => l.id !== "hydrogen-levels" && l.id !== "bohr-model",
  ))
    p.topics[l.topicId] = {
      completedSteps: l.steps.map((s) => s.id),
      results: {},
    };
  assert.equal(nextLearningLesson(p).id, "hydrogen-levels");
  p.topics["11.2-0"] = {
    completedSteps: hydrogenLevelsLesson.steps.map((s) => s.id),
    results: {},
  };
  assert.equal(nextLearningLesson(p).id, "bohr-model");
});
