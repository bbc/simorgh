import {
  createContext,
  PropsWithChildren,
  useMemo,
  useEffect,
  useState,
} from 'react';
import {
  Environments,
  Platforms,
  PageTypes,
  Services,
  Variants,
  ServerSideExperiment,
} from '#app/models/types/global';
import getStatsDestination from './getStatsDestination';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import getMetaUrls from './getMetaUrls';

export type RequestContextProps = {
  ampLink: string;
  ampUkLink: string;
  ampNonUkLink: string;
  canonicalLink: string;
  canonicalUkLink: string;
  canonicalNonUkLink: string;
  env: Environments;
  id: string | null;
  isAmp: boolean;
  isApp: boolean;
  isLite: boolean;
  isNextJs: boolean;
  isUK: boolean;
  serverSideExperiments?: ServerSideExperiment[] | null;
  origin: string;
  pageType: PageTypes;
  derivedPageType: string | null;
  pathname: string;
  platform: Platforms;
  service: Services;
  showAdsBasedOnLocation: boolean;
  showCookieBannerBasedOnCountry: boolean;
  statsDestination: string;
  statusCode: number | null;
  timeOnServer: number | null;
  variant: Variants | null;
  country?: string | null;
  nonce?: string | null;
  cspHeader: string | null;
  referrer?: string | null;
};

export const RequestContext = createContext<RequestContextProps>(
  {} as RequestContextProps,
);

type RequestProviderProps = {
  bbcOrigin?: string | null;
  derivedPageType?: string | null;
  id?: string | null;
  isAmp?: boolean;
  isApp?: boolean;
  isLite?: boolean;
  isNextJs?: boolean;
  pageType: PageTypes;
  pathname: string;
  service: Services;
  showAdsBasedOnLocation?: boolean;
  showCookieBannerBasedOnCountry?: boolean;
  statusCode?: number | null;
  timeOnServer?: number | null;
  serverSideExperiments?: ServerSideExperiment[] | null;
  variant?: Variants | null;
  isUK?: boolean | null;
  country?: string | null;
  nonce?: string | null;
  cspHeader?: string | null;
};

const REFERRER_CATEGORIES = {
  DIRECT: ['bbc.com'],
  SEARCH: ['google', 'bing', 'msn', 'yahoo', 'duckduckgo', 'yandex', 'ecosia'],
  SOCIAL: ['facebook', 'instagram', 't.co', 'youtube', 'threads', 'linkin'],
  AT_PARAM_VALUES: ['social', 'social_flow', 'ws_whatsapp'],
};

const isClient = () => typeof window !== 'undefined';

const getReferrer = (): 'search' | 'social' | 'direct' | null => {
  if (!isClient()) return null;

  const referrer = document.referrer?.toLowerCase() ?? '';
  const urlParams = new URLSearchParams(window.location.search);
  const atParam = urlParams.get('at_campaign') || urlParams.get('at_medium');

  if (REFERRER_CATEGORIES.SEARCH.some(domain => referrer.includes(domain))) {
    return 'search';
  }

  if (REFERRER_CATEGORIES.SOCIAL.some(domain => referrer.includes(domain))) {
    return 'social';
  }

  if (
    atParam &&
    REFERRER_CATEGORIES.AT_PARAM_VALUES.includes(atParam.toLowerCase())
  ) {
    return 'social';
  }

  if (REFERRER_CATEGORIES.DIRECT.some(domain => referrer.includes(domain))) {
    return 'direct';
  }

  if (!referrer) {
    return 'direct';
  }

  return null;
};
export const RequestContextProvider = ({
  bbcOrigin = null,
  derivedPageType = null,
  children,
  id = null,
  isAmp = false,
  isApp = false,
  isLite = false,
  isNextJs = false,
  serverSideExperiments = null,
  pageType,
  pathname,
  service,
  showAdsBasedOnLocation = false,
  showCookieBannerBasedOnCountry = true,
  country,
  nonce = null,
  cspHeader = null,
  statusCode = null,
  timeOnServer = null,
  variant = null,
  isUK = null,
}: PropsWithChildren<RequestProviderProps>) => {
  let { origin } = getOriginContext(bbcOrigin);
  const env: Environments = getEnv(origin);
  if (isNextJs && env === 'local') origin = 'http://localhost:7081';
  const formattedIsUK = isUK ?? false;

  const getPlatform = (): Platforms => {
    switch (true) {
      case isApp:
        return 'app';
      case isAmp:
        return 'amp';
      case isLite:
        return 'lite';
      default:
        return 'canonical';
    }
  };

  const platform = getPlatform();

  // when React renders on the server it does not have access to the referrer yet
  // by setting the initial state to null, you can make sure the server and client both start with the same value
  // the useEffect will then run on the client to update the referrer value, only after the page loads in the browser
  // this fixes the error 'Hydration failed because the server rendered text didn't match the client.'
  const [referrer, setReferrer] = useState<
    'search' | 'social' | 'direct' | null
  >(null);

  useEffect(() => {
    setReferrer(getReferrer());
  }, []);

  const statsDestination = getStatsDestination({
    isUK: platform === 'amp' ? true : formattedIsUK, // getDestination requires that statsDestination is a PS variant on AMP
    env,
    service,
  });

  const value = useMemo(
    () => ({
      env,
      id,
      isUK: formattedIsUK,
      origin,
      pageType,
      derivedPageType,
      isAmp,
      isApp,
      isLite,
      isNextJs,
      platform,
      statsDestination,
      statusCode,
      variant,
      timeOnServer,
      showAdsBasedOnLocation,
      showCookieBannerBasedOnCountry,
      service,
      pathname,
      ...getMetaUrls(origin, pathname),
      serverSideExperiments,
      country,
      nonce,
      cspHeader,
      referrer,
    }),
    [
      derivedPageType,
      env,
      formattedIsUK,
      id,
      isAmp,
      isApp,
      isLite,
      isNextJs,
      serverSideExperiments,
      origin,
      pageType,
      pathname,
      platform,
      service,
      showAdsBasedOnLocation,
      showCookieBannerBasedOnCountry,
      statsDestination,
      statusCode,
      timeOnServer,
      variant,
      country,
      cspHeader,
      nonce,
      referrer,
    ],
  );

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};
