import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import { LRUCache } from 'lru-cache';
import { Services } from '#app/models/types/global';
import getAgent from '#src/server/utilities/getAgent';
import certsRequired from '#app/routes/utils/certsRequired';
import { FetchError } from '#app/models/types/fetch';
import { getEnvConfig } from '../getEnvConfig';
import { PRIMARY_DATA_TIMEOUT } from '../getFetchTimeouts';
import isLive from '../isLive';

const logger = nodeLogger(__filename);

const cacheMaxItems = parseInt(
  getEnvConfig().SIMORGH_CONFIG_CACHE_ITEMS ?? '400',
  10,
);

const cacheTTL = parseInt(
  getEnvConfig().SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS ?? '300',
  10,
);

const cache = new LRUCache({
  max: cacheMaxItems,
  ttl: cacheTTL * 1000, // Convert seconds to milliseconds (5 minutes default)
});

type FetchConfigParams = {
  service: Services;
  configType: 'navigation';
};

const fetchConfig = async ({ service, configType }: FetchConfigParams) => {
  // TODO: Remove this restriction once we're ready to roll out to all services
  const shouldFetchConfig = service === 'indonesia' && !isLive();

  if (!shouldFetchConfig) return Promise.resolve(null);

  const fetchUrl = new URL(process.env.BFF_PATH as string);
  fetchUrl.searchParams.set('service', service);
  fetchUrl.searchParams.set('config', configType);

  const cachedResponse = cache?.get(fetchUrl.toString());

  logger.debug(CONFIG_REQUEST_RECEIVED, { service, cached: !!cachedResponse });

  if (cachedResponse) return cachedResponse;

  const agent = certsRequired(fetchUrl.toString()) ? await getAgent() : null;

  const fetchOptions = {
    ...(agent && { agent }),
    signal: AbortSignal.timeout(PRIMARY_DATA_TIMEOUT),
  };

  try {
    const response = await fetch(fetchUrl.toString(), fetchOptions);

    if (response.ok) {
      const data = await response.json();
      cache?.set(fetchUrl.toString(), data);
      return data;
    }

    const error = new Error() as FetchError;

    error.status = response.status;
    error.message = `Failed to fetch config for service: ${service}`;

    throw error;
  } catch (error) {
    const { message } = error as FetchError;

    logger.error(CONFIG_FETCH_ERROR, {
      error: message,
      service,
    });

    throw new Error(message);
  }
};

export default fetchConfig;
