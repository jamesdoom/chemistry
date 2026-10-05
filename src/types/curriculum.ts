export interface Chapter {
  id: string;
  number: number;
  title: string;
  sections: Section[];
}
export interface Section {
  id: string;
  number: string;
  title: string;
  topics: Topic[];
}
export interface Topic {
  id: string;
  title: string;
  lessonId?: string;
  assessmentId?: string;
}
export interface Hint {
  text: string;
}
export interface Assessment {
  scope?: "chapter";
  id: string;
  title: string;
  sectionNumber: string;
  introduction: string;
  questions: (PracticeQuestion & {
    concept: string;
    reviewTo: string;
    reviewRecommendation?: string;
  })[];
}
export interface PracticeQuestion {
  id: string;
  topicId: string;
  prompt: string;
  answer: string;
  explanation: string;
  hints: Hint[];
  misconceptionFeedback: Record<string, string>;
  workedSolution: string[];
  difficulty: "introductory" | "standard";
  inputPlaceholder?: string;
  fallbackFeedback?: string;
  choices?: { value: string; label: string }[];
  numericAnswer?: { value: number; relativeTolerance: number };
}
export type LessonVisual =
  | { kind: "oxygen-orbitals" }
  | { kind: "valence"; atomicNumber: number }
  | { kind: "trend-comparison"; comparisonId: string };
export type LessonStep =
  | {
      id: string;
      kind:
        | "scattering-explorer"
        | "wave-explorer"
        | "emission-explorer"
        | "hydrogen-explorer"
        | "bohr-explorer"
        | "probability-explorer"
        | "orbital-shapes-explorer"
        | "multi-electron-explorer";
      title: string;
      text: string;
      continueLabel?: string;
    }
  | {
      id: string;
      kind: "explanation";
      title: string;
      text: string;
      explanations: { label: string; text: string }[];
      chain?: string[];
      continueLabel?: string;
    }
  | {
      id: string;
      kind: "visual";
      title: string;
      text: string;
      visual: LessonVisual;
      note?: string;
      continueLabel?: string;
    }
  | {
      id: string;
      kind: "example";
      title: string;
      steps: string[];
      visual?: LessonVisual;
      continueLabel?: string;
    }
  | {
      id: string;
      kind: "periodic-table";
      title: string;
      text: string;
      initialAtomicNumber: number;
      requiredAtomicNumbers: number[];
      continueLabel?: string;
    }
  | {
      id: string;
      kind: "trend-explorer";
      title: string;
      text: string;
      initialComparisonId: string;
      requiredComparisonIds: string[];
      continueLabel?: string;
    }
  | {
      id: string;
      kind: "practice" | "checkpoint";
      title: string;
      question: PracticeQuestion;
    };
export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  subtitle: string;
  summary: string;
  completionActions?: { label: string; to: string }[];
  steps: LessonStep[];
}
