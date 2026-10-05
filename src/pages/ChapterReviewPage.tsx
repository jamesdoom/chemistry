import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { chapterConnections } from "../data/chapterConnections";
import { chapterSummary, reviewRecommendations } from "../utils/chapterReview";
import { Meter } from "../components/progress/Meter";
export function ChapterReviewPage() {
  const { progress } = useProgress();
  const summary = chapterSummary(progress);
  const recommendations = reviewRecommendations(progress);
  return (
    <>
      <Link className="breadcrumb" to="/chapters/chapter-11">
        ← Chapter 11 roadmap
      </Link>
      <div className="eyebrow">CHAPTER 11 / CONNECT AND REVIEW</div>
      <h1>See how the pieces fit.</h1>
      <p className="intro">
        From scattering evidence to periodic properties: connect the ideas,
        check your reasoning, then revisit the concepts that need practice.
      </p>
      <section className="card" aria-label="Chapter review progress">
        <Meter label="Chapter lesson mastery" value={summary.mastery} />
        <p>
          {summary.completed} of {summary.total} curriculum entries complete.
          Lesson completion and assessment completion are counted separately
          from mastery. Assessment percentages describe first-try understanding.
        </p>
        <Link className="primary action" to="/assessments/chapter-11">
          Open mixed chapter check →
        </Link>
      </section>
      <section
        className="card review-paths"
        aria-label="Recommended review paths"
      >
        <h2>Your next review paths</h2>
        <p>
          Lesson mastery below 80% after practice, or a retry/help request in
          your latest assessment, suggests review. Untouched topics are starting
          points, not diagnosed weaknesses.
        </p>
        {recommendations.length ? (
          <ul className="topic-list">
            {recommendations.map((r, i) => (
              <li key={r.to}>
                <div>
                  <h3>
                    {i === 0 ? "Start here: " : ""}
                    {r.title}
                  </h3>
                  <ul>
                    {r.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                  <Link className="lesson-link" to={r.to}>
                    Review this lesson →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No weak-topic evidence yet. Take the mixed chapter check to find a
            review path, or open an unfinished topic below.
          </p>
        )}
      </section>
      <section aria-label="Chapter concept connections">
        <h2>The connected story</h2>
        <ol className="review-connections">
          {chapterConnections.map((c) => (
            <li className="card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <Link to={c.to}>Explore this connection →</Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="card" aria-label="All 15 curriculum topics">
        <h2>All 15 curriculum entries</h2>
        <p>
          Progress below comes from your saved work on this browser. The mixed
          chapter check is extra review and does not add a sixteenth curriculum
          entry.
        </p>
        <ul className="topic-list">
          {summary.entries.map((e) => (
            <li key={e.id}>
              <div>
                <span className="eyebrow">
                  SECTION {e.section} · {e.kind}
                </span>
                <h3>
                  <Link to={e.to}>{e.title} →</Link>
                </h3>
                <p>{e.status}</p>
                {!e.started && <span className="muted">Ready to start</span>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
