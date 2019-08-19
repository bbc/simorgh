import serviceHasPageType from '.';

describe('hasFrontPage', () => {
  it('should return true when a service has a front page', () => {
    expect(serviceHasPageType('frontPage', 'afaanoromoo')).toBe(true);
    expect(
      expect(serviceHasPageType('frontPage')('afaanoromoo')).toBe(true),
    ).toBe(true);
  });

  it('should return false when a service does not have a front page', () => {
    expect(serviceHasPageType('frontPage', 'dummyService')).toBe(false);
    expect(serviceHasPageType('frontPage')('dummyService')).toBe(false);
    expect(serviceHasPageType('dummyPage', 'dummyService')).toBe(false);
    expect(serviceHasPageType('dummyPage')('dummyService')).toBe(false);
  });
});
