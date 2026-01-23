import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import { LRUCache } from 'lru-cache';
import { Services } from '#app/models/types/global';
import getAgent from '#src/server/utilities/getAgent';
import certsRequired from '#app/routes/utils/certsRequired';
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

  const agent = certsRequired(fetchUrl.toString()) ? await getAgent() : null;

  const fetchOptions = {
    ...(agent && { agent }),
  };

  fetchUrl.searchParams.set('service', service);
  fetchUrl.searchParams.set('config', configType);

  const cachedResponse = cache?.get(fetchUrl.toString());

  if (cachedResponse) {
    logger.debug(CONFIG_REQUEST_RECEIVED, { service, cached: true });
    return cachedResponse;
  }

  // @ts-expect-error - TODO: fix 'fetchOptions' type
  const response = await fetch(fetchUrl.toString(), fetchOptions);

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
