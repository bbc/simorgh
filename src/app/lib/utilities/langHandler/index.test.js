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
        service: 'mundo',
        pageLang: 'es',
      }),
    ).toEqual(undefined);
    expect(
      getLangOverride({
        service: 'mundo',
        pageLang: undefined,
      }),
    ).toEqual(undefined);
  });
});
