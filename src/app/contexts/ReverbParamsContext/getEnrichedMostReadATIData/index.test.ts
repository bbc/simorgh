import getEnrichedMostReadATIData from '.';

const pageMetadata = {
  atiAnalytics: {
    campaigns: [
      {
        campaignId: '5a988e3e39461b000e9dabfb',
        campaignName: 'WS - Keep me on trend',
      },
      {
        campaignId: '5a988e4739461b000e9dabfc',
        campaignName: 'WS - Update me',
      },
    ],
    categoryName: 'News',
    contentId: 'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
    contentType: 'article',
    language: 'pcm',
    ldpThingIds:
      '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
    ldpThingLabels: null,
    pageIdentifier: 'news::pidgin.news.story.51745682.page',
    pageTitle: "Adams Oshiomhole say 'I still be APC National Chairman'",
    producerId: null,
    timePublished: '2020-03-04T18:58:43.000Z',
    timeUpdated: '2020-03-04T19:26:11.000Z',
    producerName: 'PIDGIN',
  },
  type: 'article',
};

const serviceContext = {
  brandName: 'Brand Name',
  mostRead: { header: 'Header' },
};

describe('getEnrichedMostReadATIData', () => {
  it('should include the brand name in the pageTitle for Most Read pages', () => {
    const enrichedData = getEnrichedMostReadATIData({
      pageMetadata,
      serviceContext,
    });

    expect(enrichedData).toEqual({
      campaigns: [
        {
          campaignId: '5a988e3e39461b000e9dabfb',
          campaignName: 'WS - Keep me on trend',
        },
        {
          campaignId: '5a988e4739461b000e9dabfc',
          campaignName: 'WS - Update me',
        },
      ],
      categoryName: 'News',
      contentId: 'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
      contentType: 'article',
      language: 'pcm',
      ldpThingIds:
        '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
      ldpThingLabels: null,
      pageIdentifier: 'news::pidgin.news.story.51745682.page',
      pageTitle: 'Header - Brand Name',
      producerId: null,
      producerName: 'PIDGIN',
      timePublished: '2020-03-04T18:58:43.000Z',
      timeUpdated: '2020-03-04T19:26:11.000Z',
    });
  });
});
