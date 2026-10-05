import type { Lesson } from "../../types/curriculum";
export const furtherDevelopmentLesson: Lesson = {
  id: "further-development",
  topicId: "11.3-1",
  title: "Further Development: energies, spin, and capacity",
  subtitle: "Section 11.3 · Multi-electron atoms · About 12 minutes",
  summary:
    "Electron interactions split sublevel energies in multi-electron atoms. Spin and Pauli allow two opposite-spin electrons per orbital, giving s/p/d/f capacities of 2/6/10/14. Aufbau selects lower-energy sublevels; Hund distributes electrons singly with parallel spins among equal-energy orbitals before pairing.",
  completionActions: [
    { label: "Check Section 11.3 understanding →", to: "/assessments/11.3" },
    {
      label: "Practice orbital filling →",
      to: "/practice/orbitals",
    },
    {
      label: "Connect configurations to the periodic table →",
      to: "/lessons/periodic-table",
    },
  ],
  steps: [
    {
      id: "interactions",
      kind: "explanation",
      title: "More electrons change the energy picture",
      text: "Hydrogen has one electron. In atoms with several electrons, electrons repel one another while the nucleus attracts them. Other electrons partially shield nuclear attraction. Orbital distributions differ: s electrons can penetrate closer to the nucleus than p electrons in the same level. In the introductory multi-electron model, this makes 2s lower in energy than 2p. Level number alone no longer determines sublevel energy.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "An electron feels attraction from the nucleus and repulsion from other electrons. Where it is likely to be found affects its energy.",
        },
        {
          label: "Visual explanation",
          text: "In the energy diagram, hydrogen’s 2s and 2p lines align. In the multi-electron model, 2s sits below 2p. Upward means higher energy, not farther along an electron path.",
        },
        {
          label: "Concrete analogy",
          text: "A crowded room changes how people interact compared with one person alone. This only illustrates why interactions matter; electrons are quantum particles, not people in rooms.",
        },
        {
          label: "Worked example",
          text: "For neutral boron, four electrons occupy 1s and 2s. The fifth enters 2p because 2s is full. The three 2p orbitals share an energy, but that energy differs from 2s.",
        },
      ],
      continueLabel: "Compare energies and capacities →",
    },
    {
      id: "explore",
      kind: "multi-electron-explorer",
      title: "From energy lines to spin states",
      text: "Compare the two energy pictures, explore all four sublevel capacities, and inspect both proposed spin pairs. Counts describe possible occupancy, not a particular element.",
      continueLabel: "Connect the filling rules →",
    },
    {
      id: "rules",
      kind: "explanation",
      title: "Three rules answer three different questions",
      text: "Aufbau: which available sublevel has lower energy? Pauli: can two electrons share this orbital? They must have opposite spins, and three cannot fit. Hund: how do electrons occupy equal-energy orbitals in a ground-state sublevel? Place them singly with parallel spins before pairing. Spin has two projections, labeled +½ and −½; arrows are a diagram convention, not electron travel or literal spinning.",
      chain: [
        "Energy → Aufbau",
        "One orbital → Pauli",
        "Equal-energy orbitals → Hund",
      ],
      explanations: [
        {
          label: "Simpler explanation",
          text: "Choose a lower-energy place first. Put at most two opposite-spin electrons in a box. Across equal-energy boxes, use one electron per box before pairing.",
        },
        {
          label: "Visual explanation",
          text: "For a ground-state p3 sublevel, use [↑] [↑] [↑]. A full p6 sublevel is [↑↓] [↑↓] [↑↓]. Three boxes give a six-electron capacity.",
        },
        {
          label: "Concrete analogy",
          text: "Separate seats before sharing can help you remember Hund’s pattern. It is a memory aid, not a physical explanation: electrons do not choose seats.",
        },
        {
          label: "Worked example",
          text: "Nitrogen has 2p3: three singly occupied p orbitals with parallel spins. Oxygen has 2p4: add an opposite-spin partner in one orbital. Both obey Pauli and Hund.",
        },
      ],
      continueLabel: "Build sulfur step by step →",
    },
    {
      id: "sulfur",
      kind: "example",
      title: "Build sulfur without a diagonal chart",
      steps: [
        "Sulfur has atomic number 16, so a neutral atom has 16 electrons. For neutral ground-state H–Ar, the order is 1s → 2s → 2p → 3s → 3p.",
        "Fill 1s and 2s with two electrons each. Four electrons are placed, leaving twelve.",
        "Fill 2p with six and 3s with two. Now twelve electrons are placed, leaving four for 3p.",
        "Write 1s² 2s² 2p⁶ 3s² 3p⁴. Its 3p boxes are [↑↓] [↑] [↑]. Exponents total 16; three p orbitals supply room for six, but only four are occupied.",
        "A 3d sublevel exists, but sulfur’s ground state leaves it empty. Beyond the first 18 atoms, levels overlap in energy and configurations have exceptions. A level’s maximum capacity is not its filling order; heavier-element practice is reserved for confirmed course requirements.",
      ],
      continueLabel: "Try the multi-electron checks →",
    },
    {
      id: "further-energies",
      kind: "practice",
      title: "Compare sublevel energies",
      question: {
        id: "further-energies",
        topicId: "11.3-1",
        prompt:
          "In our multi-electron n = 2 model, why is 2s lower in energy than 2p?",
        answer: "interactions",
        explanation:
          "Electron–electron repulsion and differing spatial distributions matter. s orbitals penetrate closer to the nucleus, so their electrons experience less shielding on average than p electrons in the same level.",
        hints: [
          {
            text: "Compare a one-electron atom with an atom that has interacting electrons.",
          },
          {
            text: "Think about how orbital distributions change attraction and shielding.",
          },
        ],
        misconceptionFeedback: {
          number:
            "Equal n implies equal energy in the basic hydrogen model, but it does not guarantee equal sublevel energies in a multi-electron atom.",
          capacity:
            "Capacity counts available spin states; it does not by itself explain energy splitting.",
        },
        workedSolution: [
          "Compare a one-electron atom with an atom that has interacting electrons.",
          "Think about how orbital distributions change attraction and shielding.",
          "Electron–electron repulsion and differing spatial distributions matter. s orbitals penetrate closer to the nucleus, so their electrons experience less shielding on average than p electrons in the same level.",
        ],
        difficulty: "standard",
        choices: [
          {
            value: "interactions",
            label:
              "Electron interactions and different penetration/shielding affect sublevels",
          },
          {
            value: "number",
            label:
              "The number 2 means every orbital must have identical energy",
          },
          {
            value: "capacity",
            label: "2p is higher only because it has room for more electrons",
          },
        ],
      },
    },
    {
      id: "further-spin",
      kind: "practice",
      title: "Read spin arrows",
      question: {
        id: "further-spin",
        topicId: "11.3-1",
        prompt:
          "Two electrons occupy the SAME orbital. Which spin diagram is allowed?",
        answer: "opposite",
        explanation:
          "Pauli allows at most two electrons in one orbital, with opposite spin projections. The arrows describe spin, not motion.",
        hints: [
          {
            text: "Focus on one box, not separate orbitals.",
          },
          {
            text: "Two electrons sharing an orbital cannot also share the same spin state.",
          },
        ],
        misconceptionFeedback: {
          same: "Parallel spins are allowed in different orbitals, but not for two electrons in the same orbital.",
          three:
            "One orbital has only two possible spin states and cannot contain three electrons.",
        },
        workedSolution: [
          "Focus on one box, not separate orbitals.",
          "Two electrons sharing an orbital cannot also share the same spin state.",
          "Pauli allows at most two electrons in one orbital, with opposite spin projections. The arrows describe spin, not motion.",
        ],
        difficulty: "standard",
        choices: [
          {
            value: "opposite",
            label: "[↑↓]",
          },
          {
            value: "same",
            label: "[↑↑]",
          },
          {
            value: "three",
            label: "[↑↓↑]",
          },
        ],
      },
    },
    {
      id: "further-capacity",
      kind: "practice",
      title: "Calculate a d capacity",
      question: {
        id: "further-capacity",
        topicId: "11.3-1",
        prompt:
          "A d sublevel has five orbitals. What is its maximum electron capacity?",
        answer: "10",
        explanation:
          "Five orbitals × two opposite-spin electrons per orbital = ten electrons. Five counts orbitals, not electron capacity.",
        hints: [
          {
            text: "Start with the number of boxes.",
          },
          {
            text: "Each box can hold at most two opposite-spin electrons.",
          },
        ],
        misconceptionFeedback: {
          "5": "Five counts the orbitals. Each orbital can hold two electrons.",
          "2": "Two is the capacity of ONE orbital, not the entire five-orbital d sublevel.",
          "14": "Fourteen is the capacity of f, which contains seven orbitals.",
        },
        workedSolution: [
          "Start with the number of boxes.",
          "Each box can hold at most two opposite-spin electrons.",
          "Five orbitals × two opposite-spin electrons per orbital = ten electrons. Five counts orbitals, not electron capacity.",
        ],
        difficulty: "standard",
        inputPlaceholder: "Maximum electron count",
        fallbackFeedback:
          "Multiply the number of orbitals by two. Capacity counts electrons, not orbital shapes.",
      },
    },
    {
      id: "further-f-count",
      kind: "practice",
      title: "Separate capacity from occupancy",
      question: {
        id: "further-f-count",
        topicId: "11.3-1",
        prompt: "Which statement about an f sublevel is correct?",
        answer: "capacity",
        explanation:
          "An f sublevel has seven orbitals and a capacity of fourteen electrons. Capacity is a maximum, not an occupancy requirement.",
        hints: [
          {
            text: "Keep boxes separate from arrows.",
          },
          {
            text: "A sublevel may be empty, partly filled, or full.",
          },
        ],
        misconceptionFeedback: {
          electrons:
            "A maximum is not an actual count. A sublevel can be partly occupied or empty.",
          boxes:
            "Fourteen counts the maximum electrons. The number of f orbitals is seven.",
        },
        workedSolution: [
          "Keep boxes separate from arrows.",
          "A sublevel may be empty, partly filled, or full.",
          "An f sublevel has seven orbitals and a capacity of fourteen electrons. Capacity is a maximum, not an occupancy requirement.",
        ],
        difficulty: "standard",
        choices: [
          {
            value: "capacity",
            label: "Seven orbitals; at most fourteen electrons",
          },
          {
            value: "electrons",
            label: "Seven orbitals; always fourteen electrons present",
          },
          {
            value: "boxes",
            label: "Fourteen orbitals; one electron each",
          },
        ],
      },
    },
    {
      id: "further-configuration",
      kind: "checkpoint",
      title: "Transfer to a familiar atom",
      question: {
        id: "further-configuration",
        topicId: "11.3-1",
        prompt:
          "Neutral sulfur has 16 electrons. Which is its ground-state configuration?",
        answer: "correct",
        explanation:
          "Fill 1s → 2s → 2p → 3s → 3p for neutral ground-state H–Ar. The first four sublevels hold twelve electrons; sulfur’s remaining four enter 3p.",
        hints: [
          {
            text: "Check both the electron total and the capacity of each sublevel.",
          },
          {
            text: "After 1s2 2s2 2p6 3s2, twelve electrons are placed.",
          },
        ],
        misconceptionFeedback: {
          overfill:
            "This sums to 16, but a p sublevel has only three orbitals and cannot hold eight electrons.",
          skip: "This sums to 16, but leaves lower-energy 3s empty while occupying 3p: an Aufbau mistake.",
        },
        workedSolution: [
          "Check both the electron total and the capacity of each sublevel.",
          "After 1s2 2s2 2p6 3s2, twelve electrons are placed.",
          "Fill 1s → 2s → 2p → 3s → 3p for neutral ground-state H–Ar. The first four sublevels hold twelve electrons; sulfur’s remaining four enter 3p.",
        ],
        difficulty: "standard",
        choices: [
          {
            value: "correct",
            label: "1s2 2s2 2p6 3s2 3p4",
          },
          {
            value: "overfill",
            label: "1s2 2s2 2p8 3s2 3p2",
          },
          {
            value: "skip",
            label: "1s2 2s2 2p6 3p6",
          },
        ],
      },
    },
  ],
};
