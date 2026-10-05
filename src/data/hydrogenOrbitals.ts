export const orbitalSublevels = [
  { letter: "s", count: 1, firstLevel: 1 },
  { letter: "p", count: 3, firstLevel: 2 },
  { letter: "d", count: 5, firstLevel: 3 },
  { letter: "f", count: 7, firstLevel: 4 },
] as const;
export const pOrientations = [
  { id: "x", angle: 0 },
  { id: "y", angle: 40 },
  { id: "z", angle: 90 },
] as const;
export function sublevelsForLevel(level: number) {
  return orbitalSublevels.filter((sublevel) => sublevel.firstLevel <= level);
}
