import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';
import { buildATIPageTrackPath, buildReverbAnalyticsModel } from '../../atiUrl';
import { ATIDataWithContexts } from '../../types';

export const buildPageATIParams = ({
  atiData,
  requestContext,
  serviceContext,
}: ATIDataWithContexts) => {
  const { isUK, platform, statsDestination } = requestContext;
  const {
    atiAnalyticsAppName,
    atiAnalyticsProducerId,
    atiAnalyticsProducerName,
    lang,
    service,
  } = serviceContext;
  const {
    campaigns,
    categoryName,
    contentId,
    contentType,
    language,
    ldpThingIds,
    ldpThingLabels,
    nationsProducer,
    pageIdentifier,
    pageTitle,
    producerId,
    timePublished,
    timeUpdated,
    ampExperimentName,
    experimentVariant,
  } = atiData;

  return {
    appName: atiAnalyticsAppName,
    campaigns,
    categoryName,
    contentId,
    contentType,
    isUK,
    language: language || lang,
    ldpThingIds,
    ldpThingLabels,
    libraryVersion: LIBRARY_VERSION,
    nationsProducer,
    pageIdentifier,
    pageTitle,
    platform,
    producerId: producerId || atiAnalyticsProducerId,
    producerName: atiAnalyticsProducerName,
    service,
    statsDestination,
    timePublished,
    timeUpdated,
    ...(ampExperimentName && { ampExperimentName }),
    ...(experimentVariant && { experimentVariant }),
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

export const buildPageReverbParams = ({
  atiData,
  requestContext,
  serviceContext,
}: ATIDataWithContexts) =>
  buildReverbAnalyticsModel(
    buildPageATIParams({ atiData, requestContext, serviceContext }),
  );
