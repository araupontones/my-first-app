// Always-visible names next to the famous Pokémon.
// labels: [{ name, x, y, anchor }] already positioned by the Scatterplot.
function FamousLabels({ labels }) {
  return (
    <g>
      {labels.map((label) => (
        <text
          key={label.name}
          className="chart-label"
          x={label.x}
          y={label.y}
          textAnchor={label.anchor}
        >
          {label.name}
        </text>
      ))}
    </g>
  );
}

export default FamousLabels;
