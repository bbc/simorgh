import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInView } from 'react-intersection-observer';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import * as atiUrl from '#containers/ATIAnalytics/atiUrl';
import useViewTracker from '.';

import { CORRESPONDENT_STORY_PAGE } from '#app/routes/utils/pageTypes';
import pageData from './pageData.json';

jest.mock('react-intersection-observer');
// jest.mock('#containers/ATIAnalytics/atiUrl');
// jest.useFakeTimers();
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllTimers();
});

const REQUIRED_TIME_IN_VIEW = 1000;
const elementRefFn = jest.fn();
const setIntersectionObserved = () =>
  useInView.mockReturnValue([elementRefFn, true]);
const setIntersectionNotObserved = () =>
  useInView.mockReturnValue([elementRefFn, false]);

it('should return a ref used for tracking', async () => {
  setIntersectionNotObserved();

  const data = { componentName: 'mostRead', pageData };
  const { result } = renderHook(() => useViewTracker(data));

  expect(result.current.trackRef).toBe(elementRefFn);
});

it.only(`should call buildATIEventTrackUrl when element is 50% or more in view for more than ${
  REQUIRED_TIME_IN_VIEW / 1000
} seconds`, async () => {
  setIntersectionNotObserved();
  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = { componentName: 'mostRead', pageData };
  const wrapper = ({ children }) => (
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      isAmp
      pageType={CORRESPONDENT_STORY_PAGE}
      service="afrique"
      pathname="/blah"
    >
      <ServiceContextProvider service="afrique">
        {children}
      </ServiceContextProvider>
    </RequestContextProvider>
  );
  const { rerender } = renderHook(() => useViewTracker(data), { wrapper });

  setIntersectionObserved();
  rerender();

  await act(() => wait(REQUIRED_TIME_IN_VIEW + 100));

  expect(useInView).toHaveBeenCalledWith({ threshold: 0.5 });
  expect(spy).toHaveBeenCalledTimes(2);

  const [event, view] = spy.mock.results;

  expect(Object.fromEntries(new URLSearchParams(event.value))).toEqual({
    ati:
      'PUB-[afrique-mostRead]-[mostRead-most-read-navigate~view]-[]-[PAR=container-mostRead~CHD=link]-[news::pidgin.news.story.51745682.page]-[]-[]-[https://www.bbc.com/mundo/something]',
    hl: '${timestamp}',
    lng: '${browserLanguage}',
    p: 'news::pidgin.news.story.51745682.page',
    r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
    re: '${availableScreenWidth}x${availableScreenHeight}',
    type: 'AT',
    undefineds: '598343',
  });

  expect(Object.fromEntries(new URLSearchParams(view.value))).toEqual({
    ati:
      'PUB-[afrique-mostRead]-[mostRead-most-read-navigate~view]-[]-[PAR=container-mostRead~CHD=link]-[news::pidgin.news.story.51745682.page]-[]-[]-[https://www.bbc.com/mundo/something]',
    hl: '${timestamp}',
    lng: '${browserLanguage}',
    p: 'news::pidgin.news.story.51745682.page',
    r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
    re: '${availableScreenWidth}x${availableScreenHeight}',
    type: 'AT',
    undefineds: '598343',
  });
});

it(`should not call buildATIEventTrackUrl when element is 50% or more in view for less than ${
  REQUIRED_TIME_IN_VIEW / 1000
} seconds`, async () => {
  setIntersectionNotObserved();
  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = { componentName: 'mostRead', pageData };
  const wrapper = ({ children }) => (
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      isAmp
      pageType={CORRESPONDENT_STORY_PAGE}
      service="afrique"
      pathname="/blah"
    >
      <ServiceContextProvider service="afrique">
        {children}
      </ServiceContextProvider>
    </RequestContextProvider>
  );
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
  const wrapper = ({ children }) => (
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      isAmp
      pageType={CORRESPONDENT_STORY_PAGE}
      service="afrique"
      pathname="/blah"
    >
      <ServiceContextProvider service="afrique">
        {children}
      </ServiceContextProvider>
    </RequestContextProvider>
  );
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
