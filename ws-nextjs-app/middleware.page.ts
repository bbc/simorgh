/* eslint-disable import/prefer-default-export */
import { NextResponse, NextRequest } from 'next/server';

import addPlatformToRequestChainHeader from '#server/utilities/addPlatformToRequestChainHeader';
import cspHeaderResponse from './utilities/cspHeaderResponse';

export function middleware(request: NextRequest) {
  let response = NextResponse.next();

  if (process.env.NODE_ENV === 'production') {
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
