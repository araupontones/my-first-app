import * as d3 from "d3";

// One place for type colours. Data only: never use these for page decoration.
const types = ["Fire", "Water", "Grass", "Electric", "Psychic", "Normal", "Ghost", "Dragon", "Fighting", "Rock"];
const colors = ["#EE8130", "#6390F0", "#7AC74C", "#F7D02C", "#F95587", "#A8A77A", "#735797", "#6F35FC", "#C22E28", "#B6A136"];

// scaleOrdinal maps each type name to the colour at the same position.
export const typeColor = d3.scaleOrdinal().domain(types).range(colors);

// All 10 types, A→Z (copy first: .sort() would reorder the scale's own list)
export const allTypes = [...typeColor.domain()].sort();

// Electric yellow disappears on white, so it gets a navy outline.
export const typeStroke = (type) => (type === "Electric" ? "var(--navy)" : "none");

// Text written ON a type colour: white on the dark ones, navy on the rest, so it stays readable.
const darkTypes = ["Ghost", "Dragon", "Fighting"];
export const typeTextColor = (type) => (darkTypes.includes(type) ? "#FFFFFF" : "var(--navy)");
