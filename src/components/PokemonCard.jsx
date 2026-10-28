import "./PokemonCard.css";
import StatBar from "./StatBar";
import { spriteUrl } from "../utils/sprites";
import { typeEmoji } from "../utils/typeEmoji";

// Receives one Pokémon object as a prop, e.g. { id: 25, name: "Pikachu", type: "Electric", ... }
// emphasis ("hp" | "attack" | null): that stat's bar and number are drawn bold.
// rank (number | null): shown as "#1" in the top-left corner.
function PokemonCard({ pokemon, emphasis = null, rank = null }) {
  return (
    <article className="card">
      {rank !== null && <span className="card__rank pixel num">#{rank}</span>}
      {/* Type emoji; screen readers hear "Fire type" instead of the emoji's own name */}

      {/*
      <span className="card__type" role="img" aria-label={`${pokemon.type} type`} title={`${pokemon.type} type`}>
        {typeEmoji[pokemon.type]}
      </span>
      */}
      <img
        className="card__sprite"
        src={spriteUrl(pokemon.id)}
        alt={pokemon.name}
        width="96"
        height="96"
        loading="lazy" // only download when the card scrolls into view
      />
      <h3 className="card__name">{pokemon.name}</h3>
      <StatBar
        stat="hp"
        label="HP"
        value={pokemon.hp}
        bold={emphasis === "hp"}
      />
      <StatBar
        stat="attack"
        label="ATK"
        value={pokemon.attack}
        bold={emphasis === "attack"}
      />
    </article>
  );
}

export default PokemonCard;
