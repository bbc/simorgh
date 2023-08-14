import getAgent from '#server/utilities/getAgent';
import fetchPageData from '../../utils/fetchPageData';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import getEnvironment from '../../utils/getEnvironment';
import constructPageFetchUrl from '../../utils/constructPageFetchUrl';
import PAGE_TYPES from '../../utils/constructPageFetchUrl/page-types';
import handleError from '../../utils/handleError';

export default async ({ service, variant, pageType, path: pathname }) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';

    const agent = !isLocal ? await getAgent() : null;

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType: PAGE_TYPES.MOST_READ,
      service,
      variant,
    });

    const optHeaders = { 'ctx-service-env': env };

    const { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    if (!json?.data) {
      throw handleError('Most Read data is malformed', 500);
    }

    const data = json?.data;

    return {
      status,
      pageData: { ...data, metadata: { ...data.metadata, type: pageType } },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
