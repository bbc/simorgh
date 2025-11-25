import { NextResponse, NextRequest } from 'next/server';

import addPlatformToRequestChainHeader from '#server/utilities/addPlatformToRequestChainHeader';
import cspHeaderResponse from './utilities/cspHeaderResponse';

const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

export default async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? request.nextUrl.hostname;
  let response = NextResponse.next();

  const isLocalhost = LOCALHOST_DOMAINS.includes(hostname.split(':')?.[0]);

  const PRODUCTION_ONLY = !isLocalhost && process.env.NODE_ENV === 'production';

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
