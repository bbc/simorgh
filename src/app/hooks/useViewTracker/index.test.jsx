/* eslint-disable no-console */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInView } from 'react-intersection-observer';

import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import useViewTracker from '.';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import fixtureData from './fixtureData.json';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

jest.mock('react-intersection-observer');

const { error } = console;

beforeEach(() => {
  jest.useFakeTimers();
  console.error = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  console.error = error;
});

const elementRef = jest.fn();
const setIntersectionObserved = () =>
  useInView.mockReturnValue([elementRef, true]);
const setIntersectionNotObserved = () =>
  useInView.mockReturnValue([elementRef, false]);
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

  it('should return a ref used for tracking', async () => {
    setIntersectionNotObserved();

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    expect(result.current).toBe(elementRef);
  });

  it('should not send event to ATI when element is not in view', async () => {
    setIntersectionNotObserved();

    renderHook(() => useViewTracker(trackingData), { wrapper });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should skip initialising IntersectionObserver when eventTracking toggle is disabled', () => {
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

    expect(useInView).toHaveBeenCalledWith({ threshold: 0.5, skip: true });
  });

  it('should send event to ATI and return correct tracking url when element is 50% or more in view for more than 1 second', async () => {
    setIntersectionNotObserved();

    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    setIntersectionObserved();
    rerender();

    act(() => jest.advanceTimersByTime(1100));

    expect(useInView).toHaveBeenCalledWith({ threshold: 0.5, skip: false });
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

  it('should not send event to ATI when eventTracking toggle is disabled', async () => {
    setIntersectionNotObserved();

    const { rerender } = renderHook(() => useViewTracker(trackingData), {
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

    setIntersectionObserved();
    rerender();

    act(() => jest.advanceTimersByTime(1100));

    expect(useInView).toHaveBeenCalledWith({ threshold: 0.5, skip: true });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not send event to ATI when eventTracking toggle is enabled but the component name is on the exclusion list', async () => {
    setIntersectionNotObserved();

    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
        toggles: {
          eventTracking: {
            enabled: false,
            value: 'most-read,other-component',
          },
        },
      },
    });

    setIntersectionObserved();
    rerender();

    act(() => jest.advanceTimersByTime(1100));

    expect(useInView).toHaveBeenCalledWith({ threshold: 0.5, skip: true });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should send event to ATI when eventTracking toggle is enabled and a different component name is on the exclusion list', async () => {
    setIntersectionNotObserved();

    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
        toggles: {
          eventTracking: {
            enabled: true,
            value: 'other-component',
          },
        },
      },
    });

    setIntersectionObserved();
    rerender();

    act(() => jest.advanceTimersByTime(1100));

    expect(useInView).toHaveBeenCalledWith({ threshold: 0.5, skip: false });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should not send event to ATI when element is in view for less than 1 second', async () => {
    setIntersectionNotObserved();

    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    // scroll into view
    setIntersectionObserved();
    rerender();

    act(() => jest.advanceTimersByTime(900));

    // scroll out of view
    setIntersectionNotObserved();
    rerender();

    act(() => jest.advanceTimersByTime(1000));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not send event to ATI more than once when element is scrolled in and out of view', async () => {
    setIntersectionNotObserved();

    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    // scroll element into view
    setIntersectionObserved();
    rerender();
    act(() => jest.advanceTimersByTime(1100));

    // scroll element out of view
    setIntersectionNotObserved();
    rerender();

    // scroll element into view again
    setIntersectionObserved();
    rerender();
    act(() => jest.advanceTimersByTime(1100));

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(viewEventUrl).toMatch('https://logws1363.ati-host.net');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe('Error handling', () => {
  it('should not throw error and should send event to ATI when exclusion list is undefined', async () => {
    setIntersectionObserved();

    const trackingData = undefined;

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
        toggles: {
          eventTracking: {
            enabled: true,
            value: undefined,
          },
        },
      },
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and should send event to ATI when exclusion list is an unexpected data type', async () => {
    setIntersectionObserved();

    const trackingData = undefined;

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
        toggles: {
          eventTracking: {
            enabled: true,
            value: ['most-read'],
          },
        },
      },
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
    setIntersectionObserved();

    const trackingData = undefined;

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no tracking data from the event context provider is passed into hook', async () => {
    setIntersectionObserved();

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

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
    setIntersectionObserved();

    const trackingData = {
      foo: 'bar',
    };

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
      initialProps: {
        pageData: fixtureData,
      },
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
    setIntersectionObserved();

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

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
