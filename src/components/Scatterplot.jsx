import "./Scatterplot.css";
import * as d3 from "d3";
import { spriteUrl } from "../utils/sprites";
import { textBox, boxesOverlap } from "../utils/textBox";
import { typeEmoji } from "../utils/typeEmoji";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import ChartLabels from "./ChartLabels";
import CornerHints from "./CornerHints";

// Space around the plotting area, kept free for the axes and their titles
const MARGIN = { top: 20, right: 24, bottom: 60, left: 64 };
const EMOJI_SIZE = 14;
const EMOJI_NUDGE = 4; // extra gap between the top of the sprite and its emoji
const EMOJI_RADIUS = EMOJI_SIZE * 0.75; // white badge behind the emoji

// The square an emoji badge takes up, centred on (x, y)
const emojiBox = (x, y) => ({
  left: x - EMOJI_RADIUS,
  right: x + EMOJI_RADIUS,
  top: y - EMOJI_RADIUS,
  bottom: y + EMOJI_RADIUS,
});

// Only the two fighting types are drawn, each Pokémon as its sprite with its name.
function Scatterplot({ data, width, height, fighters }) {
  // "Bounds" = the inner rectangle where the dots live
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const spriteSize = boundsWidth < 400 ? 36 : 48; // smaller pictures on phones

  // Domains come from ALL 20 Pokémon (not just the fighters), so the axes never move
  // when you change the battle: the same spot always means the same HP and attack.
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.hp)])
    .range([0, boundsWidth])
    .nice();

  // SVG y grows DOWNWARDS, so 0 maps to the bottom (boundsHeight) and max to the top (0).
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.attack)])
    .range([boundsHeight, 0])
    .nice();

  const visible = data.filter((d) => fighters.includes(d.type));
  const half = spriteSize / 2 - 6; // sprites have empty space around them

  const marks = visible.map((d) => (
    // Move a group to the Pokémon's point; everything inside is drawn around (0, 0)
    <g key={d.id} transform={`translate(${xScale(d.hp)}, ${yScale(d.attack)})`}>
      {/* x/y of an <image> is its top-left corner, so shift by half its size to centre it */}
      <image
        href={spriteUrl(d.id)}
        x={-spriteSize / 2}
        y={-spriteSize / 2}
        width={spriteSize}
        height={spriteSize}
        style={{ imageRendering: "pixelated" }}
      />
    </g>
  ));

  // One emoji per sprite, centred just above it. If that spot is already taken by
  // another emoji, try left, right, then one step higher, and use the first free spot.
  const step = EMOJI_RADIUS * 2 + 2; // one badge width plus a 2px gap
  const placedEmojis = [];
  const emojis = visible.map((d) => {
    const cx = xScale(d.hp);
    const top = yScale(d.attack) - half - EMOJI_NUDGE - EMOJI_RADIUS; // centre of the badge
    const candidates = [
      [0, 0], // straight above
      [-step, 0], // above-left
      [step, 0], // above-right
      [0, -step], // higher
      [-step, -step],
      [step, -step],
    ].map(([dx, dy]) => ({ x: cx + dx, y: top + dy }));
    const isFree = (spot) =>
      !placedEmojis.some((placed) => boxesOverlap(emojiBox(spot.x, spot.y), placed));
    const spot = candidates.find(isFree) ?? candidates[0];
    placedEmojis.push(emojiBox(spot.x, spot.y));
    return { id: d.id, emoji: typeEmoji[d.type], ...spot };
  });

  const emojiMarks = emojis.map((e) => (
    <g key={e.id} transform={`translate(${e.x}, ${e.y})`}>
      <circle className="chart-emoji__badge" r={EMOJI_RADIUS} />
      {/* dominantBaseline="central": y is the MIDDLE of the emoji, not its baseline */}
      <text textAnchor="middle" dominantBaseline="central" fontSize={EMOJI_SIZE}>
        {e.emoji}
      </text>
    </g>
  ));

  // A name for every visible Pokémon. Each name tries 4 spots around its sprite
  // and takes the first one that stays inside the chart and doesn't cover a name or emoji already placed.
  // Start with the emoji boxes, so no name is written over an emoji.
  const placedBoxes = [...placedEmojis];
  const labels = visible.map((d) => {
    const cx = xScale(d.hp);
    const cy = yScale(d.attack);
    const candidates = [
      { x: cx + half + 4, y: cy + 4, anchor: "start" }, // right (+4 centres text on the sprite)
      { x: cx - half - 4, y: cy + 4, anchor: "end" }, // left
      { x: cx, y: cy - half - EMOJI_NUDGE - EMOJI_RADIUS * 2 - 4, anchor: "middle" }, // above (over the emoji)
      { x: cx, y: cy + half + 14, anchor: "middle" }, // below
    ];
    const fits = (spot) => {
      const box = textBox({ text: d.name, ...spot });
      const insideChart =
        box.left >= 0 &&
        box.right <= boundsWidth + MARGIN.right &&
        box.top >= -MARGIN.top;
      return (
        insideChart && !placedBoxes.some((placed) => boxesOverlap(box, placed))
      );
    };
    const spot = candidates.find(fits) ?? candidates[0]; // nothing fits: fall back to the right
    placedBoxes.push(textBox({ text: d.name, ...spot }));
    return { name: d.name, ...spot };
  });

  return (
    <svg
      className="scatterplot"
      width={width}
      height={height}
      role="img"
      aria-label={`Scatter plot of HP against attack for ${fighters[0]} and ${fighters[1]} Pokémon`}
    >
      {/* Move the origin to the top-left of the bounds, so the scales can start at 0 */}
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        <AxisLeft yScale={yScale} gridWidth={boundsWidth} />
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom xScale={xScale} gridHeight={boundsHeight} />
        </g>

        <text
          className="axis-title"
          x={boundsWidth / 2}
          y={boundsHeight + 50}
          textAnchor="middle"
        >
          HP (how much damage it can take)
        </text>
        {/* rotate -90° around the point, so the text reads bottom-to-top */}
        <text
          className="axis-title"
          transform={`translate(${-48}, ${boundsHeight / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          Attack (how hard it hits)
        </text>

        <CornerHints
          width={boundsWidth}
          height={boundsHeight}
          chartWidth={width}
          labels={labels}
        />
        {/* SVG paints in order: sprites, then emojis, then names on top */}
        {marks}
        {emojiMarks}
        <ChartLabels labels={labels} />
      </g>
    </svg>
  );
}

export default Scatterplot;
