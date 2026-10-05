import { Link } from "react-router-dom";
import { chapter11, lessons } from "../data/chapters/chapter11";
import { useProgress } from "../context/ProgressContext";
import { nextLearningLesson, topicMastery } from "../utils/learning";
import { Meter } from "../components/progress/Meter";
export function Dashboard() {
  const { progress } = useProgress();
  const current = nextLearningLesson(progress);
  const allTopics = chapter11.sections.flatMap((s) => s.topics);
  const chapterMastery = Math.round(
    allTopics.reduce(
      (sum, topic) =>
        sum + topicMastery(topic.id, progress.topics[topic.id]).percent,
      0,
    ) / allTopics.length,
  );
  const totalSteps = lessons.reduce(
    (sum, lesson) => sum + lesson.steps.length,
    0,
  );
  const completedSteps = lessons.reduce(
    (sum, lesson) =>
      sum +
      lesson.steps.filter((s) =>
        progress.topics[lesson.topicId]?.completedSteps.includes(s.id),
      ).length,
    0,
  );
  const currentComplete = current.steps.every((s) =>
    progress.topics[current.topicId]?.completedSteps.includes(s.id),
  );
  return (
    <>
      <div className="eyebrow">YOUR LEARNING SPACE</div>
      <h1>
        A little clearer.
        <br />
        <span>One atom at a time.</span>
      </h1>
      <p className="intro">
        Chemistry makes more sense when you can see how the pieces fit. Let’s
        build that understanding together.
      </p>
      <div className="dashboard-grid">
        <section className="card hero-card">
          <div className="eyebrow">
            CHAPTER 11 <span className="badge">CURRENT CHAPTER</span>
          </div>
          <h2>Modern Atomic Theory</h2>
          <p>
            Discover how electrons are arranged—and what that tells us about an
            atom.
          </p>
          <div className="stats">
            <Meter label="Chapter mastery" value={chapterMastery} />
            <Meter
              label="Available lesson progress"
              value={Math.round((completedSteps / totalSteps) * 100)}
            />
          </div>
          <Link className="primary action" to={`/lessons/${current.id}`}>
            {currentComplete ? "Review current lesson" : "Continue learning"}{" "}
            <span>→</span>
          </Link>
          <p className="muted small">Section 11.4 · {current.title}</p>
        </section>
        <aside className="card focus-card">
          <div className="eyebrow">YOUR NEXT SMALL STEP</div>
          <div className="mini-element">
            <span>8</span>
            <strong>O</strong>
            <span>Oxygen</span>
          </div>
          <h3>{current.title}</h3>
          <p>{current.subtitle}</p>
          <span className="badge">ONE CONCEPT AT A TIME</span>
        </aside>
      </div>
      <section className="card orbital-invitation">
        <div>
          <div className="eyebrow">PUT THE RULES INTO PRACTICE</div>
          <h2>Fill the orbitals yourself</h2>
          <p>
            Build arrangements for the first 18 atoms, with feedback on Aufbau,
            Pauli, and Hund mistakes.
          </p>
        </div>
        <Link className="primary action" to="/practice/orbitals">
          Practice orbital filling →
        </Link>
      </section>
      <div className="section-heading">
        <h2>Your chapter roadmap</h2>
        <Link to="/chapters/chapter-11">Explore chapter →</Link>
      </div>
      <div className="roadmap">
        {chapter11.sections.map((section) => (
          <article
            className={`card roadmap-card ${section.id === "11.4" ? "current" : ""}`}
            key={section.id}
          >
            <span className="section-number">{section.number}</span>
            <h3>{section.title}</h3>
            <p className="muted">
              {section.id === "11.4"
                ? `Start here · ${section.topics.filter((t) => t.lessonId).length} lessons available`
                : "Not started · Lessons coming later"}
            </p>
            {section.id === "11.4" && (
              <Link to={`/lessons/${current.id}`}>Open lesson →</Link>
            )}
          </article>
        ))}
      </div>
      <div className="section-heading">
        <h2>Your available lessons</h2>
      </div>
      {lessons.map((lesson) => {
        const topic = progress.topics[lesson.topicId];
        const mastery = topicMastery(lesson.topicId, topic);
        const completed = lesson.steps.filter((s) =>
          topic?.completedSteps.includes(s.id),
        ).length;
        return (
          <section
            className="card progress-summary"
            aria-label={`Progress: ${lesson.topicId}`}
            key={lesson.id}
          >
            <div>
              <div className="eyebrow">
                {current.id === lesson.id && !currentComplete
                  ? "CURRENT LESSON"
                  : completed === lesson.steps.length
                    ? "LESSON COMPLETE"
                    : "BUILDING UNDERSTANDING"}
              </div>
              <h3>{lesson.title}</h3>
              <p>
                {mastery.state === "NOT_STARTED"
                  ? "Your first practice will give us a starting point."
                  : mastery.percent < 80
                    ? "Keep practicing this topic to strengthen your understanding."
                    : "Strong work. Revisit the lesson whenever you need a refresher."}
              </p>
              <Link className="lesson-link" to={`/lessons/${lesson.id}`}>
                {completed === lesson.steps.length
                  ? "Review lesson"
                  : "Open this lesson"}{" "}
                →
              </Link>
            </div>
            <div>
              <Meter
                label="Lesson completion"
                value={Math.round((completed / lesson.steps.length) * 100)}
              />
              <Meter label="Topic mastery" value={mastery.percent} />
              <span className="muted">
                {mastery.state.replaceAll("_", " ")} · {completed} of{" "}
                {lesson.steps.length} steps complete
              </span>
            </div>
          </section>
        );
      })}
    </>
  );
}
