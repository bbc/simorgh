import { getQueryString, getUrlPath } from '#lib/utilities/urlParser';
import onClient from '#lib/utilities/onClient';
import isLive from '#lib/utilities/isLive';
import { AMP_REGEX } from '#app/lib/regex.const';
import getBaseUrl from '../getBaseUrl';

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

export default pathname => {
  if (!pathname) return '';

  const params = isLive() ? '' : getQueryString(pathname);
  const basePath = getUrlPath(pathname);
  return `${baseUrl}${basePath.replace(AMP_REGEX, '')}.json${params}`; // Remove .amp at the end of pathnames for AMP pages.
};
