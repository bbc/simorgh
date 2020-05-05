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
  sanitise,
  getAtiUrl,
  getEventInfo,
  getProducer,
} from '#lib/analyticsUtils';

const spaceRegex = / /g;

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
  origin,
  previousPath,
  categoryName,
  campaigns,
}) => {
  const pageViewBeaconValues = [
    {
      key: 's',
      description: 'destination',
      value: getDestination(statsDestination),
      wrap: false,
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
    },
    {
      key: 're',
      description: 'browser/viewport resolution',
      value: getBrowserViewPort(platform),
      wrap: false,
    },
    {
      key: 'hl',
      description: 'time',
      value: getCurrentTime(platform),
      wrap: false,
    },
    {
      key: 'lng',
      description: 'device language',
      value: getDeviceLanguage(platform),
      wrap: false,
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
      value: appName,
      wrap: true,
    },
    { key: 'x4', description: 'language', value: language, wrap: true },
    {
      key: 'x5',
      description: 'url',
      value: getHref(platform),
      wrap: true,
    },
    {
      key: 'x6',
      description: 'referrer url',
      value: getReferrer(platform, origin, previousPath),
      wrap: true,
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
        .map(campaign => campaign.campaignName.replace(spaceRegex, '%20'))
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
      key: 'ref',
      description: 'refferer url',
      value: getReferrer(platform, origin, previousPath),
      wrap: false,
    },
  ];

  return getAtiUrl(pageViewBeaconValues);
};

export const buildATIEventTrackUrl = ({
  pageIdentifier,
  service,
  platform,
  statsDestination,
  componentName,
  componentInfo,
  type,
}) => {
  const eventPublisher = type === 'view' ? 'ati' : 'atc';
  const eventTrackingBeaconValues = [
    {
      key: 's',
      description: 'destination',
      value: getDestination(statsDestination),
      wrap: false,
    },
    {
      key: 's2',
      description: 'producer',
      value: getProducer(service),
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
    },
    {
      key: 're',
      description: 'browser/viewport resolution',
      value: getBrowserViewPort(platform),
      wrap: false,
    },
    {
      key: 'hl',
      description: 'time',
      value: getCurrentTime(platform),
      wrap: false,
    },
    {
      key: 'lng',
      description: 'device language',
      value: getDeviceLanguage(platform),
      wrap: false,
    },
    {
      key: eventPublisher,
      description: 'event publisher',
      value: getEventInfo(pageIdentifier, {
        service,
        componentName,
        componentInfo,
        type: type || '',
      }),
    },
  ];

  return `${process.env.SIMORGH_ATI_BASE_URL}${getAtiUrl(
    eventTrackingBeaconValues,
  )}&type=AT`;
};
