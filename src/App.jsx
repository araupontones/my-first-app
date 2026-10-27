import { useState } from "react";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import CastIntro from "./components/CastIntro";
import CardGrid from "./components/CardGrid";
import TypeStats from "./components/TypeStats";
import ResponsiveScatterplot from "./components/ResponsiveScatterplot";
import { pokemons } from "./data/pokemons";

// "All" first, then every type that appears in the data, A→Z (Set removes duplicates)
const types = ["All", ...Array.from(new Set(pokemons.map((d) => d.type))).sort()];

// App is the "boss" component: it holds all the state and passes it down as props.
function App() {
  // The type picked in the sidebar. Used by the cast cards, the stats and the chart.
  const [selectedType, setSelectedType] = useState("All");

  return (
    <>
      <Hero />

      <div className="layout">
        <Sidebar types={types} selectedType={selectedType} onSelect={setSelectedType} />

        <main className="layout__content">
          <section className="section" id="cast">
            <h2>Meet the cast</h2>
            <CastIntro />
            <CardGrid pokemons={pokemons} highlightType={selectedType} />
          </section>

          <section className="section" id="explore">
            <h2>Explore by type</h2>
            <TypeStats pokemons={pokemons} selectedType={selectedType} />
            <ResponsiveScatterplot data={pokemons} selectedType={selectedType} />
          </section>

          <section className="section" id="favorite">
            <h2>Pick your kid's favourite</h2>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
