import { NextPageContext } from 'next/types';
import { cspDirectives } from '#utilities/cspHeader/directives';
import getPathExtension from '#app/utilities/getPathExtension';
import isLiveEnv from '#lib/utilities/isLive';
import { Services, Toggles } from '#app/models/types/global';
import getCspTier from './getCspTier';
import createNonce from './createNonce';

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

type AddCspHeaderProps = {
  ctx: NextPageContext;
  service: Services;
  toggles: Toggles;
  country?: string | null;
  showAdsBasedOnLocation?: boolean;
};

const addCspHeader = ({
  ctx,
  service,
  toggles,
  country,
  showAdsBasedOnLocation = false,
}: AddCspHeaderProps) => {
  const hostname = ctx.req?.headers.host || '';

  const isLocalhost = LOCALHOST_DOMAINS.some(domain =>
    hostname.includes(domain),
  );

  const PRODUCTION_ONLY = !isLocalhost && process.env.NODE_ENV === 'production';

  if (!PRODUCTION_ONLY) return { nonce: null, cspHeader: null };

  const reqUrl = ctx.req?.url || '';
  const { isAmp, isLite } = getPathExtension(reqUrl);
  const isLive = isLiveEnv();

  const resolvedCountry = country?.toLowerCase() || '';

  const cspTier = getCspTier({
    service,
    country: resolvedCountry,
    toggles,
    isAmp,
    isLite,
    showAdsBasedOnLocation,
  });

  const nonce = cspTier === 'nonce' ? createNonce() : null;

  const { directives } = cspDirectives({
    isAmp,
    isLive,
    nonce,
    shouldServeRelaxedCsp: cspTier === 'relaxed',
    country: resolvedCountry,
  });

  const contentSecurityPolicyHeaderValue = directiveToString({
    ...directives,
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

  return { nonce, cspHeader: contentSecurityPolicyHeaderValue };
};

export default addCspHeader;
