import { NextPageContext } from 'next/types';
import { cspDirectives } from '#server/utilities/cspHeader/directives';
import getPathExtension from '#app/utilities/getPathExtension';
import isLiveEnv from '#lib/utilities/isLive';
import { Services, Toggles } from '#app/models/types/global';
import SERVICES from '#app/lib/config/services';

const LOCALHOST_DOMAINS = ['localhost', '127.0.0.1'];

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

type AddCspHeaderProps = {
  ctx: NextPageContext;
  service: Services;
  toggles: Toggles;
};

const addCspHeader = ({ ctx, service, toggles }: AddCspHeaderProps) => {
  const hostname = ctx.req?.headers.host || '';

  const isLocalhost = LOCALHOST_DOMAINS.includes(hostname.split(':')?.[0]);

  const PRODUCTION_ONLY = !isLocalhost && process.env.NODE_ENV === 'production';

  if (!PRODUCTION_ONLY) return;

  const reqUrl = ctx.req?.url || '';
  const { isAmp } = getPathExtension(reqUrl);
  const isLive = isLiveEnv();

  let hasAdsScripts = false;
  let countryList = '';

  if (SERVICES.includes(service)) {
    // @ts-expect-error - Toggles type issue
    const adsNonceToggle = toggles?.adsNonce || { enabled: false, value: '' };
    hasAdsScripts = adsNonceToggle.enabled;
    countryList = adsNonceToggle.value;
  }

  const country =
    ctx?.req?.headers?.['x-country'] ||
    ctx?.req?.headers?.['x-bbc-edge-country'];

  const shouldServeRelaxedCsp =
    hasAdsScripts &&
    isRelaxedCspEnabled(countryList, (country as string) || '');

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

  ctx.res?.setHeader(
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

  ctx.res?.setHeader(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );
};

export default addCspHeader;
