import type { InstantRules } from "@instantdb/react-native";

const rules = {
  // App uses anonymous users (AsyncStorage-based IDs, no Instant auth),
  // so permissions are open for now. Tighten these if you add auth.
  users: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
  rooms: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
  games: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
  points: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
} satisfies InstantRules;

export default rules;
