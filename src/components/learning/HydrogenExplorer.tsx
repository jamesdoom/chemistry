import { DiagramFrame } from "./DiagramFrame";
import { useState } from "react";
import {
  hydrogenEnergy,
  hydrogenTransitions,
  hydrogenTransition,
} from "../../data/hydrogen";
export function HydrogenExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [selected, setSelected] = useState<string>("excite");
  const [revealed, setRevealed] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const transition = hydrogenTransition(selected);
  const y = (energy: number) => 40 - (energy / 2.18e-18) * 360;
  const required = [
    "excite",
    "return",
    "small-gap",
    "large-gap",
    "ionize-ground",
    "ionize-excited",
  ];
  return (
    <div className="hydrogen-explorer">
      <label htmlFor="hydrogen-transition">Choose a hydrogen transition</label>
      <select
        id="hydrogen-transition"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          setRevealed(false);
        }}
      >
        {hydrogenTransitions.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      <figure className="hydrogen-figure">
        <DiagramFrame label="Hydrogen energy diagram">
          <svg
            viewBox="0 0 520 445"
            role="img"
            aria-label={`Hydrogen energy diagram: n 1 lowest, n 2 and n 3 closer together, ionization at zero. ${revealed ? `Energy change ${transition.delta.toExponential(3)} joules.` : "Reveal the selected transition."}`}
          >
            <defs>
              <marker
                id="hydrogen-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#c0b4ff" />
              </marker>
            </defs>
            <text x="25" y="20">
              Energy ↑
            </text>
            <line
              x1="65"
              x2="280"
              y1="40"
              y2="40"
              className="ionization-limit"
            />
            <text x="295" y="45">
              Free electron: 0 J
            </text>
            {[3, 2, 1].map((n) => (
              <g key={n}>
                <line
                  x1="65"
                  x2="280"
                  y1={y(hydrogenEnergy(n))}
                  y2={y(hydrogenEnergy(n))}
                  className="energy-level"
                />
                <text x="295" y={y(hydrogenEnergy(n)) + 5}>
                  n = {n}: {hydrogenEnergy(n).toExponential(2)} J
                </text>
              </g>
            ))}
            <circle
              cx="90"
              cy={y(revealed ? transition.final : transition.initial)}
              r="6"
              className="energy-state"
            />
            {revealed && (
              <line
                x1="205"
                x2="205"
                y1={y(transition.initial)}
                y2={y(transition.final)}
                className="energy-transition"
                markerEnd="url(#hydrogen-arrow)"
              />
            )}
            <text x="25" y="432">
              Energy states, not positions or electron paths
            </text>
          </svg>
        </DiagramFrame>
        <figcaption>
          Approximate hydrogen energies from Eₙ = −2.18 × 10⁻¹⁸ J / n². Heights
          follow the energy scale; n = 4, 5, … exist closer to zero but are
          omitted for clarity. The free-electron threshold is not another bound
          level.
        </figcaption>
      </figure>
      <button
        className="secondary"
        disabled={revealed}
        onClick={() => {
          setRevealed(true);
          setVisited((v) => Array.from(new Set([...v, selected])));
        }}
      >
        Reveal hydrogen transition
      </button>
      <div aria-live="polite">
        {revealed && (
          <div className="hint">
            <p>
              <strong>
                {transition.ionization
                  ? "Ionization: the electron becomes unbound."
                  : transition.delta > 0
                    ? "Absorption: the atom gains energy."
                    : "Emission: the atom loses energy."}
              </strong>
            </p>
            <p>
              Atom energy change: {transition.delta.toExponential(3)} J.{" "}
              {transition.ionization
                ? "Minimum energy required"
                : "Photon energy"}
              : {transition.photonEnergy.toExponential(3)} J.
            </p>
            <p>
              {transition.ionization
                ? "This input reaches the threshold with zero electron kinetic energy. Additional input can become the free electron’s kinetic energy. An excited atom needs less energy to ionize than a ground-state atom."
                : transition.to === 1
                  ? "The final state is n = 1: the ground state. The emitted photon carries positive energy equal to the decrease in the atom’s energy."
                  : transition.delta > 0
                    ? "The electron remains bound in an excited state. A matching photon supplies this allowed gap; excitation is different from ionization."
                    : "The final state n = 2 is still excited. Returning to a lower state does not always mean returning to the ground state."}
            </p>
          </div>
        )}
      </div>
      <ul className="exploration-checklist">
        {hydrogenTransitions.map((t) => (
          <li key={t.id}>
            {visited.includes(t.id) ? "✓ Explored" : "Still to explore"} ·{" "}
            {t.label}
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
