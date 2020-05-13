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

  const { id, language, pageTitle, pageIdentifier, contentType } = pageData;

  const isLiveRadio = contentType === 'player-live';

  const getContentId = assetType => {
    const guid = id.split('/').pop();
    const contentId = `urn:bbc:${assetType}:`.concat(guid);
    return contentId;
  };

  return {
    appName: atiAnalyticsAppName,
    contentId: isLiveRadio ? id : getContentId('pips'),
    contentType,
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
