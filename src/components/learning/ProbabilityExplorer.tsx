import { useState } from "react";
import { probabilitySamples } from "../../data/probabilityCloud";
export function ProbabilityExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [count, setCount] = useState(1);
  const [boundary, setBoundary] = useState(80);
  const [changed, setChanged] = useState(false);
  return (
    <div className="probability-explorer">
      <p>
        Each dot below represents one position measurement from a separately
        prepared hydrogen atom in the same 1s state. Adding dots combines
        independent outcomes; it does not trace one electron over time.
      </p>
      <div className="cloud-actions">
        {[1, 40, 240].map((n) => (
          <button
            key={n}
            className="secondary"
            aria-pressed={count === n}
            onClick={() => setCount(n)}
          >
            Show {n} {n === 1 ? "outcome" : "outcomes"}
          </button>
        ))}
      </div>
      <label htmlFor="cloud-boundary">
        Drawing guide radius: {boundary} illustration units
      </label>
      <input
        id="cloud-boundary"
        type="range"
        min="35"
        max="130"
        value={boundary}
        onChange={(e) => {
          setBoundary(Number(e.target.value));
          setChanged(true);
        }}
      />
      <figure className="cloud-figure">
        <svg
          viewBox="0 0 500 380"
          role="img"
          aria-label={`${count} independent synthetic position outcomes, projected from 3D onto the page. Dots form a probability pattern, not a connected path. Dashed drawing guide radius ${boundary}.`}
        >
          <defs>
            <radialGradient id="cloud-shading">
              <stop offset="0" stopColor="#c0b4ff" stopOpacity=".35" />
              <stop offset="1" stopColor="#c0b4ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="250" cy="190" r="165" fill="url(#cloud-shading)" />
          <circle cx="250" cy="190" r={boundary} className="cloud-boundary" />
          {probabilitySamples.slice(0, count).map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r="2"
              className="cloud-outcome"
            />
          ))}
          <circle cx="250" cy="190" r="4" className="scattering-nucleus" />
          <text x="250" y="355" textAnchor="middle">
            Independent outcomes—not an electron trail
          </text>
        </svg>
        <figcaption>
          Synthetic hydrogen 1s samples projected from three dimensions; not
          measured data. Soft shading is qualitative and not calibrated
          probability density. The nucleus is enlarged. A finite drawing window
          does not imply a hard edge to an orbital.
        </figcaption>
      </figure>
      <p className="hint" aria-live="polite">
        {count === 1
          ? "One measurement gives one outcome. It cannot reveal a full probability pattern or an electron’s route."
          : `${count} outcomes begin to reveal where measurements are more common. Hydrogen still has only one electron per prepared atom. Dots are not connected because these outcomes are not a time sequence.`}{" "}
        Moving the dashed guide changes the drawing, not the state or its
        probabilities. It is not a wall.
      </p>
      <p>
        The 1s probability distribution is spherical in three dimensions. Other
        orbitals have different distributions; this one example does not
        describe every orbital.
      </p>
      <ul className="exploration-checklist">
        <li>
          {count === 240 ? "✓ Explored" : "Still to explore"} · Show 240
          independent outcomes
        </li>
        <li>
          {changed ? "✓ Explored" : "Still to explore"} · Change the drawing
          guide
        </li>
      </ul>
      <button
        className="primary next"
        disabled={count !== 240 || !changed}
        onClick={onComplete}
      >
        {continueLabel}
      </button>
    </div>
  );
}
