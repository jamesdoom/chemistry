import { DiagramFrame } from "./DiagramFrame";
import { useState } from "react";
import {
  energyComparisons,
  spinPairs,
  sublevelCapacities,
} from "../../data/multiElectron";
export function MultiElectronExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [model, setModel] = useState<(typeof energyComparisons)[number]>(
    energyComparisons[0],
  );
  const [sublevel, setSublevel] = useState(sublevelCapacities[0]!);
  const [pair, setPair] = useState<(typeof spinPairs)[number] | null>(null);
  const [visited, setVisited] = useState<string[]>(["hydrogen", "s"]);
  const required = [
    "hydrogen",
    "multi",
    "s",
    "p",
    "d",
    "f",
    "opposite",
    "same",
  ];
  function visit(id: string) {
    setVisited((v) => (v.includes(id) ? v : [...v, id]));
  }
  return (
    <div className="multi-electron-explorer practice">
      <fieldset className="choice-fieldset">
        <legend>Compare n = 2 sublevel energies</legend>
        {energyComparisons.map((m) => (
          <label className="choice-option" key={m.id}>
            <input
              type="radio"
              name="energy-model"
              checked={model.id === m.id}
              onChange={() => {
                setModel(m);
                visit(m.id);
              }}
            />
            {m.label}
          </label>
        ))}
      </fieldset>
      <figure className="energy-comparison">
        <DiagramFrame label="Sublevel energy comparison" compact>
          <svg
            viewBox="0 0 440 220"
            role="img"
            aria-label={
              model.id === "hydrogen"
                ? "Hydrogen: 2s and three 2p orbitals at equal energy"
                : "Multi-electron model: 2s below three equal-energy 2p orbitals"
            }
          >
            <path className="energy-axis" d="M40 195V25L34 35M40 25L46 35" />
            <text x="15" y="18">
              E
            </text>
            <g className="energy-lines">
              <path d={`M85 ${model.sY}H155`} />
              {[220, 285, 350].map((x) => (
                <path key={x} d={`M${x} ${model.pY}h45`} />
              ))}
            </g>
            <text x="105" y={model.sY + 25}>
              2s
            </text>
            <text x="285" y={model.pY + 25}>
              2p
            </text>
          </svg>
        </DiagramFrame>
        <figcaption>
          Higher on the page means higher energy. Qualitative comparison, not
          measured gaps or a universal energy chart.
        </figcaption>
      </figure>
      <p className="hint" aria-live="polite">
        {model.explanation}
      </p>
      <fieldset className="choice-fieldset">
        <legend>Choose a sublevel to build its maximum capacity</legend>
        {sublevelCapacities.map((s) => (
          <label className="choice-option" key={s.letter}>
            <input
              type="radio"
              name="capacity"
              checked={sublevel.letter === s.letter}
              onChange={() => {
                setSublevel(s);
                visit(s.letter);
              }}
            />
            {s.letter} sublevel
          </label>
        ))}
      </fieldset>
      <div
        className="capacity-boxes"
        role="group"
        aria-label={`${sublevel.letter}: ${sublevel.count} orbitals, ${sublevel.capacity} electrons maximum`}
      >
        {Array.from({ length: sublevel.count }, (_, i) => (
          <span
            className="orbital"
            key={i}
            aria-label={`Orbital ${i + 1}: two opposite-spin electrons`}
          >
            ↑↓
          </span>
        ))}
      </div>
      <p aria-live="polite">
        {sublevel.letter}: {sublevel.count}{" "}
        {sublevel.count === 1 ? "orbital" : "orbitals"} × 2 electrons per
        orbital = <strong>{sublevel.capacity} electrons maximum</strong>. First
        available at n = {sublevel.firstLevel}. These are full-capacity
        diagrams, not an element’s configuration.
      </p>
      <fieldset className="choice-fieldset">
        <legend>Compare two proposed pairs in ONE orbital</legend>
        {spinPairs.map((p) => (
          <label className="choice-option" key={p.id}>
            <input
              type="radio"
              name="spin-pair"
              checked={pair?.id === p.id}
              onChange={() => {
                setPair(p);
                visit(p.id);
              }}
            />
            {p.arrows} · {p.label}
          </label>
        ))}
      </fieldset>
      <p className="hint" aria-live="polite">
        {pair?.feedback ?? "Choose a pair to check Pauli’s rule."}
      </p>
      <p>
        Arrows label spin projections along a chosen axis, not directions of
        travel. Spin is an intrinsic quantum property; an electron is not a tiny
        spinning ball.
      </p>
      <ul className="exploration-checklist">
        {required.map((id) => (
          <li key={id}>
            {visited.includes(id) ? "✓ Explored" : "Still to explore"} · {id}
          </li>
        ))}
      </ul>
      <button
        className="primary next"
        disabled={!required.every((id) => visited.includes(id))}
        onClick={onComplete}
      >
        {continueLabel}
      </button>
    </div>
  );
}
