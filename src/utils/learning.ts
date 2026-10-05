import { lessons } from "../data/chapters/chapter11.ts";
import { orbitalExercises } from "../data/practice/orbitals.ts";
import { calculateMastery } from "./mastery.ts";
import type { StudentProgress, TopicProgress } from "../types/progress";
export function nextLearningLesson(progress: StudentProgress) {
  const complete = (lesson: (typeof lessons)[number]) =>
    lesson.steps.every((step) =>
      progress.topics[lesson.topicId]?.completedSteps.includes(step.id),
    );
  const current = lessons.find(
    (lesson) => lesson.topicId === progress.currentTopicId,
  );
  return current && !complete(current)
    ? current
    : (lessons.find((lesson) => !complete(lesson)) ?? current ?? lessons[0]!);
}
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
  const results: TopicProgress["results"] = {};
  for (const id of ids) {
    const result = progress?.results[id];
    if (result) results[id] = result;
  }
  return calculateMastery(
    progress ? { ...progress, results } : undefined,
    ids.length,
  );
}
