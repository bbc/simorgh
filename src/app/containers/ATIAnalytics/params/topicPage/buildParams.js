import path from 'ramda/src/path';

import { buildATIPageTrackPath } from '../../atiUrl';

export const buildTopicPageATIParams = (
  pageData,
  requestContext,
  serviceContext,
) => {
  const { platform, statsDestination } = requestContext;
  const { atiAnalyticsAppName, service } = serviceContext;

  const { metadata } = pageData;

  return {
    appName: atiAnalyticsAppName,
    contentType: 'index-category',
    pageIdentifier: path(['analyticsLabels', 'pageIdentifier'], metadata),
    pageTitle: path(['analyticsLabels', 'pageTitle'], metadata),
    statsDestination,
    platform,
    service,
  };
};

export const buildTopicPageATIUrl = (
  topicPageData,
  requestContext,
  serviceContext,
) => {
  return buildATIPageTrackPath(
    buildTopicPageATIParams(topicPageData, requestContext, serviceContext),
  );
};

export default buildTopicPageATIParams;
