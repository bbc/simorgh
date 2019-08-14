import embedUrl from './embedUrl';

describe('Media Player: Embed URL', () => {
  process.env.SIMORGH_AV_EMBED_BASE_URL = 'https://foobar.com';

  it('builds default URL', () => {
    const expectedUrl = 'https://foobar.com/baz/qux';
    const result = embedUrl('baz', 'qux');

    expect(result).toEqual(expectedUrl);
  });

  it('builds URL with AMP set to true', () => {
    const expectedUrl = 'https://foobar.com/baz/qux/amp';
    const result = embedUrl('baz', 'qux', true);

    expect(result).toEqual(expectedUrl);
  });
});
