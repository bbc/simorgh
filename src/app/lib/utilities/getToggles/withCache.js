import Cache from 'lru-cache';
import getToggles from '.';
import { getEnvConfig } from '../getEnvConfig';

const cacheMaxItems = parseInt(getEnvConfig().SIMORGH_CONFIG_CACHE_ITEMS, 10);
const cacheTTL = parseInt(
  getEnvConfig().SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS,
  10,
);
const cache = new Cache({ max: cacheMaxItems, ttl: cacheTTL * 1000 });

const withCache = async service => getToggles(service, cache);

export default withCache;
