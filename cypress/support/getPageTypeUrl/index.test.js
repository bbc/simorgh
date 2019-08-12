import { getFrontPageUrl, getArticleUrl, getLiveRadioUrl } from '.';

describe('getFrontPageUrl', () => {
  it('should return the front page url', () => {
    expect(getFrontPageUrl('afaanoromoo')).toBe('/afaanoromoo');
  });
});

describe('getArticleUrl', () => {
  it('should return article page url', () => {
    expect(getArticleUrl('afaanoromoo')).toBe(
      '/afaanoromoo/articles/c4g19kgl85ko',
    );
  });
});

describe('getLiveRadioUrl', () => {
  it('should return the live radio page url', () => {
    expect(getLiveRadioUrl('afaanoromoo')).toBe(
      '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
    );
  });
});
