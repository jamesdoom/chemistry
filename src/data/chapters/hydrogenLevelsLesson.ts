import type { Lesson } from "../../types/curriculum";
export const hydrogenLevelsLesson: Lesson = {
  id: "hydrogen-levels",
  topicId: "11.2-0",
  title: "Hydrogen Energy Levels: bound, excited, free",
  subtitle: "Section 11.2 · Allowed states and transitions · About 10 minutes",
  summary:
    "Hydrogen’s ground state is n = 1. Higher bound states are excited, with levels crowding toward zero. Absorption raises energy, emission lowers it, and ionization frees the electron. Photon energies depend on gaps, not equal steps in n.",
  completionActions: [
    {
      label: "Continue to the Bohr Model →",
      to: "/lessons/bohr-model",
    },
  ],
  steps: [
    {
      id: "concept",
      kind: "explanation",
      title: "Allowed levels, not every possible energy",
      text: "A neutral hydrogen atom has one proton and one electron. Its bound energy states are labeled n = 1, 2, 3, … . The lowest, n = 1, is the ground state. Higher bound states are excited states. With zero defined as a free electron far away at rest, bound states have negative energies. Negative does not mean impossible; it means energy must be supplied to free the electron.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Ground means lowest energy. Excited means higher energy but still attached to the atom. Ionized means the electron is no longer bound.",
        },
        {
          label: "Visual explanation",
          text: "The level diagram starts with n = 1 far below zero. n = 2 and 3 lie higher, closer together. Zero marks the minimum energy for a free electron at rest, not another bound level.",
        },
        {
          label: "Concrete analogy",
          text: "Think of being below the rim of a pit: climbing nearer the rim takes energy, and getting out takes more. The pit illustrates binding energy only; an atom is not a physical hole.",
        },
        {
          label: "Worked example",
          text: "At n = 2, hydrogen is excited but still bound. It can emit a photon and return to n = 1, or absorb enough energy to become ionized.",
        },
      ],
      continueLabel: "Explore hydrogen’s levels →",
    },
    {
      id: "hydrogen-explorer",
      kind: "hydrogen-explorer",
      title: "Follow allowed transitions",
      text: "Compare an upward excitation, downward emissions, and ionization from two starting states. Energy levels get closer together at higher n. The selector shows representative transitions, not every possible state or process.",
      continueLabel: "Work through a return to ground →",
    },
    {
      id: "example",
      kind: "example",
      title: "n = 2 → 1: where the energy goes",
      steps: [
        "The electron starts in n = 2, an excited bound state with approximate energy −5.45 × 10⁻¹⁹ J.",
        "It ends in n = 1, the ground state, at approximately −2.18 × 10⁻¹⁸ J. The final energy is lower, even though its negative magnitude is larger.",
        "The atom loses about 1.64 × 10⁻¹⁸ J. A photon emitted in this radiative transition carries that positive energy difference.",
        "This is a return to the ground state, not ionization. Ionization would raise the atom to the free-electron threshold rather than lower its energy.",
      ],
      continueLabel: "Try the level checks →",
    },
    {
      id: "check-hydrogen-state",
      kind: "practice",
      title: "Name the state",
      question: {
        id: "hydrogen-state",
        topicId: "11.2-0",
        prompt:
          "A hydrogen atom has its electron in n = 3. Which description fits?",
        choices: [
          {
            value: "0",
            label: "Ground state.",
          },
          {
            value: "1",
            label: "Excited state, still bound.",
          },
          {
            value: "2",
            label: "Ionized because n is greater than 1.",
          },
        ],
        answer: "1",
        explanation:
          "n = 3 is above the ground state but still has negative bound-state energy.",
        hints: [
          {
            text: "Compare n = 3 with the lowest allowed state.",
          },
          {
            text: "Bound states have energy below the zero-energy free-electron threshold.",
          },
        ],
        misconceptionFeedback: {
          "0": "The ground state is the lowest allowed energy, n = 1.",
          "2": "An excited electron remains bound. Ionization means separating it from the atom, not just increasing n.",
        },
        workedSolution: [
          "Compare n = 3 with the lowest allowed state.",
          "Bound states have energy below the zero-energy free-electron threshold.",
          "n = 3 is above the ground state but still has negative bound-state energy.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-hydrogen-return",
      kind: "practice",
      title: "A lower state can still be excited",
      question: {
        id: "hydrogen-return",
        topicId: "11.2-0",
        prompt:
          "During an allowed n = 3 → 2 transition that emits light, what happens?",
        choices: [
          {
            value: "0",
            label: "The atom absorbs a photon and reaches the ground state.",
          },
          {
            value: "1",
            label: "The electron becomes free.",
          },
          {
            value: "2",
            label:
              "The atom emits a photon and ends in an excited bound state.",
          },
        ],
        answer: "2",
        explanation:
          "The atom loses energy, but n = 2 remains above the n = 1 ground state.",
        hints: [
          {
            text: "Decide whether the energy increases or decreases.",
          },
          {
            text: "The ground state is specifically n = 1, not any lower state.",
          },
        ],
        misconceptionFeedback: {
          "0": "This is a downward transition, so energy leaves. n = 2 is not the ground state.",
          "1": "n = 2 is still a bound state, below the ionization threshold.",
        },
        workedSolution: [
          "Decide whether the energy increases or decreases.",
          "The ground state is specifically n = 1, not any lower state.",
          "The atom loses energy, but n = 2 remains above the n = 1 ground state.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-hydrogen-gap",
      kind: "practice",
      title: "Compare unequal gaps",
      question: {
        id: "hydrogen-gap",
        topicId: "11.2-0",
        prompt: "Which emits a more energetic photon: n = 2 → 1 or n = 3 → 2?",
        choices: [
          {
            value: "0",
            label: "n = 2 → 1.",
          },
          {
            value: "1",
            label: "n = 3 → 2.",
          },
          {
            value: "2",
            label: "Both, because each changes n by one.",
          },
        ],
        answer: "0",
        explanation:
          "The gap from n = 2 to 1 is larger. Hydrogen levels crowd closer together at higher n.",
        hints: [
          {
            text: "Use the energy spacing, not the number of step labels.",
          },
          {
            text: "The lower pair of hydrogen levels is farther apart in energy.",
          },
        ],
        misconceptionFeedback: {
          "1": "A higher starting n does not by itself make a larger gap. Compare both endpoints.",
          "2": "Equal changes in the integer n do not imply equal energy changes. Eₙ varies as −1/n².",
        },
        workedSolution: [
          "Use the energy spacing, not the number of step labels.",
          "The lower pair of hydrogen levels is farther apart in energy.",
          "The gap from n = 2 to 1 is larger. Hydrogen levels crowd closer together at higher n.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-hydrogen-ionize",
      kind: "checkpoint",
      title: "Excitation versus ionization",
      question: {
        id: "hydrogen-ionize",
        topicId: "11.2-0",
        prompt:
          "Compared with hydrogen in n = 1, how much energy does hydrogen in n = 2 need to reach the free-electron threshold?",
        choices: [
          {
            value: "0",
            label: "More energy, because n is larger.",
          },
          {
            value: "1",
            label: "Less energy, because it starts closer to zero energy.",
          },
          {
            value: "2",
            label: "No energy, because it is already ionized.",
          },
        ],
        answer: "1",
        explanation:
          "An excited bound state lies closer to the zero-energy threshold, so less additional energy is needed to ionize it.",
        hints: [
          {
            text: "Identify the zero-energy threshold on the diagram.",
          },
          {
            text: "Compare the distance in energy from each starting state to zero.",
          },
        ],
        misconceptionFeedback: {
          "0": "n = 2 has higher energy and is less tightly bound; its gap to zero is smaller.",
          "2": "n = 2 is excited but remains bound. Positive energy input is still required to ionize it.",
        },
        workedSolution: [
          "Identify the zero-energy threshold on the diagram.",
          "Compare the distance in energy from each starting state to zero.",
          "An excited bound state lies closer to the zero-energy threshold, so less additional energy is needed to ionize it.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
