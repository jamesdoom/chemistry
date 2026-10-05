import type { Lesson, PracticeQuestion } from "../../types/curriculum";
export const periodicTopicId = "configurations-periodic-table";
const questions: PracticeQuestion[] = [
  {
    id: "nitrogen-valence",
    topicId: periodicTopicId,
    prompt:
      "Nitrogen has 7 total electrons and configuration 1s² 2s² 2p³. How many are valence electrons?",
    answer: "5",
    inputPlaceholder: "Valence-electron count",
    fallbackFeedback:
      "Find the highest occupied energy level, then add only the electrons in sublevels with that leading number.",
    explanation:
      "Level 2 is the outermost occupied level. Count 2s² and 2p³: 2 + 3 = 5 valence electrons. The 1s² electrons are inner electrons.",
    hints: [
      {
        text: "The leading number is the energy level. Which number is highest here?",
      },
      { text: "Only 2s and 2p belong to level 2. Add their superscripts." },
    ],
    misconceptionFeedback: {
      "7": "Seven is the total electron count. Valence electrons are only those in the outermost occupied level. Leave out 1s².",
      "3": "You counted only 2p³. The 2s² electrons share the same outer level and also count.",
      "2": "The leading 2 names the level, not the number of valence electrons. Add the superscripts of all sublevels in that level.",
    },
    workedSolution: [
      "The highest occupied level is 2.",
      "The outer sublevels are 2s² and 2p³.",
      "Add their electron counts: 2 + 3 = 5.",
    ],
    difficulty: "introductory",
  },
  {
    id: "oxygen-period",
    topicId: periodicTopicId,
    prompt:
      "Oxygen has configuration 1s² 2s² 2p⁴. Which period (row) is it in?",
    answer: "2",
    inputPlaceholder: "Period number",
    fallbackFeedback:
      "A period matches the highest occupied energy level for these neutral ground-state atoms. Look at the leading numbers, not the superscripts.",
    explanation:
      "The highest occupied energy level is 2, so oxygen is in period 2. The superscript 4 counts electrons in 2p; it does not name a period.",
    hints: [
      {
        text: "Periods are rows. For the first 18 atoms, the row number matches the highest occupied energy level.",
      },
      { text: "Compare the leading numbers in 1s, 2s, and 2p." },
    ],
    misconceptionFeedback: {
      "4": "The superscript 4 counts electrons in 2p. A period comes from the leading number naming the highest occupied level.",
      "6": "Six is oxygen’s valence-electron count. The period names its highest occupied energy level.",
      "16": "Group 16 is a column. We are looking for the row: its period.",
      "8": "Eight is oxygen’s total electron count. Periods describe occupied energy levels.",
    },
    workedSolution: [
      "Read the level numbers: 1, 2, and 2.",
      "The highest occupied level is 2.",
      "Oxygen belongs to period 2.",
    ],
    difficulty: "introductory",
  },
  {
    id: "neon-group",
    topicId: periodicTopicId,
    prompt:
      "Neon has configuration 1s² 2s² 2p⁶ and 8 valence electrons. Which group (column) is it in? Use the modern 1–18 group number.",
    answer: "18",
    inputPlaceholder: "Group number (1–18)",
    fallbackFeedback:
      "For these main-group atoms, groups 13–18 have 3–8 valence electrons. The valence count and modern group number are different numbers.",
    explanation:
      "Neon has a filled outer level: 2s² 2p⁶. Eight valence electrons place it in group 18, the noble-gas column.",
    hints: [
      {
        text: "Neon belongs to the right-hand main-group columns: groups 13–18.",
      },
      { text: "For those columns, add 10 to the valence-electron count." },
    ],
    misconceptionFeedback: {
      "8": "Eight is the valence-electron count. In modern numbering, the main-group columns with 3–8 valence electrons are groups 13–18.",
      "2": "Two is neon’s period, its row. The group is its column.",
      "10": "Ten is neon’s total electron count. Use the outer electrons to locate its main-group column.",
    },
    workedSolution: [
      "Level 2 has 2 + 6 = 8 valence electrons.",
      "For groups 13–18, group number = valence count + 10.",
      "8 + 10 = 18, so neon is in group 18.",
    ],
    difficulty: "standard",
  },
  {
    id: "magnesium-valence-check",
    topicId: periodicTopicId,
    prompt:
      "On your own: neutral magnesium has configuration 1s² 2s² 2p⁶ 3s². How many valence electrons does it have?",
    answer: "2",
    inputPlaceholder: "Valence-electron count",
    fallbackFeedback:
      "Separate inner electrons from the outermost occupied level. Count only the electrons with the highest leading level number.",
    explanation:
      "Level 3 is outermost. Only 3s² belongs to that level, giving 2 valence electrons.",
    hints: [
      { text: "Find the highest leading number in the configuration." },
      { text: "Which sublevels belong to level 3? Count their superscripts." },
    ],
    misconceptionFeedback: {
      "12": "Twelve counts every electron. Valence electrons are only in the highest occupied level.",
      "3": "Three names the outer energy level. Its superscript tells you the electron count.",
      "8": "Eight counts the electrons in level 2. Magnesium also occupies level 3, so level 2 is now an inner level.",
    },
    workedSolution: [
      "The occupied levels are 1, 2, and 3.",
      "The highest is 3, with 3s².",
      "The superscript 2 means 2 valence electrons.",
    ],
    difficulty: "standard",
  },
  {
    id: "magnesium-period-check",
    topicId: periodicTopicId,
    prompt: "Magnesium: 1s² 2s² 2p⁶ 3s². Which period is it in?",
    answer: "3",
    inputPlaceholder: "Period number",
    fallbackFeedback:
      "Read the highest occupied level from the leading numbers. Superscripts count electrons; they do not name the period.",
    explanation:
      "Magnesium’s highest occupied level is 3, so it is in period 3.",
    hints: [
      { text: "For these atoms, period = highest occupied energy level." },
      {
        text: "Look at the leading number of the final occupied sublevel, 3s.",
      },
    ],
    misconceptionFeedback: {
      "2": "Two is the outer electron count in 3s². The leading 3 tells you the occupied energy level.",
      "6": "Six is a superscript in an inner sublevel. Find the highest leading level number.",
      "12": "Twelve is the total electron count, not a row number.",
    },
    workedSolution: [
      "The leading level numbers are 1, 2, 2, and 3.",
      "The highest occupied level is 3.",
      "Magnesium is in period 3.",
    ],
    difficulty: "standard",
  },
  {
    id: "magnesium-group-check",
    topicId: periodicTopicId,
    prompt:
      "Magnesium: 1s² 2s² 2p⁶ 3s². It has 2 valence electrons. Which group is it in?",
    answer: "2",
    inputPlaceholder: "Group number (1–18)",
    fallbackFeedback:
      "Magnesium is in the left-hand s-block. Groups 1 and 2 have 1 and 2 valence electrons. Helium is the special case, not magnesium.",
    explanation:
      "Magnesium ends in 3s² and belongs to group 2. Helium also has two valence electrons, but its filled first level places it in the noble-gas column, group 18.",
    hints: [
      {
        text: "The configuration ends in s². Magnesium is in one of the first two columns.",
      },
      {
        text: "Group 1 has one valence electron; group 2 has two. The helium exception does not apply here.",
      },
    ],
    misconceptionFeedback: {
      "12": "Adding 10 applies to the p-block groups 13–18. Magnesium’s outer sublevel is s², so use the left-hand groups 1 or 2.",
      "3": "Three is magnesium’s period. Its group is a column based on the outer-electron pattern.",
      "18": "Helium is the two-electron exception in group 18. Magnesium’s first two levels are inner levels; its outer level is 3s².",
    },
    workedSolution: [
      "The outer configuration is 3s².",
      "That is an s-block atom with 2 valence electrons.",
      "Magnesium belongs to group 2.",
    ],
    difficulty: "standard",
  },
];
export const periodicLesson: Lesson = {
  id: "periodic-table",
  topicId: periodicTopicId,
  title: "From electron addresses to the periodic table",
  subtitle:
    "Section 11.4 · Valence electrons, periods, and groups · About 12 minutes",
  summary:
    "Outer energy level → period. Valence-electron pattern → main-group column. You can now read an atom’s configuration as a clue to its location.",
  completionActions: [
    { label: "Review electron arrangements →", to: "/lessons/first-18" },
  ],
  steps: [
    {
      id: "valence-concept",
      kind: "explanation",
      title: "All electrons are not outer electrons",
      text: "An electron configuration counts every electron. Valence electrons are the electrons in the outermost occupied energy level for the atoms in this lesson. They help explain how an atom bonds. First find the highest leading level number; then count the electrons in every sublevel of that level.",
      chain: ["Configuration", "Highest occupied level", "Outer electrons"],
      continueLabel: "Find oxygen’s outer electrons →",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Find the biggest level number before an s or p. Keep only the entries with that number. Add their superscripts. Those are the outer, or valence, electrons.",
        },
        {
          label: "Visual explanation",
          text: "Oxygen: [1s²: inner] [2s² + 2p⁴: outer]. Level 2 is outside level 1 in this counting model. The outer count is 2 + 4 = 6.",
        },
        {
          label: "Concrete analogy",
          text: "Think of an address with a floor number and room labels. “2s” and “2p” have the same floor number. To count everyone on the highest occupied floor, include both rooms. Real orbitals are probability distributions, not rooms or circular paths.",
        },
        {
          label: "Worked example",
          text: "Nitrogen: 1s² 2s² 2p³. Highest level: 2. Outer entries: 2s² and 2p³. Valence count: 2 + 3 = 5; total electron count: 7.",
        },
      ],
    },
    {
      id: "oxygen-valence-visual",
      kind: "visual",
      title: "See the difference: 8 total, 6 outer",
      text: "Oxygen’s 1s² electrons are inner electrons. Its 2s² and 2p⁴ electrons share the highest occupied level, 2, so both sublevels contribute to the valence count.",
      visual: { kind: "valence", atomicNumber: 8 },
      note: "The highlighted entries are also labeled “outer.” Color is only an extra cue. This diagram groups electrons by level; it does not show their paths.",
      continueLabel: "Connect the pattern to a location →",
    },
    {
      id: "oxygen-location-example",
      kind: "example",
      title: "Locate oxygen step by step",
      visual: { kind: "valence", atomicNumber: 8 },
      continueLabel: "Explore the first 18 atoms →",
      steps: [
        "Start with 1s² 2s² 2p⁴. The leading numbers are 1, 2, and 2.",
        "The highest occupied level is 2. For these neutral ground-state atoms, that gives period 2: the second row.",
        "Count only the outer entries: 2s² + 2p⁴ = 6 valence electrons.",
        "On the right of the table, groups 13–18 correspond to 3–8 valence electrons. Six valence electrons place oxygen in group 16.",
        "On the left, groups 1 and 2 correspond to 1 and 2 valence electrons. Helium is an exception: 1s² fills its only occupied level, so it belongs to group 18 with the noble gases. These rules here cover the first 18 atoms, not transition metals.",
      ],
    },
    {
      id: "explore-periodic-patterns",
      kind: "periodic-table",
      title: "Compare nitrogen, oxygen, and neon",
      text: "Select nitrogen, oxygen, and neon. Notice that all three occupy level 2, so they share a row. Their outer-electron counts increase across that row. Then inspect helium: its two valence electrons fill level 1, and it sits in group 18.",
      initialAtomicNumber: 8,
      requiredAtomicNumbers: [7, 8, 10],
      continueLabel: "Try the pattern with guidance →",
    },
    ...questions.map((question, index) => ({
      id: question.id,
      kind: index < 3 ? ("practice" as const) : ("checkpoint" as const),
      title: [
        "Count nitrogen’s valence electrons",
        "Read oxygen’s period",
        "Read neon’s group",
        "Mastery check: magnesium’s outer electrons",
        "Mastery check: magnesium’s period",
        "Mastery check: magnesium’s group",
      ][index]!,
      question,
    })),
  ],
};
