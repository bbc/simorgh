/* eslint-disable import/prefer-default-export */
import type { Services } from '#app/models/types/global';
import { getUrlPath } from '#lib/utilities/urlParser';
import { allServices } from '#app/routes/utils/regex';

/**
 * Extracts the WS service from a URL
 * @param url - A valid URL string to extract the service from
 * @returns The service name if found and valid, otherwise null
 */
export const extractServiceFromUrl = (url: string): Services | null => {
  const pathname = getUrlPath(url);
  const potentialService = pathname.split('/').filter(Boolean)[0];

  if (allServices.includes(potentialService as Services)) {
    return potentialService as Services;
  }

  return null;
};
