import "./TypeStory.css";
import BattlePicker from "./BattlePicker";
import Scoreboard from "./Scoreboard";
import ResponsiveScatterplot from "./ResponsiveScatterplot";
import BattleCards from "./BattleCards";
import TypeTriangle from "./TypeTriangle";
import VersusRow from "./VersusRow";

const findByName = (pokemons, name) => pokemons.find((d) => d.name === name);

// One story in four beats: what a type is, a battle between two types,
// type isn't power, and why type still matters.
function TypeStory({ pokemons, fighters, onFightersChange }) {
  const charmander = findByName(pokemons, "Charmander");
  const charizard = findByName(pokemons, "Charizard");

  return (
    <section className="section type-story" id="types">
      {/* Beat 1 */}
      <div className="beat">
        <h2 className="beat__headline beat__headline--big">
          Fire, Water, Grass… what's a type?
        </h2>
        <p>
          Every Pokémon is born with an element: its type. Like a zodiac sign,
          it says a lot about it.
        </p>
        <p>Charmander is Fire. Squirtle is Water. Pikachu is Electric.</p>
        <p>
          <strong>
            Is one type stronger than another? Pick two types, or{" "}
            <span style={{ fontFamily: "var(--font-logo)" }}>
              hit Random battle
            </span>
            , and compare.
          </strong>
        </p>
      </div>

      {/* Beat 2: the battle */}
      <div className="beat beat--wide">
        <BattlePicker fighters={fighters} onChange={onFightersChange} />
        <Scoreboard pokemons={pokemons} fighters={fighters} />
        <ResponsiveScatterplot data={pokemons} fighters={fighters} />
        {/*<BattleCards pokemons={pokemons} fighters={fighters} />*/}
      </div>

      {/* Beat 3 */}
      <div className="beat">
        <h3 className="beat__headline">Spoiler: type isn't power.</h3>
        <p>
          Inside every type you’ll find small fry and heavyweights. Take Water:
          little Squirtle has 44 HP, while Lapras has 130, almost three times as
          much. Same type, very different strength.
        </p>
        <p>
          What makes a Pokémon strong is growing up: {charmander.name} evolves
          into {charizard.name} and doubles its HP,{" "}
          <span className="num">
            {charmander.hp} → {charizard.hp}
          </span>
          .
        </p>
      </div>

      {/* Beat 4 */}
      <div className="beat">
        <h3 className="beat__headline">
          So why does type matter? Rock, paper, scissors.
        </h3>
        <TypeTriangle />
        <p>
          Water beats Fire. Fire beats Grass. Grass beats Water. Hit the right
          type and you do double damage.
        </p>

        <p>
          {" "}
          For example: ⚡ Pikachu VS Gyarados 💧 Electric beats Water, so tiny
          Pikachu (35 HP) can take down giant Gyarados (95 HP).
        </p>
        <VersusRow
          small={findByName(pokemons, "Pikachu")}
          big={findByName(pokemons, "Gyarados")}
        />
        <p style={{ fontWeight: "bold" }}>
          That's why your kid keeps a mix of types on the team!
        </p>
      </div>
    </section>
  );
}

export default TypeStory;
