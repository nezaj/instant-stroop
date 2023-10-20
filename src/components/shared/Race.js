import { View } from "react-native";
import { avatarColor } from "@/utils/profile";
import { MULTIPLAYER_SCORE_TO_WIN } from "@/game";

function PlayerPosition({ handle, pos }) {
  const avatarStyle = avatarColor(handle);
  const shift = Math.round((pos / MULTIPLAYER_SCORE_TO_WIN) * 100, 0) * 0.85;
  return (
    <View
      className={`${avatarStyle} absolute  w-12 h-12 rounded-full`}
      style={{ left: `${shift}%` }}
    />
  );
}

function extractPlayerPoints(points, playerId) {
  return points.find((point) => point.userId === playerId).val;
}

export default function Race({ players, points }) {
  return (
    <View className="flex-row items-start h-12">
      {players.map((p) => (
        <PlayerPosition
          key={p.id}
          handle={p.handle}
          pos={extractPlayerPoints(points, p.id)}
        />
      ))}
    </View>
  );
}
