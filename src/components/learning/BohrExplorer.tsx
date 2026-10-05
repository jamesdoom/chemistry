import { useState } from "react";
import { hydrogenEnergy } from "../../data/hydrogen";
export function BohrExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [n, setN] = useState(1);
  const [visited, setVisited] = useState([1]);
  return (
    <div className="bohr-explorer practice">
      <fieldset className="choice-fieldset">
        <legend>Choose a level in the historical model</legend>
        {[1, 2, 3].map((level) => (
          <label className="choice-option" key={level}>
            <input
              type="radio"
              name="bohr-level"
              value={level}
              checked={n === level}
              onChange={() => {
                setN(level);
                setVisited((v) => Array.from(new Set([...v, level])));
              }}
            />
            n = {level} · {level === 1 ? "Ground state" : "Excited state"}
          </label>
        ))}
      </fieldset>
      <figure className="bohr-figure">
        <svg
          viewBox="0 0 520 380"
          role="img"
          aria-label={`Historical Bohr picture with three circular allowed orbits. Selected level n ${n}, ${n === 1 ? "ground" : "excited"} state. Circles are model assumptions, not observed trajectories.`}
        >
          {[1, 2, 3].map((level) => (
            <circle
              key={level}
              cx="230"
              cy="190"
              r={16 * level * level}
              className={
                n === level ? "bohr-orbit selected-orbit" : "bohr-orbit"
              }
            />
          ))}
          <circle cx="230" cy="190" r="6" className="scattering-nucleus" />
          <circle
            cx={230 + 16 * n * n}
            cy="190"
            r="6"
            className="energy-state"
          />
          <text x="230" y="366" textAnchor="middle">
            Historical circular-orbit picture
          </text>
        </svg>
        <figcaption>
          Orbit radii follow the Bohr hydrogen ratio n²; overall size is
          enlarged, and particle sizes are not to scale. The electron marker
          labels the selected orbit; it is not a measured position or animation
          of real motion.
        </figcaption>
      </figure>
      <p className="hint" aria-live="polite">
        <strong>
          n = {n} · {n === 1 ? "Ground state" : "Excited but still bound"}
        </strong>
        <br />
        Approximate energy: {hydrogenEnergy(n).toExponential(2)} J. A larger
        orbit in this model has higher (less negative) energy. Energy gaps get
        smaller at higher n; they are not equal to differences between drawn
        radii.
      </p>
      <p>
        Bohr assumed allowed circular orbits with no continuous energy loss
        within an orbit. Photons are absorbed or emitted when the state changes.
        Modern quantum mechanics describes orbitals as probability
        distributions, not fixed circular paths.
      </p>
      <button
        className="primary next"
        disabled={!visited.includes(2) || !visited.includes(3)}
        onClick={onComplete}
      >
        {continueLabel}
      </button>
    </div>
  );
}
