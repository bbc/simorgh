import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import { getQueryString } from '#lib/utilities/urlParser';

export default async ({ service, variant, pageType, path }) => {
  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = process.env;
  try {
    const mostReadUrl = getMostReadEndpoint({
      service,
      variant,
      env: SIMORGH_APP_ENV,
      queryString: getQueryString(path),
      baseUrl: SIMORGH_BASE_URL,
    }).replace('.json', ''); // fetchPageData appends .json to the path

    const { json, status } = await fetchPageData({
      path: mostReadUrl,
      pageType,
    });

    return {
      status,
      pageData: { ...json, metadata: { type: 'mostRead' } },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
