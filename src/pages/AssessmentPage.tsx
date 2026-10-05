import { Link, useParams } from "react-router-dom";
import { assessments } from "../data/assessments";
import type { Assessment } from "../types/curriculum";
import { useProgress } from "../context/ProgressContext";
import { Practice } from "../components/practice/Practice";
import { Meter } from "../components/progress/Meter";
import { assessmentSummary, updateAssessmentAnswer } from "../utils/assessment";
function AssessmentExperience({ assessment }: { assessment: Assessment }) {
  const { progress, saveAssessment } = useProgress();
  const attempt = progress.assessments?.[assessment.id];
  const summary = assessmentSummary(
    attempt,
    assessment.questions.map((q) => q.id),
  );
  const question = assessment.questions.find(
    (q) => !attempt?.results[q.id]?.completed,
  );
  function saveResult(result: NonNullable<typeof attempt>["results"][string]) {
    if (!question) return;
    saveAssessment(assessment.id, {
      results: { ...attempt?.results, [question.id]: result },
    });
  }
  const result = question && attempt?.results[question.id];
  return (
    <>
      <Link className="breadcrumb" to="/chapters/chapter-11">
        ← Chapter 11 roadmap
      </Link>
      <div className="eyebrow">
        CHECK YOUR UNDERSTANDING / SECTION {assessment.sectionNumber}
      </div>
      <h1>{assessment.title}</h1>
      <p className="intro">
        {assessment.introduction} This is a learning check, not a timed test.
        Your lesson mastery stays unchanged.
      </p>
      <section className="card lesson-card" aria-label="Assessment content">
        {!attempt ? (
          <>
            <h2>
              {assessment.questions.length} small checks. A clearer next step.
            </h2>
            <p>
              Try each question on your own first. Feedback and hints are
              available whenever you need them. Your report highlights first-try
              answers and concepts to revisit. This assessment awards no extra
              XP.
            </p>
            <button
              className="primary"
              onClick={() => saveAssessment(assessment.id, { results: {} })}
            >
              Start assessment →
            </button>
          </>
        ) : summary.complete ? (
          <>
            <div className="eyebrow">ASSESSMENT COMPLETE</div>
            <h2>Your next steps are clearer.</h2>
            <Meter label="First-try understanding" value={summary.percent} />
            <p>
              {summary.strong} of {summary.total} answered correctly on the
              first try without hints. Retries and supported answers are useful
              learning; they identify what to review.
            </p>
            <ul className="topic-list">
              {assessment.questions.map((q) => {
                const r = attempt.results[q.id]!;
                const strong = r.firstCorrect && !r.helpUsed;
                return (
                  <li key={q.id}>
                    <div>
                      <strong>{q.concept}</strong>
                      <p className="small">
                        {strong
                          ? "Strong first-try evidence"
                          : r.helpUsed
                            ? "Review suggested · Used support"
                            : "Review suggested · Needed a retry"}
                      </p>
                      {!strong && (
                        <>
                          {q.reviewRecommendation && (
                            <p className="small">{q.reviewRecommendation}</p>
                          )}
                          <Link to={q.reviewTo}>Review this concept →</Link>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="muted">
              This report describes your latest attempt, not permanent mastery.
              Retaking replaces this report and preserves your lesson progress.
            </p>
            <button
              className="secondary"
              onClick={() => saveAssessment(assessment.id, { results: {} })}
            >
              Retake assessment
            </button>
            <Link className="primary action" to="/">
              Back to dashboard →
            </Link>
          </>
        ) : question ? (
          <>
            <Meter
              label="Assessment progress"
              value={Math.round((summary.completed / summary.total) * 100)}
            />
            <div className="eyebrow">
              QUESTION {summary.completed + 1} OF {summary.total}
            </div>
            <h2>{question.concept}</h2>
            <Practice
              key={question.id}
              question={question}
              initialCorrect={result?.correct}
              initialHelpUsed={result?.helpUsed}
              onAnswer={(correct, helpUsed) =>
                saveResult(updateAssessmentAnswer(result, correct, helpUsed))
              }
              onHelp={() =>
                saveResult({
                  attempts: 0,
                  firstCorrect: false,
                  correct: false,
                  completed: false,
                  ...result,
                  helpUsed: true,
                })
              }
              onComplete={() => {
                if (result?.correct) saveResult({ ...result, completed: true });
              }}
            />
          </>
        ) : null}
      </section>
    </>
  );
}
export function AssessmentPage() {
  const { sectionNumber } = useParams();
  const assessment = assessments.find(
    (item) => item.sectionNumber === sectionNumber,
  );
  return assessment ? (
    <AssessmentExperience key={assessment.id} assessment={assessment} />
  ) : (
    <>
      <h1>Assessment not available</h1>
      <Link to="/chapters/chapter-11">Return to Chapter 11</Link>
    </>
  );
}
