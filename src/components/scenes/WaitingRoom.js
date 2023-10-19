import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { transact, tx, useQuery, id } from "@instantdb/react-native";
import Toast from "react-native-root-toast";
import * as Clipboard from "expo-clipboard";

import { startMultiplayerGame } from "@/game";
import SafeView from "@/components/shared/SafeView";
import { avatarColor } from "@/utils/profile";

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

function InviteButton({ code }) {
  async function copy(code) {
    await Clipboard.setStringAsync(
      `Let's play Stroopwafel! My game code is: ${code}`
    );
    Toast.show("Game code copied! Send it over to your friends :)", {
      duration: Toast.durations.LONG,
    });
  }
  return (
    <TouchableOpacity
      className={`${mainButtonStyle}`}
      onPress={() => copy(code)}
    >
      <Text className={`${textStyle}`}>Invite Friends</Text>
    </TouchableOpacity>
  );
}

function UserPill({ user, room, isReady, isAdmin }) {
  const { isYou, isHost, id: userId, handle } = user;
  const { id: roomId, readyIds, kickedIds } = room;

  // Avatar
  const avatarStyle = avatarColor(handle);

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
      <View className={`mx-4 w-12 h-12 ${avatarStyle} rounded-full`} />
      <View className="flex-1 flex-col space-y-1">
        <Text className="text-lg">{handle}</Text>
        <Text className="text-md">{title}</Text>
      </View>
      <View className="justify-end">
        {isAdmin && !isYou && (
          <TouchableOpacity
            className="bg-red-400 rounded-full"
            onPress={() =>
              transact(
                tx.rooms[roomId]
                  .update({
                    kickedIds: [...kickedIds, userId],
                    readyIds: readyIds.filter((x) => x !== userId),
                  })
                  .unlink({ users: userId })
              )
            }
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

  const room = data?.rooms?.[0];

  // Handle navigating away from rooms
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!room) {
      Toast.show("Oh no! Looks like this room was abruptly deleted.", {
        duration: Toast.durations.LONG,
      });
      navigation.navigate("Main");
      return;
    }
    if (room.kickedIds.includes(user.id)) {
      Toast.show("You were kicked from the room 🤷‍♂️.", {
        duration: Toast.durations.SHORT,
      });
      navigation.navigate("Main");
      return;
    }

    if (room.currentGameId) {
      navigation.navigate("Multiplayer", { gameId: room.currentGameId });
      return;
    }
  }, [isLoading, room]);

  if (isLoading || !room) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

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
  const isReady = room.readyIds.includes(user.id);
  const readyText = isReady ? "Not Ready" : "Ready!";

  return (
    <SafeView className="flex-1 justify-center mx-8">
      <View className="flex-1 justify-start -mt-2">
        {users.map((u) => {
          const isReady = room.readyIds.includes(u.id);
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
        <InviteButton code={room.code} />
        {isAdmin ? (
          <TouchableOpacity
            onPress={() => startMultiplayerGame(room)}
            className={`${mainButtonStyle}`}
          >
            <Text className={`${textStyle}`}>Start!</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              const markReady = tx.rooms[roomId].update({
                readyIds: [...room.readyIds, user.id],
              });
              const markNotReady = tx.rooms[roomId].update({
                readyIds: room.readyIds.filter((x) => x !== user.id),
              });
              const toggleReady = isReady ? markNotReady : markReady;
              transact(toggleReady);
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
