import { init } from "@instantdb/react-native";
import schema from "../../instant.schema";

const APP_ID = "24b522b3-0ef8-4939-9646-658aac8716af";

export const db = init({ appId: APP_ID, schema });
