/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../ServiceContext';
import { EventTrackingContextProvider, EventTrackingContext } from '.';
import fixtureData from './fixtureData.json';

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

// eslint-disable-next-line react/prop-types
const Wrapper = ({
  children,
  pageData = fixtureData,
  pageType = STORY_PAGE,
  toggles = defaultToggles,
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={pageType}
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
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent);

    expect(trackingData).toEqual({
      campaignID: 'article-sty',
      pageIdentifier: 'news::pidgin.news.story.51745682.page',
      platform: 'canonical',
      producerId: '70',
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
      <Wrapper toggles={eventTrackingToggle}>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent);

    expect(trackingData).toEqual({});
  });
});

describe('Error handling', () => {
  it('should not throw error and not log error when no pageData is passed into context provider', async () => {
    let errorMessage;

    try {
      render(
        <Wrapper pageData={null}>
          <TestComponent />
        </Wrapper>,
      );
    } catch ({ message }) {
      errorMessage = message;
    }

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent);

    expect(trackingData).toEqual({});
    expect(errorMessage).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not provide tracking props when there is no page type campaign ID', async () => {
    let errorMessage;

    try {
      render(
        <Wrapper pageType="funky-page-type">
          <TestComponent />
        </Wrapper>,
      );
    } catch ({ message }) {
      errorMessage = message;
    }

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent);

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
