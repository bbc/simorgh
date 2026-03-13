import type { Services } from '#app/models/types/global';
import { getUrlPath } from '#lib/utilities/urlParser';
import SERVICES from '#app/lib/config/services';
/**
 * Extracts the service from a URL
 * @param url - A valid URL string to extract the service from
 * @returns The service name if found and valid, otherwise null
 */
export default (url: string): Services | null => {
  const pathname = getUrlPath(url);
  const service = pathname
    .split('/')
    .filter(Boolean)[0]
    ?.replace(/\..*$/, '') as Services;

  if (SERVICES.includes(service)) {
    return service;
  }

  return null;
};
