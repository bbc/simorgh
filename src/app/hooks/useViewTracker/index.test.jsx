/* eslint-disable no-console */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import useViewTracker from '.';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import fixtureData from './fixtureData.json';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const elementToObserve = document.createElement('div');
let observerCallback;
const triggerIntersectionIsTrue = () =>
  observerCallback([{ isIntersecting: true }]);
const triggerIntersectionIsFalse = () =>
  observerCallback([{ isIntersecting: false }]);

const observe = jest.fn();
const disconnect = jest.fn();

const { error } = console;

beforeEach(() => {
  jest.useFakeTimers();
  console.error = jest.fn();
  window.IntersectionObserver = jest.fn().mockImplementation(cb => {
    observerCallback = cb;
    return {
      observe,
      disconnect,
    };
  });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  console.error = error;
});

const urlToObject = url => {
  const { origin, pathname, searchParams } = new URL(url);

  return {
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  };
};

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const wrapper = ({ pageData, children, toggles = defaultToggles }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
  >
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider toggles={toggles}>
        <EventTrackingContextProvider pageData={pageData}>
          {children}
        </EventTrackingContextProvider>
      </ToggleContextProvider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('Expected use', () => {
  const trackingData = {
    componentName: 'most-read',
    format: 'CHD=promo::2',
    url: 'http://www.bbc.com/pidgin/tori-51745682',
  };

  it('should return a function that can be assigned to an element to observe', async () => {
    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    await result.current(elementToObserve);

    expect(observe).toHaveBeenCalledWith(elementToObserve);
  });

  it('should not send event to ATI when element is not in view', async () => {
    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    await result.current(elementToObserve);

    act(() => {
      triggerIntersectionIsFalse();
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should skip initialising IntersectionObserver when eventTracking toggle is disabled', async () => {
    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
        toggles: {
          eventTracking: {
            enabled: false,
          },
        },
      },
    });

    await result.current(elementToObserve);

    expect(IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should skip initialising IntersectionObserver when ref is not assigned to element', async () => {
    renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
        toggles: {
          eventTracking: {
            enabled: false,
          },
        },
      },
    });

    expect(IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should send event to ATI and return correct tracking url when element is 50% or more in view for more than 1 second', async () => {
    const { result, rerender } = renderHook(
      () => useViewTracker(trackingData),
      {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      },
    );

    await result.current(elementToObserve);

    act(() => {
      triggerIntersectionIsTrue();
      jest.advanceTimersByTime(1100);
    });

    rerender();

    const [[, options]] = IntersectionObserver.mock.calls;

    expect(IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(options).toEqual({ threshold: [0.5] });
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        ati:
          'PUB-[article-sty]-[most-read]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://www.bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/), // timestamp based value
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'news::pidgin.news.story.51745682.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        s2: '70',
        type: 'AT',
      },
    });
  });

  it('should only send one view event when mutiple elements are viewed', async () => {
    const elementA = document.createElement('div');
    const elementB = document.createElement('div');

    triggerIntersectionIsFalse();

    const { result, rerender } = renderHook(
      () => useViewTracker(trackingData),
      {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      },
    );

    await result.current(elementA);
    await result.current(elementB);

    act(() => {
      triggerIntersectionIsTrue(elementA);
      jest.advanceTimersByTime(1100);
    });
    rerender();
    act(() => {
      triggerIntersectionIsFalse(elementA);
    });
    rerender();

    act(() => {
      triggerIntersectionIsTrue(elementB);
      jest.advanceTimersByTime(1100);
    });
    rerender();
    act(() => {
      triggerIntersectionIsFalse(elementB);
    });
    rerender();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should disconnect IntersectionObserver after event is sent', async () => {
    const { result, rerender } = renderHook(
      () => useViewTracker(trackingData),
      {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      },
    );

    await result.current(elementToObserve);

    act(() => {
      triggerIntersectionIsTrue();
      jest.advanceTimersByTime(1100);
    });

    rerender();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('should not send event to ATI when eventTracking toggle is disabled', async () => {
    triggerIntersectionIsFalse();

    const { result, rerender } = renderHook(
      () => useViewTracker(trackingData),
      {
        wrapper,
        initialProps: {
          pageData: fixtureData,
          toggles: {
            eventTracking: {
              enabled: false,
            },
          },
        },
      },
    );

    await result.current(elementToObserve);

    triggerIntersectionIsTrue();
    rerender();

    act(() => jest.advanceTimersByTime(1100));

    expect(IntersectionObserver).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not send event to ATI when element is in view for less than 1 second', async () => {
    triggerIntersectionIsFalse();

    const { result, rerender } = renderHook(
      () => useViewTracker(trackingData),
      {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      },
    );

    await result.current(elementToObserve);

    // scroll into view
    triggerIntersectionIsTrue();
    rerender();

    act(() => jest.advanceTimersByTime(900));

    // scroll out of view
    triggerIntersectionIsFalse();
    rerender();

    act(() => jest.advanceTimersByTime(1000));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not send event to ATI more than once when element is scrolled in and out of view', async () => {
    triggerIntersectionIsFalse();

    const { result, rerender } = renderHook(
      () => useViewTracker(trackingData),
      {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      },
    );

    await result.current(elementToObserve);

    // scroll element into view
    triggerIntersectionIsTrue();
    rerender();
    act(() => jest.advanceTimersByTime(1100));

    // scroll element out of view
    triggerIntersectionIsFalse();
    rerender();

    // scroll element into view again
    triggerIntersectionIsTrue();
    rerender();
    act(() => jest.advanceTimersByTime(1100));

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(viewEventUrl).toMatch('https://logws1363.ati-host.net');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe('Error handling', () => {
  it('should not throw error if IntersectionObserver is not supported', async () => {
    delete window.IntersectionObserver;

    triggerIntersectionIsTrue();

    const trackingData = undefined;

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    await result.current(elementToObserve);

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
    triggerIntersectionIsTrue();

    const trackingData = undefined;

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    await result.current(elementToObserve);

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no tracking data from the event context provider is passed into hook', async () => {
    triggerIntersectionIsTrue();

    const trackingData = {
      componentName: 'most-read',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: undefined,
      },
    });

    await result.current(elementToObserve);

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
    triggerIntersectionIsTrue();

    const trackingData = {
      foo: 'bar',
    };

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    await result.current(elementToObserve);

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
    triggerIntersectionIsTrue();

    const trackingData = ['unexpected data type'];

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
        toggles: {
          eventTracking: {
            enabled: false,
          },
        },
      },
    });

    await result.current(elementToObserve);

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
