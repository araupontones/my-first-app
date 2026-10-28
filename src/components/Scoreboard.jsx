import "./Scoreboard.css";
import * as d3 from "d3";
import { statScale } from "../utils/statScale";
import { typeLabel } from "../utils/typeEmoji";
import StatIcon from "./StatIcon";

// Same colours as the HP and Attack bars on the "Meet the cast" cards
const ROWS = [
  { stat: "hp", label: "Avg HP", color: "var(--stat-hp)" },
  { stat: "attack", label: "Avg attack", color: "var(--stat-attack)" },
];
const BAR_HEIGHT = 16;
// How see-through the LOWER bar of each row is (1 = full colour, 0 = invisible)
const LOWER_OPACITY = 0.5;

// One half of a row. side = "left" (bar grows leftwards from the centre) or "right".
// isLower = true fades this bar, so the bigger value stands out.
function ScoreSide({ side, value, color, isLower }) {
  // Same shared 0–160 scale as the card bars, so both sides (and both rows) are comparable
  const pct = statScale(value);
  // Rounded ends like the card bars (they also use half their height)
  const radius = BAR_HEIGHT / 2;

  const bar = (
    <svg className="scoreboard__bar" width="100%" height={BAR_HEIGHT} aria-hidden="true">
      <rect className="scoreboard__track" width="100%" height={BAR_HEIGHT} rx={radius} />
      {/* Left side: start the bar (100 - pct)% in, so it touches the centre line */}
      <rect
        x={side === "left" ? `${100 - pct}%` : 0}
        width={`${pct}%`}
        height={BAR_HEIGHT}
        rx={radius}
        style={{ fill: color, opacity: isLower ? LOWER_OPACITY : 1 }}
      />
    </svg>
  );
  const number = <span className="scoreboard__value pixel num">{value}</span>;

  return (
    <div className={`scoreboard__side scoreboard__side--${side}`}>
      {/* Mirror image: the number always sits at the OUTER end */}
      {side === "left" ? (
        <>
          {number}
          {bar}
        </>
      ) : (
        <>
          {bar}
          {number}
        </>
      )}
    </div>
  );
}

// Fighting-game style HUD comparing the two fighters' averages.
function Scoreboard({ pokemons, fighters }) {
  const sides = fighters.map((type) => {
    const group = pokemons.filter((d) => d.type === type);
    return {
      type,
      // One Pokémon: name it, since "average" would be misleading
      caption:
        group.length === 1
          ? `${typeLabel(type)} (${group[0].name} only)`
          : `${typeLabel(type)} (${group.length} Pokémon)`,
      hp: Math.round(d3.mean(group, (d) => d.hp)),
      attack: Math.round(d3.mean(group, (d) => d.attack)),
    };
  });
  const [left, right] = sides;

  return (
    <div className="scoreboard">
      <div className="scoreboard__header">
        <span className="scoreboard__fighter">{left.caption}</span>
        <span className="scoreboard__fighter scoreboard__fighter--right">{right.caption}</span>
      </div>

      {ROWS.map(({ stat, label, color }) => (
        <div key={stat} className="scoreboard__row">
          <div className="scoreboard__label pixel">
            <StatIcon stat={stat} />
            {label}
          </div>
          <div className="scoreboard__bars">
            {/* The smaller value fades; on a tie neither does */}
            <ScoreSide side="left" value={left[stat]} color={color} isLower={left[stat] < right[stat]} />
            <ScoreSide side="right" value={right[stat]} color={color} isLower={right[stat] < left[stat]} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Scoreboard;
