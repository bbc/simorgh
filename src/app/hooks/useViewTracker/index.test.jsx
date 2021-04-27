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

delete window.location;
window.location = { href: 'http://bbc.com/pidgin/tori-51745682' };
process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

jest.mock('react-intersection-observer');
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

beforeEach(() => {
  jest.clearAllMocks();
});

const elementRefFn = jest.fn();
const setIntersectionObserved = () =>
  useInView.mockReturnValue([elementRefFn, true]);
const setIntersectionNotObserved = () =>
  useInView.mockReturnValue([elementRefFn, false]);
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

  const data = {
    pageData,
    componentName: 'mostRead',
    actionLabel: 'most-read-view',
  };
  const { result } = renderHook(() => useViewTracker(data), { wrapper });

  expect(result.current.trackRef).toBe(elementRefFn);
});

it('should not call buildATIEventTrackUrl when element is not in view', async () => {
  setIntersectionNotObserved();

  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = {
    pageData,
    componentName: 'mostRead',
    actionLabel: 'most-read-view',
  };

  renderHook(() => useViewTracker(data), { wrapper });

  expect(spy).not.toHaveBeenCalled();
});

it('should call buildATIEventTrackUrl and return correct tracking url when element is 50% or more in view for more than 1 second', async () => {
  setIntersectionNotObserved();

  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = {
    pageData,
    componentName: 'mostRead',
    actionLabel: 'most-read-view',
  };
  const { rerender } = renderHook(() => useViewTracker(data), { wrapper });

  setIntersectionObserved();
  rerender();

  await act(() => wait(1100));

  expect(useInView).toHaveBeenCalledWith({ threshold: 0.5 });
  expect(spy).toHaveBeenCalledTimes(2);

  const [componentViewEvent, pageViewEvent] = spy.mock.results;

  expect(urlToObject(componentViewEvent.value)).toEqual({
    origin: 'https://logws1363.ati-host.net',
    pathname: '/',
    searchParams: {
      ati:
        'PUB-[pidgin-mostRead]-[mostRead-most-read-view~view]-[]-[PAR=container-mostRead~CHD=link]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
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

  expect(urlToObject(pageViewEvent.value)).toEqual({
    origin: 'https://logws1363.ati-host.net',
    pathname: '/',
    searchParams: {
      ati:
        'PUB-[pidgin-mostRead]-[mostRead-most-read-view~view]-[]-[PAR=container-mostRead~CHD=link]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
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

it('should not call buildATIEventTrackUrl when element is in view for less than 1 second', async () => {
  setIntersectionNotObserved();

  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = {
    pageData,
    componentName: 'mostRead',
    actionLabel: 'most-read-view',
  };

  const { rerender } = renderHook(() => useViewTracker(data), { wrapper });

  setIntersectionObserved();
  rerender();

  await act(() => wait(900));

  expect(spy).not.toHaveBeenCalled();
});

it('should not call buildATIEventTrackUrl more than twice (once for component view and once for page view) when element is scrolled in and out of view', async () => {
  setIntersectionNotObserved();

  const spy = jest.spyOn(atiUrl, 'buildATIEventTrackUrl');
  const data = {
    pageData,
    componentName: 'mostRead',
    actionLabel: 'most-read-view',
  };
  const { rerender } = renderHook(() => useViewTracker(data), { wrapper });

  // scroll element into view
  setIntersectionObserved();
  rerender();
  await act(() => wait(1100));

  // scroll element out of view
  setIntersectionNotObserved();
  rerender();

  // scroll element into view again
  setIntersectionObserved();
  rerender();
  await act(() => wait(1100));

  expect(spy).toHaveBeenCalledTimes(2);
});
