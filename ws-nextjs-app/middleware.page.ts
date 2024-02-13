/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Service worker is registered at the root (e.g. /pidgin) so will work as is on Test/Live
  // but will not work on localhost. This middleware rewrites the request to the sw.js file found in the 'public' folder
  if (['localhost', '127.0.0.1'].includes(request.nextUrl.hostname)) {
    if (request.nextUrl.pathname.endsWith('/sw.js')) {
      return NextResponse.rewrite(new URL('/sw.js', request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware for sw.js requests
export const config = {
  matcher: '/(.*)/(sw.js)',
};
