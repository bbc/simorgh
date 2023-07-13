import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';
import { buildATIPageTrackPath } from '../../atiUrl';
import { ATIDataWithContexts } from '../../types';

export const buildPageATIParams = ({
  atiData,
  requestContext,
  serviceContext,
}: ATIDataWithContexts) => {
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
    contentType,
    language: lang,
    libraryVersion: LIBRARY_VERSION,
    pageIdentifier,
    pageTitle,
    platform,
    producerId: atiAnalyticsProducerId,
    service,
    statsDestination,
    timePublished,
    timeUpdated,
  };
};

export const buildPageATIUrl = ({
  atiData,
  requestContext,
  serviceContext,
}: ATIDataWithContexts) =>
  buildATIPageTrackPath(
    buildPageATIParams({ atiData, requestContext, serviceContext }),
  );
