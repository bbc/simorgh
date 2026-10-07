import getFollowedTopics, { UasFollowItem } from './getFollowedTopics';
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

const mockFollowsResponse = {
  total: 2,
  pagination: {
    startIndex: 0,
    itemsPerPage: 10,
  },
  items: [
    {
      activityType: 'follows',
      resourceId: 'topic1',
      resourceType: 'topic',
      resourceDomain: 'world-service-news',
      created: '2026-02-15T18:30:05Z',
      action: 'followed',
      metaData: {
        service: 'hindi',
        topicId: 'topic1',
        title: 'Topic Title 1',
      },
      '@id': 'urn:bbc:world-service-news:topic:topic1',
    } as UasFollowItem,
    {
      activityType: 'follows',
      resourceId: 'topic2',
      resourceType: 'topic',
      resourceDomain: 'world-service-news',
      created: '2026-02-12T11:12:52Z',
      action: 'followed',
      metaData: {
        service: 'Hindi',
        topicId: 'topic2',
        title: 'Topic Title 2',
      },
      '@id': 'urn:bbc:world-service-news:topic:topic2',
    } as UasFollowItem,
  ],
};

describe('getFollowedTopics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch follows and transform them into followedTopics', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFollowsResponse),
    } as unknown as Response);

    const result = await getFollowedTopics({
      itemsPerPage: 10,
      startIndex: 0,
      isRefreshAvailable: false,
    });

    expect(result.followedTopics).toHaveLength(2);
    expect(result.followedTopics[0]).toEqual({
      id: 'topic1',
      title: 'Topic Title 1',
      service: 'hindi',
    });
    expect(result.total).toBe(2);
    expect(result.startIndex).toBe(0);
  });

  it('should request the follows activity type with the correct query params', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFollowsResponse),
    } as unknown as Response);

    await getFollowedTopics({
      itemsPerPage: 20,
      startIndex: 10,
      isRefreshAvailable: true,
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'follows', {
      queryParams: {
        startIndex: 10,
        items: 20,
        resourceDomain: 'world-service-news',
        resourceType: 'topic',
        action: 'followed',
      },
      signal: undefined,
      isRefreshAvailable: true,
    });
  });

  it('should use default itemsPerPage and startIndex if not provided', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFollowsResponse),
    } as unknown as Response);

    await getFollowedTopics({ isRefreshAvailable: false });

    expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'follows', {
      queryParams: {
        startIndex: 0,
        items: 10,
        resourceDomain: 'world-service-news',
        resourceType: 'topic',
        action: 'followed',
      },
      signal: undefined,
      isRefreshAvailable: false,
    });
  });

  it('should handle an empty response', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        total: 0,
        pagination: { startIndex: 0, itemsPerPage: 10 },
        items: [],
      }),
    } as unknown as Response);

    const result = await getFollowedTopics({ isRefreshAvailable: false });

    expect(result.followedTopics).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it('should exclude items with no metaData field', async () => {
    const responseWithMissingMetaData = {
      total: 1,
      pagination: { startIndex: 0, itemsPerPage: 10 },
      items: [
        {
          activityType: 'follows',
          resourceId: 'topic1',
          resourceType: 'topic',
          resourceDomain: 'world-service-news',
          created: '2026-07-01T11:43:21Z',
          action: 'followed',
          '@id': 'urn:bbc:world-service-news:topic:topic1',
        } as UasFollowItem,
      ],
    };

    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseWithMissingMetaData),
    } as unknown as Response);

    const result = await getFollowedTopics({ isRefreshAvailable: false });

    expect(result.followedTopics).toHaveLength(0);
  });

  it('should exclude items with metaData but no title', async () => {
    const responseWithNoTitle = {
      total: 1,
      pagination: { startIndex: 0, itemsPerPage: 10 },
      items: [
        {
          activityType: 'follows',
          resourceId: 'topic1',
          resourceType: 'topic',
          resourceDomain: 'world-service-news',
          created: '2026-07-01T11:43:21Z',
          action: 'followed',
          metaData: { service: 'hindi', topicId: 'topic1' },
          '@id': 'urn:bbc:world-service-news:topic:topic1',
        } as UasFollowItem,
      ],
    };

    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseWithNoTitle),
    } as unknown as Response);

    const result = await getFollowedTopics({ isRefreshAvailable: false });

    expect(result.followedTopics).toHaveLength(0);
  });

  it('should keep items with valid metaData alongside excluded items', async () => {
    const mixedResponse = {
      total: 2,
      pagination: { startIndex: 0, itemsPerPage: 10 },
      items: [
        {
          activityType: 'follows',
          resourceId: 'topic-no-metadata',
          resourceType: 'topic',
          resourceDomain: 'world-service-news',
          created: '2026-07-01T11:43:21Z',
          action: 'followed',
          '@id': 'urn:bbc:world-service-news:topic:topic-no-metadata',
        } as UasFollowItem,
        {
          activityType: 'follows',
          resourceId: 'topic-with-metadata',
          resourceType: 'topic',
          resourceDomain: 'world-service-news',
          created: '2026-06-30T12:18:08Z',
          action: 'followed',
          metaData: {
            service: 'hindi',
            topicId: 'topic-with-metadata',
            title: 'Valid Topic',
          },
          '@id': 'urn:bbc:world-service-news:topic:topic-with-metadata',
        } as UasFollowItem,
      ],
    };

    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mixedResponse),
    } as unknown as Response);

    const result = await getFollowedTopics({ isRefreshAvailable: false });

    expect(result.followedTopics).toHaveLength(1);
    expect(result.followedTopics[0].id).toBe('topic-with-metadata');
  });

  it('should fall back to request params and defaults when the response shape is malformed', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({}),
    } as unknown as Response);

    const result = await getFollowedTopics({
      itemsPerPage: 15,
      startIndex: 5,
      isRefreshAvailable: false,
    });

    expect(result).toEqual({
      followedTopics: [],
      total: 0,
      itemsPerPage: 15,
      startIndex: 5,
    });
  });

  it('should fall back to defaults when the response body is null', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(null),
    } as unknown as Response);

    const result = await getFollowedTopics({
      itemsPerPage: 15,
      startIndex: 5,
      isRefreshAvailable: false,
    });

    expect(result).toEqual({
      followedTopics: [],
      total: 0,
      itemsPerPage: 15,
      startIndex: 5,
    });
  });

  it('should fall back to an empty list when items is null', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        total: 0,
        pagination: { startIndex: 0, itemsPerPage: 10 },
        items: null,
      }),
    } as unknown as Response);

    const result = await getFollowedTopics({ isRefreshAvailable: false });

    expect(result.followedTopics).toHaveLength(0);
  });

  it('should fall back to an empty list when items is not an array', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        total: 0,
        pagination: { startIndex: 0, itemsPerPage: 10 },
        items: 'not-an-array',
      }),
    } as unknown as Response);

    const result = await getFollowedTopics({ isRefreshAvailable: false });

    expect(result.followedTopics).toHaveLength(0);
  });

  it('should only include topics followed under the current service', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFollowsResponse),
    } as unknown as Response);

    const result = await getFollowedTopics({
      isRefreshAvailable: false,
      service: 'hindi',
    });

    expect(result.followedTopics.map(topic => topic.id)).toEqual([
      'topic1',
      'topic2',
    ]);
  });

  it('should exclude topics followed under a different service', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFollowsResponse),
    } as unknown as Response);

    const result = await getFollowedTopics({
      isRefreshAvailable: false,
      service: 'urdu',
    });

    expect(result.followedTopics).toHaveLength(0);
  });

  it('should report total as the filtered count, not the raw UAS total', async () => {
    const responseWithMixedServices = {
      total: 3,
      pagination: { startIndex: 0, itemsPerPage: 10 },
      items: [
        ...mockFollowsResponse.items,
        {
          activityType: 'follows',
          resourceId: 'topic3',
          resourceType: 'topic',
          resourceDomain: 'world-service-news',
          created: '2026-02-10T09:00:00Z',
          action: 'followed',
          metaData: {
            service: 'urdu',
            topicId: 'topic3',
            title: 'Topic Title 3',
          },
          '@id': 'urn:bbc:world-service-news:topic:topic3',
        } as UasFollowItem,
      ],
    };

    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseWithMixedServices),
    } as unknown as Response);

    const result = await getFollowedTopics({
      isRefreshAvailable: false,
      service: 'hindi',
    });

    expect(result.followedTopics).toHaveLength(2);
    expect(result.total).toBe(2);
  });

  it('should pass signal for abort control', async () => {
    mockUasApiRequest.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFollowsResponse),
    } as unknown as Response);

    const abortController = new AbortController();

    await getFollowedTopics({
      isRefreshAvailable: false,
      signal: abortController.signal,
    });

    expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'follows', {
      queryParams: {
        startIndex: 0,
        items: 10,
        resourceDomain: 'world-service-news',
        resourceType: 'topic',
        action: 'followed',
      },
      signal: abortController.signal,
      isRefreshAvailable: false,
    });
  });

  it('should throw error when API request fails', async () => {
    const error = new Error('API Error');
    mockUasApiRequest.mockRejectedValueOnce(error);

    await expect(
      getFollowedTopics({ isRefreshAvailable: false }),
    ).rejects.toThrow('API Error');
  });
});
