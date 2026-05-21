import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { SportDataPollingResponse } from '../types';

export default async (
  sportDataEventUrn: string,
): Promise<SportDataPollingResponse | null> => {
  try {
    const webCdnHost = getEnvConfig().WEB_CDN_URL;
    const encodedUrn = encodeURIComponent(sportDataEventUrn);
    const fetchUrl = `${webCdnHost}/ws/poll-data/sport?sportDataEventUrn=${encodedUrn}`;

    const response = await fetch(fetchUrl);
    const { status } = response;
    const { data } = await response.json();

    if (status === 200 && data) {
      return data;
    }

    return null;
  } catch (_err) {
    return null;
  }
};
