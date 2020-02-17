import path from 'ramda/src/path';
import memoizeWith from 'ramda/src/memoizeWith';

const getCacheKey = (id, lastUpdated) => `${id}-${lastUpdated}`;

export default (pathToId, pathToLastUpdated, processor) =>
  memoizeWith(json => {
    const id = path(pathToId, json);
    const lastUpdated = path(pathToLastUpdated, json);

    return getCacheKey(id, lastUpdated);
  }, processor);
