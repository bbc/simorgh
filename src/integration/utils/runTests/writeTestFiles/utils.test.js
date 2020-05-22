const { getPageTypes, getPathnames } = require('./utils');

jest.mock('../constants/services', () => ({
  persian: {
    frontPage: ['/persian'],
    articles: ['/persian/articles/cej3lzd5e0go'],
    liveRadio: ['/persian/bbc_persian_radio/liveradio'],
    mediaAssetPage: ['/persian/iran-23231114'],
    PGL: ['/persian/magazine-49281981'],
  },
  zhongwen: {
    variants: {
      simp: {
        frontPage: ['/zhongwen/simp'],
        articles: ['/zhongwen/articles/c3xd4x9prgyo/simp'],
      },
      trad: {
        frontPage: ['/zhongwen/trad'],
        articles: ['/zhongwen/articles/c3xd4x9prgyo/trad'],
        PGL: ['/zhongwen/trad/chinese-news-49065935'],
      },
    },
  },
}));

describe('getPageTypes', () => {
  it('should get the page types of a service', () => {
    const actual = getPageTypes('persian');
    const expected = [
      'frontPage',
      'articles',
      'liveRadio',
      'mediaAssetPage',
      'PGL',
    ];

    expect(actual).toEqual(expected);
  });
});

describe('getPathname', () => {
  it("should get the pathname of a service's page type", () => {
    const actual = getPathnames('persian', 'PGL');
    const expected = ['/persian/magazine-49281981'];

    expect(actual).toEqual(expected);
  });
});
