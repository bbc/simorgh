import { NextRequest, NextResponse } from 'next/server';
import { cspDirectives } from '#server/utilities/cspHeader/directives';
import fallbackServiceParam from '#app/routes/utils/fetchPageData/utils/getRouteProps/fallbackServiceParam';
import getPathExtension from '#app/utilities/getPathExtension';
import isLiveEnv from '#lib/utilities/isLive';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { Services } from '#app/models/types/global';
import SERVICES from '#app/lib/config/services';

const setReportTo = (header: Headers) => {
  header.set(
    'report-to',
    JSON.stringify({
      group: 'worldsvc',
      max_age: 2592000,
      endpoints: [
        {
          url: process.env.SIMORGH_CSP_REPORTING_ENDPOINT,
          priority: 1,
        },
      ],
      include_subdomains: true,
    }),
  );
};

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

const isRelaxedCspEnabled = (
  countryList: string | number | undefined,
  country: string,
): boolean => {
  if (!countryList || countryList.toString().trim() === '') {
    return true;
  }

  const omittedCountriesList = countryList
    .toString()
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  return !omittedCountriesList.includes(country.toLowerCase());
};

const isValidService = (str: string) => {
  const [service] = str.split('/').filter(Boolean) as [Services?];
  return service && SERVICES.includes(service);
};

const cspHeaderResponse = async ({ request }: { request: NextRequest }) => {
  const { isAmp } = getPathExtension(request.url);
  const isLive = isLiveEnv();
  const urlPath = request.nextUrl.pathname;
  let hasAdsScripts = false;
  let countryList = '';

  if (isValidService(urlPath)) {
    const service = fallbackServiceParam(request.nextUrl.pathname);
    const toggles = await getToggles(service);

    ({ enabled: hasAdsScripts, value: countryList = '' } =
      toggles?.adsNonce || { enabled: false, value: '' });
  }

  const requestHeaders = new Headers(request.headers);
  const country =
    requestHeaders.get('x-country') || requestHeaders.get('x-bbc-edge-country');
  const shouldServeRelaxedCsp =
    hasAdsScripts && isRelaxedCspEnabled(countryList, country || '');

  const { directives } = cspDirectives({
    isAmp,
    isLive,
    shouldServeRelaxedCsp,
  });

  const BUMP4SpecificConditions = {
    'media-src': ['https:', 'blob:'],
    'connect-src': ['https:'],
  };

  const contentSecurityPolicyHeaderValue = directiveToString({
    ...directives,
    ...BUMP4SpecificConditions,
  });

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );
  setReportTo(requestHeaders);

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
  setReportTo(cspAlteredResponse.headers);

  return cspAlteredResponse;
};

export default cspHeaderResponse;
