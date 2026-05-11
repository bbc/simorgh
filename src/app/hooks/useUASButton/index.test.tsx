import { use } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import uasApiRequest from '#app/lib/uasApi';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import type { SaveArticleButtonProps } from '#app/components/SaveArticleButton';
import useUASButton, { UASAction } from './index';

jest.mock('#app/hooks/useUASFetchSaveStatus');
jest.mock('#app/lib/uasApi');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockSetQueryData = jest.fn();

jest.mock('@tanstack/react-query', () => {
  let capturedMutationConfig: {
    mutationFn?: (action: string) => Promise<unknown>;
    onSuccess?: (result: unknown, action: string) => void;
    onError?: (error: unknown) => void;
  };

  return {
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: () => ({ setQueryData: mockSetQueryData }),
    useMutation: (config: {
      mutationFn?: (action: string) => Promise<unknown>;
      onSuccess?: (result: unknown, action: string) => void;
      onError?: (error: unknown) => void;
    }) => {
      capturedMutationConfig = config;

      return {
        mutateAsync: async (action: string) => {
          try {
            const result = await capturedMutationConfig.mutationFn?.(action);
            capturedMutationConfig.onSuccess?.(result, action);
          } catch (err) {
            capturedMutationConfig.onError?.(err);
            throw err;
          }
        },
        isPending: false,
        error: null,
      };
    },
  };
});

const mockUseUASFetchSaveStatus = useUASFetchSaveStatus as jest.Mock;
const mockUasApiRequest = uasApiRequest as jest.Mock;

describe('useUASButton', () => {
  const defaultProps = {
    articleId: '123',
    articleTitle: 'Test Article',
    articlePageData: {
      metadata: { locators: { canonicalUrl: 'https://bbc.com/article' } },
    },
  } as SaveArticleButtonProps;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseUASFetchSaveStatus.mockReturnValue({
      isSaved: false,
      isLoading: false,
      error: null,
    });

    (use as jest.Mock).mockImplementation(context => {
      if (context === AccountContext) return { userPseudoId: 'user-123' };
      if (context === ServiceContext) return { service: 'hindi' };
      return {};
    });

    mockUasApiRequest.mockResolvedValue({ ok: true, status: 202 });
  });

  it('passes articleId to useUASFetchSaveStatus', () => {
    renderHook(() => useUASButton(defaultProps));

    expect(mockUseUASFetchSaveStatus).toHaveBeenCalledWith('123');
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
          }),
        }),
      );
    });

    it('updates query cache to saved on successful save', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        uasKeys.favouriteStatus('user-123', '123'),
        true,
      );
    });

    it('sends DELETE request when removing', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockUasApiRequest).toHaveBeenCalledWith(
        'DELETE',
        'favourites',
        expect.objectContaining({ globalId: expect.any(String) }),
      );
    });

    it('updates query cache to unsaved on successful remove', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        uasKeys.favouriteStatus('user-123', '123'),
        false,
      );
    });

    it('does not update query cache when request fails', async () => {
      mockUasApiRequest.mockRejectedValueOnce(
        new Error('UAS request failed with status 500'),
      );

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await expect(
          result.current.handleSaveAction(UASAction.REMOVE),
        ).rejects.toThrow('UAS request failed with status 500');
      });

      expect(mockSetQueryData).not.toHaveBeenCalled();
    });
  });
});
