import React from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import useScrollDepth from '.';

const optimizelyMock = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
};

const wrapper = ({ children }) => (
  <OptimizelyProvider optimizely={optimizelyMock} isServerSide>
    {children}
  </OptimizelyProvider>
);

describe('useScrollDepth', () => {
  const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
  const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call add event listener with scroll', () => {
    renderHook(() => useScrollDepth());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    );
  });

  it('should call remove event listener with scroll', () => {
    renderHook(() => useScrollDepth());

    cleanup().then(() => {
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true },
      );
    });
  });

  it('should fire event when scroll depth reaches 25% threshold', () => {
    const { result } = renderHook(() => useScrollDepth(), { wrapper });

    act(() => {
      result.current.setScrollDepth(25);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(1);
    expect(optimizelyMock.track).toHaveBeenCalledWith('scroll25');
  });

  it('should only fire event once when scroll depth reaches 25% threshold multiple times.', () => {
    const { result } = renderHook(() => useScrollDepth(), { wrapper });

    act(() => {
      result.current.setScrollDepth(25);
      result.current.setScrollDepth(10);
      result.current.setScrollDepth(25);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(1);
  });

  it('should fire event when scroll depth reaches 50% threshold and lower thresholds', () => {
    const { result } = renderHook(() => useScrollDepth(), { wrapper });

    act(() => {
      result.current.setScrollDepth(50);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(2);
    expect(optimizelyMock.track).toHaveBeenLastCalledWith('scroll50');
  });

  it('should only fire event once when scroll depth reaches 50% threshold multiple times.', () => {
    const { result } = renderHook(() => useScrollDepth(), { wrapper });

    act(() => {
      result.current.setScrollDepth(50);
      result.current.setScrollDepth(45);
      result.current.setScrollDepth(50);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(2);
  });

  it('should fire event when scroll depth reaches 75% threshold and lower thresholds', () => {
    const { result } = renderHook(() => useScrollDepth(), { wrapper });

    act(() => {
      result.current.setScrollDepth(75);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(3);
    expect(optimizelyMock.track).toHaveBeenLastCalledWith('scroll75');
  });

  it('should only fire event once when scroll depth reaches 75% threshold multiple times.', () => {
    const { result } = renderHook(() => useScrollDepth(), { wrapper });

    act(() => {
      result.current.setScrollDepth(75);
      result.current.setScrollDepth(70);
      result.current.setScrollDepth(75);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(3);
  });

  it('should fire event when scroll depth reaches 100% threshold and lower thresholds', () => {
    const { result } = renderHook(() => useScrollDepth(), { wrapper });

    act(() => {
      result.current.setScrollDepth(100);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(4);
    expect(optimizelyMock.track).toHaveBeenLastCalledWith('scroll100');
  });
});
