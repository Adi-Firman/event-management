// app/api/events/organizer/[organizerId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET({ params }: { params: { organizerId: string } }) {
  try {
    const events = await prisma.event.findMany({
      where: {
        organizerId: params.organizerId,
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
