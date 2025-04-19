import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Pastikan prisma sudah disetup dengan benar
import bcrypt from 'bcryptjs'; // Untuk hashing password

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ message: 'Token dan password diperlukan!' }, { status: 400 });
  }

  try {
    // Verifikasi token di database atau sistem token reset password
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.expiry < new Date()) {
      return NextResponse.json({ message: 'Token tidak valid atau sudah kadaluarsa.' }, { status: 400 });
    }

    // Hash password baru sebelum disimpan di database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password pengguna di database
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Hapus token setelah digunakan untuk keamanan
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: 'Password berhasil direset!' });
  } catch (error) {
    console.error('Error saat mereset password:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat mereset password.' }, { status: 500 });
  }
}
