import React, { PropsWithChildren } from 'react';
import {
  Environments,
  Platforms,
  PageTypes,
  Services,
  Variants,
  MvtExperiment,
} from '#app/models/types/global';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
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
  counterName: string | null;
  env: Environments;
  id: string | null;
  isAmp: boolean;
  isApp: boolean;
  isCaf: boolean;
  isNextJs: boolean;
  isUK: boolean;
  mvtExperiments?: MvtExperiment[] | null;
  origin: string;
  pageType: PageTypes;
  derivedPageType: string | null;
  pathname: string;
  platform: Platforms;
  previousPath: string | null;
  service: Services;
  showAdsBasedOnLocation: boolean;
  statsDestination: string;
  statsPageIdentifier: string | null;
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
  isAmp: boolean;
  isApp: boolean;
  isCaf?: boolean;
  isNextJs?: boolean;
  pageType: PageTypes;
  pathname: string;
  previousPath?: string | null;
  service: Services;
  showAdsBasedOnLocation?: boolean;
  statusCode?: number | null;
  timeOnServer?: number | null;
  mvtExperiments?: MvtExperiment[] | null;
  variant?: Variants | null;
  isUK?: boolean | null;
  counterName?: string | null;
};

export const RequestContextProvider = ({
  bbcOrigin = null,
  derivedPageType = null,
  children,
  id = null,
  isAmp,
  isApp,
  isCaf = false,
  isNextJs = false,
  mvtExperiments = null,
  pageType,
  pathname,
  previousPath = null,
  service,
  showAdsBasedOnLocation = false,
  statusCode = null,
  timeOnServer = null,
  variant = null,
  isUK = null,
  counterName = null,
}: PropsWithChildren<RequestProviderProps>) => {
  const { origin } = getOriginContext(bbcOrigin);
  const env: Environments = getEnv(origin);
  const formattedIsUK = isUK ?? false;

  const getPlatform = (): Platforms => {
    switch (true) {
      case isApp:
        return 'app';
      case isAmp:
        return 'amp';
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
  const statsPageIdentifier = getStatsPageIdentifier({
    pageType,
    service,
    id,
  });

  const value = {
    env,
    id,
    isUK: formattedIsUK,
    origin,
    pageType,
    derivedPageType,
    isAmp,
    isApp,
    isCaf,
    isNextJs,
    platform,
    statsDestination,
    statsPageIdentifier,
    statusCode,
    previousPath,
    variant,
    timeOnServer,
    showAdsBasedOnLocation,
    service,
    pathname,
    counterName,
    ...getMetaUrls(origin, pathname),
    mvtExperiments,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};
