import { LRUCache } from 'lru-cache';
import getToggles from '.';
import { getEnvConfig } from '../getEnvConfig';

const cacheMaxItems = parseInt(
  getEnvConfig().SIMORGH_CONFIG_CACHE_ITEMS ?? 400,
  10,
);
const cacheTTL = parseInt(
  getEnvConfig().SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS ?? 300,
  10,
);
const cache = new LRUCache({ max: cacheMaxItems, ttl: cacheTTL * 1000 });

/**
 * @param {{ service: string, isAmp?: boolean }} params
 */
const withCache = async ({ service, isAmp = false }) => {
  const simorghToggles = await getToggles({ service, cache });

  if (!isAmp) {
    return simorghToggles;
  }

  const ampToggles = await getToggles({ service, cache, isAmp: true });

  return { ...simorghToggles, ...ampToggles };
};

export default withCache;
