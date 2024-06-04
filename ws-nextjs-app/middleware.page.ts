/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fallbackServiceParam from '#app/routes/utils/fetchPageData/utils/getRouteProps/fallbackServiceParam';
import isAmpPath from '#app/routes/utils/isAmpPath';
import isLiveEnv from '#lib/utilities/isLive';
import cspHeaderResponse from './utilities/cspHeaderResponse';

const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? request.nextUrl.hostname;
  const isAmp = isAmpPath(request.url);
  const service = fallbackServiceParam(request.url);

  // Service worker is registered at the root (e.g. /pidgin) so will work as is on Test/Live
  // but will not work on localhost. This middleware rewrites the request to the sw.js file found in the 'public' folder
  if (LOCALHOST_DOMAINS.includes(hostname.split(':')[0])) {
    if (request.nextUrl.pathname.endsWith('/sw.js')) {
      return NextResponse.rewrite(new URL('/sw.js', request.url));
    }
  } else if (process.env.NODE_ENV === 'production') {
    return cspHeaderResponse({
      request,
      service,
      isAmp,
      isLive: isLiveEnv(),
      reportOnlyOnLive: service === 'japanese',
    });
  }

  return NextResponse.next();
}
