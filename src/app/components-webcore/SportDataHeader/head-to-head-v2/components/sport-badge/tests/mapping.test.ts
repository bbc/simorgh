import type { BadgePlaceholderFallbackType } from '../../../types';
import { getImage, hasMapping } from '../badges-map';

describe('get image', () => {
  test.each<BadgePlaceholderFallbackType>(['badge', 'flag'])(
    'returns fallback if URN or ID is not mapped, use placeholder fallback is true and placeholder fallback type is "%s"',
    placeholderFallbackType => {
      const src = getImage({
        id: 'urn:bbc:sportsdata:blitzball:team:super-team',
        usePlaceholderFallback: true,
        placeholderFallbackType,
      });

      expect(src).not.toBeUndefined();
    },
  );

  test('returns undefined if URN or ID is not mapped and use placeholder fallback is falsy', () => {
    expect(
      getImage({ id: 'invalid-mapping', usePlaceholderFallback: false }),
    ).toBeNull();
    expect(
      getImage({ id: 'invalid-mapping', usePlaceholderFallback: false }),
    ).toBeNull();
  });

  test('throws error when invalid fallback type given', () => {
    const placeholderFallbackType = 'invalid-fallback-type';

    expect(() =>
      getImage({
        id: 'some-unmapped-id',
        usePlaceholderFallback: true,
        placeholderFallbackType:
          placeholderFallbackType as BadgePlaceholderFallbackType,
      }),
    ).toThrow(
      new Error(
        `Invalid placeholder fallback type '${placeholderFallbackType}'`,
      ),
    );
  });
});

describe('has mapping', () => {
  // mapping logic might be removed since URLS should should provided
  test.skip('returns true if a given is has a mapping', () => {
    expect(hasMapping('urn:bbc:sportsdata:football:team:chelsea')).toBe(true);
  });

  test('returns false if a given is has a mapping', () => {
    expect(hasMapping('invalid-mapping')).toBe(false);
  });
});
