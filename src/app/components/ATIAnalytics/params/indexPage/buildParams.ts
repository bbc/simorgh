import {
  LIBRARY_VERSION,
  getPublishedDatetime,
} from '../../../../lib/analyticsUtils';
import {
  getContentId,
  getContentType,
  getLanguage,
  getPageIdentifier,
  getPageTitle,
} from '../../../../lib/analyticsUtils/indexPage';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildATIPageTrackPath } from '../../atiUrl';
import { PageData } from '../../types';

export const buildIndexPageATIParams = (
  indexPageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  const { platform, statsDestination, pageType } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, brandName, service } =
    serviceContext;

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
  };
};

export const buildIndexPageATIUrl = (
  indexPageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  return buildATIPageTrackPath(
    buildIndexPageATIParams(indexPageData, requestContext, serviceContext),
  );
};

export default buildIndexPageATIParams;
