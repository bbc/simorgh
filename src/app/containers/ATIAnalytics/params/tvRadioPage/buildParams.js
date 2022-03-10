import { buildATIPageTrackPath } from '../../atiUrl';
import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';

export const buildTvRadioATIParams = (
  pageData,
  requestContext,
  serviceContext,
  location,
) => {
  const { platform, statsDestination } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } =
    serviceContext;
  const { hostname } = location;

  const { id, language, pageTitle, pageIdentifier, contentType } = pageData;

  const isLiveRadio = contentType === 'player-live';

  const getOnDemandContentId = () => {
    const guid = id.split('/').pop();
    const contentId = `urn:bbc:pips:`.concat(guid);
    return contentId;
  };

  return {
    appName: atiAnalyticsAppName,
    contentId: isLiveRadio ? id : getOnDemandContentId(),
    contentType,
    language,
    pageIdentifier,
    pageTitle,
    producerId: atiAnalyticsProducerId,
    libraryVersion: LIBRARY_VERSION,
    statsDestination,
    platform,
    service,
    hostname,
  };
};

export const buildTvRadioATIUrl = (
  pageData,
  requestContext,
  serviceContext,
  location,
) => {
  return buildATIPageTrackPath(
    buildTvRadioATIParams(pageData, requestContext, serviceContext, location),
  );
};
