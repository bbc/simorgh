import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import onClient from '#lib/utilities/onClient';
import isLive from '#lib/utilities/isLive';
import { AMP_REGEX, APP_REGEX } from '#app/lib/regex.const';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import getBaseUrl from '../getBaseUrl';

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : getEnvConfig().SIMORGH_BASE_URL;

export default pathname => {
  if (!pathname) return '';

  const params = isLive() ? '' : getQueryString(pathname);
  const basePath = getUrlPath(pathname);

  return `${baseUrl}${basePath
    .replace(AMP_REGEX, '')
    .replace(APP_REGEX, '')}.json${params}`; // Remove .amp and .app at the end of pathnames for AMP & APP pages.
};
