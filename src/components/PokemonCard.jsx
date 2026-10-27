import "./PokemonCard.css";
import StatBar from "./StatBar";
import { spriteUrl } from "../utils/sprites";

// Receives one Pokémon object as a prop, e.g. { id: 25, name: "Pikachu", type: "Electric", ... }
// dimmed = true turns the card grey (used when another type is selected).
function PokemonCard({ pokemon, dimmed = false }) {
  return (
    <article className={dimmed ? "card card--dimmed" : "card"}>
      <img
        className="card__sprite"
        src={spriteUrl(pokemon.id)}
        alt={pokemon.name}
        width="96"
        height="96"
        loading="lazy" // only download when the card scrolls into view
      />

      <h3 className="card__name">{pokemon.name}</h3>

      <StatBar label="HP" value={pokemon.hp} color="var(--poke-blue)" />
      <StatBar label="ATK" value={pokemon.attack} color="var(--navy)" />
    </article>
  );
}

export default PokemonCard;
