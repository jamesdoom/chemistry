import type { Lesson } from "../../types/curriculum";
export const emissionLesson: Lesson = {
  id: "atomic-emission",
  topicId: "11.1-2",
  title: "Emission of Energy by Atoms: gaps become light",
  subtitle:
    "Section 11.1 · Absorption, emission, and spectral lines · About 15 minutes",
  summary:
    "Atoms absorb energy for upward transitions and emit positive-energy photons during downward radiative transitions. Photon energy equals the gap. Specific allowed gaps explain line spectra; the whole pattern comes from many atoms and depends on state populations.",
  completionActions: [
    {
      label: "Review wavelength and photon energy →",
      to: "/lessons/energy-light",
    },
  ],
  steps: [
    {
      id: "concept",
      kind: "explanation",
      title: "Atoms trade energy in specific amounts",
      text: "An atom can occupy particular allowed energy states. A photon matching an allowed gap can be absorbed, raising the atom’s energy. When an excited atom changes to a lower state by emitting light, the emitted photon carries the energy difference. The photon’s energy is positive whether it enters or leaves the atom. These are changes of state, not tracks through space.",
      chain: [
        "Allowed energy states",
        "Specific energy gaps",
        "Specific photon energies",
        "Spectral lines",
      ],
      explanations: [
        {
          label: "Simpler explanation",
          text: "Going up requires energy in. Going down releases energy. A photon carries the amount needed to bridge the two states.",
        },
        {
          label: "Visual explanation",
          text: "Read a level diagram upward as more energy, not more physical height. An upward arrow means the atom gains energy; a downward arrow means it loses energy.",
        },
        {
          label: "Concrete analogy",
          text: "A staircase has particular landings, and the height difference depends on which two landings you choose. This helps picture gaps. An atom’s states are energies, not actual stair steps, and transitions are not a walk between them.",
        },
        {
          label: "Worked example",
          text: "If a state at 5 illustrative energy units changes to one at 2, the atom loses 3 units. Its emitted photon carries 3 positive energy units, not 5 and not −3.",
        },
      ],
      continueLabel: "Explore energy transfers and spectra →",
    },
    {
      id: "energy-explorer",
      kind: "emission-explorer",
      title: "A gap becomes a photon",
      text: "Reveal one upward and two downward transitions. Then compare emission lines, absorption lines, and continuous light. The three-level model is invented for teaching, with a chosen zero and unequal energy gaps.",
      continueLabel: "Work through a spectrum example →",
    },
    {
      id: "example",
      kind: "example",
      title: "Explain a line, one step at a time",
      steps: [
        "Start with an atom in C at 5 illustrative units. Suppose it makes the allowed transition to B at 2 units.",
        "The atom’s energy change is 2 − 5 = −3 units. The atom loses energy; the photon carries +3 units.",
        "Across many excited atoms, repeated C → B transitions produce photons with the same energy. Those photons form a line at energy 3 on our illustrative energy axis.",
        "An upward B → C transition can absorb a photon with that same gap of 3 units. With atoms initially in B, continuous incident light can therefore show a dark absorption line at that energy.",
        "The full pattern depends on available states, allowed transitions, and which states are populated. One atom does not emit every line at once. Emission and absorption lines are detected light, not drawings of orbitals.",
      ],
      continueLabel: "Try the energy checks →",
    },
    {
      id: "practice-absorb",
      kind: "practice",
      title: "Which way does energy go?",
      question: {
        id: "emission-absorb",
        topicId: "11.1-2",
        prompt:
          "An atom initially in a lower allowed state absorbs a photon that matches the gap to a higher state. What happens?",
        choices: [
          {
            value: "0",
            label: "The atom moves to the higher energy state.",
          },
          {
            value: "1",
            label: "The atom emits a second photon and loses energy.",
          },
          {
            value: "2",
            label: "The photon energy is negative.",
          },
        ],
        answer: "0",
        explanation:
          "The atom gains the photon’s energy and enters the higher allowed state.",
        hints: [
          {
            text: "Decide whether energy enters or leaves the atom.",
          },
          {
            text: "An atom that gains energy moves to a higher energy state.",
          },
        ],
        misconceptionFeedback: {
          "1": "Absorption brings energy into the atom. Emission is a different, downward process.",
          "2": "A photon carries positive energy. The atom’s energy change is positive during absorption.",
        },
        workedSolution: [
          "Decide whether energy enters or leaves the atom.",
          "An atom that gains energy moves to a higher energy state.",
          "The atom gains the photon’s energy and enters the higher allowed state.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "practice-emission",
      kind: "practice",
      title: "Track both sides of the transfer",
      question: {
        id: "emission-emission",
        topicId: "11.1-2",
        prompt:
          "An atom changes from illustrative level C (5 units) to A (0 units). Which statement is correct?",
        choices: [
          {
            value: "0",
            label: "The photon has −5 units of energy.",
          },
          {
            value: "1",
            label: "The atom loses 5 units and emits a photon with 5 units.",
          },
          {
            value: "2",
            label: "The atom absorbs 5 units.",
          },
        ],
        answer: "1",
        explanation:
          "Energy is conserved: the decrease in atom energy equals the positive energy carried by the photon.",
        hints: [
          {
            text: "Compare final energy with initial energy.",
          },
          {
            text: "Photon energy is the magnitude of the gap, not the signed change for the atom.",
          },
        ],
        misconceptionFeedback: {
          "0": "The atom’s change is −5 units, but the emitted photon’s energy is positive.",
          "2": "A downward transition releases energy. An upward transition can absorb energy.",
        },
        workedSolution: [
          "Compare final energy with initial energy.",
          "Photon energy is the magnitude of the gap, not the signed change for the atom.",
          "Energy is conserved: the decrease in atom energy equals the positive energy carried by the photon.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "practice-gap",
      kind: "practice",
      title: "Compare two emitted photons",
      question: {
        id: "emission-gap",
        topicId: "11.1-2",
        prompt:
          "In the teaching model, compare C → A (gap 5) with B → A (gap 2). Which statement is correct?",
        choices: [
          {
            value: "0",
            label:
              "C → A emits a photon with higher frequency and shorter wavelength.",
          },
          {
            value: "1",
            label: "C → A emits a lower-frequency photon because it ends at A.",
          },
          {
            value: "2",
            label:
              "Both photons have the same energy because they end at the same level.",
          },
        ],
        answer: "0",
        explanation:
          "The larger gap makes a more energetic photon. E = hν means higher frequency; c = λν means shorter vacuum wavelength.",
        hints: [
          {
            text: "Find the size of each gap first.",
          },
          {
            text: "More energy per photon means greater frequency and shorter wavelength.",
          },
        ],
        misconceptionFeedback: {
          "1": "The photon energy depends on the gap between two levels, not just the final level.",
          "2": "The starting levels differ, so the energy gaps differ even though both end at A.",
        },
        workedSolution: [
          "Find the size of each gap first.",
          "More energy per photon means greater frequency and shorter wavelength.",
          "The larger gap makes a more energetic photon. E = hν means higher frequency; c = λν means shorter vacuum wavelength.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "gap-calculation",
      kind: "practice",
      title: "Calculate the energy difference",
      question: {
        id: "emission-gap-number",
        topicId: "11.1-2",
        prompt:
          "In an invented energy-level example, an atom drops from 5.00 × 10⁻¹⁹ J to 2.00 × 10⁻¹⁹ J (relative to a chosen zero). What energy in J does its emitted photon carry? Enter a positive number only.",
        answer: "3.00e-19",
        numericAnswer: {
          value: 3e-19,
          relativeTolerance: 0.01,
        },
        inputPlaceholder: "Photon energy in J (number only)",
        explanation:
          "The atom loses 3.00 × 10⁻¹⁹ J. Its emitted photon carries that positive energy: higher energy minus lower energy.",
        hints: [
          {
            text: "Subtract the lower state’s energy from the higher state’s energy.",
          },
          {
            text: "Both values use 10⁻¹⁹ J, so subtract their coefficients. Photon energy is positive.",
          },
        ],
        misconceptionFeedback: {
          "5e-19":
            "That is the initial state’s energy, not the gap. Subtract the ending state’s energy.",
          "2e-19":
            "That is the final state’s energy. The photon carries the difference between states.",
          "7e-19":
            "Additions do not give the gap. Subtract lower energy from higher energy.",
        },
        fallbackFeedback:
          "Calculate the positive gap: (5.00 − 2.00) × 10⁻¹⁹ J. The atom loses energy; the emitted photon carries a positive amount.",
        workedSolution: [
          "Identify the higher state: 5.00 × 10⁻¹⁹ J.",
          "Identify the lower state: 2.00 × 10⁻¹⁹ J.",
          "Photon energy = higher − lower. Subtract coefficients because the powers of ten match.",
          "E = 3.00 × 10⁻¹⁹ J. Enter 3.00e-19.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "practice-lines",
      kind: "checkpoint",
      title: "Read a line spectrum",
      question: {
        id: "emission-lines",
        topicId: "11.1-2",
        prompt:
          "Why does a dilute excited atomic gas produce distinct emission lines instead of every photon energy in a continuous band?",
        choices: [
          {
            value: "0",
            label: "Each photon can have any energy between the levels.",
          },
          {
            value: "1",
            label: "Each line shows an electron’s circular path.",
          },
          {
            value: "2",
            label: "Allowed state changes have specific energy differences.",
          },
        ],
        answer: "2",
        explanation:
          "Specific allowed transitions yield particular photon energies, producing lines rather than an unbroken range.",
        hints: [
          {
            text: "Think about the allowed energy states rather than the spaces in the drawing.",
          },
          {
            text: "Each emitted photon’s energy equals the difference between its starting and ending states.",
          },
        ],
        misconceptionFeedback: {
          "0": "Bound states have particular energies. A transition’s photon carries a specific gap, not an arbitrary value between levels.",
          "1": "A spectral line is detected light at a particular wavelength or energy. It is not a picture of an electron path.",
        },
        workedSolution: [
          "Think about the allowed energy states rather than the spaces in the drawing.",
          "Each emitted photon’s energy equals the difference between its starting and ending states.",
          "Specific allowed transitions yield particular photon energies, producing lines rather than an unbroken range.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
