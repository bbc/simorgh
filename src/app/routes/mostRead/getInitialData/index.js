import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import { MOST_READ_PAGE } from '../../utils/pageTypes';
import handleError from '../../utils/handleError';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import nodeLogger from '../../../lib/logger.node';

const logger = nodeLogger(__filename);

export default async ({
  service,
  variant,
  pageType,
  path: pathname,
  getAgent,
}) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname,
      service,
      variant,
      pageType: MOST_READ_PAGE,
      getAgent,
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
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    return { error: message, status };
  }
};
