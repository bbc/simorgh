import LRU from 'lru-cache';
import constructTogglesEndpoint from './constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import { CONFIG_FETCH_ERROR } from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const cacheOptions = { max: 500, maxAge: 100000 };
const cache = new LRU(cacheOptions);

const logger = nodeLogger(__filename);

const getRemoteConfig = async service => {
  const { origin } = getOriginContext();
  const url = constructTogglesEndpoint(service, origin);

  const cachedResponse = cache.get(url);

  console.log({ cachedResponse });

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(url, {
      headers: {
        origin,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
      );
    }

    const json = await response.json();
    cache.set(url, json);

    return json;
  } catch (error) {
    logger.error(CONFIG_FETCH_ERROR, {
      error: error.toString(),
    });
    return null;
  }
};

export default getRemoteConfig;
