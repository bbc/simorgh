import {
  CLICK_EVENT,
  VIEW_EVENT,
  VIEWABILITY_CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import {
  getDestination,
  getAppType,
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getHref,
  getReferrer,
  getAtUserId,
  isLocServeCookieSet,
  onOnionTld,
  sanitise,
  getAtiUrl,
  getEventInfo,
  getCampaignType,
  getATIMarketingString,
  getRSSMarketingString,
} from '../../../lib/analyticsUtils';
import {
  ATIEventTrackingProps,
  ATIPageTrackingProps,
  ReverbBeaconConfig,
} from '../types';

/*
 * For AMP pages, certain browser and device values are determined
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#device-and-browser
 */

export const buildATIPageTrackPath = ({
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
}: ATIPageTrackingProps) => {
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

export const buildATIEventTrackUrl = ({
  pageIdentifier,
  producerId,
  platform,
  statsDestination,
  componentName,
  campaignID,
  format,
  type,
  advertiserID,
  url,
  detailedPlacement,
  experimentName,
  experimentVariant,
  ampExperimentName,
  isStatic = false,
}: ATIEventTrackingProps & {
  isStatic?: boolean;
}) => {
  // on AMP, variable substitutions are used in the value and they cannot be
  // encoded: https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md
  const disableEncodingDueToAmpSubstitution = platform === 'amp';

  const eventPublisher = type === 'view' ? 'ati' : 'atc';
  const eventTrackingBeaconValues = [
    {
      key: 's',
      description: 'destination',
      value: getDestination(platform, statsDestination),
      wrap: false,
      disableEncoding: disableEncodingDueToAmpSubstitution,
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
      key: eventPublisher,
      description: 'event publisher',
      value: getEventInfo({
        campaignID,
        componentName,
        format,
        pageIdentifier,
        advertiserID,
        url,
        detailedPlacement,
        experimentVariant: experimentVariant ?? '',
      }),
      wrap: false,
      disableEncoding: true,
    },
    ...(isStatic
      ? []
      : [
          {
            key: 'idclient',
            description: 'at user id',
            value: getAtUserId(),
            wrap: false,
          },
          {
            key: 'hl',
            description: 'time',
            value: getCurrentTime(platform),
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
            key: 'r',
            description: 'screen resolution & colour depth',
            value: getScreenInfo(platform),
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
        ]),
    ...(experimentVariant && experimentName
      ? [
          {
            key: 'mv_test',
            description: 'Experiment name',
            value: `${experimentName}`,
            wrap: false,
            disableEncoding: true,
          },
          {
            key: 'mv_creation',
            description: 'Experiment variant',
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
            description: 'AMP experiment project name',
            value: `Google Discover`,
            wrap: false,
            disableEncoding: true,
          },
          {
            key: 'mv_experiment_id',
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
  ];

  return `${getEnvConfig().SIMORGH_ATI_BASE_URL}${getAtiUrl(
    eventTrackingBeaconValues,
  )}&type=AT`;
};

export const buildReverbAnalyticsModel = ({
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
  experimentName,
  experimentVariant,
}: ATIPageTrackingProps): ReverbBeaconConfig => {
  const href = getHref(platform);
  const referrer = getReferrer(platform);

  const aggregatedCampaigns = (Array.isArray(campaigns) ? campaigns : [])
    .map(({ campaignName }) => campaignName)
    .join('~');

  const eventDetails = {
    eventName: 'pageView' as ReverbBeaconConfig['eventDetails']['eventName'],
  };

  const reverbVariables = {
    params: {
      env: getEnvConfig().SIMORGH_APP_ENV,
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
          x5: href && (platform === 'amp' ? href : encodeURIComponent(href)),
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
          ...(experimentVariant &&
            experimentName && {
              mv_test: experimentName,
              mv_creation: experimentVariant,
            }),
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

export const buildReverbEventModel = ({
  pageIdentifier,
  producerName,
  statsDestination,
  componentName,
  campaignID,
  type,
  advertiserID,
  url,
  experimentName,
  experimentVariant,
  itemTracker = {},
  groupTracker = {},
  eventGroupingName,
}: ATIEventTrackingProps): ReverbBeaconConfig => {
  const {
    type: itemType,
    text,
    position,
    duration,
    label,
    mediaType,
    resourceId: itemResourceId,
  } = itemTracker;

  const {
    name,
    itemCount,
    resourceId: groupResourceId,
    position: groupPosition,
    link,
  } = groupTracker;

  return {
    params: {
      page: {
        destination: statsDestination,
        name: pageIdentifier,
        producer: producerName,
        additionalProperties: {
          type: 'AT',
        },
      },
      user: {
        isSignedIn: false,
      },
    },
    eventDetails: {
      eventName: type === VIEW_EVENT ? 'sectionView' : 'sectionClick',
      eventPublisher: 'viewability',
      item: {
        name: componentName,
        ...(advertiserID && { attribution: advertiserID }),
        ...(url && { link: url }),
        ...(itemType && { type: itemType }),
        ...(text && { text }),
        ...(position && { position }),
        ...(duration && { duration }),
        ...(mediaType && { media_type: mediaType }),
        ...(label && { label }),
        ...(itemResourceId && { resource_id: itemResourceId }),
      },
      group: {
        name: name || campaignID,
        type: componentName,
        ...(link && { link }),
        ...(itemCount && { item_count: itemCount }),
        ...(groupResourceId && { resource_id: groupResourceId }),
        ...(groupPosition && { position: groupPosition }),
      },
      event: {
        category: 'viewability',
        action: type === CLICK_EVENT ? VIEWABILITY_CLICK_EVENT : VIEW_EVENT,
        ...(eventGroupingName && { grouping: eventGroupingName }),
      },
      isClick: type === CLICK_EVENT,
      ...(experimentVariant && {
        experience: {
          engine_type: ['experimentation'],
          engine_id: [`optimizely.${experimentName}.${experimentVariant}`],
        },
      }),
    },
  };
};
