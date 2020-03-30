import path from 'ramda/src/path';
import { buildATIPageTrackPath } from '../../atiUrl';
import {
  getPublishedDatetime,
  getContentId,
  LIBRARY_VERSION,
  getThingAttributes,
} from '#lib/analyticsUtils';

export const buildCpsAssetPageATIParams = (
  pageData,
  requestContext,
  serviceContext,
  contentType,
) => {
  const { platform, statsDestination } = requestContext;
  const {
    atiAnalyticsAppName,
    atiAnalyticsProducerId,
    service,
    brandName,
  } = serviceContext;

  const { metadata, promo } = pageData;

  const getChapter1 = pageIdentifier => {
    const chapter = pageIdentifier.split('.')[1];
    if (['media_asset', 'multimedia'].includes(chapter)) {
      return null;
    }
    return chapter;
  };

  const page = path(['analyticsLabels', 'counterName'], metadata);
  const isValidPage = page && typeof page === 'string' && page.includes('.');
  const chapter1 = isValidPage ? getChapter1(page) : false;
  const ldpThingIds = getThingAttributes('thingId', pageData);
  const ldpThingLabels = getThingAttributes('thingLabel', pageData);
  const isLegacyAsset = url => url.split('/').length > 7;

  return {
    appName: atiAnalyticsAppName,
    contentId: getContentId(
      isLegacyAsset(requestContext.canonicalLink) ? 'topcat' : 'cps',
      pageData,
    ),
    contentType,
    language: path(['language'], metadata),
    // Example page identifier: embedded_media::pidgin.embedded_media.media_asset.49529724.page
    pageIdentifier: chapter1 ? `${chapter1}::${page}` : page,
    pageTitle: `${path(['headlines', 'headline'], promo)} - ${brandName}`,
    timePublished: getPublishedDatetime('firstPublished', pageData),
    timeUpdated: getPublishedDatetime('lastPublished', pageData),
    categoryName: path(['passport', 'category', 'categoryName'], metadata),
    campaigns: path(['passport', 'campaigns'], metadata),
    ...(ldpThingIds && { ldpThingIds }),
    ...(ldpThingLabels && { ldpThingLabels }),
    producerId: atiAnalyticsProducerId,
    libraryVersion: LIBRARY_VERSION,
    statsDestination,
    platform,
    service,
  };
};

export const buildCpsAssetPageATIUrl = (
  pageData,
  requestContext,
  serviceContext,
  contentType,
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
