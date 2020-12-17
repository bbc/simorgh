import React from 'react';
import { bool, node, oneOf, string, number } from 'prop-types';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import getMetaUrls from './getMetaUrls';
import variantPropType from '../../models/propTypes/variants';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MOST_READ_PAGE,
  MOST_WATCHED_PAGE,
  ERROR_PAGE,
  INDEX_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';

export const RequestContext = React.createContext({});

export const RequestContextProvider = ({
  children,
  bbcOrigin,
  id,
  isAmp,
  pageType,
  service,
  statusCode,
  previousPath,
  pathname,
  variant,
  timeOnServer,
  showAdsBasedOnLocation,
}) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env = getEnv(origin);
  const platform = isAmp ? 'amp' : 'canonical';
  const statsDestination = getStatsDestination({
    isUK,
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
    platform,
    statsDestination,
    statsPageIdentifier,
    statusCode,
    previousPath,
    variant,
    timeOnServer,
    showAdsBasedOnLocation,
    ...getMetaUrls(origin, pathname),
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  id: string,
  isAmp: bool.isRequired,
  pageType: oneOf([
    ARTICLE_PAGE,
    FRONT_PAGE,
    MEDIA_PAGE,
    MOST_READ_PAGE,
    MOST_WATCHED_PAGE,
    ERROR_PAGE,
    MEDIA_ASSET_PAGE,
    FEATURE_INDEX_PAGE,
    'STY',
    PHOTO_GALLERY_PAGE,
    INDEX_PAGE,
  ]).isRequired,
  service: string.isRequired,
  statusCode: number,
  pathname: string.isRequired,
  previousPath: string,
  variant: variantPropType,
  timeOnServer: number,
  showAdsBasedOnLocation: bool,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
  id: null,
  statusCode: null,
  previousPath: null,
  variant: null,
  timeOnServer: null,
  showAdsBasedOnLocation: false,
};
