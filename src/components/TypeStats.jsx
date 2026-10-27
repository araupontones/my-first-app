import "./TypeStats.css";
import * as d3 from "d3";

// Three boxes above the chart: how many, average HP, average attack.
// When a type is picked, each box also shows the value for all 20, for comparison.
function TypeStats({ pokemons, selectedType }) {
  const isAll = selectedType === "All";
  const group = isAll ? pokemons : pokemons.filter((d) => d.type === selectedType);
  const isSingle = group.length === 1;

  // d3.mean adds up the values and divides by how many there are
  const avgHp = Math.round(d3.mean(group, (d) => d.hp));
  const avgAttack = Math.round(d3.mean(group, (d) => d.attack));
  const allHp = Math.round(d3.mean(pokemons, (d) => d.hp));
  const allAttack = Math.round(d3.mean(pokemons, (d) => d.attack));

  // With one Pokémon there's nothing to average, so we drop the word
  const prefix = isSingle ? "" : "Average ";

  // "12 more than all Pokémon" / "5 less than all Pokémon"
  const compare = (value, allValue) => {
    if (isAll) return "all Pokémon";
    const diff = value - allValue;
    if (diff === 0) return "same as all Pokémon";
    return `${Math.abs(diff)} ${diff > 0 ? "more" : "less"} than all Pokémon`;
  };

  const boxes = [
    { label: "# of Pokémon", value: group.length, note: `out of ${pokemons.length}` },
    { label: `${prefix}HP`, value: avgHp, note: compare(avgHp, allHp), hint: "(how much damage it can take)" },
    { label: `${prefix}attack`, value: avgAttack, note: compare(avgAttack, allAttack), hint: "(how hard it hits)" },
  ];

  return (
    <div className="type-stats">
      {/* Only when a type is picked, so the type's name is written next to its numbers */}
      {!isAll && <p className="type-stats__title">{selectedType} type</p>}
      <div className="type-stats__boxes">
        {boxes.map((box) => (
          <div key={box.label} className="type-stats__box">
            <span className="type-stats__label">{box.label}</span>
            <span className="type-stats__value pixel num">{box.value}</span>
            <span className="type-stats__note">{box.note}</span>
            {box.hint && <span className="type-stats__hint">{box.hint}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypeStats;
