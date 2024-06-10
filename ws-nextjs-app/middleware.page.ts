/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import cspHeaderResponse from './utilities/cspHeaderResponse';

const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? request.nextUrl.hostname;

  // Service worker is registered at the root (e.g. /pidgin) so will work as is on Test/Live
  // but will not work on localhost. This middleware rewrites the request to the sw.js file found in the 'public' folder
  if (LOCALHOST_DOMAINS.includes(hostname.split(':')[0])) {
    if (request.nextUrl.pathname.endsWith('/sw.js')) {
      return NextResponse.rewrite(new URL('/sw.js', request.url));
    }
  } else if (process.env.NODE_ENV === 'production') {
    return cspHeaderResponse({
      request,
    });
  }

  return NextResponse.next();
}
