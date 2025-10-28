import { NextRequest, NextResponse } from 'next/server';
import { cspDirectives } from '#server/utilities/cspHeader/directives';
import fallbackServiceParam from '#app/routes/utils/fetchPageData/utils/getRouteProps/fallbackServiceParam';
import getPathExtension from '#app/utilities/getPathExtension';
import isLiveEnv from '#lib/utilities/isLive';
import getToggles from '#app/lib/utilities/getToggles';
import { ToggleDefinition, Toggles } from '#app/models/types/global';
import Url from 'url-parse';

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

const getToggleDefintions = (
  toggles: Toggles = {},
): Record<string, ToggleDefinition> => {
  const { _environment, ...toggleDefinitions } = toggles;
  return toggleDefinitions;
};

const isRelaxedCspEnabled = (
  omittedCountries: string | number | undefined,
  country: string,
): boolean => {
  if (!omittedCountries || omittedCountries.toString().trim() === '') {
    return true;
  }

  const allowedCountries = omittedCountries
    .toString()
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  return !allowedCountries.includes(country.toLowerCase());
};

const cspHeaderResponse = async ({ request }: { request: NextRequest }) => {
  const { isAmp } = getPathExtension(request.url);
  const { pathname } = new Url(request.url, true);
  const service = fallbackServiceParam(pathname);
  const isLive = isLiveEnv();
  const toggles = await getToggles(service);
  const toggleDefinitions = getToggleDefintions(toggles);
  const { enabled: hasAdsScripts, value: omittedCountries = '' } =
    toggleDefinitions.adsNonce || {};
  const requestHeaders = new Headers(request.headers);
  const country =
    requestHeaders.get('x-country') || requestHeaders.get('x-bbc-edge-country');

  const shouldServeRelaxedCsp =
    hasAdsScripts && isRelaxedCspEnabled(omittedCountries, country || '');

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
