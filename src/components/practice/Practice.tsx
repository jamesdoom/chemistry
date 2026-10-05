import { useState } from "react";
import type { PracticeQuestion } from "../../types/curriculum";
import { useProgress } from "../../context/ProgressContext";
export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c)))
    .replace(/[\s^]/g, "");
}
export function Practice({
  question,
  onComplete,
}: {
  question: PracticeQuestion;
  onComplete: () => void;
}) {
  const { recordAnswer } = useProgress();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(false);
  const [help, setHelp] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const helpLabels = [
    "Hint 1",
    "Hint 2",
    "Walk me through it",
    "Show solution",
  ];
  function check() {
    const normalized = normalizeAnswer(answer);
    const success = normalized === normalizeAnswer(question.answer);
    setAttempted(true);
    setCorrect(success);
    recordAnswer(question.topicId, question.id, success, help > 0);
    const targeted = Object.entries(question.misconceptionFeedback).find(
      ([key]) => normalizeAnswer(key) === normalized,
    )?.[1];
    setFeedback(
      success
        ? `You’ve got it. ${question.explanation}`
        : (targeted ??
            question.fallbackFeedback ??
            "Compare your answer with the concept, or use a hint to break it into smaller steps."),
    );
  }
  return (
    <div className="practice">
      <p className="question">{question.prompt}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        <label htmlFor={question.id}>Your answer</label>
        <input
          id={question.id}
          autoComplete="off"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={correct}
          placeholder={question.inputPlaceholder ?? "Your answer"}
        />
        <button className="primary" disabled={!answer.trim() || correct}>
          Check answer
        </button>
      </form>
      <div
        aria-live="polite"
        className={feedback ? `feedback ${correct ? "success" : ""}` : ""}
      >
        {feedback}
      </div>
      {!correct && (
        <button
          className="secondary"
          onClick={() => setHelp((h) => Math.min(4, h + 1))}
          disabled={help === 4}
        >
          {helpLabels[help] ?? "Solution shown"}
        </button>
      )}
      <div aria-live="polite">
        {question.hints.slice(0, Math.min(help, 2)).map((hint, i) => (
          <p className="hint" key={i}>
            <strong>Hint {i + 1}.</strong> {hint.text}
          </p>
        ))}
        {help >= 3 && (
          <div className="hint">
            <strong>Walkthrough</strong>
            <ol>
              {question.workedSolution
                .slice(0, help === 4 ? undefined : -1)
                .map((s) => (
                  <li key={s}>{s}</li>
                ))}
            </ol>
            {help === 3 && <p>Finish the last step, then check your answer.</p>}
            {help === 4 && (
              <p>
                Solution: <strong>{question.answer}</strong>. Enter it to finish
                with support.
              </p>
            )}
          </div>
        )}
      </div>
      {correct && (
        <button className="primary" onClick={onComplete}>
          Continue →
        </button>
      )}
      {attempted && !correct && (
        <p className="muted">
          Mistakes help you find what to practice. Take your time.
        </p>
      )}
    </div>
  );
}
