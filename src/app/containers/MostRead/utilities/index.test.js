import { mostReadRecordIsFresh, shouldRenderLastUpdated } from '.';

const epochTimeNow = Date.now();
const currentTime = new Date();

const calcTimestampMinutesAgo = minutes =>
  new Date(epochTimeNow - 60 * 1000 * minutes).toUTCString();

const calcTimestampDaysAgo = days =>
  new Date(epochTimeNow - 24 * 60 * 60 * 1000 * days);

describe('mostReadRecordIsFresh', () => {
  it('should return true if 35 minutes ago or less', () => {
    expect(mostReadRecordIsFresh(currentTime.toUTCString())).toEqual(true);
    expect(mostReadRecordIsFresh(calcTimestampMinutesAgo(34))).toEqual(true);
  });

  it('should return false if more than 35 minutes ago', () => {
    expect(mostReadRecordIsFresh(calcTimestampMinutesAgo(36))).toEqual(false);
    expect(mostReadRecordIsFresh(calcTimestampDaysAgo(1))).toEqual(false);
  });
});

describe('shouldRenderLastUpdated', () => {
  it('should return lastUpdated time if older than 60 days', () => {
    expect(shouldRenderLastUpdated(calcTimestampDaysAgo(61))).toEqual(true);
    expect(shouldRenderLastUpdated(calcTimestampDaysAgo(100))).toEqual(true);
  });

  it('should return null if less than 60 days old', () => {
    expect(shouldRenderLastUpdated(currentTime)).toEqual(false);
    expect(shouldRenderLastUpdated(calcTimestampDaysAgo(59))).toEqual(false);
  });
});
