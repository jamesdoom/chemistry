import { DiagramFrame } from "./DiagramFrame";
import { useState } from "react";
import {
  energyTransitions,
  illustrativeLevels,
  illustrativeLines,
  transitionFacts,
} from "../../data/energyTransitions";
export function EmissionExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [selected, setSelected] = useState<string>("absorb");
  const [revealed, setRevealed] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [spectrum, setSpectrum] = useState("emission");
  const [spectraSeen, setSpectraSeen] = useState(["emission"]);
  const facts = transitionFacts(selected);
  const y = (energy: number) => 270 - energy * 40;
  const ready =
    ["absorb", "emit-small", "emit-large"].every((id) =>
      visited.includes(id),
    ) &&
    ["emission", "absorption", "continuous"].every((id) =>
      spectraSeen.includes(id),
    );
  return (
    <div className="emission-explorer">
      <label htmlFor="energy-transition">Choose a transition</label>
      <select
        id="energy-transition"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          setRevealed(false);
        }}
      >
        {energyTransitions.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      <figure className="energy-figure">
        <DiagramFrame label="Emission energy and spectrum diagram">
          <svg
            viewBox="0 0 520 330"
            role="img"
            aria-label={`Illustrative allowed levels A: 0, B: 2, C: 5. ${revealed ? `Atom energy change ${facts.delta}; photon energy ${facts.photonEnergy}; ${facts.absorption ? "absorption" : "emission"}.` : "Reveal the transition to see its energy change."}`}
          >
            <defs>
              <marker
                id="energy-arrow"
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
            <text x="25" y="30">
              Energy ↑ (illustrative units)
            </text>
            {illustrativeLevels.map((l) => (
              <g key={l.id}>
                <line
                  x1="85"
                  x2="370"
                  y1={y(l.energy)}
                  y2={y(l.energy)}
                  className="energy-level"
                />
                <text x="390" y={y(l.energy) + 5}>
                  {l.label}: {l.energy}
                </text>
              </g>
            ))}
            {revealed && (
              <line
                x1="235"
                x2="235"
                y1={y(facts.from.energy)}
                y2={y(facts.to.energy)}
                className="energy-transition"
                markerEnd="url(#energy-arrow)"
              />
            )}
            <circle
              cx="130"
              cy={y(revealed ? facts.to.energy : facts.from.energy)}
              r="7"
              className="energy-state"
            />
            <text x="25" y="313">
              ● marks the selected atom’s energy state
            </text>
          </svg>
        </DiagramFrame>
        <figcaption>
          Invented three-level model with unequal gaps; not measured levels of a
          real element. Energy height represents energy, not distance from a
          nucleus. The arrow is a change of state, not an electron’s travel
          path. All shown transitions are assumed allowed.
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
        Reveal energy transfer
      </button>
      <div aria-live="polite">
        {revealed && (
          <div className="hint">
            <p>
              <strong>
                {facts.absorption
                  ? "Absorption: photon energy enters the atom."
                  : "Emission: photon energy leaves the atom."}
              </strong>
            </p>
            <p>
              Atom energy change: {facts.to.energy} − {facts.from.energy} ={" "}
              {facts.delta > 0 ? "+" : ""}
              {facts.delta} units. Photon energy: {facts.photonEnergy} units.
            </p>
            <p>
              {facts.absorption
                ? "A photon matching this gap can excite an atom initially in A to B. The atom gains energy."
                : "The atom loses energy; the emitted photon carries a positive amount equal to the gap."}{" "}
              A larger gap means a higher-frequency, shorter-wavelength photon.
            </p>
          </div>
        )}
      </div>
      <h3>From allowed gaps to spectral lines</h3>
      <label htmlFor="spectrum-view">Choose a spectrum view</label>
      <select
        id="spectrum-view"
        value={spectrum}
        onChange={(e) => {
          const value = e.target.value;
          setSpectrum(value);
          setSpectraSeen((v) => Array.from(new Set([...v, value])));
        }}
      >
        <option value="emission">Emission lines</option>
        <option value="absorption">Absorption lines</option>
        <option value="continuous">Continuous light</option>
      </select>
      <figure className="spectrum-figure">
        <svg
          viewBox="0 0 520 135"
          role="img"
          aria-label={
            spectrum === "continuous"
              ? "Continuous intensity band across the displayed photon energies"
              : `${spectrum === "emission" ? "Bright" : "Dark"} lines at photon energies 2, 3, and 5 illustrative units`
          }
        >
          <rect
            x="40"
            y="20"
            width="420"
            height="45"
            fill={spectrum === "emission" ? "#070d18" : "#c0b4ff"}
          />
          {spectrum !== "continuous" &&
            illustrativeLines.map((e) => (
              <rect
                key={e}
                x={40 + e * 70 - 3}
                y="20"
                width="6"
                height="45"
                fill={spectrum === "emission" ? "#c0b4ff" : "#070d18"}
              />
            ))}
          {illustrativeLines.map((e) => (
            <text key={e} x={40 + e * 70} y="89" textAnchor="middle">
              {e}
            </text>
          ))}
          <text x="260" y="120" textAnchor="middle">
            Photon energy → (illustrative units)
          </text>
        </svg>
        <figcaption>
          Illustrative intensity band, not actual visible colors or a measured
          spectrum. Lines correspond to gaps B↔A = 2, C↔B = 3, C↔A = 5; these
          are photon energies, not the levels themselves.
        </figcaption>
      </figure>
      <p className="hint" aria-live="polite">
        {spectrum === "emission"
          ? "Excited atoms emit photons at particular allowed gaps. Bright lines appear against a darker background. Across many atoms prepared in different excited states, this model can produce all three lines."
          : spectrum === "absorption"
            ? "Light with a continuous range passes through atoms. Photons matching allowed gaps can be absorbed, leaving dark lines along the viewing direction. This sketch assumes atoms are present in the lower states needed for each transition; actual line strengths depend on state populations."
            : "Continuous light contains a broad range of photon energies. A line spectrum contains distinct energies rather than an unbroken band."}
      </p>
      <ul className="exploration-checklist">
        {[
          ["absorb", "Absorption A → B"],
          ["emit-small", "Emission B → A"],
          ["emit-large", "Emission C → A"],
        ].map(([id, label]) => (
          <li key={id}>
            {visited.includes(id!) ? "✓ Explored" : "Still to explore"} ·{" "}
            {label}
          </li>
        ))}
        {["emission", "absorption", "continuous"].map((id) => (
          <li key={id}>
            {spectraSeen.includes(id) ? "✓ Explored" : "Still to explore"} ·{" "}
            {id} spectrum
          </li>
        ))}
      </ul>
      <button className="primary next" disabled={!ready} onClick={onComplete}>
        {continueLabel}
      </button>
    </div>
  );
}
