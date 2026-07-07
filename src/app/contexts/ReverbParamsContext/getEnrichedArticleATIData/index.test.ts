import {
  CORRESPONDENT_STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import getEnrichedArticleATIData from '.';
import * as useOptimizelyVariation from '../../../hooks/useOptimizelyVariation';

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

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

describe('getEnrichedArticleATIData', () => {
  it('should return ATI data for the Article page', () => {
    const enrichedData = getEnrichedArticleATIData({
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
      pageTitle: "Adams Oshiomhole say 'I still be APC National Chairman'",
      producerId: null,
      producerName: 'PIDGIN',
      timePublished: '2020-03-04T18:58:43.000Z',
      timeUpdated: '2020-03-04T19:26:11.000Z',
    });
  });

  it('should include the brand name in the pageTitle for PGL pages', () => {
    const enrichedData = getEnrichedArticleATIData({
      pageMetadata: { ...pageMetadata, type: PHOTO_GALLERY_PAGE },
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
      pageTitle:
        "Adams Oshiomhole say 'I still be APC National Chairman' - Brand Name",
      producerId: null,
      producerName: 'PIDGIN',
      timePublished: '2020-03-04T18:58:43.000Z',
      timeUpdated: '2020-03-04T19:26:11.000Z',
    });
  });

  it('should include the brand name in the pageTitle for STY pages', () => {
    const enrichedData = getEnrichedArticleATIData({
      pageMetadata: { ...pageMetadata, type: STORY_PAGE },
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
      pageTitle:
        "Adams Oshiomhole say 'I still be APC National Chairman' - Brand Name",
      producerId: null,
      producerName: 'PIDGIN',
      timePublished: '2020-03-04T18:58:43.000Z',
      timeUpdated: '2020-03-04T19:26:11.000Z',
    });
  });

  it('should include the brand name in the pageTitle for CSP pages', () => {
    const enrichedData = getEnrichedArticleATIData({
      pageMetadata: { ...pageMetadata, type: CORRESPONDENT_STORY_PAGE },
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
      pageTitle:
        "Adams Oshiomhole say 'I still be APC National Chairman' - Brand Name",
      producerId: null,
      producerName: 'PIDGIN',
      timePublished: '2020-03-04T18:58:43.000Z',
      timeUpdated: '2020-03-04T19:26:11.000Z',
    });
  });

  it('should include experiment details when present', () => {
    jest
      .spyOn(useOptimizelyVariation, 'default')
      .mockImplementation(() => 'experimentVariant');

    const enrichedData = getEnrichedArticleATIData({
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
      experimentName: 'test_page_views_aa_3',
      experimentProps: {
        experimentName: 'test_page_views_aa_3',
        experimentVariant: 'experimentVariant',
        sendOptimizelyEvents: true,
      },
      experimentVariant: 'experimentVariant',
      language: 'pcm',
      ldpThingIds:
        '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
      ldpThingLabels: null,
      pageIdentifier: 'news::pidgin.news.story.51745682.page',
      pageTitle: "Adams Oshiomhole say 'I still be APC National Chairman'",
      producerId: null,
      producerName: 'PIDGIN',
      timePublished: '2020-03-04T18:58:43.000Z',
      timeUpdated: '2020-03-04T19:26:11.000Z',
    });
  });
});
