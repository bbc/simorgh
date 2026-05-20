import { LRUCache } from 'lru-cache';

import { getEnvConfig } from '../getEnvConfig';
import getToggles from '.';

const cacheMaxItems = parseInt(
  getEnvConfig().SIMORGH_CONFIG_CACHE_ITEMS ?? 400,
  10,
);
const cacheTTL = parseInt(
  getEnvConfig().SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS ?? 300,
  10,
);
const cache = new LRUCache({ max: cacheMaxItems, ttl: cacheTTL * 1000 });

const withCache = async service => getToggles(service, cache);

export default withCache;
