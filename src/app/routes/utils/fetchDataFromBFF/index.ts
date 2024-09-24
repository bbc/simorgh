import constructPageFetchUrl from '../constructPageFetchUrl';
import getEnvironment from '../getEnvironment';
import { Services, Variants, PageTypes } from '../../../models/types/global';
import fetchPageData from '../fetchPageData';
import getErrorStatusCode from '../fetchPageData/utils/getErrorStatusCode';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import { FetchError, GetAgent } from '../../../models/types/fetch';
import nodeLogger from '../../../lib/logger.node';
import certsRequired from '../certsRequired';

const logger = nodeLogger(__filename);
const BFF_IS_LOCAL = process?.env?.BFF_PATH?.includes('localhost:3210');

interface FetchDataFromBffParams {
  pathname: string;
  pageType: PageTypes;
  service: Services;
  variant?: Variants;
  isAmp?: boolean;
  page?: string;
  getAgent?: GetAgent;
}

type OptHeaders =
  | {
      'ctx-service-env': string;
      Accept?: string;
    }
  | undefined;

export default async ({
  pathname,
  pageType,
  service,
  variant,
  isAmp,
  page,
  getAgent,
}: FetchDataFromBffParams) => {
  const useCerts = certsRequired(pathname);
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

  const agent = useCerts && getAgent ? await getAgent() : undefined;
  const timeout = useCerts ? undefined : 60000;

  const optHeaders: OptHeaders = isLocal
    ? undefined
    : {
        'ctx-service-env': environment,
      };

  if (BFF_IS_LOCAL && optHeaders) {
    optHeaders.Accept = 'text/html,application/xhtml+xml,application/xml';
  }

  try {
    const fetchPageDataArgs = {
      path: fetchUrl.toString(),
      agent,
      optHeaders,
      pageType,
      ...(timeout && { timeout }),
    };

    // @ts-expect-error - Ignore fetchPageData argument types
    const { status, json } = await fetchPageData(fetchPageDataArgs);

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
