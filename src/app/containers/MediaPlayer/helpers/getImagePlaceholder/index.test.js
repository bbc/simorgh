import getImagePlaceholder from '.';

describe('getImagePlaceholder', () => {
  describe('default image', () => {
    const defaultImage =
      'https://some.statichost.net/path/to/assets/images/media_placeholder.png';

    beforeEach(() => {
      process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
        'https://some.statichost.net';
      process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/path/to/assets/';
    });

    it('should be returned if no origin code', () => {
      const originCode = undefined;
      const locator = 'locator';
      expect(getImagePlaceholder(originCode, locator)).toBe(defaultImage);
    });

    it('should be returned if no locator', () => {
      const originCode = 'originCode';
      const locator = undefined;
      expect(getImagePlaceholder(originCode, locator)).toBe(defaultImage);
    });

    it('should be returned if no originCode or locator', () => {
      const originCode = undefined;
      const locator = undefined;
      expect(getImagePlaceholder(originCode, locator)).toBe(defaultImage);
    });
  });

  it('should return locator when origin code is pips', () => {
    const locator = 'urn:bbc:pips:pid:p054n8j6';
    const originCode = 'pips';
    expect(getImagePlaceholder(originCode, locator)).toBe(locator);
  });

  it('should return ichef image when origin code is mpv', () => {
    const locator = 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg';
    const originCode = 'mpv';
    expect(getImagePlaceholder(originCode, locator)).toBe(
      'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
    );
  });

  it('should return ichef image with default resolution when origin code is not mpv or pips', () => {
    const locator =
      '14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg';
    const originCode = 'cpsdevpb';
    expect(getImagePlaceholder(originCode, locator)).toBe(
      'https://ichef.bbci.co.uk/news/512/cpsdevpb/14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg',
    );
  });
});
