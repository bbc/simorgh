import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

export default async (
  sportDataEventUrn: string,
): Promise<HeadToHeadV2Data | null> => {
  try {
    const webCdnHost = getEnvConfig().WEB_CDN_URL;
    const encodedUrn = encodeURIComponent(sportDataEventUrn);
    const fetchUrl = `${webCdnHost}/ws/poll-data/sport?sportDataEventUrn=${encodedUrn}`;

    const response = await fetch(fetchUrl);
    const { status } = response;
    const { data } = await response.json();
    const sportEventData = data?.sportDataEvent;

    if (status === 200 && sportEventData) {
      return sportEventData;
    }

    return null;
  } catch (_err) {
    return null;
  }
};
