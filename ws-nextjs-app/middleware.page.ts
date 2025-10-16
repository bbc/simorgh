/* eslint-disable import/prefer-default-export */
import { NextResponse, NextRequest } from 'next/server';

import addPlatformToRequestChainHeader from '#server/utilities/addPlatformToRequestChainHeader';
import cspHeaderResponse from './utilities/cspHeaderResponse';

const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? request.nextUrl.hostname;
  let response = NextResponse.next();

  if (
    !LOCALHOST_DOMAINS.includes(hostname.split(':')[0]) &&
    process.env.NODE_ENV === 'production'
  ) {
    response = cspHeaderResponse({ request });
  }

  response.headers.set(
    'req-svc-chain',
    addPlatformToRequestChainHeader({
      headers: request.headers,
    }),
  );

  return response;
}
