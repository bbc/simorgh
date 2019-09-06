import path from 'ramda/src/path';
import { buildATIPageTrackUrl } from '../../atiUrl';

export const buildMediaATIParams = (
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
    contentId: (metadata || {}).id,
    contentType: 'player-live',
    language: (metadata || {}).language,
    pageIdentifier: path(['analyticsLabels', 'pageIdentifier'], metadata),
    pageTitle: path(['analyticsLabels', 'pageTitle'], metadata),
    producerId: atiAnalyticsProducerId,
    statsDestination,
    platform,
    service,
  };
};

export const buildMediaATIUrl = (pageData, requestContext, serviceContext) => {
  return buildATIPageTrackUrl(
    buildMediaATIParams(pageData, requestContext, serviceContext),
  );
};

export default buildMediaATIParams;
