import type { Assessment } from "../../types/curriculum";
export const chapter11Review: Assessment = {
  id: "chapter-11-review",
  scope: "chapter",
  sectionNumber: "chapter-11",
  title: "Chapter 11 Mixed Review",
  introduction:
    "Connect evidence, light, energy states, orbital models, configurations, and periodic properties. Use each result to choose your next review path.",
  questions: [
    {
      id: "chapter-review-structure",
      topicId: "chapter-11-review",
      concept: "Scattering evidence and atomic structure",
      reviewTo: "/lessons/rutherford",
      reviewRecommendation:
        "Link frequent straight-through paths and rare strong deflections to mostly empty space and a concentrated positive nucleus.",
      prompt:
        "Most alpha particles pass through foil, but a few strongly deflect. Which structure best explains both observations?",
      answer: "nucleus",
      explanation:
        "A concentrated positive nucleus explains rare strong repulsion; most alpha particles miss that small region and pass through.",
      hints: [
        {
          text: "Connect common outcomes and rare outcomes separately.",
        },
        {
          text: "A positive alpha particle is repelled by concentrated positive charge.",
        },
      ],
      misconceptionFeedback: {
        spread:
          "A broadly spread charge does not account for the rare very strong deflections as effectively as a concentrated nucleus.",
        electrons:
          "Electrons are negative and very light. They are not the concentrated positive, massive center inferred from scattering.",
      },
      workedSolution: [
        "Connect common outcomes and rare outcomes separately.",
        "A positive alpha particle is repelled by concentrated positive charge.",
        "A concentrated positive nucleus explains rare strong repulsion; most alpha particles miss that small region and pass through.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "nucleus",
          label: "Mostly empty space with a small, dense, positive nucleus",
        },
        {
          value: "spread",
          label: "Positive charge spread evenly through a solid atom",
        },
        {
          value: "electrons",
          label:
            "Electrons hold nearly all the mass and strongly repel positive alpha particles",
        },
      ],
    },
    {
      id: "chapter-review-light",
      topicId: "chapter-11-review",
      concept: "Wavelength and energy per photon",
      reviewTo: "/lessons/energy-light",
      reviewRecommendation:
        "Compare wavelength, frequency, and photon energy. Keep energy per photon distinct from beam intensity.",
      prompt:
        "Two light beams have wavelengths 450 nm and 650 nm in vacuum. Which photons have greater energy?",
      answer: "short",
      explanation:
        "In vacuum, frequency is c divided by wavelength. Photon energy is h times frequency, so the shorter-wavelength photons have greater energy.",
      hints: [
        {
          text: "Compare frequency using the same speed of light.",
        },
        {
          text: "Energy per photon follows frequency, not how many photons arrive.",
        },
      ],
      misconceptionFeedback: {
        long: "Wavelength and frequency vary inversely. A longer wavelength means lower energy per photon.",
        bright:
          "Brightness can depend on photon arrival rate; the question compares energy per photon, determined by frequency.",
      },
      workedSolution: [
        "Compare frequency using the same speed of light.",
        "Energy per photon follows frequency, not how many photons arrive.",
        "In vacuum, frequency is c divided by wavelength. Photon energy is h times frequency, so the shorter-wavelength photons have greater energy.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "long",
          label: "650 nm: longer wavelength means higher energy",
        },
        {
          value: "short",
          label:
            "450 nm: shorter wavelength means higher frequency and photon energy",
        },
        {
          value: "bright",
          label: "Whichever beam is brighter; wavelength cannot tell us",
        },
      ],
    },
    {
      id: "chapter-review-gap",
      topicId: "chapter-11-review",
      concept: "Energy gaps and a line spectrum",
      reviewTo: "/lessons/atomic-emission",
      reviewRecommendation:
        "Use the difference between starting and ending energies, and distinguish emission from absorption.",
      prompt:
        "An illustrative atom drops from 8.4 × 10⁻¹⁹ J to 3.2 × 10⁻¹⁹ J and emits one photon. What is the photon energy in J? Enter a positive number only.",
      answer: "5.2e-19",
      explanation:
        "The photon carries the lost energy: (8.4 − 3.2) × 10⁻¹⁹ J = 5.2 × 10⁻¹⁹ J. Different allowed gaps give different spectral lines.",
      hints: [
        {
          text: "A photon carries the gap, not either level by itself.",
        },
        {
          text: "Subtract the lower energy from the higher energy.",
        },
      ],
      misconceptionFeedback: {
        "8.4e-19":
          "That is the starting level, not the gap to the ending level.",
        "3.2e-19": "That is the ending level, not the energy released.",
      },
      workedSolution: [
        "A photon carries the gap, not either level by itself.",
        "Subtract the lower energy from the higher energy.",
        "The photon carries the lost energy: (8.4 − 3.2) × 10⁻¹⁹ J = 5.2 × 10⁻¹⁹ J. Different allowed gaps give different spectral lines.",
      ],
      difficulty: "standard",
      numericAnswer: {
        value: 5.2e-19,
        relativeTolerance: 0.01,
      },
      inputPlaceholder: "Photon energy in J (number only)",
      fallbackFeedback:
        "Subtract 3.2 from 8.4, keeping the common factor of 10^-19 J. Photon energy is a positive gap.",
    },
    {
      id: "chapter-review-state",
      topicId: "chapter-11-review",
      concept: "Transitions and excited states",
      reviewTo: "/lessons/hydrogen-levels",
      reviewRecommendation:
        "Decide energy transfer direction and final ground/excited status independently.",
      prompt:
        "Hydrogen makes a radiative n = 4 → 2 transition. Which connects its energy transfer and final state?",
      answer: "emission",
      explanation:
        "Moving to a lower bound state emits a photon. n = 2 is still above the n = 1 ground state and is not ionization.",
      hints: [
        {
          text: "Lower energy means energy leaves the atom.",
        },
        {
          text: "Ground state is n = 1; an excited atom can remain bound.",
        },
      ],
      misconceptionFeedback: {
        ground:
          "A downward radiative transition emits, not absorbs; n = 2 is not the ground state.",
        ionized:
          "A transition to another bound level does not free the electron.",
      },
      workedSolution: [
        "Lower energy means energy leaves the atom.",
        "Ground state is n = 1; an excited atom can remain bound.",
        "Moving to a lower bound state emits a photon. n = 2 is still above the n = 1 ground state and is not ionization.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "ground",
          label: "Absorption; the atom reaches the ground state",
        },
        {
          value: "emission",
          label: "Emission; the atom remains excited and bound",
        },
        {
          value: "ionized",
          label: "Emission; the electron must be ionized",
        },
      ],
    },
    {
      id: "chapter-review-bohr",
      topicId: "chapter-11-review",
      concept: "Historical model and modern interpretation",
      reviewTo: "/lessons/bohr-model",
      reviewRecommendation:
        "Separate useful predictions of quantized energy from a literal circular electron route.",
      prompt:
        "Bohr’s model predicts useful hydrogen energy gaps. Does this establish that electrons follow the drawn circles?",
      answer: "limits",
      explanation:
        "A model can explain some measurements while its path picture is limited. Modern quantum descriptions retain allowed bound energies without specifying Bohr circles as paths.",
      hints: [
        {
          text: "Separate the prediction being checked from all assumptions in its drawing.",
        },
        {
          text: "Quantized energies and circular trajectories are different ideas.",
        },
      ],
      misconceptionFeedback: {
        proof:
          "Matching energy gaps does not prove a literal path. A model’s successes have a limited scope.",
        discard:
          "Replacing the circular-path picture does not remove quantized bound energies.",
      },
      workedSolution: [
        "Separate the prediction being checked from all assumptions in its drawing.",
        "Quantized energies and circular trajectories are different ideas.",
        "A model can explain some measurements while its path picture is limited. Modern quantum descriptions retain allowed bound energies without specifying Bohr circles as paths.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "proof",
          label: "Yes; correct energy predictions prove the paths",
        },
        {
          value: "limits",
          label:
            "No; quantized energies remain useful, while the modern model describes orbitals and probabilities",
        },
        {
          value: "discard",
          label:
            "No; therefore all quantized energy predictions must also be discarded",
        },
      ],
    },
    {
      id: "chapter-review-cloud",
      topicId: "chapter-11-review",
      concept: "Probability cloud versus electron count",
      reviewTo: "/lessons/wave-mechanical",
      reviewRecommendation:
        "Read a cloud as a distribution of independent outcomes, rather than an electron count or connected trail.",
      prompt:
        "A cloud combines 300 position outcomes from separately prepared hydrogen atoms in the same state. What do the dots tell us?",
      answer: "distribution",
      explanation:
        "Each prepared hydrogen atom has one electron. Many independent outcomes reveal a probability pattern, not simultaneous electrons in one atom or a trajectory.",
      hints: [
        {
          text: "Look at what one dot represents.",
        },
        {
          text: "Separate a count of measurements from a count of particles in one atom.",
        },
      ],
      misconceptionFeedback: {
        count:
          "Neutral hydrogen has one electron. The dots count independently prepared measurement outcomes.",
        track:
          "Independent preparations are not a time sequence tracing one electron.",
      },
      workedSolution: [
        "Look at what one dot represents.",
        "Separate a count of measurements from a count of particles in one atom.",
        "Each prepared hydrogen atom has one electron. Many independent outcomes reveal a probability pattern, not simultaneous electrons in one atom or a trajectory.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "count",
          label: "One hydrogen atom contains 300 electrons",
        },
        {
          value: "track",
          label: "One electron visited the points in order",
        },
        {
          value: "distribution",
          label:
            "The outcomes illustrate likely positions in that state, without giving one electron’s path",
        },
      ],
    },
    {
      id: "chapter-review-orbital",
      topicId: "chapter-11-review",
      concept: "Sublevels, orientations, and boxes",
      reviewTo: "/lessons/hydrogen-orbitals",
      reviewRecommendation:
        "Count the orbitals in 2s and 2p and connect each p orientation to one whole two-lobed shape.",
      prompt: "Which correctly connects the n = 2 level to orbital boxes?",
      answer: "four",
      explanation:
        "2s has one orbital and 2p has three. Each p orbital has two lobes but receives one box. Four boxes can hold up to eight electrons.",
      hints: [
        {
          text: "Boxes count individual orbitals.",
        },
        {
          text: "Count one s orbital plus three p orientations.",
        },
      ],
      misconceptionFeedback: {
        two: "A p sublevel contains three orbitals, not one.",
        eight:
          "Eight is electron capacity, not orbital count. Each of the four orbitals can hold two electrons.",
      },
      workedSolution: [
        "Boxes count individual orbitals.",
        "Count one s orbital plus three p orientations.",
        "2s has one orbital and 2p has three. Each p orbital has two lobes but receives one box. Four boxes can hold up to eight electrons.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "two",
          label: "Two boxes: one for 2s and one for the entire 2p sublevel",
        },
        {
          value: "four",
          label:
            "Four boxes: one spherical s orbital and three differently oriented, two-lobed p orbitals",
        },
        {
          value: "eight",
          label:
            "Eight boxes because a full n = 2 level can hold eight electrons",
        },
      ],
    },
    {
      id: "chapter-review-energies",
      topicId: "chapter-11-review",
      concept: "Interactions and sublevel energies",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Contrast hydrogen with multi-electron sublevel energies; explain the role of shielding and penetration.",
      prompt:
        "Which explanation connects multi-electron interactions to ground-state filling?",
      answer: "split",
      explanation:
        "In the introductory multi-electron model, sublevels such as 2s and 2p differ in energy. Equal-energy p orientations are not a ladder labeled x, y, z.",
      hints: [
        {
          text: "The hydrogen atom has no electron–electron repulsion.",
        },
        {
          text: "Level number alone is not a universal energy-ordering rule.",
        },
      ],
      misconceptionFeedback: {
        same: "Equal n does not imply equal sublevel energies in multi-electron atoms.",
        labels:
          "The p orientation labels are spatial axes, not energy ranks in the no-field model.",
      },
      workedSolution: [
        "The hydrogen atom has no electron–electron repulsion.",
        "Level number alone is not a universal energy-ordering rule.",
        "In the introductory multi-electron model, sublevels such as 2s and 2p differ in energy. Equal-energy p orientations are not a ladder labeled x, y, z.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "same",
          label:
            "All orbitals with the same n must have equal energy in every atom",
        },
        {
          value: "split",
          label:
            "Electron repulsion and differing penetration/shielding affect sublevel energies, so use lower-energy available sublevels",
        },
        {
          value: "labels",
          label:
            "The x, y, and z labels rank p orbitals from low to high energy",
        },
      ],
    },
    {
      id: "chapter-review-rules",
      topicId: "chapter-11-review",
      concept: "Capacity, Pauli, and Hund together",
      reviewTo: "/lessons/further-development",
      reviewRecommendation:
        "Derive six-electron p capacity from three orbitals; check opposite-spin pairing separately from distribution among equal-energy boxes.",
      prompt:
        "A ground-state p2 sublevel is drawn [↑↓] [ ] [ ]. Which diagnosis is best?",
      answer: "hund",
      explanation:
        "Three p orbitals give six-electron maximum capacity. Opposite spins may share a box, but the ground-state p2 pattern uses separate equal-energy orbitals with parallel spins.",
      hints: [
        {
          text: "Count the electrons and the maximum capacity first.",
        },
        {
          text: "A valid pair under Pauli is not necessarily the ground-state distribution under Hund.",
        },
      ],
      misconceptionFeedback: {
        capacity: "Two electrons do not exceed p’s six-electron capacity.",
        pauli:
          "Pauli permits an opposite-spin pair; the ground-state distribution among boxes is the issue.",
      },
      workedSolution: [
        "Count the electrons and the maximum capacity first.",
        "A valid pair under Pauli is not necessarily the ground-state distribution under Hund.",
        "Three p orbitals give six-electron maximum capacity. Opposite spins may share a box, but the ground-state p2 pattern uses separate equal-energy orbitals with parallel spins.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "capacity",
          label: "It exceeds p capacity",
        },
        {
          value: "hund",
          label:
            "Two electrons are below p capacity and the pair obeys Pauli, but Hund favors [↑] [↑] [ ]",
        },
        {
          value: "pauli",
          label: "Opposite spins in one box violate Pauli",
        },
      ],
    },
    {
      id: "chapter-review-configuration",
      topicId: "chapter-11-review",
      concept: "From atomic number to configuration",
      reviewTo: "/lessons/first-18",
      reviewRecommendation:
        "Count neutral electrons, use H–Ar filling order and capacities, and verify the exponent total.",
      prompt:
        "Neutral magnesium has atomic number 12. Which configuration follows the ground-state filling rules?",
      answer: "correct",
      explanation:
        "Atomic number 12 gives twelve electrons in neutral magnesium. Fill 1s, 2s, 2p, then 3s: 2 + 2 + 6 + 2 = 12.",
      hints: [
        {
          text: "Neutral electron count equals proton count.",
        },
        {
          text: "Check capacities and energy order as well as the total.",
        },
      ],
      misconceptionFeedback: {
        overfill:
          "The total is twelve, but a p sublevel holds at most six electrons.",
        skip: "The total is twelve, but the ground state uses lower-energy 3s before 3p.",
      },
      workedSolution: [
        "Neutral electron count equals proton count.",
        "Check capacities and energy order as well as the total.",
        "Atomic number 12 gives twelve electrons in neutral magnesium. Fill 1s, 2s, 2p, then 3s: 2 + 2 + 6 + 2 = 12.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "correct",
          label: "1s2 2s2 2p6 3s2",
        },
        {
          value: "overfill",
          label: "1s2 2s2 2p8",
        },
        {
          value: "skip",
          label: "1s2 2s2 2p6 3p2",
        },
      ],
    },
    {
      id: "chapter-review-location",
      topicId: "chapter-11-review",
      concept: "Configuration to periodic-table location",
      reviewTo: "/lessons/periodic-table",
      reviewRecommendation:
        "Find the highest occupied level and count outer-level electrons, then map main-group valence count to group.",
      prompt:
        "A neutral atom has 1s2 2s2 2p6 3s2 3p4. Where is it in the main-group periodic table?",
      answer: "group16",
      explanation:
        "The highest occupied level is 3, so period 3. Its six valence electrons (3s2 + 3p4) place this H–Ar main-group atom in group 16.",
      hints: [
        {
          text: "The highest occupied principal level gives the period.",
        },
        {
          text: "Count all electrons in level 3, not just the p exponent.",
        },
      ],
      misconceptionFeedback: {
        group4:
          "Four is only the p occupancy. Include two 3s electrons, then use main-group numbering: six valence electrons corresponds to group 16.",
        period6:
          "Six counts valence electrons, not occupied levels. Period comes from the highest occupied n.",
      },
      workedSolution: [
        "The highest occupied principal level gives the period.",
        "Count all electrons in level 3, not just the p exponent.",
        "The highest occupied level is 3, so period 3. Its six valence electrons (3s2 + 3p4) place this H–Ar main-group atom in group 16.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "group4",
          label: "Period 3, group 4",
        },
        {
          value: "group16",
          label: "Period 3, group 16",
        },
        {
          value: "period6",
          label: "Period 6, group 3",
        },
      ],
    },
    {
      id: "chapter-review-properties",
      topicId: "chapter-11-review",
      concept: "Configuration explains a trend exception",
      reviewTo: "/lessons/atomic-trends",
      reviewRecommendation:
        "Compare magnesium’s 3s electron with aluminum’s 3p electron instead of applying a trend arrow without considering sublevels.",
      prompt:
        "Aluminum follows magnesium across period 3, yet its first ionization energy is slightly lower. Which reasoning explains this?",
      answer: "sublevel",
      explanation:
        "The broad increase across a period has exceptions. Aluminum’s outer 3p electron is easier to remove than magnesium’s 3s electron because their sublevels differ.",
      hints: [
        {
          text: "A trend is a general pattern, not an unbreakable rule.",
        },
        {
          text: "Compare the outer-electron sublevels: magnesium 3s2 versus aluminum 3s2 3p1.",
        },
      ],
      misconceptionFeedback: {
        always:
          "Broad periodic trends have sublevel and pairing exceptions. Explain this case using the configuration.",
        level:
          "Both occupy level 3 as their highest level. The relevant change is 3s to 3p, not a new principal level.",
      },
      workedSolution: [
        "A trend is a general pattern, not an unbreakable rule.",
        "Compare the outer-electron sublevels: magnesium 3s2 versus aluminum 3s2 3p1.",
        "The broad increase across a period has exceptions. Aluminum’s outer 3p electron is easier to remove than magnesium’s 3s electron because their sublevels differ.",
      ],
      difficulty: "standard",
      choices: [
        {
          value: "always",
          label: "It cannot happen; ionization energy must rise at every step",
        },
        {
          value: "sublevel",
          label:
            "Aluminum’s removed electron is in a higher-energy 3p sublevel, unlike magnesium’s 3s electron",
        },
        {
          value: "level",
          label: "Aluminum adds an occupied fourth principal level",
        },
      ],
    },
  ],
};
