import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildATIPageTrackPath } from '../../atiUrl';
import { PageData } from '../../types';

export const buildMostWatchedATIParams = (
  pageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  const { platform, statsDestination } = requestContext;
  const {
    atiAnalyticsAppName,
    atiAnalyticsProducerId,
    brandName,
    lang,
    service,
    mostWatched: { header },
  } = serviceContext;

  return {
    appName: atiAnalyticsAppName,
    contentType: 'list-datadriven',
    language: lang,
    pageIdentifier: `${service}.media.video.page`,
    pageTitle: `${header} - ${brandName}`,
    producerId: atiAnalyticsProducerId,
    libraryVersion: LIBRARY_VERSION,
    statsDestination,
    platform,
    service,
    timePublished: pageData.firstRecordTimeStamp,
    timeUpdated: pageData.lastRecordTimeStamp,
  };
};

export const buildMostWatchedATIUrl = (
  pageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  return buildATIPageTrackPath(
    buildMostWatchedATIParams(pageData, requestContext, serviceContext),
  );
};

export default buildMostWatchedATIUrl;
