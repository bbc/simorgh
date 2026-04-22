import getRecentActivity, { UasActivityItem } from './getRecentActivity';
import uasApiRequest from './index';

jest.mock('./index');
jest.mock('#lib/logger.node', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    error: jest.fn(),
  })),
}));

const mockUasApiRequest = uasApiRequest as jest.MockedFunction<
  typeof uasApiRequest
>;

const mockActivityResponse = {
  total: 5,
  pagination: {
    startIndex: 0,
    itemsPerPage: 10,
  },
  items: [
    {
      activityType: 'favourites',
      resourceId: 'article1',
      resourceType: 'article',
      resourceDomain: 'articles',
      created: '2026-02-15T18:30:05Z',
      action: 'favourited',
      metaData: {
        service: 'hindi',
        articleId: 'urn:bbc:ares::article:article1',
        title: 'Article Title 1',
      },
      '@id': 'urn:bbc:articles:article:article1',
    } as UasActivityItem,
    {
      activityType: 'favourites',
      resourceId: 'article2',
      resourceType: 'article',
      resourceDomain: 'articles',
      created: '2026-02-12T11:12:52Z',
      action: 'favourited',
      metaData: {
        service: 'Hindi',
        articleId: 'urn:bbc:ares::article:article2',
        title: 'Article Title 2',
      },
      '@id': 'urn:bbc:articles:article:article2',
    } as UasActivityItem,
  ],
};

describe('getRecentActivity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch recent activities and transform them into savedArticles', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockActivityResponse),
    } as unknown as Response);

    const result = await getRecentActivity({
      itemsPerPage: 10,
      startIndex: 0,
    });

    expect(result.savedArticles).toHaveLength(2);
    expect(result.savedArticles[0]).toEqual({
      id: 'article1',
      title: 'Article Title 1',
      link: '/hindi/articles/article1',
      promoImage: undefined,
      imageUrl: '',
      imageAlt: '',
      type: 'article',
      description: 'hindi',
    });
    expect(result.total).toBe(5);
    expect(result.startIndex).toBe(0);
  });

  it('should handle pagination with correct startIndex', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockActivityResponse),
    } as unknown as Response);

    await getRecentActivity({
      itemsPerPage: 10,
      startIndex: 10,
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'favourites', {
      queryParams: {
        startIndex: 10,
        items: 10,
        resourceDomain: 'articles',
        resourceType: 'article',
        action: 'favourited',
      },
      signal: undefined,
    });
  });

  it('should use default itemsPerPage if not provided', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockActivityResponse),
    } as unknown as Response);

    await getRecentActivity({});

    expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'favourites', {
      queryParams: {
        startIndex: 0,
        items: 10,
        resourceDomain: 'articles',
        resourceType: 'article',
        action: 'favourited',
      },
      signal: undefined,
    });
  });

  it('should handle empty response', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        total: 0,
        pagination: { startIndex: 0, itemsPerPage: 10 },
        items: [],
      }),
    } as unknown as Response);

    const result = await getRecentActivity({});

    expect(result.savedArticles).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it('should handle missing metaData gracefully', async () => {
    const responseWithMissingMetaData = {
      total: 1,
      pagination: { startIndex: 0, itemsPerPage: 10 },
      items: [
        {
          activityType: 'favourites',
          resourceId: 'article1',
          resourceType: 'article',
          resourceDomain: 'articles',
          created: '2026-02-15T18:30:05Z',
          action: 'favourited',
          metaData: {},
          '@id': 'urn:bbc:articles:article:article1',
        } as UasActivityItem,
      ],
    };

    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseWithMissingMetaData),
    } as unknown as Response);

    const result = await getRecentActivity({});

    expect(result.savedArticles[0].title).toBe('Untitled');
    expect(result.savedArticles[0].description).toBe('BBC');
  });

  it('should pass signal for abort control', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockActivityResponse),
    } as unknown as Response);

    const abortController = new AbortController();

    await getRecentActivity({
      signal: abortController.signal,
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'favourites', {
      queryParams: {
        startIndex: 0,
        items: 10,
        resourceDomain: 'articles',
        resourceType: 'article',
        action: 'favourited',
      },
      signal: abortController.signal,
    });
  });

  it('should throw error when API request fails', async () => {
    const error = new Error('API Error');
    mockUasApiRequest.mockRejectedValueOnce(error);

    await expect(getRecentActivity({})).rejects.toThrow('API Error');
  });
});
