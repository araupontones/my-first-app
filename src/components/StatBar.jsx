import "./StatBar.css";
import { statScale } from "../utils/statScale";
import StatIcon from "./StatIcon";

const BAR_COLORS = { hp: "var(--stat-hp)", attack: "var(--stat-attack)" };

// One horizontal bar: icon + short label, bar, number.
// e.g. <StatBar stat="hp" label="HP" value={35} bold />
function StatBar({ stat, label, value, bold = false }) {
  const widthPercent = statScale(value); // D3 does the maths, React draws the rect
  const barHeight = bold ? 14 : 10; // the bold bar is thicker

  return (
    <div className={bold ? "stat-bar stat-bar--bold" : "stat-bar"}>
      <span className="stat-bar__label pixel" style={{ color: BAR_COLORS[stat] }}>
        <StatIcon stat={stat} />
        <span className="stat-bar__label-text">{label}</span>
      </span>

      {/* aria-hidden: the number next to it already says the same thing for screen readers */}
      <svg className="stat-bar__svg" width="100%" height={barHeight} aria-hidden="true">
        <rect className="stat-bar__track" width="100%" height={barHeight} rx={barHeight / 2} />
        {/* style (not the fill attribute) so CSS variables like var(--stat-hp) work */}
        <rect width={`${widthPercent}%`} height={barHeight} rx={barHeight / 2} style={{ fill: BAR_COLORS[stat] }} />
      </svg>

      <span className="stat-bar__value num">{value}</span>
    </div>
  );
}

export default StatBar;
