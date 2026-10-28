import "./CardGrid.css";
import PokemonCard from "./PokemonCard";

// Shows a list of Pokémon as a responsive grid of cards, IN THE ORDER GIVEN
// (the parent decides the order).
// stat (optional, "hp" | "attack"): each card shows its rank for that stat and bolds it.
function CardGrid({ pokemons, stat = null }) {
  // Rank = 1 + how many have a strictly higher value, so ties share a rank (#3, #3, #5…)
  const rankOf = (pokemon) => 1 + pokemons.filter((p) => p[stat] > pokemon[stat]).length;

  return (
    <div className="card-grid">
      {pokemons.map((pokemon) => (
        // key tells React which card is which; the id is unique and never changes
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          emphasis={stat}
          rank={stat ? rankOf(pokemon) : null}
        />
      ))}
    </div>
  );
}

export default CardGrid;
