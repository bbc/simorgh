import nodeLogger from '#lib/logger.node';
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { PageTypes, Services, Variants } from '#models/types/global';
import { FetchError } from '#models/types/fetch';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { HOME_PAGE } from '../../utils/pageTypes';

const logger = nodeLogger(__filename);

type Props = {
  service: Services;
  path: string;
  pageType: PageTypes;
  variant?: Variants;
};

export default async ({
  service,
  path: pathname,
  pageType,
  variant,
}: Props) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname,
      pageType: HOME_PAGE,
      service,
      variant,
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
