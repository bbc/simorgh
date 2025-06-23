import React, { PropsWithChildren } from 'react';
import {
  renderHook,
  act,
  cleanup,
} from '#app/components/react-testing-library-with-providers';

import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useOptimizely from '#app/hooks/useOptimizely';
import { PageTypes, Services } from '#app/models/types/global';
import useOptimizelyScrollDepth from '.';

jest.mock('#hooks/useOptimizely', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizely'),
  default: jest.fn(),
}));

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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
    renderHook(() => useOptimizelyScrollDepth());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    );
  });

  it('should call remove event listener with scroll', () => {
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
    renderHook(() => useOptimizelyScrollDepth());

    cleanup();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  it('should not call Optimizely track function for users not in an experiment', async () => {
    (useOptimizely as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useOptimizelyScrollDepth(), {
      wrapper,
    });

    act(() => {
      result.current.setScrollDepth(25);
      result.current.setScrollDepth(50);
      result.current.setScrollDepth(75);
      result.current.setScrollDepth(100);
    });

    expect(optimizelyMock.track).toHaveBeenCalledTimes(0);
  });

  it('should fire event when scroll depth reaches 25% threshold', () => {
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
    (useOptimizely as jest.Mock).mockReturnValue('variation_1');
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
