import { useState } from "react";
import Hero from "./components/Hero";
import MeetTheCast from "./components/MeetTheCast";
import TypeStory from "./components/TypeStory";
import AboutFooter from "./components/AboutFooter";
import { pokemons } from "./data/pokemons";

// App is the "boss" component: it holds the state that several sections share.
function App() {
  // The two types in the battle. Shared by the picker, scoreboard, chart and cards.
  const [fighters, setFighters] = useState(["Fire", "Water"]);

  return (
    <>
      <Hero />

      <main>
        <MeetTheCast pokemons={pokemons} />
        <TypeStory
          pokemons={pokemons}
          fighters={fighters}
          onFightersChange={setFighters}
        />

        <section className="section" id="favorite">
          <h2>Now you speak Pokémon!</h2>
          <p>✓ Pokémon battle like a sport, and nobody gets hurt.</p>
          <p>✓ HP = how many hits it can take. Attack = how hard it hits.</p>
          <p>✓ Type isn’t power. It’s rock, paper, scissors.</p>

          <p style={{ fontWeight: "bold" }}>
            Tonight, ask your kid: “Who’s your favourite, and what type is it?”
          </p>
        </section>
      </main>

      <AboutFooter />
    </>
  );
}

export default App;
