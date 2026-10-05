import type { Assessment } from "../../types/curriculum";
export const section113Assessment: Assessment = {
  id: "11.3-2",
  sectionNumber: "11.3",
  title: "Section 11.3 Assessment",
  introduction:
    "Interpret orbital models, derive capacities, and explain which filling rule a diagram follows or breaks. Configuration checks stay within neutral ground-state H–Ar.",
  questions: [
    {
      id: "assessment-11.3-model",
      topicId: "11.3-2",
      concept: "Interpret an orbital drawing",
      reviewTo: "/lessons/hydrogen-orbitals",
      reviewRecommendation:
        "Explain what a probability-region drawing represents and why its outline is not a path or wall.",
      prompt:
        "A spherical orbital drawing has an outline. Which interpretation is justified?",
      answer: "probability",
      explanation:
        "An s orbital has a spherical probability distribution. A drawn surface is a representation choice, not a trajectory or physical boundary.",
      hints: [
        {
          text: "Ask whether this is a position-probability picture or a motion map.",
        },
        {
          text: "A drawing boundary does not force probability outside it to zero.",
        },
      ],
      misconceptionFeedback: {
        path: "Spherical symmetry describes a probability distribution, not a circular electron path.",
        surface:
          "The surface is a drawing guide. The electron is not restricted to that surface.",
      },
      workedSolution: [
        "Ask whether this is a position-probability picture or a motion map.",
        "A drawing boundary does not force probability outside it to zero.",
        "An s orbital has a spherical probability distribution. A drawn surface is a representation choice, not a trajectory or physical boundary.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "path",
          label: "The outline is the electron’s circular route",
        },
        {
          value: "probability",
          label:
            "It illustrates a probability region; the outline is not a hard wall",
        },
        {
          value: "surface",
          label: "The electron must stay on the drawn surface",
        },
      ],
    },
    {
      id: "assessment-11.3-lobes",
      topicId: "11.3-2",
      concept: "One p orbital versus the p sublevel",
      reviewTo: "/lessons/hydrogen-orbitals",
      reviewRecommendation:
        "Match a whole two-lobed p orbital to one box, then distinguish it from the three-orbital p sublevel.",
      prompt:
        "A student gives the two lobes of 3pz separate boxes. How should the diagram be corrected?",
      answer: "one",
      explanation:
        "Both lobes belong to one 3pz orbital. Three boxes describe the entire 3p sublevel: px, py, and pz.",
      hints: [
        {
          text: "Identify whether the label names one orbital or a whole sublevel.",
        },
        {
          text: "A lobe is part of an orbital’s probability shape.",
        },
      ],
      misconceptionFeedback: {
        two: "Two lobes do not make two orbitals. The whole two-lobed 3pz distribution is one orbital.",
        three: "Three boxes describe all three p orientations, not pz alone.",
      },
      workedSolution: [
        "Identify whether the label names one orbital or a whole sublevel.",
        "A lobe is part of an orbital’s probability shape.",
        "Both lobes belong to one 3pz orbital. Three boxes describe the entire 3p sublevel: px, py, and pz.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "one",
          label: "Use one box for the entire 3pz orbital",
        },
        {
          value: "two",
          label: "Keep two boxes because every lobe is an orbital",
        },
        {
          value: "three",
          label: "Use three boxes for 3pz alone",
        },
      ],
    },
    {
      id: "assessment-11.3-counts",
      topicId: "11.3-2",
      concept: "Count orbitals within a level",
      reviewTo: "/lessons/hydrogen-orbitals",
      reviewRecommendation:
        "Add the orbitals in 3s, 3p, and 3d. Keep sublevel labels, boxes, and electrons separate.",
      prompt:
        "Level n = 3 has 3s, 3p, and 3d sublevels. How many individual orbitals does that level contain? Enter a number.",
      answer: "9",
      explanation:
        "The s, p, and d sublevels contribute 1 + 3 + 5 = 9 orbitals. This is a count of possible states, not actual electrons.",
      hints: [
        {
          text: "Each sublevel can contain a different number of orbitals.",
        },
        {
          text: "Add one s orbital, three p orbitals, and five d orbitals.",
        },
      ],
      misconceptionFeedback: {
        "3": "Three counts sublevels, not the individual orbitals within them.",
        "18": "Eighteen is the maximum electron capacity of nine orbitals, not their orbital count.",
        "8": "Eight is the electron capacity of a full n = 2 level. Here you are counting n = 3 orbitals.",
      },
      workedSolution: [
        "Each sublevel can contain a different number of orbitals.",
        "Add one s orbital, three p orbitals, and five d orbitals.",
        "The s, p, and d sublevels contribute 1 + 3 + 5 = 9 orbitals. This is a count of possible states, not actual electrons.",
      ],
      difficulty: "standard",
      inputPlaceholder: "Orbital count",
      fallbackFeedback:
        "Count orbitals by sublevel: s has one, p has three, and d has five. Do not multiply by two unless calculating electron capacity.",
    },
    {
      id: "assessment-11.3-capacities",
      topicId: "11.3-2",
      concept: "Derive d and f capacities",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Multiply five d or seven f orbitals by two electrons per orbital; distinguish maximum capacity from occupancy.",
      prompt:
        "Which correctly states the maximum capacities of d and f sublevels?",
      answer: "max",
      explanation:
        "d has five orbitals and f has seven. Each orbital can hold two opposite-spin electrons, giving maximum capacities of 10 and 14. Actual occupancy can be smaller.",
      hints: [
        {
          text: "Start with the orbital counts, not the electron counts.",
        },
        {
          text: "Apply the two-electron limit to every orbital.",
        },
      ],
      misconceptionFeedback: {
        counts:
          "Five and seven count orbitals. Multiply each by two to find electron capacity.",
        always:
          "Capacity is a maximum, not a requirement. Sublevels can be empty or partly occupied.",
      },
      workedSolution: [
        "Start with the orbital counts, not the electron counts.",
        "Apply the two-electron limit to every orbital.",
        "d has five orbitals and f has seven. Each orbital can hold two opposite-spin electrons, giving maximum capacities of 10 and 14. Actual occupancy can be smaller.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "counts",
          label: "d: 5 electrons; f: 7 electrons",
        },
        {
          value: "max",
          label: "d: 10 electrons; f: 14 electrons",
        },
        {
          value: "always",
          label: "d always contains 10 electrons; f always contains 14",
        },
      ],
    },
    {
      id: "assessment-11.3-energies",
      topicId: "11.3-2",
      concept: "Hydrogen versus multi-electron energies",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Compare the n = 2 energy diagrams and explain how electron interactions, shielding, and penetration affect sublevel energies.",
      prompt:
        "Which comparison fits the basic isolated-hydrogen model and the introductory multi-electron model, without applied fields?",
      answer: "split",
      explanation:
        "Electron interactions and different penetration/shielding split sublevel energies in multi-electron atoms. The axis labels of a p sublevel distinguish orientations, not three energy rankings.",
      hints: [
        {
          text: "Separate sublevel type from orientation within a sublevel.",
        },
        {
          text: "Hydrogen has no electron–electron repulsion; multi-electron atoms do.",
        },
      ],
      misconceptionFeedback: {
        equal:
          "The same principal level does not guarantee equal sublevel energies in a multi-electron atom.",
        axes: "Without an applied field, the three p orientations share one sublevel energy in this model. Axis names do not rank energies.",
      },
      workedSolution: [
        "Separate sublevel type from orientation within a sublevel.",
        "Hydrogen has no electron–electron repulsion; multi-electron atoms do.",
        "Electron interactions and different penetration/shielding split sublevel energies in multi-electron atoms. The axis labels of a p sublevel distinguish orientations, not three energy rankings.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "equal",
          label: "2s and 2p must have equal energy in every atom",
        },
        {
          value: "split",
          label:
            "Hydrogen 2s/2p share an energy; multi-electron 2s is lower than 2p, whose three orientations remain equal in energy",
        },
        {
          value: "axes",
          label:
            "In multi-electron atoms, px, py, and pz form a low-to-high energy ladder",
        },
      ],
    },
    {
      id: "assessment-11.3-spin",
      topicId: "11.3-2",
      concept: "Interpret spin arrows",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Read arrows as spin projections along a chosen axis, rather than electron travel directions or literal rotation.",
      prompt: "What do ↑ and ↓ mean in an orbital box?",
      answer: "projection",
      explanation:
        "Spin is an intrinsic quantum property with projections labeled +½ and −½. The arrows are a convention, not an electron path or literal rotating ball.",
      hints: [
        {
          text: "The arrows label a quantum property rather than position.",
        },
        {
          text: "An arrow direction is not a direction of electron motion.",
        },
      ],
      misconceptionFeedback: {
        travel:
          "Orbital arrows do not show velocities or trajectories; they label spin projections.",
        rotation:
          "Spin is intrinsic. Treating the electron as a classical rotating ball is misleading.",
      },
      workedSolution: [
        "The arrows label a quantum property rather than position.",
        "An arrow direction is not a direction of electron motion.",
        "Spin is an intrinsic quantum property with projections labeled +½ and −½. The arrows are a convention, not an electron path or literal rotating ball.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "travel",
          label: "The electron travels upward or downward through the atom",
        },
        {
          value: "rotation",
          label: "A tiny ball rotates clockwise or counterclockwise",
        },
        {
          value: "projection",
          label: "The two possible spin projections along a chosen axis",
        },
      ],
    },
    {
      id: "assessment-11.3-pauli",
      topicId: "11.3-2",
      concept: "Pauli: check one orbital",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Check both conditions in a single box: at most two electrons, with opposite spin projections when paired.",
      prompt:
        "A proposed single-orbital box contains [↑↓↑]. Which diagnosis is correct?",
      answer: "pauli",
      explanation:
        "One orbital provides two spin states, so it holds at most two electrons. Adding a third violates Pauli even when two arrows already form an opposite-spin pair.",
      hints: [
        {
          text: "Count electrons in this one box.",
        },
        {
          text: "A valid pair does not create room for a third electron.",
        },
      ],
      misconceptionFeedback: {
        hund: "Hund addresses distribution among equal-energy orbitals. This box already exceeds a single orbital’s two-electron limit.",
        valid:
          "An opposite-spin pair is allowed, but a third electron in the same orbital is not.",
      },
      workedSolution: [
        "Count electrons in this one box.",
        "A valid pair does not create room for a third electron.",
        "One orbital provides two spin states, so it holds at most two electrons. Adding a third violates Pauli even when two arrows already form an opposite-spin pair.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "hund",
          label: "It only breaks Hund because every arrow should be parallel",
        },
        {
          value: "pauli",
          label:
            "It breaks Pauli: a single orbital cannot contain three electrons",
        },
        {
          value: "valid",
          label: "It is allowed because an opposite-spin pair is present",
        },
      ],
    },
    {
      id: "assessment-11.3-hund",
      topicId: "11.3-2",
      concept: "Hund: distribute before pairing",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Compare [↑↓] [ ] [ ] with [↑] [↑] [ ] for two electrons in equal-energy p orbitals, keeping Pauli separate from ground-state Hund reasoning.",
      prompt:
        "Carbon’s ground-state 2p2 diagram is proposed as [↑↓] [ ] [ ]. What is the best diagnosis?",
      answer: "hund",
      explanation:
        "Two opposite-spin electrons can share one orbital under Pauli. But carbon’s ground state distributes these two electrons singly with parallel spins among equal-energy p orbitals before pairing.",
      hints: [
        {
          text: "Check the one-box limit first, then the distribution across equal-energy boxes.",
        },
        {
          text: "Ground-state Hund filling favors singly occupied orbitals before pairing.",
        },
      ],
      misconceptionFeedback: {
        pauli:
          "Opposite spins may share a box. The error is pairing while equal-energy p orbitals are empty in the ground-state diagram.",
        capacity:
          "There are only two electrons, below p’s six-electron capacity. The issue is distribution, not capacity.",
      },
      workedSolution: [
        "Check the one-box limit first, then the distribution across equal-energy boxes.",
        "Ground-state Hund filling favors singly occupied orbitals before pairing.",
        "Two opposite-spin electrons can share one orbital under Pauli. But carbon’s ground state distributes these two electrons singly with parallel spins among equal-energy p orbitals before pairing.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "pauli",
          label: "It breaks Pauli because opposite spins cannot share a box",
        },
        {
          value: "hund",
          label:
            "It obeys Pauli but misses Hund’s ground-state pattern: use [↑] [↑] [ ]",
        },
        {
          value: "capacity",
          label: "It exceeds the six-electron p capacity",
        },
      ],
    },
    {
      id: "assessment-11.3-aufbau",
      topicId: "11.3-2",
      concept: "Aufbau: use lower-energy sublevels",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "For neutral ground-state H–Ar, use 1s → 2s → 2p → 3s → 3p and check energy order independently from totals and capacity.",
      prompt:
        "Neutral beryllium has four electrons. A student writes 1s2 2p2 with one electron in each of two p orbitals, leaving 2s empty. What is wrong for its ground state?",
      answer: "aufbau",
      explanation:
        "The total of four is correct and the proposed p distribution does not violate Pauli or Hund. But ground-state filling must use lower-energy 2s before 2p.",
      hints: [
        {
          text: "Count electrons before diagnosing the filling order.",
        },
        {
          text: "Which available sublevel lies below 2p in the multi-electron model?",
        },
      ],
      misconceptionFeedback: {
        total:
          "The exponents total four. Correct totals alone do not establish ground-state filling.",
        pauli:
          "Different p orbitals may be singly occupied. Pauli does not require a pair in every sublevel.",
      },
      workedSolution: [
        "Count electrons before diagnosing the filling order.",
        "Which available sublevel lies below 2p in the multi-electron model?",
        "The total of four is correct and the proposed p distribution does not violate Pauli or Hund. But ground-state filling must use lower-energy 2s before 2p.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "total",
          label: "The configuration contains too many electrons",
        },
        {
          value: "pauli",
          label: "Every p sublevel must contain an opposite-spin pair",
        },
        {
          value: "aufbau",
          label:
            "It skips lower-energy 2s: the ground-state configuration is 1s2 2s2",
        },
      ],
    },
    {
      id: "assessment-11.3-transfer",
      topicId: "11.3-2",
      concept: "Combine configuration and orbital reasoning",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Build neutral phosphorus within H–Ar, count remaining electrons, and use Hund and Pauli for its three 3p orbitals.",
      prompt:
        "Neutral phosphorus has 15 electrons. After 1s2 2s2 2p6 3s2, which completes its ground-state arrangement?",
      answer: "correct",
      explanation:
        "The listed sublevels contain twelve electrons, leaving three. They occupy three 3p orbitals singly with parallel spins: 3p3. The three p boxes have a capacity of six, but occupancy is three.",
      hints: [
        {
          text: "Subtract the twelve already placed from fifteen.",
        },
        {
          text: "3s is full; use the three equal-energy 3p orbitals before pairing.",
        },
      ],
      misconceptionFeedback: {
        paired:
          "The electron count is correct and Pauli allows the pair, but the ground state should fill all three p orbitals singly before pairing.",
        overfill:
          "An s sublevel has one orbital and holds at most two electrons. A 3s5 entry exceeds its capacity.",
      },
      workedSolution: [
        "Subtract the twelve already placed from fifteen.",
        "3s is full; use the three equal-energy 3p orbitals before pairing.",
        "The listed sublevels contain twelve electrons, leaving three. They occupy three 3p orbitals singly with parallel spins: 3p3. The three p boxes have a capacity of six, but occupancy is three.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "correct",
          label: "3p3, with [↑] [↑] [↑]",
        },
        {
          value: "paired",
          label: "3p3, with [↑↓] [↑] [ ]",
        },
        {
          value: "overfill",
          label: "3s5, placing all three remaining electrons into 3s",
        },
      ],
    },
  ],
};
