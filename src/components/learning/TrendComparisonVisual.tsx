import { useId, useState } from "react";
import { trendComparisons } from "../../data/atomicTrends";
import { periodicAtoms } from "../../data/periodicTable";
import { solutionArrangement, occupiedSlots } from "../../utils/orbitals";
import { sublevels } from "../../data/practice/orbitals";
export function TrendComparisonVisual({
  comparisonId,
}: {
  comparisonId: string;
}) {
  const comparison = trendComparisons.find((c) => c.id === comparisonId);
  const gradientId = useId();
  const [showRemoval, setShowRemoval] = useState(false);
  if (!comparison) return null;
  return (
    <figure className="trend-comparison">
      <div className="trend-atom-pair">
        {comparison.atomicNumbers.map((number) => {
          const atom = periodicAtoms.find((a) => a.atomicNumber === number)!;
          const favored = number === comparison.favoredAtomicNumber;
          const configuration = atom.configuration.filter(
            (part) => Number(part.label[0]) === atom.period,
          );
          const arrangement = solutionArrangement(number);
          const cloudRadius = favored ? 68 : 44;
          return (
            <article className="trend-atom-card" key={number}>
              <div className="trend-atom-heading">
                <strong>{atom.symbol}</strong>
                <span>{atom.name}</span>
              </div>
              {comparison.property === "size" ? (
                <svg
                  viewBox="0 0 180 160"
                  role="img"
                  aria-label={`${atom.name}: qualitatively ${favored ? "larger" : "smaller"} electron cloud, not to scale`}
                >
                  <defs>
                    <radialGradient id={`${gradientId}-${number}`}>
                      <stop offset="0" stopColor="#b8b0ff" stopOpacity=".55" />
                      <stop
                        offset=".65"
                        stopColor="#9c95e9"
                        stopOpacity=".25"
                      />
                      <stop offset="1" stopColor="#9c95e9" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="90"
                    cy="80"
                    r={cloudRadius}
                    fill={`url(#${gradientId}-${number})`}
                  />
                  <circle cx="90" cy="80" r="10" fill="#e4defc" />
                  <text
                    x="90"
                    y="84"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#201a35"
                  >
                    +
                  </text>
                </svg>
              ) : (
                <>
                  <p className="trend-outer-label">Outer configuration</p>
                  <p className="trend-config">
                    {configuration.map((part) => (
                      <span key={part.label}>
                        {part.label}
                        <sup>{part.count}</sup>{" "}
                      </span>
                    ))}
                  </p>
                  <div className="trend-outer-orbitals">
                    {sublevels
                      .filter((level) => Number(level.label[0]) === atom.period)
                      .map((level) => (
                        <div className="orbital-row" key={level.label}>
                          <span>{level.label}</span>
                          {level.orbitals.map((id) => (
                            <span
                              key={id}
                              className="orbital"
                              aria-label={`${id}: ${
                                occupiedSlots(arrangement, id)
                                  .map((spin) =>
                                    spin === "up" ? "spin up" : "spin down",
                                  )
                                  .join(", ") || "empty"
                              }`}
                            >
                              {occupiedSlots(arrangement, id)
                                .map((spin) => (spin === "up" ? "↑" : "↓"))
                                .join("") || "·"}
                            </span>
                          ))}
                        </div>
                      ))}
                  </div>
                </>
              )}
              <span className="trend-result">
                {comparison.property === "size"
                  ? favored
                    ? "Larger atom"
                    : "Smaller atom"
                  : favored
                    ? "Higher first ionization energy"
                    : "Lower first ionization energy"}
              </span>
              <dl className="trend-facts">
                <div>
                  <dt>Protons</dt>
                  <dd>{number}</dd>
                </div>
                <div>
                  <dt>Outer occupied level</dt>
                  <dd>{atom.period}</dd>
                </div>
                <div>
                  <dt>Inner electrons</dt>
                  <dd>{number - atom.valenceElectrons}</dd>
                </div>
              </dl>
              {comparison.property === "ionization" && showRemoval && (
                <p
                  className="ionization-equation"
                  aria-label={`${atom.name} gas plus energy gives a positive ion and an electron`}
                >
                  {atom.symbol}(g) + energy → {atom.symbol}
                  <sup>+</sup>(g) + e<sup>−</sup>
                </p>
              )}
            </article>
          );
        })}
      </div>
      <figcaption>
        {comparison.property === "size"
          ? "Qualitative cloud sketches—not measured radii or a fixed scale. The + marks the nucleus; the cloud fades rather than ending at a sharp surface. No circles here represent electron paths."
          : "Each box is an orbital and each arrow is an electron spin. Higher first ionization energy means more energy must be supplied to remove one electron from a neutral gaseous atom."}
      </figcaption>
      {comparison.property === "ionization" && (
        <button
          className="secondary"
          aria-expanded={showRemoval}
          onClick={() => setShowRemoval((v) => !v)}
        >
          {showRemoval ? "Hide" : "Show"} the removal process
        </button>
      )}
      <div className="trend-reason">
        <strong>
          {comparison.exception
            ? "An important exception"
            : "What explains the comparison"}
        </strong>
        <p>{comparison.explanation}</p>
        <p className="small">{comparison.reason}</p>
      </div>
    </figure>
  );
}
