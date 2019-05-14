import getStatsPageIdentifier from './getStatsPageIdentifier';

describe('getStatsPageIdentifier', () => {
  const testScenarios = [
    {
      service: 'news',
      pageType: 'article',
      expected: 'news.articles.c0000000000o.page',
      summary: 'should return for News Article',
    },
    {
      service: 'persian',
      pageType: 'article',
      expected: 'persian.articles.c0000000000o.page',
      summary: 'should return for WS Article',
    },
    {
      service: 'persian',
      pageType: 'frontpage',
      expected: 'persian.page',
      summary: 'should return for WS Front Page',
    },
    {
      service: 'news',
      pageType: null,
      expected: null,
      summary: 'should return null for News when null pageType',
    },
    {
      service: 'news',
      pageType: undefined,
      expected: null,
      summary: 'should return null for News when undefined pageType',
    },
  ];

  testScenarios.forEach(({ service, pageType, expected, summary }) => {
    it(summary, () => {
      const statsPageIdentifier = getStatsPageIdentifier(service, pageType);
      expect(statsPageIdentifier).toEqual(expected);
    });
  });
});
