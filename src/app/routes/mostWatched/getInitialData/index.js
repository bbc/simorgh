import fetchPageData from '../../utils/fetchPageData';
import getMostWatchedUrl from '#lib/utilities/getMostWatchedUrl';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import processMostWatched from '../../utils/processMostWatched';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';

export default async ({ service, variant, pageType, toggles }) => {
  try {
    const mostWatchedUrl = getMostWatchedUrl({ service, variant }).split(
      '.',
    )[0];
    const mostWatchedDataPath = overrideRendererOnTest(mostWatchedUrl);
    const { json, status } = await fetchPageData({
      path: mostWatchedDataPath,
      pageType,
    });

    const processedData = { mostWatched: json };

    const mostWatchedData = processMostWatched({
      data: processedData,
      service,
      path: mostWatchedUrl,
      toggles,
      page: pageType,
    });

    return {
      status,
      pageData: {
        ...mostWatchedData,
        metadata: { type: pageType },
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
