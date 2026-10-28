import "./TypeTriangle.css";
import { typeColor, typeTextColor } from "../utils/typeColors";

// Rock-paper-scissors diagram, positioned with CSS only.
// Each arrow means "beats": Fire → Grass → Water → Fire.
const BADGES = ["Fire", "Grass", "Water"];
const ARROWS = ["fire-grass", "grass-water", "water-fire"];

function TypeTriangle() {
  return (
    <div className="type-triangle" role="img" aria-label="Fire beats Grass, Grass beats Water, Water beats Fire">
      {BADGES.map((type) => (
        <span
          key={type}
          className={`type-triangle__badge type-triangle__badge--${type.toLowerCase()} pixel`}
          style={{ background: typeColor(type), color: typeTextColor(type) }}
        >
          {type}
        </span>
      ))}
      {ARROWS.map((name) => (
        <span key={name} className={`type-triangle__arrow type-triangle__arrow--${name}`} aria-hidden="true">
          ➜
        </span>
      ))}
      <span className="type-triangle__legend">➜ = beats</span>
    </div>
  );
}

export default TypeTriangle;
