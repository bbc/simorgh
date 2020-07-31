import defaultToggles from '#lib/config/toggles';
import constructTogglesEndpoint from '#contexts/ToggleContext/utils/constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const logger = nodeLogger(__filename);

const getToggles = async (service, cache) => {
  const environment = process.env.SIMORGH_APP_ENV || 'local';
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
    const response = await fetch(url, { headers: { origin } });

    if (!response.ok) {
      throw new Error(
        `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
      );
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
    logger.error(CONFIG_FETCH_ERROR, { error: error.toString(), url, service });
    return localToggles;
  }
};

export default getToggles;
