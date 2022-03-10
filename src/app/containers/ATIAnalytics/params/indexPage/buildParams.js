import { LIBRARY_VERSION, getPublishedDatetime } from '#lib/analyticsUtils';
import {
  getContentId,
  getContentType,
  getLanguage,
  getPageIdentifier,
  getPageTitle,
} from '#lib/analyticsUtils/indexPage';
import { buildATIPageTrackPath } from '../../atiUrl';

export const buildIndexPageATIParams = (
  indexPageData,
  requestContext,
  serviceContext,
  location,
) => {
  const { platform, statsDestination, pageType } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, brandName, service } =
    serviceContext;
  const { hostname } = location;

  return {
    appName: atiAnalyticsAppName,
    contentId: getContentId(indexPageData),
    contentType: getContentType(pageType),
    language: getLanguage(indexPageData),
    pageIdentifier: getPageIdentifier(indexPageData, service),
    pageTitle: getPageTitle(indexPageData, brandName),
    producerId: atiAnalyticsProducerId,
    timePublished: getPublishedDatetime('firstPublished', indexPageData),
    timeUpdated: getPublishedDatetime('lastPublished', indexPageData),
    libraryVersion: LIBRARY_VERSION,
    platform,
    service,
    statsDestination,
    hostname,
  };
};

export const buildIndexPageATIUrl = (
  indexPageData,
  requestContext,
  serviceContext,
  location,
) => {
  return buildATIPageTrackPath(
    buildIndexPageATIParams(
      indexPageData,
      requestContext,
      serviceContext,
      location,
    ),
  );
};

export default buildIndexPageATIParams;
