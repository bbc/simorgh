import { cspDirectives } from '#server/utilities/cspHeader/directives';
import fallbackServiceParam from '#app/routes/utils/fetchPageData/utils/getRouteProps/fallbackServiceParam';
import getPathExtension from '#app/utilities/getPathExtension';
import isLiveEnv from '#lib/utilities/isLive';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { Services } from '#app/models/types/global';
import SERVICES from '#app/lib/config/services';
import { DocumentContext } from 'next/document';

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

const cspHeaderResponse = async ({ ctx }: { ctx: DocumentContext }) => {
  const reqUrl = ctx.req?.url || '';
  const { isAmp } = getPathExtension(reqUrl);
  const isLive = isLiveEnv();

  let hasAdsScripts = false;
  let countryList = '';

  if (isValidService(reqUrl)) {
    const service = fallbackServiceParam(reqUrl);
    const toggles = await getToggles(service);

    ({ enabled: hasAdsScripts, value: countryList = '' } =
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
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

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
