import { map, pipe } from 'ramda';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import handlePostBlocks from '../transformers/handlePostBlocks';
import addIndexesToEmbeds from '../transformers/addIndexesToEmbeds';

export default async (liveTextStreamId: string) => {
  try {
    const webCdnHost = getEnvConfig().WEB_CDN_URL;

    const fetchUrl = `${webCdnHost}/fd/stream?liveTextStreamId=${liveTextStreamId}&type=curated`;
    const response = await fetch(fetchUrl);
    const { status } = response;
    const { data } = await response.json();

    if (status === 200 && data.results.length > 0) {
      const formattedData = map(
        pipe(handlePostBlocks, addIndexesToEmbeds),
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
