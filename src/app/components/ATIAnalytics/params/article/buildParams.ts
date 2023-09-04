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
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildATIPageTrackPath } from '../../atiUrl';
import { PageData } from '../../types';

export const buildArticleATIParams = (
  articleData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
  pageType = 'article',
) => {
  const { platform, isUK, statsDestination, previousPath, origin } =
    requestContext || {};
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } =
    serviceContext || {};

  return {
    appName: atiAnalyticsAppName,
    categoryName: getThingAttributes('thingEnglishLabel', articleData),
    contentId: getContentId(articleData),
    contentType: pageType,
    isUK,
    language: getLanguage(articleData),
    ldpThingIds: getThingAttributes('thingId', articleData),
    ldpThingLabels: getThingAttributes('thingEnglishLabel', articleData),
    libraryVersion: LIBRARY_VERSION,
    nationsProducer: getNationsProducer(articleData),
    origin,
    pageIdentifier: getPageIdentifier(service, articleData),
    pageTitle: getPromoHeadline(articleData),
    platform,
    previousPath,
    producerId: atiAnalyticsProducerId,
    service,
    statsDestination,
    timePublished: getPublishedDatetime('firstPublished', articleData),
    timeUpdated: getPublishedDatetime('lastPublished', articleData),
  };
};

export const buildArticleATIUrl = (
  articleData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
  pageType = 'article',
) => {
  return buildATIPageTrackPath(
    buildArticleATIParams(
      articleData,
      requestContext,
      serviceContext,
      pageType,
    ),
  );
};

export default buildArticleATIParams;
