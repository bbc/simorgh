import path from 'ramda/src/path';
import { buildATIPageTrackPath } from '../../atiUrl';
import { getPublishedDatetime } from '../../../../lib/analyticsUtils';

export const buildCpsAssetPageATIParams = (
  pageData,
  requestContext,
  serviceContext,
) => {
  const { platform, statsDestination } = requestContext;
  const {
    atiAnalyticsAppName,
    atiAnalyticsProducerId,
    service,
    brandName,
  } = serviceContext;

  const { metadata, promo } = pageData;

  const getChapter1 = pageIdentifier => pageIdentifier.split('.')[1];

  const page = path(['analyticsLabels', 'counterName'], metadata);
  const isValidPage = page && typeof page === 'string' && page.includes('.');
  const chapter1 = isValidPage ? getChapter1(page) : false;

  return {
    appName: atiAnalyticsAppName,
    contentId: path(['id'], metadata),
    contentType: 'article-media-asset',
    language: path(['language'], metadata),
    // Example page identifier: embedded_media::pidgin.embedded_media.media_asset.49529724.page
    pageIdentifier: chapter1 ? `${chapter1}::${page}` : page,
    pageTitle: `${path(['headlines', 'headline'], promo)} - ${brandName}`,
    timePublished: getPublishedDatetime('firstPublished', pageData),
    timeUpdated: getPublishedDatetime('lastPublished', pageData),
    categoryName: path(['passport', 'category', 'categoryName'], metadata),
    campaigns: path(['passport', 'campaigns'], metadata),
    producerId: atiAnalyticsProducerId,
    statsDestination,
    platform,
    service,
  };
};

export const buildCpsAssetPageATIUrl = (
  pageData,
  requestContext,
  serviceContext,
) => {
  return buildATIPageTrackPath(
    buildCpsAssetPageATIParams(pageData, requestContext, serviceContext),
  );
};
