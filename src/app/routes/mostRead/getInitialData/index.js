import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import fetchPageData from '../../utils/fetchPageData';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import isLocal from '../../../lib/utilities/isLocal';

export default async ({ service, variant, pageType }) => {
  try {
    const isBff = !isLocal();
    const mostReadUrl = getMostReadEndpoint({ service, variant, isBff }).split(
      '.',
    )[0];
    const { json, status } = await fetchPageData({
      path: mostReadUrl,
      pageType,
    });

    const data = json?.data || json;

    return {
      status,
      pageData: { ...data, metadata: { type: 'mostRead' } },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
