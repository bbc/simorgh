/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import * as trackingToggle from '#hooks/useTrackingToggle';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import pidginData from './fixtureData/tori-51745682.json';
import useClickTrackerHandler from '.';

const trackingToggleSpy = jest.spyOn(trackingToggle, 'default');

const { location } = window;

const urlToObject = url => {
  const { origin, pathname, searchParams } = new URL(url);

  return {
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  };
};

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const defaultProps = {
  componentName: 'brand',
  format: 'CHD=promo::2',
};

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const WithContexts = ({ pageData, children, toggles = defaultToggles }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
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

const wrapper = ({ children }) => (
  <WithContexts pageData={pidginData}>{children}</WithContexts>
);

const TestComponent = ({ hookProps }) => {
  const handleClick = useClickTrackerHandler(hookProps);

  return (
    <div data-testid="test-component" onClick={handleClick}>
      <a href="https://bbc.com/pidgin">Link</a>
      <button type="button">Button</button>
    </div>
  );
};

const TestComponentSingleLink = ({ hookProps }) => {
  const handleClick = useClickTrackerHandler(hookProps);

  return (
    <div data-testid="test-component">
      <a href="https://bbc.com/pidgin" onClick={handleClick}>
        Link
      </a>
    </div>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  delete window.location;
  window.location = {
    href: 'http://bbc.com/pidgin/tori-51745682',
    assign: jest.fn(),
  };
});

afterEach(() => {
  window.location = location;
});

describe('Click tracking', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useClickTrackerHandler(defaultProps), {
      wrapper,
    });

    expect(result.current).toBeInstanceOf(Function);
  });

  it('should send a single tracking request on click', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    const { getByTestId } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={defaultProps} />
      </WithContexts>,
    );

    expect(spyFetch).not.toHaveBeenCalled();

    act(() => userEvent.click(getByTestId('test-component')));

    expect(spyFetch).toHaveBeenCalledTimes(1);

    act(() => userEvent.click(getByTestId('test-component')));

    expect(spyFetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = spyFetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc: 'PUB-[article-sty]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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
    });
  });

  it('should not send a tracking request if the toggle is disabled', () => {
    trackingToggleSpy.mockImplementationOnce(() => false);

    const { getByTestId } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={defaultProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it('should send tracking request on click of child element (button)', async () => {
    const { getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={defaultProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc: 'PUB-[article-sty]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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
    });

    jest.restoreAllMocks();
  });

  it('should only track clicks on the child component if clicks are tracked on both a parent and child', async () => {
    const parentHookProps = {
      componentName: 'header',
    };

    const TestComponentContainer = () => {
      const handleClick = useClickTrackerHandler(parentHookProps);

      return (
        <div onClick={handleClick}>
          <TestComponent hookProps={defaultProps} />
        </div>
      );
    };

    const { getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponentContainer />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc: 'PUB-[article-sty]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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
    });

    jest.restoreAllMocks();
  });

  it('should allow the user to navigate after clicking on a tracked link even if the tracking request fails', async () => {
    const url = 'https://bbc.com/pidgin';

    global.fetch = jest.fn(() => {
      throw new Error('Failed to fetch');
    });

    const { getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponentSingleLink hookProps={{ ...defaultProps, href: url }} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Link')));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toThrow('Failed to fetch');

    await waitFor(() => {
      expect(window.location.assign).toHaveBeenCalledTimes(1);
      expect(window.location.assign).toHaveBeenCalledWith(url);
    });
  });

  it('should not send tracking request on right click', () => {
    const { getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={defaultProps} />
      </WithContexts>,
    );

    act(() => {
      fireEvent.contextMenu(getByText('Button'));
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not navigate to the next page if preventNavigation is true', async () => {
    const url = 'https://bbc.com/pidgin';
    const { getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent
          hookProps={{ ...defaultProps, href: url, preventNavigation: true }}
        />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Link')));

    await waitFor(() => {
      expect(window.location.assign).not.toHaveBeenCalled();
    });
  });

  it('should be able to override the campaignID that is sent to ATI', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    const campaignID = 'custom-campaign';
    const { getByTestId } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={{ ...defaultProps, campaignID }} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    const [[viewEventUrl]] = spyFetch.mock.calls;

    expect(urlToObject(viewEventUrl).searchParams.atc).toEqual(
      'PUB-[custom-campaign]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
    );
  });

  it('should fire event to Optimizely if optimizely object exists', async () => {
    const mockOptimizelyTrack = jest.fn();
    const mockUserId = 'test';
    const mockAttributes = { foo: 'bar' };
    const mockOverrideAttributes = {
      ...mockAttributes,
      [`clicked_${OPTIMIZELY_CONFIG.viewClickAttributeId}`]: true,
    };
    const mockOptimizely = {
      optimizely: {
        track: mockOptimizelyTrack,
        user: { attributes: mockAttributes, id: mockUserId },
      },
    };

    const { getByTestId } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={{ ...defaultProps, ...mockOptimizely }} />
      </WithContexts>,
    );

    fireEvent.click(getByTestId('test-component'));

    expect(mockOptimizelyTrack).toHaveBeenCalledTimes(1);
    expect(mockOptimizelyTrack).toHaveBeenCalledWith(
      'component_clicks',
      mockUserId,
      mockOverrideAttributes,
    );
  });

  it('should not fire event to Optimizely if optimizely object is undefined', async () => {
    const mockOptimizelyTrack = jest.fn();
    const mockOptimizely = undefined;

    const { getByTestId } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={{ ...defaultProps, ...mockOptimizely }} />
      </WithContexts>,
    );

    fireEvent.click(getByTestId('test-component'));

    expect(mockOptimizelyTrack).toHaveBeenCalledTimes(0);
  });
});

describe('Error handling', () => {
  it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
    const { container, getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={undefined} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no pageData is provided from context providers', async () => {
    const { container, getByText } = render(
      <WithContexts pageData={undefined}>
        <TestComponent hookProps={defaultProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
    const trackingData = {
      foo: 'bar',
    };

    const { container, getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={trackingData} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
    const trackingData = ['unexpected data type'];

    const { container, getByText } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={trackingData} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
