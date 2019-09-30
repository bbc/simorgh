import React from 'react';
import { RequestContext } from '#contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import getArticleAtiParams from './params/article';
import getFrontPageAtiParams from './params/frontpage';
import getRadioPageAtiParams from './params/radio';
import { pageDataPropType } from '#models/propTypes/data';

const ATIAnalytics = ({ data }) => {
  const { pageType, platform } = React.useContext(RequestContext);

  const pageTypeHandlers = {
    article: getArticleAtiParams,
    frontPage: getFrontPageAtiParams,
    media: getRadioPageAtiParams,
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
  data: pageDataPropType.isRequired,
};

export default ATIAnalytics;
