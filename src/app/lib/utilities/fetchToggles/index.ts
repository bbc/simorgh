import { LRUCache } from 'lru-cache';
import defaultToggles from '#lib/config/toggles';
import nodeLogger from '#lib/logger.node';
import {
  TOGGLE_API_REQUEST_RECEIVED,
  TOGGLE_API_FETCH_ERROR,
  TOGGLE_API_RESPONSE_TIME,
} from '#lib/logger.const';
import { Services, ToggleDefinition, Toggles } from '#app/models/types/global';
import { FetchError } from '#app/models/types/fetch';
import getAgent from '#utilities/getAgent';
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
  isAmp?: boolean;
};

const getMergedToggles = async ({
  service,
  isAmp,
}: TogglesParams): Promise<Toggles> => {
  const appEnvironment = getEnvConfig().SIMORGH_APP_ENV || 'local';
  const localToggles = defaultToggles[appEnvironment];

  if (!localToggles.enableFetchingToggles.enabled) {
    return localToggles;
  }

  let togglesEndpoint: string;

  try {
    togglesEndpoint = constructTogglesEndpoint({ service, isAmp });
  } catch (error) {
    logger.error(TOGGLE_API_FETCH_ERROR, {
      error: (error as Error).message,
      service,
    });

    return localToggles;
  }

  const isLocal = appEnvironment === 'local';
  const serviceEnv = isLocal
    ? process.env.TOGGLES_SERVICE_ENV || 'test'
    : appEnvironment;
  const cacheKey = `${togglesEndpoint}:${serviceEnv}`;

  if (isLocal) {
    // eslint-disable-next-line no-console
    console.info(
      `[dev:toggles] Fetching remote toggles for "${service}" from ${serviceEnv} iSite (${togglesEndpoint})`,
    );
  }

  const cachedResponse = isLocal ? undefined : cache.get(cacheKey);

  logger.info(TOGGLE_API_REQUEST_RECEIVED, {
    service,
    togglesEndpoint,
    cached: !!cachedResponse,
  });

  if (cachedResponse) {
    return { ...localToggles, ...cachedResponse };
  }

  try {
    const agent = isLocal ? null : await getAgent();

    const fetchOptions = {
      ...(agent && { agent }),
      headers: {
        'ctx-service-env': serviceEnv,
      },
      ...(!isLocal && { signal: AbortSignal.timeout(PRIMARY_DATA_TIMEOUT) }),
    };

    const startHrTime = process.hrtime();

    const response = await fetch(togglesEndpoint, fetchOptions);

    const elapsedHrTime = process.hrtime(startHrTime);
    logger.info(TOGGLE_API_RESPONSE_TIME, {
      nanoseconds: elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1],
      togglesEndpoint,
      service,
    });

    if (!response.ok) {
      const error = new Error() as FetchError;
      error.status = response.status;
      error.message = `Failed to fetch toggles for service: ${service}`;
      throw error;
    }

    const responseBody = await response.json();
    const fetchedToggles = responseBody?.data?.toggles;

    if (!fetchedToggles) {
      return localToggles;
    }

    if (!isLocal) {
      cache.set(cacheKey, fetchedToggles);
    }

    const mergedToggles = { ...localToggles, ...fetchedToggles };

    if (isLocal) {
      const notOverriddenToggles = Object.keys(localToggles).filter(
        toggleName => !(toggleName in fetchedToggles),
      );
      const { _environment, ...finalToggles } = mergedToggles;

      // eslint-disable-next-line no-console
      console.info('[dev:toggles] Final toggles:', finalToggles);
      // eslint-disable-next-line no-console
      console.info(
        `[dev:toggles] Local toggles NOT overridden by ${serviceEnv} iSite:\n${
          notOverriddenToggles.length ? notOverriddenToggles.join('\n') : 'none'
        }`,
      );
    }

    return mergedToggles;
  } catch (error) {
    const { message } = error as FetchError;

    logger.error(TOGGLE_API_FETCH_ERROR, {
      error: message,
      service,
    });

    if (isLocal) {
      // eslint-disable-next-line no-console
      console.warn(
        '[dev:toggles] Failed to fetch remote toggles for "%s" from %s iSite, falling back to local toggles:',
        service,
        serviceEnv,
        message,
      );
    }

    return localToggles;
  }
};

const fetchToggles = async (
  params: TogglesParams,
): Promise<Record<string, ToggleDefinition>> => {
  const { _environment, ...toggleDefinitions } = await getMergedToggles(params);

  return toggleDefinitions;
};

export default fetchToggles;
