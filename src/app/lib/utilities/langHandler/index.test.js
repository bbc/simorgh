import getLangOverride from '.';

describe('getLangOverride', () => {
  it('should return variant if pathname is correct', () => {
    expect(
      getLangOverride({ pathname: '/ukrainian/ukraine_in_russian' }),
    ).toEqual('ru-UA');
    expect(
      getLangOverride({ pathname: '/ukrainian/ukraine_in_russian.amp' }),
    ).toEqual('ru-UA');
  });

  it('should return null if pathname is incorrect', () => {
    expect(getLangOverride({ pathname: '/ukrainian/not_russian' })).toEqual(
      null,
    );
  });
});
