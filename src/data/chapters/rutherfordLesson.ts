import type { Lesson } from "../../types/curriculum";
export const rutherfordLesson: Lesson = {
  id: "rutherford",
  topicId: "11.1-0",
  title: "Rutherford’s Atom: follow the evidence",
  subtitle:
    "Section 11.1 · Nuclear structure from scattering · About 12 minutes",
  summary:
    "Mostly straight paths point to mostly empty space. Rare large deflections point to a small, massive, positive nucleus. Observations support a model; they do not reveal everything about an atom.",
  completionActions: [
    { label: "Continue to Energy and Light →", to: "/lessons/energy-light" },
    {
      label: "Connect to electron arrangements →",
      to: "/lessons/first-18",
    },
  ],
  steps: [
    {
      id: "concept",
      kind: "explanation",
      title: "Look inside an atom without seeing it",
      text: "Rutherford’s team, including Geiger and Marsden, directed fast, positively charged alpha particles at very thin gold foil. Detectors showed where the particles went. Most passed through almost straight; some turned aside; very few came back. The pattern challenged the idea of positive charge spread throughout an atom.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Send tiny positive probes through a thin material. Where they emerge gives clues about what is inside each atom.",
        },
        {
          label: "Visual explanation",
          text: "Picture many nearly straight paths, a few bent paths, and a rare returning path. One small positive center can explain all three.",
        },
        {
          label: "Concrete analogy",
          text: "Imagine rolling balls across a large space containing a few small obstacles. Most miss them. This helps picture rarity, but an atom bends alpha paths through electrical forces, not solid obstacles.",
        },
        {
          label: "Worked example",
          text: "A detector records a returning alpha particle. That is the observation. A small, massive, positive center causing strong repulsion is the inferred explanation.",
        },
      ],
      continueLabel: "Explore the scattering paths →",
    },
    {
      id: "scattering",
      kind: "scattering-explorer",
      title: "Follow the evidence",
      text: "Choose each approach, reveal its path, and connect the detector observation to an atomic model. The three cases are selected examples, not equally likely outcomes.",
      continueLabel: "Work through the inference →",
    },
    {
      id: "example",
      kind: "example",
      title: "From a surprising path to a new model",
      steps: [
        "Observation: a small number of fast alpha particles turned through very large angles, sometimes back toward the source.",
        "Reasoning: a light electron or weakly spread positive charge cannot explain such a strong reversal of a fast, massive alpha particle.",
        "Inference: positive charge and much of the atom’s mass are concentrated in a tiny nucleus. Most of the atom’s volume lies outside it.",
        "Limit: this is evidence about nuclear structure. It does not reveal electron paths, identify neutrons, or explain allowed electron energies.",
      ],
      continueLabel: "Try the evidence questions →",
    },
    {
      id: "check-space",
      kind: "practice",
      title: "What does the most common observation tell us?",
      question: {
        id: "rutherford-space",
        topicId: "11.1-0",
        prompt:
          "Most fast alpha particles crossed the thin foil with little deflection. Which inference fits?",
        choices: [
          {
            value: "0",
            label:
              "Atoms are mostly empty space relative to their small nuclei.",
          },
          {
            value: "1",
            label: "Atoms have no electrons.",
          },
          {
            value: "2",
            label: "Positive charge fills the whole atom densely.",
          },
        ],
        answer: "0",
        explanation:
          "A small nucleus occupies only a tiny fraction of the atom’s volume; most paths do not pass close enough for strong scattering.",
        hints: [
          {
            text: "Separate the detector’s observations from your model of the atom.",
          },
          {
            text: "Use the small, massive, positive nucleus to explain scattering; electron energies need a later model.",
          },
        ],
        misconceptionFeedback: {
          "1": "Weak scattering does not mean electrons are absent. Electrons are light and do not explain the large-angle scattering.",
          "2": "A dense spread of positive charge does not explain the combination of mostly straight paths and rare large deflections.",
        },
        workedSolution: [
          "Separate the detector’s observations from your model of the atom.",
          "Use the small, massive, positive nucleus to explain scattering; electron energies need a later model.",
          "A small nucleus occupies only a tiny fraction of the atom’s volume; most paths do not pass close enough for strong scattering.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-repulsion",
      kind: "practice",
      title: "Explain the change in direction",
      question: {
        id: "rutherford-repulsion",
        topicId: "11.1-0",
        prompt:
          "A positive alpha particle approaches a positive nucleus closely. Why can it turn away?",
        choices: [
          {
            value: "0",
            label: "It is attracted to the nucleus.",
          },
          {
            value: "1",
            label: "Like electric charges repel.",
          },
          {
            value: "2",
            label: "It must strike an electron.",
          },
        ],
        answer: "1",
        explanation:
          "Two positive charges repel. A close approach produces stronger deflection without requiring physical contact.",
        hints: [
          {
            text: "Identify the sign of each charge.",
          },
          {
            text: "Like charges repel; opposite charges attract.",
          },
        ],
        misconceptionFeedback: {
          "0": "Opposite charges attract. The alpha particle and nucleus both carry positive charge.",
          "2": "A light electron cannot explain the strong backward scattering from a heavy atom.",
        },
        workedSolution: [
          "Identify the sign of each charge.",
          "Like charges repel; opposite charges attract.",
          "Two positive charges repel. A close approach produces stronger deflection without requiring physical contact.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-small",
      kind: "practice",
      title: "Connect rarity to structure",
      question: {
        id: "rutherford-small",
        topicId: "11.1-0",
        prompt:
          "Why does rare backward scattering point to a small nucleus rather than a large dense interior?",
        choices: [
          {
            value: "0",
            label:
              "Only a small fraction of paths approach the concentrated center closely enough.",
          },
          {
            value: "1",
            label:
              "Every particle strikes a nucleus but most keep going unchanged.",
          },
          {
            value: "2",
            label: "The atom is a hard hollow ball with a thick wall.",
          },
        ],
        answer: "0",
        explanation:
          "The strong-scattering region must be small compared with the whole atom, so most paths miss close approaches.",
        hints: [
          {
            text: "Compare how often particles pass straight through with how often they turn back.",
          },
          {
            text: "A rare close encounter suggests a small target region, not a large interior.",
          },
        ],
        misconceptionFeedback: {
          "1": "If every particle closely encountered a large dense positive region, strong deflections would not be so rare.",
          "2": "A thick hard wall would obstruct many paths. Electrical repulsion, not bouncing from a wall, explains the paths.",
        },
        workedSolution: [
          "Compare how often particles pass straight through with how often they turn back.",
          "A rare close encounter suggests a small target region, not a large interior.",
          "The strong-scattering region must be small compared with the whole atom, so most paths miss close approaches.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-evidence",
      kind: "checkpoint",
      title: "Separate evidence from explanation",
      question: {
        id: "rutherford-evidence",
        topicId: "11.1-0",
        prompt:
          "Which statement is an observation from the scattering experiment?",
        choices: [
          {
            value: "0",
            label: "The atom contains a small positive nucleus.",
          },
          {
            value: "1",
            label: "The nucleus contains neutrons.",
          },
          {
            value: "2",
            label: "A few alpha particles returned toward the source.",
          },
        ],
        answer: "2",
        explanation:
          "The detector recorded particles scattered back. The nuclear structure is the explanation inferred from the pattern.",
        hints: [
          {
            text: "Separate the detector’s observations from your model of the atom.",
          },
          {
            text: "Use the small, massive, positive nucleus to explain scattering; electron energies need a later model.",
          },
        ],
        misconceptionFeedback: {
          "0": "The nucleus is an inferred structure used to explain scattering, not something directly seen in this experiment.",
          "1": "This experiment did not identify neutrons. Do not add later knowledge to the observed evidence.",
        },
        workedSolution: [
          "Separate the detector’s observations from your model of the atom.",
          "Use the small, massive, positive nucleus to explain scattering; electron energies need a later model.",
          "The detector recorded particles scattered back. The nuclear structure is the explanation inferred from the pattern.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "check-limits",
      kind: "checkpoint",
      title: "Know the model’s limits",
      question: {
        id: "rutherford-limits",
        topicId: "11.1-0",
        prompt:
          "Which question is NOT answered by Rutherford’s nuclear model alone?",
        choices: [
          {
            value: "0",
            label: "Why most alpha particles cross the foil.",
          },
          {
            value: "1",
            label:
              "Why atoms have specific emission lines and stable electron arrangements.",
          },
          {
            value: "2",
            label:
              "Why some positive alpha particles turn away from the center.",
          },
        ],
        answer: "1",
        explanation:
          "The nuclear model explains scattering but does not itself provide quantized electron energies or explain stable electron arrangements and line spectra.",
        hints: [
          {
            text: "Ask whether the question concerns scattering or electron energies.",
          },
          {
            text: "Rutherford’s nuclear model does not assign allowed electron energy levels.",
          },
        ],
        misconceptionFeedback: {
          "0": "The small nucleus and mostly empty volume explain why most fast particles pass through.",
          "2": "A concentrated positive nucleus explains repulsion and deflection.",
        },
        workedSolution: [
          "Ask whether the question concerns scattering or electron energies.",
          "Rutherford’s nuclear model does not assign allowed electron energy levels.",
          "The nuclear model explains scattering but does not itself provide quantized electron energies or explain stable electron arrangements and line spectra.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
