export const scatteringCases = [
  {
    id: "far",
    label: "Far from the nucleus",
    observation:
      "Most alpha particles passed through with little change in direction.",
    inference:
      "Most of an atom’s volume contains no small, massive center that strongly deflects these fast particles.",
    reason:
      "Far from the nucleus, the positive alpha particle experiences a much weaker repulsive force. Its path changes very little.",
    path: "M 25 65 L 495 65",
    frequency: "Most particles",
  },
  {
    id: "near",
    label: "Closer to the nucleus",
    observation: "Some alpha particles changed direction.",
    inference:
      "Positive charge is concentrated in a region that repels the positive alpha particles.",
    reason:
      "As the alpha particle approaches the positive nucleus more closely, electrical repulsion bends its path away. It does not need to touch the nucleus.",
    path: "M 25 125 L 180 125 C 235 125 230 60 330 38 L 495 18",
    frequency: "Some particles",
  },
  {
    id: "head-on",
    label: "Nearly head-on approach",
    observation: "Very few alpha particles scattered back toward the source.",
    inference:
      "A very small region contains concentrated positive charge and much of the atom’s mass: the nucleus.",
    reason:
      "A nearly head-on approach to the heavy, positive nucleus can reverse the alpha particle’s direction through strong electrical repulsion. This is not a collision with a solid shell.",
    path: "M 25 176 L 185 176 C 230 176 230 169 185 169 L 55 169",
    frequency: "Very few particles",
  },
] as const;
