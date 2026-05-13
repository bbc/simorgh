// TODO - consolidate with other polling?
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

export default async (liveSportDataId: string) => {
  try {
    const webCdnHost = getEnvConfig().WEB_CDN_URL;
    const fetchUrl = `${webCdnHost}/blah?liveSportDataId=${liveSportDataId}`; // TODO - to be confirmed

    const response = await fetch(fetchUrl);
    const { status } = response;
    const { data } = await response.json();

    if (status === 200 && data.results.length > 0) {
      return data;
    }

    return null;
  } catch (_err) {
    return null;
  }
};
