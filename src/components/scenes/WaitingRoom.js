import { Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@instantdb/react-native";

import SafeView from "@/components/shared/SafeView";
import { stringModulus } from "@/utils/string";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

function userSort(a, b) {
  // If a is host, a should come first
  if (a.isHost) return -1;

  // If b is host, b should come first
  if (b.isHost) return 1;

  // If a is you, a should come first
  if (a.isYou) return -1;

  // If b is you, b should come first
  if (b.isYou) return 1;

  // Sort the rest alphabetically by handle
  return a.handle.localeCompare(b.handle);
}

const profileColors = [
  "bg-red-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-lime-400",
  "bg-teal-400",
  "bg-purple-400",
];

function UserPill({ handle, title }) {
  const bgColorIdx = stringModulus(handle, profileColors.length);
  const bgColor = profileColors[bgColorIdx];
  return (
    <View className="flex-row rounded-xl border border-black items-center my-2 py-4">
      <View className={`mx-4 w-12 h-12 ${bgColor} rounded-full`} />
      <View className="flex-1 flex-col space-y-1">
        <Text className="text-lg">{handle}</Text>
        <Text className="text-md">{title}</Text>
      </View>
    </View>
  );
}

function WaitingRoom({ route }) {
  const { user, roomId } = route.params;
  const { isLoading, error, data } = useQuery({
    rooms: { users: {}, $: { where: { id: roomId } } },
  });
  if (isLoading) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const room = data["rooms"][0];
  const users = room.users
    .map((u) => {
      return {
        ...u,
        isHost: room.hostId === u.id,
        isYou: u.id === user.id,
      };
    })
    .sort(userSort);

  return (
    <SafeView className="flex-1 justify-center mx-8">
      <View className="flex-1 justify-start -mt-2">
        {users.map((u) => {
          let title = [];
          if (u.isHost) {
            title.push("Host");
          }
          if (u.isYou) {
            title.push("You");
          }
          return (
            <UserPill key={u.id} handle={u.handle} title={title.join(", ")} />
          );
        })}
      </View>
      <View className="flex-1 justify-end space-y-4">
        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text className={`${textStyle}`}>Invite Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text className={`${textStyle}`}>Ready!</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

export default WaitingRoom;
