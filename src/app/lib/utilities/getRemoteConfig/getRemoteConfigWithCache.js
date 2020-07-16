import Cache from 'lru-cache'; // make a note of why we would choose this and give alternatives.
import getRemoteConfig from '.';

const cacheMaxItems = 500; // can this library / is there an alternative that lets us limit the size of the cache too?
const cacheMaxAge = 60; // seconds - could make this different in dev vs production
const cache = new Cache({ max: cacheMaxItems, maxAge: cacheMaxAge * 1000 });

const getRemoteConfigWithCache = async service =>
  getRemoteConfig(service, cache);

export default getRemoteConfigWithCache;
