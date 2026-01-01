// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const BASE_PATH = 'worldservice';

  // All page update requests made from the client-side will go forward normally since the client will add the base path by default.
  if (req.nextUrl.href.includes(BASE_PATH)) {
    return NextResponse.next();
  }

  // All other requests eg: bbc.com/mundo/articles/articleID will be changed to bbc.com/ws-base-path/mundo/articles/articleID
  const rewriteToUrl = req.nextUrl.clone();
  rewriteToUrl.pathname = `${BASE_PATH}${pathname}`;
  rewriteToUrl.search = req.nextUrl.search;

  return NextResponse.rewrite(rewriteToUrl);
};
