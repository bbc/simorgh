/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (['localhost', '127.0.0.1'].includes(request.nextUrl.hostname)) {
    if (request.nextUrl.pathname.endsWith('/sw.js')) {
      return NextResponse.rewrite(new URL('/sw.js', request.url));
    }
  }

  return NextResponse.next();
}
