export type MasteryState =
  "NOT_STARTED" | "LEARNING" | "PRACTICING" | "MASTERED";
export interface QuestionResult {
  attempts: number;
  correct: boolean;
  independent: boolean;
  helpUsed: boolean;
}
export interface TopicProgress {
  completedSteps: string[];
  results: Record<string, QuestionResult>;
}
export interface StudentProgress {
  version: 1;
  xp: number;
  currentTopicId: string;
  topics: Record<string, TopicProgress>;
}
