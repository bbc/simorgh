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
import onClient from '#lib/utilities/onClient';
import getOriginContext from '#contexts/RequestContext/getOriginContext';
import getAgent from '#utilities/getAgent';
import { getEnvConfig } from '../getEnvConfig';

const logger = nodeLogger(__filename);
const NS_PER_SEC = 1e9;

const logResponseTime = async (url, headers, service, timeout) => {
  console.log('[getToggles] Fetching endpoint:', url);
  console.log('[getToggles] Request headers:', headers);

  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(Number.isFinite(timeout) ? timeout : 30000),
  });

  console.log(
    '[getToggles] Response status:',
    response.status,
    response.ok ? '(ok)' : '(error)',
  );

  if (onClient()) {
    return response;
  }

  logger.info(CONFIG_REQUEST_RECEIVED, { url, service });
  const startHrTime = process.hrtime();
  const elapsedHrTime = process.hrtime(startHrTime);
  logger.info(TOGGLE_API_RESPONSE_TIME, {
    nanoseconds: elapsedHrTime[0] * NS_PER_SEC + elapsedHrTime[1],
    url,
    service,
  });

  return response;
};

const getToggles = async ({ service, cache, isAmp = false }) => {
  const envConfig = getEnvConfig();
  const environment = envConfig.SIMORGH_APP_ENV || 'local';
  const timeout = parseInt(envConfig.SIMORGH_CONFIG_TIMEOUT_SECONDS, 10) * 1000;
  const localToggles = defaultToggles[environment];

  console.log('[getToggles] service:', service, '| environment:', environment);
  console.log(
    '[getToggles] enableFetchingToggles.enabled:',
    localToggles.enableFetchingToggles?.enabled,
  );

  if (!service) {
    console.log('[getToggles] No service provided, returning local toggles');
    return localToggles;
  }

  const { origin } = getOriginContext();
  const url = constructTogglesEndpoint(service, isAmp);

  const headers = {
    origin,
    ...{ 'ctx-service-env': 'test' },
  };

  console.log('[getToggles] Constructed endpoint URL:', url);
  console.log('[getToggles] Headers to be sent:', headers);

  // Initialise the undici agent (sets global TLS dispatcher with rejectUnauthorized:false).
  // Wrapped in try/catch as cert files may not be present on local dev machines.
  try {
    await getAgent();
    console.log('[getToggles] Agent initialised');
  } catch (agentError) {
    console.log(
      '[getToggles] Agent init failed (likely no certs on local):',
      agentError.message,
    );
  }

  const cachedResponse = cache && cache.get(url);

  if (cachedResponse === '') {
    logger.error(CONFIG_RESPONSE_EMPTY_ERROR, {
      url,
      service,
    });
  }

  if (cachedResponse) {
    console.log('[getToggles] Cache hit for:', url);
    return {
      ...localToggles,
      ...cachedResponse,
    };
  }

  try {
    const response = await logResponseTime(url, headers, service, timeout);

    if (!response.ok) {
      console.error('[getToggles] Fetch failed:', response.status, url);
      logger.error(CONFIG_FETCH_ERROR, {
        status: response.status,
        url,
        service,
      });

      return localToggles;
    }

    const responseBody = await response.json();
    console.log('[getToggles] Response body:', responseBody);
    const { toggles } = responseBody;
    console.log(
      '[getToggles] Successfully fetched toggles for:',
      service,
      '| toggles:',
      toggles,
    );
    if (cache) {
      cache.set(url, toggles);
    }

    return {
      ...localToggles,
      ...toggles,
    };
  } catch (error) {
    console.error(
      '[getToggles] Fetch threw error:',
      error.toString(),
      '| url:',
      url,
    );
    logger.error(CONFIG_ERROR, { error: error.toString(), url, service });
    return localToggles;
  }
};

export default getToggles;
