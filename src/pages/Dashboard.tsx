import { Link } from "react-router-dom";
import { chapter11, lessons } from "../data/chapters/chapter11";
import { useProgress } from "../context/ProgressContext";
import { nextLearningLesson, topicMastery } from "../utils/learning";
import { Meter } from "../components/progress/Meter";
import { chapterSummary } from "../utils/chapterReview";
import { DashboardGroup } from "../components/ui/DashboardGroup";
import { assessments } from "../data/assessments";
export function Dashboard() {
  const { progress } = useProgress();
  const current = nextLearningLesson(progress);
  const currentSection = chapter11.sections.find((section) =>
    section.topics.some((topic) => topic.id === current.topicId),
  );
  const chapterMastery = chapterSummary(progress).mastery;
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
            <Meter label="Chapter lesson mastery" value={chapterMastery} />
            <Meter
              label="Available lesson progress"
              value={Math.round((completedSteps / totalSteps) * 100)}
            />
          </div>
          <Link className="primary action" to={`/lessons/${current.id}`}>
            {currentComplete ? "Review current lesson" : "Continue learning"}{" "}
            <span>→</span>
          </Link>
          <p className="muted small">
            {currentSection ? `Section ${currentSection.number}` : "Chapter 11"}{" "}
            · {current.title}
          </p>
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
      <section
        className="card orbital-invitation"
        aria-label="Whole-chapter review"
      >
        <div>
          <h2>Connect Chapter 11</h2>
          <p>
            See all 15 topics, check the connected story, and find review paths
            from your saved work.
          </p>
        </div>
        <Link className="primary action" to="/review/chapter-11">
          Open chapter review →
        </Link>
      </section>
      <DashboardGroup
        title={`Section checks · ${assessments.filter((a) => a.scope !== "chapter").length} assessments`}
      >
        {assessments
          .filter((a) => a.scope !== "chapter")
          .map((assessment) => (
            <section
              key={assessment.id}
              className="card orbital-invitation"
              aria-label={`Section assessment: ${assessment.sectionNumber}`}
            >
              <div>
                <div className="eyebrow">CONNECT THE SECTION TOPICS</div>
                <h2>{assessment.title}</h2>
                <p>
                  {assessment.introduction} {assessment.questions.length} mixed
                  checks with a saved report and review links. Assessment
                  evidence is separate from lesson mastery.
                </p>
              </div>
              <Link
                className="primary action"
                to={`/assessments/${assessment.sectionNumber}`}
              >
                {progress.assessments?.[assessment.id]
                  ? "Resume assessment or view report"
                  : "Open assessment"}{" "}
                →
              </Link>
            </section>
          ))}
      </DashboardGroup>
      <DashboardGroup
        title={`Section roadmap · ${chapter11.sections.length} sections`}
      >
        <div className="roadmap">
          {chapter11.sections.map((section) => (
            <article
              className={`card roadmap-card ${section.id === currentSection?.id ? "current" : ""}`}
              key={section.id}
            >
              <span className="section-number">{section.number}</span>
              <h3>{section.title}</h3>
              <p className="muted">
                {section.topics.some((topic) => topic.lessonId)
                  ? `${section.id === currentSection?.id ? "Current section" : "Available"} · ${section.topics.filter((t) => t.lessonId).length} lessons available`
                  : "Not started · Lessons coming later"}
              </p>
              {section.topics.some((topic) => topic.lessonId) && (
                <Link
                  to={`/lessons/${section.id === currentSection?.id ? current.id : section.topics.find((topic) => topic.lessonId)?.lessonId}`}
                >
                  Open lesson →
                </Link>
              )}
            </article>
          ))}
        </div>
      </DashboardGroup>
      <DashboardGroup title={`Lesson progress · ${lessons.length} lessons`}>
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
      </DashboardGroup>
    </>
  );
}
