import type { Lesson } from "../../types/curriculum";
export const atomicRadiusGraphLesson: Lesson = {
  id: "atomic-radius-graphing",
  topicId: "atomic-radius-graphing",
  sectionNumber: "11.4",
  title: "Graph atomic radii: read the pattern and explain it",
  subtitle: "Current focus · Original graphing activity · About 12 minutes",
  summary:
    "A radius graph compares different elements in atomic-number order. Use atomic number on x and radius in pm on y. Decreases within a period reflect increasing net nuclear attraction; upward resets reflect new occupied levels. Use the supplied data definition, not a memorized radius number.",
  completionActions: [
    {
      label: "Back to the atomic-radius path →",
      to: "/learn/atomic-radius",
    },
  ],
  steps: [
    {
      id: "axes",
      kind: "explanation",
      title: "A graph tells a story only when its axes are clear",
      text: "We will plot atomic number horizontally and atomic radius vertically in picometers (pm). One pm is one trillionth of a meter. Every point represents a different element. A line connects the points to reveal a pattern; it does not show an electron moving or one atom growing over time. Our values are an original illustrative dataset, not measurements or school worksheet answers.",
      explanations: [
        {
          label: "Simpler explanation",
          text: "An element’s atomic number tells you where to move sideways; its radius tells you how high to plot the point.",
        },
        {
          label: "Visual explanation",
          text: "A point at (3, 170 pm) sits above atomic number 3 and at height 170 on the radius axis.",
        },
        {
          label: "Concrete analogy",
          text: "A seating chart has row and seat numbers. A graph also needs two coordinates, but here they mean atomic number and radius, not physical seats.",
        },
        {
          label: "Worked example",
          text: "In the teaching table, lithium is Z = 3 with radius 170 pm. Read across the row, move to x = 3, then up to y = 170 pm.",
        },
      ],
      continueLabel: "See a plotted-point example →",
    },
    {
      id: "example",
      kind: "example",
      title: "Read a table row into two coordinates",
      steps: [
        "Find neon in the original teaching table: atomic number 10, illustrative radius 60 pm.",
        "Use 10 for the horizontal coordinate and 60 for the vertical coordinate. Do not swap the axes.",
        "Choose an even vertical scale covering the largest value. Our graph uses a zero baseline and 50 pm intervals.",
        "The point represents neon in this dataset. Its radius is not an exact cloud boundary, and values from a different definition may differ.",
      ],
      continueLabel: "Build the radius graph →",
    },
    {
      id: "plot",
      kind: "radius-graph-explorer",
      title: "Plot, compare, then reveal the pattern",
      text: "Choose axes, plot lithium, neon, and sodium using the data table, then reveal the reference pattern. You may plot any of the first 18 elements. Your checked axes and plotted points save locally.",
      continueLabel: "Interpret your graph →",
    },
    {
      id: "radius-graph-axes",
      kind: "practice",
      title: "Interpret a plotted point",
      question: {
        id: "radius-graph-axes",
        topicId: "atomic-radius-graphing",
        prompt:
          "What does a point at (11, 210 pm) represent in our teaching graph?",
        choices: [
          {
            value: "time",
            label: "One atom becomes 210 pm wide after eleven seconds",
          },
          {
            value: "axes",
            label:
              "The element with atomic number 11 has an illustrative radius of 210 pm",
          },
          {
            value: "electrons",
            label: "An atom with 210 electrons has a radius of 11 pm",
          },
        ],
        answer: "axes",
        explanation:
          "The horizontal coordinate identifies an element by atomic number; the vertical coordinate gives its radius in pm. This graph compares elements, not time.",
        misconceptionFeedback: {
          time: "The horizontal axis is atomic number, not seconds. No time evolution is shown.",
          electrons:
            "You swapped the coordinates. Electron count is not the vertical axis.",
        },
        hints: [
          {
            text: "Read both axis labels and units.",
          },
          {
            text: "Atomic number belongs on x; radius belongs on y.",
          },
        ],
        workedSolution: [
          "Read both axis labels and units.",
          "Atomic number belongs on x; radius belongs on y.",
          "The horizontal coordinate identifies an element by atomic number; the vertical coordinate gives its radius in pm. This graph compares elements, not time.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "radius-graph-fall",
      kind: "practice",
      title: "Explain the fall across a period",
      question: {
        id: "radius-graph-fall",
        topicId: "atomic-radius-graphing",
        prompt:
          "The teaching graph falls from lithium toward neon within period 2. What explains the general decrease?",
        choices: [
          {
            value: "loss",
            label: "Atoms lose their occupied second level",
          },
          {
            value: "pull",
            label:
              "The same outer level experiences greater net nuclear attraction across the period",
          },
          {
            value: "shield",
            label: "Core shielding completely cancels the nucleus",
          },
        ],
        answer: "pull",
        explanation:
          "These neutral atoms all occupy level 2 as their highest level. Added nuclear charge increases net attraction; outer-level electrons do not shield it as effectively as core electrons.",
        misconceptionFeedback: {
          loss: "The second level remains occupied. Across a period, a new principal level is not added or removed.",
          shield: "Shielding is partial, not complete cancellation.",
        },
        hints: [
          {
            text: "Check whether the highest occupied level changes.",
          },
          {
            text: "Then compare nuclear charge and shielding.",
          },
        ],
        workedSolution: [
          "Check whether the highest occupied level changes.",
          "Then compare nuclear charge and shielding.",
          "These neutral atoms all occupy level 2 as their highest level. Added nuclear charge increases net attraction; outer-level electrons do not shield it as effectively as core electrons.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "radius-graph-reset",
      kind: "checkpoint",
      title: "Explain the reset between periods",
      question: {
        id: "radius-graph-reset",
        topicId: "atomic-radius-graphing",
        prompt:
          "Which configuration change explains the upward jump from neon to sodium?",
        choices: [
          {
            value: "level",
            label:
              "From a highest occupied level of 2 to a new 3s electron in level 3",
          },
          {
            value: "pair",
            label: "Every p orbital disappears",
          },
          {
            value: "rule",
            label: "All larger atomic numbers always have larger radii",
          },
        ],
        answer: "level",
        explanation:
          "Neon ends at 2p6; sodium adds 3s1. Occupying a new outer level creates the period-boundary reset in this illustrative graph.",
        misconceptionFeedback: {
          pair: "Neon’s core orbitals do not disappear. Sodium adds occupancy in a third level.",
          rule: "Within each period the general pattern decreases. Atomic number alone is not a size rule.",
        },
        hints: [
          {
            text: "Read the last occupied principal level in each configuration.",
          },
          {
            text: "A new occupied level changes the typical outer-electron distance.",
          },
        ],
        workedSolution: [
          "Read the last occupied principal level in each configuration.",
          "A new occupied level changes the typical outer-electron distance.",
          "Neon ends at 2p6; sodium adds 3s1. Occupying a new outer level creates the period-boundary reset in this illustrative graph.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
