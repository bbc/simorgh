import getAgent from '../../../../server/utilities/getAgent';
import getEnvironment from '../getEnvironment';
import { Services, Variants } from '../../../models/types/global';
import fetchPageData from '../fetchPageData';
import getErrorStatusCode from '../fetchPageData/utils/getErrorStatusCode';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import { FetchError } from '../../../models/types/fetch';
import nodeLogger from '../../../lib/logger.node';
import constructSecondaryDataFetchUrl from '../constructSecondaryDataFetchUrl';

const logger = nodeLogger(__filename);

interface FetchDataFromBffParams {
  pathname: string;
  service: Services;
  variant?: Variants;
  secondaryData?: 'topStoriesAndFeatures' | 'mostRead' | 'mostWatched';
}

export default async ({
  pathname,
  service,
  variant,
  secondaryData,
}: FetchDataFromBffParams) => {
  const environment = getEnvironment(pathname);
  const isLocal = !environment || environment === 'local';

  const fetchUrl = constructSecondaryDataFetchUrl({
    service,
    variant,
    secondaryData,
  });

  // const agent = isLocal ? undefined : await getAgent();
  const optHeaders = isLocal
    ? undefined
    : {
        'ctx-service-env': getEnvironment(pathname),
      };

  try {
    // @ts-expect-error - Ignore fetchPageData argument types
    const { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      // agent,
      optHeaders,
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
