import React from 'react';
import { oneOfType } from 'prop-types';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import ArticleAtiParams from './params/article';
import FrontPageAtiParams from './params/frontpage';
import EventTracker from './event';
import { articleDataPropTypes } from '../../models/propTypes/article';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';

const ATIAnalytics = ({ data }) => {
  const { pageType, platform } = React.useContext(RequestContext);

  let pageviewParams = '';

  switch (pageType) {
    case 'article':
      pageviewParams = ArticleAtiParams(data);
      break;
    case 'frontPage':
      pageviewParams = FrontPageAtiParams(data);
      EventTracker(data);
      break;
    default:
      return null;
  }

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
