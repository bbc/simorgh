/* eslint-disable no-console */
import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { OptimizelyProvider } from '@optimizely/react-sdk';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';

import OptimizelyArticleCompleteTracking from '.';

jest.mock('#hooks/useOptimizelyVariation', () => jest.fn(() => null));

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
};

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

const getObserverInstance = element => {
  try {
    const [instance] = Array.from(observers).find(([, item]) =>
      item.elements.has(element),
    );

    return instance;
  } catch (e) {
    throw new Error('Failed to find IntersectionObserver for element.');
  }
};

const triggerIntersection = ({ changes, observer }) => {
  const item = observers.get(observer);

  item.callback(changes);
};

const ContextWrap = ({ pageType, isAmp, children, service }) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType={pageType}
    service={service}
    pathname="/pathname"
  >
    <OptimizelyProvider optimizely={optimizely} isServerSide>
      {children}
    </OptimizelyProvider>
  </RequestContextProvider>
);

const { error } = console;

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  console.error = jest.fn();
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
        <OptimizelyArticleCompleteTracking />
      </ContextWrap>,
    );

    const element = container.getElementsByTagName('div')[0];
    const { observe } = getObserverInstance(element);

    expect(observe).toHaveBeenCalledWith(element);
  });

  it('should not send tracking event when element is not in view', async () => {
    useOptimizelyVariation.mockReturnValue('variation_1');

    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <OptimizelyArticleCompleteTracking />
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
    useOptimizelyVariation.mockReturnValue(null);

    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <OptimizelyArticleCompleteTracking />
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

  it('should not return intersecting element when on AMP', async () => {
    useOptimizelyVariation.mockReturnValue('variation_1');

    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp>
        <OptimizelyArticleCompleteTracking />
      </ContextWrap>,
    );

    const elements = container.getElementsByTagName('div');

    await waitFor(() => {
      expect(elements.length).toBe(0);
    });
  });

  it('should send tracking event when element is in view and in experiment variation', async () => {
    useOptimizelyVariation.mockReturnValue('variation_1');

    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <OptimizelyArticleCompleteTracking />
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
