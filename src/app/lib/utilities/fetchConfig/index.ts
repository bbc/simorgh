import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import { LRUCache } from 'lru-cache';
import { Services } from '#app/models/types/global';
import getAgent from '#src/server/utilities/getAgent';
import certsRequired from '#app/routes/utils/certsRequired';
import { FetchError } from '#app/models/types/fetch';
import { PRIMARY_DATA_TIMEOUT } from '../getFetchTimeouts';
import isLive from '../isLive';

const logger = nodeLogger(__filename);

const CACHE_MAX_ITEMS = 500; // Avg 10 per service + buffer

const CACHE_TTL_SECONDS = 300; // 5 minutes

const cache = new LRUCache({
  max: CACHE_MAX_ITEMS,
  ttl: CACHE_TTL_SECONDS * 1000,
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
