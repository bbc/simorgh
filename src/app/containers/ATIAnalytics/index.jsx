import React from 'react';
import { oneOfType } from 'prop-types';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import ArticleAtiParams from './params/article';
import FrontPageAtiParams from './params/frontpage';
import MediaPageAtiParams from './params/media';
import { articleDataPropTypes } from '../../models/propTypes/article';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';

const ATIAnalytics = ({ data }) => {
  const { pageType, platform } = React.useContext(RequestContext);

  // The functions that converts pageData to ATI params
  const pageTypeHandlers = {
    article: ArticleAtiParams,
    frontPage: FrontPageAtiParams,
    media: MediaPageAtiParams,
  };

  // Eject if the page type is not recognised
  if (!Object.keys(pageTypeHandlers).includes(pageType)) {
    return null;
  }

  const pageviewParams = pageTypeHandlers[pageType](data);

  return platform === 'amp' ? (
    <AmpATIAnalytics pageviewParams={pageviewParams} />
  ) : (
    <CanonicalATIAnalytics pageviewParams={pageviewParams} />
  );
};

ATIAnalytics.propTypes = {
  data: oneOfType([articleDataPropTypes, frontPageDataPropTypes]).isRequired,
};
export default ATIAnalytics;
