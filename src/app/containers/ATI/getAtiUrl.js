import {
  getDestination,
  getPageIdentifier,
  getScreenInfo,
  getBrowserViewPort,
  getATITime,
  getDeviceLanguage,
  getOptimoUrn,
  getAppType,
  getLanguage,
  getPromoHeadline,
  getPublishedTime,
  getThingAttributes,
  getLocServeCookie,
} from './labelHelpers';

const getAtiUrl = ({
  articleData,
  service,
  platform,
  isUK,
  env,
  href,
  referrer,
}) => {
  const atiValues = {
    s: getDestination(isUK, env), // destination
    s2: '64', // producer
    xchapter: getPageIdentifier(service, articleData), // chapter
    r: getScreenInfo(), // screen resolution & colour depth.
    re: getBrowserViewPort(), // browser/viewport resolution.
    hl: getATITime(), // time
    lng: getDeviceLanguage(), // device language
    x1: getOptimoUrn(articleData), // content id
    x7: 'article', // content type
    x2: getAppType(platform), // app type
    x3: service, // app name
    x4: getLanguage(articleData), // language
    x5: href, // url
    x6: referrer, // referer url
    x9: getPromoHeadline(articleData), // page title
    x11: getPublishedTime('firstPublished', articleData), // publication date
    x12: getPublishedTime('lastPublished', articleData), // updated data
    x13: getThingAttributes('thingLabel', articleData), // ldp things
    x14: getThingAttributes('thingId', articleData), // ldp things ids
    x18: getLocServeCookie(), // location
  };

  const atiUrl = 'https://a1.api.bbc.co.uk/hit.xiti?';

  const atiKeyValues = [];

  Object.keys(atiValues).forEach(key => {
    if (atiValues[key]) {
      atiKeyValues.push(`${key}=[${encodeURI(atiValues[key])}]`);
    }
  });

  return atiUrl + atiKeyValues.join('&') + '&Rdt=On';
};

export default getAtiUrl;
