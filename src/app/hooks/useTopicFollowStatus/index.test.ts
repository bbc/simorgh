import { use } from 'react';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import uasApiRequest from '#app/lib/uasApi';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { buildGlobalId, FOLLOWS_CONFIG } from '#app/lib/uasApi/uasUtility';
import { AccountContext } from '#app/contexts/AccountContext';
import useTopicFollowStatus from './index';

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
let mockQueryKey: readonly unknown[];
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
    queryKey: readonly unknown[];
    enabled: boolean;
  }) => {
    mockQueryFn = config.queryFn;
    mockQueryKey = config.queryKey;
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

describe('useTopicFollowStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseQueryReturn = {
      data: { isFollowed: false, metadata: undefined },
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

  it('returns follow status from query data', () => {
    mockUseQueryReturn.data = {
      isFollowed: true,
      metadata: { title: 'Climate change' },
    };

    const { result } = renderHook(() =>
      useTopicFollowStatus('urn:bbc:topic:climate-change'),
    );

    expect(result.current.isFollowed).toBe(true);
    expect(result.current.metadata).toEqual({ title: 'Climate change' });
    expect(result.current.error).toBeNull();
  });

  it('uses topic follow query key with user and topic id', () => {
    renderHook(() => useTopicFollowStatus('urn:bbc:topic:climate-change'));

    expect(mockQueryKey).toEqual(
      uasKeys.followStatus('user-123', 'urn:bbc:topic:climate-change'),
    );
  });

  it('calls UAS GET follows endpoint with built globalId', async () => {
    mockBuildGlobalId.mockReturnValue(
      'urn:bbc:world-service-news:topic:urn:bbc:topic:climate-change',
    );
    mockUasApiRequest.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ metaData: { title: 'Climate' } }),
    } as unknown as Response);

    renderHook(() => useTopicFollowStatus('urn:bbc:topic:climate-change'));
    await mockQueryFn();

    expect(mockBuildGlobalId).toHaveBeenCalledWith(
      'urn:bbc:topic:climate-change',
      FOLLOWS_CONFIG.resourceDomain,
      FOLLOWS_CONFIG.resourceType,
    );

    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'GET',
      FOLLOWS_CONFIG.activityType,
      {
        globalId:
          'urn:bbc:world-service-news:topic:urn:bbc:topic:climate-change',
        isRefreshAvailable: true,
      },
    );
  });

  it('returns not followed when UAS responds with 204', async () => {
    mockBuildGlobalId.mockReturnValue(
      'urn:bbc:world-service-news:topic:urn:bbc:topic:climate-change',
    );
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 204 } as Response);

    renderHook(() => useTopicFollowStatus('urn:bbc:topic:climate-change'));
    const response = await mockQueryFn();

    expect(response).toEqual({ isFollowed: false });
  });

  it('is disabled when topicId is missing', () => {
    renderHook(() => useTopicFollowStatus(''));

    expect(mockEnabled).toBe(false);
  });

  it('is disabled when hashed user id is missing', () => {
    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext)
        return {
          hashedUserId: '',
          isRefreshAvailable: false,
        };
      return {};
    });

    renderHook(() => useTopicFollowStatus('urn:bbc:topic:climate-change'));

    expect(mockEnabled).toBe(false);
  });

  it('returns query error state', () => {
    const queryError = new Error('Unable to fetch follow status');
    mockUseQueryReturn.error = queryError;

    const { result } = renderHook(() =>
      useTopicFollowStatus('urn:bbc:topic:climate-change'),
    );

    expect(result.current.error).toBe(queryError);
    expect(result.current.isFollowed).toBe(false);
  });
});
