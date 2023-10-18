import { View } from "react-native";
import { avatarColor } from "@/utils/profile";

export default function UserScore({ handle, score }) {
  const avatarStyle = avatarColor(handle);
  const shift = Math.round((score / 13) * 100, 0) * 0.85;
  return (
    <View
      className={`${avatarStyle} absolute  w-12 h-12 rounded-full`}
      style={{ left: `${shift}%` }}
    />
  );
}
