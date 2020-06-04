import { buildATIPageTrackPath } from '../../atiUrl';
import { LIBRARY_VERSION, getPublishedDatetime } from '#lib/analyticsUtils';
import {
  getContentId,
  getLanguage,
  getPageIdentifier,
  getPageTitle,
} from '#lib/analyticsUtils/frontpage';

export const buildIdxPageATIParams = (
  idxPageData,
  requestContext,
  serviceContext,
) => {
  const { platform, statsDestination } = requestContext;
  const {
    atiAnalyticsAppName,
    atiAnalyticsProducerId,
    brandName,
    service,
  } = serviceContext;

  return {
    appName: atiAnalyticsAppName,
    contentId: getContentId(idxPageData),
    contentType: 'index-section',
    language: getLanguage(idxPageData),
    pageIdentifier: getPageIdentifier(idxPageData, service),
    pageTitle: getPageTitle(idxPageData, brandName),
    producerId: atiAnalyticsProducerId,
    timePublished: getPublishedDatetime('firstPublished', idxPageData),
    timeUpdated: getPublishedDatetime('lastPublished', idxPageData),
    libraryVersion: LIBRARY_VERSION,
    platform,
    service,
    statsDestination,
  };
};

export const buildIdxPageATIUrl = (
  idxPageData,
  requestContext,
  serviceContext,
) => {
  return buildATIPageTrackPath(
    buildIdxPageATIParams(idxPageData, requestContext, serviceContext),
  );
};

export default buildIdxPageATIParams;
