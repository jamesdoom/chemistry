import type { Chapter, Lesson, PracticeQuestion } from "../../types/curriculum";
import { periodicLesson } from "./periodicLesson.ts";
import { trendsLesson } from "./trendsLesson.ts";
import { rutherfordLesson } from "./rutherfordLesson.ts";
export const topicId = "electron-arrangements";
export const chapter11: Chapter = {
  id: "chapter-11",
  number: 11,
  title: "Modern Atomic Theory",
  sections: [
    {
      id: "11.1",
      number: "11.1",
      title: "Atoms and Energy",
      topics: [
        "Rutherford’s Atom",
        "Energy and Light",
        "Emission of Energy by Atoms",
        "Section 11.1 Assessment",
      ].map((title, i) => ({
        id: `11.1-${i}`,
        title,
        ...(i === 0 ? { lessonId: "rutherford" } : {}),
      })),
    },
    {
      id: "11.2",
      number: "11.2",
      title: "The Hydrogen Atom",
      topics: [
        "The Energy Levels of Hydrogen",
        "The Bohr Model of the Atom",
        "The Wave Mechanical Model of the Atom",
        "Section 11.2 Assessment",
      ].map((title, i) => ({ id: `11.2-${i}`, title })),
    },
    {
      id: "11.3",
      number: "11.3",
      title: "Atomic Orbitals",
      topics: [
        "The Hydrogen Orbitals",
        "The Wave Mechanical Model: Further Development",
        "Section 11.3 Assessment",
      ].map((title, i) => ({ id: `11.3-${i}`, title })),
    },
    {
      id: "11.4",
      number: "11.4",
      title: "Electron Configurations and Atomic Properties",
      topics: [
        {
          id: topicId,
          title:
            "Electron Arrangements in the First 18 Atoms on the Periodic Table",
          lessonId: "first-18",
        },
        {
          id: "configurations-periodic-table",
          title: "Electron Configurations and the Periodic Table",
          lessonId: "periodic-table",
        },
        {
          id: "atomic-properties",
          title: "Atomic Properties and the Periodic Table",
          lessonId: "atomic-trends",
        },
        {
          id: "11.4-assessment",
          title: "Section 11.4 Assessment",
          assessmentId: "11.4-assessment",
        },
      ],
    },
  ],
};
const questions: PracticeQuestion[] = [
  {
    id: "neutral-count",
    topicId,
    prompt:
      "Nitrogen has atomic number 7. How many electrons does a neutral nitrogen atom have?",
    answer: "7",
    inputPlaceholder: "Electron count",
    fallbackFeedback:
      "Neutral means equal numbers of protons and electrons. Use the atomic number to count protons first.",
    explanation:
      "Atomic number counts protons. A neutral atom has equal numbers of protons and electrons, so nitrogen has 7 electrons.",
    hints: [
      { text: "Atomic number tells you the number of protons." },
      {
        text: "Neutral means the positive and negative charges balance. Match electrons to protons.",
      },
    ],
    misconceptionFeedback: {
      "14": "Adding protons and electrons counts two different particles. We only want electrons.",
      "8": "That is the count for neutral oxygen. Nitrogen’s atomic number is 7.",
    },
    workedSolution: [
      "Atomic number 7 → 7 protons.",
      "Neutral atom → electrons equal protons.",
      "Therefore nitrogen has 7 electrons.",
    ],
    difficulty: "introductory",
  },
  {
    id: "nitrogen-config",
    topicId,
    prompt:
      "Write nitrogen’s ground-state electron configuration. It has 7 electrons. Use plain numbers, like 1s2 2s2 2p3.",
    answer: "1s2 2s2 2p3",
    inputPlaceholder: "e.g. 1s2 2s2 …",
    fallbackFeedback:
      "Check your electron total, filling order, and sublevel capacities: s holds 2, p holds 6. Use spaces between entries, such as 1s2 2s2.",
    explanation:
      "Two electrons occupy 1s, two occupy 2s, and the remaining three occupy 2p. The exponents add to 7.",
    hints: [
      {
        text: "For these atoms, fill 1s, then 2s, then 2p. Each s sublevel holds at most 2.",
      },
      {
        text: "After 1s and 2s are full, 4 electrons have been placed. Subtract 4 from 7.",
      },
    ],
    misconceptionFeedback: {
      "1s2 2s2 2p4":
        "That configuration has 8 electrons. Nitrogen needs 7. Count the superscripts.",
      "1s2 2s5":
        "An s sublevel contains one orbital and can hold only 2 electrons. Place the rest in 2p.",
      "1s2 2p5":
        "The 2s sublevel fills before 2p in the ground state. Include 2s before placing electrons in 2p.",
    },
    workedSolution: [
      "Start with 7 electrons.",
      "Fill 1s with 2, leaving 5.",
      "Fill 2s with 2, leaving 3.",
      "Place 3 in 2p: 1s² 2s² 2p³.",
    ],
    difficulty: "standard",
  },
  {
    id: "argon-check",
    topicId,
    prompt:
      "Try this on your own: write the ground-state configuration of neutral argon (atomic number 18). Use plain-number notation.",
    answer: "1s2 2s2 2p6 3s2 3p6",
    inputPlaceholder: "e.g. 1s2 2s2 …",
    fallbackFeedback:
      "Check your electron total, filling order, and sublevel capacities: s holds 2, p holds 6. Use spaces between entries, such as 1s2 2s2.",
    explanation:
      "The occupations 2 + 2 + 6 + 2 + 6 total 18. Argon has a filled outer s and p shell and is in group 18, period 3.",
    hints: [
      { text: "Use the order 1s, 2s, 2p, 3s, 3p for the first 18 atoms." },
      {
        text: "Each s holds 2 and each p holds 6. Check that your total is 18.",
      },
    ],
    misconceptionFeedback: {
      "1s2 2s2 2p6 3s2 3p4":
        "The exponents total 16. Neutral argon needs 18 electrons.",
    },
    workedSolution: [
      "18 protons → 18 electrons in a neutral atom.",
      "1s² 2s² 2p⁶ places 10 electrons.",
      "3s² places 2 more; 6 remain.",
      "3p⁶ finishes the arrangement: 1s² 2s² 2p⁶ 3s² 3p⁶.",
    ],
    difficulty: "standard",
  },
];
export const firstLesson: Lesson = {
  id: "first-18",
  topicId,
  title: "Making sense of electron arrangements",
  subtitle: "First 18 atoms · Section 11.4 · About 12 minutes",
  summary: "Atomic number → electrons → orbitals → electron configuration.",
  completionActions: [
    {
      label: "Learn valence electrons and the periodic table →",
      to: "/lessons/periodic-table",
    },
    { label: "Practice orbital filling →", to: "/practice/orbitals" },
  ],
  steps: [
    {
      id: "concept",
      kind: "explanation",
      title: "Start with the atom, not the chart",
      chain: ["Atomic number", "Protons", "Electrons in a neutral atom"],
      continueLabel: "Let’s see where electrons go →",
      text: "Atomic number counts protons. In a neutral atom, every positive proton is balanced by one negative electron. Once you know how many electrons you have, you can work out where they go.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Find the atomic number. That is the proton count. If the atom is neutral, it is also the electron count. Oxygen’s number is 8, so a neutral oxygen atom has 8 electrons.",
        },
        {
          label: "Visual explanation",
          text: "Oxygen: 8 positive charges (+) balance 8 negative charges (−). 8 protons → neutral atom → 8 electrons.",
        },
        {
          label: "Concrete analogy",
          text: "Think of positive and negative charges as equal weights on a balance. For a neutral atom the sides balance. This analogy is about charge, not where particles sit.",
        },
        {
          label: "Worked example",
          text: "Neutral carbon has atomic number 6. Step 1: count 6 protons. Step 2: neutrality requires 6 electrons. Next we arrange those 6 electrons in orbitals.",
        },
      ],
    },
    {
      id: "visual",
      kind: "visual",
      title: "A configuration is an electron address",
      visual: { kind: "oxygen-orbitals" },
      note: "For the first 18 atoms, the filling sequence is 1s → 2s → 2p → 3s → 3p. Ground state means the lowest-energy arrangement.",
      continueLabel: "Work through oxygen →",
      text: "The number (2) names an energy level. The letter (p) names a sublevel. The superscript (4) counts electrons in that sublevel. An orbital is a region described by a wave function where an electron may be found, not a circular track. An s sublevel has 1 orbital; a p sublevel has 3. Each orbital holds at most 2 electrons with opposite spins.",
    },
    {
      id: "example",
      kind: "example",
      title: "Build oxygen, one step at a time",
      visual: { kind: "oxygen-orbitals" },
      continueLabel: "Try it with guidance →",
      steps: [
        "Oxygen has atomic number 8 → 8 protons → 8 electrons when neutral.",
        "In the ground state, fill lower-energy sublevels first (Aufbau): 1s, 2s, then 2p. Put 2 in 1s and 2 in 2s.",
        "Four electrons remain for 2p. Place one in each of the three orbitals with parallel spins before pairing (Hund’s rule).",
        "A paired orbital has opposite spins (Pauli exclusion). The result is 1s² 2s² 2p⁴. Check: 2 + 2 + 4 = 8.",
        "Oxygen’s highest occupied level is 2: period 2. Its outer 2s² 2p⁴ contains 6 valence electrons: group 16. Valence electrons help explain bonding; trends need more than electron counts alone.",
      ],
    },
    {
      id: "practice-1",
      kind: "practice",
      title: "First, count the electrons",
      question: questions[0]!,
    },
    {
      id: "practice-2",
      kind: "practice",
      title: "Now give them an address",
      question: questions[1]!,
    },
    {
      id: "checkpoint",
      kind: "checkpoint",
      title: "Your mastery check",
      question: questions[2]!,
    },
  ],
};
export const lessons = [
  firstLesson,
  periodicLesson,
  trendsLesson,
  rutherfordLesson,
];
