import getLangOverride from '.';

describe('getLangOverride', () => {
  it('should return the name of a service lang override for a given page lang', () => {
    expect(getLangOverride('ru')).toEqual('ru-UA');
  });

  it('should return undefined if the given page lang does not have a service lang override', () => {
    expect(getLangOverride('uk')).toEqual(undefined);
    expect(getLangOverride(undefined)).toEqual(undefined);
  });
});
