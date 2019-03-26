import Cookie from 'js-cookie';
import get from '../../lib/utils/get';
import onClient from '../../lib/utils/onClient';

export const getDestination = (isUK, env) => {
  const destinationIDs = {
    NEWS_PS: 598285,
    NEWS_GNL: 598287,
    NEWS_PS_TEST: 598286,
    NEWS_GNL_TEST: 598288,
  };

  const destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';

  const key = !env || env === 'live' ? destination : `${destination}_TEST`;

  return destinationIDs[key] || destinationIDs.NEWS_PS;
};

export const getOptimoUrn = articleData =>
  get(['metadata', 'locators', 'optimoUrn'], articleData);

export const getPageIdentifier = (service, articleData) => {
  const optimoUrn = getOptimoUrn(articleData);

  const optimoId = optimoUrn ? optimoUrn.split(':').pop() : 'unknown';

  return `health::${service || 'news'}.articles.${optimoId}.page`;
};

export const getAppType = platform =>
  platform === 'amp' ? 'amp' : 'responsive';

export const getISODate = unixTimestamp => {
  const date = new Date(unixTimestamp);
  return date.toISOString();
};

export const getLanguage = articleData =>
  get(['metadata', 'passport', 'language'], articleData);

export const getPromoHeadline = articleData =>
  get(['promo', 'headlines', 'seoHeadline'], articleData);

const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

export const getPublishedTime = (attribute, articleData) => {
  const publishedTime = get(['metadata', attribute], articleData);

  return publishedTime && isValidDateTime(publishedTime)
    ? getISODate(publishedTime)
    : null;
};

export const getThingAttributes = (attribute, articleData) => {
  const things = get(['metadata', 'tags', 'about'], articleData);

  if (things) {
    const attributes = [];

    things.forEach(thing => {
      if (thing[attribute]) {
        attributes.push(thing[attribute]);
      }
    });

    return attributes.join('~') || null;
  }

  return null;
};

export const getLocServeCookie = () =>
  onClient() ? Cookie.get('loc_serve') : null;

export const getScreenInfo = () => {
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

export const getBrowserViewPort = () => {
  if (onClient()) {
    const { innerWidth, innerHeight } = window;

    return [innerWidth || 0, innerHeight || 0].join('x');
  }

  return null;
};

export const getATITime = () => {
  if (onClient()) {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    return [hours, mins, secs].join('x');
  }

  return null;
};

export const getDeviceLanguage = () => {
  if (onClient()) {
    return navigator.language;
  }

  return null;
};
