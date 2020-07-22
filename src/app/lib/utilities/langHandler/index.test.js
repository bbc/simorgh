import getLangOverride from '.';

describe('getLangOverride', () => {
  it('should return the name of a service lang override for the given service and page lang combination', () => {
    expect(
      getLangOverride({
        service: 'ukrainian',
        pageLang: 'ru',
      }),
    ).toEqual('ru-UA');
  });

  it('should return undefined for the given service and page lang combination', () => {
    expect(
      getLangOverride({
        service: 'russian',
        pageLang: 'ru',
      }),
    ).toEqual(undefined);
    expect(
      getLangOverride({
        service: 'russian',
        pageLang: undefined,
      }),
    ).toEqual(undefined);
  });
});
