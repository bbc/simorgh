import { LRUCache } from 'lru-cache';

import { IDCTA_FETCH_ERROR } from '#app/lib/logger.const';
import nodeLogger from '#app/lib/logger.node';
import type { IdctaConfig } from '#app/models/types/account';
import { getIdctaConfigUrl } from '../getIdctaBaseUrl';

const logger = nodeLogger(__filename);

const CACHE_MAX_ITEMS = 1;
const CACHE_TTL_SECONDS = 30; // 30 seconds

const cache = new LRUCache<string, IdctaConfig>({
  max: CACHE_MAX_ITEMS,
  ttl: CACHE_TTL_SECONDS * 1000,
});

/**
 * Fetches IDCTA config from the endpoint with caching
 * @returns IdctaConfig or null on error
 */
async function fetchIdctaConfig(): Promise<IdctaConfig | null> {
  const idctaConfigUrl = getIdctaConfigUrl();

  const cachedConfig = cache.get(idctaConfigUrl);
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch(idctaConfigUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const config = await response.json();

    cache.set(idctaConfigUrl, config);

    return config;
  } catch (error) {
    logger.error(IDCTA_FETCH_ERROR, {
      url: idctaConfigUrl,
      error,
    });
    return null;
  }
}

export default fetchIdctaConfig;
