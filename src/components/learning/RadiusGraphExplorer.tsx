import { useState } from "react";
import { useProgress } from "../../context/ProgressContext";
import {
  radiusGraphData,
  requiredGraphPoints,
  graphPoint,
  graphEntryFeedback,
} from "../../data/atomicRadiusGraph";
import { DiagramFrame } from "./DiagramFrame";
const topicId = "atomic-radius-graphing";
export function RadiusGraphExplorer({
  onComplete,
  continueLabel,
}: {
  onComplete: () => void;
  continueLabel: string;
}) {
  const { progress, completeStep } = useProgress();
  const markers = progress.topics[topicId]?.completedSteps ?? [];
  const axesReady = markers.includes("graph-axes-ready");
  const shown = markers.includes("graph-reference-shown");
  const [xAxis, setX] = useState(axesReady ? "number" : "");
  const [yAxis, setY] = useState(axesReady ? "radius" : "");
  const [selected, setSelected] = useState(3);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const plotted = radiusGraphData.filter((d) =>
    markers.includes(`graph-point-${d.atomicNumber}`),
  );
  const ready = requiredGraphPoints.every((z) =>
    plotted.some((d) => d.atomicNumber === z),
  );
  function checkAxes() {
    if (xAxis !== "number" || yAxis !== "radius")
      setFeedback(
        "We compare radius as atomic number changes: atomic number belongs on x, and radius with pm units belongs on y.",
      );
    else {
      completeStep(topicId, "graph-axes-ready");
      setFeedback("Axes ready. Read a table row, then plot its radius.");
    }
  }
  return (
    <div className="radius-graph-explorer">
      <p className="hint">
        <strong>Illustrative teaching dataset.</strong> These original values
        show the general pattern; they are not measured atomic radii or answers
        to a school worksheet. Real datasets depend on radius definitions and
        can include exceptions. Use your teacher’s supplied values for the
        assignment.
      </p>
      {!axesReady && (
        <>
          <label htmlFor="radius-x">Horizontal axis (x)</label>
          <select
            id="radius-x"
            value={xAxis}
            onChange={(e) => setX(e.target.value)}
          >
            <option value="">Choose an axis</option>
            <option value="number">Atomic number (no unit)</option>
            <option value="radius">Atomic radius (pm)</option>
          </select>
          <label htmlFor="radius-y">Vertical axis (y)</label>
          <select
            id="radius-y"
            value={yAxis}
            onChange={(e) => setY(e.target.value)}
          >
            <option value="">Choose an axis</option>
            <option value="number">Atomic number (no unit)</option>
            <option value="radius">Atomic radius (pm)</option>
          </select>
          <button className="secondary" onClick={checkAxes}>
            Check axes
          </button>
        </>
      )}
      <details className="radius-data">
        <summary>Teaching data: first 18 neutral atoms</summary>
        <div
          className="periodic-scroll"
          role="region"
          aria-label="Atomic-radius teaching data"
          tabIndex={0}
        >
          <table>
            <caption>Illustrative radii in picometers (pm)</caption>
            <thead>
              <tr>
                <th scope="col">Element</th>
                <th scope="col">Atomic number</th>
                <th scope="col">Radius (pm)</th>
                <th scope="col">Outer level</th>
              </tr>
            </thead>
            <tbody>
              {radiusGraphData.map((d) => (
                <tr key={d.atomicNumber}>
                  <th scope="row">{d.symbol}</th>
                  <td>{d.atomicNumber}</td>
                  <td>{d.radius}</td>
                  <td>{d.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      {axesReady && (
        <>
          <p className="hint">
            Selected teaching row:{" "}
            {radiusGraphData.find((d) => d.atomicNumber === selected)!.name} ·
            atomic number {selected} · radius{" "}
            {radiusGraphData.find((d) => d.atomicNumber === selected)!.radius}{" "}
            pm.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const result = graphEntryFeedback(selected, input);
              setFeedback(result.message);
              if (result.correct) {
                completeStep(topicId, `graph-point-${selected}`);
                setInput("");
              }
            }}
          >
            <label htmlFor="graph-element">Element to plot</label>
            <select
              id="graph-element"
              value={selected}
              onChange={(e) => {
                setSelected(Number(e.target.value));
                setInput("");
                setFeedback("");
              }}
            >
              {radiusGraphData.map((d) => (
                <option key={d.atomicNumber} value={d.atomicNumber}>
                  {d.name} ({d.symbol}), atomic number {d.atomicNumber}
                </option>
              ))}
            </select>
            <label htmlFor="graph-radius">
              Vertical coordinate: radius (pm)
            </label>
            <input
              id="graph-radius"
              type="text"
              inputMode="decimal"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="primary" type="submit">
              Plot point
            </button>
          </form>
          <figure>
            <DiagramFrame label="Atomic radius versus atomic number graph">
              <svg
                viewBox="0 0 550 335"
                role="img"
                aria-label={`Illustrative radius graph. ${plotted.length} student-plotted points. ${shown ? "Full reference pattern revealed." : "Plot lithium, neon, and sodium to compare a period and its boundary."}`}
              >
                {[0, 50, 100, 150, 200].map((r) => (
                  <g key={r}>
                    <path d={`M60 ${270 - r}H485`} className="radius-grid" />
                    <text x="48" y={275 - r} textAnchor="end">
                      {r}
                    </text>
                  </g>
                ))}
                <path d="M60 35V270H485" className="energy-axis" />
                {[1, 3, 5, 7, 9, 11, 13, 15, 17, 18].map((z) => (
                  <text
                    key={z}
                    x={graphPoint(z, 0).x}
                    y="294"
                    textAnchor="middle"
                  >
                    {z}
                  </text>
                ))}
                <text x="275" y="326" textAnchor="middle">
                  Atomic number (no unit)
                </text>
                <text x="10" y="25">
                  Radius (pm)
                </text>
                {shown && (
                  <polyline
                    points={radiusGraphData
                      .map((d) => {
                        const p = graphPoint(d.atomicNumber, d.radius);
                        return `${p.x},${p.y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#9baacb"
                    strokeWidth="2"
                  />
                )}
                {radiusGraphData
                  .filter(
                    (d) =>
                      shown ||
                      plotted.some((p) => p.atomicNumber === d.atomicNumber),
                  )
                  .map((d) => {
                    const p = graphPoint(d.atomicNumber, d.radius);
                    return (
                      <g key={d.atomicNumber}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={
                            plotted.some(
                              (a) => a.atomicNumber === d.atomicNumber,
                            )
                              ? 6
                              : 3
                          }
                          stroke={
                            plotted.some(
                              (a) => a.atomicNumber === d.atomicNumber,
                            )
                              ? "#edf1fa"
                              : "none"
                          }
                          strokeWidth="1.5"
                          fill={
                            plotted.some(
                              (a) => a.atomicNumber === d.atomicNumber,
                            )
                              ? "#c0b4ff"
                              : "#9baacb"
                          }
                        />
                        {requiredGraphPoints.includes(d.atomicNumber) && (
                          <text x={p.x} y={p.y - 12} textAnchor="middle">
                            {d.symbol}
                          </text>
                        )}
                      </g>
                    );
                  })}
              </svg>
            </DiagramFrame>
            <figcaption>
              The line connects different elements in atomic-number order; it is
              not a time history or an electron path. Both axes start at
              consistent scales. Large outlined dots are your plotted points;
              small dots are reference points. Your required points are also
              listed below.
            </figcaption>
          </figure>
          <ul className="exploration-checklist">
            {requiredGraphPoints.map((z) => (
              <li key={z}>
                {plotted.some((d) => d.atomicNumber === z)
                  ? "✓ Plotted"
                  : "Still to plot"}{" "}
                · {radiusGraphData.find((d) => d.atomicNumber === z)!.name}
              </li>
            ))}
          </ul>
          <button
            className="secondary"
            disabled={!ready || shown}
            onClick={() => completeStep(topicId, "graph-reference-shown")}
          >
            Reveal the full reference pattern
          </button>
          {shown && (
            <p className="hint">
              From lithium through neon, radius decreases within level 2. Sodium
              begins level 3 and the pattern resets upward; period 3 then
              decreases. The plotted line compares atoms, not an atom changing
              with time.
            </p>
          )}
          <button
            className="primary next"
            disabled={!ready || !shown}
            onClick={onComplete}
          >
            {continueLabel}
          </button>
        </>
      )}
      <p role="status">{feedback}</p>
    </div>
  );
}
