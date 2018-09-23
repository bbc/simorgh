import isServer from './isServer';

describe('isServer', () => {
  describe('on server', () => {
    it('should return true', () => {
      expect(isServer()).toEqual(true);
    });
  });

  describe('not on server', () => {
    beforeEach(() => {
      global.process = jest.fn().mockReturnValue(undefined);
    });

    afterEach(() => {
      jest.resetModules();
    });

    it('should return false', () => {
      expect(isServer()).toEqual(false);
    });
  });
});
