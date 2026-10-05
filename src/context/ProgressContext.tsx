import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { StudentProgress, TopicProgress } from "../types/progress";
import { loadProgress, saveProgress } from "../utils/storage";
interface ProgressValue {
  progress: StudentProgress;
  storageFailed: boolean;
  completeStep: (topicId: string, stepId: string) => void;
  recordAnswer: (
    topicId: string,
    questionId: string,
    correct: boolean,
    helpUsed: boolean,
  ) => void;
}
const ProgressContext = createContext<ProgressValue | undefined>(undefined);
const blankTopic = (): TopicProgress => ({ completedSteps: [], results: {} });
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(loadProgress);
  const [storageFailed, setStorageFailed] = useState(false);
  useEffect(() => {
    setStorageFailed(!saveProgress(progress));
  }, [progress]);
  function completeStep(topicId: string, stepId: string) {
    setProgress((p) => {
      const topic = p.topics[topicId] ?? blankTopic();
      return {
        ...p,
        currentTopicId: topicId,
        topics: {
          ...p.topics,
          [topicId]: {
            ...topic,
            completedSteps: Array.from(
              new Set([...topic.completedSteps, stepId]),
            ),
          },
        },
      };
    });
  }
  function recordAnswer(
    topicId: string,
    questionId: string,
    correct: boolean,
    helpUsed: boolean,
  ) {
    setProgress((p) => {
      const topic = p.topics[topicId] ?? blankTopic();
      const old = topic.results[questionId];
      const independent = correct && !helpUsed;
      const result = {
        attempts: (old?.attempts ?? 0) + 1,
        correct: correct || !!old?.correct,
        independent: independent || !!old?.independent,
        helpUsed: helpUsed || !!old?.helpUsed,
      };
      return {
        ...p,
        currentTopicId: topicId,
        xp: p.xp + (correct && !old?.correct ? 10 : 0),
        topics: {
          ...p.topics,
          [topicId]: {
            ...topic,
            results: { ...topic.results, [questionId]: result },
          },
        },
      };
    });
  }
  return (
    <ProgressContext.Provider
      value={{ progress, storageFailed, completeStep, recordAnswer }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("ProgressProvider missing");
  return context;
}
