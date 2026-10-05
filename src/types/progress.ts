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
  assessments?: Record<string, AssessmentProgress>;
}
export interface AssessmentResult {
  attempts: number;
  firstCorrect: boolean;
  correct: boolean;
  helpUsed: boolean;
  completed: boolean;
}
export interface AssessmentProgress {
  results: Record<string, AssessmentResult>;
}
