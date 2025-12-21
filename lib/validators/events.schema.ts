import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().optional(),
  isOnline: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  capacity: z.number().optional(),
  price: z.string().optional(),
});

export const updateEventSchema = createEventSchema.partial();
