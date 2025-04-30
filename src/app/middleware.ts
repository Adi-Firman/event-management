import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from './lib/jwt' // sesuaikan dengan util jwt kamu

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user = verifyJwt(token)
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const pathname = request.nextUrl.pathname

  // Jika akses dashboard customer
  if (pathname.startsWith('/dashboard/customer') && user.role !== 'customer') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika akses dashboard organizer
  if (pathname.startsWith('/dashboard/organizer') && user.role !== 'organizer') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

export function middleware(request: NextRequest) {
  console.log("🚦 Incoming request to:", request.nextUrl.pathname);
  return NextResponse.next();
}

