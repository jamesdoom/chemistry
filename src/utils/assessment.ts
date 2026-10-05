import type { AssessmentProgress, AssessmentResult } from "../types/progress";
export function updateAssessmentAnswer(
  old: AssessmentResult | undefined,
  correct: boolean,
  helpUsed: boolean,
): AssessmentResult {
  return {
    attempts: (old?.attempts ?? 0) + 1,
    firstCorrect: old?.attempts
      ? old.firstCorrect
      : correct && !helpUsed && !old?.helpUsed,
    correct: correct || !!old?.correct,
    helpUsed: helpUsed || !!old?.helpUsed,
    completed: old?.completed ?? false,
  };
}
export function assessmentSummary(
  attempt: AssessmentProgress | undefined,
  ids: string[],
) {
  const results = ids.map((id) => attempt?.results[id]);
  const strong = results.filter(
    (r) => r?.completed && r.firstCorrect && !r.helpUsed,
  ).length;
  return {
    strong,
    total: ids.length,
    percent: ids.length ? Math.round((strong / ids.length) * 100) : 0,
    complete: ids.length > 0 && results.every((r) => r?.completed),
    completed: results.filter((r) => r?.completed).length,
  };
}
