import { buildATIPageTrackPath } from '../../atiUrl';

export const buildTopicPageATIParams = (
  pageData,
  requestContext,
  serviceContext,
) => {
  const { platform, statsDestination } = requestContext;
  const { atiAnalyticsAppName, service } = serviceContext;

  return {
    appName: atiAnalyticsAppName,
    contentType: 'index-category',
    pageTitle: pageData.title,
    statsDestination,
    platform,
    service,
  };
};

export const buildTopicPageATIUrl = (
  topicPageData,
  requestContext,
  serviceContext,
) =>
  buildATIPageTrackPath(
    buildTopicPageATIParams(topicPageData, requestContext, serviceContext),
  );
