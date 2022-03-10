import { LIBRARY_VERSION } from '#lib/analyticsUtils';
import { buildATIPageTrackPath } from '../../atiUrl';

export const buildMostWatchedATIParams = (
  pageData,
  requestContext,
  serviceContext,
  location,
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
  const { hostname } = location;

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
    hostname,
  };
};

export const buildMostWatchedATIUrl = (
  pageData,
  requestContext,
  serviceContext,
  location,
) => {
  return buildATIPageTrackPath(
    buildMostWatchedATIParams(
      pageData,
      requestContext,
      serviceContext,
      location,
    ),
  );
};

export default buildMostWatchedATIUrl;
