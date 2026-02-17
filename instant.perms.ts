import type { InstantRules } from "@instantdb/react-native";

const rules = {
  // Lock down schema -- prevent clients from creating new attribute types
  attrs: {
    allow: {
      create: "false",
    },
  },
  // $users is a managed namespace: create/delete are handled by Instant.
  // Instant prevents modifying built-in columns (email) via transactions,
  // so we just need the ownership check here.
  $users: {
    allow: {
      view: "true",
      create: "false",
      delete: "false",
      update: "auth.id == data.id",
    },
    fields: {
      email: "auth.id == data.id",
    },
  },
  rooms: {
    allow: {
      view: "true",
      create: "auth.id != null",
      update: "isHost || onlyMemberFields",
      delete: "false",
    },
    bind: {
      isHost: "auth.id == data.hostId",
      // Non-hosts can only toggle ready and clear currentGameId (play again)
      onlyMemberFields:
        "request.modifiedFields.all(field, field in ['readyIds', 'currentGameId'])",
    },
  },
  games: {
    allow: {
      view: "true",
      create: "auth.id != null",
      update: "onlyMutableFields",
      delete: "false",
    },
    bind: {
      // Only status changes after creation (playerIds, colors, created_at are immutable)
      onlyMutableFields:
        "request.modifiedFields.all(field, field in ['status'])",
    },
  },
  points: {
    allow: {
      view: "true",
      create: "auth.id != null",
      update: "isOwner && onlyMutableFields",
      delete: "false",
    },
    bind: {
      isOwner: "auth.id == data.userId",
      onlyMutableFields:
        "request.modifiedFields.all(field, field in ['val'])",
    },
  },
} satisfies InstantRules;

export default rules;
