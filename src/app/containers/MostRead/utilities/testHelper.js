export const setFreshLastRecordTimestamp = mostReadData => {
  const freshDate = new Date();
  const freshMostReadData = mostReadData;
  freshMostReadData.lastRecordTimeStamp = freshDate;

  return freshMostReadData;
};

export const setOldPromoTimestamp = mostReadData => {
  const oldTimestamp = 864691200; // 27/05/1997
  const oldPromoMostReadData = mostReadData;

  oldPromoMostReadData.records[0].promo.timestamp = oldTimestamp;

  return oldPromoMostReadData;
};

export const setFreshPromoTimestamp = mostReadData => {
  const freshDate = new Date().getTime();
  const freshPromoMostReadData = mostReadData;

  for (let i = 0; i < 10; i += 1) {
    freshPromoMostReadData.records[i].promo.timestamp = freshDate;
  }

  return freshPromoMostReadData;
};
