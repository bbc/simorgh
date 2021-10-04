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
  getCampaignType,
  getATIMarketingString,
} from '#lib/analyticsUtils';

/*
 * For AMP pages, certain browser and device values are determined
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#device-and-browser
 */

export const buildATIPageTrackPath = ({
  appName,
  contentId,
  contentType,
  language,
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
  const href = getHref(platform);
  const referrer = getReferrer(platform, origin, previousPath);
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
      value: appName,
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
    {
      key: 'ref',
      description: 'referrer url',
      value: getReferrer(platform, origin, previousPath),
      wrap: false,
      // disable encoding for this parameter as ati does not appear to support
      // decoding of the ref parameter
      disableEncoding: true,
    },
  ];

  return getAtiUrl(pageViewBeaconValues);
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
}) => {
  // on AMP, variable substitutions are used in the value and they cannot be
  // encoded: https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md
  const disableEncodingDueToAmpSubstitution = platform === 'amp';

  const eventPublisher = type === 'view' ? 'ati' : 'atc';
  const eventTrackingBeaconValues = [
    {
      key: 'idclient',
      description: 'at user id',
      value: getAtUserId(),
      wrap: false,
    },
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
      }),
      wrap: false,
      disableEncoding: true,
    },
  ];

  return `${process.env.SIMORGH_ATI_BASE_URL}${getAtiUrl(
    eventTrackingBeaconValues,
  )}&type=AT`;
};
