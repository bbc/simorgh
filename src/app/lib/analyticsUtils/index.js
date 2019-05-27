import Cookie from 'js-cookie';
import onClient from '../../helpers/onClient';

export const getDestination = isUK => {
  const destinationIDs = {
    NEWS_PS: 598285,
    NEWS_GNL: 598287,
    NEWS_PS_TEST: 598286,
    NEWS_GNL_TEST: 598288,
  };

  const destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';

  const key =
    process.env.APP_ENV === 'live' ? destination : `${destination}_TEST`;

  return destinationIDs[key] || destinationIDs.NEWS_PS;
};

export const getAppType = platform =>
  platform === 'amp' ? 'amp' : 'responsive';

export const isLocServeCookieSet = platform => {
  if (platform === 'amp') {
    return false;
  }

  if (onClient()) {
    return !!Cookie.get('loc_serve');
  }

  return null;
};

export const getScreenInfo = platform => {
  if (platform === 'amp') {
    return `\${screenWidth}x\${screenHeight}x\${screenColorDepth}`;
  }

  if (onClient()) {
    const { width, height, colorDepth, pixelDepth } = window.screen;
    const orderArray = [
      width || 0,
      height || 0,
      colorDepth || 0,
      pixelDepth || 0,
    ];

    return orderArray.join('x');
  }

  return null;
};

// language: getLanguage(articleData),
// ldpThingIds: getThingAttributes('thingId', articleData),
// ldpThingLabels: getThingAttributes('thingLabel', articleData),
// optimoUrn: getOptimoUrn(articleData),
// pageIdentifier: getPageIdentifier(service, articleData),
// pageTitle: getPromoHeadline(articleData),
// timePublished: getPublishedDatetime('firstPublished', articleData),
// timeUpdated: getPublishedDatetime('lastPublished', articleData),

export const getBrowserViewPort = platform => {
  if (platform === 'amp') {
    return `\${availableScreenWidth}x\${availableScreenHeight}`;
  }

  if (onClient()) {
    const { innerWidth, innerHeight } = window;

    return [innerWidth || 0, innerHeight || 0].join('x');
  }

  return null;
};

export const getCurrentTime = platform => {
  if (platform === 'amp') {
    return `\${timestamp}`;
  }

  if (onClient()) {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    return [hours, mins, secs].join('x');
  }

  return null;
};

export const getDeviceLanguage = platform => {
  if (platform === 'amp') {
    // Using browserlanguage since AMP doesn't have access to device language
    return `\${browserLanguage}`;
  }

  if (onClient() && navigator.language) {
    return navigator.language;
  }

  return null;
};

export const getHref = platform => {
  if (platform === 'amp') {
    return `\${sourceUrl}`;
  }

  if (onClient() && window.location.href) {
    return window.location.href;
  }

  return null;
};

export const getReferrer = platform => {
  if (platform === 'amp') {
    return `\${documentReferrer}`;
  }

  if (onClient() && document.referrer) {
    return document.referrer;
  }

  return null;
};
