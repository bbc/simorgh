import mostReadRecordIsFresh from '.';

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
