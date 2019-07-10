import React from 'react';
import { bool, node, string, shape, oneOf } from 'prop-types';
import getLangByPageType from './getLangByPageType';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import { articleDataPropTypes } from '../../models/propTypes/article';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  children,
  data,
  bbcOrigin,
  id,
  isAmp,
  pageType,
  service,
  serviceLang,
}) => {
  const lang = getLangByPageType(data, serviceLang, pageType);
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
    lang,
    origin,
    pageType,
    platform,
    statsDestination,
    statsPageIdentifier,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  data: shape({ articleDataPropTypes }),
  id: string,
  serviceLang: string,
  isAmp: bool.isRequired,
  pageType: oneOf(['article', 'frontPage']).isRequired,
  service: string.isRequired,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
  id: null,
  data: null,
  serviceLang: null,
};
