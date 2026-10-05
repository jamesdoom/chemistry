import type { OrbitalArrangement } from "../../types/orbitals";
import { sublevels } from "../../data/practice/orbitals";
export function OrbitalBoard({
  arrangement,
  onChange,
  highlighted = [],
  disabled = false,
}: {
  arrangement: OrbitalArrangement;
  onChange?: (id: string, slot: number) => void;
  highlighted?: string[];
  disabled?: boolean;
}) {
  return (
    <figure className="filling-board">
      <div className="energy-label">Energy increases down this list ↓</div>
      {sublevels.map((sublevel) => (
        <div className="filling-row" key={sublevel.label}>
          <span className="sublevel-name">{sublevel.label}</span>
          <div className="orbital-boxes">
            {sublevel.orbitals.map((id, index) => (
              <div
                className={`filling-orbital ${highlighted.includes(id) ? "needs-review" : ""}`}
                key={id}
              >
                <div className="electron-slots">
                  {[0, 1].map((slot) => {
                    const spin = arrangement[id]?.[slot] ?? null;
                    const label = `${sublevel.label} orbital ${index + 1}, slot ${slot + 1}: ${spin === "up" ? "spin up" : spin === "down" ? "spin down" : "empty"}`;
                    return onChange ? (
                      <button
                        key={slot}
                        type="button"
                        disabled={disabled}
                        className={`electron-slot ${spin ? "occupied" : ""}`}
                        aria-label={label}
                        onClick={() => onChange(id, slot)}
                      >
                        {spin === "up" ? "↑" : spin === "down" ? "↓" : "·"}
                      </button>
                    ) : (
                      <span
                        key={slot}
                        className="electron-slot"
                        aria-label={label}
                      >
                        {spin === "up" ? "↑" : spin === "down" ? "↓" : "·"}
                      </span>
                    );
                  })}
                </div>
                <small>
                  orbital {index + 1}
                  {highlighted.includes(id) ? " · review" : ""}
                </small>
              </div>
            ))}
          </div>
        </div>
      ))}
      <figcaption>
        Boxes represent orbitals, not electron paths. ↑ and ↓ represent opposite
        spins, not motion. The three orbitals within a p sublevel have equal
        energy.
      </figcaption>
    </figure>
  );
}
