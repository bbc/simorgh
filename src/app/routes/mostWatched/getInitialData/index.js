import getMostWatchedUrl from '#lib/utilities/getUrlHelpers/getMostWatchedUrl';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import fetchPageData from '../../utils/fetchPageData';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import processMostWatched from '../../utils/processMostWatched';

export default async ({ service, variant, pageType, toggles, path }) => {
  const env = path.includes('renderer_env=live')
    ? 'live'
    : getEnvConfig().SIMORGH_APP_ENV;

  try {
    const mostWatchedUrl = getMostWatchedUrl({ service, variant, env });
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
