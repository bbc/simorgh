/* eslint-disable no-console */
import React, { PropsWithChildren } from 'react';
import { render, act } from '@testing-library/react';
import {
  OptimizelyProvider,
  ReactSDKClient,
  OptimizelyDecision,
} from '@optimizely/react-sdk';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes, Services } from '#app/models/types/global';

import PageCompleteTracking from '.';

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
  decideAll: jest.fn(() => ({
    mockExperiment1: { variationKey: 'variation_1' } as OptimizelyDecision,
    mockExperiment2: { variationKey: 'variation_1' } as OptimizelyDecision,
  })),
} satisfies Partial<ReactSDKClient>;

jest.mock('./experiments', () => ({
  experiments: ['mockExperiment1', 'mockExperiment2'],
}));

const observers = new Map();

const IntersectionObserver = jest.fn(cb => {
  const item = {
    callback: cb,
    elements: new Set(),
  };

  const instance = {
    observe: jest.fn(element => {
      item.elements.add(element);
    }),
    disconnect: jest.fn(() => {
      item.elements.clear();
    }),
  };

  observers.set(instance, item);

  return instance;
});

const getObserverInstance = (element: HTMLElement) => {
  try {
    // @ts-expect-error for testing purposes
    const [instance] = Array.from(observers).find(([, item]) =>
      item.elements.has(element),
    );

    return instance;
  } catch (e) {
    throw new Error('Failed to find IntersectionObserver for element.');
  }
};

const triggerIntersection = ({
  changes,
  observer,
}: {
  changes: Partial<IntersectionObserverEntry>[];
  observer: IntersectionObserver;
}) => {
  const item = observers.get(observer);

  item.callback(changes);
};

interface Props {
  pageType: PageTypes;
  isAmp: boolean;
  service: Services;
  mockOptimizely?: Partial<ReactSDKClient>;
}

const ContextWrap = ({
  pageType,
  isAmp,
  children,
  service,
  mockOptimizely = optimizely,
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

const { error } = console;

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  console.error = jest.fn();

  // @ts-expect-error mocking required for tests
  global.IntersectionObserver = IntersectionObserver;
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  console.error = error;
  observers.clear();
});

describe('Optimizely Page Complete tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function that can be assigned to an element to observe for intersections', () => {
    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <PageCompleteTracking />
      </ContextWrap>,
    );

    const element = container.getElementsByTagName('div')[0];
    const { observe } = getObserverInstance(element);

    expect(observe).toHaveBeenCalledWith(element);
  });

  it('should not send tracking event when element is not in view', async () => {
    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <PageCompleteTracking />
      </ContextWrap>,
    );

    const element = container.getElementsByTagName('div')[0];
    const observerInstance = getObserverInstance(element);

    act(() => {
      triggerIntersection({
        changes: [{ isIntersecting: false }],
        observer: observerInstance,
      });
    });

    await Promise.resolve();

    expect(optimizely.track).not.toHaveBeenCalled();
  });

  it('should not send tracking event when element is in view, but not in experiment variation', async () => {
    const customOptimizely = {
      ...optimizely,
      decideAll: jest.fn(() => ({
        mockExperiment1: { variationKey: 'off' },
        mockExperiment2: { variationKey: 'off' },
      })),
    };
    const { container } = render(
      <ContextWrap
        pageType={ARTICLE_PAGE}
        service="news"
        isAmp={false}
        // fix?
        mockOptimizely={customOptimizely as unknown as ReactSDKClient}
      >
        <PageCompleteTracking />
      </ContextWrap>,
    );

    const element = container.getElementsByTagName('div')[0];
    const observerInstance = getObserverInstance(element);

    act(() => {
      triggerIntersection({
        changes: [{ isIntersecting: true }],
        observer: observerInstance,
      });
    });

    await Promise.resolve();

    expect(optimizely.track).not.toHaveBeenCalled();
  });

  it('should send tracking event when element is in view and in experiment variation', async () => {
    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <PageCompleteTracking />
      </ContextWrap>,
    );

    const element = container.getElementsByTagName('div')[0];
    const observerInstance = getObserverInstance(element);

    act(() => {
      triggerIntersection({
        changes: [{ isIntersecting: true }],
        observer: observerInstance,
      });
    });

    await Promise.resolve();

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(optimizely.track).toHaveBeenCalledTimes(1);
  });
});
