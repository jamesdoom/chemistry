import type { Lesson, PracticeQuestion } from "../../types/curriculum";
const topicId = "11.3-0";
const questions: PracticeQuestion[] = [
  {
    id: "hydrogen-orbital-count",
    topicId,
    prompt:
      "Level n = 2 contains one 2s orbital and three 2p orbitals. How many orbitals are in this level?",
    answer: "4",
    inputPlaceholder: "Orbital count",
    explanation:
      "Count individual orbitals: 1 + 3 = 4. This counts available states, not electrons in hydrogen.",
    hints: [
      { text: "A sublevel can contain more than one orbital." },
      { text: "Add the one s orbital to the three p orbitals." },
    ],
    misconceptionFeedback: {
      "2": "There are two sublevels, but the p sublevel contains three orbitals. Count boxes, not sublevel labels.",
      "8": "Eight is the maximum electron capacity of four orbitals, not the number of orbitals. Hydrogen has only one electron.",
    },
    fallbackFeedback:
      "Count the individual boxes in both sublevels. Do not count lobes or electrons.",
    workedSolution: [
      "2s contributes one orbital.",
      "2p contributes three orbitals.",
      "1 + 3 = 4 orbitals.",
    ],
    difficulty: "introductory",
  },
  {
    id: "hydrogen-orbital-lobes",
    topicId,
    prompt:
      "A 2px drawing has two lobes. How many orbital boxes represent that entire orbital?",
    choices: [
      { value: "1", label: "One box" },
      { value: "2", label: "Two boxes, one per lobe" },
      { value: "3", label: "Three boxes because it is p" },
    ],
    answer: "1",
    explanation:
      "The two lobes form one p orbital. One box represents that whole orbital; the p sublevel has three differently oriented orbitals.",
    hints: [
      { text: "A lobe is part of a probability shape." },
      { text: "The label 2px names one state, not two states." },
    ],
    misconceptionFeedback: {
      "2": "Two lobes are two regions of ONE orbital, not two separate orbitals.",
      "3": "Three boxes represent the whole p sublevel: px, py, and pz. The question asks about px alone.",
    },
    workedSolution: [
      "Identify the label: 2px is one orbital.",
      "Its probability shape has two lobes.",
      "Represent the entire 2px orbital with one box.",
    ],
    difficulty: "standard",
  },
  {
    id: "hydrogen-orbital-orientations",
    topicId,
    prompt:
      "What distinguishes 2px, 2py, and 2pz in isolated hydrogen without an applied field?",
    choices: [
      {
        value: "orientation",
        label: "Orientation in space; their shapes and energies match",
      },
      { value: "energy", label: "Three different energies" },
      {
        value: "electrons",
        label: "One, two, and three electrons respectively",
      },
    ],
    answer: "orientation",
    explanation:
      "The x, y, and z labels distinguish orientations of three p orbitals. They do not count electrons or rank energies.",
    hints: [
      { text: "Think about the labeled axes in the sketch." },
      {
        text: "Rotating the p shape changes its direction, not its electron count.",
      },
    ],
    misconceptionFeedback: {
      energy:
        "These three p orientations have equal energy without an applied field. The axis label is not an energy ranking.",
      electrons:
        "Axis labels identify directions. Neutral hydrogen has only one electron, whichever state it occupies.",
    },
    workedSolution: [
      "All three labels begin with 2p.",
      "The remaining letters label spatial axes.",
      "They have different orientations, with the same shape and energy.",
    ],
    difficulty: "standard",
  },
  {
    id: "hydrogen-orbital-boxes",
    topicId,
    prompt:
      "Oxygen’s 2p4 occupancy uses three boxes. Why three rather than four?",
    choices: [
      {
        value: "orbitals",
        label:
          "A p sublevel contains three orbitals; arrows count its four electrons",
      },
      { value: "missing", label: "One electron has no orbital" },
      { value: "lobes", label: "The p shape has three lobes" },
    ],
    answer: "orbitals",
    explanation:
      "Boxes count orbitals. The superscript 4 counts electrons distributed among those three orbitals. Each orbital can hold at most two electrons with opposite spins; oxygen is a many-electron atom, unlike hydrogen.",
    hints: [
      { text: "Boxes and arrows represent different things." },
      {
        text: "The p sublevel always supplies three orbital boxes; an exponent describes occupancy.",
      },
    ],
    misconceptionFeedback: {
      missing:
        "Four electrons can share three orbitals because an orbital can hold two electrons with opposite spins.",
      lobes:
        "Each of the three p orbitals has two lobes. Neither lobes nor electrons determine the number of boxes.",
    },
    workedSolution: [
      "The letter p specifies a three-orbital sublevel.",
      "The superscript 4 counts electrons, shown by four arrows.",
      "Use three boxes for orbitals and four arrows for electrons.",
    ],
    difficulty: "standard",
  },
];
export const hydrogenOrbitalsLesson: Lesson = {
  id: "hydrogen-orbitals",
  topicId,
  title: "Hydrogen Orbitals: from shapes to boxes",
  subtitle:
    "Section 11.3 · Levels, sublevels, and orientations · About 12 minutes",
  summary:
    "A level contains sublevels, and each sublevel contains individual orbitals. s has one spherical orbital; p has three two-lobed orbitals with different orientations. Boxes count orbitals, arrows count electrons, and shape drawings describe probability rather than paths.",
  completionActions: [
    { label: "Connect to electron arrangements →", to: "/lessons/first-18" },
    { label: "Practice filling orbital boxes →", to: "/practice/orbitals" },
  ],
  steps: [
    {
      id: "hierarchy",
      kind: "explanation",
      title: "Three labels, three different jobs",
      text: "In 2p, the number 2 names the principal level n. The letter p names a sublevel within that level. That sublevel contains three individual orbitals: 2px, 2py, and 2pz. An orbital describes a possible electron state and its spatial probability distribution, not a path. Hydrogen has one electron, but many possible states.",
      chain: [
        "Level n = 2",
        "Sublevels 2s and 2p",
        "1 s orbital + 3 p orbitals",
        "4 boxes",
      ],
      explanations: [
        {
          label: "Simpler explanation",
          text: "A level is a group of sublevels. A sublevel is a group of orbitals. Each orbital gets one box.",
        },
        {
          label: "Visual explanation",
          text: "Picture the n = 2 row: 2s [ ] and 2p [ ] [ ] [ ]. Two sublevel labels organize four boxes.",
        },
        {
          label: "Concrete analogy",
          text: "Like folders containing files, a level organizes sublevels, and sublevels organize orbitals. This is an organizing analogy: orbitals are not physical rooms or containers.",
        },
        {
          label: "Worked example",
          text: "Read 2py: level 2 → p sublevel → one orbital oriented along y. It gets one box, even though its drawing has two lobes.",
        },
      ],
      continueLabel: "Explore shapes and boxes →",
    },
    {
      id: "shapes",
      kind: "orbital-shapes-explorer",
      title: "Select a box, reveal a shape",
      text: "Explore 1s, 2s, all three 2p orientations, and the level 3 counts. A selected box highlights one whole orbital. Directions are shown in a projected three-dimensional sketch.",
      continueLabel: "Work through the box connection →",
    },
    {
      id: "example",
      kind: "example",
      title: "Read oxygen’s boxes with new meaning",
      visual: { kind: "oxygen-orbitals" },
      steps: [
        "This is oxygen, not hydrogen: its neutral atom contains eight electrons. Hydrogen’s shapes help us name orbitals, while many-electron atoms have different sublevel energy relationships.",
        "1s and 2s each contribute one orbital box. Each s orbital is spherical; higher s states also have radial structure that this simple shape sketch omits.",
        "2p contributes three orbital boxes, corresponding to px, py, and pz. A two-lobed shape belongs to each whole orbital, not to two boxes.",
        "In 2p4, the exponent counts four electrons. The diagram places four arrows across three boxes. At most two opposite-spin electrons fit in each orbital; capacity and occupancy are different.",
      ],
      continueLabel: "Try the orbital checks →",
    },
    ...questions.map((question, i) => ({
      id: question.id,
      kind:
        i === questions.length - 1
          ? ("checkpoint" as const)
          : ("practice" as const),
      title: [
        "Count orbitals, not sublevels",
        "One orbital, two lobes",
        "Compare the p orientations",
        "Connect shapes to occupancy",
      ][i]!,
      question,
    })),
  ],
};
