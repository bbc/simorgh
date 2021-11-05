import { buildATIPageTrackPath } from '../../atiUrl';
import { LIBRARY_VERSION } from '#lib/analyticsUtils';

export const buildMostWatchedATIParams = (
  pageData,
  requestContext,
  serviceContext,
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
  pageData,
  requestContext,
  serviceContext,
) => {
  return buildATIPageTrackPath(
    buildMostWatchedATIParams(pageData, requestContext, serviceContext),
  );
};

export default buildMostWatchedATIUrl;
