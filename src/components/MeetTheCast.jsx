import { useState } from "react";
import "./MeetTheCast.css";
import SortButtons from "./SortButtons";
import CardGrid from "./CardGrid";

const byName = (a, b) => a.name.localeCompare(b.name);

// All 20 cards with sort buttons. The sort order is only used here,
// so its state lives here, not in App.
function MeetTheCast({ pokemons }) {
  const [sortBy, setSortBy] = useState("name"); // "name" | "hp" | "attack"

  // Worked out fresh on every render from a COPY, so the original array is never reordered.
  // Highest first for HP/Attack; equal values fall back to A–Z.
  const sorted = [...pokemons].sort((a, b) =>
    sortBy === "name" ? byName(a, b) : b[sortBy] - a[sortBy] || byName(a, b),
  );

  return (
    <section className="section" id="cast">
      <h2>Meet the cast</h2>

      <div className="cast-intro">
        <p>
          Pokémon (“pocket monsters”) are creatures that Trainers catch, raise
          and send into friendly battles, like a sport, to become champion. Each
          one has HP (how many hits it can take) and Attack (how hard it hits).
          When HP runs out, it faints and takes a nap. Nobody gets hurt!
        </p>

        <p>
          <b>
            <span style={{ fontFamily: "var(--font-logo)" }}>
              Sort the cards
            </span>{" "}
            below to see who's the toughest and who hits the hardest.
          </b>
        </p>
      </div>

      <SortButtons sortBy={sortBy} onChange={setSortBy} />

      {/* When sorting by a stat, the cards show ranks and bold that stat */}
      <CardGrid pokemons={sorted} stat={sortBy === "name" ? null : sortBy} />
    </section>
  );
}

export default MeetTheCast;
