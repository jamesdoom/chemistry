import { Link } from "react-router-dom";
import { focusedLessons } from "../data/focusedLessons";
import { useProgress } from "../context/ProgressContext";
import { topicMastery } from "../utils/learning";
import { Meter } from "../components/progress/Meter";
export function AtomicRadiusPathPage() {
  const { progress } = useProgress();
  const next =
    focusedLessons.find(
      (l) =>
        !l.steps.every((s) =>
          progress.topics[l.topicId]?.completedSteps.includes(s.id),
        ),
    ) ?? focusedLessons[0]!;
  return (
    <>
      <div className="eyebrow">CURRENT LEARNING PATH · SECTION 11.4</div>
      <h1>Atomic size: understand it, then graph it.</h1>
      <p className="intro">
        Use electron configurations to explain atomic size. Build the reasoning
        first, then practice reading and graphing the repeating pattern.
      </p>
      <Link className="primary action" to={`/lessons/${next.id}`}>
        Continue atomic-radius path →
      </Link>
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
