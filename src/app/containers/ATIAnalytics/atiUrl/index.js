import {
  getDestination,
  getAppType,
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getHref,
  getProducer,
  getReferrer,
  isLocServeCookieSet,
  sanitise,
} from '../../../lib/analyticsUtils';

/*
 * For AMP pages, certain browser and device values are determined
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#device-and-browser
 */

const atiPageViewParams = ({
  appName,
  contentId,
  contentType,
  language,
  ldpThingIds,
  ldpThingLabels,
  pageIdentifier,
  pageTitle,
  platform,
  service,
  statsDestination,
  timePublished,
  timeUpdated,
  origin,
  previousPath,
}) => {
  const pageViewBeaconValues = [
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
      key: 'x18',
      description: 'boolean - if locserve cookie value is defined',
      value: isLocServeCookieSet(),
      wrap: true,
    },
  ];

  const cleanedValues = pageViewBeaconValues.filter(({ value }) => value);

  const parsedAtiValues = cleanedValues.map(({ key, value, wrap }) =>
    wrap ? `${key}=[${value}]` : `${key}=${value}`,
  );

  return parsedAtiValues.join('&');
};

export default atiPageViewParams;
