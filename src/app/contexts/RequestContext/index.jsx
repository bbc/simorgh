import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { bool, node, oneOf, string } from 'prop-types';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import getMetaUrls from './getMetaUrls';
import variantPropType from '../../models/propTypes/variants';
import { dataPropType } from '../../models/propTypes/data';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  children,
  bbcOrigin,
  data,
  id,
  isAmp,
  pageType,
  service,
  previousPath,
  pathname,
  variant,
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
  const statusCode = pathOr(500, ['status'], data);

  const value = {
    env,
    id,
    isUK,
    origin,
    pageType,
    platform,
    statsDestination,
    statsPageIdentifier,
    statusCode,
    previousPath,
    variant,
    ...getMetaUrls(origin, pathname),
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  data: dataPropType,
  id: string,
  isAmp: bool.isRequired,
  pageType: oneOf(['article', 'frontPage', 'media', 'error']).isRequired,
  service: string.isRequired,
  pathname: string.isRequired,
  previousPath: string,
  variant: variantPropType,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
  data: null,
  id: null,
  previousPath: null,
  variant: null,
};
