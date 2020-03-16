import getImagePlaceholderSrcSet from '.';

describe('getImagePlaceholderSrcSet', () => {
  describe('set of default images', () => {
    const defaultImageSet =
      'https://some.statichost.net/path/to/assets/images/media_placeholder.png 240w, https://some.statichost.net/path/to/assets/images/media_placeholder.png 320w, https://some.statichost.net/path/to/assets/images/media_placeholder.png 480w, https://some.statichost.net/path/to/assets/images/media_placeholder.png 624w, https://some.statichost.net/path/to/assets/images/media_placeholder.png 800w';

    beforeEach(() => {
      process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
        'https://some.statichost.net';
      process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/path/to/assets/';
    });

    it('should be returned if no origin code', () => {
      const originCode = undefined;
      const locator = 'locator';
      expect(getImagePlaceholderSrcSet({ originCode, locator })).toBe(
        defaultImageSet,
      );
    });

    it('should be returned if no locator', () => {
      const originCode = 'originCode';
      const locator = undefined;
      expect(getImagePlaceholderSrcSet({ originCode, locator })).toBe(
        defaultImageSet,
      );
    });
  });

  it('should return set of locators when origin code is pips', () => {
    const locator = 'urn:bbc:pips:pid:p054n8j6';
    const originCode = 'pips';
    expect(getImagePlaceholderSrcSet(originCode, locator)).toBe(
      'urn:bbc:pips:pid:p054n8j6 240w, urn:bbc:pips:pid:p054n8j6 320w, urn:bbc:pips:pid:p054n8j6 480w, urn:bbc:pips:pid:p054n8j6 624w, urn:bbc:pips:pid:p054n8j6 800w',
    );
  });

  it('should return set of ichef images when origin code is mpv', () => {
    const locator = 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg';
    const originCode = 'mpv';
    expect(getImagePlaceholderSrcSet(originCode, locator)).toBe(
      'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg 800w',
    );
  });

  it('should return set of ichef images when origin code is not mpv or pips', () => {
    const locator =
      '14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg';
    const originCode = 'cpsdevpb';
    expect(getImagePlaceholderSrcSet(originCode, locator)).toBe(
      'https://ichef.bbci.co.uk/news/240/cpsdevpb/14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg 320w, https://ichef.bbci.co.uk/news/480/cpsdevpb/14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg 480w, https://ichef.bbci.co.uk/news/624/cpsdevpb/14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg 624w, https://ichef.bbci.co.uk/news/800/cpsdevpb/14489/production/_101218038_91c17269-57b8-44dc-b123-64fb93bde785.jpg 800w',
    );
  });
});
