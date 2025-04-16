// src/app/api/events/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany({
    include: { organizer: true, tickets: true },
    orderBy: { startDate: "asc" },
  });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const body = await req.json();

  const event = await prisma.event.create({
    data: {
      name: body.name,
      description: body.description,
      location: body.location,
      category: body.category,
      price: body.price,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      availableSeat: body.availableSeat,
      organizerId: body.organizerId,
    },
  });

  return NextResponse.json(event);
}

export async function GETFiltered(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || undefined;
    const location = searchParams.get("location") || undefined;
  
    const events = await prisma.event.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          },
          category ? { category } : {},
          location ? { location } : {},
        ],
      },
      orderBy: { startDate: "asc" },
    });
  
    return NextResponse.json(events);
  }
