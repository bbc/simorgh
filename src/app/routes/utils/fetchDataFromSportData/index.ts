import Url from 'url-parse';
import fetchPageData from '#app/routes/utils/fetchPageData';
import getErrorStatusCode from '#app/routes/utils/fetchPageData/utils/getErrorStatusCode';
import { SPORT_DATA_FETCH_ERROR } from '#lib/logger.const';
import { FetchError, GetAgent } from '#models/types/fetch';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

interface fetchDataFromSportData {
  type: string;
  urn: string;
  getAgent?: GetAgent;
}

export default async ({ type, urn, getAgent }: fetchDataFromSportData) => {
  const queryParameters = {
    type,
    urn,
  };

  const fetchUrl = Url('https://fabl.api.bbci.co.uk/module/sport-data').set(
    'query',
    queryParameters,
  );

  const useCerts = true;

  const agent = useCerts && getAgent ? await getAgent() : undefined;
  const timeout = useCerts ? undefined : 60000;

  try {
    const fetchPageDataArgs = {
      path: fetchUrl.toString(),
      ...(agent && { agent }),
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

    logger.error(SPORT_DATA_FETCH_ERROR, {
      type,
      urn,
      status,
      message,
    });

    throw error;
  }
};
