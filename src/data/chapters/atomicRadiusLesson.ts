import type { Lesson } from "../../types/curriculum";
export const atomicRadiusLesson: Lesson = {
  id: "atomic-radius-foundations",
  topicId: "atomic-radius-foundations",
  sectionNumber: "11.4",
  title: "Atomic radius: explain the size, not just the arrow",
  subtitle: "Current focus · Section 11.4 · About 12 minutes",
  summary:
    "Atomic size is a defined measure, not a hard cloud edge. Compare occupied levels first, then core shielding and nuclear attraction. Radius generally decreases across a period and increases down a group; new occupied levels explain resets between periods.",
  completionActions: [
    {
      label: "Build your radius graph →",
      to: "/lessons/atomic-radius-graphing",
    },
    {
      label: "Back to the atomic-radius path →",
      to: "/learn/atomic-radius",
    },
  ],
  steps: [
    {
      id: "meaning",
      kind: "explanation",
      title: "How big is an atom?",
      text: "Atomic radius is a measure used to describe atomic size. The electron cloud has no hard edge, so scientists define radius in several ways, such as using the distance between bonded atoms. Use a consistent definition when comparing numbers. In this path we compare neutral atoms and explain general size patterns, not ions.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "Radius tells us about an atom’s size. It does not mark a wall that stops electrons.",
        },
        {
          label: "Visual explanation",
          text: "A larger cloud drawing represents greater size on average. Its outline is a drawing choice, not a sharp edge.",
        },
        {
          label: "Concrete analogy",
          text: "A city’s size depends on whether you measure its center or its wider metropolitan area. Likewise, the definition matters when comparing atom sizes. An atom is not a city.",
        },
        {
          label: "Worked example",
          text: "Two radius tables can give different values for the same element if they use different definitions. Choose one consistent dataset for a graph.",
        },
      ],
      continueLabel: "Compare two atoms visually →",
    },
    {
      id: "visual",
      kind: "visual",
      title: "Across a period: same outer level, stronger pull",
      text: "Sodium and chlorine both have outer electrons in level 3 and ten core electrons. Chlorine has more protons. Outer-level electrons do not screen the additional nuclear charge as effectively as core electrons, so the net pull generally increases and the cloud contracts.",
      visual: {
        kind: "trend-comparison",
        comparisonId: "size-across",
      },
      note: "These cloud sizes are qualitative, not measured radii. Shielding reduces nuclear attraction; it does not cancel it.",
      continueLabel: "Work through a down-group comparison →",
    },
    {
      id: "example",
      kind: "example",
      title: "Lithium versus sodium, one decision at a time",
      steps: [
        "Read the configurations: lithium 1s2 2s1; sodium 1s2 2s2 2p6 3s1. Both have one valence electron.",
        "Lithium’s outer electron is in level 2; sodium’s is in level 3. Sodium occupies another principal level.",
        "Lithium has two core electrons; sodium has ten. The extra occupied level and shielding make sodium larger on average, even though its nucleus is more positively charged.",
        "Use this decision order: highest occupied level → core shielding → nuclear attraction. Avoid using proton count alone.",
      ],
      visual: {
        kind: "trend-comparison",
        comparisonId: "size-down",
      },
      continueLabel: "Try the size comparisons →",
    },
    {
      id: "radius-foundation-meaning",
      kind: "practice",
      title: "Interpret radius",
      question: {
        id: "radius-foundation-meaning",
        topicId: "atomic-radius-foundations",
        prompt: "Atomic radius describes what?",
        choices: [
          {
            value: "radius",
            label:
              "A defined measure of atomic size, not a hard electron-cloud wall",
          },
          {
            value: "edge",
            label: "An exact surface where electrons must stop",
          },
          {
            value: "nucleus",
            label: "Only the size of the nucleus",
          },
        ],
        answer: "radius",
        explanation:
          "Electron probability extends beyond drawn outlines. Radius values depend on how atomic size is defined; compare values using the same definition.",
        misconceptionFeedback: {
          edge: "An electron cloud has no sharp stopping surface. A drawing boundary is not a physical wall.",
          nucleus:
            "Atomic radius describes the whole atom’s size, not just its tiny nucleus.",
        },
        hints: [
          {
            text: "Separate an atom from its nucleus.",
          },
          {
            text: "Remember that cloud boundaries in drawings are guides, not walls.",
          },
        ],
        workedSolution: [
          "Separate an atom from its nucleus.",
          "Remember that cloud boundaries in drawings are guides, not walls.",
          "Electron probability extends beyond drawn outlines. Radius values depend on how atomic size is defined; compare values using the same definition.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "radius-foundation-across",
      kind: "practice",
      title: "Explain a same-period comparison",
      question: {
        id: "radius-foundation-across",
        topicId: "atomic-radius-foundations",
        prompt:
          "Magnesium and sulfur both occupy level 3. Why is sulfur generally smaller?",
        choices: [
          {
            value: "pull",
            label:
              "More nuclear charge increases net attraction within the same outer level",
          },
          {
            value: "new",
            label: "Sulfur adds another occupied principal level",
          },
          {
            value: "cancel",
            label: "Core electrons completely cancel the nucleus",
          },
        ],
        answer: "pull",
        explanation:
          "Both have ten core electrons and outer electrons in level 3. Added outer electrons do not shield added nuclear charge as effectively as core electrons, so the net inward attraction generally grows.",
        misconceptionFeedback: {
          new: "Both use level 3. Moving along this period does not add another occupied principal level.",
          cancel:
            "Shielding reduces attraction; it does not eliminate it. The core count stays ten for this comparison.",
        },
        hints: [
          {
            text: "Compare the highest occupied level first.",
          },
          {
            text: "Compare nuclear charge while the core remains the same.",
          },
        ],
        workedSolution: [
          "Compare the highest occupied level first.",
          "Compare nuclear charge while the core remains the same.",
          "Both have ten core electrons and outer electrons in level 3. Added outer electrons do not shield added nuclear charge as effectively as core electrons, so the net inward attraction generally grows.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "radius-foundation-down",
      kind: "practice",
      title: "Explain a same-group comparison",
      question: {
        id: "radius-foundation-down",
        topicId: "atomic-radius-foundations",
        prompt:
          "Why is sodium generally larger than lithium despite having more protons?",
        choices: [
          {
            value: "protons",
            label: "More protons push electrons outward",
          },
          {
            value: "levels",
            label:
              "Its outer electron is in level 3 instead of 2, with more core-electron shielding",
          },
          {
            value: "same",
            label: "Both outer electrons are in level 2",
          },
        ],
        answer: "levels",
        explanation:
          "Down this group, an additional occupied level and more shielding place the outer electron farther out on average. Protons attract electrons; they do not push them away.",
        misconceptionFeedback: {
          protons:
            "Protons attract electrons inward. The additional level and shielding explain this increase in size.",
          same: "Lithium ends in 2s1; sodium ends in 3s1. Their highest occupied levels differ.",
        },
        hints: [
          {
            text: "Read 2s1 and 3s1 before comparing proton counts.",
          },
          {
            text: "An additional occupied level changes distance and shielding.",
          },
        ],
        workedSolution: [
          "Read 2s1 and 3s1 before comparing proton counts.",
          "An additional occupied level changes distance and shielding.",
          "Down this group, an additional occupied level and more shielding place the outer electron farther out on average. Protons attract electrons; they do not push them away.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "radius-foundation-reset",
      kind: "checkpoint",
      title: "Connect to a graph’s repeating pattern",
      question: {
        id: "radius-foundation-reset",
        topicId: "atomic-radius-foundations",
        prompt:
          "Why does the general radius pattern jump upward from neon to sodium?",
        choices: [
          {
            value: "more",
            label: "Atomic radius always increases with atomic number",
          },
          {
            value: "newlevel",
            label:
              "Sodium starts an occupied third level, outside neon’s filled second level",
          },
          {
            value: "loss",
            label: "Sodium loses its nucleus",
          },
        ],
        answer: "newlevel",
        explanation:
          "Neon’s highest occupied level is 2; sodium adds a 3s electron. The new level explains the upward reset at the start of period 3, not an always-increasing size rule.",
        misconceptionFeedback: {
          more: "Within a period, radius generally decreases as atomic number rises. A new occupied level explains this particular jump.",
          loss: "Sodium retains its nucleus. A neutral atom’s new outer occupied level is the relevant change.",
        },
        hints: [
          {
            text: "Find the last occupied level in each configuration.",
          },
          {
            text: "A period boundary adds an occupied principal level.",
          },
        ],
        workedSolution: [
          "Find the last occupied level in each configuration.",
          "A period boundary adds an occupied principal level.",
          "Neon’s highest occupied level is 2; sodium adds a 3s electron. The new level explains the upward reset at the start of period 3, not an always-increasing size rule.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
