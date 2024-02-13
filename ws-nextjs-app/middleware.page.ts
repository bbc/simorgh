/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Requests to '<service>/sw.js' are rewritten to '/sw.js'
  if (req.nextUrl.pathname.endsWith('/sw.js')) {
    return NextResponse.rewrite(new URL('/sw.js', req.url));
  }
}
