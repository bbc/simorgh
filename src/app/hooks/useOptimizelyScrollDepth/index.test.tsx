import { PropsWithChildren } from 'react';
import {
  renderHook,
  act,
  cleanup,
} from '#app/components/react-testing-library-with-providers';

import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes, Services } from '#app/models/types/global';
import useOptimizelyScrollDepth from '.';

const optimizelyMock = {
  onReady: jest.fn(() => Promise.resolve()),
  setUser: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
} satisfies Partial<ReactSDKClient>;

interface Props {
  pageType?: PageTypes;
  isAmp?: boolean;
  service?: Services;
  mockOptimizely?: Partial<ReactSDKClient>;
}

const wrapper = ({
  isAmp = false,
  pageType = ARTICLE_PAGE,
  service = 'news',
  children,
  mockOptimizely = optimizelyMock,
}: PropsWithChildren<Props>) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType={pageType}
    service={service}
    pathname="/pathname"
  >
    <OptimizelyProvider
      optimizely={mockOptimizely as ReactSDKClient}
      isServerSide
    >
      {children}
    </OptimizelyProvider>
  </RequestContextProvider>
);

describe('useOptimizelyScrollDepth', () => {
  const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
  const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call add event listener with scroll', () => {
    renderHook(() => useOptimizelyScrollDepth());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    );
  });

  it('should call remove event listener with scroll', () => {
    renderHook(() => useOptimizelyScrollDepth());

    cleanup();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  it('keeps one scroll listener across depth updates and removes it on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      () => useOptimizelyScrollDepth(),
      { wrapper },
    );
    const scrollListener = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'scroll',
    )?.[1];

    [25, 50, 75, 100, 0, 100].forEach(depth => {
      act(() => {
        result.current.setScrollDepth(depth);
      });
    });
    rerender();

    expect(
      addEventListenerSpy.mock.calls.filter(([event]) => event === 'scroll'),
    ).toHaveLength(1);
    expect(optimizelyMock.track.mock.calls).toEqual([
      ['scroll25'],
      ['scroll50'],
      ['scroll75'],
      ['scroll100'],
    ]);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      scrollListener,
    );
  });

  it('should fire event when scroll depth reaches 25% threshold', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(25);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(1);
    expect(optimizelyMock.track).toHaveBeenCalledWith('scroll25');
  });

  it('should only fire event once when scroll depth reaches 25% threshold multiple times.', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(25);
      result.current.setScrollDepth(10);
      result.current.setScrollDepth(25);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(1);
  });

  it('should fire event when scroll depth reaches 50% threshold and lower thresholds', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(50);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(2);
    expect(optimizelyMock.track).toHaveBeenLastCalledWith('scroll50');
  });

  it('should only fire event once when scroll depth reaches 50% threshold multiple times.', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(50);
      result.current.setScrollDepth(45);
      result.current.setScrollDepth(50);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(2);
  });

  it('should fire event when scroll depth reaches 75% threshold and lower thresholds', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(75);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(3);
    expect(optimizelyMock.track).toHaveBeenLastCalledWith('scroll75');
  });

  it('should only fire event once when scroll depth reaches 75% threshold multiple times.', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(75);
      result.current.setScrollDepth(70);
      result.current.setScrollDepth(75);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(3);
  });

  it('should fire event when scroll depth reaches 100% threshold and lower thresholds', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(100);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(4);
    expect(optimizelyMock.track).toHaveBeenLastCalledWith('scroll100');
  });

  it('should only fire event once when scroll depth reaches 100% threshold multiple times.', () => {
    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(100);
      result.current.setScrollDepth(90);
      result.current.setScrollDepth(100);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(4);
  });
});
