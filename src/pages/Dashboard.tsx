import { Link } from "react-router-dom";
import { chapter11, firstLesson, topicId } from "../data/chapters/chapter11";
import { useProgress } from "../context/ProgressContext";
import { topicMastery } from "../utils/learning";
import { Meter } from "../components/progress/Meter";
export function Dashboard() {
  const { progress } = useProgress();
  const topic = progress.topics[topicId];
  const mastery = topicMastery(topicId, topic);
  const completed = firstLesson.steps.filter((s) =>
    topic?.completedSteps.includes(s.id),
  ).length;
  const allTopics = chapter11.sections.flatMap((s) => s.topics);
  const chapterMastery = Math.round(
    allTopics.reduce(
      (sum, item) =>
        sum + topicMastery(item.id, progress.topics[item.id]).percent,
      0,
    ) / allTopics.length,
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
              value={Math.round((completed / firstLesson.steps.length) * 100)}
            />
          </div>
          <Link className="primary action" to="/lessons/first-18">
            {completed === firstLesson.steps.length
              ? "Review lesson"
              : "Continue learning"}{" "}
            <span>→</span>
          </Link>
          <p className="muted small">
            Section 11.4 · Electron arrangements · ~12 min
          </p>
        </section>
        <aside className="card focus-card">
          <div className="eyebrow">YOUR NEXT SMALL STEP</div>
          <div className="mini-element">
            <span>8</span>
            <strong>O</strong>
            <span>Oxygen</span>
          </div>
          <h3>
            From atomic number
            <br />
            to electron address.
          </h3>
          <p>Learn what 1s² 2s² 2p⁴ actually means.</p>
          <span className="badge">NO MEMORIZATION REQUIRED TO START</span>
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
                ? "Start here · 1 lesson available"
                : "Not started · Lessons coming later"}
            </p>
            {section.id === "11.4" && (
              <Link to="/lessons/first-18">Open lesson →</Link>
            )}
          </article>
        ))}
      </div>
      <section className="card progress-summary">
        <div>
          <div className="eyebrow">BUILDING UNDERSTANDING</div>
          <h3>Electron arrangements</h3>
          <p>
            {mastery.state === "NOT_STARTED"
              ? "Your first practice will give us a starting point."
              : mastery.percent < 80
                ? "Keep practicing this topic to strengthen your understanding."
                : "Strong work. Revisit the lesson whenever you need a refresher."}
          </p>
        </div>
        <div>
          <Meter label="Topic mastery" value={mastery.percent} />
          <span className="muted">
            {mastery.state.replaceAll("_", " ")} · {progress.xp} XP earned
          </span>
        </div>
      </section>
    </>
  );
}
