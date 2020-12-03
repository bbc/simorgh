import getStatsPageIdentifier from '.';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

describe('getStatsPageIdentifier', () => {
  const testScenarios = [
    {
      service: 'news',
      pageType: ARTICLE_PAGE,
      id: 'c0000000000o',
      expected: 'news.articles.c0000000000o.page',
      summary: 'should return for News Article',
    },
    {
      service: 'persian',
      pageType: ARTICLE_PAGE,
      id: 'c0000000001o',
      expected: 'persian.articles.c0000000001o.page',
      summary: 'should return for WS Article',
    },
    {
      service: 'persian',
      pageType: 'frontPage',
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

  testScenarios.forEach(({ service, pageType, id, expected, summary }) => {
    it(summary, () => {
      const statsPageIdentifier = getStatsPageIdentifier({
        service,
        pageType,
        id,
      });
      expect(statsPageIdentifier).toEqual(expected);
    });
  });
});
