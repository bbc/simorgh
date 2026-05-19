import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

export default async (sportDataEventUrn: string) => {
  try {
    const webCdnHost = getEnvConfig().WEB_CDN_URL;
    const fetchUrl = `${webCdnHost}/ws/poll-data/sports?liveSportDataUrn=${sportDataEventUrn}`;

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
