import { NextRequest, NextResponse } from 'next/server';
import { cspDirectives } from '#server/utilities/cspHeader/directives';
import fallbackServiceParam from '#app/routes/utils/fetchPageData/utils/getRouteProps/fallbackServiceParam';
import getPathExtension from '#app/utilities/getPathExtension';
import isLiveEnv from '#lib/utilities/isLive';
import getToggles from '#app/lib/utilities/getToggles';
import { ToggleDefinition, Toggles } from '#app/models/types/global';

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
  countriesList: string | number | undefined,
  country: string,
): boolean => {
  if (!countriesList || countriesList.toString().trim() === '') {
    return true;
  }

  console.log('initial condition', countriesList.toString().trim() === '');

  const omittedCountries = countriesList
    .toString()
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  console.log('extracting countries', omittedCountries);

  console.log(
    'check if country is in array',
    !omittedCountries.includes(country.toLowerCase()),
  );

  return !omittedCountries.includes(country.toLowerCase());
};

const cspHeaderResponse = async ({ request }: { request: NextRequest }) => {
  const { isAmp } = getPathExtension(request.url);
  const service = fallbackServiceParam(request.url);
  const isLive = isLiveEnv();
  const toggles = await getToggles(service);
  const toggleDefinitions = getToggleDefintions(toggles);
  const { enabled: isToggleEnabled, value: countriesList = '' } =
    toggleDefinitions.adsNonce || {};
  const requestHeaders = new Headers(request.headers);
  const country =
    requestHeaders.get('x-country') || requestHeaders.get('x-bbc-edge-country');

  console.log(country);

  const shouldServeRelaxedCsp =
    isToggleEnabled && isRelaxedCspEnabled(countriesList, country || '');

  console.log('final condition', shouldServeRelaxedCsp);

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
