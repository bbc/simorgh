/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { PropsWithChildren, useContext } from 'react';
import { render, screen } from '@testing-library/react';

import { RequestContextProvider } from '../RequestContext';
import { ToggleContextProvider } from '../ToggleContext';
import { STORY_PAGE, HOME_PAGE } from '../../routes/utils/pageTypes';
import { PageTypes, Services } from '../../models/types/global';
import { PageData, ATIData } from '../../components/ATIAnalytics/types';
import { ServiceContextProvider } from '../ServiceContext';
import { EventTrackingContextProvider, EventTrackingContext } from '.';
import fixtureData from './fixtureData.json';

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const defaultATIData = {
  analytics: {
    contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
    contentType: 'index-home',
    pageIdentifier: 'kyrgyz.page',
  },
  title: 'pageTitle',
};

type Props = {
  isNextJs?: boolean;
  atiData?: ATIData;
  pageData?: PageData;
  pageType?: PageTypes;
  pathname?: string;
  service?: Services;
  toggles?: {
    [key: string]: {
      enabled: boolean;
      value?: string;
    };
  };
};

// eslint-disable-next-line react/prop-types
const Wrapper = ({
  children,
  atiData,
  pageData,
  isNextJs = false,
  pageType = STORY_PAGE,
  pathname = '/pidgin/tori-51745682',
  service = 'pidgin',
  toggles = defaultToggles,
}: PropsWithChildren<Props>) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={pageType}
    isAmp={false}
    isApp={false}
    isNextJs={isNextJs}
    service={service}
    pathname={pathname}
  >
    <ServiceContextProvider service={service}>
      <ToggleContextProvider toggles={toggles}>
        <EventTrackingContextProvider atiData={atiData} data={pageData}>
          {children}
        </EventTrackingContextProvider>
      </ToggleContextProvider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

const { error } = console;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = error;
});

const TestComponent = () => {
  const trackingData = useContext(EventTrackingContext);

  return <div data-testid="test-component">{JSON.stringify(trackingData)}</div>;
};

describe('Expected use', () => {
  it('should provide tracking data to all child components', () => {
    render(
      <Wrapper pageData={fixtureData}>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({
      campaignID: 'article-sty',
      pageIdentifier: 'news::pidgin.news.story.51745682.page',
      platform: 'canonical',
      producerId: '70',
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
    });
  });

  it('should provide tracking data to all child components using the ATI metadata block', () => {
    render(
      <Wrapper
        atiData={defaultATIData}
        pageType={HOME_PAGE}
        pathname="/kyrgyz"
        service="kyrgyz"
      >
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({
      campaignID: 'index-home',
      pageIdentifier: 'kyrgyz.page',
      platform: 'canonical',
      producerId: '58',
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
    });
  });

  it('should provide an empty object if the eventTracking toggle is disabled', () => {
    const eventTrackingToggle = {
      eventTracking: {
        enabled: false,
      },
    };

    render(
      <Wrapper pageData={fixtureData} toggles={eventTrackingToggle}>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object if pageData and atiData are missing and eventTracking toggle is disabled', () => {
    const eventTrackingToggle = {
      eventTracking: {
        enabled: false,
      },
    };

    render(
      <Wrapper toggles={eventTrackingToggle}>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object for NextJS pages if pageData and atiData are missing', () => {
    render(
      <Wrapper isNextJs>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object for NextJS pages if pageData is provided', () => {
    render(
      <Wrapper pageData={fixtureData} isNextJs>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object for NextJS pages if atiData is provided', () => {
    render(
      <Wrapper
        atiData={defaultATIData}
        pageType={HOME_PAGE}
        pathname="/kyrgyz"
        service="kyrgyz"
        isNextJs
      >
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object if pageData and atiData are missing - 1', () => {
    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object if atiData properties are undefined', () => {
    render(
      <Wrapper
        atiData={{
          analytics: undefined,
          title: undefined,
        }}
      >
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });
});

describe('Error handling', () => {
  it('should not throw error and not log error when no pageData is passed into context provider', async () => {
    let errorMessage;

    try {
      render(
        <Wrapper>
          <TestComponent />
        </Wrapper>,
      );
    } catch ({ message }) {
      errorMessage = message;
    }

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
    expect(errorMessage).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not provide tracking props when there is no page type campaign ID', async () => {
    let errorMessage;

    try {
      render(
        // @ts-expect-error - testing handling of a page type that does not exist
        <Wrapper pageData={fixtureData} pageType="funky-page-type">
          <TestComponent />
        </Wrapper>,
      );
    } catch ({ message }) {
      errorMessage = message;
    }

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
    expect(errorMessage).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "ATI Event Tracking Error: Could not get the page type's campaign name",
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
