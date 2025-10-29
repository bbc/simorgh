import { NextResponse, NextRequest } from 'next/server';

import addPlatformToRequestChainHeader from '#server/utilities/addPlatformToRequestChainHeader';
import cspHeaderResponse from './utilities/cspHeaderResponse';

const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

export default async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? request.nextUrl.hostname;
  let response = NextResponse.next();

  const isLocalhost = LOCALHOST_DOMAINS.includes(hostname.split(':')?.[0]);

  const PRODUCTION_ONLY = !isLocalhost && process.env.NODE_ENV === 'production';

  const LOCAL_DEV_ONLY = isLocalhost && process.env.NODE_ENV !== 'production';

  // Service worker is registered at the root (e.g. /pidgin) so will work as is on Test/Live
  // but will not work on localhost. This middleware rewrites the request to the sw.js file found in the 'public' folder
  if (LOCAL_DEV_ONLY) {
    if (request.nextUrl.pathname.endsWith('/sw.js')) {
      return NextResponse.rewrite(new URL('/sw.js', request.url));
    }
  }

  if (PRODUCTION_ONLY) {
    response = await cspHeaderResponse({ request });
  }

  response.headers.set(
    'req-svc-chain',
    addPlatformToRequestChainHeader({
      headers: request.headers,
    }),
  );

  return response;
}

export const config = {
  runtime: 'nodejs',
};
