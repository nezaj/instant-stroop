import { init, useQuery, transact, tx } from "@instantdb/react-native";
import { View, Text, Linking, Button } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const APP_ID = "24b522b3-0ef8-4939-9646-658aac8716af";

init({
  appId: APP_ID,
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

function App() {
  const { isLoading, error, data } = useQuery({});
  if (isLoading) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaProvider>
      <Main data={data} />
    </SafeAreaProvider>
  );
}

function Main({ data }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text>Hello World!</Text>
    </View>
  );
}

export default App;
