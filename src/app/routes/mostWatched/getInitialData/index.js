import fetchPageData from '../../utils/fetchPageData';
import getMostWatchedUrl from '#lib/utilities/getMostWatchedUrl';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

export default async ({ service, variant, pageType }) => {
  try {
    const mostWatchedUrl = getMostWatchedUrl({ service, variant }).split(
      '.',
    )[0];
    const { json, status } = await fetchPageData({
      path: mostWatchedUrl,
      pageType,
    });

    return {
      status,
      pageData: { ...json, metadata: { type: 'mostWatched' } },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
