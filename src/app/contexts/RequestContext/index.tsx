import React, { PropsWithChildren, useMemo } from 'react';
import {
  Environments,
  Platforms,
  PageTypes,
  Services,
  Variants,
  MvtExperiment,
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
  mvtExperiments?: MvtExperiment[] | null;
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
};

export const RequestContext = React.createContext<RequestContextProps>(
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
  mvtExperiments?: MvtExperiment[] | null;
  variant?: Variants | null;
  isUK?: boolean | null;
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
  mvtExperiments = null,
  pageType,
  pathname,
  service,
  showAdsBasedOnLocation = false,
  showCookieBannerBasedOnCountry = true,
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
      mvtExperiments,
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
      mvtExperiments,
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
    ],
  );

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};
