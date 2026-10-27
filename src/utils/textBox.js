// SVG text has no size until the browser draws it, so we ESTIMATE its box
// from the number of letters. Good enough to detect overlaps.
export const textBox = ({ text, x, y, anchor = "start", fontSize = 13 }) => {
  const width = text.length * fontSize * 0.6; // average letter ≈ 0.6 × font size
  const left = anchor === "end" ? x - width : anchor === "middle" ? x - width / 2 : x;
  return { left, right: left + width, top: y - fontSize, bottom: y + 4 };
};

// True when two boxes share any area
export const boxesOverlap = (a, b) =>
  a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
