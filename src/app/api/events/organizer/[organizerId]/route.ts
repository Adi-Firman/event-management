import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Pastikan sesuaikan dengan konfigurasi auth yang digunakan

export async function GET(req: Request, { params }: { params: { organizerId: string } }) {
  try {
    // Ambil session user
    const session = await getServerSession(authOptions);

    if (!session) {
      // Session tidak ditemukan
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Pastikan session user.id sesuai dengan organizerId di URL
    if (session.user.id !== params.organizerId) {
      // Jika organizerId tidak sesuai dengan user yang login, batalkan request
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Ambil daftar event yang dibuat oleh organizer
    const events = await prisma.event.findMany({
      where: {
        organizerId: session.user.id, // Filter berdasarkan organizerId
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
