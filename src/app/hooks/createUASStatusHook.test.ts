import { use } from 'react';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId } from '#app/lib/uasApi/uasUtility';
import { AccountContext } from '#app/contexts/AccountContext';
import useUASStatusHook, { UASStatusField } from './createUASStatusHook';

jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility', () => {
  const actual = jest.requireActual('#app/lib/uasApi/uasUtility');
  return {
    ...actual,
    buildGlobalId: jest.fn(),
  };
});
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

let mockQueryFn: () => Promise<Record<string, unknown>>;
let mockEnabled: boolean | undefined;
let mockUseQueryReturn: {
  data: Record<string, unknown> | undefined;
  isLoading: boolean;
  error: Error | null;
} = {
  data: undefined,
  isLoading: false,
  error: null,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: (config: {
    queryFn: () => Promise<Record<string, unknown>>;
    enabled: boolean;
  }) => {
    mockQueryFn = config.queryFn;
    mockEnabled = config.enabled;
    return mockUseQueryReturn;
  },
}));

const mockUasApiRequest = uasApiRequest as jest.MockedFunction<
  typeof uasApiRequest
>;
const mockBuildGlobalId = buildGlobalId as jest.MockedFunction<
  typeof buildGlobalId
>;

describe('useUASStatusHook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQueryReturn = {
      data: undefined,
      isLoading: false,
      error: null,
    };

    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) {
        return {
          hashedUserId: 'user-123',
          isRefreshAvailable: true,
        };
      }

      return {};
    });
  });

  describe('followed topics context', () => {
    it('returns isFollowed and metadata from query data', () => {
      mockUseQueryReturn.data = {
        isFollowed: true,
        metadata: { title: 'Climate' },
      };

      const { result } = renderHook(() =>
        useUASStatusHook({
          resourceId: 'topic-1',
          config: {
            activityType: 'follows',
            resourceDomain: 'world-service-news',
            resourceType: 'topic',
          },
          queryKeyFn: (hashedUserId, topicId) => ['uas', hashedUserId, topicId],
          statusField: UASStatusField.FOLLOWED,
          enabledFn: (topicId, hashedUserId) => !!topicId && !!hashedUserId,
        }),
      );

      expect(result.current.isFollowed).toBe(true);
      expect(result.current.metadata).toEqual({ title: 'Climate' });
      expect(result.current.error).toBeNull();
    });

    it('defaults to isFollowed = false when query has no data', () => {
      const { result } = renderHook(() =>
        useUASStatusHook({
          resourceId: 'topic-1',
          config: {
            activityType: 'follows',
            resourceDomain: 'world-service-news',
            resourceType: 'topic',
          },
          queryKeyFn: (hashedUserId, topicId) => ['uas', hashedUserId, topicId],
          statusField: UASStatusField.FOLLOWED,
          enabledFn: (topicId, hashedUserId) => !!topicId && !!hashedUserId,
        }),
      );

      expect(result.current.isFollowed).toBe(false);
      expect(result.current.metadata).toBeUndefined();
    });

    it('calls UAS GET request with built globalId and refresh flag', async () => {
      mockBuildGlobalId.mockReturnValue(
        'urn:bbc:world-service-news:topic:topic-1',
      );
      mockUasApiRequest.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ metaData: { title: 'Climate' } }),
      } as unknown as Response);

      renderHook(() =>
        useUASStatusHook({
          resourceId: 'topic-1',
          config: {
            activityType: 'follows',
            resourceDomain: 'world-service-news',
            resourceType: 'topic',
          },
          queryKeyFn: (hashedUserId, topicId) => ['uas', hashedUserId, topicId],
          statusField: UASStatusField.FOLLOWED,
          enabledFn: (topicId, hashedUserId) => !!topicId && !!hashedUserId,
        }),
      );
      await mockQueryFn();

      expect(mockBuildGlobalId).toHaveBeenCalledWith(
        'topic-1',
        'world-service-news',
        'topic',
      );
      expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'follows', {
        globalId: 'urn:bbc:world-service-news:topic:topic-1',
        isRefreshAvailable: true,
      });
    });

    it('returns not followed when UAS responds with 204', async () => {
      mockBuildGlobalId.mockReturnValue(
        'urn:bbc:world-service-news:topic:topic-1',
      );
      mockUasApiRequest.mockResolvedValue({
        ok: true,
        status: 204,
      } as Response);

      renderHook(() =>
        useUASStatusHook({
          resourceId: 'topic-1',
          config: {
            activityType: 'follows',
            resourceDomain: 'world-service-news',
            resourceType: 'topic',
          },
          queryKeyFn: (hashedUserId, topicId) => ['uas', hashedUserId, topicId],
          statusField: UASStatusField.FOLLOWED,
          enabledFn: (topicId, hashedUserId) => !!topicId && !!hashedUserId,
        }),
      );
      const response = await mockQueryFn();

      expect(response).toEqual({ isFollowed: false });
    });

    it('returns isFollowed with undefined metadata when JSON parsing fails', async () => {
      mockBuildGlobalId.mockReturnValue(
        'urn:bbc:world-service-news:topic:topic-1',
      );
      mockUasApiRequest.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as unknown as Response);

      renderHook(() =>
        useUASStatusHook({
          resourceId: 'topic-1',
          config: {
            activityType: 'follows',
            resourceDomain: 'world-service-news',
            resourceType: 'topic',
          },
          queryKeyFn: (hashedUserId, topicId) => ['uas', hashedUserId, topicId],
          statusField: UASStatusField.FOLLOWED,
          enabledFn: (topicId, hashedUserId) => !!topicId && !!hashedUserId,
        }),
      );
      const response = await mockQueryFn();

      expect(response).toEqual({
        isFollowed: true,
        metadata: undefined,
      });
    });

    it('uses disabled query when hashedUserId is missing', () => {
      (use as jest.Mock).mockImplementation((context: unknown) => {
        if (context === AccountContext)
          return { hashedUserId: '', isRefreshAvailable: false };
        return {};
      });

      renderHook(() =>
        useUASStatusHook({
          resourceId: 'topic-1',
          config: {
            activityType: 'follows',
            resourceDomain: 'world-service-news',
            resourceType: 'topic',
          },
          queryKeyFn: (hashedUserId, topicId) => ['uas', hashedUserId, topicId],
          statusField: UASStatusField.FOLLOWED,
          enabledFn: (topicId, hashedUserId) => !!topicId && !!hashedUserId,
        }),
      );

      expect(mockEnabled).toBe(false);
    });

    it('returns error from query state', () => {
      const queryError = new Error('UAS failed');
      mockUseQueryReturn.error = queryError;

      const { result } = renderHook(() =>
        useUASStatusHook({
          resourceId: 'topic-1',
          config: {
            activityType: 'follows',
            resourceDomain: 'world-service-news',
            resourceType: 'topic',
          },
          queryKeyFn: (hashedUserId, topicId) => ['uas', hashedUserId, topicId],
          statusField: UASStatusField.FOLLOWED,
          enabledFn: (topicId, hashedUserId) => !!topicId && !!hashedUserId,
        }),
      );

      expect(result.current.error).toBe(queryError);
      expect(result.current.isFollowed).toBe(false);
    });
  });

  describe('saved article context', () => {
    it('returns isSaved from query data when using saved-article config', () => {
      mockUseQueryReturn.data = {
        isSaved: true,
        metadata: { title: 'Saved story' },
      };

      const { result } = renderHook(() =>
        useUASStatusHook({
          resourceId: 'article-123',
          config: {
            activityType: 'favourites',
            resourceDomain: 'world-service-news',
            resourceType: 'article',
          },
          queryKeyFn: (hashedUserId, articleId) => [
            'uas',
            hashedUserId,
            articleId,
          ],
          statusField: UASStatusField.SAVED,
          enabledFn: articleId => !!articleId,
        }),
      );

      expect(result.current.isSaved).toBe(true);
      expect(result.current.metadata).toEqual({ title: 'Saved story' });
      expect(result.current.error).toBeNull();
    });

    it('calls UAS favourites endpoint with article globalId', async () => {
      mockBuildGlobalId.mockReturnValue(
        'urn:bbc:world-service-news:article:article-123',
      );
      mockUasApiRequest.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue({ metaData: { title: 'Saved story' } }),
      } as unknown as Response);

      renderHook(() =>
        useUASStatusHook({
          resourceId: 'article-123',
          config: {
            activityType: 'favourites',
            resourceDomain: 'world-service-news',
            resourceType: 'article',
          },
          queryKeyFn: (hashedUserId, articleId) => [
            'uas',
            hashedUserId,
            articleId,
          ],
          statusField: UASStatusField.SAVED,
          enabledFn: articleId => !!articleId,
        }),
      );
      await mockQueryFn();

      expect(mockBuildGlobalId).toHaveBeenCalledWith(
        'article-123',
        'world-service-news',
        'article',
      );
      expect(mockUasApiRequest).toHaveBeenCalledWith('GET', 'favourites', {
        globalId: 'urn:bbc:world-service-news:article:article-123',
        isRefreshAvailable: true,
      });
    });

    it('uses enabledFn when provided', () => {
      renderHook(() =>
        useUASStatusHook({
          resourceId: 'article-1',
          config: {
            activityType: 'favourites',
            resourceDomain: 'world-service-news',
            resourceType: 'article',
          },
          queryKeyFn: (hashedUserId, articleId) => [
            'uas',
            hashedUserId,
            articleId,
          ],
          statusField: UASStatusField.SAVED,
          enabledFn: articleId => !!articleId,
        }),
      );
      expect(mockEnabled).toBe(true);

      renderHook(() =>
        useUASStatusHook({
          resourceId: '',
          config: {
            activityType: 'favourites',
            resourceDomain: 'world-service-news',
            resourceType: 'article',
          },
          queryKeyFn: (hashedUserId, articleId) => [
            'uas',
            hashedUserId,
            articleId,
          ],
          statusField: UASStatusField.SAVED,
          enabledFn: articleId => !!articleId,
        }),
      );
      expect(mockEnabled).toBe(false);
    });
  });
});
