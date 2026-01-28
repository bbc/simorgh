import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import { LRUCache } from 'lru-cache';
import { Services } from '#app/models/types/global';
import getAgent from '#src/server/utilities/getAgent';
import certsRequired from '#app/routes/utils/certsRequired';
import { FetchError } from '#app/models/types/fetch';
import getEnvironment from '#app/routes/utils/getEnvironment';
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
  pagePath: string;
  configType: 'navigation';
};

const fetchConfig = async <T>({
  service,
  pagePath,
  configType,
}: FetchConfigParams): Promise<T | null> => {
  // TODO: Remove this restriction once we're ready to roll out to all services
  const shouldFetchConfig = service === 'indonesia' && !isLive();

  if (!shouldFetchConfig) return Promise.resolve(null);

  const fetchUrl = new URL(process.env.BFF_PATH as string);
  fetchUrl.searchParams.set('service', service);
  fetchUrl.searchParams.set('config', configType);

  const bffReqPath = fetchUrl.toString();

  const cachedResponse = cache.get(bffReqPath);

  logger.debug(CONFIG_REQUEST_RECEIVED, {
    service,
    path: bffReqPath,
    cached: !!cachedResponse,
  });

  if (cachedResponse) return cachedResponse as T;

  const environment = getEnvironment(pagePath);
  const isLocal = !environment || environment === 'local';

  const agent = certsRequired(pagePath) ? await getAgent() : null;

  const fetchOptions = {
    ...(agent && { agent }),
    ...(!isLocal && { headers: { 'ctx-service-env': environment } }),
    signal: AbortSignal.timeout(PRIMARY_DATA_TIMEOUT),
  };

  try {
    const response = await fetch(bffReqPath, fetchOptions);

    if (response.ok) {
      const res = await response.json();
      cache.set(bffReqPath, res);
      return res as T;
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

    throw error;
  }
};

export default fetchConfig;
