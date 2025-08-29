import type { Services } from '#app/models/types/global';
import { getUrlPath } from '#lib/utilities/urlParser';
import { allServices } from '#app/routes/utils/regex';
import { getWorldServices } from '#app/routes/utils/regex/utils';

/**
 * Extracts the WS service from a URL
 * @param url - A valid URL string to extract the service from
 * @returns The service name if found and valid, otherwise null
 */
const extractWorldServiceFromUrl = (url: string): Services | null => {
  const pathname = getUrlPath(url);
  const potentialService = pathname
    .split('/')
    .filter(Boolean)[0]
    ?.replace(/\..*$/, '');

  if (getWorldServices(allServices).includes(potentialService as Services)) {
    return potentialService as Services;
  }

  return null;
};

export default extractWorldServiceFromUrl;
