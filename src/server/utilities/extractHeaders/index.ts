import { IncomingHttpHeaders } from 'http';
import { COUNTRIES_WITH_COOKIE_BANNER } from '#app/lib/utilities/cookieCountries';

const extractHeaders = (headers: IncomingHttpHeaders) => {
  let isUK = null;
  let showCookieBannerBasedOnCountry = true;
  if (headers['x-bbc-edge-isuk']) {
    isUK = headers['x-bbc-edge-isuk'] === 'yes';
  }
  if (headers['x-country']) {
    isUK = isUK || headers['x-country'] === 'gb';
    showCookieBannerBasedOnCountry =
      isUK ||
      COUNTRIES_WITH_COOKIE_BANNER.includes(
        headers['x-country'].toString().toLowerCase(),
      );
  }
  if (headers['x-bbc-edge-country']) {
    showCookieBannerBasedOnCountry =
      isUK ||
      COUNTRIES_WITH_COOKIE_BANNER.includes(
        headers['x-bbc-edge-country'].toString().toLowerCase(),
      );
  }

  return {
    bbcOrigin: headers['bbc-origin'] || null,
    isUK,
    showAdsBasedOnLocation: headers['bbc-adverts'] === 'true' || false,
    showCookieBannerBasedOnCountry,
  };
};

export default extractHeaders;
