import "./BattlePicker.css";
import * as d3 from "d3";
import { allTypes } from "../utils/typeColors";
import { typeLabel } from "../utils/typeEmoji";

// A "Random battle" button, then two type slots with "VS" between them.
// fighters = ["Fire", "Water"]; onChange receives a NEW array of two types.
function BattlePicker({ fighters, onChange }) {
  // Replace one slot, keep the other: build a new array instead of changing the old one
  const pick = (slot, type) => {
    const next = [...fighters];
    next[slot] = type;
    onChange(next);
  };

  // d3.shuffle mixes an array in place, so we shuffle a copy and take the first two
  const randomBattle = () => onChange(d3.shuffle([...allTypes]).slice(0, 2));

  return (
    <div className="battle-picker">
      <button
        type="button"
        className="battle-picker__random"
        onClick={randomBattle}
      >
        🎲 Random battle!
      </button>

      <div className="battle-picker__slots">
        {fighters.map((type, slot) => (
          // The CSS grid places slot 1 left, slot 2 right and "VS" in the middle column
          <label key={slot} className="battle-picker__slot">
            <span className="battle-picker__slot-label">Type {slot + 1}</span>
            <select
              className="battle-picker__select"
              value={type}
              onChange={(e) => pick(slot, e.target.value)}
            >
              {allTypes.map((t) => (
                // A type can't fight itself: disable the one picked in the other slot
                <option key={t} value={t} disabled={t === fighters[1 - slot]}>
                  {typeLabel(t)}
                </option>
              ))}
            </select>
          </label>
        ))}
        <span className="battle-picker__vs pixel" aria-hidden="true">
          VS
        </span>
      </div>
    </div>
  );
}

export default BattlePicker;
