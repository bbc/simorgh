import { isTenHoursAgoOrLess } from './helpers';

describe('ArticleTimestamp helper functions', () => {
  describe('isTenHoursAgoOrLess', () => {
    it('should return true if 10 hours ago or less', () => {
      const currentTime = Date.now();
      const threeHoursAgo = currentTime - 60 * 60 * 1000 * 3;
      const tenHoursAgo = currentTime - 60 * 60 * 1000 * 10;
      const buffer = 100; // allow 100 milliseconds computation time as Date.now() value is different by the time we call `isTenHoursAgoOrLess`
      expect(isTenHoursAgoOrLess(currentTime)).toEqual(true);
      expect(isTenHoursAgoOrLess(threeHoursAgo)).toEqual(true);
      expect(isTenHoursAgoOrLess(tenHoursAgo + buffer)).toEqual(true);
    });

    it('should return false if more than 10 hours ago', () => {
      const currentTime = Date.now();
      const tenHoursAgo = currentTime - 60 * 60 * 1000 * 10;
      const tenHoursAgoAndOneSecond = tenHoursAgo - 1000;
      expect(isTenHoursAgoOrLess(tenHoursAgoAndOneSecond)).toEqual(false);
    });
  });
});
