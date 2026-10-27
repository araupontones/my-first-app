import { textBox, boxesOverlap } from "../utils/textBox";

const FONT_SIZE = 14;
const PAD = 8; // distance from the edges of the plotting area

// Grey hints in three corners. Hidden on narrow charts, and one by one if they'd cover a label.
function CornerHints({ width, height, chartWidth, labels }) {
  if (chartWidth < 500) return null; // too cramped on phones

  const hints = [
    { text: "Glass cannons", x: PAD, y: PAD + FONT_SIZE, anchor: "start" }, // low HP, high attack
    { text: "All-rounders", x: width - PAD, y: PAD + FONT_SIZE, anchor: "end" }, // high both
    { text: "Tanks", x: width - PAD, y: height - PAD, anchor: "end" }, // high HP, low attack
  ];

  const labelBoxes = labels.map((l) => textBox({ text: l.name, x: l.x, y: l.y, anchor: l.anchor }));
  const visibleHints = hints.filter((hint) => {
    const box = textBox({ ...hint, fontSize: FONT_SIZE });
    return !labelBoxes.some((labelBox) => boxesOverlap(box, labelBox));
  });

  return (
    <g>
      {visibleHints.map((hint) => (
        <text key={hint.text} className="chart-hint" x={hint.x} y={hint.y} textAnchor={hint.anchor}>
          {hint.text}
        </text>
      ))}
    </g>
  );
}

export default CornerHints;
