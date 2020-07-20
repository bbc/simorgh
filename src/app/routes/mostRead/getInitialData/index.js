import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

export default async ({ service, variant, pageType }) => {
  try {
    const mostReadUrl = getMostReadEndpoint({ service, variant }).split('.')[0];
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
