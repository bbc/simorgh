import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '#models/types/serviceConfig';
import { buildATIPageTrackPath } from '../../atiUrl';
import { PageData } from '../../types';

export const buildTopicPageATIParams = (
  pageData: PageData,
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
  topicPageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) =>
  buildATIPageTrackPath(
    buildTopicPageATIParams(topicPageData, requestContext, serviceContext),
  );
