import { IncomingHttpHeaders } from 'http';

const extractHeaders = (headers: IncomingHttpHeaders) => {
  const COUNTRIES_WITH_COOKIE_BANNER = [
    'be',
    'el',
    'lt',
    'pt',
    'bg',
    'es',
    'lu',
    'ro',
    'cz',
    'fr',
    'hu',
    'si',
    'dk',
    'hr',
    'mt',
    'sk',
    'de',
    'it',
    'nl',
    'fi',
    'ee',
    'cy',
    'at',
    'se',
    'ie',
    'lv',
    'pl',
    'gb',
  ];
  let isUK = null;
  let showCookieBannerBasedOnCountry = true;
  if (headers['x-bbc-edge-isuk']) {
    isUK = headers['x-bbc-edge-isuk'] === 'yes';
  } else if (headers['x-country']) {
    isUK = headers['x-country'] === 'gb';
    showCookieBannerBasedOnCountry = COUNTRIES_WITH_COOKIE_BANNER.includes(
      headers['x-country'].toString().toLowerCase(),
    );
  }

  return {
    isUK,
    showCookieBannerBasedOnCountry,
  };
};

export default extractHeaders;
