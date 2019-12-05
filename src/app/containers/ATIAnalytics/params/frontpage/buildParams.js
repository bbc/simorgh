import { buildATIPageTrackPath } from '../../atiUrl';
import {
  getPublishedDatetime,
  getLibraryVersion,
} from '../../../../lib/analyticsUtils';
import {
  getContentId,
  getLanguage,
  getPageIdentifier,
  getPageTitle,
} from '../../../../lib/analyticsUtils/frontpage';

export const buildFrontPageATIParams = (
  frontpageData,
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
    contentId: getContentId(frontpageData),
    contentType: 'index-home',
    language: getLanguage(frontpageData),
    pageIdentifier: getPageIdentifier(frontpageData, service),
    pageTitle: getPageTitle(frontpageData, brandName),
    producerId: atiAnalyticsProducerId,
    timePublished: getPublishedDatetime('firstPublished', frontpageData),
    timeUpdated: getPublishedDatetime('lastPublished', frontpageData),
    libraryVersion: getLibraryVersion(),
    platform,
    service,
    statsDestination,
  };
};

export const buildFrontPageATIUrl = (
  frontpageData,
  requestContext,
  serviceContext,
) => {
  return buildATIPageTrackPath(
    buildFrontPageATIParams(frontpageData, requestContext, serviceContext),
  );
};

export default buildFrontPageATIParams;
