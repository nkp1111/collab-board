import { sql, SQL } from "drizzle-orm";
import { AnyPgColumn, timestamp, uuid } from "drizzle-orm/pg-core";

const uuids = {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
};

const timestamps = {
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
};

export const commonColumns = {
  ...uuids,
  ...timestamps,
};

// custom lower function
export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
