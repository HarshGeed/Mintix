import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema/event";
import { createEventSchema } from "@/lib/validators/events.schema";

export async function POST(req: NextRequest){
    const body = await req.json();
    const data = createEventSchema.parse(body);

    await db.insert(events).values(data);
    return NextResponse.json({success: true, message: "Event created successfully"})
}

export async function GET(){
    const allEvents = await db.select().from(events);
    return NextResponse.json(allEvents);
}