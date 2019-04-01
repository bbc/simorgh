import {
  getDestination,
  getPageIdentifier,
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getOptimoUrn,
  getAppType,
  getLanguage,
  getPromoHeadline,
  getPublishedTime,
  getThingAttributes,
  getLocServeCookie,
} from './labelHelpers';

const getPageViewBeaconUrl = ({
  articleData,
  service,
  platform,
  isUK,
  env,
  href,
  referrer,
}) => {
  const pageViewBeaconValues = [
    { key: 's', value: getDestination(isUK, env), wrap: false }, // destination
    { key: 's2', value: '64', wrap: false }, // producer
    { key: 'p', value: getPageIdentifier(service, articleData), wrap: false }, // page identifier
    { key: 'r', value: getScreenInfo(), wrap: false }, // screen resolution & colour depth.
    { key: 're', value: getBrowserViewPort(), wrap: false }, // browser/viewport resolution.
    { key: 'hl', value: getCurrentTime(), wrap: false }, // time
    { key: 'lng', value: getDeviceLanguage(), wrap: false }, // device language
    { key: 'x1', value: getOptimoUrn(articleData), wrap: true }, // content id
    { key: 'x7', value: 'article', wrap: true }, // content type
    { key: 'x2', value: getAppType(platform), wrap: true }, // app type
    { key: 'x3', value: service, wrap: true }, // app name
    { key: 'x4', value: getLanguage(articleData), wrap: true }, // language
    { key: 'x5', value: href, wrap: true }, // url
    { key: 'x6', value: referrer, wrap: true }, // referer url
    { key: 'x9', value: getPromoHeadline(articleData), wrap: true }, // page title
    {
      key: 'x11',
      value: getPublishedTime('firstPublished', articleData),
      wrap: true,
    }, // article publication time
    {
      key: 'x12',
      value: getPublishedTime('lastPublished', articleData),
      wrap: true,
    }, // article updated time
    {
      key: 'x13',
      value: getThingAttributes('thingLabel', articleData),
      wrap: true,
    }, // ldp things labels
    {
      key: 'x14',
      value: getThingAttributes('thingId', articleData),
      wrap: true,
    }, // ldp things ids
    { key: 'x18', value: getLocServeCookie(), wrap: true }, // locserve cookie value
  ];

  const pageViewBeaconBaseUrl = 'https://a1.api.bbc.co.uk/hit.xiti?';

  const cleanedValues = pageViewBeaconValues.filter(({ value }) => value);

  const parsedAtiValues = cleanedValues.map(({ key, value, wrap }) => {
    const encodedValue = encodeURI(value);

    return wrap ? `${key}=[${encodedValue}]` : `${key}=${encodedValue}`;
  });

  return pageViewBeaconBaseUrl + parsedAtiValues.join('&');
};

export default getPageViewBeaconUrl;
