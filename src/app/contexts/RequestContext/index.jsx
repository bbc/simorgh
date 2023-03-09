import React from 'react';
import { bool, node, oneOf, string, number } from 'prop-types';
import * as pageTypes from '../../routes/utils/pageTypes';
import mvtExperimentPropType from '../../models/propTypes/mvtExperiment';
import variantPropType from '../../models/propTypes/variants';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import getMetaUrls from './getMetaUrls';

export const RequestContext = React.createContext({});

export const RequestContextProvider = ({
  children,
  bbcOrigin,
  id,
  isAmp,
  isNextJs,
  pageType,
  service,
  statusCode,
  previousPath,
  pathname,
  variant,
  timeOnServer,
  showAdsBasedOnLocation,
  mvtExperiments,
}) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env = getEnv(origin);
  const platform = isAmp ? 'amp' : 'canonical';
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

RequestContextProvider.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  id: string,
  isAmp: bool.isRequired,
  isNextJs: bool,
  pageType: oneOf(Object.values(pageTypes)).isRequired,
  service: string.isRequired,
  statusCode: number,
  pathname: string.isRequired,
  previousPath: string,
  variant: variantPropType,
  timeOnServer: number,
  showAdsBasedOnLocation: bool,
  mvtExperiments: mvtExperimentPropType,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
  id: null,
  statusCode: null,
  previousPath: null,
  variant: null,
  timeOnServer: null,
  showAdsBasedOnLocation: false,
  mvtExperiments: null,
  isNextJs: false,
};
