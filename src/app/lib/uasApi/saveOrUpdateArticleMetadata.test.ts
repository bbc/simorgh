import uasApiRequest from '#app/lib/uasApi';
import {
  FAVOURITES_CONFIG,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
} from '#app/lib/uasApi/uasUtility';
import type { Article } from '#app/models/types/optimo';
import saveOrUpdateArticleMetadata from './saveOrUpdateArticleMetadata';

jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility');

const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockCreateFavouritesPayload = createFavouritesPayload as jest.Mock;
const mockExtractPromoImageFromArticleData =
  extractPromoImageFromArticleData as jest.Mock;
const mockBuildPromoImageUrl = buildPromoImageUrl as jest.Mock;

describe('saveOrUpdateArticleMetadata', () => {
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

  it('extracts promo image from articlePageData', async () => {
    await saveOrUpdateArticleMetadata({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
    });

    expect(mockExtractPromoImageFromArticleData).toHaveBeenCalledWith(
      mockArticlePageData,
    );
  });

  it('builds promo image URL from extracted image object', async () => {
    await saveOrUpdateArticleMetadata({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
    });

    expect(mockBuildPromoImageUrl).toHaveBeenCalledWith(mockPromoImageObj);
  });

  it('creates payload with correct parameters', async () => {
    await saveOrUpdateArticleMetadata({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'portuguese',
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
    await saveOrUpdateArticleMetadata({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'POST',
      FAVOURITES_CONFIG.activityType,
      { body: mockPayload },
    );
  });

  it('handles missing article metadata gracefully', async () => {
    const minimalArticleData = {
      id: mockArticleId,
      metadata: {},
      promo: {
        headlines: {},
        images: {},
      },
    } as unknown as Article;

    mockExtractPromoImageFromArticleData.mockReturnValue(null);
    mockBuildPromoImageUrl.mockReturnValue('');

    await saveOrUpdateArticleMetadata({
      articlePageData: minimalArticleData,
      articleId: mockArticleId,
      service: 'hindi',
    });

    expect(mockUasApiRequest).toHaveBeenCalled();
  });

  it('handles API errors and propagates them', async () => {
    const error = new Error('API request failed');
    mockUasApiRequest.mockRejectedValue(error);

    await expect(
      saveOrUpdateArticleMetadata({
        articlePageData: mockArticlePageData,
        articleId: mockArticleId,
        service: 'hindi',
      }),
    ).rejects.toThrow('API request failed');
  });

  it('passes correct service to createFavouritesPayload', async () => {
    const service = 'portuguese';
    mockExtractPromoImageFromArticleData.mockReturnValue(mockPromoImageObj);
    mockBuildPromoImageUrl.mockReturnValue(mockPromoImageUrl);
    mockCreateFavouritesPayload.mockReturnValue(mockPayload);
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 200 });

    await saveOrUpdateArticleMetadata({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service,
    });

    expect(mockCreateFavouritesPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        service,
      }),
    );
  });

  it('successfully saves new article (simulating create)', async () => {
    mockUasApiRequest.mockResolvedValue({
      ok: true,
      status: 201,
    });

    await saveOrUpdateArticleMetadata({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
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

    await saveOrUpdateArticleMetadata({
      articlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'hindi',
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'POST',
      FAVOURITES_CONFIG.activityType,
      expect.any(Object),
    );
  });
});
