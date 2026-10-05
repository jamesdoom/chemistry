import type { Lesson } from "../../types/curriculum";
export const bohrLesson: Lesson = {
  id: "bohr-model",
  topicId: "11.2-1",
  title: "The Bohr Model: useful picture, clear limits",
  subtitle:
    "Section 11.2 · A historical model and its limits · About 10 minutes",
  summary:
    "Bohr’s quantized one-electron model explains hydrogen’s approximate energies and line spectrum. Its circular orbits are model assumptions, not modern orbitals or measured paths. Multi-electron interactions require a more complete treatment.",
  completionActions: [
    {
      label: "Continue to the Wave Mechanical Model →",
      to: "/lessons/wave-mechanical",
    },
    {
      label: "Review hydrogen’s energy levels →",
      to: "/lessons/hydrogen-levels",
    },
  ],
  steps: [
    {
      id: "concept",
      kind: "explanation",
      title: "A useful model with deliberate assumptions",
      text: "Bohr combined a small positive nucleus with quantized electron energies. His historical picture places the electron on allowed circular orbits labeled by n. He assumed that an electron in an allowed orbit does not continuously radiate energy. Light is absorbed or emitted during changes between states. These assumptions explain hydrogen’s approximate energy levels and line spectrum, but the circles are not a modern description of electron motion.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Bohr’s model assigns particular energies and uses circles to picture them. It explains some important evidence, but a useful picture is not proof of a real path.",
        },
        {
          label: "Visual explanation",
          text: "Selecting a larger circle changes the n label in this model. The corresponding energy becomes less negative. The drawing’s radius is a different quantity from the energy height in a level diagram.",
        },
        {
          label: "Concrete analogy",
          text: "A transit map can help you plan a trip while simplifying the real city. Likewise, Bohr’s circles organize a model without giving a complete picture of real electron behavior.",
        },
        {
          label: "Worked example",
          text: "An allowed transition from n = 3 to 2 can emit a specific photon. That supports quantized energy differences; it does not show a detector photographing an electron’s circular path.",
        },
      ],
      continueLabel: "Explore the historical picture →",
    },
    {
      id: "bohr-explorer",
      kind: "bohr-explorer",
      title: "Compare the picture with the energy states",
      text: "Select n = 1, 2, and 3. The circles follow the model’s radius ratios, while the readout reports energy. Keep the two quantities separate. Nothing here is an observed electron trajectory.",
      continueLabel: "Work through the model’s limits →",
    },
    {
      id: "example",
      kind: "example",
      title: "What the model explains—and leaves out",
      steps: [
        "Observation: excited hydrogen produces light at distinct wavelengths rather than every wavelength.",
        "Model explanation: only certain energy states are allowed; their gaps give specific photon energies and wavelengths.",
        "Scope: the simple one-electron model works for hydrogen and hydrogen-like one-electron ions. Neutral helium has two electrons and introduces electron–electron interactions.",
        "Limit: Bohr’s fixed circular paths do not provide the modern probability description. The later wave mechanical model keeps quantized states while replacing those paths with orbitals.",
      ],
      continueLabel: "Try the model checks →",
    },
    {
      id: "check-bohr-allowed",
      kind: "practice",
      title: "Read a quantum number",
      question: {
        id: "bohr-allowed",
        topicId: "11.2-1",
        prompt:
          "In the simple Bohr hydrogen model, which proposed bound level is allowed?",
        choices: [
          {
            value: "0",
            label: "n = 2.5.",
          },
          {
            value: "1",
            label: "n = 0.",
          },
          {
            value: "2",
            label: "n = 3.",
          },
        ],
        answer: "2",
        explanation:
          "n = 3 is a positive integer and labels an allowed excited bound level.",
        hints: [
          {
            text: "Quantized levels use a restricted set of labels.",
          },
          {
            text: "Allowed n values start at 1 and increase by whole numbers.",
          },
        ],
        misconceptionFeedback: {
          "0": "Allowed n values are positive integers. A halfway label does not represent an allowed bound state.",
          "1": "The first allowed hydrogen level is n = 1; n = 0 is not permitted.",
        },
        workedSolution: [
          "Quantized levels use a restricted set of labels.",
          "Allowed n values start at 1 and increase by whole numbers.",
          "n = 3 is a positive integer and labels an allowed excited bound level.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-bohr-spectrum",
      kind: "practice",
      title: "Explain the model’s success",
      question: {
        id: "bohr-spectrum",
        topicId: "11.2-1",
        prompt:
          "How does Bohr’s model account for hydrogen’s distinct spectral lines?",
        choices: [
          {
            value: "0",
            label:
              "Transitions between allowed states give specific photon energies.",
          },
          {
            value: "1",
            label: "An electron emits every photon energy while circling.",
          },
          {
            value: "2",
            label:
              "Each circle is directly photographed as a bright spectral line.",
          },
        ],
        answer: "0",
        explanation:
          "Specific differences between allowed energies give specific photon frequencies and wavelengths.",
        hints: [
          {
            text: "Connect the allowed levels to the gap between two states.",
          },
          {
            text: "Use E = hν to link a gap to a particular photon frequency.",
          },
        ],
        misconceptionFeedback: {
          "1": "Bohr assumed no continuous radiation within an allowed orbit. Photons accompany state changes, with particular gaps.",
          "2": "A spectral line is detected light, not an image of an orbit.",
        },
        workedSolution: [
          "Connect the allowed levels to the gap between two states.",
          "Use E = hν to link a gap to a particular photon frequency.",
          "Specific differences between allowed energies give specific photon frequencies and wavelengths.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-bohr-many",
      kind: "practice",
      title: "Know when the simple model is limited",
      question: {
        id: "bohr-many",
        topicId: "11.2-1",
        prompt: "Which is a major limitation of the simple Bohr model?",
        choices: [
          {
            value: "0",
            label: "It cannot describe hydrogen at all.",
          },
          {
            value: "1",
            label:
              "It does not account for electron–electron interactions in multi-electron atoms.",
          },
          {
            value: "2",
            label: "It proves all atoms have the same energy levels.",
          },
        ],
        answer: "1",
        explanation:
          "The simple one-electron treatment works for hydrogen and hydrogen-like one-electron ions, but misses electron–electron interactions in multi-electron atoms.",
        hints: [
          {
            text: "Hydrogen has one electron; neutral helium has two.",
          },
          {
            text: "Ask what new interactions appear when there is more than one electron.",
          },
        ],
        misconceptionFeedback: {
          "0": "Its important success was explaining hydrogen’s approximate energy levels and line spectrum.",
          "2": "Different atoms have different energy structures. Hydrogen’s formula is not a universal formula for neutral atoms.",
        },
        workedSolution: [
          "Hydrogen has one electron; neutral helium has two.",
          "Ask what new interactions appear when there is more than one electron.",
          "The simple one-electron treatment works for hydrogen and hydrogen-like one-electron ions, but misses electron–electron interactions in multi-electron atoms.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-bohr-modern",
      kind: "checkpoint",
      title: "Model picture versus modern description",
      question: {
        id: "bohr-modern",
        topicId: "11.2-1",
        prompt:
          "How should you interpret the circular paths in a Bohr diagram today?",
        choices: [
          {
            value: "0",
            label: "They are measured tracks followed by every electron.",
          },
          {
            value: "1",
            label: "They are the same as modern orbitals.",
          },
          {
            value: "2",
            label:
              "They are historical model assumptions; modern orbitals describe probability.",
          },
        ],
        answer: "2",
        explanation:
          "The circles helped an early model explain hydrogen energies. Modern quantum mechanics uses orbitals and does not treat them as fixed circular paths.",
        hints: [
          {
            text: "Separate a useful historical picture from an observation.",
          },
          {
            text: "Orbit and orbital describe different ideas.",
          },
        ],
        misconceptionFeedback: {
          "0": "A diagram does not establish a measured electron trajectory. The modern model does not assign fixed circular paths.",
          "1": "An orbital is a probability description, not a Bohr circular orbit.",
        },
        workedSolution: [
          "Separate a useful historical picture from an observation.",
          "Orbit and orbital describe different ideas.",
          "The circles helped an early model explain hydrogen energies. Modern quantum mechanics uses orbitals and does not treat them as fixed circular paths.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
