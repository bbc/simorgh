import serviceHasPageType from '.';

describe('serviceHasPageType', () => {
  it('should return true when a service has a page type', () => {
    expect(serviceHasPageType('frontPage', 'afaanoromoo')).toBe(true);
    expect(serviceHasPageType('frontPage')('afaanoromoo')).toBe(true);
  });

  it('should return false when a service does not have a page type', () => {
    expect(serviceHasPageType('frontPage', 'dummyService')).toBe(false);
    expect(serviceHasPageType('frontPage')('dummyService')).toBe(false);
    expect(serviceHasPageType('dummyPage', 'dummyService')).toBe(false);
    expect(serviceHasPageType('dummyPage')('dummyService')).toBe(false);
  });
});
