import { buildATIPageTrackPath } from '../../atiUrl';

import {
  getPublishedDatetime,
  LIBRARY_VERSION,
  getThingAttributes,
} from '../../../../lib/analyticsUtils';
import {
  getLanguage,
  getContentId,
  getPageIdentifier,
  getPromoHeadline,
  getNationsProducer,
} from '../../../../lib/analyticsUtils/article';

export const buildArticleATIParams = (
  articleData,
  requestContext,
  serviceContext,
  location,
) => {
  const { platform, isUK, statsDestination, previousPath, origin } =
    requestContext || {};
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } =
    serviceContext || {};
  const { hostname } = location;

  return {
    appName: atiAnalyticsAppName,
    contentId: getContentId(articleData),
    contentType: 'article',
    language: getLanguage(articleData),
    ldpThingIds: getThingAttributes('thingId', articleData),
    ldpThingLabels: getThingAttributes('thingEnglishLabel', articleData),
    pageIdentifier: getPageIdentifier(service, articleData),
    pageTitle: getPromoHeadline(articleData),
    producerId: atiAnalyticsProducerId,
    timePublished: getPublishedDatetime('firstPublished', articleData),
    timeUpdated: getPublishedDatetime('lastPublished', articleData),
    libraryVersion: LIBRARY_VERSION,
    isUK,
    platform,
    service,
    statsDestination,
    previousPath,
    origin,
    nationsProducer: getNationsProducer(articleData),
    hostname,
  };
};

export const buildArticleATIUrl = (
  articleData,
  requestContext,
  serviceContext,
  location,
) => {
  return buildATIPageTrackPath(
    buildArticleATIParams(
      articleData,
      requestContext,
      serviceContext,
      location,
    ),
  );
};

export default buildArticleATIParams;
