import { periodicAtoms } from "../../data/periodicTable";
export function ValenceVisual({ atomicNumber }: { atomicNumber: number }) {
  const atom = periodicAtoms.find((a) => a.atomicNumber === atomicNumber);
  if (!atom) return null;
  return (
    <figure className="valence-visual">
      <div className="valence-heading">
        <div className="atom-tile">
          <span>{atom.atomicNumber}</span>
          <strong>{atom.symbol}</strong>
          <span>{atom.name}</span>
        </div>
        <div>
          <p className="muted small">
            Neutral {atom.name.toLowerCase()} · Ground state
          </p>
          <div
            className="valence-configuration"
            aria-label={`${atom.name} electron configuration`}
          >
            {atom.configuration.map((part) => {
              const outer = Number(part.label[0]) === atom.period;
              return (
                <span
                  key={part.label}
                  className={`configuration-entry ${outer ? "outer-entry" : ""}`}
                >
                  <span>
                    {part.label}
                    <sup>{part.count}</sup>
                  </span>
                  <small>{outer ? "outer" : "inner"}</small>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="electron-summary">
        <div>
          <span>All electrons</span>
          <strong>{atom.atomicNumber}</strong>
        </div>
        <div>
          <span>Outer (valence) electrons</span>
          <strong>{atom.valenceElectrons}</strong>
        </div>
        <div>
          <span>Highest occupied level</span>
          <strong>{atom.period}</strong>
        </div>
      </div>
      <figcaption>
        Count every superscript for the total. For valence electrons, add only
        the entries labeled outer:{" "}
        {atom.configuration
          .filter((p) => Number(p.label[0]) === atom.period)
          .map((p) => p.count)
          .join(" + ")}{" "}
        = {atom.valenceElectrons}.
      </figcaption>
    </figure>
  );
}
