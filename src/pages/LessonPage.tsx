import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { chapter11, lessons } from "../data/chapters/chapter11";
import { useProgress } from "../context/ProgressContext";
import { OrbitalVisual } from "../components/learning/OrbitalVisual";
import { ValenceVisual } from "../components/learning/ValenceVisual";
import { PeriodicExplorer } from "../components/learning/PeriodicExplorer";
import { TrendComparisonVisual } from "../components/learning/TrendComparisonVisual";
import { TrendExplorer } from "../components/learning/TrendExplorer";
import { ScatteringExplorer } from "../components/learning/ScatteringExplorer";
import { WaveExplorer } from "../components/learning/WaveExplorer";
import { EmissionExplorer } from "../components/learning/EmissionExplorer";
import { HydrogenExplorer } from "../components/learning/HydrogenExplorer";
import { BohrExplorer } from "../components/learning/BohrExplorer";
import { Practice } from "../components/practice/Practice";
import { Meter } from "../components/progress/Meter";
import { topicMastery } from "../utils/learning";
import type { Lesson, LessonVisual } from "../types/curriculum";
function VisualContent({ visual }: { visual: LessonVisual }) {
  switch (visual.kind) {
    case "oxygen-orbitals":
      return <OrbitalVisual />;
    case "valence":
      return <ValenceVisual atomicNumber={visual.atomicNumber} />;
    case "trend-comparison":
      return (
        <TrendComparisonVisual
          key={visual.comparisonId}
          comparisonId={visual.comparisonId}
        />
      );
  }
}
function LearningExperience({ lesson }: { lesson: Lesson }) {
  const section = chapter11.sections.find((item) =>
    item.topics.some((topic) => topic.id === lesson.topicId),
  );
  const { progress, completeStep } = useProgress();
  const saved = progress.topics[lesson.topicId];
  const [index, setIndex] = useState(() => {
    const next = lesson.steps.findIndex(
      (s) => !saved?.completedSteps.includes(s.id),
    );
    return next === -1 ? 0 : next;
  });
  const [explanation, setExplanation] = useState(-1);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const step = lesson.steps[index]!;
  const completed = lesson.steps.filter((s) =>
    saved?.completedSteps.includes(s.id),
  ).length;
  function advance() {
    completeStep(lesson.topicId, step.id);
    setExplanation(-1);
    setExampleIndex(0);
    if (index === lesson.steps.length - 1) setFinished(true);
    else setIndex((i) => i + 1);
  }
  const mastery = topicMastery(lesson.topicId, saved);
  return (
    <>
      <Link className="breadcrumb" to="/chapters/chapter-11">
        ← Chapter 11 roadmap
      </Link>
      <div className="eyebrow">
        LEARN / {section ? `SECTION ${section.number}` : "CHAPTER 11"}
      </div>
      <h1 className="lesson-title">{lesson.title}</h1>
      <p className="muted">{lesson.subtitle}</p>
      <div className="lesson-layout">
        <aside className="card lesson-sidebar">
          <div className="eyebrow">YOUR PATH</div>
          <ol>
            {lesson.steps.map((s, i) => (
              <li key={s.id}>
                <span className={i === index ? "active-step" : ""}>
                  {saved?.completedSteps.includes(s.id) ? "✓ " : ""}
                  {s.title}
                  {i === index ? " · Current" : ""}
                </span>
              </li>
            ))}
          </ol>
          <Meter
            label="Lesson progress"
            value={Math.round((completed / lesson.steps.length) * 100)}
          />
          <Meter label="Topic mastery" value={mastery.percent} />
        </aside>
        <section className="card lesson-card" aria-label="Lesson content">
          {finished ? (
            <>
              <div className="eyebrow">LESSON COMPLETE</div>
              <h2>You’ve connected the pieces.</h2>
              <p>{lesson.summary}</p>
              <p>
                Your topic mastery is {mastery.percent}%. Supported answers
                count as progress; try again without hints to build stronger
                evidence.
              </p>
              {lesson.completionActions?.map((action) => (
                <Link key={action.to} className="primary action" to={action.to}>
                  {action.label}
                </Link>
              ))}
              <Link className="primary action" to="/">
                Back to dashboard →
              </Link>
            </>
          ) : (
            <>
              <div className="eyebrow">
                STEP {index + 1} OF {lesson.steps.length} ·{" "}
                {step.kind === "periodic-table" ||
                step.kind === "trend-explorer" ||
                step.kind === "scattering-explorer" ||
                step.kind === "wave-explorer" ||
                step.kind === "emission-explorer" ||
                step.kind === "hydrogen-explorer" ||
                step.kind === "bohr-explorer"
                  ? "Explore"
                  : step.kind === "checkpoint"
                    ? "Mastery check"
                    : step.kind}
              </div>
              <h2>{step.title}</h2>
              {step.kind === "explanation" && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  {step.chain && (
                    <div className="concept-chain">
                      {step.chain.map((label, i) => (
                        <span key={label}>
                          {i > 0 && <b aria-hidden="true">→ </b>}
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                  <button
                    className="secondary"
                    disabled={explanation === step.explanations.length - 1}
                    onClick={() => setExplanation((e) => e + 1)}
                  >
                    I don’t understand
                    {explanation === step.explanations.length - 1
                      ? " · All explanations shown"
                      : ""}
                  </button>
                  <div aria-live="polite">
                    {explanation >= 0 && (
                      <div className="hint">
                        <strong>{step.explanations[explanation]!.label}</strong>
                        <p>{step.explanations[explanation]!.text}</p>
                      </div>
                    )}
                  </div>
                  <button className="primary next" onClick={advance}>
                    {step.continueLabel ?? "Continue →"}
                  </button>
                </>
              )}
              {step.kind === "visual" && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  <VisualContent visual={step.visual} />
                  {step.note && <p className="hint">{step.note}</p>}
                  <button className="primary next" onClick={advance}>
                    {step.continueLabel ?? "Continue →"}
                  </button>
                </>
              )}
              {step.kind === "example" && (
                <>
                  {step.visual && <VisualContent visual={step.visual} />}
                  <ol className="worked-steps">
                    {step.steps.slice(0, exampleIndex + 1).map((s, i) => (
                      <li key={s}>
                        <span>{i + 1}</span>
                        <p>{s}</p>
                      </li>
                    ))}
                  </ol>
                  {exampleIndex < step.steps.length - 1 ? (
                    <button
                      className="primary"
                      onClick={() => setExampleIndex((i) => i + 1)}
                    >
                      Next part of the example →
                    </button>
                  ) : (
                    <button className="primary" onClick={advance}>
                      {step.continueLabel ?? "Continue →"}
                    </button>
                  )}
                </>
              )}
              {step.kind === "periodic-table" && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  <PeriodicExplorer
                    key={step.id}
                    initialAtomicNumber={step.initialAtomicNumber}
                    requiredAtomicNumbers={step.requiredAtomicNumbers}
                    onComplete={advance}
                    continueLabel={step.continueLabel ?? "Continue →"}
                  />
                </>
              )}
              {step.kind === "trend-explorer" && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  <TrendExplorer
                    key={step.id}
                    initialComparisonId={step.initialComparisonId}
                    requiredComparisonIds={step.requiredComparisonIds}
                    onComplete={advance}
                    continueLabel={step.continueLabel ?? "Continue →"}
                  />
                </>
              )}
              {step.kind === "scattering-explorer" && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  <ScatteringExplorer
                    key={step.id}
                    onComplete={advance}
                    continueLabel={step.continueLabel ?? "Continue →"}
                  />
                </>
              )}
              {step.kind === "wave-explorer" && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  <WaveExplorer
                    key={step.id}
                    onComplete={advance}
                    continueLabel={step.continueLabel ?? "Continue →"}
                  />
                </>
              )}
              {step.kind === "emission-explorer" && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  <EmissionExplorer
                    key={step.id}
                    onComplete={advance}
                    continueLabel={step.continueLabel ?? "Continue →"}
                  />
                </>
              )}
              {(step.kind === "hydrogen-explorer" ||
                step.kind === "bohr-explorer") && (
                <>
                  <p className="lesson-copy">{step.text}</p>
                  {step.kind === "hydrogen-explorer" ? (
                    <HydrogenExplorer
                      key={step.id}
                      onComplete={advance}
                      continueLabel={step.continueLabel ?? "Continue →"}
                    />
                  ) : (
                    <BohrExplorer
                      key={step.id}
                      onComplete={advance}
                      continueLabel={step.continueLabel ?? "Continue →"}
                    />
                  )}
                </>
              )}
              {(step.kind === "practice" || step.kind === "checkpoint") && (
                <Practice
                  key={step.id}
                  question={step.question}
                  onComplete={advance}
                />
              )}
              {index > 0 && (
                <button
                  className="text-button"
                  onClick={() => {
                    setIndex((i) => i - 1);
                    setExampleIndex(0);
                    setExplanation(-1);
                  }}
                >
                  ← Previous step
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}
export function LessonPage() {
  const { lessonId } = useParams();
  const lesson = lessons.find((l) => l.id === lessonId);
  return lesson ? (
    <LearningExperience key={lesson.id} lesson={lesson} />
  ) : (
    <>
      <h1>Lesson not available</h1>
      <Link to="/chapters/chapter-11">Return to Chapter 11</Link>
    </>
  );
}
