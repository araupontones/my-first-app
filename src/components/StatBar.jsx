import "./StatBar.css";
import { statScale } from "../utils/statScale";

// One horizontal bar: short label, bar, number. e.g. <StatBar label="HP" value={35} color="..." />
function StatBar({ label, value, color }) {
  const widthPercent = statScale(value); // D3 does the maths, React draws the rect

  return (
    <div className="stat-bar">
      <span className="stat-bar__label pixel">{label}</span>

      {/* aria-hidden: the number next to it already says the same thing for screen readers */}
      <svg className="stat-bar__svg" width="100%" height="10" aria-hidden="true">
        <rect className="stat-bar__track" width="100%" height="10" rx="5" />
        {/* style (not the fill attribute) so CSS variables like var(--navy) work */}
        <rect width={`${widthPercent}%`} height="10" rx="5" style={{ fill: color }} />
      </svg>

      <span className="stat-bar__value num">{value}</span>
    </div>
  );
}

export default StatBar;
