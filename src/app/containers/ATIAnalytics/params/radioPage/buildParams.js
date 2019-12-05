import path from 'ramda/src/path';
import { buildATIPageTrackPath } from '../../atiUrl';
import { getLibraryVersion } from '../../../../lib/analyticsUtils';

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

  const { metadata } = pageData;

  return {
    appName: atiAnalyticsAppName,
    contentId: metadata.id,
    contentType: 'player-live',
    language: metadata.language,
    pageIdentifier: path(['analyticsLabels', 'pageIdentifier'], metadata),
    pageTitle: path(['analyticsLabels', 'pageTitle'], metadata),
    producerId: atiAnalyticsProducerId,
    libraryVersion: getLibraryVersion(),
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
