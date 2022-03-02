import { LIBRARY_VERSION } from '#lib/analyticsUtils';
import { buildATIPageTrackPath } from '../../atiUrl';

export const buildTopicPageATIParams = (
  pageData,
  requestContext,
  serviceContext,
) => {
  const { platform, statsDestination, id } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service, lang } =
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
    language: lang,
    pageIdentifier: `${service}.topics.${id}.page`,
    contentId: `urn:bbc:tipo:topic:${id}`,
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
