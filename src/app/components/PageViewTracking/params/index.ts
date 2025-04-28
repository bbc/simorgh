import {
  getAppType,
  getATIMarketingString,
  getAtiUrl,
  getAtUserId,
  getBrowserViewPort,
  getCampaignType,
  getCurrentTime,
  getDestination,
  getDeviceLanguage,
  getHref,
  getReferrer,
  getRSSMarketingString,
  getScreenInfo,
  isLocServeCookieSet,
  LIBRARY_VERSION,
  onOnionTld,
  sanitise,
} from '#app/lib/analyticsUtils';
import {
  ATIConfigurationDetailsProviders,
  PageTrackingProps,
  ReverbDetailsProviders,
} from '../types';

export const getATIParams = ({
  requestContext,
  serviceContext,
  atiData,
}: ATIConfigurationDetailsProviders) => {
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

export const buildATIPageViewParams = ({
  appName,
  contentId,
  contentType,
  language,
  ldpThingIds,
  ldpThingLabels,
  pageIdentifier,
  pageTitle,
  producerId,
  libraryVersion,
  platform,
  statsDestination,
  timePublished,
  timeUpdated,
  categoryName,
  campaigns,
  nationsProducer,
  ampExperimentName,
  experimentVariant,
}: PageTrackingProps) => {
  const href = getHref(platform);
  const referrer = getReferrer(platform);
  const campaignType = getCampaignType();

  // on AMP, variable substitutions are used in the value and they cannot be
  // encoded: https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md
  const disableEncodingDueToAmpSubstitution = platform === 'amp';

  // We use amp variable substitutes to get the href and referrer and these cannot be manipulated
  // For canonical, we have a requirement to encode the x5 and x6 value twice. Source issue: https://github.com/bbc/simorgh/pull/6593
  const x5Value = disableEncodingDueToAmpSubstitution
    ? href
    : href && encodeURIComponent(encodeURIComponent(href));
  const x6Value = disableEncodingDueToAmpSubstitution
    ? referrer
    : referrer && encodeURIComponent(encodeURIComponent(referrer));

  const pageViewBeaconValues = [
    {
      key: 's',
      description: 'destination',
      value: getDestination(platform, statsDestination),
      wrap: false,
      disableEncoding: disableEncodingDueToAmpSubstitution,
    },
    {
      key: 'idclient',
      description: 'at user id',
      value: getAtUserId(),
      wrap: false,
    },
    {
      key: 's2',
      description: 'producer',
      value: producerId,
      wrap: false,
    },
    {
      key: 'p',
      description: 'page identifier',
      value: pageIdentifier,
      wrap: false,
    },
    {
      key: 'r',
      description: 'screen resolution & colour depth',
      value: getScreenInfo(platform),
      wrap: false,
      disableEncoding: disableEncodingDueToAmpSubstitution,
    },
    {
      key: 're',
      description: 'browser/viewport resolution',
      value: getBrowserViewPort(platform),
      wrap: false,
      disableEncoding: disableEncodingDueToAmpSubstitution,
    },
    {
      key: 'hl',
      description: 'time',
      value: getCurrentTime(platform),
      wrap: false,
      disableEncoding: disableEncodingDueToAmpSubstitution,
    },
    {
      key: 'lng',
      description: 'device language',
      value: getDeviceLanguage(platform),
      wrap: false,
      disableEncoding: disableEncodingDueToAmpSubstitution,
    },
    { key: 'x1', description: 'content id', value: contentId, wrap: true },
    {
      key: 'x2',
      description: 'app type',
      value: getAppType(platform),
      wrap: true,
    },
    {
      key: 'x3',
      description: 'app name',
      value: platform === 'app' ? `${appName}-app` : appName,
      wrap: true,
    },
    { key: 'x4', description: 'language', value: language, wrap: true },
    {
      key: 'x5',
      description: 'url',
      value: x5Value,
      wrap: true,
      disableEncoding: true,
    },
    {
      key: 'x6',
      description: 'referrer url',
      value: x6Value,
      wrap: true,
      disableEncoding: true,
    },
    { key: 'x7', description: 'content type', value: contentType, wrap: true },
    {
      key: 'x8',
      description: 'library version',
      value: libraryVersion,
      wrap: true,
    },
    {
      key: 'x9',
      description: 'page title',
      value: sanitise(pageTitle),
      wrap: true,
    },
    {
      key: 'x10',
      description: "Which home nation's editorial team produced the content",
      value: nationsProducer,
      wrap: true,
    },
    {
      key: 'x11',
      description: 'publication time',
      value: timePublished,
      wrap: true,
    },
    {
      key: 'x12',
      description: 'updated time',
      value: timeUpdated,
      wrap: true,
    },
    {
      key: 'x13',
      description: 'ldp things labels',
      value: ldpThingLabels,
      wrap: true,
    },
    {
      key: 'x14',
      description: 'ldp things ids',
      value: ldpThingIds,
      wrap: true,
    },
    {
      key: 'x16',
      description: 'campaigns',
      value: (Array.isArray(campaigns) ? campaigns : [])
        .map(({ campaignName }) => campaignName)
        .join('~'),
      wrap: true,
    },
    {
      key: 'x17',
      description: 'category',
      value: categoryName,
      wrap: true,
    },
    {
      key: 'x18',
      description: 'boolean - if locserve cookie value is defined',
      value: isLocServeCookieSet(),
      wrap: true,
    },
    {
      key: 'xto',
      description: 'marketing campaign',
      value: getATIMarketingString(href, campaignType),
      wrap: false,
    },
    ...(experimentVariant
      ? [
          {
            key: 'mv_test',
            description: 'Top Bar OJs experiment',
            value: 'Top Bar OJs experiment',
            wrap: false,
            disableEncoding: true,
          },
          {
            key: 'mv_creation',
            description: 'Top Bar OJs variant',
            value: `${experimentVariant}`,
            wrap: false,
            disableEncoding: true,
          },
        ]
      : []),
    ...(ampExperimentName
      ? [
          {
            key: 'mv_test',
            description: 'AMP experiment name',
            value: `${ampExperimentName}`,
            wrap: false,
            disableEncoding: true,
          },
          {
            key: 'mv_creation',
            description: 'AMP experiment variant name',
            value: `VARIANT(${ampExperimentName})`,
            wrap: false,
            disableEncoding: true,
          },
        ]
      : []),
    ...getRSSMarketingString(href, campaignType),
    ...(onOnionTld()
      ? [
          {
            key: 'product_platform',
            description: 'onion url',
            value: 'tor-bbc',
          },
        ]
      : []),
  ];

  return getAtiUrl(
    pageViewBeaconValues.concat({
      // the ref param should always be the last param because ATI will interpret it as part of the referrer URL
      key: 'ref',
      description: 'referrer url',
      value: getReferrer(platform),
      wrap: false,
      // disable encoding for this parameter as ati does not appear to support
      // decoding of the ref parameter
      disableEncoding: true,
    }),
  );
};

export const buildReverbPageViewModel = ({
  appName,
  campaigns,
  categoryName,
  contentId,
  contentType,
  language,
  ldpThingIds,
  ldpThingLabels,
  libraryVersion,
  pageIdentifier,
  pageTitle,
  platform,
  producerName,
  nationsProducer,
  statsDestination,
  timePublished,
  timeUpdated,
}: PageTrackingProps) => {
  const href = getHref(platform);
  const referrer = getReferrer(platform);

  const aggregatedCampaigns = (Array.isArray(campaigns) ? campaigns : [])
    .map(({ campaignName }) => campaignName)
    .join('~');

  const eventDetails = {
    eventName: 'pageView',
  };

  const reverbVariables = {
    params: {
      page: {
        contentId,
        contentType,
        destination: statsDestination,
        name: pageIdentifier,
        producer: producerName,
        additionalProperties: {
          app_name: platform === 'app' ? `${appName}-app` : appName,
          app_type: getAppType(platform),
          content_language: language,
          product_platform: onOnionTld() ? 'tor-bbc' : null,
          referrer_url: referrer,
          x5: href && encodeURIComponent(href),
          x8: libraryVersion,
          x9: sanitise(pageTitle),
          x10: nationsProducer && nationsProducer,
          x11: timePublished,
          x12: timeUpdated,
          x13: ldpThingLabels,
          x14: ldpThingIds,
          x16: aggregatedCampaigns,
          x17: categoryName,
          x18: isLocServeCookieSet(),
        },
      },
      user: {
        isSignedIn: false,
      },
    },
    eventDetails,
  };

  return reverbVariables;
};

export const getATIPageViewParams = ({
  requestContext,
  serviceContext,
  atiData,
}: ATIConfigurationDetailsProviders) => {
  const params = getATIParams({ atiData, requestContext, serviceContext });
  return buildATIPageViewParams(params);
};

export const getReverbParams = ({
  requestContext,
  serviceContext,
  atiData,
}: ReverbDetailsProviders) => {
  const params = getATIParams({ atiData, requestContext, serviceContext });
  return buildReverbPageViewModel(params);
};
