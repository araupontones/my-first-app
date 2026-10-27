import * as d3 from "d3";

// ONE scale for every HP and Attack bar on the page, so bar lengths are comparable everywhere.
// 0 → 0% of the track, 160 (Snorlax's HP, the biggest number we have) → 100%.
export const statScale = d3.scaleLinear().domain([0, 160]).range([0, 100]);
