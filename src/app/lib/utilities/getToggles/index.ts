import { LRUCache } from 'lru-cache';
import defaultToggles from '#lib/config/toggles';
import nodeLogger from '#lib/logger.node';
import {
  TOGGLE_API_REQUEST_RECEIVED,
  TOGGLE_API_FETCH_ERROR,
  TOGGLE_API_RESPONSE_TIME,
} from '#lib/logger.const';
import { Services, Toggles } from '#app/models/types/global';
import { FetchError } from '#app/models/types/fetch';
import getAgent from '#utilities/getAgent';
import getEnvironment from '#app/routes/utils/getEnvironment';
import getOriginContext from '#contexts/RequestContext/getOriginContext';
import constructTogglesEndpoint from '#contexts/ToggleContext/utils/constructTogglesEndpoint';
import { getEnvConfig } from '../getEnvConfig';
import { PRIMARY_DATA_TIMEOUT } from '../getFetchTimeouts';

const logger = nodeLogger(__filename);

const NS_PER_SEC = 1e9;

const cacheMaxItems = parseInt(
  String(getEnvConfig().SIMORGH_CONFIG_CACHE_ITEMS ?? 400),
  10,
);

const cacheTtlSeconds = parseInt(
  String(getEnvConfig().SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS ?? 300),
  10,
);

const cache = new LRUCache<string, Toggles>({
  max: cacheMaxItems,
  ttl: cacheTtlSeconds * 1000,
});

type TogglesParams = {
  service: Services;
  pagePath: string;
  isAmp?: boolean;
  overrideEndpoint?: string;
};

const fetchToggles = async ({
  service,
  pagePath,
  isAmp,
  overrideEndpoint,
}: TogglesParams): Promise<Toggles> => {
  const togglesEndpoint = constructTogglesEndpoint({
    service,
    overrideEndpoint,
    isAmp,
  });

  const detectedEnvironment = getEnvironment(pagePath);
  const isLocal = !detectedEnvironment || detectedEnvironment === 'local';
  const environment = isLocal ? 'test' : detectedEnvironment;
  const cacheKey = `${togglesEndpoint}:${environment}`;

  const cachedResponse = cache.get(cacheKey);

  logger.info(TOGGLE_API_REQUEST_RECEIVED, {
    service,
    togglesEndpoint,
    cached: !!cachedResponse,
  });

  if (cachedResponse) {
    return cachedResponse;
  }

  let agent: Awaited<ReturnType<typeof getAgent>> | null = null;
  try {
    agent = await getAgent();
  } catch (agentError) {
    logger.debug(TOGGLE_API_REQUEST_RECEIVED, {
      service,
      message: (agentError as Error).message,
    });
  }

  const { origin } = getOriginContext(null);

  const fetchOptions = {
    ...(agent && { agent }),
    headers: {
      origin,
      'ctx-service-env': environment,
    },
    signal: AbortSignal.timeout(PRIMARY_DATA_TIMEOUT),
  };

  const canDetermineFetchTime = typeof process?.hrtime === 'function';
  const startHrTime = canDetermineFetchTime ? process.hrtime() : [0, 0];

  const response = await fetch(togglesEndpoint, fetchOptions);

  if (canDetermineFetchTime) {
    const elapsedHrTime = process.hrtime(startHrTime as [number, number]);
    logger.debug(TOGGLE_API_RESPONSE_TIME, {
      service,
      togglesEndpoint,
      status: response.status,
      nanoseconds: elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1],
    });
  }

  if (!response.ok) {
    const error = new Error() as FetchError;
    error.status = response.status;
    error.message = `Failed to fetch toggles for service: ${service}`;
    throw error;
  }

  const responseBody = await response.json();
  const toggles = responseBody?.toggles ?? responseBody?.data?.toggles;

  if (!toggles) {
    const error = new Error() as FetchError;
    error.status = response.status;
    error.message = `Invalid toggles response for service: ${service}`;
    throw error;
  }

  cache.set(cacheKey, toggles);
  return toggles;
};

const getToggles = async ({
  service,
  pagePath,
  isAmp,
  overrideEndpoint,
}: TogglesParams): Promise<Toggles> => {
  const environment = getEnvConfig().SIMORGH_APP_ENV || 'local';
  const localToggles = defaultToggles[environment];

  if (!localToggles.enableFetchingToggles.enabled) {
    return localToggles;
  }

  try {
    const remoteToggles = await fetchToggles({
      service,
      pagePath,
      overrideEndpoint,
      isAmp,
    });

    return {
      ...localToggles,
      ...remoteToggles,
    };
  } catch (error) {
    const { message } = error as FetchError;

    logger.error(TOGGLE_API_FETCH_ERROR, {
      error: message,
      service,
    });

    return localToggles;
  }
};

export default getToggles;
