import LRUCache from 'lru-cache';
import fetchPageData from './index.js';

const cacheMaxItems = parseInt(process.env.SIMORGH_CONFIG_CACHE_ITEMS, 10);
const cacheTTL = parseInt(process.env.SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS, 10);
const cache = new LRUCache({ max: cacheMaxItems, ttl: cacheTTL * 1000 });

const withCache = async ({path,
  timeout,
  shouldLogFetchTime,
  agent,
  optHeaders,
  ...loggerArgs}) => fetchPageData({path,
  timeout,
  shouldLogFetchTime,
  agent,
  optHeaders,
  cache,
  ...loggerArgs});

console.log('caache keys', cache.keys());
console.log('caache keys fetchPageData', withCache);

export default withCache;
