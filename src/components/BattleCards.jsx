import "./BattleCards.css";
import CardGrid from "./CardGrid";
import { typeColor, typeStroke } from "../utils/typeColors";

const byName = (a, b) => a.name.localeCompare(b.name);

// The two fighting types' Pokémon, one small heading + card grid per type.
function BattleCards({ pokemons, fighters }) {
  return (
    <div className="battle-cards">
      {fighters.map((type) => {
        // .filter makes a new array, so sorting it doesn't touch the original data
        const group = pokemons.filter((d) => d.type === type).sort(byName);
        return (
          <div key={type} className="battle-cards__group">
            <h4 className="battle-cards__heading">
              <span
                className="battle-cards__swatch"
                style={{ background: typeColor(type), borderColor: typeStroke(type) === "none" ? "transparent" : typeStroke(type) }}
                aria-hidden="true"
              />
              {type} <span className="battle-cards__count">({group.length})</span>
            </h4>
            <CardGrid pokemons={group} />
          </div>
        );
      })}
    </div>
  );
}

export default BattleCards;
