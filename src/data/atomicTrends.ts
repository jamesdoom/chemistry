import type { TrendComparison } from "../types/trends";
export const trendComparisons: TrendComparison[] = [
  {
    id: "size-down",
    property: "size",
    title: "Atomic size: lithium → sodium",
    atomicNumbers: [3, 11],
    favoredAtomicNumber: 11,
    explanation:
      "Sodium occupies level 3; lithium’s outer electron is in level 2. The extra occupied level makes sodium larger. More inner electrons also screen the outer electron from the nucleus. The greater nuclear charge does not make sodium smaller than lithium.",
    reason:
      "Down a group: another occupied level and more shielding usually increase atomic size.",
  },
  {
    id: "size-across",
    property: "size",
    title: "Atomic size: sodium → chlorine",
    atomicNumbers: [11, 17],
    favoredAtomicNumber: 11,
    explanation:
      "Both atoms have outer electrons in level 3 and 10 inner electrons. Chlorine has 17 protons rather than 11. Electrons added to the same outer level do not screen this added nuclear charge as effectively as inner electrons do, so the net pull increases and chlorine is smaller.",
    reason:
      "Across a period: the outer level stays the same while the effective nuclear pull generally increases.",
  },
  {
    id: "ie-down",
    property: "ionization",
    title: "First ionization energy: lithium → sodium",
    atomicNumbers: [3, 11],
    favoredAtomicNumber: 3,
    explanation:
      "Sodium’s outer electron is farther from the nucleus on average and is screened by more inner electrons. It takes less energy to remove than lithium’s outer electron. Both ionizations still require an input of energy.",
    reason:
      "Down a group: greater distance and shielding usually lower first ionization energy.",
  },
  {
    id: "ie-across",
    property: "ionization",
    title: "First ionization energy: sodium → chlorine",
    atomicNumbers: [11, 17],
    favoredAtomicNumber: 17,
    explanation:
      "Across this pair in period 3, chlorine’s stronger effective nuclear pull holds its outer electrons more tightly. Removing one generally requires more energy than removing sodium’s lone outer electron.",
    reason:
      "Across a period: stronger effective nuclear attraction generally raises first ionization energy.",
  },
  {
    id: "ie-pairing-exception",
    property: "ionization",
    title: "Exception: nitrogen → oxygen",
    atomicNumbers: [7, 8],
    favoredAtomicNumber: 7,
    exception: true,
    explanation:
      "Nitrogen has 2p³: one electron in each p orbital. Oxygen has 2p⁴, so one orbital contains a pair. Repulsion within that pair makes an electron easier to remove from oxygen. Oxygen’s first ionization energy is lower despite having more protons.",
    reason:
      "Orbital occupancy matters: pairing can make removal easier even when nuclear charge increases.",
  },
  {
    id: "ie-sublevel-exception",
    property: "ionization",
    title: "Exception: beryllium → boron",
    atomicNumbers: [4, 5],
    favoredAtomicNumber: 4,
    exception: true,
    explanation:
      "Beryllium’s outer arrangement is 2s². Boron adds a 2p electron: 2s² 2p¹. That higher-energy 2p electron is easier to remove than a 2s electron from beryllium. Boron therefore has a lower first ionization energy.",
    reason:
      "Sublevel energies matter: the first p electron can be easier to remove than an s electron.",
  },
];
export const trendScienceSource =
  "https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties";
