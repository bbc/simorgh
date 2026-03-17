import { map, pipe } from 'ramda';
import handlePostBlocks from '../transformers/handlePostBlocks';
import addIdsToPost from '../transformers/addIdsToPost';
import addIndexesToEmbeds from '../transformers/addIndexesToEmbeds';

export default async (liveTextStreamId: string) => {
  try {
    const fetchUrl = `/fd/ws-poll/stream?liveTextStreamId=${liveTextStreamId}&page=1&pageSize=20&type=curated`;
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
