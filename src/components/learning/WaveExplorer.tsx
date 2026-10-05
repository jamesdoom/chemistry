import { useState } from "react";
import { lightProperties } from "../../utils/light";
export function WaveExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [wavelength, setWavelength] = useState(600);
  const [amplitude, setAmplitude] = useState(1);
  const [explored, setExplored] = useState<string[]>([]);
  const facts = lightProperties(wavelength);
  const mark = (id: string) =>
    setExplored((old) => Array.from(new Set([...old, id])));
  const period = wavelength / 4;
  const path = Array.from(
    { length: 481 },
    (_, x) =>
      `${x === 0 ? "M" : "L"} ${x + 20} ${120 - 35 * amplitude * Math.cos((2 * Math.PI * x) / period)}`,
  ).join(" ");
  const ready = ["short", "long", "amplitude"].every((id) =>
    explored.includes(id),
  );
  return (
    <div className="wave-explorer">
      <label htmlFor="wavelength">Wavelength λ: {wavelength} nm</label>
      <input
        id="wavelength"
        type="range"
        min="400"
        max="700"
        step="10"
        value={wavelength}
        onChange={(e) => {
          const value = Number(e.target.value);
          setWavelength(value);
          if (value <= 450) mark("short");
          if (value >= 650) mark("long");
        }}
      />
      <label htmlFor="amplitude">
        Relative field amplitude: {amplitude.toFixed(1)}
      </label>
      <input
        id="amplitude"
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={amplitude}
        onChange={(e) => {
          setAmplitude(Number(e.target.value));
          mark("amplitude");
        }}
      />
      <figure className="wave-figure">
        <svg
          viewBox="0 0 520 240"
          role="img"
          aria-label={`Electric field versus distance at one instant. Wavelength ${wavelength} nanometers; relative amplitude ${amplitude}.`}
        >
          <line x1="20" y1="120" x2="500" y2="120" className="wave-axis" />
          <path d={path} className="wave-path" />
          <line
            x1="20"
            y1="22"
            x2={20 + period}
            y2="22"
            className="wave-measure"
          />
          <text x={20 + period / 2} y="16" textAnchor="middle">
            λ: crest to crest
          </text>
          <text x="260" y="224" textAnchor="middle">
            Distance → (same scale for every wavelength)
          </text>
        </svg>
        <figcaption>
          A spatial snapshot of an electric field, not a photon’s travel path.
          Frequency counts cycles passing a fixed point each second; it is
          calculated here using light’s vacuum speed.
        </figcaption>
      </figure>
      <div className="wave-readouts" aria-live="polite">
        <p>
          <strong>Frequency ν</strong>
          <br />
          {facts.frequency.toExponential(2)} Hz
        </p>
        <p>
          <strong>Energy per photon E</strong>
          <br />
          {facts.photonEnergy.toExponential(2)} J
        </p>
      </div>
      <p className="hint">
        Shorter wavelength → higher frequency → more energy per photon. Changing
        amplitude changes intensity at a fixed frequency, not the energy of each
        photon.
      </p>
      <ul className="exploration-checklist">
        {[
          ["short", "Try 450 nm or shorter"],
          ["long", "Try 650 nm or longer"],
          ["amplitude", "Change amplitude while keeping wavelength fixed"],
        ].map(([id, label]) => (
          <li key={id}>
            {explored.includes(id!) ? "✓ Explored" : "Still to explore"} ·{" "}
            {label}
          </li>
        ))}
      </ul>
      <button className="primary next" disabled={!ready} onClick={onComplete}>
        {continueLabel}
      </button>
    </div>
  );
}
