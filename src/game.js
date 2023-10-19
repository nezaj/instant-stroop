/* Module containing game logic shared across app */
import { transact, tx, id } from "@instantdb/react-native";

import { now } from "@/utils/time";

export const GAME_IN_PROGRESS = "GAME_IN_PROGRESS";
export const GAME_COMPLETED = "GAME_COMPLETED";
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

// Actions
// ------------------
export const startMultiplayerGame = (room) => {
  const gameId = id();
  const { users } = room;
  const players = users.filter(
    (u) => u.id === room.hostId || room.readyIds.includes(u.id)
  );
  const colors = generateGameColors();
  const scores = players.map((p) => ({ [p.id]: 0 }));
  const createGame = tx.games[gameId].update({
    status: GAME_IN_PROGRESS,
    spectatorIds: users
      .filter((u) => u.id !== room.hostId && !room.readyIds.includes(u.id))
      .map((u) => u.id),
    colors,
    scores,
    created_at: now(),
  });
  const addUserGameLinks = users.map((u) =>
    tx.games[gameId].link({ users: u.id })
  );
  const updateRoom = tx.rooms[room.id]
    .update({
      currentGameId: gameId,
      readyIds: [],
    })
    .link({ games: gameId });
  transact([createGame, ...addUserGameLinks, updateRoom]);
};
