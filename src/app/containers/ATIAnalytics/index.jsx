import React from 'react';
import { oneOfType } from 'prop-types';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import getArticleAtiParams from './params/article';
import getFrontPageAtiParams from './params/frontpage';
import getMediaPageAtiParams from './params/media';
import { articleDataPropTypes } from '../../models/propTypes/article';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';

const ATIAnalytics = ({ data }) => {
  const { pageType, platform } = React.useContext(RequestContext);

  const pageTypeHandlers = {
    article: getArticleAtiParams,
    frontPage: getFrontPageAtiParams,
    media: getMediaPageAtiParams,
  };

  const isValidPageType = Object.keys(pageTypeHandlers).includes(pageType);
  if (!isValidPageType) {
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
