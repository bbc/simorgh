import Cache from 'lru-cache';
import getRemoteConfig from '.';

const cacheMaxItems = parseInt(process.env.SIMORGH_CONFIG_CACHE_ITEMS, 10);
const cacheMaxAge = parseInt(
  process.env.SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS,
  10,
);
const cache = new Cache({ max: cacheMaxItems, maxAge: cacheMaxAge * 1000 });

const getRemoteConfigWithCache = async service =>
  getRemoteConfig(service, cache);

export default getRemoteConfigWithCache;
