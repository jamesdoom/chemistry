import { useState } from "react";
import type { OrbitalEvaluation, OrbitalExercise } from "../../types/orbitals";
import {
  emptyArrangement,
  evaluateArrangement,
  electronCount,
  configurationParts,
  solutionArrangement,
} from "../../utils/orbitals";
import { OrbitalBoard } from "../learning/OrbitalBoard";
import { useProgress } from "../../context/ProgressContext";
export function OrbitalFilling({
  exercise,
  onNext,
}: {
  exercise: OrbitalExercise;
  onNext: () => void;
}) {
  const { progress, recordAnswer, completeStep } = useProgress();
  const [arrangement, setArrangement] = useState(emptyArrangement);
  const [evaluation, setEvaluation] = useState<OrbitalEvaluation | null>(null);
  const [helpLevel, setHelpLevel] = useState(0);
  const [feedbackVersion, setFeedbackVersion] = useState(0);
  const count = electronCount(arrangement);
  const parts = configurationParts(arrangement);
  const saved = progress.topics[exercise.topicId]?.results[exercise.id];
  function changeSlot(id: string, slot: number) {
    setArrangement((current) => {
      const slots = [...(current[id] ?? [null, null])];
      const spin = slots[slot];
      slots[slot] = spin === null ? "up" : spin === "up" ? "down" : null;
      return { ...current, [id]: slots };
    });
    setEvaluation(null);
  }
  function check() {
    const result = evaluateArrangement(arrangement, exercise.atomicNumber);
    setEvaluation(result);
    setFeedbackVersion((v) => v + 1);
    recordAnswer(exercise.topicId, exercise.id, result.correct, helpLevel > 0);
    if (result.correct) completeStep(exercise.topicId, exercise.id);
  }
  const helpLabels = [
    "Hint 1",
    "Hint 2",
    "Walk me through it",
    "Show solution",
  ];
  return (
    <>
      <div className="exercise-heading">
        <div className="mini-element">
          <span>{exercise.atomicNumber}</span>
          <strong>{exercise.symbol}</strong>
          <span>{exercise.name}</span>
        </div>
        <div>
          <h2>Arrange {exercise.name.toLowerCase()}’s electrons</h2>
          <p>{exercise.prompt}</p>
          {saved?.correct && (
            <span className="badge">
              Previously solved
              {saved.independent ? " independently" : " with support"}
            </span>
          )}
        </div>
      </div>
      <p id="orbital-instructions" className="hint">
        Activate an electron slot to cycle{" "}
        <strong>empty → ↑ → ↓ → empty</strong>. Use a mouse, touch, or Tab and
        Enter/Space. Place arrows in any boxes, then check your reasoning.
      </p>
      <div className="electron-counter" role="status">
        Electrons placed:{" "}
        <strong>
          {count} / {exercise.atomicNumber}
        </strong>
        <span>
          {count === exercise.atomicNumber
            ? "Count matches. Now check the arrangement."
            : count < exercise.atomicNumber
              ? `${exercise.atomicNumber - count} still to place`
              : `${count - exercise.atomicNumber} extra`}
        </span>
      </div>
      <div aria-describedby="orbital-instructions">
        <OrbitalBoard
          arrangement={arrangement}
          onChange={changeSlot}
          disabled={evaluation?.correct}
          highlighted={evaluation?.issues[0]?.orbitalIds ?? []}
        />
      </div>
      <div className="live-configuration">
        <span>Your configuration</span>
        <p className="configuration">
          {parts.length ? (
            parts.map((part) => (
              <span key={part.label}>
                {part.label}
                <sup>{part.count}</sup>{" "}
              </span>
            ))
          ) : (
            <span className="muted small">
              Place electrons to build the notation.
            </span>
          )}
        </p>
      </div>
      <div className="exercise-actions">
        <button
          className="primary"
          onClick={check}
          disabled={evaluation?.correct}
        >
          Check arrangement
        </button>
        <button
          className="secondary"
          onClick={() => {
            setArrangement(emptyArrangement());
            setEvaluation(null);
          }}
        >
          Clear diagram
        </button>
        {!evaluation?.correct && (
          <button
            className="secondary"
            onClick={() => setHelpLevel((h) => Math.min(h + 1, 4))}
            disabled={helpLevel === 4}
          >
            {helpLabels[helpLevel] ?? "Solution shown"}
          </button>
        )}
      </div>
      <div aria-live="polite" aria-atomic="true" className="orbital-feedback">
        {evaluation && (
          <div key={feedbackVersion}>
            {evaluation.correct ? (
              <div className="feedback success">
                <strong>This ground-state arrangement works.</strong>
                <p>
                  You placed {exercise.atomicNumber} electrons, filled
                  lower-energy sublevels first, used opposite spins in each
                  pair, and kept unpaired p electrons parallel. Equivalent
                  choices of p boxes and reversed unpaired spins are valid.
                </p>
                <p>
                  {helpLevel
                    ? "You completed this with support. A fresh attempt without hints can strengthen your mastery."
                    : "You solved this without hints. Your progress has been saved."}
                </p>
              </div>
            ) : (
              <>
                <p>
                  Start with this adjustment, then check again. Your diagram
                  stays here so you can change it.
                </p>
                {evaluation.issues.slice(0, 1).map((issue) => (
                  <div className="feedback" key={issue.rule}>
                    <strong>{issue.title}</strong>
                    <p>{issue.message}</p>
                  </div>
                ))}
                {evaluation.issues.length > 1 && (
                  <details className="additional-feedback">
                    <summary>
                      {evaluation.issues.length - 1} other things to review
                    </summary>
                    {evaluation.issues.slice(1).map((issue, index) => (
                      <div className="feedback" key={`${issue.rule}-${index}`}>
                        <strong>{issue.title}</strong>
                        <p>{issue.message}</p>
                      </div>
                    ))}
                  </details>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div aria-live="polite">
        {exercise.hints.slice(0, Math.min(helpLevel, 2)).map((text, index) => (
          <p className="hint" key={text}>
            <strong>Hint {index + 1}.</strong> {text}
          </p>
        ))}
        {helpLevel >= 3 && (
          <div className="hint">
            <strong>Walkthrough</strong>
            <ol>
              {exercise.walkthrough.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ol>
          </div>
        )}
        {helpLevel === 4 && (
          <details open className="solution-panel">
            <summary>
              One valid solution for {exercise.name.toLowerCase()}
            </summary>
            <OrbitalBoard
              arrangement={solutionArrangement(exercise.atomicNumber)}
            />
            <p>
              Compare this with your diagram. Build it yourself above, then
              check again. Seeing the solution counts as using help.
            </p>
          </details>
        )}
      </div>
      {evaluation?.correct && (
        <div className="exercise-actions">
          <button className="primary" onClick={onNext}>
            Try another atom →
          </button>
          <button
            className="secondary"
            onClick={() => {
              setArrangement(emptyArrangement());
              setEvaluation(null);
              setHelpLevel(0);
            }}
          >
            Practice again without hints
          </button>
        </div>
      )}
    </>
  );
}
