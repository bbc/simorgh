import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import { LRUCache } from 'lru-cache';
import { Services, Variants } from '#app/models/types/global';
import getAgent from '#src/server/utilities/getAgent';
import certsRequired from '#app/routes/utils/certsRequired';
import { FetchError } from '#app/models/types/fetch';
import getEnvironment from '#app/routes/utils/getEnvironment';
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import isLive from '#lib/utilities/isLive';
import { PRIMARY_DATA_TIMEOUT } from '../getFetchTimeouts';

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
  variant?: Variants;
};

const fetchConfig = async <T>({
  service,
  pagePath,
  configType,
  variant,
}: FetchConfigParams): Promise<T | null> => {
  const fetchUrl = new URL(process.env.BFF_PATH as string);
  fetchUrl.searchParams.set('service', service);
  fetchUrl.searchParams.set('config', configType);

  if (variant) {
    fetchUrl.searchParams.set('variant', variant);
  }

  // Only fetch new nav for Arabic and Tamil services on Local/Test
  if (SERVICES_WITH_NEW_NAV.includes(service) && !isLive()) {
    fetchUrl.searchParams.set('useNewNav', 'true');
  }

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
    // TODO: Temporary override to fetch from Test data for new navigation until it's ready in Live
    ...(fetchUrl.searchParams.get('useNewNav') === 'true' && {
      headers: { 'ctx-service-env': 'test' },
    }),
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
