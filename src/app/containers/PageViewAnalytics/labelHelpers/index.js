import Cookie from 'js-cookie';
import onClient from '../../../helpers/onClient';

export const getStatsDestination = (isUK, env = 'test', service) => {
  let destination = '';

  const destinationIDs = {
    NEWS_PS: 598285,
    NEWS_GNL: 598287,
    NEWS_PS_TEST: 598286,
    NEWS_GNL_TEST: 598288,
    WS_NEWS_LANGUAGES: 598342,
    WS_NEWS_LANGUAGES_TEST: 598343,
  };

  if (service === 'news') {
    destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';
  } else {
    destination = 'WS_NEWS_LANGUAGES';
  }

  const key = env === 'live' ? destination : `${destination}_TEST`;

  return destinationIDs[key] || destinationIDs.NEWS_PS;
};

export const getAppType = platform =>
  platform === 'amp' ? 'amp' : 'responsive';

export const getLocServeCookie = () => {
  if (onClient()) {
    return !!Cookie.get('loc_serve');
  }

  return null;
};

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

export const getCurrentTime = () => {
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
  if (onClient() && navigator.language) {
    return navigator.language;
  }

  return null;
};

export const getHref = () => {
  if (onClient() && window.location.href) {
    return window.location.href;
  }

  return null;
};

export const getReferrer = () => {
  if (onClient() && document.referrer) {
    return document.referrer;
  }

  return null;
};
