import type { Assessment } from "../../types/curriculum";
export const section111Assessment: Assessment = {
  id: "11.1-3",
  title: "Section 11.1 Assessment",
  sectionNumber: "11.1",
  introduction:
    "Connect scattering evidence, light relationships, and energy changes in atoms.",
  questions: [
    {
      id: "assessment-11.1-evidence",
      topicId: "11.1-3",
      concept: "Rutherford: evidence versus inference",
      reviewTo: "/lessons/rutherford",
      reviewRecommendation:
        "Separate a detector observation from an inferred structure, then explain how the observation supports the nucleus.",
      prompt:
        "Which statement describes an observation, rather than an interpretation, from the scattering experiment?",
      choices: [
        {
          value: "0",
          label: "The atom has a small positive nucleus.",
        },
        {
          value: "1",
          label: "A few alpha particles were detected back toward the source.",
        },
        {
          value: "2",
          label: "Most of the mass is concentrated in the nucleus.",
        },
      ],
      answer: "1",
      explanation:
        "A detector recorded the returning particles. A small, massive, positive nucleus is an inference that explains them.",
      hints: [
        {
          text: "Ask what a detector could record.",
        },
        {
          text: "A particle’s detected direction is evidence; the structure explaining it is an inference.",
        },
      ],
      misconceptionFeedback: {
        "0": "The nucleus is the inferred model used to explain the detected paths.",
        "2": "Concentrated mass is part of the inferred nuclear structure, not a directly observed detector reading.",
      },
      workedSolution: [
        "Ask what a detector could record.",
        "A particle’s detected direction is evidence; the structure explaining it is an inference.",
        "A detector recorded the returning particles. A small, massive, positive nucleus is an inference that explains them.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-nucleus",
      topicId: "11.1-3",
      concept: "Rutherford: small, positive, massive nucleus",
      reviewTo: "/lessons/rutherford",
      reviewRecommendation:
        "Compare mostly straight paths with rare large deflections, and explain repulsion without a solid-wall collision.",
      prompt:
        "Which model best explains both mostly straight paths and very rare backward scattering?",
      choices: [
        {
          value: "0",
          label: "An atom is a thick solid ball.",
        },
        {
          value: "1",
          label: "Every part of an atom has the same dense positive charge.",
        },
        {
          value: "2",
          label:
            "A tiny massive positive nucleus occupies a small part of the atom.",
        },
      ],
      answer: "2",
      explanation:
        "Most paths stay far from the tiny nucleus. Rare close approaches to its concentrated positive charge can strongly repel positive alpha particles.",
      hints: [
        {
          text: "One model must explain the common and the rare observations.",
        },
        {
          text: "Strong scattering needs concentrated charge and mass; its rarity points to a small region.",
        },
      ],
      misconceptionFeedback: {
        "0": "A thick solid interior would obstruct many paths; it does not explain mostly straight passages.",
        "1": "Uniformly spread positive charge cannot account for the rare very strong reversals as well as concentrated charge.",
      },
      workedSolution: [
        "One model must explain the common and the rare observations.",
        "Strong scattering needs concentrated charge and mass; its rarity points to a small region.",
        "Most paths stay far from the tiny nucleus. Rare close approaches to its concentrated positive charge can strongly repel positive alpha particles.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-frequency",
      topicId: "11.1-3",
      concept: "Wavelength and frequency",
      reviewTo: "/lessons/energy-light",
      reviewRecommendation:
        "Use c = λν to predict how frequency changes when wavelength changes at fixed vacuum speed.",
      prompt:
        "Light in a vacuum changes from 800 nm to 400 nm. How does frequency change?",
      choices: [
        {
          value: "0",
          label: "It doubles.",
        },
        {
          value: "1",
          label: "It halves.",
        },
        {
          value: "2",
          label: "It stays the same because light speed stays the same.",
        },
      ],
      answer: "0",
      explanation:
        "Halving wavelength doubles frequency because λν stays equal to c.",
      hints: [
        {
          text: "Vacuum light speed is constant.",
        },
        {
          text: "The wavelength halves. What frequency keeps λν unchanged?",
        },
      ],
      misconceptionFeedback: {
        "1": "Wavelength and frequency vary inversely, not in the same direction.",
        "2": "The speed stays fixed, but wavelength and frequency can change while their product stays fixed.",
      },
      workedSolution: [
        "Vacuum light speed is constant.",
        "The wavelength halves. What frequency keeps λν unchanged?",
        "Halving wavelength doubles frequency because λν stays equal to c.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-amplitude",
      topicId: "11.1-3",
      concept: "Intensity versus energy per photon",
      reviewTo: "/lessons/energy-light",
      reviewRecommendation:
        "Hold wavelength fixed in the wave activity and change amplitude; watch the photon-energy readout.",
      prompt:
        "A beam becomes more intense while its frequency remains fixed. What happens to the energy of each photon?",
      choices: [
        {
          value: "0",
          label: "It increases with brightness.",
        },
        {
          value: "1",
          label: "It stays the same.",
        },
        {
          value: "2",
          label: "It becomes zero.",
        },
      ],
      answer: "1",
      explanation:
        "At fixed frequency, each photon keeps the same energy. A stronger beam delivers more energy per area per time.",
      hints: [
        {
          text: "Which variable appears in E = hν?",
        },
        {
          text: "Keep energy per photon separate from the total energy delivered by a beam.",
        },
      ],
      misconceptionFeedback: {
        "0": "Greater intensity does not change E = hν when frequency stays fixed.",
        "2": "Fixed nonzero frequency means nonzero photon energy; intensity does not remove that energy.",
      },
      workedSolution: [
        "Which variable appears in E = hν?",
        "Keep energy per photon separate from the total energy delivered by a beam.",
        "At fixed frequency, each photon keeps the same energy. A stronger beam delivers more energy per area per time.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-frequency-number",
      topicId: "11.1-3",
      concept: "Calculate frequency: convert nm to m",
      reviewTo: "/lessons/energy-light",
      reviewRecommendation:
        "Convert nanometers to meters first, then divide vacuum light speed by wavelength.",
      prompt:
        "Find the frequency in Hz for vacuum light at 300 nm. Use c = 3.00 × 10⁸ m/s. Enter a number only.",
      answer: "1.00e15",
      numericAnswer: {
        value: 1000000000000000.0,
        relativeTolerance: 0.01,
      },
      inputPlaceholder: "Number only; e notation is accepted",
      explanation:
        "300 nm = 3.00 × 10⁻⁷ m, so ν = (3.00 × 10⁸)/(3.00 × 10⁻⁷) = 1.00 × 10¹⁵ Hz.",
      hints: [
        {
          text: "300 nm = 300 × 10⁻⁹ m.",
        },
        {
          text: "Use ν = c/λ with λ in meters.",
        },
      ],
      misconceptionFeedback: {
        "1e6":
          "That is the result without converting 300 nm to meters. Use 3.00 × 10⁻⁷ m.",
        "1000000":
          "Convert nanometers to meters before dividing; 300 nm is not 300 m.",
      },
      workedSolution: [
        "Convert: 300 nm = 3.00 × 10⁻⁷ m.",
        "Write ν = c/λ.",
        "Divide coefficients and subtract exponents: 3.00/3.00 and 8 − (−7).",
        "ν = 1.00 × 10¹⁵ Hz. Enter 1.00e15.",
      ],
      fallbackFeedback:
        "Convert nanometers to meters first, then divide vacuum light speed by wavelength.",
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-photon-number",
      topicId: "11.1-3",
      concept: "Calculate energy per photon",
      reviewTo: "/lessons/energy-light",
      reviewRecommendation:
        "Multiply h by frequency, add the powers-of-ten exponents, then normalize the coefficient.",
      prompt:
        "Find one photon’s energy in J at frequency 3.00 × 10¹⁴ Hz. Use h = 6.626 × 10⁻³⁴ J·s. Enter a number only.",
      answer: "1.99e-19",
      numericAnswer: {
        value: 1.9878e-19,
        relativeTolerance: 0.01,
      },
      inputPlaceholder: "Number only; e notation is accepted",
      explanation:
        "E = (6.626 × 10⁻³⁴)(3.00 × 10¹⁴) = 1.9878 × 10⁻¹⁹ J, or 1.99 × 10⁻¹⁹ J rounded.",
      hints: [
        {
          text: "Use E = hν, which is multiplication.",
        },
        {
          text: "Multiply 6.626 by 3.00 and add −34 + 14.",
        },
      ],
      misconceptionFeedback: {
        "1.99e19":
          "The exponent must be negative: −34 + 14 = −20 before normalizing.",
        "1.9878e-20":
          "Moving the coefficient from 19.878 to 1.9878 increases the exponent by one.",
      },
      workedSolution: [
        "Write E = hν.",
        "Multiply coefficients: 6.626 × 3.00 = 19.878.",
        "Add exponents: −34 + 14 = −20. Normalize 19.878 × 10⁻²⁰.",
        "E ≈ 1.99 × 10⁻¹⁹ J. Enter 1.99e-19.",
      ],
      fallbackFeedback:
        "Multiply h by frequency, add the powers-of-ten exponents, then normalize the coefficient.",
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-absorption",
      topicId: "11.1-3",
      concept: "Absorption and starting state",
      reviewTo: "/lessons/atomic-emission",
      reviewRecommendation:
        "Read an upward arrow as energy entering the atom, and match the photon to the allowed gap.",
      prompt:
        "An atom starts in a lower allowed state. A photon matches an allowed gap to a higher state and is absorbed. Which description fits?",
      choices: [
        {
          value: "0",
          label: "The atom loses energy and emits light.",
        },
        {
          value: "1",
          label: "The atom gains energy and reaches the higher state.",
        },
        {
          value: "2",
          label: "The atom can stop at any energy between the states.",
        },
      ],
      answer: "1",
      explanation:
        "The atom gains the photon’s energy and changes to the higher allowed state.",
      hints: [
        {
          text: "Does absorption bring energy in or send it out?",
        },
        {
          text: "The absorbed photon supplies the difference between the two allowed states.",
        },
      ],
      misconceptionFeedback: {
        "0": "Losing energy describes a downward emission transition. Absorption brings energy into the atom.",
        "2": "Allowed bound states have particular energies. The spaces in a diagram are not a continuous list of states.",
      },
      workedSolution: [
        "Does absorption bring energy in or send it out?",
        "The absorbed photon supplies the difference between the two allowed states.",
        "The atom gains the photon’s energy and changes to the higher allowed state.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-gap-number",
      topicId: "11.1-3",
      concept: "Calculate an emitted photon’s gap",
      reviewTo: "/lessons/atomic-emission",
      reviewRecommendation:
        "Subtract final energy from initial energy for a downward transition; distinguish the negative atom change from positive photon energy.",
      prompt:
        "In an invented level model, an atom drops from 8.00 × 10⁻¹⁹ J to 3.00 × 10⁻¹⁹ J, relative to a chosen zero. What energy in J does the emitted photon carry? Enter a positive number only.",
      answer: "5.00e-19",
      numericAnswer: {
        value: 5e-19,
        relativeTolerance: 0.01,
      },
      inputPlaceholder: "Number only; e notation is accepted",
      explanation:
        "The atom loses 5.00 × 10⁻¹⁹ J, and the photon carries that positive energy.",
      hints: [
        {
          text: "The photon carries the positive difference between the two states.",
        },
        {
          text: "The powers of ten match; subtract the coefficients 8.00 − 3.00.",
        },
      ],
      misconceptionFeedback: {
        "8e-19":
          "That is the initial state energy. A photon carries the gap, not the entire initial energy.",
        "3e-19":
          "That is the final state energy. Subtract it from the initial energy.",
        "1.1e-18":
          "You added the state energies. The photon carries their difference.",
      },
      workedSolution: [
        "Identify the initial and final state energies.",
        "For a downward transition, photon energy = initial − final.",
        "Subtract coefficients with the common factor 10⁻¹⁹ J.",
        "E = 5.00 × 10⁻¹⁹ J. Enter 5.00e-19.",
      ],
      fallbackFeedback:
        "Subtract final energy from initial energy for a downward transition; distinguish the negative atom change from positive photon energy.",
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-gap-frequency",
      topicId: "11.1-3",
      concept: "Energy gap, frequency, and wavelength",
      reviewTo: "/lessons/atomic-emission",
      reviewRecommendation:
        "Compare gap sizes first; then connect E = hν and c = λν to the emitted light.",
      prompt:
        "Two allowed downward transitions release 2 units and 4 units of energy. Compare their emitted photons in a vacuum.",
      choices: [
        {
          value: "0",
          label: "The 4-unit photon has half the frequency.",
        },
        {
          value: "1",
          label:
            "Both have the same energy because both transitions go downward.",
        },
        {
          value: "2",
          label:
            "The 4-unit photon has twice the frequency and half the wavelength.",
        },
      ],
      answer: "2",
      explanation:
        "Doubling photon energy doubles frequency by E = hν. Fixed vacuum speed then makes the wavelength half as large.",
      hints: [
        {
          text: "Photon energy equals the gap, not just its direction.",
        },
        {
          text: "Higher frequency corresponds to shorter vacuum wavelength.",
        },
      ],
      misconceptionFeedback: {
        "0": "Higher photon energy means higher frequency, not lower frequency.",
        "1": "Direction tells you energy is emitted; gap size determines how much energy each photon carries.",
      },
      workedSolution: [
        "Photon energy equals the gap, not just its direction.",
        "Higher frequency corresponds to shorter vacuum wavelength.",
        "Doubling photon energy doubles frequency by E = hν. Fixed vacuum speed then makes the wavelength half as large.",
      ],
      difficulty: "standard",
    },
    {
      id: "assessment-11.1-spectra",
      topicId: "11.1-3",
      concept: "Line spectra and allowed gaps",
      reviewTo: "/lessons/atomic-emission",
      reviewRecommendation:
        "Compare the spectrum views, and explain why a line marks a particular photon energy rather than an electron path.",
      prompt:
        "Why can an excited dilute atomic gas show bright spectral lines with dark spaces between them?",
      choices: [
        {
          value: "0",
          label:
            "Allowed radiative transitions release particular photon energies.",
        },
        {
          value: "1",
          label: "The lines are photographs of circular electron tracks.",
        },
        {
          value: "2",
          label: "Each atom emits every possible photon energy continuously.",
        },
      ],
      answer: "0",
      explanation:
        "Specific allowed gaps produce particular photon energies. Repeated transitions across many atoms give distinct spectral lines.",
      hints: [
        {
          text: "Think about the differences between allowed energy states.",
        },
        {
          text: "A line represents detected photons, not an electron’s position.",
        },
      ],
      misconceptionFeedback: {
        "1": "A spectral line is detected light at an energy or wavelength, not a picture of an electron’s path.",
        "2": "A continuous range would make a continuous band. Allowed state differences account for distinct lines.",
      },
      workedSolution: [
        "Think about the differences between allowed energy states.",
        "A line represents detected photons, not an electron’s position.",
        "Specific allowed gaps produce particular photon energies. Repeated transitions across many atoms give distinct spectral lines.",
      ],
      difficulty: "standard",
    },
  ],
};
