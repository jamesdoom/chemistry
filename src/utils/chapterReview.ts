import { chapter11, lessons } from "../data/chapters/chapter11.ts";
import { assessments } from "../data/assessments.ts";
import { assessmentSummary } from "./assessment.ts";
import { topicMastery, topicQuestionIds } from "./learning.ts";
import type { StudentProgress, TopicProgress } from "../types/progress";
export function chapterEntries(progress: StudentProgress) {
  return chapter11.sections.flatMap((section) =>
    section.topics.map((topic) => {
      const lesson = lessons.find((l) => l.id === topic.lessonId);
      const assessment = assessments.find((a) => a.id === topic.assessmentId);
      const saved = progress.topics[topic.id];
      if (lesson) {
        const completed = lesson.steps.filter((s) =>
          saved?.completedSteps.includes(s.id),
        ).length;
        const mastery = topicMastery(topic.id, saved);
        return {
          id: topic.id,
          title: topic.title,
          section: section.number,
          to: `/lessons/${lesson.id}`,
          kind: "lesson" as const,
          complete: completed === lesson.steps.length,
          started:
            completed > 0 ||
            topicQuestionIds(topic.id).some((id) => !!saved?.results[id]),
          percent: mastery.percent,
          status: `${completed === lesson.steps.length ? "Lesson complete" : mastery.state.replaceAll("_", " ")} · ${mastery.percent}% mastery`,
        };
      }
      if (assessment) {
        const attempt = progress.assessments?.[assessment.id];
        const summary = assessmentSummary(
          attempt,
          assessment.questions.map((q) => q.id),
        );
        return {
          id: topic.id,
          title: topic.title,
          section: section.number,
          to: `/assessments/${assessment.sectionNumber}`,
          kind: "assessment" as const,
          complete: summary.complete,
          started: !!attempt,
          percent: summary.percent,
          status: summary.complete
            ? `Assessment complete · ${summary.percent}% first-try understanding`
            : attempt
              ? `Assessment in progress · ${summary.completed} of ${summary.total} checks complete`
              : "Assessment not started",
        };
      }
      return {
        id: topic.id,
        title: topic.title,
        section: section.number,
        to: "/chapters/chapter-11",
        kind: "unavailable" as const,
        complete: false,
        started: false,
        percent: 0,
        status: "Content unavailable",
      };
    }),
  );
}
export function chapterSummary(progress: StudentProgress) {
  const entries = chapterEntries(progress);
  const learning = entries.filter((e) => e.kind === "lesson");
  return {
    entries,
    completed: entries.filter((e) => e.complete).length,
    total: entries.length,
    mastery: learning.length
      ? Math.round(
          learning.reduce((sum, e) => sum + e.percent, 0) / learning.length,
        )
      : 0,
  };
}
export interface ReviewRecommendation {
  to: string;
  title: string;
  reasons: string[];
}
export function reviewRecommendations(
  progress: StudentProgress,
): ReviewRecommendation[] {
  const byRoute = new Map<string, ReviewRecommendation>();
  function add(to: string, reason: string) {
    const lesson = lessons.find((l) => to === `/lessons/${l.id}`);
    if (!lesson) return;
    const item = byRoute.get(to) ?? { to, title: lesson.title, reasons: [] };
    if (!item.reasons.includes(reason)) item.reasons.push(reason);
    byRoute.set(to, item);
  }
  for (const lesson of lessons) {
    const saved: TopicProgress | undefined = progress.topics[lesson.topicId];
    const results = topicQuestionIds(lesson.topicId).flatMap((id) =>
      saved?.results[id] ? [saved.results[id]!] : [],
    );
    if (results.length && topicMastery(lesson.topicId, saved).percent < 80)
      add(
        `/lessons/${lesson.id}`,
        "Lesson practice is below 80% mastery. Revisit the explanation and try the checks without hints.",
      );
  }
  // Latest assessment reports stay separate from accumulated lesson mastery.
  for (const assessment of assessments)
    for (const q of assessment.questions) {
      const r = progress.assessments?.[assessment.id]?.results[q.id];
      if (
        r &&
        (r.attempts > 0 || r.helpUsed) &&
        (!r.firstCorrect || r.helpUsed)
      )
        add(
          q.reviewTo,
          `${assessment.title}: ${q.reviewRecommendation ?? q.concept}`,
        );
    }
  return [...byRoute.values()];
}
