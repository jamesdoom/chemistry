import assert from "node:assert/strict";
import test from "node:test";
import {
  cloudSamples,
  probabilitySamples,
} from "../src/data/probabilityCloud.ts";
import { waveMechanicalLesson } from "../src/data/chapters/waveMechanicalLesson.ts";
import { chapter11 } from "../src/data/chapters/chapter11.ts";
test("synthetic independent probability samples are reproducible and finite", () => {
  assert.equal(probabilitySamples.length, 240);
  assert.deepEqual(cloudSamples(40), probabilitySamples.slice(0, 40));
  assert.equal(new Set(probabilitySamples.map((p) => p.id)).size, 240);
  for (const p of probabilitySamples) {
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
  }
  const many = cloudSamples(5000);
  assert.ok(
    many.filter((p) => Math.hypot(p.x - 250, p.y - 190) < 30).length >
      many.filter((p) => Math.hypot(p.x - 250, p.y - 190) > 90).length,
  );
});
test("wave mechanical lesson has stable identity and full question feedback", () => {
  assert.equal(chapter11.sections[1]!.topics[2]!.lessonId, "wave-mechanical");
  assert.equal(waveMechanicalLesson.steps.length, 7);
  const qs = waveMechanicalLesson.steps.flatMap((s) =>
    s.kind === "practice" || s.kind === "checkpoint" ? [s.question] : [],
  );
  assert.equal(qs.length, 4);
  for (const q of qs) {
    assert.equal(q.topicId, "11.2-2");
    assert.equal(q.hints.length, 2);
    for (const c of q.choices!)
      if (c.value !== q.answer) assert.ok(q.misconceptionFeedback[c.value]);
  }
});
