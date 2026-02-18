import { i } from "@instantdb/react-native";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.any().unique().indexed(),
      handle: i.string().optional(),
      highScore: i.number().optional(),
      created_at: i.string().optional(),
    }),
    rooms: i.entity({
      code: i.string().optional().indexed(),
      hostId: i.string(),
      readyIds: i.json(),
      kickedIds: i.json(),
      currentGameId: i.string().optional(),
      created_at: i.string(),
      deleted_at: i.string().optional(),
    }),
    games: i.entity({
      status: i.string(),
      playerIds: i.json(),
      colors: i.json(),
      created_at: i.string(),
    }),
    points: i.entity({
      val: i.number(),
      userId: i.string(),
    }),
  },
  links: {
    roomUsers: {
      forward: { on: "rooms", has: "many", label: "users" },
      reverse: { on: "$users", has: "many", label: "rooms" },
    },
    gameUsers: {
      forward: { on: "games", has: "many", label: "users" },
      reverse: { on: "$users", has: "many", label: "games" },
    },
    gameRooms: {
      forward: { on: "games", has: "many", label: "rooms" },
      reverse: { on: "rooms", has: "many", label: "games" },
    },
    gamePoints: {
      forward: { on: "games", has: "many", label: "points" },
      reverse: { on: "points", has: "one", label: "game" },
    },
  },
  rooms: {},
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
