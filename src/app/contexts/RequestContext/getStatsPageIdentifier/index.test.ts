import { PageTypes, Services } from '#app/models/types/global';
import { ARTICLE_PAGE, FRONT_PAGE } from '#app/routes/utils/pageTypes';
import getStatsPageIdentifier from '.';

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
      pageType: FRONT_PAGE,
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
        service: service as Services,
        pageType: pageType as PageTypes,
        id,
      });
      expect(statsPageIdentifier).toEqual(expected);
    });
  });
});
