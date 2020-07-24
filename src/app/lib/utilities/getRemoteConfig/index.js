import toggles from '#lib/config/toggles';
import constructTogglesEndpoint from '#contexts/ToggleContext/utils/constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const logger = nodeLogger(__filename);

const getRemoteConfig = async (service, cache) => {
  const environment = process.env.SIMORGH_APP_ENV || 'local';
  const localToggles = toggles[environment];
  if (!localToggles.enableFetchingToggles.enabled) {
    return null;
  }

  const { origin } = getOriginContext();
  const url = constructTogglesEndpoint(service, origin);

  const cachedResponse = cache && cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    logger.info(CONFIG_REQUEST_RECEIVED, { url, service });
    const response = await fetch(url, { headers: { origin } });

    if (!response.ok) {
      throw new Error(
        `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
      );
    }

    const json = await response.json();
    if (cache) {
      cache.set(url, json);
    }
    return json;
  } catch (error) {
    logger.error(CONFIG_FETCH_ERROR, { error: error.toString(), url, service });
    return null;
  }
};

export default getRemoteConfig;
