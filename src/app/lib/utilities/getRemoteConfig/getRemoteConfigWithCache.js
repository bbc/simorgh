import Cache from 'lru-cache'; // make a note of why we would choose this and give alternatives.
import getRemoteConfig from '.';

const cacheMaxItems = parseInt(process.env.SIMORGH_CONFIG_CACHE_ITEMS, 10); // can this library / is there an alternative that lets us limit the size of the cache too?
const cacheMaxAge = parseInt(process.env.SIMORGH_CONFIG_CACHE_MAX_AGE, 10); // seconds - could make this different in dev vs production
const cache = new Cache({ max: cacheMaxItems, maxAge: cacheMaxAge * 1000 });

const getRemoteConfigWithCache = async service =>
  getRemoteConfig(service, cache);

export default getRemoteConfigWithCache;
