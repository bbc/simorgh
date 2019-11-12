const mostReadRecordIsFresh = lastRecordTimeStamp => {
  const now = Date.now();
  const utcTimestamp = Date.parse(lastRecordTimeStamp);
  const mostReadLifeSpan = 35 * 60 * 1000; // 35 minutes
  return now - utcTimestamp <= mostReadLifeSpan;
};

export default mostReadRecordIsFresh;
