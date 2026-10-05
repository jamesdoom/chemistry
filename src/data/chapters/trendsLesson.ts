import type { Lesson, PracticeQuestion } from "../../types/curriculum";
export const trendsTopicId = "atomic-properties";
const elementChoices = (left: string, right: string) =>
  [left, right].map((value) => ({ value, label: value }));
const questions: PracticeQuestion[] = [
  {
    id: "size-na-cl",
    topicId: trendsTopicId,
    prompt:
      "Sodium and chlorine are both in period 3. Which neutral atom is generally larger?",
    choices: elementChoices("Na", "Cl"),
    answer: "Na",
    fallbackFeedback:
      "Compare the occupied outer level and the nuclear pull across the row.",
    explanation:
      "Both use level 3, but chlorine’s stronger effective nuclear pull draws its electrons closer. Sodium is larger.",
    hints: [
      {
        text: "Moving from sodium to chlorine does not add another occupied energy level.",
      },
      {
        text: "The nuclear charge increases across that row. A stronger net pull tends to shrink the cloud.",
      },
    ],
    misconceptionFeedback: {
      Cl: "More protons do not make an electron cloud larger by themselves. At the same outer level, chlorine’s stronger pull draws electrons closer.",
    },
    workedSolution: [
      "Both atoms occupy level 3.",
      "Chlorine has a stronger effective nuclear pull.",
      "Its cloud is smaller; sodium is the larger atom.",
    ],
    difficulty: "introductory",
  },
  {
    id: "size-reason",
    topicId: trendsTopicId,
    prompt:
      "Why is neutral sodium larger than neutral lithium, even though sodium has more protons?",
    choices: [
      {
        value: "levels",
        label:
          "Its outer electron occupies an additional level and is screened by more inner electrons.",
      },
      { value: "protons", label: "More protons always make the cloud bigger." },
      {
        value: "same-level",
        label: "Both atoms have their outer electron in the same level.",
      },
    ],
    answer: "levels",
    fallbackFeedback:
      "Compare lithium’s highest occupied level with sodium’s, then consider shielding.",
    explanation:
      "Lithium ends in 2s¹; sodium ends in 3s¹. The added level and additional inner electrons outweigh the increase in nuclear charge for this comparison.",
    hints: [
      { text: "Read the outer level in 2s¹ versus 3s¹." },
      {
        text: "Inner electrons reduce the nuclear attraction experienced by outer electrons. They do not cancel it completely.",
      },
    ],
    misconceptionFeedback: {
      protons:
        "Nuclear charge attracts electrons inward. The size increase here comes mainly from occupying another level and increased shielding.",
      "same-level":
        "Lithium’s outer electron is in level 2; sodium’s is in level 3.",
    },
    workedSolution: [
      "Lithium’s outer electron occupies level 2.",
      "Sodium’s occupies level 3 and has more inner electrons.",
      "The additional level and shielding make sodium larger.",
    ],
    difficulty: "standard",
  },
  {
    id: "ie-li-na",
    topicId: trendsTopicId,
    prompt:
      "Which neutral gaseous atom needs more energy to remove its first electron: lithium or sodium?",
    choices: elementChoices("Li", "Na"),
    answer: "Li",
    fallbackFeedback: "Consider distance and shielding down group 1.",
    explanation:
      "Lithium’s outer electron is closer on average and less screened. Sodium’s outer electron is easier to remove, so lithium has the higher first ionization energy.",
    hints: [
      { text: "Lithium uses level 2; sodium uses level 3." },
      { text: "An electron held more tightly takes more energy to remove." },
    ],
    misconceptionFeedback: {
      Na: "Sodium has more protons, but its outer electron is farther away and more screened. Protons alone do not determine first ionization energy.",
    },
    workedSolution: [
      "Compare the outer levels: Li uses 2; Na uses 3.",
      "Sodium’s outer electron is farther away and more screened.",
      "Lithium holds its outer electron more tightly and needs more removal energy.",
    ],
    difficulty: "introductory",
  },
  {
    id: "ie-energy-input",
    topicId: trendsTopicId,
    prompt:
      "Removing one electron from an isolated neutral gaseous atom produces a positive ion. What happens to energy in this first ionization?",
    choices: [
      { value: "input", label: "Energy must be supplied to the atom." },
      { value: "released", label: "Energy is released by the atom." },
      {
        value: "none",
        label: "No energy is involved because only one electron moves.",
      },
    ],
    answer: "input",
    fallbackFeedback:
      "An electron is attracted to the positive nucleus. Think about what it takes to separate them.",
    explanation:
      "First ionization requires energy to remove an attracted electron. Low ionization energy means less input, not energy being released.",
    hints: [
      { text: "The nucleus attracts the electron." },
      {
        text: "Breaking that attraction requires an energy input, even when the input is relatively small.",
      },
    ],
    misconceptionFeedback: {
      released:
        "A low first ionization energy still means energy is absorbed. It takes less input to remove that electron; the process does not release energy.",
      none: "Removing an electron from an atom requires overcoming attraction to its nucleus.",
    },
    workedSolution: [
      "The electron is attracted to the positive nucleus.",
      "Removing it requires an energy input.",
      "A neutral atom loses one electron and becomes a +1 ion.",
    ],
    difficulty: "standard",
  },
  {
    id: "size-mg-cl-check",
    topicId: trendsTopicId,
    prompt:
      "On your own: magnesium and chlorine are in period 3. Which neutral atom is generally larger?",
    choices: elementChoices("Mg", "Cl"),
    answer: "Mg",
    fallbackFeedback:
      "They occupy the same outer level. Compare the net nuclear pull across the period.",
    explanation:
      "Across period 3 the effective nuclear attraction generally increases, so chlorine is smaller than magnesium.",
    hints: [
      { text: "Both have outer electrons in level 3." },
      {
        text: "The atom farther right generally pulls that outer level more tightly.",
      },
    ],
    misconceptionFeedback: {
      Cl: "Chlorine’s added nuclear charge pulls its electrons closer within the same outer level. That makes it smaller in this comparison.",
    },
    workedSolution: [
      "Both occupy level 3.",
      "Chlorine has stronger effective nuclear attraction.",
      "Magnesium is larger.",
    ],
    difficulty: "standard",
  },
  {
    id: "ie-mg-al-check",
    topicId: trendsTopicId,
    prompt:
      "A useful exception: magnesium’s outer configuration is 3s²; aluminum’s is 3s² 3p¹. Which has the higher first ionization energy?",
    choices: elementChoices("Mg", "Al"),
    answer: "Mg",
    fallbackFeedback:
      "Consider which sublevel contains the electron removed first, not just which atom is farther right.",
    explanation:
      "Aluminum’s first removed electron comes from higher-energy 3p and is easier to remove. Magnesium has the higher first ionization energy, just as beryllium does relative to boron.",
    hints: [
      { text: "This resembles the beryllium/boron sublevel exception." },
      {
        text: "Compare removing a 3p electron from aluminum with removing a 3s electron from magnesium.",
      },
    ],
    misconceptionFeedback: {
      Al: "The general across-row trend has exceptions. Aluminum’s first 3p electron is easier to remove than a 3s electron from magnesium.",
    },
    workedSolution: [
      "Magnesium loses a 3s electron; aluminum loses a 3p electron.",
      "The first 3p electron is easier to remove in this comparison.",
      "Magnesium therefore has the higher first ionization energy.",
    ],
    difficulty: "standard",
  },
  {
    id: "ie-n-o-check",
    topicId: trendsTopicId,
    prompt:
      "Nitrogen has outer configuration 2s² 2p³; oxygen has 2s² 2p⁴. Which has the higher first ionization energy?",
    choices: elementChoices("N", "O"),
    answer: "N",
    fallbackFeedback:
      "Use Hund’s rule to picture 2p³ and 2p⁴. Which arrangement introduces a pair?",
    explanation:
      "Oxygen contains a paired 2p electron. Repulsion within that pair makes removal easier, so nitrogen has the higher first ionization energy.",
    hints: [
      {
        text: "Nitrogen has three singly occupied 2p orbitals. Oxygen must pair its fourth 2p electron.",
      },
      {
        text: "Repulsion in the paired orbital makes an oxygen electron easier to remove.",
      },
    ],
    misconceptionFeedback: {
      O: "The extra proton does not make this comparison follow the general trend. Oxygen’s paired 2p electrons repel one another, lowering its first removal energy.",
    },
    workedSolution: [
      "Draw three single 2p electrons for nitrogen.",
      "Oxygen’s fourth 2p electron pairs with another.",
      "Repulsion makes oxygen’s paired electron easier to remove; nitrogen needs more energy.",
    ],
    difficulty: "standard",
  },
];
export const trendsLesson: Lesson = {
  id: "atomic-trends",
  topicId: trendsTopicId,
  title: "Why atoms change size—and hold electrons differently",
  subtitle:
    "Section 11.4 · Atomic size and first ionization energy · About 15 minutes",
  summary:
    "Occupied levels, shielding, and nuclear attraction explain broad trends. Sublevel energies and electron pairing explain why first ionization energy has exceptions.",
  completionActions: [
    {
      label: "Review the periodic-table connection →",
      to: "/lessons/periodic-table",
    },
  ],
  steps: [
    {
      id: "trend-causes",
      kind: "explanation",
      title: "Three ideas explain the pattern",
      text: "Outer electrons feel attraction to the positive nucleus. Their average distance matters. Inner electrons partly screen that attraction—an effect called shielding. Across a row, added protons generally strengthen the net pull; down a column, another occupied level and more shielding usually make the atom larger.",
      chain: ["Occupied levels", "Shielding", "Nuclear attraction"],
      continueLabel: "Compare two electron clouds →",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Ask three questions: Is the outer electron in a new level? How many inner electrons screen it? How strongly does the nucleus pull? Count more than just protons.",
        },
        {
          label: "Visual explanation",
          text: "Across period 3: Na and Cl both use level 3, but Cl has a stronger net pull → smaller cloud. Down group 1: Li uses level 2; Na uses level 3 → larger cloud.",
        },
        {
          label: "Concrete analogy",
          text: "Picture a pull that weakens with distance and is partly screened. This can help you think about an outer electron. Shielding is an electric effect from other electrons, not a solid wall around the nucleus.",
        },
        {
          label: "Worked example",
          text: "Lithium: 3 protons, 2 inner electrons, outer level 2. Sodium: 11 protons, 10 inner electrons, outer level 3. Sodium has more protons, but its added level and shielding make it larger.",
        },
      ],
    },
    {
      id: "size-cloud-visual",
      kind: "visual",
      title: "Same outer level, different nuclear pull",
      text: "Sodium and chlorine both occupy level 3. Compare their proton and inner-electron counts. The qualitative cloud sketches show the size relationship without assigning measured radii.",
      visual: { kind: "trend-comparison", comparisonId: "size-across" },
      continueLabel: "Work through the size prediction →",
    },
    {
      id: "size-worked-example",
      kind: "example",
      title: "Predict sodium versus chlorine",
      steps: [
        "Locate both atoms in period 3: their outer electrons occupy level 3.",
        "Both have 10 inner electrons, but chlorine has 17 protons while sodium has 11.",
        "Added outer electrons do not fully screen the added nuclear charge. Chlorine’s stronger effective nuclear pull draws its electrons closer.",
        "The qualitative result: sodium is larger; chlorine is smaller. Atomic radius depends on a measurement definition because a cloud has no sharp edge.",
      ],
      continueLabel: "Learn what removal energy means →",
    },
    {
      id: "ionization-concept",
      kind: "explanation",
      title: "First ionization energy: the cost of losing one electron",
      text: "First ionization energy is the energy required to remove one electron from an isolated neutral gaseous atom in its ground state. The atom becomes a +1 ion. A tightly held electron needs more energy to remove. Even a low first ionization energy is an energy input, not a release.",
      chain: ["Supply energy", "Remove one electron", "Form a +1 ion"],
      continueLabel: "Compare lithium and sodium →",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Ionization here means taking one electron away. First ionization energy measures how much energy that first removal needs. It does not describe gaining an electron.",
        },
        {
          label: "Visual explanation",
          text: "Neutral atom + energy → positive ion + electron. The nucleus keeps the same protons; removing one negative electron leaves net charge +1.",
        },
        {
          label: "Concrete analogy",
          text: "Think of the energy needed to separate two attracted objects. A more tightly held electron is harder to remove. The analogy is about attraction; an electron is not glued to a particular spot.",
        },
        {
          label: "Worked example",
          text: "Li(g) + energy → Li⁺(g) + e⁻. Sodium undergoes the same kind of process, but requires less energy because its outer electron is farther away and more screened.",
        },
      ],
    },
    {
      id: "ionization-worked-example",
      kind: "example",
      title: "Predict lithium versus sodium",
      visual: { kind: "trend-comparison", comparisonId: "ie-down" },
      steps: [
        "Both atoms are in group 1 and have one valence electron.",
        "Lithium’s outer electron occupies level 2; sodium’s occupies level 3 and is screened by more inner electrons.",
        "Sodium’s electron is easier to remove, so sodium has a lower first ionization energy. Lithium needs more removal energy.",
        "Across a row, first ionization energy generally increases, but electron sublevels and pairing create important exceptions. Explore those next.",
      ],
      continueLabel: "Explore trends and their exceptions →",
    },
    {
      id: "explore-trends",
      kind: "trend-explorer",
      title: "Test the trend, then inspect an exception",
      text: "Compare atomic size down a group and across a period, then do the same for removal energy. Inspect nitrogen and oxygen before continuing. You can also compare beryllium and boron to see the sublevel exception.",
      initialComparisonId: "size-down",
      requiredComparisonIds: [
        "size-down",
        "size-across",
        "ie-down",
        "ie-across",
        "ie-pairing-exception",
      ],
      continueLabel: "Try it with guidance →",
    },
    ...questions.map((question, index) => ({
      id: question.id,
      kind: index < 4 ? ("practice" as const) : ("checkpoint" as const),
      title: [
        "Compare atomic size across a row",
        "Explain the size change down a group",
        "Compare first removal energies",
        "Does ionization use or release energy?",
        "Mastery check: magnesium and chlorine",
        "Mastery check: the sublevel exception",
        "Mastery check: the pairing exception",
      ][index]!,
      question,
    })),
  ],
};
