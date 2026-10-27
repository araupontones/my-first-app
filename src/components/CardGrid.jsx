import "./CardGrid.css";
import PokemonCard from "./PokemonCard";

// Shows any list of Pokémon as a responsive grid of cards, sorted A→Z.
// highlightType (optional): cards of other types turn grey. "All" = nobody is grey.
function CardGrid({ pokemons, highlightType = "All" }) {
  // Copy first ([...]) because .sort() changes the array it is called on.
  const sorted = [...pokemons].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="card-grid">
      {sorted.map((pokemon) => (
        // key tells React which card is which; the id is unique and never changes
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          dimmed={highlightType !== "All" && pokemon.type !== highlightType}
        />
      ))}
    </div>
  );
}

export default CardGrid;
