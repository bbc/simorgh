import uasApiRequest from '#app/lib/uasApi';
import {
  FAVOURITES_CONFIG,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
} from '#app/lib/uasApi/uasUtility';
import type { Article } from '#app/models/types/optimo';
import upsertArticleData from './upsertArticleData';

jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility');

const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockCreateFavouritesPayload = createFavouritesPayload as jest.Mock;
const mockExtractPromoImageFromArticleData =
  extractPromoImageFromArticleData as jest.Mock;
const mockBuildPromoImageUrl = buildPromoImageUrl as jest.Mock;

describe('upsertArticleData', () => {
  const mockArticleId = 'c123456789o';
  const mockPromoImageUrl = 'https://ichef.bbc.co.uk/image.jpg';

  const mockArticlePageData = {
    id: mockArticleId,
    metadata: {
      locators: {
        canonicalUrl: 'https://bbc.com/article',
      },
    },
    promo: {
      headlines: {
        seoHeadline: 'Test Article',
      },
      images: {
        defaultPromoImage: {
          path: '/image.jpg',
          altText: 'Test image',
        },
      },
    },
  } as unknown as Article;

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
      articleId: mockArticleId,
      service: 'portuguese',
      articleTitle: 'Test Article',
      promoImage: mockPromoImageUrl,
      promoImageAltText: 'Test image',
      locatorUrl: 'https://bbc.com/article',
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
