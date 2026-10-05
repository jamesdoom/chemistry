import type {
  StudentProgress,
  TopicProgress,
  QuestionResult,
} from "../types/progress";
export const STORAGE_KEY = "orbital.progress.v1";
export const emptyProgress = (): StudentProgress => ({
  version: 1,
  xp: 0,
  currentTopicId: "electron-arrangements",
  topics: {},
});
function isResult(value: unknown): value is QuestionResult {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.attempts === "number" &&
    Number.isInteger(r.attempts) &&
    r.attempts >= 0 &&
    ["correct", "independent", "helpUsed"].every(
      (k) => typeof r[k] === "boolean",
    )
  );
}
function isTopic(value: unknown): value is TopicProgress {
  if (!value || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;
  return (
    Array.isArray(t.completedSteps) &&
    t.completedSteps.every((s) => typeof s === "string") &&
    !!t.results &&
    typeof t.results === "object" &&
    Object.values(t.results).every(isResult)
  );
}
export function loadProgress(): StudentProgress {
  try {
    const raw: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "null",
    );
    if (!raw || typeof raw !== "object") return emptyProgress();
    const p = raw as Record<string, unknown>;
    if (
      p.version !== 1 ||
      typeof p.xp !== "number" ||
      !Number.isFinite(p.xp) ||
      p.xp < 0 ||
      typeof p.currentTopicId !== "string" ||
      !p.topics ||
      typeof p.topics !== "object" ||
      !Object.values(p.topics).every(isTopic)
    )
      return emptyProgress();
    return raw as StudentProgress;
  } catch {
    return emptyProgress();
  }
}
export function saveProgress(progress: StudentProgress): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}
