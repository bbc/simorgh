import { getImage, hasMapping } from '../badges-map.js';

describe('get image', () => {
  test.each(['badge', 'flag'])(
    'returns fallback if URN or ID is not mapped, use placeholder fallback is true and placeholder fallback type is "%s"',
    placeholderFallbackType => {
      const src = getImage({
        id: 'urn:bbc:sportsdata:blitzball:team:super-team',
        usePlaceholderFallback: true,
        placeholderFallbackType
      });

      expect(src).not.toBeUndefined();
    }
  );

  test('returns undefined if URN or ID is not mapped and use placeholder fallback is falsy', () => {
    expect(getImage({ id: 'invalid-mapping' })).toBeUndefined();
    expect(getImage({ id: 'invalid-mapping', usePlaceholderFallback: null })).toBeUndefined();
    expect(getImage({ id: 'invalid-mapping', usePlaceholderFallback: false })).toBeUndefined();
  });

  test('throws error when invalid fallback type given', () => {
    const placeholderFallbackType = 'invalid-fallback-type';

    expect(() => getImage({ id: 'some-unmapped-id', usePlaceholderFallback: true, placeholderFallbackType })).toThrow(
      new Error(`Invalid placeholder fallback type '${placeholderFallbackType}'`)
    );
  });
});

describe('has mapping', () => {
  test('returns true if a given is has a mapping', () => {
    expect(hasMapping('urn:bbc:sportsdata:football:team:chelsea')).toBe(true);
  });

  test('returns false if a given is has a mapping', () => {
    expect(hasMapping('invalid-mapping')).toBe(false);
  });
});
