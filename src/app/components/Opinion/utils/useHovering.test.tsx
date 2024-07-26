import { act, renderHook } from '@testing-library/react';
import useOnHovering from './useHovering';

describe('useHovering', () => {
  it('sets hover to null on initial load', () => {
    const { result } = renderHook(() => useOnHovering());

    expect(result.current.hovering).toBe(null);
  });

  it('sets hover to true when onMouseEnter is called', () => {
    const { result } = renderHook(() => useOnHovering());

    act(() => {
      const { listeners } = result.current;
      listeners.onMouseEnter();
    });

    expect(result.current.hovering).toBe(true);
  });

  it('sets hover to true when onMouseEnter is called', () => {
    const { result } = renderHook(() => useOnHovering());

    act(() => {
      const { listeners } = result.current;
      listeners.onMouseLeave();
    });

    expect(result.current.hovering).toBe(false);
  });
});
