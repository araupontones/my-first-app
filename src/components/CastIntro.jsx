import "./CastIntro.css";

// The short "what's a type?" explanation shown above the type buttons.
function CastIntro() {
  return (
    <div className="cast-intro">
      <p>
        Remember Captain Planet? Five rings, five powers: Earth, Fire, Wind,
        Water, Heart. A Pokémon's type works the same way: it's the element it
        was born with. Charmander is Fire, Squirtle is Water, Bulbasaur is
        Grass.
      </p>
      <p>
        And like rock-paper-scissors, types beat each other. Water puts out
        Fire. Fire burns Grass. Grass soaks up Water. That's most of what your
        kid is shouting about from the back seat.
      </p>
    </div>
  );
}

export default CastIntro;
