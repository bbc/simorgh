import { use } from 'react';
import { onlineManager } from '@tanstack/react-query';
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
import useUASMetadataSync from '#app/hooks/useUASMetadataSync';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '#app/hooks/useErrorTracking/errorTracking.const';
import useTopicFollowButton, { FollowAction } from './index';

jest.mock('#app/hooks/useTopicFollowStatus');
jest.mock('#app/hooks/useUASMetadataSync');
jest.mock('#app/lib/uasApi');
const mockTrackError = jest.fn();
jest.mock('#app/hooks/useErrorTracking', () => ({
  __esModule: true,
  default: () => mockTrackError,
}));
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
const mockMutationReset = jest.fn();
const mutationState: {
  isPending: boolean;
  isPaused: boolean;
  error: Error | null;
} = {
  isPending: false,
  isPaused: false,
  error: null,
};

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
        mutate: async (
          action: FollowAction,
          options?: {
            onSuccess?: (result: unknown, mutationAction: FollowAction) => void;
            onError?: (error: unknown, mutationAction: FollowAction) => void;
          },
        ) => {
          try {
            const result = await capturedMutationConfig.mutationFn?.(action);
            capturedMutationConfig.onSuccess?.(result, action);
            options?.onSuccess?.(result, action);
            return result;
          } catch (err) {
            options?.onError?.(err, action);
            mutationState.error = err as Error;
            throw err;
          }
        },
        isPending: mutationState.isPending,
        isPaused: mutationState.isPaused,
        error: mutationState.error,
        reset: mockMutationReset,
      };
    },
  };
});

const mockUseTopicFollowStatus = useTopicFollowStatus as jest.Mock;
const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockCreateFollowsPayload = createFollowsPayload as jest.Mock;
const mockBuildGlobalId = buildGlobalId as jest.Mock;
const mockUseUASMetadataSync = useUASMetadataSync as jest.Mock;

const mockHashedUserId = 'user-123';
const mockService = 'hindi';
const mockError = new Error('UAS request failed with status 500');

