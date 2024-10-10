import { LRUCache } from 'lru-cache';
import fetchPageData from '.';

const cacheMaxItems = 400;
const cacheTTL = 300;
const cache = new LRUCache({ max: cacheMaxItems, ttl: cacheTTL * 1000 });

const withCache = async ({
  path,
  timeout,
  shouldLogFetchTime,
  agent,
  optHeaders,
  ...loggerArgs
}) =>
  fetchPageData({
    path,
    timeout,
    shouldLogFetchTime,
    agent,
    optHeaders,
    cache,
    ...loggerArgs,
  });

export default withCache;
