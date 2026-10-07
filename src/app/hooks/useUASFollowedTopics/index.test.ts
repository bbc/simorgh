import { use } from 'react';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import getFollowedTopics, {
  FollowedTopicsData,
} from '#app/lib/uasApi/getFollowedTopics';
import type { FollowedTopic } from '#app/lib/uasApi/getFollowedTopics';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useUASFollowedTopics from '.';

jest.mock('#app/lib/uasApi/getFollowedTopics');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockTrackError = jest.fn();
jest.mock('../useErrorTracking', () => ({
  __esModule: true,
  default: () => mockTrackError,
}));

let mockQueryFn: (opts: { signal: AbortSignal }) => Promise<FollowedTopicsData>;
let mockQueryKey: readonly unknown[];
let mockEnabled: boolean | undefined;
let mockUseQueryReturn: {
  data: FollowedTopicsData | undefined;
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
    queryFn: (opts: { signal: AbortSignal }) => Promise<FollowedTopicsData>;
    queryKey: readonly unknown[];
    enabled: boolean;
  }) => {
    mockQueryFn = config.queryFn;
    mockQueryKey = config.queryKey;
    mockEnabled = config.enabled;
    return mockUseQueryReturn;
  },
}));

const mockGetFollowedTopics = getFollowedTopics as jest.MockedFunction<
  typeof getFollowedTopics
>;

const mockFollowedTopics: FollowedTopic[] = [
  { id: 'topic-1', title: 'Topic One', service: 'hindi' },
  { id: 'topic-2', title: 'Topic Two', service: 'hindi' },
];

describe('useUASFollowedTopics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQueryReturn = { data: undefined, isLoading: false, error: null };

    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) return { hashedUserId: 'user-123' };
      return {};
    });
  });

  describe('data fetching', () => {
    it('should return followed topics and total from query data', () => {
      mockUseQueryReturn.data = {
        followedTopics: mockFollowedTopics,
        total: 2,
        itemsPerPage: 10,
        startIndex: 0,
      };

      const { result } = renderHook(() => useUASFollowedTopics());

      expect(result.current.followedTopics).toEqual(mockFollowedTopics);
      expect(result.current.total).toBe(2);
      expect(result.current.error).toBeNull();
    });

    it('should pass custom itemsPerPage and startIndex to getFollowedTopics', async () => {
      renderHook(() =>
        useUASFollowedTopics({
          itemsPerPage: 20,
          startIndex: 10,
        }),
      );

      await mockQueryFn({ signal: new AbortController().signal });

      expect(mockGetFollowedTopics).toHaveBeenCalledWith(
        expect.objectContaining({
          itemsPerPage: 20,
          startIndex: 10,
        }),
      );
    });

    it('should return empty defaults when query has no data', () => {
      const { result } = renderHook(() => useUASFollowedTopics());

      expect(result.current.followedTopics).toEqual([]);
      expect(result.current.total).toBe(0);
      expect(result.current.error).toBeNull();
    });
  });

  it('should return the error from the query', () => {
    const error = new Error('Network error');
    mockUseQueryReturn.error = error;

    const { result } = renderHook(() => useUASFollowedTopics());

    expect(result.current.error).toBe(error);
    expect(result.current.followedTopics).toEqual([]);
  });

  it('should track a followed-topics error when the query fails', () => {
    const error = new Error('Some error');
    mockUseQueryReturn.error = error;

    renderHook(() => useUASFollowedTopics());

    expect(mockTrackError).toHaveBeenCalledWith({
      error,
      feature: 'uas',
      action: 'followed-topics',
    });
  });

  it('should not track an error when the query succeeds', () => {
    mockUseQueryReturn.data = {
      followedTopics: mockFollowedTopics,
      total: 2,
      itemsPerPage: 10,
      startIndex: 0,
    };

    renderHook(() => useUASFollowedTopics());

    expect(mockTrackError).not.toHaveBeenCalled();
  });

  it('should be disabled when hashedUserId is empty', () => {
    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) return { hashedUserId: '' };
      return {};
    });

    renderHook(() => useUASFollowedTopics());

    expect(mockEnabled).toBe(false);
  });

  it('should be enabled when hashedUserId is present', () => {
    renderHook(() => useUASFollowedTopics());

    expect(mockEnabled).toBe(true);
  });

  it('should include hashedUserId and startIndex in the query key', () => {
    renderHook(() => useUASFollowedTopics({ startIndex: 10 }));

    expect(mockQueryKey).toEqual(
      uasKeys.followsPage('user-123', 10, 10, undefined),
    );
  });

  it('should include the current service in the query key and pass it to getFollowedTopics', async () => {
    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) return { hashedUserId: 'user-123' };
      if (context === ServiceContext) return { service: 'hindi' };
      return {};
    });

    renderHook(() => useUASFollowedTopics({ startIndex: 10 }));

    expect(mockQueryKey).toEqual(
      uasKeys.followsPage('user-123', 10, 10, 'hindi'),
    );

    await mockQueryFn({ signal: new AbortController().signal });

    expect(mockGetFollowedTopics).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'hindi' }),
    );
  });
});
