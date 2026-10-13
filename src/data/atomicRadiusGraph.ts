import { periodicAtoms } from "./periodicTable.ts";
// Original teaching values, deliberately illustrative rather than measured radii.
const radii = [
  55, 40, 170, 130, 110, 100, 90, 80, 70, 60, 210, 180, 160, 145, 135, 125, 115,
  105,
];
export const radiusGraphData = periodicAtoms.map((atom, i) => ({
  ...atom,
  radius: radii[i]!,
}));
export const requiredGraphPoints = [3, 10, 11];
export function graphPoint(z: number, radius: number) {
  return { x: 60 + (z - 1) * 25, y: 270 - radius };
}
export function graphEntryFeedback(z: number, input: string) {
  const datum = radiusGraphData.find((d) => d.atomicNumber === z)!;
  const value = Number(input);
  if (!input.trim() || !Number.isFinite(value))
    return {
      correct: false,
      message: "Enter the radius from the teaching table as a number in pm.",
    };
  if (value === datum.radius)
    return {
      correct: true,
      message: `Placed ${datum.symbol} at (${z}, ${datum.radius} pm). Atomic number is the horizontal coordinate; radius is the vertical coordinate.`,
    };
  if (value === z)
    return {
      correct: false,
      message:
        "That is the atomic number, which belongs on the horizontal axis. Use the radius column for the vertical coordinate.",
    };
  return {
    correct: false,
    message:
      "Check the selected element’s row and the radius column. The vertical axis uses picometers (pm); do not substitute atomic number or an electron count.",
  };
}
