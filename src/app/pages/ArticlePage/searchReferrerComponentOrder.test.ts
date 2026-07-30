import { renderHook, waitFor, act } from '@testing-library/react';
import onClient from '#app/lib/utilities/onClient';
import useMobileOJComponentOrder from './useMobileOJComponentOrder';
import { SEARCH_COMPONENT_ORDER } from './searchReferrerComponentOrder';

jest.mock(
  '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes',
);
jest.mock('#app/lib/utilities/onClient');

const mockOnClient = onClient as jest.MockedFunction<typeof onClient>;

describe('useMobileOJComponentOrder', () => {
  let matchMediaMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnClient.mockReturnValue(true);

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
    it('should return null regardless of variant when on desktop', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      const { result: variant2Result } = renderHook(() =>
        useMobileOJComponentOrder('variant_2_recommended'),
      );
      expect(variant2Result.current).toBeNull();

      const { result: variant3Result } = renderHook(() =>
        useMobileOJComponentOrder('variant_3_hybrid'),
      );
      expect(variant3Result.current).toBeNull();
    });
  });

  describe('Mobile behavior with different variants', () => {
    beforeEach(() => {
      matchMediaMock.mockReturnValue({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });
    });
    it.each([
      'variant_1_related',
      'variant_2_recommended',
      'variant_3_hybrid',
      'variant_4_related_mid',
      'variant_5_recommended_mid',
      'variant_6_hybrid_mid',
    ] as const)('returns the correct order for %s', searchVariant => {
      const { result } = renderHook(() =>
        useMobileOJComponentOrder(searchVariant),
      );

      expect(result.current).toEqual(SEARCH_COMPONENT_ORDER[searchVariant]);
    });
    it('returns null when no variant is provided', () => {
      const { result } = renderHook(() => useMobileOJComponentOrder(null));
      expect(result.current).toBeNull();
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

      renderHook(() => useMobileOJComponentOrder(null));

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

      const { unmount } = renderHook(() => useMobileOJComponentOrder(null));

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

      const { result } = renderHook(() =>
        useMobileOJComponentOrder('variant_1_related'),
      );

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

      expect(result.current?.[0]).toBe('topicDiscovery');
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

      const { result } = renderHook(() =>
        useMobileOJComponentOrder('variant_4_related_mid'),
      );

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

      renderHook(() => useMobileOJComponentOrder(null));

      const callArgs = matchMediaMock.mock.calls[0][0];
      // GROUP_3_MAX_WIDTH_BP = pixelsToRem(1007) = 62.9375rem
      expect(callArgs).toContain('62.9375rem');
      expect(callArgs).toContain('max-width');
    });
  });
});
