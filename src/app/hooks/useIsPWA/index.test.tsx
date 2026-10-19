import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import * as isPWA from '#app/hooks/useIsPWA';
import usePWAInstallPrompt from '#app/hooks/usePWAInstallPrompt';

const { default: useIsPWA } =
  jest.requireActual<typeof import('./index')>('./index');

describe('useIsPWA', () => {
  const originalMatchMedia = window.matchMedia;
  const originalNavigator = window.navigator;
  const originalFullscreenElement = Object.getOwnPropertyDescriptor(
    document,
    'fullscreenElement',
  );

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.navigator = originalNavigator;
    if (originalFullscreenElement) {
      Object.defineProperty(
        document,
        'fullscreenElement',
        originalFullscreenElement,
      );
    } else {
      Reflect.deleteProperty(document, 'fullscreenElement');
    }
    jest.restoreAllMocks();
  });

  function mockMatchMedia(queries: Record<string, boolean>) {
    const mediaQueries = new Map<string, MediaQueryList>();
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      if (!mediaQueries.has(query)) {
        mediaQueries.set(
          query,
          Object.assign(new EventTarget(), {
            matches: !!queries[query],
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
          }),
        );
      }
      return mediaQueries.get(query);
    });
  }

  it('returns false when not in any PWA display mode', () => {
    mockMatchMedia({ '(display-mode: browser)': true });
    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(false);
  });

  it('returns false when on server side rendered', () => {
    const { result } = renderSSRHook(() => useIsPWA());
    expect(result.current).toBe(false);
  });

  it('returns true when iOS standalone', () => {
    mockMatchMedia({});
    jest
      .spyOn(window, 'navigator', 'get')
      .mockImplementation(() => ({ standalone: true }) as unknown as Navigator);
    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });

  it.each([
    '(display-mode: standalone)',
    '(display-mode: minimal-ui)',
    '(display-mode: window-controls-overlay)',
  ])('returns true when %s is matched', mediaQuery => {
    mockMatchMedia({ [mediaQuery]: true });
    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });

  it('detects an installed fullscreen app without a Fullscreen API element', () => {
    mockMatchMedia({ '(display-mode: fullscreen)': true });
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      value: null,
    });

    const { result } = renderHook(() => useIsPWA());

    expect(result.current).toBe(true);
  });

  it('does not treat ordinary browser fullscreen as an installed app', () => {
    mockMatchMedia({ '(display-mode: fullscreen)': true });
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      value: document.createElement('video'),
    });

    const { result } = renderHook(() => useIsPWA());

    expect(result.current).toBe(false);
  });

  it('preserves a saved install prompt across entering and exiting video fullscreen', async () => {
    mockMatchMedia({});
    jest.spyOn(isPWA, 'default').mockImplementation(useIsPWA);
    const fullscreenQuery = window.matchMedia('(display-mode: fullscreen)');
    const installEvent = Object.assign(
      new Event('beforeinstallprompt', { cancelable: true }),
      {
        prompt: jest.fn<Promise<void>, []>().mockResolvedValue(undefined),
        userChoice: Promise.resolve({
          outcome: 'accepted',
          platform: 'web',
        }),
      },
    );
    const { result } = renderHook(() => ({
      isPWA: useIsPWA(),
      ...usePWAInstallPrompt(),
    }));

    act(() => {
      window.dispatchEvent(installEvent);
    });
    expect(result.current.isInstallable).toBe(true);

    act(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        value: document.createElement('video'),
      });
      Object.assign(fullscreenQuery, { matches: true });
      fullscreenQuery.dispatchEvent(new Event('change'));
    });

    expect(result.current.isPWA).toBe(false);
    expect(result.current.isInstallable).toBe(true);

    act(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        value: null,
      });
      Object.assign(fullscreenQuery, { matches: false });
      fullscreenQuery.dispatchEvent(new Event('change'));
    });

    expect(result.current.isPWA).toBe(false);
    expect(result.current.isInstallable).toBe(true);

    await act(async () => result.current.promptInstall());

    expect(installEvent.prompt).toHaveBeenCalledTimes(1);
    expect(result.current.isInstallable).toBe(false);
  });

  it('updates when display mode changes and keeps subscriptions stable', () => {
    mockMatchMedia({});
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const addListener = jest.spyOn(mediaQuery, 'addEventListener');
    const removeListener = jest.spyOn(mediaQuery, 'removeEventListener');
    const { result, rerender, unmount } = renderHook(() => useIsPWA());

    act(() => {
      Object.assign(mediaQuery, { matches: true });
      mediaQuery.dispatchEvent(new Event('change'));
    });
    expect(result.current).toBe(true);

    act(() => {
      Object.assign(mediaQuery, { matches: false });
      mediaQuery.dispatchEvent(new Event('change'));
    });
    expect(result.current).toBe(false);

    rerender();
    expect(addListener).toHaveBeenCalledTimes(1);
    unmount();
    expect(removeListener).toHaveBeenCalledWith(
      'change',
      addListener.mock.calls[0][1],
    );
  });

  it('supports legacy media query listeners and removes them on unmount', () => {
    const addListener = jest.fn();
    const removeListener = jest.fn();
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addListener,
      removeListener,
    });
    const { unmount } = renderHook(() => useIsPWA());

    expect(addListener).toHaveBeenCalledTimes(4);
    unmount();
    expect(removeListener).toHaveBeenCalledTimes(4);
    expect(removeListener).toHaveBeenCalledWith(addListener.mock.calls[0][0]);
  });
});
