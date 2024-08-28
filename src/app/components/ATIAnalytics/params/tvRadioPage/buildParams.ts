import { LIBRARY_VERSION } from '#lib/analyticsUtils';
import { RequestContextProps } from '#contexts/RequestContext';
import { ServiceConfig } from '#models/types/serviceConfig';
import { buildATIPageTrackPath } from '../../atiUrl';
import { PageData } from '../../types';

export const buildTvRadioATIParams = (
  pageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  const { platform, statsDestination } = requestContext;
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } =
    serviceContext;

  const { id, language, pageTitle, pageIdentifier, contentType } = pageData;

  const isLiveRadio = contentType === 'player-live';

  const getOnDemandContentId = () => {
    const guid = id?.split('/').pop();
    const contentId = `urn:bbc:pips:${guid}`;
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
  };
};

export const buildTvRadioATIUrl = (
  pageData: PageData,
  requestContext: RequestContextProps,
  serviceContext: ServiceConfig,
) => {
  return buildATIPageTrackPath(
    buildTvRadioATIParams(pageData, requestContext, serviceContext),
  );
};
