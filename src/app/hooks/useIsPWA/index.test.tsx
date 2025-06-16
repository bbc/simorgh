import { renderHook } from '@testing-library/react';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useIsPWA from './index';

describe('useIsPWA', () => {
  const originalMatchMedia = window.matchMedia;
  const originalNavigator = window.navigator;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.navigator = originalNavigator;
    jest.restoreAllMocks();
  });

  function mockMatchMedia(queries: Record<string, boolean>) {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: !!queries[query],
    }));
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

  it('returns true when display-mode: standalone', () => {
    mockMatchMedia({ '(display-mode: standalone)': true });

    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });

  it('returns true when display-mode: minimal-ui', () => {
    mockMatchMedia({ '(display-mode: minimal-ui)': true });

    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });

  it('returns true when display-mode: fullscreen', () => {
    mockMatchMedia({ '(display-mode: fullscreen)': true });

    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });

  it('returns true when display-mode: window-controls-overlay', () => {
    mockMatchMedia({ '(display-mode: window-controls-overlay)': true });

    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });

  it('returns true when iOS standalone', () => {
    mockMatchMedia({});

    jest
      .spyOn(window, 'navigator', 'get')
      .mockImplementation(() => ({ standalone: true }) as unknown as Navigator);

    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });
});
