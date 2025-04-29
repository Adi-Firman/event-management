import { getServerSession } from "next-auth";
import { correctExportName } from "@/lib/auth"; // Replace 'correctExportName' with the actual export name from "@/lib/auth"
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ORGANIZER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const events = await prisma.event.findMany({
      where: { organizerId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    // Pastikan 'events' dikirimkan dalam response meski kosong
    return NextResponse.json({ events: events || [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data event.' }, { status: 500 });
  }
}
