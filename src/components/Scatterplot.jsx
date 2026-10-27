import "./Scatterplot.css";
import * as d3 from "d3";
import { typeColor, typeStroke } from "../utils/typeColors";
import { spriteUrl } from "../utils/sprites";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import FamousLabels from "./FamousLabels";
import CornerHints from "./CornerHints";

// Space around the plotting area, kept free for the axes and their titles
const MARGIN = { top: 20, right: 24, bottom: 60, left: 64 };
const RADIUS = 7;
const DIMMED_GREY = "#C9CDD6";
const FAMOUS = ["Pikachu", "Snorlax", "Mewtwo", "Charizard", "Jigglypuff"];

// selectedType: "All" → famous five as pictures, the rest as coloured dots.
//               a type → that type's Pokémon as pictures, everyone else as grey dots.
function Scatterplot({ data, width, height, selectedType }) {
  // "Bounds" = the inner rectangle where the dots live
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const spriteSize = boundsWidth < 400 ? 36 : 48; // smaller pictures on phones

  // x: HP. 0 on the left, biggest HP on the right. .nice() rounds the end to a tidy number.
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.hp)])
    .range([0, boundsWidth])
    .nice();

  // y: Attack. SVG y grows DOWNWARDS, so 0 maps to the bottom (boundsHeight) and max to the top (0).
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.attack)])
    .range([boundsHeight, 0])
    .nice();

  const isAll = selectedType === "All";
  const inGroup = (d) => isAll || d.type === selectedType;
  const showAsSprite = (d) => (isAll ? FAMOUS.includes(d.name) : d.type === selectedType);

  // Dots for everyone who isn't shown as a picture
  const circles = data
    .filter((d) => !showAsSprite(d))
    .map((d) => (
      <circle
        key={d.id}
        cx={xScale(d.hp)}
        cy={yScale(d.attack)}
        r={RADIUS}
        style={
          inGroup(d)
            ? {
                fill: typeColor(d.type),
                // white edge separates overlapping dots; Electric gets navy so yellow stays visible
                stroke: typeStroke(d.type) === "none" ? "white" : typeStroke(d.type),
                strokeWidth: 1.5,
              }
            : { fill: DIMMED_GREY, stroke: "white", strokeWidth: 1.5, opacity: 0.6 }
        }
      />
    ));

  // Pictures, centred on their point (x/y of an <image> is its top-left corner)
  const sprites = data.filter(showAsSprite).map((d) => (
    <image
      key={d.id}
      href={spriteUrl(d.id)}
      x={xScale(d.hp) - spriteSize / 2}
      y={yScale(d.attack) - spriteSize / 2}
      width={spriteSize}
      height={spriteSize}
      style={{ imageRendering: "pixelated" }}
    />
  ));

  // Famous names, only for those in the selected group.
  // Right of the mark, or ABOVE it near the right edge so it doesn't run off the chart.
  const half = (d) => (showAsSprite(d) ? spriteSize / 2 - 6 : RADIUS); // sprites have empty space around them
  const famousLabels = data
    .filter((d) => FAMOUS.includes(d.name) && inGroup(d))
    .map((d) => {
      const cx = xScale(d.hp);
      const cy = yScale(d.attack);
      const nearRightEdge = cx > boundsWidth - 80;
      return nearRightEdge
        ? { name: d.name, x: cx + half(d), y: cy - half(d) - 6, anchor: "end" }
        : { name: d.name, x: cx + half(d) + 4, y: cy + 4, anchor: "start" }; // +4 centres text on the mark
    });

  return (
    <svg
      className="scatterplot"
      width={width}
      height={height}
      role="img"
      aria-label={`Scatter plot of HP against attack for 20 Pokémon${isAll ? "" : `, ${selectedType} type highlighted`}`}
    >
      {/* Move the origin to the top-left of the bounds, so the scales can start at 0 */}
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        <AxisLeft yScale={yScale} gridWidth={boundsWidth} />
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom xScale={xScale} gridHeight={boundsHeight} />
        </g>

        <text className="axis-title" x={boundsWidth / 2} y={boundsHeight + 50} textAnchor="middle">
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

        <CornerHints width={boundsWidth} height={boundsHeight} chartWidth={width} labels={famousLabels} />
        {/* SVG paints in order: grey dots, then pictures on top, then names on top of everything */}
        {circles}
        {sprites}
        <FamousLabels labels={famousLabels} />
      </g>
    </svg>
  );
}

export default Scatterplot;
