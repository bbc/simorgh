import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';
import { buildATIPageTrackPath } from '../../atiUrl';
import { ATIContexts } from '../../types';

export const buildPageATIParams = ({
  atiData,
  requestContext,
  serviceContext,
}: ATIContexts) => {
  const { platform, statsDestination } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service, lang } =
    serviceContext;
  const {
    contentId,
    contentType,
    pageIdentifier,
    pageTitle,
    timePublished,
    timeUpdated,
  } = atiData;
  return {
    appName: atiAnalyticsAppName,
    contentId,
    producerId: atiAnalyticsProducerId,
    contentType,
    pageIdentifier,
    pageTitle,
    platform,
    statsDestination,
    service,
    timePublished,
    timeUpdated,
    libraryVersion: LIBRARY_VERSION,
    language: lang,
  };
};

export const buildPageATIUrl = ({
  atiData,
  requestContext,
  serviceContext,
}: ATIContexts) =>
  buildATIPageTrackPath(
    buildPageATIParams({ atiData, requestContext, serviceContext }),
  );
