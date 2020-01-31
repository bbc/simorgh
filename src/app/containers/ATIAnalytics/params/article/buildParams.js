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
} from '../../../../lib/analyticsUtils/article';

export const buildArticleATIParams = (
  articleData,
  requestContext,
  serviceContext,
) => {
  const { platform, isUK, statsDestination, previousPath, origin } =
    requestContext || {};
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } =
    serviceContext || {};

  return {
    appName: atiAnalyticsAppName,
    contentId: getContentId(articleData),
    contentType: 'article',
    language: getLanguage(articleData),
    ldpThingIds: getThingAttributes('thingId', articleData),
    ldpThingLabels: getThingAttributes('thingLabel', articleData),
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
  };
};

export const buildArticleATIUrl = (
  articleData,
  requestContext,
  serviceContext,
) => {
  return buildATIPageTrackPath(
    buildArticleATIParams(articleData, requestContext, serviceContext),
  );
};

export default buildArticleATIParams;
