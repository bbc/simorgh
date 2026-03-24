import { map, pipe } from 'ramda';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import handlePostBlocks from '../transformers/handlePostBlocks';
import addIdsToPost from '../transformers/addIdsToPost';
import addIndexesToEmbeds from '../transformers/addIndexesToEmbeds';

export default async (liveTextStreamId: string) => {
  try {
    const webCdnHost = 'https://web-cdn.test.api.bbci.co.uk'; // getEnvConfig().SIMORGH_MOST_READ_CDN_URL;
    console.log('CHECK CDN', webCdnHost);

    const fetchUrl = `${webCdnHost}/fd/stream?liveTextStreamId=${liveTextStreamId}&type=curated`;

    console.log('CHECK FETCH URL', fetchUrl);
    const response = await fetch(fetchUrl);
    const { status, headers } = response;
    const { data } = await response.json();

    console.log('CHECK STAT', status);
    console.log('CHECK HEADERS', Object.fromEntries(headers));

    if (status === 200 && data.results.length > 0) {
      console.log('CHECK DATA', data);
      console.log('CHECK HEAD', headers);
      console.log('+==============+');
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
