import Cache from 'lru-cache';
import getToggles from '.';

const CACHE_MAX_ITEMS_FALLBACK = 100;
const cacheMaxItems = parseInt(
  process.env.SIMORGH_CONFIG_CACHE_ITEMS || CACHE_MAX_ITEMS_FALLBACK,
  10,
);
const cacheMaxAge = parseInt(
  process.env.SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS,
  10,
);
const cache = new Cache({ max: cacheMaxItems, maxAge: cacheMaxAge * 1000 });

const withCache = async service => getToggles(service, cache);

export default withCache;
