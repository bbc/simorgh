import isLiveTVNavItem from './isLiveTVNavItem';

describe('isLiveTVNavItem', () => {
  it('returns true when navItemUrl matches liveTVChannelIdentifier', () => {
    expect(
      isLiveTVNavItem({
        navItemUrl: '/arabic/media-49522519',
        liveTVChannelIdentifier: '/arabic/media-49522519',
      }),
    ).toBe(true);
  });

  it('returns false when navItemUrl does not match liveTVChannelIdentifier', () => {
    expect(
      isLiveTVNavItem({
        navItemUrl: '/arabic/media-49522519',
        liveTVChannelIdentifier: '/arabic/media-12345678',
      }),
    ).toBe(false);
  });

  it('returns false when liveTVChannelIdentifier is falsy', () => {
    expect(
      isLiveTVNavItem({
        navItemUrl: '/arabic/media-49522519',
        liveTVChannelIdentifier: '',
      }),
    ).toBe(false);
    expect(
      isLiveTVNavItem({
        navItemUrl: '/arabic/media-49522519',
        liveTVChannelIdentifier: null,
      }),
    ).toBe(false);
    expect(
      isLiveTVNavItem({
        navItemUrl: '/arabic/media-49522519',
        liveTVChannelIdentifier: undefined,
      }),
    ).toBe(false);
  });

  it('returns false when navItemUrl is falsy', () => {
    expect(
      isLiveTVNavItem({
        navItemUrl: '',
        liveTVChannelIdentifier: '/arabic/media-49522519',
      }),
    ).toBe(false);
    expect(
      isLiveTVNavItem({
        navItemUrl: null,
        liveTVChannelIdentifier: '/arabic/media-49522519',
      }),
    ).toBe(false);
    expect(
      isLiveTVNavItem({
        navItemUrl: undefined,
        liveTVChannelIdentifier: '/arabic/media-49522519',
      }),
    ).toBe(false);
  });
});
