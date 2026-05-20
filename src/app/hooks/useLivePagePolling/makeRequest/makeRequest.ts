import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import addIndexesToEmbeds from '../transformers/addIndexesToEmbeds';
import handlePostBlocks from '../transformers/handlePostBlocks';

const transformPost = post => addIndexesToEmbeds(handlePostBlocks(post));

export default async (liveTextStreamId: string) => {
  try {
    const webCdnHost = getEnvConfig().WEB_CDN_URL;
    const fetchUrl = `${webCdnHost}/fd/stream?liveTextStreamId=${liveTextStreamId}&type=curated`;

    const response = await fetch(fetchUrl);
    const { status } = response;
    const { data } = await response.json();

    if (status === 200 && data.results.length > 0) {
      data.results = data.results.map(transformPost);
      return data;
    }

    return null;
  } catch (_err) {
    return null;
  }
};
