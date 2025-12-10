import {
  CLICK_EVENT,
  VIEW_EVENT,
  VIEWABILITY_CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import {
  getAppType,
  getHref,
  getReferrer,
  isLocServeCookieSet,
  onOnionTld,
  sanitise,
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
