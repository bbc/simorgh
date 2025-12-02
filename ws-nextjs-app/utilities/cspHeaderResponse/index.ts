import { cspDirectives } from '#server/utilities/cspHeader/directives';
import getPathExtension from '#app/utilities/getPathExtension';
import isLiveEnv from '#lib/utilities/isLive';
import { Services, Toggles } from '#app/models/types/global';
import SERVICES from '#app/lib/config/services';
import { NextPageContext } from 'next';

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

const cspHeaderResponse = async ({
  ctx,
  toggles,
}: {
  ctx: NextPageContext;
  toggles: Toggles;
}) => {
  const reqUrl = ctx.req?.url || '';
  const { isAmp } = getPathExtension(reqUrl);
  const isLive = isLiveEnv();

  let hasAdsScripts = false;
  let countryList = '';

  if (isValidService(reqUrl)) {
    ({ enabled: hasAdsScripts, value: countryList = '' } =
      // @ts-expect-error- Toggles type issue
      toggles?.adsNonce || { enabled: false, value: '' });
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

export default cspHeaderResponse;
