import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import { buildArticleATIUrl } from './params/article/buildParams';
import { buildFrontPageATIUrl } from './params/frontpage/buildParams';
import { buildMediaATIUrl } from './params/media/buildParams';
import { pageDataPropType } from '#models/propTypes/data';

const ATIAnalytics = ({ data }) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { pageType, platform } = requestContext;

  const pageTypeHandlers = {
    article: buildArticleATIUrl,
    frontPage: buildFrontPageATIUrl,
    media: buildMediaATIUrl,
  };

  const isValidPageType = Object.keys(pageTypeHandlers).includes(pageType);
  if (!isValidPageType) {
    return null;
  }

  const pageviewParams = pageTypeHandlers[pageType](
    data,
    requestContext,
    serviceContext,
  );

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
