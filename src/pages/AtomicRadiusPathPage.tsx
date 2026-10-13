import { focusedAssessments } from "../data/assessments";
import { assessmentSummary } from "../utils/assessment";
import { reviewRecommendations } from "../utils/chapterReview";
import { Link } from "react-router-dom";
import { focusedLessons } from "../data/focusedLessons";
import { useProgress } from "../context/ProgressContext";
import { topicMastery } from "../utils/learning";
import { Meter } from "../components/progress/Meter";
export function AtomicRadiusPathPage() {
  const { progress } = useProgress();
  const next = focusedLessons.find(
    (l) =>
      !l.steps.every((s) =>
        progress.topics[l.topicId]?.completedSteps.includes(s.id),
      ),
  );
  const check = focusedAssessments[0]!;
  const report = assessmentSummary(
    progress.assessments?.[check.id],
    check.questions.map((q) => q.id),
  );
  const review = reviewRecommendations(progress).filter((r) =>
    focusedLessons.some((l) => r.to === `/lessons/${l.id}`),
  );
  return (
    <>
      <div className="eyebrow">CURRENT LEARNING PATH · SECTION 11.4</div>
      <h1>Atomic size: understand it, then graph it.</h1>
      <p className="intro">
        Use electron configurations to explain atomic size. Build the reasoning
        first, then practice reading and graphing the repeating pattern.
      </p>
      {next ? (
        <Link className="primary action" to={`/lessons/${next.id}`}>
          Continue atomic-radius path →
        </Link>
      ) : (
        <Link className="primary action" to="/assessments/atomic-radius">
          {report.complete
            ? "View your understanding report"
            : "Check your understanding"}{" "}
          →
        </Link>
      )}
      <section
        className="card review-paths"
        aria-label="Atomic-radius review recommendations"
      >
        <h2>What to review next</h2>
        {review.length ? (
          <ul className="topic-list">
            {review.map((r) => (
              <li key={r.to}>
                <div>
                  <h3>{r.title}</h3>
                  <ul>
                    {r.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                  <Link to={r.to}>Review this concept →</Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No weak-topic evidence yet. Work through the lessons and focused
            check to find your next review step.
          </p>
        )}
      </section>
      <section className="card review-paths" aria-label="Atomic-radius lessons">
        <h2>Your learning sequence</h2>
        <ol className="topic-list">
          {focusedLessons.map((l) => {
            const p = progress.topics[l.topicId];
            const complete = l.steps.filter((s) =>
              p?.completedSteps.includes(s.id),
            ).length;
            return (
              <li key={l.id}>
                <div>
                  <h3>
                    <Link to={`/lessons/${l.id}`}>{l.title} →</Link>
                  </h3>
                  <p>
                    {complete} of {l.steps.length} steps complete
                  </p>
                  <Meter
                    label={`${l.title} mastery`}
                    value={topicMastery(l.topicId, p).percent}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </section>
      <section
        className="card review-paths"
        aria-label="Atomic-radius understanding check"
      >
        <h2>{check.title}</h2>
        <p>
          Six original checks connect configurations, radius, and graph
          reasoning. Your latest report saves separately from lesson mastery.
        </p>
        <p>
          {report.complete
            ? `Complete · ${report.percent}% first-try understanding`
            : progress.assessments?.[check.id]
              ? `${report.completed} of ${report.total} checks complete`
              : "Not started"}
        </p>
        <Link className="primary action" to="/assessments/atomic-radius">
          Open focused check →
        </Link>
      </section>
      <section className="card">
        <h2>Need a starting point?</h2>
        <p>
          Review these only when they help you understand the size comparisons.
        </p>
        <ul>
          <li>
            <Link to="/lessons/first-18">
              Neutral electron counts and configurations
            </Link>
          </li>
          <li>
            <Link to="/lessons/periodic-table">
              Core versus valence electrons and table location
            </Link>
          </li>
          <li>
            <Link to="/lessons/atomic-trends">
              Broader atomic-property comparisons
            </Link>
          </li>
        </ul>
        <Link to="/chapters/chapter-11">All Chapter 11 topics →</Link>
      </section>
    </>
  );
}
