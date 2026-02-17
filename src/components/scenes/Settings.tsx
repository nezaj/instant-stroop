import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { useState, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { db } from "@/lib/db";
import SafeView from "@/components/shared/SafeView";
import randomHandle from "@/utils/randomHandle";
import { isAlphanumeric } from "@/utils/string";
import {
  primaryBackgroundColor as bgColor,
  regularButtonStyle,
  infoTextColor as textColor,
} from "@/components/shared/styles";
import { UserContext } from "@/Context";
import type { RootStackParamList } from "@/Navigator";

const textStyle = "text-4xl text-center";

const violet100 = "rgb(237 233 254);";
const red300 = "rgb(252, 165, 165)";
const validColor = violet100;
const invalidColor = red300;

function isValidHandle(handle: string) {
  return handle.length > 2 && handle.length < 17 && isAlphanumeric(handle);
}

function SaveHandleButton({
  handle,
  onPress,
}: {
  handle: string;
  onPress: () => void;
}) {
  const isValid = isValidHandle(handle);

  return (
    <TouchableOpacity
      disabled={!isValid}
      className={`${regularButtonStyle} my-4`}
      style={{
        backgroundColor: isValid ? validColor : invalidColor,
        shadowColor: "#6200EA",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        opacity: 0.8,
      }}
      onPress={onPress}
    >
      <Text className={`${textStyle}`}>Save</Text>
    </TouchableOpacity>
  );
}

type Props = StackScreenProps<RootStackParamList, "Settings">;

function Settings({ navigation }: Props) {
  const user = useContext(UserContext)!;
  const [handle, setHandle] = useState(user.handle || randomHandle());
  const handleSave = () => {
    db.transact(db.tx.$users[user.id].update({ handle }));
    navigation.navigate("Main");
  };
  return (
    <SafeView className={`flex-1 items-center ${bgColor}`}>
      <View className="flex-1 w-full px-8">
        <View className="flex-1 justify-end">
          <Text
            className={`text-2xl font-semibold my-4 text-center ${textColor}`}
          >
            Enter name
          </Text>
          <TextInput
            autoCorrect={false}
            className={`h-20 p-2 text-4xl text-center border-4 border-amber-400 ${textColor} font-semibold`}
            onChangeText={setHandle}
            value={handle}
          />
        </View>
        <View className="flex-1 justify-end">
          <SaveHandleButton handle={handle} onPress={handleSave} />
        </View>
      </View>
    </SafeView>
  );
}

export default Settings;