describe('useTopicFollowButton', () => {
  const topicData = {
    topicId: 'urn:bbc:topic:climate-change',
    title: 'Climate change',
    url: '/hindi/topics/climate-change',
  } as FollowTopicData;

  beforeEach(() => {
    jest.clearAllMocks();
    onlineManager.setOnline(true);
    mutationState.isPending = false;
    mutationState.isPaused = false;
    mutationState.error = null;

    mockUseTopicFollowStatus.mockReturnValue({
      isFollowed: false,
      isLoading: false,
      error: null,
      metadata: undefined,
    });

    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === ServiceContext) return { service: mockService };
      if (context === AccountContext)
        return {
          hashedUserId: mockHashedUserId,
          isRefreshAvailable: true,
        };
      return {};
    });

    mockCreateFollowsPayload.mockReturnValue({
      resourceId: topicData.topicId,
      activityType: FOLLOWS_CONFIG.activityType,
      action: 'followed',
      resourceType: FOLLOWS_CONFIG.resourceType,
      resourceTitle: mockService,
      metaData: {
        topicId: topicData.topicId,
        title: topicData.title,
        locatorUrl: topicData.url,
        service: mockService,
      },
    });

    mockBuildGlobalId.mockReturnValue(
      'urn:bbc:world-service-news:topic:urn:bbc:topic:climate-change',
    );

    mockUasApiRequest.mockResolvedValue({ ok: true, status: 202 } as Response);
  });

  afterEach(() => {
    onlineManager.setOnline(true);
  });

  it('passes topicId to useTopicFollowStatus', () => {
    renderHook(() => useTopicFollowButton(topicData));

    expect(mockUseTopicFollowStatus).toHaveBeenCalledWith(topicData.topicId);
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

  it('returns isUpdating false when mutation is pending but paused', () => {
    mutationState.isPending = true;
    mutationState.isPaused = true;

    const { result } = renderHook(() => useTopicFollowButton(topicData));

    expect(result.current.isUpdating).toBe(false);
  });

  it('returns isUpdating true when mutation is pending and not paused', () => {
    mutationState.isPending = true;
    mutationState.isPaused = false;

    const { result } = renderHook(() => useTopicFollowButton(topicData));

    expect(result.current.isUpdating).toBe(true);
  });

  describe('handleFollowAction', () => {
    it('sends POST request with follows payload when following', async () => {
      const { result } = renderHook(() => useTopicFollowButton(topicData));

      await act(async () => {
        await result.current.handleFollowAction(FollowAction.FOLLOW);
      });

      expect(mockCreateFollowsPayload).toHaveBeenCalledWith(
        topicData,
        mockService,
      );
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
        uasKeys.followStatus(mockHashedUserId, topicData.topicId),
        {
          isFollowed: true,
          metadata: {
            topicId: topicData.topicId,
            title: topicData.title,
            locatorUrl: topicData.url,
            service: mockService,
          },
        },
      );
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: uasKeys.followsList(mockHashedUserId),
      });
    });

    it('updates follow status cache and invalidates follows list after unfollow', async () => {
      const { result } = renderHook(() => useTopicFollowButton(topicData));

      await act(async () => {
        await result.current.handleFollowAction(FollowAction.UNFOLLOW);
      });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        uasKeys.followStatus(mockHashedUserId, topicData.topicId),
        {
          isFollowed: false,
          metadata: undefined,
        },
      );
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: uasKeys.followsList(mockHashedUserId),
      });
    });

    it.each([FollowAction.FOLLOW, FollowAction.UNFOLLOW])(
      'reports and tracks a failed %s action without updating cache',
      async action => {
        mockUasApiRequest.mockRejectedValueOnce(mockError);
        const { result } = renderHook(() => useTopicFollowButton(topicData));

        await act(async () => {
          await expect(
            result.current.handleFollowAction(action),
          ).rejects.toThrow(mockError);
        });

        expect(result.current.actionResult).toEqual({
          status: 'error',
          action,
        });
        expect(result.current.error).toBe(mockError);
        expect(mockSetQueryData).not.toHaveBeenCalled();
        expect(mockInvalidateQueries).not.toHaveBeenCalled();
        expect(mockTrackError).toHaveBeenCalledWith({
          error: mockError,
          feature: ERROR_TRACKING_FEATURES.FOLLOW_TOPIC_UAS,
          action,
        });
      },
    );
  });

  describe('action results', () => {
    it('does not report a result before a user action', () => {
      const { result } = renderHook(() => useTopicFollowButton(topicData));

      expect(result.current.actionResult).toBeNull();
    });

    it.each([FollowAction.FOLLOW, FollowAction.UNFOLLOW])(
      'reports success after a user-initiated %s action',
      async action => {
        const { result } = renderHook(() => useTopicFollowButton(topicData));

        await act(async () => {
          await result.current.handleFollowAction(action);
        });

        expect(result.current.actionResult).toEqual({
          status: 'success',
          action,
        });
      },
    );

    it.each([FollowAction.FOLLOW, FollowAction.UNFOLLOW])(
      'reports an offline error without queuing a %s request',
      action => {
        onlineManager.setOnline(false);
        const { result } = renderHook(() => useTopicFollowButton(topicData));

        act(() => {
          result.current.handleFollowAction(action);
        });

        expect(result.current.actionResult).toEqual({
          status: 'error',
          action,
        });
        expect(mockUasApiRequest).not.toHaveBeenCalled();
        expect(mockSetQueryData).not.toHaveBeenCalled();
      },
    );

    it('clears dismissed action results and reports subsequent actions', async () => {
      const { result } = renderHook(() => useTopicFollowButton(topicData));

      await act(async () => {
        await result.current.handleFollowAction(FollowAction.FOLLOW);
      });

      act(() => {
        result.current.resetActionResult();
      });

      expect(result.current.actionResult).toBeNull();
      expect(mockMutationReset).toHaveBeenCalledTimes(1);

      await act(async () => {
        await result.current.handleFollowAction(FollowAction.UNFOLLOW);
      });

      expect(result.current.actionResult).toEqual({
        status: 'success',
        action: FollowAction.UNFOLLOW,
      });
    });

    it.each([false, true])(
      'does not report background metadata sync results (failure: %s)',
      async shouldFail => {
        if (shouldFail) mockUasApiRequest.mockRejectedValueOnce(mockError);
        const { result } = renderHook(() => useTopicFollowButton(topicData));
        const { onMetadataOutOfDate } = mockUseUASMetadataSync.mock.calls[0][0];

        await act(async () => {
          await onMetadataOutOfDate().catch(() => undefined);
        });

        expect(result.current.actionResult).toBeNull();
      },
    );

    it('does not report status fetch errors as action results', () => {
      mockUseTopicFollowStatus.mockReturnValue({
        isFollowed: false,
        isLoading: false,
        error: mockError,
        metadata: undefined,
      });
      const { result } = renderHook(() => useTopicFollowButton(topicData));

      expect(result.current.actionResult).toBeNull();
    });
  });

  describe('error tracking', () => {
    it('tracks a failed background metadata resync', async () => {
      mockUasApiRequest.mockRejectedValueOnce(mockError);

      let onMetadataOutOfDate: (() => unknown) | undefined;
      mockUseUASMetadataSync.mockImplementation(
        ({ onMetadataOutOfDate: callback }) => {
          onMetadataOutOfDate = callback;
        },
      );

      renderHook(() => useTopicFollowButton(topicData));

      await act(async () => {
        await (onMetadataOutOfDate?.() as Promise<void>).catch(() => undefined);
      });

      expect(mockTrackError).toHaveBeenCalledWith({
        error: expect.any(Error),
        feature: ERROR_TRACKING_FEATURES.FOLLOW_TOPIC_UAS,
        action: UAS_ERROR_ACTIONS.METADATA_SYNC,
      });
    });

    it('tracks a failed follow-status fetch', () => {
      mockUseTopicFollowStatus.mockReturnValue({
        isFollowed: false,
        isLoading: false,
        error: new Error('failed to fetch follow status'),
        metadata: undefined,
      });

      renderHook(() => useTopicFollowButton(topicData));

      expect(mockTrackError).toHaveBeenCalledWith({
        error: expect.any(Error),
        feature: ERROR_TRACKING_FEATURES.FOLLOW_TOPIC_UAS,
        action: UAS_ERROR_ACTIONS.FETCH_STATUS,
      });
    });

    it('does not track when there is no error', () => {
      renderHook(() => useTopicFollowButton(topicData));

      expect(mockTrackError).not.toHaveBeenCalled();
    });
  });

  describe('useUASMetadataSync integration', () => {
    it('passes topic metadata to useUASMetadataSync when topic is followed', () => {
      mockUseTopicFollowStatus.mockReturnValue({
        isFollowed: true,
        isLoading: false,
        error: null,
        metadata: {
          topicId: topicData.topicId,
          title: 'Old title',
          locatorUrl: topicData.url,
          service: mockService,
        },
      });

      renderHook(() => useTopicFollowButton(topicData));

      expect(mockUseUASMetadataSync).toHaveBeenCalledWith(
        expect.objectContaining({
          followTopicPageData: topicData,
          topicId: topicData.topicId,
          service: mockService,
          isFollowed: true,
          savedTopicMetadata: expect.objectContaining({
            title: 'Old title',
          }),
          onMetadataOutOfDate: expect.any(Function),
        }),
      );
    });
  });

  describe('error', () => {
    it('is null before any action is taken', () => {
      const { result } = renderHook(() => useTopicFollowButton(topicData));

      expect(result.current.error).toBeNull();
    });

    it('exposes the underlying error when a genuine request fails', async () => {
      mockUasApiRequest.mockRejectedValueOnce(mockError);
      const { result, rerender } = renderHook(() =>
        useTopicFollowButton(topicData),
      );

      await act(async () => {
        await expect(
          result.current.handleFollowAction(FollowAction.FOLLOW),
        ).rejects.toThrow(mockError);
      });
      rerender();

      expect(result.current.error).toBe(mockError);
    });
  });
});
