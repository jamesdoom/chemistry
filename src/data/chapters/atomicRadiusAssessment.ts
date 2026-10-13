import type { Assessment } from "../../types/curriculum";
export const atomicRadiusAssessment: Assessment = {
  id: "atomic-radius-check",
  scope: "focused",
  sectionNumber: "atomic-radius",
  title: "Atomic Radius Understanding Check",
  introduction:
    "Connect configurations, shielding, radius trends, and graph interpretation. This focused check uses original questions and an illustrative graph dataset.",
  questions: [
    {
      id: "radius-check-across",
      topicId: "atomic-radius-check",
      concept: "Explain same-period size",
      reviewTo: "/lessons/atomic-radius-foundations",
      reviewRecommendation:
        "Compare outer level, core electrons, and nuclear charge before deciding which neutral atom is larger.",
      prompt:
        "Sodium ends in 3s1 and magnesium in 3s2. Which is generally larger, and why?",
      choices: [
        {
          value: "na",
          label:
            "Sodium: the outer level stays 3, but magnesium has greater net nuclear attraction",
        },
        {
          value: "mg",
          label: "Magnesium: adding one electron always makes an atom larger",
        },
        {
          value: "levels",
          label: "Magnesium: it occupies a fourth principal level",
        },
      ],
      answer: "na",
      explanation:
        "Both have ten core electrons and highest occupied level 3. Greater net nuclear pull in magnesium contracts the cloud, so sodium is generally larger.",
      misconceptionFeedback: {
        mg: "Added outer electrons do not shield the added nuclear charge effectively enough to make this a general growth rule.",
        levels:
          "Both configurations end in level 3; magnesium does not add a fourth level.",
      },
      hints: [
        {
          text: "Compare occupied levels first.",
        },
        {
          text: "Then compare nuclear charge with the same core.",
        },
      ],
      workedSolution: [
        "Compare occupied levels first.",
        "Then compare nuclear charge with the same core.",
        "Both have ten core electrons and highest occupied level 3. Greater net nuclear pull in magnesium contracts the cloud, so sodium is generally larger.",
      ],
      difficulty: "standard",
    },
    {
      id: "radius-check-down",
      topicId: "atomic-radius-check",
      concept: "Explain down-group size",
      reviewTo: "/lessons/atomic-radius-foundations",
      reviewRecommendation:
        "Compare oxygen’s outer level 2 with sulfur’s level 3 and connect the additional level to distance and shielding.",
      prompt:
        "Oxygen and sulfur are in the same group. Why is sulfur generally larger?",
      choices: [
        {
          value: "charge",
          label: "More protons repel electrons outward",
        },
        {
          value: "level",
          label:
            "Sulfur occupies an additional outer level and has more core shielding",
        },
        {
          value: "same",
          label:
            "They have identical occupied levels because they share a group",
        },
      ],
      answer: "level",
      explanation:
        "Group membership connects valence patterns, not identical occupied levels. Sulfur’s additional occupied level and core shielding increase atomic size on average.",
      misconceptionFeedback: {
        charge:
          "Protons attract electrons. The added level and shielding explain the size increase.",
        same: "Oxygen’s highest occupied level is 2; sulfur’s is 3.",
      },
      hints: [
        {
          text: "Same group does not mean same period.",
        },
        {
          text: "Identify the highest occupied level in each atom.",
        },
      ],
      workedSolution: [
        "Same group does not mean same period.",
        "Identify the highest occupied level in each atom.",
        "Group membership connects valence patterns, not identical occupied levels. Sulfur’s additional occupied level and core shielding increase atomic size on average.",
      ],
      difficulty: "standard",
    },
    {
      id: "radius-check-core",
      topicId: "atomic-radius-check",
      concept: "Use core and valence counts",
      reviewTo: "/lessons/atomic-radius-foundations",
      reviewRecommendation:
        "Read chlorine’s configuration and separate the full inner levels from the highest occupied level.",
      prompt:
        "Neutral chlorine has 1s2 2s2 2p6 3s2 3p5. Which correctly identifies its core and valence electrons?",
      choices: [
        {
          value: "reversed",
          label: "7 core and 10 valence",
        },
        {
          value: "all",
          label: "17 valence and no core",
        },
        {
          value: "counts",
          label: "10 core and 7 valence",
        },
      ],
      answer: "counts",
      explanation:
        "The highest occupied level is 3, containing 2 + 5 = 7 valence electrons. The ten electrons in levels 1 and 2 form the core.",
      misconceptionFeedback: {
        reversed:
          "Valence electrons occupy the highest level here, not the inner filled levels.",
        all: "The inner levels still contain core electrons. Count only level 3 for valence.",
      },
      hints: [
        {
          text: "Identify the highest occupied principal level.",
        },
        {
          text: "Add the exponents in level 3 separately from levels 1 and 2.",
        },
      ],
      workedSolution: [
        "Identify the highest occupied principal level.",
        "Add the exponents in level 3 separately from levels 1 and 2.",
        "The highest occupied level is 3, containing 2 + 5 = 7 valence electrons. The ten electrons in levels 1 and 2 form the core.",
      ],
      difficulty: "standard",
    },
    {
      id: "radius-check-coordinates",
      topicId: "atomic-radius-check",
      concept: "Interpret graph coordinates",
      reviewTo: "/lessons/atomic-radius-graphing",
      reviewRecommendation:
        "Match x to atomic number and y to radius with pm units; do not read this as a time graph.",
      prompt:
        "In our illustrative dataset, boron has Z = 5 and radius 110 pm. Which plotted point is correct?",
      choices: [
        {
          value: "correct",
          label: "x = 5, y = 110 pm",
        },
        {
          value: "swapped",
          label: "x = 110, y = 5 pm",
        },
        {
          value: "time",
          label: "x = 5 seconds, y = 110 electrons",
        },
      ],
      answer: "correct",
      explanation:
        "Atomic number belongs on the horizontal axis and radius on the vertical axis in this activity. One point represents boron in the teaching dataset.",
      misconceptionFeedback: {
        swapped:
          "The coordinates are reversed. Read the axis labels before plotting.",
        time: "Neither seconds nor electron counts are the axes of this graph.",
      },
      hints: [
        {
          text: "Read the labels rather than guessing from the larger number.",
        },
        {
          text: "The radius coordinate must carry pm units.",
        },
      ],
      workedSolution: [
        "Read the labels rather than guessing from the larger number.",
        "The radius coordinate must carry pm units.",
        "Atomic number belongs on the horizontal axis and radius on the vertical axis in this activity. One point represents boron in the teaching dataset.",
      ],
      difficulty: "standard",
    },
    {
      id: "radius-check-reset",
      topicId: "atomic-radius-check",
      concept: "Explain a radius-graph reset",
      reviewTo: "/lessons/atomic-radius-graphing",
      reviewRecommendation:
        "Use the highest occupied level to explain why a decreasing period is followed by an upward reset.",
      prompt:
        "A radius graph decreases through period 2, then rises sharply at sodium. Which explanation connects the pattern to configuration?",
      choices: [
        {
          value: "always",
          label:
            "The entire graph must increase because atomic number increases",
        },
        {
          value: "level",
          label:
            "Sodium begins an occupied third level after neon’s filled second level",
        },
        {
          value: "axis",
          label: "The vertical axis must have changed units at sodium",
        },
      ],
      answer: "level",
      explanation:
        "The new occupied principal level explains the period-boundary reset. The graph retains one radius scale; nuclear pull explains the general decrease within a period.",
      misconceptionFeedback: {
        always:
          "Increasing atomic number does not require radius to increase. The pattern depends on occupied levels and net attraction.",
        axis: "A properly labeled graph uses one consistent radius scale. The jump has an atomic-structure explanation.",
      },
      hints: [
        {
          text: "Compare the last occupied level of neon and sodium.",
        },
        {
          text: "The repeated pattern connects to starts of new periods.",
        },
      ],
      workedSolution: [
        "Compare the last occupied level of neon and sodium.",
        "The repeated pattern connects to starts of new periods.",
        "The new occupied principal level explains the period-boundary reset. The graph retains one radius scale; nuclear pull explains the general decrease within a period.",
      ],
      difficulty: "standard",
    },
    {
      id: "radius-check-definitions",
      topicId: "atomic-radius-check",
      concept: "Compare radius data responsibly",
      reviewTo: "/lessons/atomic-radius-graphing",
      reviewRecommendation:
        "Check definitions and use the teacher’s supplied dataset rather than treating illustrative values as measurements.",
      prompt:
        "A classroom table and our illustrative table give different radii for one element. What should you do for the assignment?",
      choices: [
        {
          value: "copy",
          label: "Copy our illustrative number because every radius is exact",
        },
        {
          value: "consistent",
          label:
            "Use the teacher’s supplied values and definition; our numbers teach graphing, not measured radii",
        },
        {
          value: "average",
          label: "Average the values without checking their definitions",
        },
      ],
      answer: "consistent",
      explanation:
        "Radius depends on its definition, and this app’s graph values are explicitly illustrative. Follow the assignment’s supplied dataset instead of mixing incompatible values.",
      misconceptionFeedback: {
        copy: "Our graph numbers are original teaching values, not measured radii or school answers.",
        average:
          "Combining numbers without checking definitions can produce a misleading comparison.",
      },
      hints: [
        {
          text: "Read each dataset’s label and definition.",
        },
        {
          text: "A teaching model and a measured table serve different purposes.",
        },
      ],
      workedSolution: [
        "Read each dataset’s label and definition.",
        "A teaching model and a measured table serve different purposes.",
        "Radius depends on its definition, and this app’s graph values are explicitly illustrative. Follow the assignment’s supplied dataset instead of mixing incompatible values.",
      ],
      difficulty: "standard",
    },
  ],
};
