import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const session = await getSession();

  // Contoh validasi sederhana
  if (email === 'user@example.com' && password === 'password') {
    session.user = {
      id: '1',
      email: 'user@example.com',
      name: 'Test User',
    };
    await session.save();
    
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  );
}