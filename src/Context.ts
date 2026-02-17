import { createContext } from "react";
import { InstaQLEntity } from "@instantdb/react-native";
import type { AppSchema } from "../instant.schema";

export type User = InstaQLEntity<AppSchema, "$users">;

export const UserContext = createContext<User | null>(null);
