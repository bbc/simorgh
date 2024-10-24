import { InitialDataProps } from '#app/models/types/initialData';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import { FetchError } from '../../../models/types/fetch';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { HOME_PAGE } from '../../utils/pageTypes';

const logger = nodeLogger(__filename);

export default async ({
  service,
  path: pathname,
  pageType,
  variant,
  getAgent,
}: InitialDataProps) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname,
      pageType: HOME_PAGE,
      service,
      variant,
      getAgent,
    });

    const {
      data: { title, description, curations, metadata },
    } = json;

    return {
      status,
      pageData: {
        title,
        metadata: { ...metadata, type: pageType },
        curations,
        description,
      },
    };
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    return { error: message, status };
  }
};
