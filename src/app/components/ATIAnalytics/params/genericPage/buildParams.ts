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
    analytics: {
      contentId,
      contentType,
      pageIdentifier,
      timePublished,
      timeUpdated,
    } = {},
    title: pageTitle,
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
}: ATIDataWithContexts) =>
  buildATIPageTrackPath(
    buildPageATIParams({ atiData, requestContext, serviceContext }),
  );
