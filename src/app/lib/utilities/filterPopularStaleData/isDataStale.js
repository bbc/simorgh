const MAXIMUM_STALE_DATA_TIME = 60 * 60 * 1000; // 60 minutes
const SHOULD_RENDER_LAST_UPDATED_TIME = 60 * 24 * 60 * 60 * 1000; // 60 days

// This is different from the timestamps under the MostReadLinks and is to do with preventing stale data
// caused by potential failed PopAPI updates.
export const isDataStale = formattedTimestamp => {
  // Note in storybook this value will be 'Friday, 9 August 2019 14:04:14 GMT'
  // Because of timemachine (simorgh/.storybook/time-machine.js)
  const now = Date.now();
  const utcTimestamp = new Date(formattedTimestamp);

  return now - utcTimestamp > MAXIMUM_STALE_DATA_TIME;
};

const isMoreThan60Days = unixTimestamp =>
  new Date(unixTimestamp) < Date.now() - SHOULD_RENDER_LAST_UPDATED_TIME;

export const shouldRenderLastUpdated = lastUpdated =>
  lastUpdated && isMoreThan60Days(lastUpdated);
