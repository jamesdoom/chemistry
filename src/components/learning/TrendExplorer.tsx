import { useState } from "react";
import { trendComparisons } from "../../data/atomicTrends";
import { TrendComparisonVisual } from "./TrendComparisonVisual";
export function TrendExplorer({
  initialComparisonId,
  requiredComparisonIds,
  onComplete,
  continueLabel,
}: {
  initialComparisonId: string;
  requiredComparisonIds: string[];
  onComplete: () => void;
  continueLabel: string;
}) {
  const [selected, setSelected] = useState(initialComparisonId);
  const [visited, setVisited] = useState([initialComparisonId]);
  const comparison = trendComparisons.find((c) => c.id === selected)!;
  const ready = requiredComparisonIds.every((id) => visited.includes(id));
  return (
    <div className="trend-explorer">
      <label htmlFor="trend-comparison">Choose a comparison</label>
      <select
        id="trend-comparison"
        value={selected}
        onChange={(e) => {
          const value = e.target.value;
          setSelected(value);
          setVisited((current) => Array.from(new Set([...current, value])));
        }}
      >
        {trendComparisons.map((item) => (
          <option value={item.id} key={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <h3>{comparison.title}</h3>
      <TrendComparisonVisual key={comparison.id} comparisonId={comparison.id} />
      <div className="exploration-checklist">
        <p className="small">Explore these comparisons before moving on:</p>
        <ul>
          {requiredComparisonIds.map((id) => (
            <li key={id}>
              {visited.includes(id) ? "✓ Explored" : "Still to explore"} ·{" "}
              {trendComparisons.find((item) => item.id === id)!.title}
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
