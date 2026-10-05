import { useState } from "react";
import { scatteringCases } from "../../data/scattering";
export function ScatteringExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [selected, setSelected] = useState<string>(scatteringCases[0].id);
  const [revealed, setRevealed] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const current = scatteringCases.find((c) => c.id === selected)!;
  const ready = scatteringCases.every((c) => visited.includes(c.id));
  return (
    <div className="scattering-explorer">
      <label htmlFor="scattering-approach">Choose an approach</label>
      <select
        id="scattering-approach"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          setRevealed(false);
        }}
      >
        {scatteringCases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
      <figure className="scattering-figure">
        <svg
          viewBox="0 0 520 340"
          role="img"
          aria-label={
            revealed
              ? `${current.label}: ${current.observation}`
              : `${current.label}: reveal the path to see the outcome`
          }
        >
          <defs>
            <marker
              id="scattering-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>
          <circle cx="260" cy="176" r="128" className="atom-boundary" />
          <circle cx="260" cy="176" r="14" className="scattering-nucleus" />
          <text x="260" y="182" textAnchor="middle" className="nucleus-sign">
            +
          </text>
          <text x="280" y="211">
            Positive nucleus
          </text>
          <text x="260" y="324" textAnchor="middle">
            Approximate atom region
          </text>
          {revealed && (
            <path
              d={current.path}
              className="alpha-path"
              markerEnd="url(#scattering-arrow)"
            />
          )}
          <text x="18" y="245">
            Incoming alpha (+)
          </text>
        </svg>
        <figcaption>
          Qualitative sketch of a path near one nucleus, not the entire foil
          experiment. Nucleus enlarged; paths, distances, and angles are
          illustrative, not to scale. The boundary is not a solid wall.
          Electrons are omitted.
        </figcaption>
      </figure>
      <button
        className="secondary"
        disabled={revealed}
        onClick={() => {
          setRevealed(true);
          setVisited((v) => Array.from(new Set([...v, current.id])));
        }}
      >
        Reveal particle path
      </button>
      <div aria-live="polite">
        {revealed && (
          <div className="hint scattering-evidence">
            <p>
              <strong>Observed · {current.frequency}:</strong>{" "}
              {current.observation}
            </p>
            <p>
              <strong>Inferred structure:</strong> {current.inference}
            </p>
            <p>
              <strong>Why the path changes:</strong> {current.reason}
            </p>
          </div>
        )}
      </div>
      <ul className="exploration-checklist">
        {scatteringCases.map((c) => (
          <li key={c.id}>
            {visited.includes(c.id) ? "✓ Explored" : "Still to explore"} ·{" "}
            {c.label}
          </li>
        ))}
      </ul>
      <p className="muted small">
        In a broad beam, most paths pass far from nuclei. Selecting a case here
        does not show its probability or generate experimental measurements.
      </p>
      <button className="primary next" disabled={!ready} onClick={onComplete}>
        {continueLabel}
      </button>
    </div>
  );
}
