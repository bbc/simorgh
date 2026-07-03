import uasApiRequest from '#app/lib/uasApi';
import {
  FAVOURITES_CONFIG,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
} from '#app/lib/uasApi/uasUtility';
import { ArticlePageData } from '../utilities/extractSaveArticleProps';
import upsertArticleData from './upsertArticleData';

jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility', () => {
  const actual = jest.requireActual('#app/lib/uasApi/uasUtility');
  return {
    ...actual,
    createFavouritesPayload: jest.fn(),
    extractPromoImageFromArticleData: jest.fn(),
    buildPromoImageUrl: jest.fn(),
  };
});

const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockCreateFavouritesPayload = createFavouritesPayload as jest.Mock;
const mockExtractPromoImageFromArticleData =
  extractPromoImageFromArticleData as jest.Mock;
const mockBuildPromoImageUrl = buildPromoImageUrl as jest.Mock;

describe('upsertArticleData', () => {
  const mockArticleId = 'c123456789o';
  const mockPromoImageUrl = 'https://ichef.bbc.co.uk/image.jpg';

  const mockArticlePageData = {
    contentBlocks: [
      {
        id: '597a9704',
        type: 'image',
        model: {
          blocks: [
            {
              id: 'd57733c1',
              type: 'caption',
              model: {
                blocks: [],
              },
            },
            {
              id: '8ffd8707',
              type: 'altText',
              model: {
                blocks: [
                  {
                    id: '7eab27b4',
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          id: '1739f732',
                          type: 'paragraph',
                          model: {
                            text: 'भारतीय पीएम नरेंद्र मोदी और नेपाल के पीएम बालेन शाह',
                            blocks: [
                              {
                                id: '7c37f3cd',
                                type: 'fragment',
                                model: {
                                  text: 'भारतीय पीएम नरेंद्र मोदी और नेपाल के पीएम बालेन शाह',
                                  attributes: [],
                                },
                                position: [2, 2, 1, 1, 1],
                              },
                            ],
                          },
                          position: [2, 2, 1, 1],
                        },
                      ],
                    },
                    position: [2, 2, 1],
                  },
                ],
              },
              position: [2, 2],
            },
            {
              id: 'ef95269f',
              type: 'rawImage',
              model: {
                width: 780,
                height: 439,
                locator: '688a/live/f8441af0-5e7a-11f1-ab70-cdbb605c4a31.jpg',
                originCode: 'cpsprodpb',
                copyrightHolder: 'Getty Images',
                suitableForSyndication: true,
              },
              position: [2, 3],
            },
          ],
        },
        position: [2],
      },
    ],
    promoImageBlocks: [],
    canonicalUrl: 'https://bbc.com/article',
  } as unknown as ArticlePageData;

  const mockPayload = {
    data: {
      attributes: {
        promoImage: mockPromoImageUrl,
      },
    },
  };

  const mockPromoImageObj = {
    path: '/image.jpg',
    altText: 'Test image',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockExtractPromoImageFromArticleData.mockReturnValue(mockPromoImageObj);
    mockBuildPromoImageUrl.mockReturnValue(mockPromoImageUrl);
    mockCreateFavouritesPayload.mockReturnValue(mockPayload);
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 200 });
  });

  it('creates payload with correct parameters', async () => {
    await upsertArticleData({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'portuguese',
      isRefreshAvailable: true,
    });

    expect(mockCreateFavouritesPayload).toHaveBeenCalledWith({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'portuguese',
    });
  });

  it('calls uasApiRequest with POST method and FAVOURITES_CONFIG', async () => {
    await upsertArticleData({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
      isRefreshAvailable: true,
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'POST',
      FAVOURITES_CONFIG.activityType,
      { body: mockPayload, isRefreshAvailable: true },
    );
  });

  it('handles API errors and propagates them', async () => {
    const error = new Error('API request failed');
    mockUasApiRequest.mockRejectedValue(error);

    await expect(
      upsertArticleData({
        articlePageData: mockArticlePageData,
        articleId: mockArticleId,
        service: 'hindi',
        isRefreshAvailable: true,
      }),
    ).rejects.toThrow('API request failed');
  });

  it('successfully saves new article (simulating create)', async () => {
    mockUasApiRequest.mockResolvedValue({
      ok: true,
      status: 201,
    });

    await upsertArticleData({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
      isRefreshAvailable: true,
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'POST',
      FAVOURITES_CONFIG.activityType,
      expect.any(Object),
    );
  });

  it('successfully updates existing article (simulating update)', async () => {
    mockUasApiRequest.mockResolvedValue({
      ok: true,
      status: 200,
    });

    await upsertArticleData({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
      isRefreshAvailable: true,
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'POST',
      FAVOURITES_CONFIG.activityType,
      expect.any(Object),
    );
  });
});
