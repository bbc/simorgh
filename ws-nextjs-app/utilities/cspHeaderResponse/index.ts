import { NextRequest, NextResponse } from 'next/server';
import { cspDirectives } from '#server/utilities/cspHeader/directives';
import fallbackServiceParam from '#app/routes/utils/fetchPageData/utils/getRouteProps/fallbackServiceParam';
import isAmpPath from '#app/routes/utils/isAmpPath';
import isLiveEnv from '#lib/utilities/isLive';

const directiveToString = (directives: Record<string, string | string[]>) => {
  const map = new Map(Object.entries(directives));
  let cspValue = '';
  map.forEach((allowList, directive) => {
    const allowListString = [allowList]
      .flat()
      .reduce((curr, acc) => `${curr} ${acc}`, '')
      .replace(/\s{2,}/g, ' ');
    cspValue += `${directive}${allowListString.length > 0 ? ' ' : ''}${allowListString};`;
  });
  return cspValue;
};

const cspHeaderResponse = ({ request }: { request: NextRequest }) => {
  const isAmp = isAmpPath(request.url);
  const service = fallbackServiceParam(request.url);
  const isLive = isLiveEnv();

  const requestHeaders = new Headers(request.headers);

  const { directives } = cspDirectives({
    isAmp,
    isLive,
    service,
  });

  const contentSecurityPolicyHeaderValue = directiveToString(directives);

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  const responseInit = {
    request: {
      headers: requestHeaders,
    },
  };

  const cspAlteredResponse = NextResponse.next(responseInit);
  cspAlteredResponse.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  return cspAlteredResponse;
};

export default cspHeaderResponse;
