// Rounded introductory hydrogen model: E_n = -2.18e-18 J / n².
// Zero is a free electron infinitely far away with zero kinetic energy.
export const HYDROGEN_BINDING_ENERGY = 2.18e-18;
export function hydrogenEnergy(n: number): number {
  if (!Number.isInteger(n) || n < 1)
    throw new Error("Hydrogen n must be a positive integer");
  return -HYDROGEN_BINDING_ENERGY / (n * n);
}
export const hydrogenTransitions = [
  { id: "excite", label: "n = 1 → 2: excite", from: 1, to: 2 },
  { id: "return", label: "n = 2 → 1: return to ground", from: 2, to: 1 },
  { id: "small-gap", label: "n = 3 → 2: smaller emission gap", from: 3, to: 2 },
  { id: "large-gap", label: "n = 3 → 1: larger emission gap", from: 3, to: 1 },
  {
    id: "ionize-ground",
    label: "n = 1 → free electron: ionize",
    from: 1,
    to: null,
  },
  {
    id: "ionize-excited",
    label: "n = 2 → free electron: ionize",
    from: 2,
    to: null,
  },
] as const;
export function hydrogenTransition(id: string) {
  const transition = hydrogenTransitions.find((t) => t.id === id);
  if (!transition) throw new Error("Unknown hydrogen transition");
  const initial = hydrogenEnergy(transition.from);
  const final = transition.to === null ? 0 : hydrogenEnergy(transition.to);
  return {
    ...transition,
    initial,
    final,
    delta: final - initial,
    photonEnergy: Math.abs(final - initial),
    ionization: transition.to === null,
  };
}
