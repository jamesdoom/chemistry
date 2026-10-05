import assert from "node:assert/strict";
import test from "node:test";
import {
  emptyArrangement,
  solutionArrangement,
  evaluateArrangement,
  electronCount,
  configurationParts,
} from "../src/utils/orbitals.ts";
import type { OrbitalArrangement } from "../src/types/orbitals.ts";
import { orbitalExercises } from "../src/data/practice/orbitals.ts";
const pair = ["up", "down"] as const;
function setup(entries: Record<string, ("up" | "down")[]>): OrbitalArrangement {
  return { ...emptyArrangement(), ...entries };
}
test("every neutral atom from H to Ar has a valid ground-state solution", () => {
  for (const exercise of orbitalExercises) {
    const solution = solutionArrangement(exercise.atomicNumber);
    assert.equal(electronCount(solution), exercise.atomicNumber);
    assert.deepEqual(
      evaluateArrangement(solution, exercise.atomicNumber).issues,
      [],
    );
    const reversed = Object.fromEntries(
      Object.entries(solution).map(([id, slots]) => [
        id,
        slots.map((s) => (s === "up" ? "down" : s === "down" ? "up" : null)),
      ]),
    );
    assert.equal(
      evaluateArrangement(reversed, exercise.atomicNumber).correct,
      true,
    );
  }
  assert.deepEqual(configurationParts(solutionArrangement(18)), [
    { label: "1s", count: 2 },
    { label: "2s", count: 2 },
    { label: "2p", count: 6 },
    { label: "3s", count: 2 },
    { label: "3p", count: 6 },
  ]);
  assert.throws(() => solutionArrangement(19), RangeError);
});
test("electron count, Aufbau, Pauli, and Hund are diagnosed independently", () => {
  assert.deepEqual(
    evaluateArrangement(emptyArrangement(), 8).issues.map((i) => i.rule),
    ["electron-count"],
  );
  const aufbau = setup({
    "1s-1": [...pair],
    "2p-1": [...pair],
    "2p-2": [...pair],
    "2p-3": [...pair],
  });
  assert.deepEqual(
    evaluateArrangement(aufbau, 8).issues.map((i) => i.rule),
    ["aufbau"],
  );
  assert.match(
    evaluateArrangement(aufbau, 8).issues[0]!.message,
    /2s still has room/,
  );
  assert.deepEqual(
    evaluateArrangement(setup({ "1s-1": ["up", "up"] }), 2).issues.map(
      (i) => i.rule,
    ),
    ["pauli"],
  );
  const earlyPair = setup({
    "1s-1": [...pair],
    "2s-1": [...pair],
    "2p-1": [...pair],
    "2p-2": [...pair],
  });
  assert.deepEqual(
    evaluateArrangement(earlyPair, 8).issues.map((i) => i.rule),
    ["hund"],
  );
  const mixed = setup({
    "1s-1": [...pair],
    "2s-1": [...pair],
    "2p-1": [...pair],
    "2p-2": ["up"],
    "2p-3": ["down"],
  });
  assert.deepEqual(
    evaluateArrangement(mixed, 8).issues.map((i) => i.rule),
    ["hund"],
  );
  assert.match(
    evaluateArrangement(mixed, 8).issues[0]!.message,
    /different directions/,
  );
  assert.ok(
    evaluateArrangement(setup({ "1s-1": ["up", "down", "up"] }), 3).issues.some(
      (i) => i.rule === "pauli",
    ),
  );
});
test("p-box permutations, slot position, and different full-pair orientations are valid", () => {
  const oxygen = setup({
    "1s-1": ["down", "up"],
    "2s-1": [...pair],
    "2p-1": ["down"],
    "2p-2": ["down"],
    "2p-3": ["up", "down"],
  });
  assert.equal(evaluateArrangement(oxygen, 8).correct, true);
  const secondSlot = emptyArrangement();
  secondSlot["1s-1"] = [null, "down"];
  assert.equal(evaluateArrangement(secondSlot, 1).correct, true);
});
test("multiple mistakes are reported without accepting a matching electron total", () => {
  const errors = setup({
    "1s-1": ["up", "up"],
    "2p-1": ["up", "up"],
    "3s-1": [...pair],
    "3p-1": [...pair],
  });
  const result = evaluateArrangement(errors, 8);
  assert.equal(result.electronCount, 8);
  assert.equal(result.correct, false);
  assert.deepEqual(
    new Set(result.issues.map((i) => i.rule)),
    new Set(["pauli", "aufbau", "hund"]),
  );
});
