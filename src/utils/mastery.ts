import type { MasteryState, TopicProgress } from "../types/progress";
export function calculateMastery(
  topic: TopicProgress | undefined,
  questionCount: number,
): { percent: number; state: MasteryState } {
  const results = Object.values(topic?.results ?? {});
  // Independent success earns full evidence; supported success earns half.
  const points = results.reduce(
    (sum, result) =>
      sum + (result.correct ? (result.independent ? 1 : 0.5) : 0),
    0,
  );
  const percent = questionCount
    ? Math.min(100, Math.round((points / questionCount) * 100))
    : 0;
  const state: MasteryState =
    percent >= 80
      ? "MASTERED"
      : results.length
        ? "PRACTICING"
        : topic?.completedSteps.length
          ? "LEARNING"
          : "NOT_STARTED";
  return { percent, state };
}
