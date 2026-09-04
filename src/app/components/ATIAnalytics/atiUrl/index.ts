import {
  ACTIVATION_EVENT,
  ACTIVATION_EVENT_INTERACTION_TYPE,
  ACTIVATION_EVENT_SERVE_ACTION,
  ACTIVATION_EVENT_SPEC_ID,
  ACTIVATION_EVENT_SPEC_VERSION,
  CLICK_EVENT,
  VIEW_EVENT,
  VIEWABILITY_CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { Platforms } from '#app/models/types/global';
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
  ResonanceBeaconConfig,
} from '../types';

/*
 * For AMP pages, certain browser and device values are determined
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#device-and-browser
 */

const RESONANCE_MODE = { LIVE: 'live', TEST: 'test' } as const;

export const buildResonanceAnalyticsModel = ({
  appName,
  contentId,
  contentType,
  language,
  statsDestination,
  destinationSiteId,
  hashedId,
  pageIdentifier,
  producerName,
  platform,
}: ATIPageTrackingProps): ResonanceBeaconConfig => {
  const env = getEnvConfig().SIMORGH_APP_ENV;

  return {
    resonanceProperties: {
      mode: env === 'live' ? RESONANCE_MODE.LIVE : RESONANCE_MODE.TEST,
    },
    baseProperties: {
      app: {
        name: platform === 'app' ? `${appName}-app` : appName,
      },
      destination: statsDestination,
      hashedUserId: hashedId ?? undefined,
      pageName: pageIdentifier,
      producer: producerName,
      siteId: destinationSiteId,
    },
    pageviewProperties: {
      contentId,
      contentType,
      language,
      destination: statsDestination,
      producer: producerName,
    },
  } as ResonanceBeaconConfig;
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
  isSignedIn = false,
  hashedId = null,
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
        isSignedIn,
        hashedId,
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
  isSignedIn = false,
  hashedId = null,
}: ATIEventTrackingProps): ReverbBeaconConfig => {
  const {
    type: itemType,
    text,
    position,
    duration,
    watchedDuration,
    totalDuration,
    completionRate,
    skipRate,
    playbackTrigger,
    versionId,
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
        isSignedIn,
        hashedId,
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
        // snake_case keeps the custom playback fields aligned with existing reverb labels
        ...(watchedDuration && { watched_duration: watchedDuration }),
        ...(totalDuration && { total_duration: totalDuration }),
        ...(completionRate != null && { completion_rate: completionRate }),
        ...(skipRate != null && { skip_rate: skipRate }),
        ...(playbackTrigger && { playback_trigger: playbackTrigger }),
        ...(versionId && { version_id: versionId }),
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

type ActivationEventProps = {
  pageIdentifier?: string;
  platform?: Platforms;
  appName?: string;
  producerName?: string;
  statsDestination?: string;
  experimentName: string;
  experimentVariant: string;
  isSignedIn?: boolean;
  hashedId?: string | null;
};

/**
 * Builds the standalone Piano/Reverb "activation" beacon fired when a user is
 * activated into an Optimizely experiment, decoupled from any view/click event.
 * Follows the "Activation (v1.0.1) on Web" event-catalogue spec (viewability model),
 * spec ID ACTIVATION_EVENT_SPEC_ID - see https://broxy.tools.bbc.co.uk/bbc-event-catalogue/xbbc/viewability-events/specs/experiment/activation-web/1.0.1/
 */
export const buildActivationEventModel = ({
  pageIdentifier,
  platform,
  appName,
  producerName,
  statsDestination,
  experimentName,
  experimentVariant,
  isSignedIn = false,
  hashedId = null,
}: ActivationEventProps): ReverbBeaconConfig => ({
  params: {
    page: {
      destination: statsDestination,
      name: pageIdentifier,
      producer: producerName,
      additionalProperties: {
        type: 'AT',
        app_name: platform === 'app' ? `${appName}-app` : appName,
        app_type: getAppType(platform),
      },
    },
    user: {
      isSignedIn,
      hashedId,
    },
  },
  eventDetails: {
    eventName: ACTIVATION_EVENT,
    eventPublisher: 'viewability',
    event: {
      category: 'viewability',
      action: ACTIVATION_EVENT_SERVE_ACTION,
      // Identifies this 'serve' event as an activation event, pending a dedicated event_action value in the spec
      interaction_type: ACTIVATION_EVENT_INTERACTION_TYPE,
      spec_id: ACTIVATION_EVENT_SPEC_ID,
      spec_version: ACTIVATION_EVENT_SPEC_VERSION,
    },
    group: {
      type: 'experiment',
      name: 'optimizely',
    },
    experience: {
      engine_id: [`optimizely.${experimentName}.${experimentVariant}`],
    },
  },
});
