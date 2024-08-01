import { act, renderHook } from '@testing-library/react';
import useOnHovering, { HoverStatus } from './useHovering';

describe('useHovering', () => {
  it('sets hover to initial_state on initial load', () => {
    const { result } = renderHook(() => useOnHovering());

    expect(result.current.hovering).toBe(HoverStatus.INITIAL_STATE);
  });

  it('sets hover to hovering when onMouseEnter is called', () => {
    const { result } = renderHook(() => useOnHovering());

    act(() => {
      const { listeners } = result.current;
      listeners.onMouseEnter();
    });

    expect(result.current.hovering).toBe(HoverStatus.HOVERING);
  });

  it('sets hover to not_hovering when onMouseEnter is called', () => {
    const { result } = renderHook(() => useOnHovering());

    act(() => {
      const { listeners } = result.current;
      listeners.onMouseLeave();
    });

    expect(result.current.hovering).toBe(HoverStatus.NOT_HOVERING);
  });
});
