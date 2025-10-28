import defaultToggles from '#lib/config/toggles';
import constructTogglesEndpoint from '#contexts/ToggleContext/utils/constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import {
  CONFIG_REQUEST_RECEIVED,
  CONFIG_FETCH_ERROR,
  CONFIG_ERROR,
  TOGGLE_API_RESPONSE_TIME,
  CONFIG_RESPONSE_EMPTY_ERROR,
} from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';
import { getEnvConfig } from '../getEnvConfig';

const logger = nodeLogger(__filename);
const NS_PER_SEC = 1e9;

const logResponseTime = async (url, origin, service, timeout) => {
  const isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';

  if (isBrowser) {
    return fetch(url, { headers: { origin }, timeout });
  }

  logger.info(CONFIG_REQUEST_RECEIVED, { url, service });
  const startHrTime = process.hrtime();
  const response = await fetch(url, { headers: { origin }, timeout });
  const elapsedHrTime = process.hrtime(startHrTime);
  logger.info(TOGGLE_API_RESPONSE_TIME, {
    nanoseconds: elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1],
    url,
    service,
  });

  return response;
};

const getToggles = async (service, cache) => {
  const environment = getEnvConfig().SIMORGH_APP_ENV || 'local';
  const timeout =
    parseInt(getEnvConfig().SIMORGH_CONFIG_TIMEOUT_SECONDS, 10) * 1000;
  const localToggles = defaultToggles[environment];
  if (!localToggles.enableFetchingToggles.enabled) {
    return localToggles;
  }

  const { origin } = getOriginContext();
  const url = constructTogglesEndpoint(service, origin);

  const cachedResponse = cache && cache.get(url);

  if (cachedResponse === '') {
    logger.error(CONFIG_RESPONSE_EMPTY_ERROR, {
      url,
      service,
    });
  }

  if (cachedResponse) {
    return {
      ...localToggles,
      ...cachedResponse,
    };
  }

  try {
    const response = await logResponseTime(url, origin, service, timeout);

    if (!response.ok) {
      logger.error(CONFIG_FETCH_ERROR, {
        status: response.status,
        url,
        service,
      });

      return localToggles;
    }

    const { toggles } = await response.json();
    if (cache) {
      cache.set(url, toggles);
    }
    return {
      ...localToggles,
      ...toggles,
    };
  } catch (error) {
    logger.error(CONFIG_ERROR, { error: error.toString(), url, service });
    return localToggles;
  }
};

export default getToggles;
