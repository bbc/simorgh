import { map, pipe } from 'ramda';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isLocal from '#app/lib/utilities/isLocal';
import handlePostBlocks from '../transformers/handlePostBlocks';
import addIdsToPost from '../transformers/addIdsToPost';
import addIndexesToEmbeds from '../transformers/addIndexesToEmbeds';

export default async (liveTextStreamId: string) => {
  try {
    const webCdnHost = isLocal()
      ? 'https://web-cdn.test.api.bbci.co.uk'
      : getEnvConfig().SIMORGH_MOST_READ_CDN_URL;

    const fetchUrl = `${webCdnHost}/fd/stream?liveTextStreamId=${liveTextStreamId}&type=curated`;
    const response = await fetch(fetchUrl);
    const { status } = response;
    const { data } = await response.json();

    if (status === 200 && data.results.length > 0) {
      const formattedData = map(
        pipe(handlePostBlocks, addIdsToPost, addIndexesToEmbeds),
        data.results,
      );

      data.results = formattedData;
      return data;
    }

    return null;
  } catch (_err) {
    return null;
  }
};
