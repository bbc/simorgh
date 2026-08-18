import getSiteId from '.';

describe('getSiteId', () => {
  describe('default services', () => {
    it('should return the live siteId when env is live', () => {
      expect(getSiteId({ env: 'live', service: 'pidgin' })).toBe(598342);
    });

    it('should return the test siteId when env is test', () => {
      expect(getSiteId({ env: 'test', service: 'pidgin' })).toBe(598343);
    });

    it('should default to the test siteId when env is not provided', () => {
      // @ts-expect-error - invalid params
      expect(getSiteId({ service: 'pidgin' })).toBe(598343);
    });

    it('should default to the test siteId when env is null', () => {
      // @ts-expect-error - invalid params
      expect(getSiteId({ env: null, service: 'pidgin' })).toBe(598343);
    });
  });

  describe('japanese service', () => {
    it('should return the japanese live siteId when env is live', () => {
      expect(getSiteId({ env: 'live', service: 'japanese' })).toBe(646753);
    });

    it('should return the japanese test siteId when env is test', () => {
      expect(getSiteId({ env: 'test', service: 'japanese' })).toBe(598290);
    });
  });
});
