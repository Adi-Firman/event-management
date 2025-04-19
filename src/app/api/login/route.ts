import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { signJwt } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Password salah' }, { status: 401 });
    }

    const token = signJwt({ id: user.id, email: user.email, role: user.role }); // Pastikan role dimasukkan ke JWT
    return NextResponse.json({ token });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return NextResponse.json({ message: 'Terjadi kesalahan di server' }, { status: 500 });
  }
}
