/*
 * Both functions will manipulate the data response to return
 * a fresh lastRecordTimestamp so that the mostRead component renders
 */

export const setStalePromoTimestamp = mostReadData => {
  const freshDate = new Date();

  const oldTimestamp = 864691200; // 27/05/1997
  const updatedMostReadData = mostReadData;

  // Updates the lastRecordTimeStamp value to be equal to the current date/time
  updatedMostReadData.lastRecordTimeStamp = freshDate;

  // set first promo to have an old timestamp
  updatedMostReadData.records[0].promo.timestamp = oldTimestamp;

  return updatedMostReadData;
};

export const setFreshPromoTimestamp = mostReadData => {
  const freshDate = new Date();
  const updatedMostReadData = mostReadData;

  // Updates the lastRecordTimeStamp value to be equal to the current date/time
  updatedMostReadData.lastRecordTimeStamp = freshDate;

  // Updates first 10 promos to have a fresh date
  for (let i = 0; i < 10; i += 1) {
    updatedMostReadData.records[i].promo.timestamp = freshDate.getTime();
  }

  return updatedMostReadData;
};
