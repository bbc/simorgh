import { mostReadRecordIsFresh, shouldRenderLastUpdated } from '.';

describe('mostReadRecordIsFresh', () => {
  it('should return true if 35 minutes ago or less', () => {
    const currentTime = new Date();
    const thirtyFourMinutesAgo = new Date(Date.now() - 60 * 1000 * 34);
    expect(mostReadRecordIsFresh(currentTime.toUTCString())).toEqual(true);
    expect(mostReadRecordIsFresh(thirtyFourMinutesAgo.toUTCString())).toEqual(
      true,
    );
  });

  it('should return false if more than 35 minutes ago', () => {
    const thirtySixMinutesAgo = new Date(Date.now() - 60 * 1000 * 36);
    const oneDayAgo = new Date(Date.now() - 60 * 1000 * 60 * 24);
    expect(mostReadRecordIsFresh(thirtySixMinutesAgo.toUTCString())).toEqual(
      false,
    );
    expect(mostReadRecordIsFresh(oneDayAgo.toUTCString())).toEqual(false);
  });
});

describe('shouldRenderLastUpdated', () => {
  it('should return lastUpdated time if older than 60 days', () => {
    const sixtyOneDaysAgo = new Date(Date.now() - 61 * 24 * 60 * 60 * 1000);
    const hundredDaysAgo = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000);
    expect(shouldRenderLastUpdated(sixtyOneDaysAgo)).toEqual(sixtyOneDaysAgo);
    expect(shouldRenderLastUpdated(hundredDaysAgo)).toEqual(hundredDaysAgo);
  });

  it('should return null if less than 60 days old', () => {
    const currentTime = new Date();
    const fiftyNineDaysAgo = new Date(Date.now() - 59 * 24 * 60 * 60 * 1000);
    expect(shouldRenderLastUpdated(currentTime)).toEqual(null);
    expect(shouldRenderLastUpdated(fiftyNineDaysAgo)).toEqual(null);
  });
});
