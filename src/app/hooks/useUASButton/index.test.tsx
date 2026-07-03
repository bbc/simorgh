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
import useUASMetadataSync from '#app/hooks/useUASMetadataSync/index';
import useUASButton, { UASAction, UseUASButtonProps } from './index';

jest.mock('#app/hooks/useUASFetchSaveStatus');
jest.mock('#app/hooks/useUASMetadataSync');
jest.mock('#app/lib/uasApi');
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
        mutate: async (action: string) => {
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
const mockUseUASMetadataSync = useUASMetadataSync as jest.Mock;

describe('useUASButton', () => {
  const defaultProps = {
    articleId: '123',
    articlePageData: {
      contentBlocks: [
        {
          id: '597a9704',
          type: 'image',
          model: {
            blocks: [
              {
                id: 'd57733c1',
                type: 'caption',
                model: {
                  blocks: [],
                },
              },
              {
                id: '8ffd8707',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: '7eab27b4',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '1739f732',
                            type: 'paragraph',
                            model: {
                              text: 'भारतीय पीएम नरेंद्र मोदी और नेपाल के पीएम बालेन शाह',
                              blocks: [
                                {
                                  id: '7c37f3cd',
                                  type: 'fragment',
                                  model: {
                                    text: 'भारतीय पीएम नरेंद्र मोदी और नेपाल के पीएम बालेन शाह',
                                    attributes: [],
                                  },
                                  position: [2, 2, 1, 1, 1],
                                },
                              ],
                            },
                            position: [2, 2, 1, 1],
                          },
                        ],
                      },
                      position: [2, 2, 1],
                    },
                  ],
                },
                position: [2, 2],
              },
              {
                id: 'ef95269f',
                type: 'rawImage',
                model: {
                  width: 780,
                  height: 439,
                  locator: '688a/live/f8441af0-5e7a-11f1-ab70-cdbb605c4a31.jpg',
                  originCode: 'cpsprodpb',
                  copyrightHolder: 'Getty Images',
                  suitableForSyndication: true,
                },
                position: [2, 3],
              },
            ],
          },
          position: [2],
        },
      ],
      canonicalUrl: 'https://bbc.com/article',
    } as unknown as UseUASButtonProps['articlePageData'],
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
        return { hashedUserId: 'user-123', isRefreshAvailable: true };
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
        uasKeys.favouriteStatus('user-123', '123'),
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
        globalId: 'urn:bbc:world-service-news:article:123',
        isRefreshAvailable: true,
      });
    });

    it('updates query cache to unsaved on successful remove', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        uasKeys.favouriteStatus('user-123', '123'),
        expect.objectContaining({
          isSaved: false,
        }),
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

    it('invalidates favouritesList cache on successful save', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: uasKeys.favouritesList('user-123'),
      });
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
          articlePageData: defaultProps.articlePageData,
          articleId: '123',
          service: 'hindi',
          isSaved: true,
          savedArticleMetadata: mockMetadata,
          onMetadataOutOfDate: expect.any(Function),
        }),
      );
    });
  });
});
