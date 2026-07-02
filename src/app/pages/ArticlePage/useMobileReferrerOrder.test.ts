import { renderHook, waitFor, act } from '@testing-library/react';
import { getReferrer } from '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes';
import onClient from '#app/lib/utilities/onClient';
import useMobileReferrerOrder from './useMobileReferrerOrder';

jest.mock(
  '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes',
);
jest.mock('#app/lib/utilities/onClient');

const mockGetReferrer = getReferrer as jest.MockedFunction<typeof getReferrer>;
const mockOnClient = onClient as jest.MockedFunction<typeof onClient>;

describe('useMobileReferrerOrder', () => {
  let matchMediaMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnClient.mockReturnValue(true);
    mockGetReferrer.mockReturnValue('direct');

    // Mock window.matchMedia
    matchMediaMock = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Desktop behavior', () => {
    it('should return null when on desktop', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      const { result } = renderHook(() => useMobileReferrerOrder());

      expect(result.current).toBeNull();
    });

    it('should return null regardless of referrer when on desktop', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      const { result: directResult } = renderHook(() =>
        useMobileReferrerOrder(),
      );
      expect(directResult.current).toBeNull();

      mockGetReferrer.mockReturnValue('search');
      const { result: searchResult } = renderHook(() =>
        useMobileReferrerOrder(),
      );
      expect(searchResult.current).toBeNull();
    });
  });

  describe('Mobile behavior with different referrers', () => {
    beforeEach(() => {
      matchMediaMock.mockReturnValue({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });
    });

    it('should return direct order when referrer is direct', () => {
      mockGetReferrer.mockReturnValue('direct');

      const { result } = renderHook(() => useMobileReferrerOrder());

      expect(result.current).toEqual([
        'mostRead',
        'topicDiscovery',
        'relatedContent',
        'pvCarousel',
        'featuredArticles',
        'topStories',
        'locationBasedOJ',
      ]);
    });

    it('should return search order when referrer is search', () => {
      mockGetReferrer.mockReturnValue('search');

      const { result } = renderHook(() => useMobileReferrerOrder());

      expect(result.current).toEqual([
        'relatedContent',
        'topicDiscovery',
        'mostRead',
        'pvCarousel',
        'topStories',
        'featuredArticles',
        'locationBasedOJ',
      ]);
    });

    it('should return social order when referrer is social', () => {
      mockGetReferrer.mockReturnValue('social');

      const { result } = renderHook(() => useMobileReferrerOrder());

      expect(result.current).toEqual([
        'mostRead',
        'topicDiscovery',
        'topStories',
        'featuredArticles',
        'relatedContent',
        'locationBasedOJ',
        'pvCarousel',
      ]);
    });

    it('should default to direct order when referrer is null', () => {
      mockGetReferrer.mockReturnValue(null);

      const { result } = renderHook(() => useMobileReferrerOrder());

      expect(result.current).toEqual([
        'mostRead',
        'topicDiscovery',
        'relatedContent',
        'pvCarousel',
        'featuredArticles',
        'topStories',
        'locationBasedOJ',
      ]);
    });
  });

  describe('Media query listener', () => {
    it('should add a change listener to media query on client', () => {
      const addEventListenerMock = jest.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: addEventListenerMock,
        removeEventListener: jest.fn(),
      });

      renderHook(() => useMobileReferrerOrder());

      expect(addEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });

    it('should remove listener on unmount', () => {
      const removeEventListenerMock = jest.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: removeEventListenerMock,
      });

      const { unmount } = renderHook(() => useMobileReferrerOrder());

      unmount();

      expect(removeEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });

    it('should update order when viewport changes from desktop to mobile', async () => {
      let listenerCallback: ((e: MediaQueryListEvent) => void) | null = null;
      matchMediaMock.mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn((event, callback) => {
          if (event === 'change') {
            listenerCallback = callback;
          }
        }),
        removeEventListener: jest.fn(),
      }));

      mockGetReferrer.mockReturnValue('direct');

      const { result } = renderHook(() => useMobileReferrerOrder());

      expect(result.current).toBeNull();

      if (listenerCallback) {
        await act(async () => {
          listenerCallback?.({
            matches: true,
          } as MediaQueryListEvent);
        });
      }

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current?.[0]).toBe('mostRead');
    });

    it('should update order when viewport changes from mobile to desktop', async () => {
      let listenerCallback: ((e: MediaQueryListEvent) => void) | null = null;
      matchMediaMock.mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn((event, callback) => {
          if (event === 'change') {
            listenerCallback = callback;
          }
        }),
        removeEventListener: jest.fn(),
      }));

      mockGetReferrer.mockReturnValue('direct');

      const { result } = renderHook(() => useMobileReferrerOrder());

      expect(result.current).not.toBeNull();

      if (listenerCallback) {
        await act(async () => {
          listenerCallback?.({
            matches: false,
          } as MediaQueryListEvent);
        });
      }

      await waitFor(() => {
        expect(result.current).toBeNull();
      });
    });
  });

  describe('Correct media query breakpoint', () => {
    it('should use GROUP_3_MAX_WIDTH_BP for the breakpoint', () => {
      mockOnClient.mockReturnValue(true);

      renderHook(() => useMobileReferrerOrder());

      const callArgs = matchMediaMock.mock.calls[0][0];
      // GROUP_3_MAX_WIDTH_BP = pixelsToRem(1007) = 62.9375rem
      expect(callArgs).toContain('62.9375rem');
      expect(callArgs).toContain('max-width');
    });
  });
});
