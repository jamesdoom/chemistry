import type { Assessment } from "../../types/curriculum";
export const section114Assessment: Assessment = {
  id: "11.4-assessment",
  title: "Section 11.4 Assessment",
  sectionNumber: "11.4",
  introduction:
    "Connect electron arrangements, table location, and atomic properties.",
  questions: [
    {
      id: "assessment-neutral-count",
      topicId: "11.4-assessment",
      concept: "Neutral electron counts",
      reviewTo: "/lessons/first-18",
      prompt:
        "A neutral aluminum atom has atomic number 13. How many electrons does it have?",
      choices: [
        {
          value: "0",
          label: "13",
        },
        {
          value: "1",
          label: "27",
        },
        {
          value: "2",
          label: "3",
        },
      ],
      answer: "0",
      explanation:
        "Atomic number counts protons. A neutral atom has equal positive and negative charges.",
      hints: [
        {
          text: "Start with the number of protons.",
        },
        {
          text: "Neutral means the electron count balances the proton count.",
        },
      ],
      misconceptionFeedback: {
        "1": "27 is a possible mass number, which counts protons plus neutrons, not electrons.",
        "2": "3 counts aluminum’s valence electrons, not all of its electrons.",
      },
      workedSolution: [
        "Start with the number of protons.",
        "Neutral means the electron count balances the proton count.",
        "Atomic number counts protons. A neutral atom has equal positive and negative charges.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-configuration",
      topicId: "11.4-assessment",
      concept: "Configuration notation",
      reviewTo: "/lessons/first-18",
      prompt:
        "Which configuration describes neutral fluorine (atomic number 9)?",
      choices: [
        {
          value: "1",
          label: "1s² 2s² 2p⁶",
        },
        {
          value: "2",
          label: "1s² 2s² 2p⁴",
        },
        {
          value: "0",
          label: "1s² 2s² 2p⁵",
        },
      ],
      answer: "0",
      explanation:
        "The superscripts add to 2 + 2 + 5 = 9 electrons. The 2p sublevel is not yet full.",
      hints: [
        {
          text: "Count electrons by adding superscripts.",
        },
        {
          text: "Fill 1s and 2s before placing the remaining electrons in 2p.",
        },
      ],
      misconceptionFeedback: {
        "1": "That adds to 10 electrons. A neutral fluorine atom needs 9.",
        "2": "That adds to 8 electrons. One electron is missing.",
      },
      workedSolution: [
        "Count electrons by adding superscripts.",
        "Fill 1s and 2s before placing the remaining electrons in 2p.",
        "The superscripts add to 2 + 2 + 5 = 9 electrons. The 2p sublevel is not yet full.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-aufbau",
      topicId: "11.4-assessment",
      concept: "Aufbau principle",
      reviewTo: "/lessons/first-18",
      prompt:
        "A proposed lithium arrangement is 1s [↑] 2s [↑↓]. Which rule does it break?",
      choices: [
        {
          value: "2",
          label: "Hund",
        },
        {
          value: "0",
          label: "Aufbau",
        },
        {
          value: "1",
          label: "Pauli",
        },
      ],
      answer: "0",
      explanation:
        "Aufbau puts electrons in lower-energy orbitals first: lithium should fill 1s before adding its third electron to 2s.",
      hints: [
        {
          text: "Look for a lower-energy orbital with an empty place.",
        },
        {
          text: "For lithium, 1s is lower in energy than 2s.",
        },
      ],
      misconceptionFeedback: {
        "1": "The two arrows in 2s have opposite spins, so this pair obeys Pauli. Compare the occupied energies.",
        "2": "Hund concerns separate orbitals of equal energy within a sublevel. Here the problem is leaving 1s unfilled.",
      },
      workedSolution: [
        "Look for a lower-energy orbital with an empty place.",
        "For lithium, 1s is lower in energy than 2s.",
        "Aufbau puts electrons in lower-energy orbitals first: lithium should fill 1s before adding its third electron to 2s.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-pauli",
      topicId: "11.4-assessment",
      concept: "Pauli exclusion principle",
      reviewTo: "/lessons/first-18",
      prompt: "An orbital box contains [↑↑]. What must change?",
      choices: [
        {
          value: "0",
          label: "The paired electrons must have opposite spins.",
        },
        {
          value: "1",
          label: "Move every electron to a higher level.",
        },
        {
          value: "2",
          label: "Add a third electron to the box.",
        },
      ],
      answer: "0",
      explanation:
        "One orbital holds at most two electrons, and a pair must have opposite spins: [↑↓].",
      hints: [
        {
          text: "Both arrows occupy the same orbital.",
        },
        {
          text: "Compare the directions of the two arrows.",
        },
      ],
      misconceptionFeedback: {
        "1": "Changing energy levels is not the constraint shown here. Examine the two spins in one box.",
        "2": "An orbital cannot hold three electrons. Its maximum is two with opposite spins.",
      },
      workedSolution: [
        "Both arrows occupy the same orbital.",
        "Compare the directions of the two arrows.",
        "One orbital holds at most two electrons, and a pair must have opposite spins: [↑↓].",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-hund",
      topicId: "11.4-assessment",
      concept: "Hund’s rule",
      reviewTo: "/lessons/first-18",
      prompt: "Carbon has 2p². Which 2p arrangement follows Hund’s rule?",
      choices: [
        {
          value: "1",
          label: "[↑↓] [ ] [ ]",
        },
        {
          value: "2",
          label: "[↑] [↓] [ ]",
        },
        {
          value: "0",
          label: "[↑] [↑] [ ]",
        },
      ],
      answer: "0",
      explanation:
        "Two electrons occupy separate equal-energy p orbitals with parallel spins before pairing.",
      hints: [
        {
          text: "There are three equal-energy orbitals in 2p.",
        },
        {
          text: "Place one electron in each empty orbital with parallel spins before pairing.",
        },
      ],
      misconceptionFeedback: {
        "1": "This pairs electrons while other equal-energy p orbitals are empty. Spread them out first.",
        "2": "The singly occupied equal-energy orbitals should have parallel spins in this ground-state arrangement.",
      },
      workedSolution: [
        "There are three equal-energy orbitals in 2p.",
        "Place one electron in each empty orbital with parallel spins before pairing.",
        "Two electrons occupy separate equal-energy p orbitals with parallel spins before pairing.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-valence",
      topicId: "11.4-assessment",
      concept: "Valence electrons",
      reviewTo: "/lessons/periodic-table",
      prompt:
        "Sulfur is 1s² 2s² 2p⁶ 3s² 3p⁴. How many valence electrons does it have?",
      choices: [
        {
          value: "2",
          label: "4",
        },
        {
          value: "0",
          label: "6",
        },
        {
          value: "1",
          label: "16",
        },
      ],
      answer: "0",
      explanation:
        "The outer occupied level is 3. Its 3s² and 3p⁴ electrons total 6.",
      hints: [
        {
          text: "Find the largest leading level number.",
        },
        {
          text: "Count both s and p electrons in that level.",
        },
      ],
      misconceptionFeedback: {
        "1": "16 is the total electron count. Valence electrons are in the highest occupied level for these main-group atoms.",
        "2": "Include 3s² as well as 3p⁴: both belong to the outer level.",
      },
      workedSolution: [
        "Find the largest leading level number.",
        "Count both s and p electrons in that level.",
        "The outer occupied level is 3. Its 3s² and 3p⁴ electrons total 6.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-location",
      topicId: "11.4-assessment",
      concept: "Periodic-table location",
      reviewTo: "/lessons/periodic-table",
      prompt:
        "Silicon ends in 3s² 3p². Which period and modern group fit this neutral main-group atom?",
      choices: [
        {
          value: "0",
          label: "Period 3, group 14",
        },
        {
          value: "1",
          label: "Period 2, group 4",
        },
        {
          value: "2",
          label: "Period 3, group 2",
        },
      ],
      answer: "0",
      explanation:
        "Level 3 gives period 3. Four valence electrons place silicon in modern group 14.",
      hints: [
        {
          text: "The leading 3 identifies the outer occupied level.",
        },
        {
          text: "Modern groups 13–18 have 3–8 valence electrons, except helium.",
        },
      ],
      misconceptionFeedback: {
        "1": "The superscript 2 counts electrons, not the period. Modern p-block group numbers are 13–18.",
        "2": "Group 2 has two valence electrons. Silicon has four, including the 3p electrons.",
      },
      workedSolution: [
        "The leading 3 identifies the outer occupied level.",
        "Modern groups 13–18 have 3–8 valence electrons, except helium.",
        "Level 3 gives period 3. Four valence electrons place silicon in modern group 14.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-size",
      topicId: "11.4-assessment",
      concept: "Atomic size and its cause",
      reviewTo: "/lessons/atomic-trends",
      prompt:
        "Which explanation correctly compares neutral magnesium and beryllium?",
      choices: [
        {
          value: "1",
          label: "Mg is smaller because more protons always shrink an atom.",
        },
        {
          value: "2",
          label:
            "They are the same size because both have two valence electrons.",
        },
        {
          value: "0",
          label:
            "Mg is larger because its outer electrons occupy an additional level.",
        },
      ],
      answer: "0",
      explanation:
        "Going down group 2 adds an occupied energy level. Greater distance and shielding generally make Mg larger than Be.",
      hints: [
        {
          text: "Be uses level 2; Mg uses level 3.",
        },
        {
          text: "Think about distance and shielding down a group.",
        },
      ],
      misconceptionFeedback: {
        "1": "More protons alone do not determine size. Down a group, an additional occupied level matters.",
        "2": "Equal valence counts explain similar chemistry, not identical electron-cloud size.",
      },
      workedSolution: [
        "Be uses level 2; Mg uses level 3.",
        "Think about distance and shielding down a group.",
        "Going down group 2 adds an occupied energy level. Greater distance and shielding generally make Mg larger than Be.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-ionization",
      topicId: "11.4-assessment",
      concept: "First ionization energy",
      reviewTo: "/lessons/atomic-trends",
      prompt:
        "Which statement describes removing the first electron from a neutral gaseous potassium atom?",
      choices: [
        {
          value: "2",
          label:
            "No energy is needed because the atom has one valence electron.",
        },
        {
          value: "0",
          label:
            "Energy must be supplied, even if the electron is relatively easy to remove.",
        },
        {
          value: "1",
          label: "Energy is released because removal is easy.",
        },
      ],
      answer: "0",
      explanation:
        "First ionization requires energy input to separate an electron from a neutral gaseous atom: K(g) + energy → K⁺(g) + e⁻.",
      hints: [
        {
          text: "The electron and positive nucleus attract.",
        },
        {
          text: "First ionization energy is an energy cost.",
        },
      ],
      misconceptionFeedback: {
        "1": "Easy removal means less input energy, not energy release.",
        "2": "One outer electron is still attracted to the nucleus. Separating it requires energy.",
      },
      workedSolution: [
        "The electron and positive nucleus attract.",
        "First ionization energy is an energy cost.",
        "First ionization requires energy input to separate an electron from a neutral gaseous atom: K(g) + energy → K⁺(g) + e⁻.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-exception",
      topicId: "11.4-assessment",
      concept: "Ionization exceptions",
      reviewTo: "/lessons/atomic-trends",
      prompt:
        "Why is oxygen’s first ionization energy lower than nitrogen’s despite oxygen having more protons?",
      choices: [
        {
          value: "0",
          label:
            "Repulsion in oxygen’s paired 2p orbital helps an electron leave.",
        },
        {
          value: "1",
          label: "Oxygen’s outer electrons occupy level 3.",
        },
        {
          value: "2",
          label: "First ionization energy always decreases across a period.",
        },
      ],
      answer: "0",
      explanation:
        "Oxygen has a paired 2p orbital. Pair repulsion helps removal compared with nitrogen’s singly occupied 2p orbitals.",
      hints: [
        {
          text: "Compare 2p³ with 2p⁴.",
        },
        {
          text: "Which arrangement introduces a pair into a p orbital?",
        },
      ],
      misconceptionFeedback: {
        "1": "Both nitrogen and oxygen have outer electrons in level 2.",
        "2": "The general trend increases across a period, but sublevel and pairing effects produce exceptions.",
      },
      workedSolution: [
        "Compare 2p³ with 2p⁴.",
        "Which arrangement introduces a pair into a p orbital?",
        "Oxygen has a paired 2p orbital. Pair repulsion helps removal compared with nitrogen’s singly occupied 2p orbitals.",
      ],
      difficulty: "standard",
    },
  ],
};
