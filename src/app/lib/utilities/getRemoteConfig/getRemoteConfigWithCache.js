import Cache from 'lru-cache'; // make a note of why we would choose this and give alternatives.
import getRemoteConfig from '.';

const cacheMaxItems = process.env.SIMORGH_CONFIG_CACHE_ITEMS; // can this library / is there an alternative that lets us limit the size of the cache too?
const cacheMaxAge = process.env.SIMORGH_CONFIG_CACHE_MAX_AGE; // seconds - could make this different in dev vs production
const cache = new Cache({ max: cacheMaxItems, maxAge: cacheMaxAge * 1000 });

const getRemoteConfigWithCache = async service =>
  getRemoteConfig(service, cache);

export default getRemoteConfigWithCache;
