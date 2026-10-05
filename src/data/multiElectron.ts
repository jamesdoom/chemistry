import { orbitalSublevels } from "./hydrogenOrbitals.ts";
export const sublevelCapacities = orbitalSublevels.map((s) => ({
  ...s,
  capacity: s.count * 2,
}));
export const energyComparisons = [
  {
    id: "hydrogen",
    label: "Hydrogen (one electron)",
    sY: 100,
    pY: 100,
    explanation:
      "In the basic isolated-hydrogen model, 2s and 2p share the same energy. No electron–electron repulsion is present.",
  },
  {
    id: "multi",
    label: "Multi-electron atom",
    sY: 150,
    pY: 70,
    explanation:
      "In our introductory multi-electron model, 2s lies below 2p. Electron–electron repulsion, shielding, and different penetration split sublevel energies. The three 2p orbitals still share one energy without an applied field.",
  },
] as const;
export const spinPairs = [
  {
    id: "opposite",
    arrows: "↑↓",
    label: "Opposite spins",
    feedback:
      "Allowed: two electrons in one orbital must have opposite spin projections. Pauli permits this pair.",
  },
  {
    id: "same",
    arrows: "↑↑",
    label: "Same spins",
    feedback:
      "Not allowed in one orbital: the two electrons would share the same orbital and spin state. Pauli requires opposite spins.",
  },
] as const;
