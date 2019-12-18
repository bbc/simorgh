import articleJson from '#data/news/articles/c0g992jmmkko.json';
import injectAds from './injectAds';

describe('injectAds rule', () => {
  it('should inject ads', () => {
    console.log('ARTICLE JSON', JSON.stringify(articleJson, null, 2));
    const actual = injectAds(articleJson);
    console.log('ACTUAL JSON', JSON.stringify(actual, null, 2));
    expect(actual).toBe(articleJson);
  });
});
