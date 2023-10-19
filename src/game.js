/* Module containing game logic shared across app */

const MULTIPLAYER_SCORE_TO_WIN = 13;

export const colorStyleMap = {
  "text-red-400": { color: "rgb(248 113 113)" },
  "text-green-400": { color: "rgb(74 222 128)" },
  "text-blue-400": { color: "rgb(96 165 250)" },
  "text-yellow-400": { color: "rgb(250 204 21)" },
};

export function chooseRandomColor() {
  const colors = ["red", "green", "blue", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function generateGameColors(length = MULTIPLAYER_SCORE_TO_WIN) {
  return Array.from({ length }).map((_) => ({
    color: chooseRandomColor(),
    label: chooseRandomColor(),
  }));
}
