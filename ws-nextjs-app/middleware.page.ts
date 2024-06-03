/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fallbackServiceParam from '#app/routes/utils/fetchPageData/utils/getRouteProps/fallbackServiceParam';
import isAmpPath from '#app/routes/utils/isAmpPath/index.js';

import cspHeaderResponse from './utilities/cspHeaderResponse';

const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

export function middleware(request: NextRequest) {
  // Service worker is registered at the root (e.g. /pidgin) so will work as is on Test/Live
  // but will not work on localhost. This middleware rewrites the request to the sw.js file found in the 'public' folder
  const hostname = request.headers.get('host') ?? request.nextUrl.hostname;
  const isAmp = isAmpPath(request.url);
  const service = fallbackServiceParam(request.url);

  if (LOCALHOST_DOMAINS.includes(hostname.split(':')[0])) {
    if (request.nextUrl.pathname.endsWith('/sw.js')) {
      return NextResponse.rewrite(new URL('/sw.js', request.url));
    }
  }

  const responseWithCsp = cspHeaderResponse({ request, service, isAmp });

  return responseWithCsp;
}

// Only run middleware for sw.js requests
// export const config = {
//   matcher: '/(.*)/sw.js',
// };
