import { useState } from "react";
import { periodicAtoms, periodicGroups } from "../../data/periodicTable";
import { ValenceVisual } from "./ValenceVisual";
export function PeriodicExplorer({
  initialAtomicNumber,
  requiredAtomicNumbers,
  onComplete,
  continueLabel,
}: {
  initialAtomicNumber: number;
  requiredAtomicNumbers: number[];
  onComplete: () => void;
  continueLabel: string;
}) {
  const [selected, setSelected] = useState(initialAtomicNumber);
  const [visited, setVisited] = useState<number[]>([initialAtomicNumber]);
  const atom = periodicAtoms.find((a) => a.atomicNumber === selected)!;
  const ready = requiredAtomicNumbers.every((n) => visited.includes(n));
  function select(number: number) {
    setSelected(number);
    setVisited((current) => Array.from(new Set([...current, number])));
  }
  return (
    <div className="periodic-explorer">
      <p className="small muted">
        Columns are groups; rows are periods. Groups 3–12 are omitted because
        they contain none of the first 18 elements.
      </p>
      <div
        className="compact-periodic-table"
        aria-label="First 18 elements of the periodic table"
      >
        <span className="table-corner" aria-hidden="true">
          P / G
        </span>
        {periodicGroups.map((group, index) => (
          <span
            className="group-label"
            key={group}
            style={{ gridColumn: index + 2, gridRow: 1 }}
          >
            {" "}
            {group}
          </span>
        ))}
        {[1, 2, 3].map((period) => (
          <span
            className="period-label"
            key={period}
            style={{ gridColumn: 1, gridRow: period + 1 }}
          >
            {period}
          </span>
        ))}
        {periodicAtoms.map((element) => (
          <button
            key={element.atomicNumber}
            type="button"
            aria-pressed={selected === element.atomicNumber}
            aria-label={`${element.name}, atomic number ${element.atomicNumber}, period ${element.period}, group ${element.group}`}
            className="element-button"
            style={{
              gridColumn: periodicGroups.indexOf(element.group) + 2,
              gridRow: element.period + 1,
            }}
            onClick={() => select(element.atomicNumber)}
          >
            <small>{element.atomicNumber}</small>
            <strong>{element.symbol}</strong>
          </button>
        ))}
      </div>
      <div className="element-detail" aria-live="polite" aria-atomic="true">
        <h3>
          {atom.name}: period {atom.period}, group {atom.group}
        </h3>
        <p>
          {atom.name} has {atom.valenceElectrons} valence electron
          {atom.valenceElectrons === 1 ? "" : "s"} in level {atom.period}.{" "}
          {atom.atomicNumber === 2
            ? "Helium is the exception: two electrons fill the first level, and helium belongs to the noble-gas column, group 18."
            : atom.group <= 2
              ? `Its outer s sublevel places it in group ${atom.group}.`
              : `For this p-block atom, ${atom.valenceElectrons} outer electrons correspond to group ${atom.group}.`}
        </p>
        <ValenceVisual atomicNumber={atom.atomicNumber} />
      </div>
      <div className="exploration-checklist">
        <p className="small">Compare these atoms before moving on:</p>
        <ul>
          {requiredAtomicNumbers.map((n) => (
            <li key={n}>
              {visited.includes(n) ? "✓ Explored" : "Still to explore"} ·{" "}
              {periodicAtoms.find((a) => a.atomicNumber === n)!.name}
            </li>
          ))}
        </ul>
      </div>
      <button className="primary next" disabled={!ready} onClick={onComplete}>
        {continueLabel}
      </button>
    </div>
  );
}
