import uasApiRequest from '#app/lib/uasApi';
import {
  FAVOURITES_CONFIG,
  createFavouritesPayload,
} from '#app/lib/uasApi/uasUtility';
import { SaveArticlePageData } from '../utilities/extractSaveArticleProps';
import upsertArticleData from './upsertArticleData';

jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility', () => {
  const actual = jest.requireActual('#app/lib/uasApi/uasUtility');
  return {
    ...actual,
    createFavouritesPayload: jest.fn(),
  };
});

const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockCreateFavouritesPayload = createFavouritesPayload as jest.Mock;

describe('upsertArticleData', () => {
  const mockArticleId = 'c123456789o';
  const mockPromoImageUrl = 'https://ichef.bbc.co.uk/image.jpg';

  const mockArticlePageData = {
    canonicalUrl: 'https://bbc.com/article',
  } as unknown as SaveArticlePageData;

  const mockPayload = {
    data: {
      attributes: {
        promoImage: mockPromoImageUrl,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateFavouritesPayload.mockReturnValue(mockPayload);
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 200 });
  });

  it('creates payload with correct parameters', async () => {
    await upsertArticleData({
      saveArticlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'portuguese',
      isRefreshAvailable: true,
    });

    expect(mockCreateFavouritesPayload).toHaveBeenCalledWith({
      saveArticlePageData: mockArticlePageData,
      articleId: mockArticleId,
      service: 'portuguese',
    });
  });

  it('calls uasApiRequest with POST method and FAVOURITES_CONFIG', async () => {
    await upsertArticleData({
      saveArticlePageData: mockArticlePageData,
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
        saveArticlePageData: mockArticlePageData,
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
      saveArticlePageData: mockArticlePageData,
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
      saveArticlePageData: mockArticlePageData,
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
