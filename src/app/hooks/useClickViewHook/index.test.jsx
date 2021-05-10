import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useInView } from 'react-intersection-observer';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import pidginData from './fixtureData/tori-51745682.json';
import useClickViewHook from '.';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

jest.mock('react-intersection-observer');

const { location } = window;

const urlToObject = url => {
  const { origin, pathname, searchParams } = new URL(url);

  return {
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  };
};

const elementRef = jest.fn();
const setIntersectionObserved = () =>
  useInView.mockReturnValue([elementRef, true]);
const setIntersectionNotObserved = () =>
  useInView.mockReturnValue([elementRef, false]);

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  delete window.location;
  window.location = {
    href: 'http://www.bbc.com/pidgin/tori-51745682',
    assign: jest.fn(),
  };
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  window.location = location;
});

const WithContexts = ({
  children,
  service = 'pidgin',
  pathname = '/pidgin/tori-51745682',
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    pathname={pathname}
    service={service}
  >
    <ServiceContextProvider service={service}>
      {children}
    </ServiceContextProvider>
  </RequestContextProvider>
);

const TestComponent = ({ trackingData }) => {
  const { clickRef, viewRef } = useClickViewHook(trackingData);

  return (
    <div ref={viewRef} data-testid="test-component">
      <a ref={clickRef} href="bbc.com">
        Hello
      </a>
    </div>
  );
};

const trackingData = {
  pageData: pidginData,
  componentName: 'top-stories',
  campaignName: 'cps_wsoj',
  format: 'CHD=promo::2',
  url: 'http://www.bbc.com/pidgin/tori-51745682',
};

const expected = {
  origin: 'https://logws1363.ati-host.net',
  pathname: '/',
  searchParams: {
    hl: expect.stringMatching(/^.+?x.+?x.+?$/),
    idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
    lng: 'en-US',
    p: 'news::pidgin.news.story.51745682.page',
    r: '0x0x24x24',
    re: '1024x768',
    s: '598343',
    s2: '70',
    type: 'AT',
  },
};

describe('useClickViewHook', () => {
  setIntersectionNotObserved();

  it('should send tracking data to ATI on click event', () => {
    const { getByText } = render(
      <WithContexts>
        <TestComponent trackingData={trackingData} />
      </WithContexts>,
    );
    act(() => userEvent.click(getByText('Hello')));

    const [[atiUrl]] = fetch.mock.calls;

    expect(urlToObject(atiUrl)).toEqual({
      ...expected,
      searchParams: {
        ...expected.searchParams,
        atc:
          'PUB-[cps_wsoj]-[top-stories]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://www.bbc.com/pidgin/tori-51745682]',
      },
    });
  });

  it('should send tracking data to ATI on view event', () => {
    setIntersectionObserved();

    render(
      <WithContexts>
        <TestComponent trackingData={trackingData} />
      </WithContexts>,
    );

    act(() => jest.advanceTimersByTime(1100));

    const [[atiUrl]] = fetch.mock.calls;

    expect(urlToObject(atiUrl)).toEqual({
      ...expected,
      searchParams: {
        ...expected.searchParams,
        ati:
          'PUB-[cps_wsoj]-[top-stories]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://www.bbc.com/pidgin/tori-51745682]',
      },
    });
  });
});
