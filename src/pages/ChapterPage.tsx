import { Link } from "react-router-dom";
import { chapter11, lessons } from "../data/chapters/chapter11";
import { useProgress } from "../context/ProgressContext";
import { topicMastery } from "../utils/learning";
import { assessments } from "../data/assessments";
export function ChapterPage() {
  const { progress } = useProgress();
  return (
    <>
      <Link className="breadcrumb" to="/">
        ← Learning dashboard
      </Link>
      <div className="eyebrow">CHAPTER 11</div>
      <h1>{chapter11.title}</h1>
      <p className="intro">
        Your map from atoms and energy to electron arrangements. Start with the
        available lessons in each section below.
      </p>
      <div className="chapter-sections">
        {chapter11.sections.map((section) => (
          <section className="card" key={section.id}>
            <div className="eyebrow">SECTION {section.number}</div>
            <h2>{section.title}</h2>
            <ul className="topic-list">
              {section.topics.map((topic) => {
                const assessment = assessments.find(
                  (item) => item.id === topic.assessmentId,
                );
                const status = topicMastery(
                  topic.id,
                  progress.topics[topic.id],
                );
                const lesson = lessons.find(
                  (item) => item.id === topic.lessonId,
                );
                const complete = lesson?.steps.every((s) =>
                  progress.topics[topic.id]?.completedSteps.includes(s.id),
                );
                return (
                  <li key={topic.id}>
                    <div>
                      {assessment ? (
                        <Link to={`/assessments/${assessment.sectionNumber}`}>
                          {topic.title} →
                        </Link>
                      ) : topic.lessonId ? (
                        <Link to={`/lessons/${topic.lessonId}`}>
                          {topic.title} →
                        </Link>
                      ) : (
                        <span>{topic.title}</span>
                      )}
                    </div>
                    <span className="muted small">
                      {topic.assessmentId
                        ? progress.assessments?.[topic.assessmentId]
                          ? "Assessment available · Resume or view report"
                          : "Assessment available · Not started"
                        : topic.lessonId
                          ? `${complete ? "Lesson complete" : status.state.replaceAll("_", " ")} · ${status.percent}% mastery`
                          : "Not started · Coming later"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
