import { Text, TouchableOpacity, View } from "react-native";
import { transact, tx, useQuery } from "@instantdb/react-native";
import Toast from "react-native-root-toast";

import SafeView from "@/components/shared/SafeView";
import { stringModulus } from "@/utils/string";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

function userSort(a, b) {
  // Host comes first
  if (a.isHost) return -1;
  if (b.isHost) return 1;

  // You comes second
  if (a.isYou) return -1;
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

function UserPill({ user, room, isReady, isAdmin }) {
  const { isYou, isHost, id: userId, handle } = user;
  const { id: roomId, readyPlayerIds, kickedPlayerIds } = room;

  // Avatar
  const bgColorIdx = stringModulus(handle, profileColors.length);
  const bgColor = profileColors[bgColorIdx];

  // Title
  let title = [];
  if (isHost) {
    title.push("Host");
  }
  if (isYou) {
    title.push("You");
  }
  title = title.join(", ");

  // Ready Indicator
  const readyDot = isHost || isReady ? "bg-green-400" : "bg-slate-400";

  return (
    <View className="flex-row rounded-xl border border-black items-center my-2 py-4">
      <View className={`mx-4 w-12 h-12 ${bgColor} rounded-full`} />
      <View className="flex-1 flex-col space-y-1">
        <Text className="text-lg">{handle}</Text>
        <Text className="text-md">{title}</Text>
      </View>
      <View className="justify-end">
        {isAdmin && !isYou && (
          <TouchableOpacity
            className="bg-red-400 rounded-full"
            onPress={() => {
              transact([
                tx.rooms[roomId].update({
                  kickedPlayerIds: [...kickedPlayerIds, userId],
                  readyPlayerIds: readyPlayerIds.filter((x) => x !== userId),
                }),
                tx.rooms[roomId].unlink({ users: userId }),
              ]);
            }}
          >
            <Text className="text-white py-2 px-4">Kick</Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        className={`mx-4 justify-end ${readyDot} border border-white rounded-full w-4 h-4`}
      />
    </View>
  );
}

function WaitingRoom({ route, navigation }) {
  const { user, roomId } = route.params;
  const { isLoading, error, data } = useQuery({
    rooms: { users: {}, $: { where: { id: roomId } } },
  });
  if (isLoading) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const room = data["rooms"][0];
  console.log("Room!", room);
  if (!room) {
    Toast.show("Oh no! Looks like this room was abruptly deleted.", {
      duration: Toast.durations.LONG,
    });
    navigation.navigate("Main");
    return <Text>...</Text>;
  }
  if (room.kickedPlayerIds.includes(user.id)) {
    Toast.show("You were kicked from the room 🤷‍♂️.", {
      duration: Toast.durations.SHORT,
    });
    navigation.navigate("Main");
    return <Text>...</Text>;
  }
  const users = room.users
    .map((u) => {
      return {
        ...u,
        isHost: room.hostId === u.id,
        isYou: u.id === user.id,
      };
    })
    .sort(userSort);

  const isAdmin = user.id === room.hostId;
  const isReady = room.readyPlayerIds.includes(user.id);
  const readyText = isReady ? "Not Ready" : "Ready!";
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
          const isReady = room.readyPlayerIds.includes(u.id);
          return (
            <UserPill
              key={u.id}
              user={u}
              room={room}
              isReady={isReady}
              isAdmin={isAdmin}
            />
          );
        })}
      </View>
      <View className="flex-1 justify-end space-y-4">
        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text className={`${textStyle}`}>Invite Friends</Text>
        </TouchableOpacity>
        {isAdmin ? (
          <TouchableOpacity
            disabled={room.readyPlayerIds.length === 0}
            className={`${mainButtonStyle}`}
          >
            <Text className={`${textStyle}`}>Start!</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              isReady
                ? transact(
                    tx.rooms[roomId].update({
                      readyPlayerIds: room.readyPlayerIds.filter(
                        (x) => x !== user.id
                      ),
                    })
                  )
                : transact(
                    tx.rooms[roomId].update({
                      readyPlayerIds: [...room.readyPlayerIds, user.id],
                    })
                  );
            }}
            className={`${mainButtonStyle}`}
          >
            <Text className={`${textStyle}`}>{readyText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeView>
  );
}

export default WaitingRoom;
