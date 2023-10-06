import { init, useQuery, transact, tx } from "@instantdb/react-native";
import { View, Text, Linking, Button } from "react-native";

const APP_ID = "24b522b3-0ef8-4939-9646-658aac8716af";

init({
  appId: APP_ID,
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

function App() {
  const { isLoading, error, data } = useQuery({ colors: {} });

  if (isLoading) {
    return (
      <View className="p-10">
        <Text>
          If you are seeing this you likely need to replace{" "}
          <Text className="bold">APP_ID</Text> on line 4
        </Text>
        <Text>{"\n"}</Text>
        <Text>
          You can get your APP_ID by{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("https://instantdb.com/dash")}
          >
            logging into your Instant dashboard
          </Text>
          . After replacing the id you may need to reload the page.
        </Text>
      </View>
    );
  }
  if (error) return <Text>Error: {error.message}</Text>;

  return <Main data={data} />;
}

const selectId = "4d39508b-9ee2-48a3-b70d-8192d9c5a059";

function Main({ data }) {
  const { colors } = data;
  const { color } = colors[0] || { color: "grey" };

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <View className="my-4">
        <Text className="text-2xl font-bold mb-4">
          Hi! pick your favorite color
        </Text>
        <View className="flex-row justify-between mx-8">
          {["green", "blue", "purple"].map((c) => {
            return (
              <Button
                title={c}
                onPress={() => {
                  transact(tx.colors[selectId].update({ color: c }));
                }}
                key={c}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
export default App;
