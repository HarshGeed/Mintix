import { NextResponse } from "next/server";
import { getEventById, updateEvent, deleteEvent } from "@/services/events.services";
import { updateEventSchema } from "@/lib/validators/events.schema";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const event = await getEventById(params.id);
  if (!event) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(event);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const parsed = updateEventSchema.parse(body);

  await updateEvent(params.id, parsed);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await deleteEvent(params.id);
  return NextResponse.json({ success: true });
}
