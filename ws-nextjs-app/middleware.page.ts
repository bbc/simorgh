import { NextRequest, NextResponse } from 'next/server';
import {
  generateDefaultSrc,
  generateChildSrc,
  generateConnectSrc,
  generateFontSrc,
  generateFrameSrc,
  generateImgSrc,
  generateScriptSrc,
  generateStyleSrc,
  generateMediaSrc,
  generateWorkerSrc,
} from '#server/utilities/cspHeader/directiveGenerators';
import isLiveEnv from '#lib/utilities/isLive';
import isAmpPath from '#app/routes/utils/isAmpPath';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    return response;
  }

  const isAmp = isAmpPath(request.url);
  const isLive = isLiveEnv();

  const cspHeader = `
    default-src ${generateDefaultSrc().join(' ')};
    child-src ${generateChildSrc({ isAmp }).join(' ')};
    connect-src ${generateConnectSrc({ isAmp, isLive }).join(' ')};
    font-src ${generateFontSrc({ isAmp, isLive }).join(' ')};
    frame-src ${generateFrameSrc({ isAmp, isLive }).join(' ')};
    img-src ${generateImgSrc({ isAmp, isLive }).join(' ')};
    script-src ${generateScriptSrc({ isAmp, isLive }).join(' ')};
    style-src ${generateStyleSrc({ isAmp, isLive }).join(' ')};
    media-src ${generateMediaSrc({ isAmp, isLive }).join(' ')};
    worker-src ${generateWorkerSrc({ isAmp }).join(' ')};
    report-to 'worldsvc';
    upgrade-insecure-requests ${[]};
`;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
