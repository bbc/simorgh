import fetchPageData from '../../utils/fetchPageData';
import getMostWatchedUrl from '#lib/utilities/getMostWatchedUrl';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import processMostWatched from '../../utils/processMostWatched';

export default async ({ service, variant, pageType, toggles }) => {
  try {
    const mostWatchedUrl = getMostWatchedUrl({ service, variant }).split(
      '.',
    )[0];
    const { json, status } = await fetchPageData({
      path: mostWatchedUrl,
      pageType,
    });

    const processedData = { mostWatched: json };

    const mostWatchedData = processMostWatched({
      data: processedData,
      service,
      path: mostWatchedUrl,
      toggles,
    });

    return {
      status,
      pageData: {
        ...mostWatchedData,
        metadata: { type: 'mostWatched' },
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
