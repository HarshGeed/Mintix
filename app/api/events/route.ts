import { NextResponse } from "next/server";
import { createEventSchema } from "@/lib/validators/events.schema";
import { createEvent, getAllEvents } from "@/services/events.services";

export async function GET() {
  const events = await getAllEvents();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createEventSchema.parse(body);

  const id = await createEvent({
    ...parsed,
    startDate: new Date(parsed.startDate),
    endDate: new Date(parsed.endDate),
  });

  return NextResponse.json({ id }, { status: 201 });
}
