import getAgent from '../../../../server/utilities/getAgent';
import constructPageFetchUrl from '../constructPageFetchUrl';
import getEnvironment from '../getEnvironment';
import { Services, Variants, PageTypes } from '../../../models/types/global';
import fetchPageData from '../fetchPageData';
import getErrorStatusCode from '../fetchPageData/utils/getErrorStatusCode';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import { FetchError } from '../../../models/types/fetch';
import nodeLogger from '../../../lib/logger.node';

const logger = nodeLogger(__filename);

interface FetchDataFromBffParams {
  pathname: string;
  pageType: PageTypes;
  service: Services;
  variant?: Variants;
  isAmp?: boolean;
  page?: string;
}

export default async ({
  pathname,
  pageType,
  service,
  variant,
  isAmp,
  page,
}: FetchDataFromBffParams) => {
  const environment = getEnvironment(pathname);
  const isLocal = !environment || environment === 'local';

  const fetchUrl = constructPageFetchUrl({
    pathname,
    pageType,
    service,
    variant,
    isAmp,
    page,
  });

  const agent = isLocal ? undefined : await getAgent();
  const optHeaders = isLocal
    ? undefined
    : {
        'ctx-service-env': getEnvironment(pathname),
      };

  try {
    // @ts-expect-error - Ignore fetchPageData argument types
    const { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      agent,
      optHeaders,
      pageType,
    });

    return {
      status,
      json,
    };
  } catch (error: unknown) {
    const { message, status = getErrorStatusCode() } = error as FetchError;

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    throw error;
  }
};
