// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const BASE_PATH = 'worldservice';

  // Requests that already have the base path will go forward noramlly.
  if (req.nextUrl.href.includes(BASE_PATH)) {
    return NextResponse.next();
  }

  // All other requests eg: bbc.com/mundo/articles/articleID will be changed to bbc.com/ws-base-path/mundo/articles/articleID
  const rewriteToUrl = req.nextUrl.clone();
  rewriteToUrl.pathname = `${BASE_PATH}${pathname}`;
  rewriteToUrl.search = req.nextUrl.search;

  return NextResponse.rewrite(rewriteToUrl);
};
