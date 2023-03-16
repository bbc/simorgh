import React, { PropsWithChildren } from 'react';
import {
  Environments,
  Platforms,
  PageTypes,
  Services,
  Variants,
} from '#app/models/types/global';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import getMetaUrls from './getMetaUrls';

type RequestContextProps = {
  ampLink: string;
  ampUkLink: string;
  ampNonUkLink: string;
  canonicalLink: string;
  canonicalUkLink: string;
  canonicalNonUkLink: string;
  env: Environments;
  id: string | null;
  isAmp: boolean;
  isNextJs: boolean;
  isUK: boolean;
  mvtExperiments: {
    experimentName: string;
    variation: string;
    type: 'experiment' | 'feature';
  } | null;
  origin: string;
  pageType: PageTypes;
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
  id?: string | null;
  isAmp: boolean;
  isNextJs?: boolean;
  pageType: PageTypes;
  pathname: string;
  previousPath?: string | null;
  service: Services;
  showAdsBasedOnLocation?: boolean;
  statusCode?: number | null;
  timeOnServer?: number | null;
  mvtExperiments?: {
    experimentName: string;
    variation: string;
    type: 'experiment' | 'feature';
  } | null;
  variant?: Variants | null;
};

export const RequestContextProvider = ({
  bbcOrigin = null,
  children,
  id = null,
  isAmp,
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
}: PropsWithChildren<RequestProviderProps>) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env: Environments = getEnv(origin);
  const platform: Platforms = isAmp ? 'amp' : 'canonical';
  const statsDestination = getStatsDestination({
    isUK: platform === 'amp' ? true : isUK, // getDestination requires that statsDestination is a PS variant on AMP
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
    isUK,
    origin,
    pageType,
    isAmp,
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
    ...getMetaUrls(origin, pathname),
    mvtExperiments,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};
