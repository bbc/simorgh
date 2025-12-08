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
