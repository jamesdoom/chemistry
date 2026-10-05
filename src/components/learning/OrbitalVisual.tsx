export function OrbitalVisual() {
  return (
    <figure className="orbital-visual">
      <div className="atom-tile">
        <span>8</span>
        <strong>O</strong>
        <span>Oxygen</span>
      </div>
      <div className="orbital-content">
        <p
          className="configuration"
          aria-label="1s 2 electrons, 2s 2 electrons, 2p 4 electrons"
        >
          1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>4</sup>
        </p>
        <div className="orbital-row">
          <span>1s</span>
          <span
            className="orbital"
            aria-label="two electrons with opposite spins"
          >
            ↑↓
          </span>
        </div>
        <div className="orbital-row">
          <span>2s</span>
          <span
            className="orbital"
            aria-label="two electrons with opposite spins"
          >
            ↑↓
          </span>
        </div>
        <div className="orbital-row">
          <span>2p</span>
          <span
            className="orbital"
            aria-label="two electrons with opposite spins"
          >
            ↑↓
          </span>
          <span className="orbital" aria-label="one spin-up electron">
            ↑
          </span>
          <span className="orbital" aria-label="one spin-up electron">
            ↑
          </span>
        </div>
      </div>
      <figcaption>
        Each box represents one orbital. Each arrow represents one electron and
        its spin. These boxes show occupancy, not the shape or path of an
        electron.
      </figcaption>
    </figure>
  );
}
