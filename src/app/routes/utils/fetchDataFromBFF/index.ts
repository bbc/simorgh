import certsRequired from '#app/routes/utils/certsRequired';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import fetchPageData from '#app/routes/utils/fetchPageData';
import getErrorStatusCode from '#app/routes/utils/fetchPageData/utils/getErrorStatusCode';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import type { FetchError, GetAgent } from '#models/types/fetch';
import type { PageTypes, Services, Variants } from '#models/types/global';

const logger = nodeLogger(__filename);

interface FetchDataFromBffParams {
  pathname: string;
  pageType: PageTypes;
  service: Services;
  variant?: Variants | null;
  isAmp?: boolean;
  disableRadioSchedule?: boolean;
  page?: string;
  getAgent?: GetAgent;
}

export default async ({
  pathname,
  pageType,
  service,
  variant,
  isAmp,
  disableRadioSchedule,
  page,
  getAgent,
}: FetchDataFromBffParams) => {
  const environment = getEnvironment(pathname);

  const isLocal = !environment || environment === 'local';
  const optHeaders = isLocal ? undefined : { 'ctx-service-env': environment };

  const fetchUrl = constructPageFetchUrl({
    pathname,
    pageType,
    service,
    variant,
    isAmp,
    disableRadioSchedule,
    page,
  });

  const useCerts = certsRequired(pathname);

  const agent = useCerts && getAgent ? await getAgent() : undefined;
  const timeout = useCerts ? undefined : 60000;

  try {
    const fetchPageDataArgs = {
      path: fetchUrl.toString(),
      pageType,
      ...(agent && { agent }),
      ...(optHeaders && { optHeaders }),
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
