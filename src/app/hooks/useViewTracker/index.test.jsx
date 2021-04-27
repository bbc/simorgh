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

  expect(event.value).toMatchInlineSnapshot(
    `"undefineds=598343&p=news%3A%3Apidgin.news.story.51745682.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=\${timestamp}&lng=\${browserLanguage}&ati=PUB-%5Bafrique-mostRead%5D-%5BmostRead-most-read-navigate~view%5D-%5B%5D-%5BPAR%3Dcontainer-mostRead~CHD%3Dlink%5D-%5Bnews%3A%3Apidgin.news.story.51745682.page%5D-%5B%5D-%5B%5D-%5Bhttps%3A%2F%2Fwww.bbc.com%2Fmundo%2Fsomething%5D&type=AT"`,
  );
  expect(view.value).toMatchInlineSnapshot(
    `"undefineds=598343&p=news%3A%3Apidgin.news.story.51745682.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=\${timestamp}&lng=\${browserLanguage}&ati=PUB-%5Bafrique-mostRead%5D-%5BmostRead-most-read-navigate~view%5D-%5B%5D-%5BPAR%3Dcontainer-mostRead~CHD%3Dlink%5D-%5Bnews%3A%3Apidgin.news.story.51745682.page%5D-%5B%5D-%5B%5D-%5Bhttps%3A%2F%2Fwww.bbc.com%2Fmundo%2Fsomething%5D&type=AT"`,
  );
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
