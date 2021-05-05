/* eslint-disable no-console */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInView } from 'react-intersection-observer';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import useViewTracker from '.';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import pageData from './pageData.json';

delete window.location;
window.location = { href: 'http://bbc.com/pidgin/tori-51745682' };
process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

jest.mock('react-intersection-observer');

beforeEach(() => {
  jest.useFakeTimers();
  console.error = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
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

const wrapper = ({ children }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
  >
    <ServiceContextProvider service="pidgin">{children}</ServiceContextProvider>
  </RequestContextProvider>
);

describe('Expected use', () => {
  it('should return a ref used for tracking', async () => {
    setIntersectionNotObserved();

    const trackingData = {
      pageData,
      componentName: 'most-read',
      campaignName: 'cps_wsoj',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };
    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    expect(result.current.trackRef).toBe(elementRef);
  });

  it('should not send event to ATI when element is not in view', async () => {
    setIntersectionNotObserved();

    const trackingData = {
      pageData,
      componentName: 'most-read',
      campaignName: 'cps_wsoj',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };

    renderHook(() => useViewTracker(trackingData), { wrapper });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should send event to ATI and return correct tracking url when element is 50% or more in view for more than 1 second', async () => {
    setIntersectionNotObserved();

    const trackingData = {
      pageData,
      componentName: 'most-read',
      campaignName: 'cps_wsoj',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };
    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    setIntersectionObserved();
    rerender();

    act(() => jest.advanceTimersByTime(1100));

    expect(useInView).toHaveBeenCalledWith({ threshold: 0.5 });
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        ati:
          'PUB-[cps_wsoj]-[most-read]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://www.bbc.com/pidgin/tori-51745682]',
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

  it('should not send event to ATI when element is in view for less than 1 second', async () => {
    setIntersectionNotObserved();

    const trackingData = {
      pageData,
      componentName: 'most-read',
      campaignName: 'cps_wsoj',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };

    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
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

    const trackingData = {
      pageData,
      componentName: 'most-read',
      campaignName: 'cps_wsoj',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };
    const { rerender } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
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

    expect(viewEventUrl).toMatch(process.env.SIMORGH_ATI_BASE_URL);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe('Error handling', () => {
  it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
    setIntersectionObserved();

    const trackingData = undefined;

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no pageData passed into hook', async () => {
    setIntersectionObserved();

    const trackingData = {
      pageData: {},
      componentName: 'most-read',
      campaignName: 'cps_wsoj',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
    setIntersectionObserved();

    const trackingData = {
      foo: 'bar',
    };

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
    setIntersectionObserved();

    const trackingData = ['unexpected data type'];

    const { result } = renderHook(() => useViewTracker(trackingData), {
      wrapper,
    });

    act(() => jest.advanceTimersByTime(1100));

    expect(result.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
