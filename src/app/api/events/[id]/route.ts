// src/app/api/events/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      organizer: true,
      tickets: true,
      reviews: true,
    },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}
