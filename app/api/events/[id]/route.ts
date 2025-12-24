import { NextResponse } from "next/server";
import { getEventById, updateEvent, deleteEvent } from "@/services/events.services";
import { updateEventSchema } from "@/lib/validators/events.schema";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(event);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateEventSchema.parse(body);

  const updateData: any = { ...parsed };
  if (parsed.startDate) {
    updateData.startDate = new Date(parsed.startDate);
  }
  if (parsed.endDate) {
    updateData.endDate = new Date(parsed.endDate);
  }

  await updateEvent(id, updateData);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteEvent(id);
  return NextResponse.json({ success: true });
}
