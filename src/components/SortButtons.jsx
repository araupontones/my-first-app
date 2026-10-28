import "./SortButtons.css";
import StatIcon from "./StatIcon";

const OPTIONS = [
  { value: "name", label: "A–Z" },
  { value: "hp", label: "Toughest (HP)" },
  { value: "attack", label: "Hardest hitters (Attack)" },
];

// Pill buttons to choose the card order. The parent owns sortBy; we only report clicks.
function SortButtons({ sortBy, onChange }) {
  return (
    <div className="sort-buttons" role="group" aria-label="Sort the cards">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`sort-buttons__button sort-buttons__button--${option.value}`}
          aria-pressed={option.value === sortBy}
          onClick={() => onChange(option.value)}
        >
          {option.value !== "name" && (
            <span className={`sort-buttons__icon sort-buttons__icon--${option.value}`}>
              <StatIcon stat={option.value} size={14} />
            </span>
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortButtons;
