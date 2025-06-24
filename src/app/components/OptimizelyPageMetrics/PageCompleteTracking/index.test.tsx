/* eslint-disable no-console */
import React, { PropsWithChildren } from 'react';
import { render, act } from '@testing-library/react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import { PageTypes, Services } from '#app/models/types/global';

import PageCompleteTracking from '.';

jest.mock('#hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
} satisfies Partial<ReactSDKClient>;

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
    (useOptimizelyVariation as jest.Mock).mockReturnValue('variation_1');

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
    (useOptimizelyVariation as jest.Mock).mockReturnValue(null);

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

    expect(optimizely.track).not.toHaveBeenCalled();
  });

  it('should send tracking event when element is in view and in experiment variation', async () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue('variation_1');

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
