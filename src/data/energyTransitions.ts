// Invented three-level teaching model. These are relative energies in illustrative units,
// not measured values for a real element. All listed transitions are assumed allowed.
export const illustrativeLevels = [
  { id: "low", label: "A", energy: 0 },
  { id: "middle", label: "B", energy: 2 },
  { id: "high", label: "C", energy: 5 },
] as const;
export const energyTransitions = [
  { id: "absorb", label: "A → B: absorb energy", from: "low", to: "middle" },
  {
    id: "emit-small",
    label: "B → A: emit a smaller gap",
    from: "middle",
    to: "low",
  },
  {
    id: "emit-large",
    label: "C → A: emit a larger gap",
    from: "high",
    to: "low",
  },
  {
    id: "emit-upper",
    label: "C → B: emit the upper gap",
    from: "high",
    to: "middle",
  },
] as const;
export function transitionFacts(id: string) {
  const transition = energyTransitions.find((t) => t.id === id);
  if (!transition) throw new Error("Unknown transition");
  const from = illustrativeLevels.find((l) => l.id === transition.from)!;
  const to = illustrativeLevels.find((l) => l.id === transition.to)!;
  return {
    from,
    to,
    delta: to.energy - from.energy,
    photonEnergy: Math.abs(to.energy - from.energy),
    absorption: to.energy > from.energy,
  };
}
export const illustrativeLines = [2, 3, 5];
