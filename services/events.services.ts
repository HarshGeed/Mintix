import { db } from "@/db";
import { events } from "@/db/schema/events";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { CreateEventInput, UpdateEventInput } from "@/types/event";

export const createEvent = async (data: CreateEventInput) => {
  const id = randomUUID();
  await db.insert(events).values({ ...data, id });
  return id;
};

export const getAllEvents = async () => {
  return db.select().from(events);
};

export const getEventById = async (id: string) => {
  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, id));

  return result[0] ?? null;
};

export const updateEvent = async (
  id: string,
  data: UpdateEventInput
) => {
  await db.update(events).set(data).where(eq(events.id, id));
};

export const deleteEvent = async (id: string) => {
  await db.delete(events).where(eq(events.id, id));
};
