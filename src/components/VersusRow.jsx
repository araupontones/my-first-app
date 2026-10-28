import "./VersusRow.css";
import { spriteUrl } from "../utils/sprites";

// Small Pikachu vs big Gyarados with "2×" between them: the right type beats size.
// small / big are Pokémon objects from the data, so the HP captions are never typed by hand.
function VersusRow({ small, big }) {
  return (
    <div className="versus-row">
      <figure className="versus-row__fighter">
        <img src={spriteUrl(small.id)} alt={small.name} width="96" height="96" className="versus-row__sprite" />
        <figcaption>
          {small.name}, <span className="num">{small.hp}</span> HP
        </figcaption>
      </figure>

      <span className="versus-row__times">2×</span>

      <figure className="versus-row__fighter">
        <img src={spriteUrl(big.id)} alt={big.name} width="192" height="192" className="versus-row__sprite" />
        <figcaption>
          {big.name}, <span className="num">{big.hp}</span> HP
        </figcaption>
      </figure>
    </div>
  );
}

export default VersusRow;
