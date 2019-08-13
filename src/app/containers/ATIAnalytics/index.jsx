import React from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import ArticleAtiParams from './params/article';
import FrontPageAtiParams from './params/frontpage';
import { pageDataPropType } from '../../models/propTypes/data';

const ATIAnalytics = ({ data }) => {
  const { pageType, platform } = React.useContext(RequestContext);

  let pageviewParams = '';
  switch (pageType) {
    case 'article':
      pageviewParams = ArticleAtiParams(data);
      break;
    case 'frontPage':
      pageviewParams = FrontPageAtiParams(data);
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
  data: pageDataPropType.isRequired,
};

export default ATIAnalytics;
