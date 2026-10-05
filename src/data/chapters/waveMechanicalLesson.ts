import type { Lesson } from "../../types/curriculum";
export const waveMechanicalLesson: Lesson = {
  id: "wave-mechanical",
  topicId: "11.2-2",
  title: "The Wave Mechanical Model: probability, not paths",
  subtitle: "Section 11.2 · Orbitals and probability clouds · About 10 minutes",
  summary:
    "An orbital is a wave function for a state, not a travel path. Probability clouds represent likely position outcomes, not many electrons in one atom. Drawing boundaries are not walls, and quantized bound energies remain part of the modern model.",
  completionActions: [
    {
      label: "Compare with the Bohr picture →",
      to: "/lessons/bohr-model",
    },
  ],
  steps: [
    {
      id: "concept",
      kind: "explanation",
      title: "Predict outcomes, not a circular route",
      text: "Electrons have wave-like properties. The wave mechanical model describes an electron state with a wave function called an orbital. Its squared magnitude gives a probability density: how likely position measurements are in equal small volumes. An orbital is not a fixed path. Allowed bound energies remain quantized, but Bohr’s circular-orbit picture is replaced by a probability description.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "An orbital tells us where an electron may be found and how likely different outcomes are. It does not draw a route the electron follows.",
        },
        {
          label: "Visual explanation",
          text: "A denser part of a probability drawing means more likely detection in equal small regions. Many outcomes show a pattern; one outcome does not show a track.",
        },
        {
          label: "Concrete analogy",
          text: "A forecast map shows where rain is more likely, not the route of one raindrop. This helps distinguish probability from a path; an electron is not a raindrop.",
        },
        {
          label: "Worked example",
          text: "Prepare many hydrogen atoms in the same 1s state and make one position measurement per atom. Their outcomes build a cloud-like pattern without describing one electron’s journey.",
        },
      ],
      continueLabel: "Build a probability picture →",
    },
    {
      id: "cloud",
      kind: "probability-explorer",
      title: "One outcome, then a pattern",
      text: "Compare one outcome with many independent outcomes. Move the dashed drawing guide and notice that the cloud does not change. This activity illustrates one spherical hydrogen 1s distribution, not all orbitals.",
      continueLabel: "Work through a cloud interpretation →",
    },
    {
      id: "example",
      kind: "example",
      title: "What a darker region can tell you",
      steps: [
        "Compare two equally small volumes within the same orbital: the probability density is greater in one than the other.",
        "Across many identical preparations, a position measurement is more likely to fall in the higher-density volume. It is a prediction about outcomes, not certainty for the next measurement.",
        "A collection of measured or synthetic points represents many outcomes. A hydrogen atom has one electron; the point count does not count electrons inside that atom.",
        "A drawn probability boundary is not a wall. The hydrogen 1s distribution extends beyond any finite drawing guide. Different orbital states have different distributions.",
      ],
      continueLabel: "Try the probability checks →",
    },
    {
      id: "check-meaning",
      kind: "practice",
      title: "What an orbital describes",
      question: {
        id: "wave-model-meaning",
        topicId: "11.2-2",
        prompt:
          "Which best describes an atomic orbital in the wave mechanical model?",
        choices: [
          {
            value: "0",
            label: "A fixed circular track.",
          },
          {
            value: "1",
            label:
              "A mathematical state whose wave function gives a probability distribution.",
          },
          {
            value: "2",
            label: "A hard container for electrons.",
          },
        ],
        answer: "1",
        explanation:
          "An orbital is a wave function for an electron state; its squared magnitude gives probability density. Cloud drawings represent that distribution.",
        hints: [
          {
            text: "Separate a path from a probability description.",
          },
          {
            text: "An orbital helps predict where an electron may be detected, not a route it follows.",
          },
        ],
        misconceptionFeedback: {
          "0": "A fixed circular orbit belongs to Bohr’s historical picture, not the modern orbital description.",
          "2": "A drawn boundary is a guide for representing probability, not a physical wall.",
        },
        workedSolution: [
          "Separate a path from a probability description.",
          "An orbital helps predict where an electron may be detected, not a route it follows.",
          "An orbital is a wave function for an electron state; its squared magnitude gives probability density. Cloud drawings represent that distribution.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-dots",
      kind: "practice",
      title: "Read many dots correctly",
      question: {
        id: "wave-model-dots",
        topicId: "11.2-2",
        prompt:
          "Our drawing shows 240 outcomes from separately prepared hydrogen atoms. What do the dots mean?",
        choices: [
          {
            value: "0",
            label: "One atom contains 240 electrons.",
          },
          {
            value: "1",
            label: "One electron followed the dots in order.",
          },
          {
            value: "2",
            label:
              "Each dot is one independent position outcome; together they illustrate probabilities.",
          },
        ],
        answer: "2",
        explanation:
          "Many independent position outcomes build a spatial probability pattern. They do not show simultaneous electrons in one atom or a travel route.",
        hints: [
          {
            text: "Read the caption: separately prepared atoms, same state.",
          },
          {
            text: "A collection of outcomes reveals a distribution, not a time sequence.",
          },
        ],
        misconceptionFeedback: {
          "0": "Neutral hydrogen has one electron. The drawing combines outcomes from many independently prepared atoms.",
          "1": "These are independent outcomes, not successive points on one trajectory. Connecting them would invent a path.",
        },
        workedSolution: [
          "Read the caption: separately prepared atoms, same state.",
          "A collection of outcomes reveals a distribution, not a time sequence.",
          "Many independent position outcomes build a spatial probability pattern. They do not show simultaneous electrons in one atom or a travel route.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-boundary",
      kind: "practice",
      title: "A drawing is not a wall",
      question: {
        id: "wave-model-boundary",
        topicId: "11.2-2",
        prompt: "Moving the dashed guide outward changes what?",
        choices: [
          {
            value: "0",
            label:
              "The guide in the drawing, while the electron state and probabilities stay the same.",
          },
          {
            value: "1",
            label: "The electron becomes trapped inside a larger wall.",
          },
          {
            value: "2",
            label: "All probabilities outside the guide become zero.",
          },
        ],
        answer: "0",
        explanation:
          "The guide is a representation choice. It does not alter the state or create a physical boundary.",
        hints: [
          {
            text: "Ask whether you changed the atom or only its illustration.",
          },
          {
            text: "Probability-region boundaries are representation choices, not barriers.",
          },
        ],
        misconceptionFeedback: {
          "1": "There is no hard orbital wall. Changing a drawing does not change the atom.",
          "2": "An arbitrary drawing boundary does not force probability to vanish outside it.",
        },
        workedSolution: [
          "Ask whether you changed the atom or only its illustration.",
          "Probability-region boundaries are representation choices, not barriers.",
          "The guide is a representation choice. It does not alter the state or create a physical boundary.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-models",
      kind: "checkpoint",
      title: "What changes from Bohr to the modern model?",
      question: {
        id: "wave-model-models",
        topicId: "11.2-2",
        prompt: "Which statement correctly compares the two models?",
        choices: [
          {
            value: "0",
            label: "The modern model removes all allowed energies.",
          },
          {
            value: "1",
            label:
              "The modern model retains quantized states but replaces fixed circular paths with orbital probability descriptions.",
          },
          {
            value: "2",
            label:
              "Both give an exact electron path if the diagram is detailed enough.",
          },
        ],
        answer: "1",
        explanation:
          "The modern model describes allowed states with wave functions and probability distributions, while retaining quantized bound energies.",
        hints: [
          {
            text: "Keep the idea of allowed energy states separate from the idea of a path.",
          },
          {
            text: "The modern model changes how electron behavior is described, not the existence of quantized states.",
          },
        ],
        misconceptionFeedback: {
          "0": "Quantized energy states remain in quantum mechanics. The fixed path picture is what changes.",
          "2": "A more detailed drawing does not supply an exact electron trajectory. Probability descriptions are not incomplete circle maps.",
        },
        workedSolution: [
          "Keep the idea of allowed energy states separate from the idea of a path.",
          "The modern model changes how electron behavior is described, not the existence of quantized states.",
          "The modern model describes allowed states with wave functions and probability distributions, while retaining quantized bound energies.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
