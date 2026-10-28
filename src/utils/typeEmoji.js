// One emoji per type, so a type can be recognised without relying on colour.
export const typeEmoji = {
  Fire: "🔥",
  Water: "💧",
  Grass: "🌿",
  Electric: "⚡",
  Psychic: "🔮",
  Normal: "⭐",
  Ghost: "👻",
  Dragon: "🐉",
  Fighting: "🥋",
  Rock: "🪨",
};

// "Fire" → "🔥 Fire"
export const typeLabel = (type) => `${typeEmoji[type]} ${type}`;
