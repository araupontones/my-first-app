import * as d3 from "d3";

// One place for type colours. Data only: never use these for page decoration.
const types = ["Fire", "Water", "Grass", "Electric", "Psychic", "Normal", "Ghost", "Dragon", "Fighting", "Rock"];
const colors = ["#EE8130", "#6390F0", "#7AC74C", "#F7D02C", "#F95587", "#A8A77A", "#735797", "#6F35FC", "#C22E28", "#B6A136"];

// scaleOrdinal maps each type name to the colour at the same position.
export const typeColor = d3.scaleOrdinal().domain(types).range(colors);

// Electric yellow disappears on white, so it gets a navy outline.
export const typeStroke = (type) => (type === "Electric" ? "var(--navy)" : "none");
