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
    experimentName,
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
    buildPageATIParams({ atiData, requestContext, serviceContext, isSignedIn, hashedId }),
  );

const buildPageResonanceParams = ({
  atiData,
  requestContext,
  serviceContext,
  isSignedIn,
  hashedId,
}: BuildPageParamsArgs) =>
  buildResonanceAnalyticsModel(
    buildPageATIParams({ atiData, requestContext, serviceContext, isSignedIn, hashedId }),
  );

export const buildAnalyticsParams = ({
  atiData,
  requestContext,
  serviceContext,
  isSignedIn,
  hashedId,
}: BuildPageParamsArgs) => ({
  reverbParams: buildPageReverbParams({ atiData, requestContext, serviceContext, isSignedIn, hashedId }),
  resonanceParams: buildPageResonanceParams({ atiData, requestContext, serviceContext, isSignedIn, hashedId }),
});
