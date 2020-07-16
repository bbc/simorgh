import Cache from 'lru-cache'; // make a note of why we would choose this and give alternatives.
import constructTogglesEndpoint from '#contexts/ToggleContext/utils/constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const logger = nodeLogger(__filename);

const cacheMaxItems = 500; // can this library / is there an alternative that lets us limit the size of the cache too?
const cacheMaxAge = 60; // seconds - could make this different in dev vs production
const cache = new Cache({ max: cacheMaxItems, maxAge: cacheMaxAge * 1000 });

const getRemoteConfig = async service => {
  const { origin } = getOriginContext();
  const url = constructTogglesEndpoint(service, origin);

  const cachedResponse = cache.get(url); // returns undefined if no cache entry or if entry is stale

  if (cachedResponse) {
    // we could log that we are using a cached response, but it could be too noisy.
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
    cache.set(url, json);
    return json;
  } catch (error) {
    logger.error(CONFIG_FETCH_ERROR, { error: error.toString() });
    return null;
  }
};

export default getRemoteConfig;
