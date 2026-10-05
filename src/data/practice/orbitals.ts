import type { OrbitalExercise, Sublevel } from "../../types/orbitals";
export const sublevels: Sublevel[] = [
  { label: "1s", orbitals: ["1s-1"] },
  { label: "2s", orbitals: ["2s-1"] },
  { label: "2p", orbitals: ["2p-1", "2p-2", "2p-3"] },
  { label: "3s", orbitals: ["3s-1"] },
  { label: "3p", orbitals: ["3p-1", "3p-2", "3p-3"] },
];
export const orbitalRuleGuides = [
  {
    rule: "Aufbau",
    text: "Fill lower-energy sublevels before higher ones. Here: 1s → 2s → 2p → 3s → 3p.",
  },
  {
    rule: "Pauli",
    text: "One orbital holds at most two electrons. If two share a box, their spins must be opposite: ↑↓.",
  },
  {
    rule: "Hund",
    text: "Within a p sublevel, place one electron in each orbital with parallel spins before pairing. Either all ↑ or all ↓ is valid.",
  },
];
const atoms = [
  ["H", "Hydrogen"],
  ["He", "Helium"],
  ["Li", "Lithium"],
  ["Be", "Beryllium"],
  ["B", "Boron"],
  ["C", "Carbon"],
  ["N", "Nitrogen"],
  ["O", "Oxygen"],
  ["F", "Fluorine"],
  ["Ne", "Neon"],
  ["Na", "Sodium"],
  ["Mg", "Magnesium"],
  ["Al", "Aluminum"],
  ["Si", "Silicon"],
  ["P", "Phosphorus"],
  ["S", "Sulfur"],
  ["Cl", "Chlorine"],
  ["Ar", "Argon"],
] as const;
export const orbitalExercises: OrbitalExercise[] = atoms.map(
  ([symbol, name], index) => ({
    id: `orbital-${index + 1}`,
    topicId: "electron-arrangements",
    atomicNumber: index + 1,
    symbol,
    name,
    prompt: `Build the ground-state orbital diagram for neutral ${name.toLowerCase()}. Atomic number ${index + 1} means ${index + 1} protons and ${index + 1} electrons.`,
    hints: [
      "Count your arrows first. A neutral atom needs one electron for each proton.",
      "Work upward through the energy order shown. Fill each s orbital with opposite spins before moving on. For p, spread electrons across all three boxes before pairing.",
    ],
    walkthrough: [
      `Set aside ${index + 1} electrons. Start with the lowest-energy sublevel, 1s.`,
      "Each s sublevel has one box holding up to two opposite-spin electrons. Each p sublevel has three boxes holding up to six in total.",
      "Fill 1s, then 2s, then 2p, then 3s, then 3p as needed. In a partially filled p sublevel, keep unpaired spins parallel.",
      "Finish placing the remaining electrons yourself. Count all the arrows and check each occupied box.",
    ],
  }),
);
