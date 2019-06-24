import React from 'react';
import { oneOfType } from 'prop-types';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import ArticleAtiParams from './ArticleAtiParams';
import FrontPageAtiParams from './FrontPageAtiParams';

import { articleDataPropTypes } from '../../models/propTypes/article';

const ATIAnalytics = ({ data }) => {
  let pageviewParams = '';
  const { pageType, platform } = React.useContext(RequestContext);
  // can allow pageType of frontPage when FrontPageAtiParams has been created
  if (pageType === 'article') {
    pageviewParams = ArticleAtiParams(data);
  } else if (pageType === 'frontPage') {
    pageviewParams = FrontPageAtiParams(data);
  } else {
    return null;
  }

  return platform === 'amp' ? (
    <AmpATIAnalytics pageviewParams={pageviewParams} />
  ) : (
    <CanonicalATIAnalytics pageviewParams={pageviewParams} />
  );
};

ATIAnalytics.propTypes = {
  data: oneOfType([articleDataPropTypes]).isRequired,
};
export default ATIAnalytics;
