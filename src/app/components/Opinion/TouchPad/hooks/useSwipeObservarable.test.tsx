import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import useSwipeObserverable from './useSwipeObserverable';

describe('useSwipeObserverable', () => {
  it('should not called dependent functions on initial load', () => {
    const testFunction = jest.fn();
    const [swipeCount, changeSwipe] = useState(0);

    const { result } = renderHook(() =>
      useSwipeObserverable([testFunction], swipeCount),
    );

    expect(result.current.hovering).toBe(HoverStatus.INITIAL_STATE);
  });

  it('should call dependent functions on subsequent state updates', () => {
    const { result } = renderHook(() => useSwipeObserverable());

    act(() => {
      const { listeners } = result.current;
      listeners.onMouseEnter();
    });

    expect(result.current.hovering).toBe(HoverStatus.HOVERING);
  });
});
