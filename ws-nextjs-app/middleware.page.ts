/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

export function middleware(request: NextRequest) {
  // Service worker is registered at the root (e.g. /pidgin) so will work as is on Test/Live
  // but will not work on localhost. This middleware rewrites the request to the sw.js file found in the 'public' folder
  // const hostname = request.headers.get('host') ?? request.nextUrl.hostname;

  // if (LOCALHOST_DOMAINS.includes(hostname.split(':')[0])) {
  if (request.nextUrl.pathname.endsWith('/sw.js')) {
    return NextResponse.rewrite(new URL('/sw.js', request.url));
  }
  // }

  return NextResponse.next();
}

// Only run middleware for sw.js requests
export const config = {
  matcher: '/(.*)/sw.js',
};
