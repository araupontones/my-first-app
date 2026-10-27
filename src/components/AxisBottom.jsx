const TICK_LENGTH = 6;

// Horizontal axis. D3 only picks the tick values; React draws every line and number.
// gridHeight: how far up the faint grid lines go (the height of the plotting area).
function AxisBottom({ xScale, gridHeight, pixelsPerTick = 70 }) {
  const [start, end] = xScale.range();
  const width = end - start;
  // ~ one tick every 70px: fewer numbers on phones, more on desktop
  const ticks = xScale.ticks(Math.floor(width / pixelsPerTick));

  return (
    <g className="axis">
      {ticks.map((value) => (
        <g key={value} transform={`translate(${xScale(value)}, 0)`}>
          <line className="axis__grid" y1={-gridHeight} y2={0} />
          <line className="axis__line" y2={TICK_LENGTH} />
          <text className="axis__tick" y={TICK_LENGTH + 14} textAnchor="middle">
            {value}
          </text>
        </g>
      ))}
      {/* the axis line itself */}
      <line className="axis__line" x1={start} x2={end} />
    </g>
  );
}

export default AxisBottom;
