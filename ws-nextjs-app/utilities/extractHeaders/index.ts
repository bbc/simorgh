import { IncomingHttpHeaders } from 'http';
import { COUNTRIES_WITH_COOKIE_BANNER } from '#app/lib/utilities/cookieCountries';

const firstHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const normalizeHeaderValue = (value: string | string[] | undefined) =>
  firstHeaderValue(value)?.trim().toLowerCase();

const extractHeaders = (headers: IncomingHttpHeaders) => {
  const countryHeaderValue = normalizeHeaderValue(headers['x-country']);
  const edgeCountryHeaderValue = normalizeHeaderValue(
    headers['x-bbc-edge-country'],
  );

  let isUK = false;
  let showCookieBannerBasedOnCountry = true;
  if (headers['x-ip_is_uk_combined']) {
    isUK = headers['x-ip_is_uk_combined'] === 'yes';
  }
  if (countryHeaderValue) {
    isUK = isUK || countryHeaderValue === 'gb';
    showCookieBannerBasedOnCountry =
      isUK || COUNTRIES_WITH_COOKIE_BANNER.includes(countryHeaderValue);
  }
  if (edgeCountryHeaderValue) {
    showCookieBannerBasedOnCountry =
      isUK || COUNTRIES_WITH_COOKIE_BANNER.includes(edgeCountryHeaderValue);
  }

  return {
    bbcOrigin: headers['bbc-origin'] || null,
    country: countryHeaderValue || edgeCountryHeaderValue || null,
    isUK,
    showAdsBasedOnLocation: headers['bbc-adverts'] === 'true' || false,
    showCookieBannerBasedOnCountry,
  };
};

export default extractHeaders;
