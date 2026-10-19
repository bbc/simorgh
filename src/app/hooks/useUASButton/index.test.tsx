import { use } from 'react';
import { onlineManager } from '@tanstack/react-query';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import uasApiRequest from '#app/lib/uasApi';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useUASMetadataSync from '#app/hooks/useUASMetadataSync/index';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '#app/hooks/useErrorTracking/errorTracking.const';
import useUASButton, { UASAction, UseUASButtonProps } from './index';

jest.mock('#app/hooks/useUASFetchSaveStatus');
jest.mock('#app/hooks/useUASMetadataSync');
jest.mock('#app/lib/uasApi');

const mockTrackError = jest.fn();
jest.mock('#app/hooks/useErrorTracking', () => ({
  __esModule: true,
  default: () => mockTrackError,
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockSetQueryData = jest.fn();
const mockInvalidateQueries = jest.fn();

jest.mock('@tanstack/react-query', () => {
  let capturedMutationConfig: {
    mutationFn?: (action: string) => Promise<unknown>;
    onSuccess?: (result: unknown, action: string) => void;
    onError?: (error: unknown) => void;
  };
  let mutationState: {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    variables?: string;
  } = {
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
    variables: undefined,
  };

  return {
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: () => ({
      setQueryData: mockSetQueryData,
      invalidateQueries: mockInvalidateQueries,
    }),
    useMutation: (config: {
      mutationFn?: (action: string) => Promise<unknown>;
      onSuccess?: (result: unknown, action: string) => void;
      onError?: (error: unknown) => void;
    }) => {
      capturedMutationConfig = config;

      return {
        mutate: async (
          action: string,
          options?: {
            onSuccess?: (result: unknown, mutationAction: string) => void;
            onError?: (error: unknown, mutationAction: string) => void;
          },
        ) => {
          try {
            const result = await capturedMutationConfig.mutationFn?.(action);
            capturedMutationConfig.onSuccess?.(result, action);
            options?.onSuccess?.(result, action);
            mutationState = {
              isPending: false,
              isSuccess: true,
              isError: false,
              error: null,
              variables: action,
            };
          } catch (err) {
            capturedMutationConfig.onError?.(err);
            options?.onError?.(err, action);
            mutationState = {
              isPending: false,
              isSuccess: false,
              isError: true,
              error: err as Error,
              variables: action,
            };
            throw err;
          }
        },
        isPending: mutationState.isPending,
        isSuccess: mutationState.isSuccess,
        isError: mutationState.isError,
        error: mutationState.error,
        variables: mutationState.variables,
        reset: () => {
          mutationState = {
            isPending: false,
            isSuccess: false,
            isError: false,
            error: null,
            variables: undefined,
          };
        },
      };
    },
  };
});

const mockUseUASFetchSaveStatus = useUASFetchSaveStatus as jest.Mock;
const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockUseUASMetadataSync = useUASMetadataSync as jest.Mock;

const mockError = new Error('UAS request failed with status 500');

describe('useUASButton', () => {
  const mockHashedUserId = 'user-123';

  const defaultProps = {
    articleId: '123',
    saveArticlePageData: {
      canonicalUrl: 'https://bbc.com/article',
    } as unknown as UseUASButtonProps['saveArticlePageData'],
  } as UseUASButtonProps;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseUASFetchSaveStatus.mockReturnValue({
      isSaved: false,
      isLoading: false,
      isUpdating: false,
      error: null,
      savedMetadata: undefined,
    });

    (use as jest.Mock).mockImplementation(context => {
      if (context === AccountContext)
        return { hashedUserId: mockHashedUserId, isRefreshAvailable: true };
      if (context === ServiceContext) return { service: 'hindi' };
      return {};
    });

    mockUasApiRequest.mockResolvedValue({ ok: true, status: 202 });
  });

  it('passes articleId to useUASFetchSaveStatus', () => {
    renderHook(() => useUASButton(defaultProps));

    expect(mockUseUASFetchSaveStatus).toHaveBeenCalledWith(
      defaultProps.articleId,
    );
  });

  describe('handleSaveAction', () => {
    it('sends POST request when saving', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(mockUasApiRequest).toHaveBeenCalledWith(
        'POST',
        'favourites',
        expect.objectContaining({
          body: expect.objectContaining({
            resourceId: defaultProps.articleId,
            activityType: 'favourites',
            action: 'favourited',
            resourceType: 'article',
            resourceTitle: 'hindi',
          }),
          isRefreshAvailable: true,
        }),
      );
    });

    it('updates query cache to saved on successful save', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        uasKeys.favouriteStatus(mockHashedUserId, defaultProps.articleId),
        expect.objectContaining({
          isSaved: true,
        }),
      );
    });

    it('sends DELETE request when removing', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockUasApiRequest).toHaveBeenCalledWith('DELETE', 'favourites', {
        globalId: `urn:bbc:world-service-news:article:${defaultProps.articleId}`,
        isRefreshAvailable: true,
      });
    });

    it('updates query cache to unsaved on successful remove', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        uasKeys.favouriteStatus(mockHashedUserId, defaultProps.articleId),
        expect.objectContaining({
          isSaved: false,
        }),
      );
    });

    it('does not update query cache when request fails', async () => {
      mockUasApiRequest.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await expect(
          result.current.handleSaveAction(UASAction.REMOVE),
        ).rejects.toThrow(mockError);
      });

      expect(mockSetQueryData).not.toHaveBeenCalled();
    });

    it('invalidates favouritesList cache on successful save', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: uasKeys.favouritesList(mockHashedUserId),
      });
    });
  });

  describe('offline handling', () => {
    it('reports an error and skips the request when the user acts while offline', async () => {
      const onlineSpy = jest
        .spyOn(onlineManager, 'isOnline')
        .mockReturnValue(false);

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(result.current.actionResult).toEqual({
        status: 'error',
        action: UASAction.SAVE,
      });
      expect(mockUasApiRequest).not.toHaveBeenCalled();
      expect(mockSetQueryData).not.toHaveBeenCalled();
      // Offline is an expected state, not a genuine failure, so it must not be tracked.
      expect(result.current.error).toBeNull();
      expect(mockTrackError).not.toHaveBeenCalled();

      onlineSpy.mockRestore();
    });
  });

  describe('error tracking', () => {
    it('tracks a failed user-initiated save/remove action', async () => {
      mockUasApiRequest.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await expect(
          result.current.handleSaveAction(UASAction.REMOVE),
        ).rejects.toThrow(mockError);
      });

      expect(mockTrackError).toHaveBeenCalledWith({
        error: expect.any(Error),
        feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
        action: UASAction.REMOVE,
      });
    });

    it('tracks a failed background metadata resync', async () => {
      mockUasApiRequest.mockRejectedValueOnce(mockError);

      let onMetadataOutOfDate: (() => unknown) | undefined;
      mockUseUASMetadataSync.mockImplementation(
        ({ onMetadataOutOfDate: callback }) => {
          onMetadataOutOfDate = callback;
        },
      );

      renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        // The mock rethrows so the fire-and-forget mutation rejects; swallow it
        // here since production TanStack routes the failure through onError only.
        await (onMetadataOutOfDate?.() as Promise<void>).catch(() => undefined);
      });

      expect(mockTrackError).toHaveBeenCalledWith({
        error: expect.any(Error),
        feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
        action: UAS_ERROR_ACTIONS.METADATA_SYNC,
      });
    });

    it('tracks a failed save-status fetch', () => {
      mockUseUASFetchSaveStatus.mockReturnValue({
        isSaved: false,
        isLoading: false,
        error: new Error('failed to fetch save status'),
        savedMetadata: undefined,
      });

      renderHook(() => useUASButton(defaultProps));

      expect(mockTrackError).toHaveBeenCalledWith({
        error: expect.any(Error),
        feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
        action: UAS_ERROR_ACTIONS.FETCH_STATUS,
      });
    });

    it('does not track when there is no error', () => {
      renderHook(() => useUASButton(defaultProps));

      expect(mockTrackError).not.toHaveBeenCalled();
    });
  });

  describe('useUASMetadataSync integration', () => {
    it('calls useUASMetadataSync with correct parameters when article is saved with metadata', () => {
      const mockMetadata = {
        title: 'Saved Article',
        promoImage: 'https://ichef.bbc.co.uk/saved.jpg',
      };

      mockUseUASFetchSaveStatus.mockReturnValue({
        isSaved: true,
        isLoading: false,
        error: null,
        savedMetadata: mockMetadata,
      });

      renderHook(() => useUASButton(defaultProps));

      expect(mockUseUASMetadataSync).toHaveBeenCalledWith(
        expect.objectContaining({
          saveArticlePageData: defaultProps.saveArticlePageData,
          articleId: defaultProps.articleId,
          service: 'hindi',
          isSaved: true,
          savedArticleMetadata: mockMetadata,
          onMetadataOutOfDate: expect.any(Function),
        }),
      );
    });
  });

  describe('actionResult', () => {
    it('is null before any action is taken', () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      expect(result.current.actionResult).toBeNull();
    });

    it('reflects a successful user-triggered save', async () => {
      const { result, rerender } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });
      rerender();

      expect(result.current.actionResult).toEqual({
        status: 'success',
        action: UASAction.SAVE,
      });
    });

    it('reflects a failed user-triggered remove', async () => {
      mockUasApiRequest.mockRejectedValueOnce(mockError);
      const { result, rerender } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await expect(
          result.current.handleSaveAction(UASAction.REMOVE),
        ).rejects.toThrow(mockError);
      });
      rerender();

      expect(result.current.actionResult).toEqual({
        status: 'error',
        action: UASAction.REMOVE,
      });
    });

    it('does not populate when a save is triggered by the background metadata sync', async () => {
      let onMetadataOutOfDate: (() => void) | undefined;
      mockUseUASMetadataSync.mockImplementation(
        ({ onMetadataOutOfDate: callback }) => {
          onMetadataOutOfDate = callback;
        },
      );

      const { result, rerender } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        onMetadataOutOfDate?.();
        // Flush the mutation's internal awaits before asserting.
        await new Promise(resolve => {
          setTimeout(resolve, 0);
        });
      });
      rerender();

      expect(result.current.actionResult).toBeNull();
    });

    it('clears the action result and resets the underlying mutation', async () => {
      const { result, rerender } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });
      rerender();
      expect(result.current.actionResult).not.toBeNull();

      act(() => {
        result.current.resetActionResult();
      });
      rerender();

      expect(result.current.actionResult).toBeNull();
    });
  });

  describe('error', () => {
    it('is null before any action is taken', () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      expect(result.current.error).toBeNull();
    });

    it('exposes the underlying error when a genuine request fails', async () => {
      mockUasApiRequest.mockRejectedValueOnce(mockError);
      const { result, rerender } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await expect(
          result.current.handleSaveAction(UASAction.REMOVE),
        ).rejects.toThrow(mockError);
      });
      rerender();

      expect(result.current.error).toBe(mockError);
    });
  });
});
