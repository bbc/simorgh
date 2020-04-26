const {
  getPageTypes,
  getPathname,
  hasVariants,
  getVariants,
  getVariantPageTypes,
  getVariantPathname,
} = require('./utils');

jest.mock('../constants/services', () => ({
  persian: {
    frontPage: '/persian',
    articles: '/persian/articles/cej3lzd5e0go',
    liveRadio: '/persian/bbc_persian_radio/liveradio',
    mediaAssetPage: '/persian/iran-23231114',
    PGL: '/persian/magazine-49281981',
  },
  zhongwen: {
    variants: {
      simp: {
        frontPage: '/zhongwen/simp',
        articles: '/zhongwen/articles/c3xd4x9prgyo/simp',
      },
      trad: {
        frontPage: '/zhongwen/trad',
        articles: '/zhongwen/articles/c3xd4x9prgyo/trad',
        PGL: '/zhongwen/trad/chinese-news-49065935',
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
    const actual = getPathname('persian', 'PGL');
    const expected = '/persian/magazine-49281981';

    expect(actual).toEqual(expected);
  });
});

describe('hasVariants', () => {
  it('should return a boolean to reflect if a service has a variant', () => {
    expect(hasVariants('persian')).toEqual(false);
    expect(hasVariants('zhongwen')).toEqual(true);
  });
});

describe('getVariants', () => {
  it("should get a service's variants", () => {
    const actual = getVariants('zhongwen');
    const expected = ['simp', 'trad'];

    expect(actual).toEqual(expected);
  });
});

describe('getVariantPageTypes', () => {
  it("should get a service variant's page types", () => {
    const actual = getVariantPageTypes('zhongwen', 'simp');
    const expected = ['frontPage', 'articles'];

    expect(actual).toEqual(expected);
  });
});

describe('getVariantPathname', () => {
  it("should get a service variant's page type's pathname", () => {
    const actual = getVariantPathname('zhongwen', 'simp', 'articles');
    const expected = '/zhongwen/articles/c3xd4x9prgyo/simp';

    expect(actual).toEqual(expected);
  });
});
