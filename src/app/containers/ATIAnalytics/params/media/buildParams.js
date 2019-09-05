import path from 'ramda/src/path';
import atiPageViewParams from '../../atiUrl';

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

  return atiPageViewParams({
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
  });
};

export default buildMediaATIParams;
