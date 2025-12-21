import {
  mysqlTable,
  varchar,
  text,
  datetime,
  boolean,
  int,
  decimal,
} from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";

export const events = mysqlTable("events", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }),
  isOnline: boolean("is_online").default(false),
  startDate: datetime("start_date").notNull(),
  endDate: datetime("end_date").notNull(),
  capacity: int("capacity"),
  price: decimal("price", { precision: 10, scale: 2 }).default("0.00"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
