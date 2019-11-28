const MAXIMUM_STALE_DATA_TIME = 35 * 60 * 1000; // 35 minutes
const SHOULD_RENDER_LAST_UPDATED_TIME = 60 * 24 * 60 * 60 * 1000; // 60 days

/**
 * @param {string} formattedTimestamp A formatted timestamp (e.g. 2019-11-06T16:49:00Z )
 */
export const mostReadRecordIsFresh = formattedTimestamp => {
  const now = Date.now();
  const utcTimestamp = Date.parse(formattedTimestamp);
  return now - utcTimestamp <= MAXIMUM_STALE_DATA_TIME;
};

const isMoreThan60Days = unixTimestamp =>
  unixTimestamp < Date.now() - SHOULD_RENDER_LAST_UPDATED_TIME;

export const shouldRenderLastUpdated = lastUpdated =>
  lastUpdated && isMoreThan60Days(lastUpdated);
