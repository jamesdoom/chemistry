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
}
export interface Hint {
  text: string;
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
}
export type LessonStep =
  | {
      id: string;
      kind: "explanation";
      title: string;
      text: string;
      explanations: { label: string; text: string }[];
    }
  | { id: string; kind: "visual"; title: string; text: string }
  | { id: string; kind: "example"; title: string; steps: string[] }
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
  steps: LessonStep[];
}
