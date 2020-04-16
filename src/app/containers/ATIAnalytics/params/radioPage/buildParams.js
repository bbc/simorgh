import { buildATIPageTrackPath } from '../../atiUrl';
import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';

export const buildRadioATIParams = (
  pageData,
  requestContext,
  serviceContext,
) => {
  const { platform, statsDestination } = requestContext;
  const {
    atiAnalyticsAppName,
    atiAnalyticsProducerId,
    service,
  } = serviceContext;

  const { id, language, pageTitle, pageIdentifier } = pageData;

  return {
    appName: atiAnalyticsAppName,
    contentId: id,
    contentType: 'player-live',
    language,
    pageIdentifier,
    pageTitle,
    producerId: atiAnalyticsProducerId,
    libraryVersion: LIBRARY_VERSION,
    statsDestination,
    platform,
    service,
  };
};

export const buildRadioATIUrl = (pageData, requestContext, serviceContext) => {
  return buildATIPageTrackPath(
    buildRadioATIParams(pageData, requestContext, serviceContext),
  );
};
