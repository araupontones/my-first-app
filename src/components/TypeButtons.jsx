import "./TypeButtons.css";
import { typeColor, typeStroke } from "../utils/typeColors";

// A row of buttons, one per type plus "All".
// It doesn't remember which one is selected: the parent owns that state and passes it in.
function TypeButtons({ types, selectedType, onSelect }) {
  return (
    <div className="type-buttons" role="group" aria-label="Show a type">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          className="type-buttons__button"
          aria-pressed={type === selectedType} // tells screen readers which one is on
          onClick={() => onSelect(type)} // ask the parent to change the state
        >
          {type !== "All" && (
            <span
              className="type-buttons__dot"
              style={{ background: typeColor(type), borderColor: typeStroke(type) === "none" ? "transparent" : typeStroke(type) }}
              aria-hidden="true"
            />
          )}
          {type}
        </button>
      ))}
    </div>
  );
}

export default TypeButtons;
