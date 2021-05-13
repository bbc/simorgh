/* eslint-disable no-console */
import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { EventTrackingContextProvider, EventTrackingContext } from '.';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import fixtureData from './fixtureData.json';

// eslint-disable-next-line react/prop-types
const Wrapper = ({ pageData, children }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
  >
    <ServiceContextProvider service="pidgin">
      <EventTrackingContextProvider pageData={pageData}>
        {children}
      </EventTrackingContextProvider>
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
  it('should provide tracking data to all child component', () => {
    render(
      <Wrapper pageData={fixtureData}>
        <TestComponent />
      </Wrapper>,
    );

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent);

    expect(trackingData).toEqual({
      pageIdentifier: 'news::pidgin.news.story.51745682.page',
      platform: 'canonical',
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
    });
  });
});

describe('Error handling', () => {
  it('should not throw error when no pageData is passed into context provider', async () => {
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
    const trackingData = JSON.parse(testEl.textContent);

    expect(trackingData).toEqual({});
    expect(errorMessage).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error when unexpected data is passed into contect provider', async () => {
    let errorMessage;

    try {
      render(
        <Wrapper pageData={['unexpected data']}>
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
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
