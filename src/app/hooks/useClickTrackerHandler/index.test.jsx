/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import useClickTrackerHandler from '.';
import pidginData from './fixtureData/tori-51745682.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

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
        atc:
          'PUB-[article-sty]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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

  it('should not send a tracking request on click if the toggle is disabled and the component is not on the exclusion list', () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    const disabledToggle = {
      eventTracking: {
        enabled: false,
      },
    };

    const { getByTestId } = render(
      <WithContexts pageData={pidginData} toggles={disabledToggle}>
        <TestComponent hookProps={defaultProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    expect(spyFetch).not.toHaveBeenCalled();
  });

  it('should not send a tracking request on click if the toggle is enabled but the component is on the exclusion list', () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    const customToggle = {
      eventTracking: {
        enabled: true,
        value: 'component-name,other-component',
      },
    };
    const customHookProps = {
      componentName: 'component-name',
      format: 'CHD=promo::1',
    };

    const { getByTestId } = render(
      <WithContexts pageData={pidginData} toggles={customToggle}>
        <TestComponent hookProps={customHookProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    expect(spyFetch).not.toHaveBeenCalled();
  });

  it('should send event to ATI when the exclusion list contains a different component name', () => {
    const customToggle = {
      eventTracking: {
        enabled: true,
        value: 'other-component',
      },
    };
    const customHookProps = {
      componentName: 'component-name',
      format: 'CHD=promo::1',
    };

    const { getByTestId } = render(
      <WithContexts pageData={pidginData} toggles={customToggle}>
        <TestComponent hookProps={customHookProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[article-sty]-[component-name]-[]-[CHD=promo::1]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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
        atc:
          'PUB-[article-sty]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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
        <div onClick={handleClick({ format: 'CHD=promo::1' })}>
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
        atc:
          'PUB-[article-sty]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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
        <TestComponent hookProps={{ ...defaultProps, href: url }} />
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

  it('should send user to the specified href when click target is non-navigational', async () => {
    const url = 'https://bbc.com/sport';
    const { getByTestId } = render(
      <WithContexts pageData={pidginData}>
        <TestComponent hookProps={{ ...defaultProps, href: url }} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    await waitFor(() => {
      expect(window.location.assign).toHaveBeenCalledTimes(1);
      expect(window.location.assign).toHaveBeenCalledWith(url);
    });
  });
});

describe('Error handling', () => {
  it('should not throw error and should send event to ATI when the exclusion list is undefined', () => {
    const customToggle = {
      eventTracking: {
        enabled: true,
        value: undefined,
      },
    };
    const customHookProps = {
      componentName: 'component-name',
      format: 'CHD=promo::1',
    };

    const { getByTestId, container } = render(
      <WithContexts pageData={pidginData} toggles={customToggle}>
        <TestComponent hookProps={customHookProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[article-sty]-[component-name]-[]-[CHD=promo::1]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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

  it('should not throw error and should send event to ATI when the exclusion list is empty', () => {
    const customToggle = {
      eventTracking: {
        enabled: true,
        value: '',
      },
    };
    const customHookProps = {
      componentName: 'component-name',
      format: 'CHD=promo::1',
    };

    const { getByTestId, container } = render(
      <WithContexts pageData={pidginData} toggles={customToggle}>
        <TestComponent hookProps={customHookProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[article-sty]-[component-name]-[]-[CHD=promo::1]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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

  it('should not throw error and should send event to ATI when the exclusion list is an unexpected data type', () => {
    const customToggle = {
      eventTracking: {
        enabled: true,
        value: ['component-name'],
      },
    };
    const customHookProps = {
      componentName: 'component-name',
      format: 'CHD=promo::1',
    };

    const { getByTestId, container } = render(
      <WithContexts pageData={pidginData} toggles={customToggle}>
        <TestComponent hookProps={customHookProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByTestId('test-component')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[article-sty]-[component-name]-[]-[CHD=promo::1]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
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
