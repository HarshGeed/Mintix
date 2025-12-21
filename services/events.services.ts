import { db } from "@/db";
import { events } from "@/db/schema/event";
import { eq } from "drizzle-orm";

export const getAllEvents = () => db.select().from(events);

export const getEventById = (id: number) => db.select().from(events).where(eq(events.id, id));

export const deleteEvent = (id: number) => db.delete(events).where(eq(events.id, id));