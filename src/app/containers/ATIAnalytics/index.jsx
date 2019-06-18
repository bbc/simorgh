import React from 'react';
import { oneOf, oneOfType } from 'prop-types';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import ArticleAtiParams from './ArticleAtiParams';

import { articleDataPropTypes } from '../../models/propTypes/article';

const ATIAnalytics = ({ data, pageType = 'article' }) => {
  let pageviewParams = '';
  const { platform } = React.useContext(RequestContext);
  // can allow pageType of frontPage when FrontPageAtiParams has been created
  if (pageType !== 'article') {
    return null;
  }

  pageviewParams = ArticleAtiParams(data);

  return platform === 'amp' ? (
    <AmpATIAnalytics pageviewParams={pageviewParams} />
  ) : (
    <CanonicalATIAnalytics pageviewParams={pageviewParams} />
  );
};

ATIAnalytics.propTypes = {
  data: oneOfType([articleDataPropTypes]).isRequired,
  pageType: oneOf(['article', 'frontPage']).isRequired,
};
export default ATIAnalytics;
