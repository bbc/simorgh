import serviceHasPageType from '.';

describe('serviceHasPageType', () => {
  it('should return true when a service has a page type', () => {
    expect(serviceHasPageType('afaanoromoo', 'frontPage')).toBe(true);
  });

  it('should return false when a service does not have a page type', () => {
    expect(serviceHasPageType('dummyService', 'frontPage')).toBe(false);
    expect(serviceHasPageType('dummyService', 'dummyPage')).toBe(false);
  });
});
