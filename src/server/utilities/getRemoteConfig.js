import Cache from 'lru-cache';
import constructTogglesEndpoint from './constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const logger = nodeLogger(__filename);

const cacheMaxItems = 500;
const cacheMaxAge = 60; // seconds - could make this different in dev vs production

const cacheOptions = { max: cacheMaxItems, maxAge: cacheMaxAge * 1000 };
const cache = new Cache(cacheOptions);

const getRemoteConfig = async service => {
  const { origin } = getOriginContext();
  const url = constructTogglesEndpoint(service, origin);

  const cachedResponse = cache.get(url);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    logger.info(CONFIG_REQUEST_RECEIVED, { url });
    const response = await fetch(url, { headers: { origin } });

    if (!response.ok) {
      throw new Error(
        `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
      );
    }

    const json = await response.json();
    cache.set(url, json);
    return json;
  } catch (error) {
    logger.error(CONFIG_FETCH_ERROR, { error: error.toString() });
    return null;
  }
};

export default getRemoteConfig;
