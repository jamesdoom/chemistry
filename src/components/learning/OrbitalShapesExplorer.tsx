import { useState } from "react";
import { pOrientations, sublevelsForLevel } from "../../data/hydrogenOrbitals";

export function OrbitalShapesExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const [level, setLevel] = useState(2);
  const [selected, setSelected] = useState("2s");
  const [visited, setVisited] = useState<string[]>([]);
  const isP = selected.includes("p");
  const orientation = pOrientations.find((p) => selected.endsWith(p.id));
  const required = ["1s", "2s", "2px", "2py", "2pz", "level3"];
  function visit(id: string) {
    setVisited((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
  }
  const sublevels = sublevelsForLevel(level);
  return (
    <div className="orbital-shapes-explorer">
      <label htmlFor="orbital-level">Principal level n</label>
      <select
        id="orbital-level"
        value={level}
        onChange={(e) => {
          const n = Number(e.target.value);
          setLevel(n);
          setSelected(`${n}s`);
          visit(`${n}s`);
          if (n === 3) visit("level3");
        }}
      >
        {[1, 2, 3].map((n) => (
          <option key={n} value={n}>
            n = {n}
          </option>
        ))}
      </select>
      <p className="hint" aria-live="polite">
        Level {level}:{" "}
        {sublevels
          .map(
            (s) =>
              `${level}${s.letter} (${s.count} ${s.count === 1 ? "orbital" : "orbitals"})`,
          )
          .join(" + ")}{" "}
        = {sublevels.reduce((total, s) => total + s.count, 0)} orbitals. These
        count possible states, not electrons present.
      </p>
      <div
        className="shape-boxes"
        role="group"
        aria-label="Orbital boxes and orientations"
      >
        {sublevels.map((s) => (
          <div className="orbital-row" key={s.letter}>
            <strong>
              {level}
              {s.letter}
            </strong>
            {Array.from({ length: s.count }, (_, i) => {
              const id = `${level}${s.letter}${s.letter === "p" ? pOrientations[i]!.id : s.letter === "d" ? i + 1 : ""}`;
              return s.letter === "d" ? (
                <span
                  className="orbital"
                  key={id}
                  aria-label={`Empty ${id} orbital`}
                >
                  —
                </span>
              ) : (
                <button
                  className="orbital"
                  key={id}
                  aria-label={`Explore ${id} orbital`}
                  aria-pressed={selected === id}
                  onClick={() => {
                    setSelected(id);
                    visit(id);
                  }}
                >
                  {selected === id ? "↑" : "—"}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <p>
        One arrow represents hydrogen’s one electron in the selected state.
        Selecting a box compares possible states; it does not simulate a
        transition or an electron path. Empty boxes still represent orbitals.
      </p>
      <figure className="orbital-shape-figure">
        <svg
          viewBox="0 0 400 300"
          role="img"
          aria-label={`${selected}: ${isP ? "one orbital with two lobes, oriented along the " + orientation?.id + " axis" : "one spherical s orbital"}. Qualitative three-dimensional sketch.`}
        >
          <g className="shape-axes">
            <path d="M45 150H355 M85 245L315 55 M200 265V35" />
            <text x="365" y="155">
              x
            </text>
            <text x="325" y="50">
              y
            </text>
            <text x="195" y="25">
              z
            </text>
          </g>
          {isP ? (
            <g transform={`rotate(${-orientation!.angle} 200 150)`}>
              <ellipse cx="150" cy="150" rx="47" ry="27" />
              <ellipse cx="250" cy="150" rx="47" ry="27" />
            </g>
          ) : (
            <circle cx="200" cy="150" r="80" className="s-shape" />
          )}
          <circle cx="200" cy="150" r="4" className="shape-nucleus" />
        </svg>
        <figcaption>
          <strong>{selected}</strong> ·{" "}
          {isP
            ? "Two lobes belong to ONE orbital. The x, y, and z directions identify three different p orbitals with the same shape and energy."
            : "An s orbital has a spherical probability distribution: no preferred direction."}{" "}
          Axes show three dimensions projected onto a flat page. Surfaces are
          probability-region guides, not walls; the nucleus is enlarged. Shapes
          are not to scale; radial nodes of 2s/3s are omitted.
        </figcaption>
      </figure>
      <p>
        In the basic isolated-hydrogen model, all orbitals with the same n have
        equal energy: 2s and the three 2p orbitals share one energy. This
        differs from sublevel energies in atoms with several electrons. Fine
        details and applied fields are outside this lesson.
      </p>
      <p>
        d has five orbitals; their more complex shapes come later. The count
        pattern continues with f: seven orbitals, first available at n = 4.
      </p>
      <ul className="exploration-checklist">
        {required.map((id) => (
          <li key={id}>
            {visited.includes(id) ? "✓ Explored" : "Still to explore"} ·{" "}
            {id === "level3" ? "Level 3 counts" : id}
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
