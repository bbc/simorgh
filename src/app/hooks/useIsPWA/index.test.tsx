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
    '(display-mode: fullscreen)',
    '(display-mode: window-controls-overlay)',
  ])('returns true when %s is matched', mediaQuery => {
    mockMatchMedia({ [mediaQuery]: true });
    const { result } = renderHook(() => useIsPWA());
    expect(result.current).toBe(true);
  });
});
