import { mysqlTable, int, varchar, datetime, text } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const events = mysqlTable("events", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", {length: 255}).notNull(),
    description: text("description"),
    date: datetime("date").notNull(),
    location: varchar("location", {length: 255}).notNull(),
    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});