export const mostReadRecordIsFresh = lastRecordTimeStamp => {
  const now = Date.now();
  const utcTimestamp = Date.parse(lastRecordTimeStamp);
  const mostReadLifeSpan = 35 * 60 * 1000; // 35 minutes
  return now - utcTimestamp <= mostReadLifeSpan;
};

const isMoreThan60Days = lastUpdated =>
  lastUpdated < Date.now() - 60 * 24 * 60 * 60 * 1000; // 60 days

export const shouldRenderLastUpdated = lastUpdated =>
  lastUpdated && isMoreThan60Days(lastUpdated) ? lastUpdated : null;
