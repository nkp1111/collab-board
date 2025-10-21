import {
  pgTable,
  varchar,
  boolean,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

import { commonColumns, lower } from "./columns-helper.model.js";
import { UserRoles, UserStatus } from "../utils/enums.utils.js";

export const rolesEnum = pgEnum("roles", UserRoles);
export const statusEnum = pgEnum("status", UserStatus);

export const Users = pgTable(
  "users",
  {
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    status: statusEnum("status").notNull().default("active"),
    role: rolesEnum("role").notNull().default("user"),

    ...commonColumns,
  },
  (table) => [uniqueIndex("emailUniqueIndex").on(lower(table.email))]
);
