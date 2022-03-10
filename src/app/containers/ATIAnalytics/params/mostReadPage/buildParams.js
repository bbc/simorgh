import { LIBRARY_VERSION } from '#lib/analyticsUtils';
import { buildATIPageTrackPath } from '../../atiUrl';

export const buildMostReadATIParams = (
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
    mostRead: { header },
  } = serviceContext;
  const { hostname } = location;

  return {
    appName: atiAnalyticsAppName,
    contentType: 'list-datadriven',
    language: lang,
    pageIdentifier: `${service}.popular.read.page`,
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

export const buildMostReadATIUrl = (
  pageData,
  requestContext,
  serviceContext,
  location,
) => {
  return buildATIPageTrackPath(
    buildMostReadATIParams(pageData, requestContext, serviceContext, location),
  );
};

export default buildMostReadATIUrl;
