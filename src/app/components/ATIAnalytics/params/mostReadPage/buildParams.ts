import { LIBRARY_VERSION } from '#lib/analyticsUtils';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildATIPageTrackPath } from '../../atiUrl';
import { MostPopularPageData } from '../types';

export const buildMostReadATIParams = (
  pageData: MostPopularPageData,
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
    mostRead: { header },
  } = serviceContext;

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
  };
};

export const buildMostReadATIUrl = (
  pageData: MostPopularPageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  return buildATIPageTrackPath(
    buildMostReadATIParams(pageData, requestContext, serviceContext),
  );
};

export default buildMostReadATIUrl;
