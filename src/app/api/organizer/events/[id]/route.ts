import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ORGANIZER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const eventId = params.id

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })

    if (!event || event.organizerId !== session.user.id) {
      return NextResponse.json({ error: 'Event tidak ditemukan atau akses ditolak' }, { status: 404 })
    }

    await prisma.event.delete({
      where: { id: eventId },
    })

    return NextResponse.json({ message: 'Event berhasil dihapus' })
  } catch (error) {
    console.error('Gagal menghapus event:', error)
    return NextResponse.json({ error: 'Gagal menghapus event' }, { status: 500 })
  }
}
