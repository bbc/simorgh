import { LIBRARY_VERSION } from '#lib/analyticsUtils';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildATIPageTrackPath } from '../../atiUrl';

interface TopicPageData {
  title: string;
}

export const buildTopicPageATIParams = (
  pageData: TopicPageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
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
  topicPageData: TopicPageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) =>
  buildATIPageTrackPath(
    buildTopicPageATIParams(topicPageData, requestContext, serviceContext),
  );
