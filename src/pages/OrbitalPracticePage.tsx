import { useState } from "react";
import { Link } from "react-router-dom";
import { orbitalExercises, orbitalRuleGuides } from "../data/practice/orbitals";
import { OrbitalFilling } from "../components/practice/OrbitalFilling";
import { useProgress } from "../context/ProgressContext";
import { Meter } from "../components/progress/Meter";
import { topicMastery } from "../utils/learning";
export function OrbitalPracticePage() {
  const [selected, setSelected] = useState(8);
  const { progress } = useProgress();
  const exercise = orbitalExercises[selected - 1]!;
  const topic = progress.topics[exercise.topicId];
  const mastery = topicMastery(exercise.topicId, topic);
  const solved = orbitalExercises.filter(
    (e) => topic?.results[e.id]?.correct,
  ).length;
  return (
    <>
      <Link className="breadcrumb" to="/lessons/first-18">
        ← Electron arrangements lesson
      </Link>
      <div className="eyebrow">SECTION 11.4 / INTERACTIVE PRACTICE</div>
      <h1>Build an electron arrangement.</h1>
      <p className="intro">
        Count the electrons. Choose their orbitals. Check the rules. Start with
        oxygen, or pick any of the first 18 atoms.
      </p>
      <div className="orbital-lab-layout">
        <section className="card orbital-lab">
          <div className="atom-picker">
            <label htmlFor="practice-atom">Choose a neutral atom</label>
            <select
              id="practice-atom"
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              {orbitalExercises.map((e) => (
                <option key={e.id} value={e.atomicNumber}>
                  {e.atomicNumber} · {e.name} ({e.symbol})
                  {topic?.results[e.id]?.correct ? " · Solved" : ""}
                </option>
              ))}
            </select>
          </div>
          <OrbitalFilling
            key={exercise.id}
            exercise={exercise}
            onNext={() => setSelected((n) => (n === 18 ? 1 : n + 1))}
          />
        </section>
        <aside className="card rules-card">
          <div className="eyebrow">THREE RULES, ONE ARRANGEMENT</div>
          {orbitalRuleGuides.map((guide) => (
            <section key={guide.rule}>
              <h2>{guide.rule}</h2>
              <p>{guide.text}</p>
            </section>
          ))}
          <Meter
            label="Atoms practiced successfully"
            value={Math.round((solved / orbitalExercises.length) * 100)}
          />
          <p className="small muted">
            {solved} of 18 atoms solved. Supported practice counts as
            completion.
          </p>
          <Meter label="Topic mastery" value={mastery.percent} />
          <p className="small muted">
            Includes the 3 lesson questions and 18 orbital exercises. New
            practice adds new mastery evidence; your earlier results are kept.
          </p>
          <p className="small muted">
            Results and XP save on this device. Changing atoms or refreshing
            clears the draft diagram.
          </p>
        </aside>
      </div>
    </>
  );
}
