import { LIBRARY_VERSION } from '#lib/analyticsUtils';
import { buildATIPageTrackPath } from '../../atiUrl';

export const buildTopicPageATIParams = (
  pageData,
  requestContext,
  serviceContext,
) => {
  const { platform, statsDestination } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } =
    serviceContext;

  return {
    appName: atiAnalyticsAppName,
    producerId: atiAnalyticsProducerId,
    contentType: 'index-category',
    pageTitle: pageData.title,
    statsDestination,
    platform,
    service,
    libraryVersion: LIBRARY_VERSION,
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
