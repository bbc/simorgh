import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import { LRUCache } from 'lru-cache';
import { Services } from '#app/models/types/global';
import { getEnvConfig } from '../getEnvConfig';

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
  const fetchUrl = new URL(process.env.BFF_PATH as string);

  fetchUrl.searchParams.append('service', service);
  fetchUrl.searchParams.append('config', configType);

  const cachedResponse = cache?.get(fetchUrl.toString());

  if (cachedResponse) {
    logger.debug(CONFIG_REQUEST_RECEIVED, { service, cached: true });
    return cachedResponse;
  }

  const response = await fetch(fetchUrl.toString());

  if (response.ok) {
    const { data } = await response.json();
    cache?.set(fetchUrl.toString(), data);
    return data.items;
  }

  logger.error(CONFIG_FETCH_ERROR, {
    status: response.status,
    service,
  });

  throw new Error(`Failed to fetch config for service: ${service}`);
};

export default fetchConfig;
