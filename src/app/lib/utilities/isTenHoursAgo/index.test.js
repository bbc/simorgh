import isTenHoursAgo from '.';

describe('isTenHoursAgo', () => {
  it('should return true if 10 hours ago or less', () => {
    const currentTime = Date.now();
    const threeHoursAgo = currentTime - 60 * 60 * 1000 * 3;
    const tenHoursAgo = currentTime - 60 * 60 * 1000 * 10;
    const buffer = 100; // allow 100 milliseconds computation time as Date.now() value is different by the time we call `isTenHoursAgoOrLess`
    expect(isTenHoursAgo(currentTime)).toEqual(true);
    expect(isTenHoursAgo(threeHoursAgo)).toEqual(true);
    expect(isTenHoursAgo(tenHoursAgo + buffer)).toEqual(true);
  });

  it('should return false if more than 10 hours ago', () => {
    const currentTime = Date.now();
    const tenHoursAgo = currentTime - 60 * 60 * 1000 * 10;
    const tenHoursAgoAndOneSecond = tenHoursAgo - 1000;
    expect(isTenHoursAgo(tenHoursAgoAndOneSecond)).toEqual(false);
  });
});
