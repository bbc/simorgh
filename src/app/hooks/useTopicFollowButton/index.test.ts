import { use } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import uasApiRequest from '#app/lib/uasApi';
import uasKeys from '#app/lib/uasApi/queryKeys';
import {
  createFollowsPayload,
  FOLLOWS_CONFIG,
  buildGlobalId,
  type FollowTopicData,
} from '#app/lib/uasApi/uasUtility';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useTopicFollowStatus from '#app/hooks/useTopicFollowStatus';
import useTopicFollowButton, { FollowAction } from './index';

jest.mock('#app/hooks/useTopicFollowStatus');
jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility', () => {
  const actual = jest.requireActual('#app/lib/uasApi/uasUtility');
  return {
    ...actual,
    createFollowsPayload: jest.fn(),
    buildGlobalId: jest.fn(),
  };
});
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockSetQueryData = jest.fn();
const mockInvalidateQueries = jest.fn();

jest.mock('@tanstack/react-query', () => {
  let capturedMutationConfig: {
    mutationFn?: (action: FollowAction) => Promise<unknown>;
    onSuccess?: (result: unknown, action: FollowAction) => void;
  };

  return {
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: () => ({
      setQueryData: mockSetQueryData,
      invalidateQueries: mockInvalidateQueries,
    }),
    useMutation: (config: {
      mutationFn?: (action: FollowAction) => Promise<unknown>;
      onSuccess?: (result: unknown, action: FollowAction) => void;
    }) => {
      capturedMutationConfig = config;

      return {
        mutate: async (action: FollowAction) => {
          const result = await capturedMutationConfig.mutationFn?.(action);
          capturedMutationConfig.onSuccess?.(result, action);
          return result;
        },
        isPending: false,
        error: null,
      };
    },
  };
});

const mockUseTopicFollowStatus = useTopicFollowStatus as jest.MockedFunction<
  typeof useTopicFollowStatus
>;
const mockUasApiRequest = uasApiRequest as jest.MockedFunction<
  typeof uasApiRequest
>;
const mockCreateFollowsPayload = createFollowsPayload as jest.MockedFunction<
  typeof createFollowsPayload
>;
const mockBuildGlobalId = buildGlobalId as jest.MockedFunction<
  typeof buildGlobalId
>;

describe('useTopicFollowButton', () => {
  const topicData = {
    topicId: 'urn:bbc:topic:climate-change',
    title: 'Climate change',
    url: '/hindi/topics/climate-change',
  } as FollowTopicData;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseTopicFollowStatus.mockReturnValue({
      isFollowed: false,
      isLoading: false,
      error: null,
      metadata: undefined,
    });

    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === ServiceContext) return { service: 'hindi' };
      if (context === AccountContext)
        return {
          hashedUserId: 'user-123',
          isRefreshAvailable: true,
        };
      return {};
    });

    mockCreateFollowsPayload.mockReturnValue({
      resourceId: topicData.topicId,
      activityType: FOLLOWS_CONFIG.activityType,
      action: 'followed',
      resourceType: FOLLOWS_CONFIG.resourceType,
      resourceTitle: 'hindi',
      metaData: {
        topicId: topicData.topicId,
        title: topicData.title,
        locatorUrl: topicData.url,
        service: 'hindi',
      },
    });

    mockBuildGlobalId.mockReturnValue(
      'urn:bbc:world-service-news:topic:urn:bbc:topic:climate-change',
    );

    mockUasApiRequest.mockResolvedValue({ ok: true, status: 202 } as Response);
  });

  it('passes topicId to useTopicFollowStatus', () => {
    renderHook(() => useTopicFollowButton(topicData));

    expect(mockUseTopicFollowStatus).toHaveBeenCalledWith(topicData.topicId);
  });

  it('sends POST request with follows payload when following', async () => {
    const { result } = renderHook(() => useTopicFollowButton(topicData));

    await act(async () => {
      await result.current.handleFollowAction(FollowAction.FOLLOW);
    });

    expect(mockCreateFollowsPayload).toHaveBeenCalledWith(topicData, 'hindi');
    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'POST',
      FOLLOWS_CONFIG.activityType,
      {
        body: expect.objectContaining({
          resourceId: topicData.topicId,
          action: 'followed',
        }),
        isRefreshAvailable: true,
      },
    );
  });

  it('sends DELETE request with globalId when unfollowing', async () => {
    const { result } = renderHook(() => useTopicFollowButton(topicData));

    await act(async () => {
      await result.current.handleFollowAction(FollowAction.UNFOLLOW);
    });

    expect(mockBuildGlobalId).toHaveBeenCalledWith(
      topicData.topicId,
      FOLLOWS_CONFIG.resourceDomain,
      FOLLOWS_CONFIG.resourceType,
    );

    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'DELETE',
      FOLLOWS_CONFIG.activityType,
      {
        globalId:
          'urn:bbc:world-service-news:topic:urn:bbc:topic:climate-change',
        isRefreshAvailable: true,
      },
    );
  });

  it('updates follow status cache and invalidates follows list after follow', async () => {
    const { result } = renderHook(() => useTopicFollowButton(topicData));

    await act(async () => {
      await result.current.handleFollowAction(FollowAction.FOLLOW);
    });

    expect(mockSetQueryData).toHaveBeenCalledWith(
      uasKeys.followStatus('user-123', topicData.topicId),
      {
        isFollowed: true,
        metadata: {
          topicId: topicData.topicId,
          title: topicData.title,
          locatorUrl: topicData.url,
          service: 'hindi',
        },
      },
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: uasKeys.followsList('user-123'),
    });
  });

  it('updates follow status cache and invalidates follows list after unfollow', async () => {
    const { result } = renderHook(() => useTopicFollowButton(topicData));

    await act(async () => {
      await result.current.handleFollowAction(FollowAction.UNFOLLOW);
    });

    expect(mockSetQueryData).toHaveBeenCalledWith(
      uasKeys.followStatus('user-123', topicData.topicId),
      {
        isFollowed: false,
        metadata: undefined,
      },
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: uasKeys.followsList('user-123'),
    });
  });

  it('does not update query cache when follow request fails', async () => {
    mockUasApiRequest.mockRejectedValueOnce(
      new Error('UAS request failed with status 500'),
    );
    const { result } = renderHook(() => useTopicFollowButton(topicData));

    await act(async () => {
      await expect(
        result.current.handleFollowAction(FollowAction.FOLLOW),
      ).rejects.toThrow('UAS request failed with status 500');
    });

    expect(mockSetQueryData).not.toHaveBeenCalled();
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it('does not update query cache when unfollow request fails', async () => {
    mockUasApiRequest.mockRejectedValueOnce(
      new Error('UAS request failed with status 500'),
    );
    const { result } = renderHook(() => useTopicFollowButton(topicData));

    await act(async () => {
      await expect(
        result.current.handleFollowAction(FollowAction.UNFOLLOW),
      ).rejects.toThrow('UAS request failed with status 500');
    });

    expect(mockSetQueryData).not.toHaveBeenCalled();
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it('returns status hook state when no mutation error exists', () => {
    const statusError = new Error('Unable to load follow status');
    mockUseTopicFollowStatus.mockReturnValue({
      isFollowed: true,
      isLoading: true,
      error: statusError,
      metadata: undefined,
    });

    const { result } = renderHook(() => useTopicFollowButton(topicData));

    expect(result.current.isFollowed).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(statusError);
    expect(result.current.isUpdating).toBe(false);
  });
});
