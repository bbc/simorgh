import {
  CLICK_EVENT,
  VIEW_EVENT,
  VIEWABILITY_CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import {
  ATIEventTrackingProps,
  ATIPageTrackingProps,
  ReverbBeaconConfig,
  ResonanceBeaconConfig,
} from '#app/components/ATIAnalytics/types';
import {
  getAppType,
  getHref,
  getReferrer,
  isLocServeCookieSet,
  onOnionTld,
  sanitise,
} from '..';

/*
 * For AMP pages, certain browser and device values are determined
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#device-and-browser
 */

const RESONANCE_MODE = { LIVE: 'live', TEST: 'test' } as const;

export const buildResonancePageViewModel = ({
  appName,
  contentId,
  contentType,
  destinationSiteId,
  hashedId,
  language,
  ldpThingIds,
  ldpThingLabels,
  pageIdentifier,
  pageTitle,
  platform,
  producerName,
  statsDestination,
  timePublished,
  timeUpdated,
}: ATIPageTrackingProps): ResonanceBeaconConfig => {
  const env = getEnvConfig().SIMORGH_APP_ENV;
  const href = getHref(platform);
  const referrer = getReferrer(platform);

  return {
    resonanceProperties: {
      mode: env === 'live' ? RESONANCE_MODE.LIVE : RESONANCE_MODE.TEST,
    },
    baseProperties: {
      app: {
        name: platform === 'app' ? `${appName}-app` : appName,
        type: getAppType(platform),
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
      ...(href && { url: href }),
      ...(referrer && { referrerUrl: referrer }),
      ...(pageTitle && { pageTitle: sanitise(pageTitle) }),
      ...(timePublished && { publicationDate: timePublished }),
      ...(timeUpdated && { pubUpdateDate: timeUpdated }),
      ...(ldpThingLabels && { ldpTags: ldpThingLabels }),
      ...(ldpThingIds && { ldpIds: ldpThingIds }),
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
  isPersonalisationOn = false,
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
        isPersonalisationOn,
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
  isPersonalisationOn = false,
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
        isSignedIn,
        hashedId,
        isPersonalisationOn,
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

type ErrorEventProps = {
  pageIdentifier?: string;
  producerName?: string;
  statsDestination?: string;
  feature: string;
  errorName: string;
  errorKey?: string;
  errorMessage?: string;
  statusCode?: number;
  isSignedIn?: boolean;
  hashedId?: string | null;
  isPersonalisationOn?: boolean;
};

/**
 * Builds a standalone Piano/Reverb "error" beacon reported when a client-side
 * feature (e.g. UAS) fails. `feature` identifies the system and `errorName` the
 * operation that failed; the optional service message/status add
 * diagnostics without carrying PII or tokens.
 */
export const buildErrorEventModel = ({
  pageIdentifier,
  producerName,
  statsDestination,
  feature,
  errorName,
  errorKey,
  errorMessage,
  statusCode,
  isSignedIn = false,
  hashedId = null,
  isPersonalisationOn = false,
}: ErrorEventProps): ReverbBeaconConfig => ({
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
      isPersonalisationOn,
    },
  },
  eventDetails: {
    eventName: 'error',
    eventPublisher: 'viewability',
    event: {
      category: 'error',
    },
    error: {
      engine: feature,
      name: errorName,
      ...(errorMessage && { message: errorMessage }),
      ...(statusCode && { code: String(statusCode) }),
      ...(errorKey && { type: errorKey }),
    },
  },
});
