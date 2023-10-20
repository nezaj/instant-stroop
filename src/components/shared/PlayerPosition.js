import { View } from "react-native";
import { avatarColor } from "@/utils/profile";
import { MULTIPLAYER_SCORE_TO_WIN } from "@/game";

export default function PlayerPosition({ handle, pos }) {
  const avatarStyle = avatarColor(handle);
  const shift = Math.round((pos / MULTIPLAYER_SCORE_TO_WIN) * 100, 0) * 0.85;
  return (
    <View
      className={`${avatarStyle} absolute  w-12 h-12 rounded-full`}
      style={{ left: `${shift}%` }}
    />
  );
}
