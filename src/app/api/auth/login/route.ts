import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Adjusted to use an alias if configured in tsconfig.json
import { sign } from 'jsonwebtoken'; // Untuk menghasilkan token JWT

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email dan password diperlukan!' }, { status: 400 });
  }

  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 400 });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Password salah' }, { status: 400 });
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!, // Pastikan kamu set JWT_SECRET di .env
      { expiresIn: '1h' }
    );

    // Kirimkan token ke frontend
    return NextResponse.json({ message: 'Login sukses', token });
  } catch (error) {
    console.error('Error saat login:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat login' }, { status: 500 });
  }
}
