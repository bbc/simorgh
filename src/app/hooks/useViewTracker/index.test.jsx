/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInView } from 'react-intersection-observer';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import * as atiUrl from '#containers/ATIAnalytics/atiUrl';
import useViewTracker from '.';

import { CORRESPONDENT_STORY_PAGE } from '#app/routes/utils/pageTypes';
import pageData from './pageData.json';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

jest.mock('react-intersection-observer');
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllTimers();
});

const elementRefFn = jest.fn();
const setIntersectionObserved = () =>
  useInView.mockReturnValue([elementRefFn, true]);
const setIntersectionNotObserved = () =>
  useInView.mockReturnValue([elementRefFn, false]);
const REQUIRED_TIME_IN_VIEW = 1000;
const getUrlParams = url => {
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
    isAmp
    pageType={CORRESPONDENT_STORY_PAGE}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
  >
    <ServiceContextProvider service="pidgin">{children}</ServiceContextProvider>
  </RequestContextProvider>
);

it('should return a ref used for tracking', async () => {
  setIntersectionNotObserved();

  const data = { componentName: 'mostRead', pageData };
  const { result } = renderHook(() => useViewTracker(data), { wrapper });

  expect(result.current.trackRef).toBe(elementRefFn);
});

it.only(`should call buildATIEventTrackUrl when element is 50% or more in view for more than ${
  REQUIRED_TIME_IN_VIEW / 1000
} seconds`, async () => {
  setIntersectionNotObserved();
  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = { componentName: 'mostRead', pageData };
  const { rerender } = renderHook(() => useViewTracker(data), { wrapper });

  setIntersectionObserved();
  rerender();

  await act(() => wait(REQUIRED_TIME_IN_VIEW + 100));

  expect(useInView).toHaveBeenCalledWith({ threshold: 0.5 });
  expect(spy).toHaveBeenCalledTimes(2);

  const [componentViewEvent, pageViewEvent] = spy.mock.results;

  expect(getUrlParams(componentViewEvent.value)).toEqual({
    origin: 'https://logws1363.ati-host.net',
    pathname: '/',
    searchParams: {
      ati:
        'PUB-[pidgin-mostRead]-[mostRead-most-read-navigate~view]-[]-[PAR=container-mostRead~CHD=link]-[news::pidgin.news.story.51745682.page]-[]-[]-[https://www.bbc.com/mundo/something]',
      hl: '${timestamp}',
      lng: '${browserLanguage}',
      p: 'news::pidgin.news.story.51745682.page',
      r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
      re: '${availableScreenWidth}x${availableScreenHeight}',
      s: '598343',
      s2: '70',
      type: 'AT',
    },
  });

  expect(getUrlParams(pageViewEvent.value)).toEqual({
    origin: 'https://logws1363.ati-host.net',
    pathname: '/',
    searchParams: {
      ati:
        'PUB-[pidgin-mostRead]-[mostRead-most-read-navigate~view]-[]-[PAR=container-mostRead~CHD=link]-[news::pidgin.news.story.51745682.page]-[]-[]-[https://www.bbc.com/mundo/something]',
      hl: '${timestamp}',
      lng: '${browserLanguage}',
      p: 'news::pidgin.news.story.51745682.page',
      r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
      re: '${availableScreenWidth}x${availableScreenHeight}',
      s: '598343',
      s2: '70',
      type: 'AT',
    },
  });
});

it(`should not call buildATIEventTrackUrl when element is 50% or more in view for less than ${
  REQUIRED_TIME_IN_VIEW / 1000
} seconds`, async () => {
  setIntersectionNotObserved();
  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = { componentName: 'mostRead', pageData };

  const { rerender } = renderHook(() => useViewTracker(data), { wrapper });

  setIntersectionObserved();
  rerender();

  await act(() => wait(REQUIRED_TIME_IN_VIEW - 100));

  expect(useInView).toHaveBeenCalledWith({ threshold: 0.5 });
  expect(spy).not.toHaveBeenCalledWith();
});

it('should not call buildATIEventTrackUrl more than once', async () => {
  setIntersectionNotObserved();
  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = { componentName: 'mostRead', pageData };
  const { rerender } = renderHook(() => useViewTracker(data), { wrapper });

  setIntersectionObserved();
  rerender();

  await act(() => wait(REQUIRED_TIME_IN_VIEW + 100));

  setIntersectionNotObserved();
  rerender();
  setIntersectionObserved();
  rerender();
  await act(() => wait(REQUIRED_TIME_IN_VIEW + 100));

  expect(useInView).toHaveBeenCalledWith({ threshold: 0.5 });
  expect(spy.mock.results[0].value).toHaveBeenCalledWith({ blah: 'foo' });
  expect(spy).toHaveBeenCalledTimes(1);
});
