import type { Assessment } from "../../types/curriculum";
export const section112Assessment: Assessment = {
  id: "11.2-3",
  sectionNumber: "11.2",
  title: "Section 11.2 Assessment",
  introduction:
    "Connect hydrogen energy states, Bohr’s model, and orbital probability descriptions.",
  questions: [
    {
      id: "assessment-11.2-state",
      topicId: "11.2-3",
      concept: "Ground, excited, and bound states",
      reviewTo: "/lessons/hydrogen-levels",
      reviewRecommendation:
        "Compare n = 1 with higher bound states and distinguish excitation from freeing the electron.",
      prompt:
        "A hydrogen electron is in n = 2 with negative energy relative to a free electron at rest. Which description fits?",
      choices: [
        {
          value: "0",
          label: "It is already ionized.",
        },
        {
          value: "1",
          label: "It is excited and still bound.",
        },
        {
          value: "2",
          label: "It is in the ground state because its energy is negative.",
        },
      ],
      answer: "1",
      explanation:
        "n = 2 is above the n = 1 ground state but remains bound, below the free-electron threshold.",
      hints: [
        {
          text: "Ground means lowest allowed energy.",
        },
        {
          text: "An excited state can remain bound below zero.",
        },
      ],
      misconceptionFeedback: {
        "0": "Ionization makes the electron unbound. A negative bound-state energy below zero is not ionization.",
        "2": "Negative energy labels binding relative to the chosen zero, not the ground state. The ground state is n = 1.",
      },
      workedSolution: [
        "Ground means lowest allowed energy.",
        "An excited state can remain bound below zero.",
        "n = 2 is above the n = 1 ground state but remains bound, below the free-electron threshold.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-transition",
      topicId: "11.2-3",
      concept: "Emission can end in an excited state",
      reviewTo: "/lessons/hydrogen-levels",
      reviewRecommendation:
        "Compare both endpoints: decide transfer direction, then identify whether the final level is ground or excited.",
      prompt:
        "During a radiative n = 3 → 2 transition in hydrogen, what occurs?",
      choices: [
        {
          value: "0",
          label: "A photon is emitted; the final atom is still excited.",
        },
        {
          value: "1",
          label: "A photon is absorbed; the atom reaches the ground state.",
        },
        {
          value: "2",
          label: "The electron becomes free.",
        },
      ],
      answer: "0",
      explanation:
        "The atom drops in energy and emits a photon, but n = 2 is still above the n = 1 ground state.",
      hints: [
        {
          text: "An energy decrease sends energy out of the atom.",
        },
        {
          text: "Only n = 1 is the hydrogen ground state.",
        },
      ],
      misconceptionFeedback: {
        "1": "A downward transition emits rather than absorbs. n = 2 is not the ground state.",
        "2": "n = 2 remains a bound level. Ionization reaches the free-electron threshold.",
      },
      workedSolution: [
        "An energy decrease sends energy out of the atom.",
        "Only n = 1 is the hydrogen ground state.",
        "The atom drops in energy and emits a photon, but n = 2 is still above the n = 1 ground state.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-ionization",
      topicId: "11.2-3",
      concept: "Ionization energy depends on starting state",
      reviewTo: "/lessons/hydrogen-levels",
      reviewRecommendation:
        "Compare each state’s energy gap to the zero-energy ionization threshold.",
      prompt:
        "Which needs less added energy to reach hydrogen’s free-electron threshold: starting in n = 1 or n = 3?",
      choices: [
        {
          value: "0",
          label: "n = 1, because its n value is smaller.",
        },
        {
          value: "1",
          label: "They need the same input because both are hydrogen.",
        },
        {
          value: "2",
          label: "n = 3, because it is closer to zero energy.",
        },
      ],
      answer: "2",
      explanation:
        "The excited n = 3 state has a smaller gap to zero, so less extra input is needed to ionize it.",
      hints: [
        {
          text: "Zero represents a free electron at rest far away.",
        },
        {
          text: "Which starting state is closer to that threshold?",
        },
      ],
      misconceptionFeedback: {
        "0": "n = 1 is more tightly bound and farther below the threshold.",
        "1": "The starting energy matters even for the same atom.",
      },
      workedSolution: [
        "Zero represents a free electron at rest far away.",
        "Which starting state is closer to that threshold?",
        "The excited n = 3 state has a smaller gap to zero, so less extra input is needed to ionize it.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-scope",
      topicId: "11.2-3",
      concept: "Bohr model: one-electron scope",
      reviewTo: "/lessons/bohr-model",
      reviewRecommendation:
        "Review the simple model’s one-electron treatment and the missing interactions in multi-electron atoms.",
      prompt:
        "Why can the simple Bohr hydrogen treatment not fully account for neutral helium?",
      choices: [
        {
          value: "0",
          label: "Helium has no nucleus.",
        },
        {
          value: "1",
          label:
            "Neutral helium has two electrons, with electron–electron interactions absent from the simple treatment.",
        },
        {
          value: "2",
          label: "All helium energy levels are zero.",
        },
      ],
      answer: "1",
      explanation:
        "The simple one-electron treatment omits electron–electron interactions. Hydrogen-like one-electron ions are within its simpler scope.",
      hints: [
        {
          text: "Count electrons in neutral hydrogen and neutral helium.",
        },
        {
          text: "Ask what interaction appears when there is a second electron.",
        },
      ],
      misconceptionFeedback: {
        "0": "Helium has a nucleus. The additional electron interactions are the relevant difficulty.",
        "2": "Helium has bound energy states; the issue is not that its levels are all zero.",
      },
      workedSolution: [
        "Count electrons in neutral hydrogen and neutral helium.",
        "Ask what interaction appears when there is a second electron.",
        "The simple one-electron treatment omits electron–electron interactions. Hydrogen-like one-electron ions are within its simpler scope.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-quantization",
      topicId: "11.2-3",
      concept: "What remains from Bohr in the modern model",
      reviewTo: "/lessons/bohr-model",
      reviewRecommendation:
        "Keep quantized states separate from the historical circular-path assumption.",
      prompt:
        "Which idea remains in the modern quantum model, while fixed circular paths are replaced?",
      choices: [
        {
          value: "0",
          label: "All bound electron energies form a continuous range.",
        },
        {
          value: "1",
          label: "Every orbital is a circular orbit.",
        },
        {
          value: "2",
          label: "Bound states have particular allowed energies.",
        },
      ],
      answer: "2",
      explanation:
        "Quantized bound energies remain; modern orbitals replace fixed circular paths with a probability description.",
      hints: [
        {
          text: "Separate energy predictions from pictures of motion.",
        },
        {
          text: "The modern model retains quantized bound states.",
        },
      ],
      misconceptionFeedback: {
        "0": "Bound energy states remain quantized. Removing a circular path does not remove allowed energies.",
        "1": "Modern orbitals are wave functions, not circular routes.",
      },
      workedSolution: [
        "Separate energy predictions from pictures of motion.",
        "The modern model retains quantized bound states.",
        "Quantized bound energies remain; modern orbitals replace fixed circular paths with a probability description.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-orbital",
      topicId: "11.2-3",
      concept: "Orbital meaning",
      reviewTo: "/lessons/wave-mechanical",
      reviewRecommendation:
        "Describe an orbital as a wave function and its probability distribution rather than a route or container.",
      prompt: "Which statement correctly describes an orbital?",
      choices: [
        {
          value: "0",
          label:
            "A wave function for a state, whose squared magnitude gives probability density.",
        },
        {
          value: "1",
          label: "A hard shell trapping the electron.",
        },
        {
          value: "2",
          label: "A circular route that a detector has traced.",
        },
      ],
      answer: "0",
      explanation:
        "An orbital is a mathematical description of a state; cloud drawings represent the associated probability distribution.",
      hints: [
        {
          text: "Ask what the model predicts about position measurements.",
        },
        {
          text: "Probability descriptions do not trace paths.",
        },
      ],
      misconceptionFeedback: {
        "1": "Drawing boundaries do not create physical walls.",
        "2": "An orbital does not specify an observed circular trajectory.",
      },
      workedSolution: [
        "Ask what the model predicts about position measurements.",
        "Probability descriptions do not trace paths.",
        "An orbital is a mathematical description of a state; cloud drawings represent the associated probability distribution.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-outcomes",
      topicId: "11.2-3",
      concept: "Cloud dots and independent preparations",
      reviewTo: "/lessons/wave-mechanical",
      reviewRecommendation:
        "Compare one outcome with many separately prepared atoms; explain why dots are not simultaneous electrons or a trajectory.",
      prompt:
        "A 1s cloud sketch combines 100 independent position outcomes from separately prepared hydrogen atoms. What can it show?",
      choices: [
        {
          value: "0",
          label: "One atom has 100 electrons.",
        },
        {
          value: "1",
          label: "One electron visited every point in sequence.",
        },
        {
          value: "2",
          label:
            "A pattern of likely position outcomes in that prepared state.",
        },
      ],
      answer: "2",
      explanation:
        "Many independently prepared outcomes illustrate the distribution, without giving one electron’s route.",
      hints: [
        {
          text: "Read what was prepared and measured for each dot.",
        },
        {
          text: "Separate an outcome count from an electron count.",
        },
      ],
      misconceptionFeedback: {
        "0": "Each hydrogen atom has one electron. The count refers to independent outcomes.",
        "1": "The outcomes are from separate preparations, not a chronological trail of one electron.",
      },
      workedSolution: [
        "Read what was prepared and measured for each dot.",
        "Separate an outcome count from an electron count.",
        "Many independently prepared outcomes illustrate the distribution, without giving one electron’s route.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-boundary",
      topicId: "11.2-3",
      concept: "Probability drawings have no hard wall",
      reviewTo: "/lessons/wave-mechanical",
      reviewRecommendation:
        "Move the cloud drawing guide while watching the distribution; explain why the guide does not force probabilities to zero.",
      prompt:
        "For the hydrogen 1s drawing, what does a dashed boundary around the cloud mean?",
      choices: [
        {
          value: "0",
          label: "The electron cannot be found outside it.",
        },
        {
          value: "1",
          label:
            "It is a drawing guide, not a wall; probability extends beyond a finite guide.",
        },
        {
          value: "2",
          label: "The atom gains energy whenever the guide is moved.",
        },
      ],
      answer: "1",
      explanation:
        "The guide is a representation choice. It does not change the state or eliminate probability outside it.",
      hints: [
        {
          text: "Decide whether the boundary is a physical object or part of the illustration.",
        },
        {
          text: "The 1s distribution extends beyond finite drawing guides.",
        },
      ],
      misconceptionFeedback: {
        "0": "A finite drawing boundary is not a hard edge to the 1s distribution.",
        "2": "Moving a drawing guide does not change the atom’s energy.",
      },
      workedSolution: [
        "Decide whether the boundary is a physical object or part of the illustration.",
        "The 1s distribution extends beyond finite drawing guides.",
        "The guide is a representation choice. It does not change the state or eliminate probability outside it.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-density",
      topicId: "11.2-3",
      concept: "Probability versus certainty",
      reviewTo: "/lessons/wave-mechanical",
      reviewRecommendation:
        "Compare equal small volumes and explain a probability prediction without claiming certainty for one measurement.",
      prompt:
        "Two equal small volumes have different probability densities for the same orbital. What follows?",
      choices: [
        {
          value: "0",
          label:
            "The higher-density volume is more likely to contain a position-measurement outcome, but not guaranteed.",
        },
        {
          value: "1",
          label:
            "The electron must be found in the higher-density volume next.",
        },
        {
          value: "2",
          label:
            "Higher density means that region contains more simultaneous electrons.",
        },
      ],
      answer: "0",
      explanation:
        "Higher density predicts a greater probability for an equal small volume, not certainty for an individual outcome.",
      hints: [
        {
          text: "Keep the compared volumes equal.",
        },
        {
          text: "More likely does not mean certain.",
        },
      ],
      misconceptionFeedback: {
        "1": "A probability prediction does not determine the next result with certainty.",
        "2": "For one prepared electron, probability density is not a count of simultaneous electrons in each region.",
      },
      workedSolution: [
        "Keep the compared volumes equal.",
        "More likely does not mean certain.",
        "Higher density predicts a greater probability for an equal small volume, not certainty for an individual outcome.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.2-gap",
      topicId: "11.2-3",
      concept: "Hydrogen photon energy from a gap",
      reviewTo: "/lessons/hydrogen-levels",
      reviewRecommendation:
        "Subtract the lower energy from the higher energy and keep emitted photon energy positive. Do not subtract n labels.",
      prompt:
        "Using the approximate hydrogen energies E₂ = −5.45 × 10⁻¹⁹ J and E₁ = −2.18 × 10⁻¹⁸ J, find the energy in J of a photon emitted during n = 2 → 1. Enter a positive number only.",
      answer: "1.64e-18",
      numericAnswer: {
        value: 1.635e-18,
        relativeTolerance: 0.01,
      },
      inputPlaceholder: "Photon energy in J (number only)",
      explanation:
        "Ephoton = E₂ − E₁ = (−0.545 − (−2.18)) × 10⁻¹⁸ J = 1.635 × 10⁻¹⁸ J, about 1.64 × 10⁻¹⁸ J.",
      hints: [
        {
          text: "Use the energy difference, not the n difference. Express both energies with the same power of ten.",
        },
        {
          text: "Subtract lower energy from higher: −0.545 − (−2.18), with a common factor of 10⁻¹⁸ J.",
        },
      ],
      misconceptionFeedback: {
        "2.18e-18":
          "That is the ground-state binding magnitude. The emitted photon carries the gap from n = 2, not the entire gap from zero.",
        "5.45e-19":
          "That is the n = 2 binding magnitude, not the n = 2 to 1 energy gap.",
      },
      fallbackFeedback:
        "Write E₂ as −0.545 × 10⁻¹⁸ J. For photon energy subtract E₁ from E₂, so subtracting the negative lower energy gives a positive gap.",
      workedSolution: [
        "Identify the higher state E₂ and lower state E₁.",
        "Write E₂ = −0.545 × 10⁻¹⁸ J and E₁ = −2.18 × 10⁻¹⁸ J.",
        "Ephoton = E₂ − E₁ = (−0.545 + 2.18) × 10⁻¹⁸ J.",
        "Ephoton ≈ 1.64 × 10⁻¹⁸ J. Enter 1.64e-18.",
      ],
      difficulty: "standard",
    },
  ],
};
