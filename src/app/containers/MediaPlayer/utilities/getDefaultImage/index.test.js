import getDefaultImage from '.';

describe('getDefaultImage', () => {
  const defaultImage =
    'https://some.statichost.net/path/to/assets/images/media_placeholder.png';

  beforeEach(() => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'https://some.statichost.net';
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/path/to/assets/';
  });

  it('should return default image', () => {
    expect(getDefaultImage()).toBe(defaultImage);
  });
});
