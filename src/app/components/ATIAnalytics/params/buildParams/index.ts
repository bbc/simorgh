import getSiteId from '#lib/analyticsUtils/getSiteId';
import { LIBRARY_VERSION } from '../../../../lib/analyticsUtils';
import {
  buildReverbAnalyticsModel,
  buildResonanceAnalyticsModel,
} from '../../atiUrl';
import { ATIDataWithContexts } from '../../types';

export const buildPageATIParams = ({
  atiData,
  requestContext,
  serviceContext,
  isSignedIn = false,
  hashedId = null,
}: ATIDataWithContexts & {
  isSignedIn?: boolean;
  hashedId?: string | null;
}) => {
  const { isUK, platform, statsDestination, env } = requestContext;
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
    experimentName,
    experimentVariant,
  } = atiData;

  const siteId = getSiteId({ service, env });

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
    siteId,
    timePublished,
    timeUpdated,
    isSignedIn,
    hashedId,
    ...(ampExperimentName && { ampExperimentName }),
    ...(experimentName && { experimentName }),
    ...(experimentVariant && { experimentVariant }),
  };
};

type BuildPageParamsArgs = ATIDataWithContexts & {
  isSignedIn?: boolean;
  hashedId?: string | null;
};

const buildPageReverbParams = ({
  atiData,
  requestContext,
  serviceContext,
  isSignedIn,
  hashedId,
}: BuildPageParamsArgs) =>
  buildReverbAnalyticsModel(
    buildPageATIParams({
      atiData,
      requestContext,
      serviceContext,
      isSignedIn,
      hashedId,
    }),
  );

const buildPageResonanceParams = ({
  atiData,
  requestContext,
  serviceContext,
  isSignedIn,
  hashedId,
}: BuildPageParamsArgs) =>
  buildResonanceAnalyticsModel(
    buildPageATIParams({
      atiData,
      requestContext,
      serviceContext,
      isSignedIn,
      hashedId,
    }),
  );

export const buildAnalyticsParams = ({
  atiData,
  requestContext,
  serviceContext,
  isSignedIn,
  hashedId,
}: BuildPageParamsArgs) => {
  const { resonanceEnabled } = serviceContext;
  const { platform } = requestContext;

  const sendResonanceEvents =
    resonanceEnabled && (platform === 'canonical' || platform === 'app');

  return {
    reverbParams: buildPageReverbParams({
      atiData,
      requestContext,
      serviceContext,
      isSignedIn,
      hashedId,
    }),
    resonanceParams: sendResonanceEvents
      ? buildPageResonanceParams({
          atiData,
          requestContext,
          serviceContext,
          isSignedIn,
          hashedId,
        })
      : null,
  };
};
