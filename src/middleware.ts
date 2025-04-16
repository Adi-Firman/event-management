// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function (request: NextRequest) {
  return NextResponse.next()
}
