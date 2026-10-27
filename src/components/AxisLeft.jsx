const TICK_LENGTH = 6;

// Vertical axis. gridWidth: how far right the faint grid lines go.
function AxisLeft({ yScale, gridWidth, pixelsPerTick = 50 }) {
  const [bottom, top] = yScale.range(); // reversed: bottom is the bigger pixel number
  const height = bottom - top;
  const ticks = yScale.ticks(Math.floor(height / pixelsPerTick));

  return (
    <g className="axis">
      {ticks.map((value) => (
        <g key={value} transform={`translate(0, ${yScale(value)})`}>
          <line className="axis__grid" x1={0} x2={gridWidth} />
          <line className="axis__line" x1={-TICK_LENGTH} x2={0} />
          <text className="axis__tick" x={-TICK_LENGTH - 6} dy="0.32em" textAnchor="end">
            {value}
          </text>
        </g>
      ))}
      <line className="axis__line" y1={top} y2={bottom} />
    </g>
  );
}

export default AxisLeft;
