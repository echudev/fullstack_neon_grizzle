import {
  pgTable,
  unique,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "users_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    name: varchar({ length: 255 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    email: varchar({ length: 255 }).notNull(),
    role: text().default("user").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      usersEmailUnique: unique("users_email_unique").on(table.email),
    };
  }
);
