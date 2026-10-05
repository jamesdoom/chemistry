import { lessons } from "../data/chapters/chapter11";
import { orbitalExercises } from "../data/practice/orbitals";
import { calculateMastery } from "./mastery";
import type { TopicProgress } from "../types/progress";
export function topicQuestionIds(topicId: string): string[] {
  return [
    ...lessons
      .filter((l) => l.topicId === topicId)
      .flatMap((l) =>
        l.steps.flatMap((s) =>
          s.kind === "practice" || s.kind === "checkpoint"
            ? [s.question.id]
            : [],
        ),
      ),
    ...orbitalExercises.filter((e) => e.topicId === topicId).map((e) => e.id),
  ];
}
export function topicMastery(
  topicId: string,
  progress: TopicProgress | undefined,
) {
  const ids = topicQuestionIds(topicId);
  // Only score questions in the active curriculum, ignoring retired results.
  const results = Object.fromEntries(
    ids.flatMap((id) =>
      progress?.results[id] ? [[id, progress.results[id]]] : [],
    ),
  );
  return calculateMastery(
    progress ? { ...progress, results } : undefined,
    ids.length,
  );
}
