import path from 'ramda/src/path';
import {
  getPublishedDatetime,
  getContentId,
  LIBRARY_VERSION,
  getThingAttributes,
} from '../../../../lib/analyticsUtils';
import { buildATIPageTrackPath } from '../../atiUrl';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { PageData } from '../../types';

export const buildCpsAssetPageATIParams = (
  pageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
  contentType: string,
) => {
  const { platform, statsDestination } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service, brandName } =
    serviceContext;

  const { metadata, promo } = pageData;

  const getChapter1 = (pageIdentifier: string) => {
    if (service === 'news') {
      return metadata?.atiAnalytics?.chapter;
    }
    const chapter = pageIdentifier.split('.')[1];
    if (['media_asset', 'story'].includes(chapter)) {
      return null;
    }
    return chapter;
  };

  const getProducer = (defaultProducer: string): string => {
    if (['news', 'sport'].includes(service)) {
      return metadata?.atiAnalytics?.producerId;
    }
    return defaultProducer;
  };

  const page = metadata?.analyticsLabels?.counterName;
  const isValidPage = page && typeof page === 'string' && page.includes('.');
  const chapter1 = isValidPage ? getChapter1(page) : false;
  const producerId = getProducer(atiAnalyticsProducerId);
  const ldpThingIds = getThingAttributes('thingId', pageData);
  const ldpThingLabels = getThingAttributes('thingEnglishLabel', pageData);

  return {
    appName: atiAnalyticsAppName,
    contentId: getContentId(pageData),
    contentType,
    language: metadata?.language,
    // Example page identifier: embedded_media::pidgin.embedded_media.media_asset.49529724.page
    pageIdentifier: chapter1 ? `${chapter1}::${page}` : page,
    pageTitle: `${path(['headlines', 'headline'], promo)} - ${brandName}`,
    timePublished: getPublishedDatetime('firstPublished', pageData),
    timeUpdated: getPublishedDatetime('lastPublished', pageData),
    categoryName: metadata?.passport?.category?.categoryName,
    campaigns: metadata?.passport?.campaigns,
    ...(ldpThingIds && { ldpThingIds }),
    ...(ldpThingLabels && { ldpThingLabels }),
    producerId,
    libraryVersion: LIBRARY_VERSION,
    statsDestination,
    platform,
    service,
  };
};

export const buildCpsAssetPageATIUrl = (
  pageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
  contentType: string,
) => {
  return buildATIPageTrackPath(
    buildCpsAssetPageATIParams(
      pageData,
      requestContext,
      serviceContext,
      contentType,
    ),
  );
};
