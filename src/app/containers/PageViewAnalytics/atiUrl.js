import {
  getDestination,
  getAppType,
  getLocServeCookie,
} from '../../lib/analyticsUtils';

export const atiBaseUrl = 'https://a1.api.bbc.co.uk/hit.xiti?';

/*
 * For AMP pages, certain browser and device values are determined
 * https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#device-and-browser
 */

export const atiPageViewParams = ({
  browserViewport,
  contentType,
  currentTime,
  deviceLanguage,
  env,
  href,
  isUK,
  language,
  ldpThingIds,
  ldpThingLabels,
  optimoUrn,
  pageIdentifier,
  pageTitle,
  platform,
  referrer,
  screenResolution,
  service,
  timePublished,
  timeUpdated,
}) => {
  const pageViewBeaconValues = [
    {
      key: 's',
      description: 'destination',
      value: getDestination(isUK, env),
      wrap: false,
    },
    { key: 's2', description: 'producer', value: '64', wrap: false },
    {
      key: 'p',
      description: 'page identifier',
      value: pageIdentifier,
      wrap: false,
    },
    {
      key: 'r',
      description: 'screen resolution & colour depth',
      value: screenResolution,
      // platform === 'amp'
      // ? `boo` // `\${screenWidth}x\${screenHeight}x\${screenColorDepth}`
      // : screenResolution,
      wrap: false,
    },
    {
      key: 're',
      description: 'browser/viewport resolution',
      value: browserViewport,
      // platform === 'amp'
      //   ? `\${availableScreenWidth}x\${availableScreenHeight}`
      //   : browserViewport,
      wrap: false,
    },
    {
      key: 'hl',
      description: 'time',
      value: currentTime,
      // platform === 'amp' ? `\${timestamp}` : currentTime,
      wrap: false,
    },
    {
      key: 'lng',
      description: 'device language',
      value: deviceLanguage,
      // platform === 'amp' ? `\${browserLanguage}` : deviceLanguage,
      wrap: false,
    },
    { key: 'x1', description: 'content id', value: optimoUrn, wrap: true },
    { key: 'x7', description: 'content type', value: contentType, wrap: true },
    {
      key: 'x2',
      description: 'app type',
      value: getAppType(platform),
      wrap: true,
    },
    { key: 'x3', description: 'app name', value: service, wrap: true },
    { key: 'x4', description: 'language', value: language, wrap: true },
    {
      key: 'x5',
      description: 'url',
      value: href, // platform === 'amp' ? `\${sourceUrl}` : href,
      wrap: true,
    },
    {
      key: 'x6',
      description: 'referer url',
      value: referrer, // platform === 'amp' ? `\${documentReferrer}` : referrer,
      wrap: true,
    },
    { key: 'x9', description: 'page title', value: pageTitle, wrap: true },
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
      description: 'locserve cookie value',
      value: getLocServeCookie(),
      wrap: true,
    },
  ];

  const cleanedValues = pageViewBeaconValues.filter(({ value }) => value);

  const parsedAtiValues = cleanedValues.map(({ key, value, wrap }) =>
    wrap ? `${key}=[${value}]` : `${key}=${value}`,
  );

  return parsedAtiValues.join('&');
};
