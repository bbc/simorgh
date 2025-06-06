/* eslint-disable no-console */
import React, { useContext } from 'react';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';

import { STORY_PAGE, HOME_PAGE, LIVE_PAGE } from '../../routes/utils/pageTypes';
import { EventTrackingContext } from '.';
import fixtureData from './fixtureData.json';

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const defaultATIData = {
  contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
  contentType: 'index-home',
  pageIdentifier: 'kyrgyz.page',
  pageTitle: 'pageTitle',
};

beforeEach(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

const TestComponent = () => {
  const trackingData = useContext(EventTrackingContext);

  return <div data-testid="test-component">{JSON.stringify(trackingData)}</div>;
};

describe('Expected use', () => {
  it('should provide tracking data to all child components', () => {
    const {
      metadata: { atiAnalytics },
    } = fixtureData;

    render(<TestComponent />, {
      atiData: atiAnalytics,
      service: 'pidgin',
      toggles: defaultToggles,
      pageType: STORY_PAGE,
      pathname: '/pidgin/tori-51745682',
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({
      campaignID: 'article-sty',
      pageIdentifier: 'news::pidgin.news.story.51745682.page',
      platform: 'canonical',
      producerId: '70',
      producerName: 'PIDGIN',
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
    });
  });

  it('should provide tracking data to all child components using the ATI metadata block', () => {
    render(<TestComponent />, {
      atiData: defaultATIData,
      pageType: HOME_PAGE,
      pathname: '/kyrgyz',
      service: 'kyrgyz',
      toggles: defaultToggles,
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({
      campaignID: 'index-home',
      pageIdentifier: 'kyrgyz.page',
      platform: 'canonical',
      producerId: '58',
      producerName: 'KYRGYZ',
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
    });
  });

  it('should provide an empty object if the eventTracking toggle is disabled', () => {
    const eventTrackingToggle = {
      eventTracking: {
        enabled: false,
      },
    };

    render(<TestComponent />, {
      atiData: defaultATIData,
      toggles: eventTrackingToggle,
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object if atiData is missing and eventTracking toggle is disabled', () => {
    const eventTrackingToggle = {
      eventTracking: {
        enabled: false,
      },
    };

    render(<TestComponent />, {
      toggles: eventTrackingToggle,
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object for NextJS pages if atiData is missing', () => {
    render(<TestComponent />, {
      isNextJs: true,
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object for NextJS pages if atiData is provided', () => {
    render(<TestComponent />, {
      isNextJs: true,
      atiData: defaultATIData,
      pageType: LIVE_PAGE,
      pathname: '/kyrgyz/live/c000000000o',
      service: 'kyrgyz',
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object if atiData is missing', () => {
    render(<TestComponent />, {
      toggles: defaultToggles,
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });

  it('should provide an empty object if atiData properties are undefined', () => {
    render(<TestComponent />, {
      atiData: undefined,
      toggles: defaultToggles,
    });

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
  });
});

describe('Error handling', () => {
  it('should not provide tracking props when there is no page type campaign ID', async () => {
    let errorMessage;
    try {
      render(<TestComponent />, {
        atiData: defaultATIData,
        // @ts-expect-error - testing handling of a page type that doesn't exist
        pageType: 'funky-page-type',
        toggles: defaultToggles,
      });
    } catch (error: unknown) {
      const { message } = error as Error;
      errorMessage = message;
    }

    const testEl = screen.getByTestId('test-component');
    const trackingData = JSON.parse(testEl.textContent as string);

    expect(trackingData).toEqual({});
    expect(errorMessage).toBeUndefined();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "ATI Event Tracking Error: Could not get the page type's campaign name",
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

export default defaultATIData;
