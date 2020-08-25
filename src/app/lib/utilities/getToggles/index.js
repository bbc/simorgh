import defaultToggles from '#lib/config/toggles';
import constructTogglesEndpoint from '#contexts/ToggleContext/utils/constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import {
  CONFIG_REQUEST_RECEIVED,
  CONFIG_FETCH_ERROR,
  CONFIG_ERROR,
} from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const logger = nodeLogger(__filename);

const getToggles = async (service, cache) => {
  const environment = process.env.SIMORGH_APP_ENV || 'local';
  const timeout =
    parseInt(process.env.SIMORGH_CONFIG_TIMEOUT_SECONDS, 10) * 1000;
  const localToggles = defaultToggles[environment];
  if (!localToggles.enableFetchingToggles.enabled) {
    return localToggles;
  }

  const { origin } = getOriginContext();
  const url = constructTogglesEndpoint(service, origin);

  const cachedResponse = cache && cache.get(url);
  if (cachedResponse) {
    return {
      ...localToggles,
      ...cachedResponse,
    };
  }

  try {
    logger.info(CONFIG_REQUEST_RECEIVED, { url, service });
    const response = await fetch(url, { headers: { origin }, timeout });

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
