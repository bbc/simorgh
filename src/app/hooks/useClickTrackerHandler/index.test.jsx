/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createContext } from 'react';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import * as trackingToggle from '#hooks/useTrackingToggle';
import constructATIUrl from '#app/lib/analyticsUtils/staticATITracking/constructATIUrl';
import * as WindowHelper from '#src/testHelpers/WindowHelper';
import * as useOptimizelyVariation from '../useOptimizelyVariation';
import {
  AllTheProviders,
  render,
  renderHook,
  act,
  fireEvent,
} from '../../components/react-testing-library-with-providers';
import * as serviceContextModule from '../../contexts/ServiceContext';
import pidginData from './fixtureData/tori-51745682.json';
import useClickTrackerHandler from '.';

const trackingToggleSpy = jest.spyOn(trackingToggle, 'default');

const { location } = window;
const { error } = console;

const urlToObject = url => {
  const { origin, pathname, searchParams } = new URL(url);

  return {
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  };
};

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const eventTrackingData = {
  componentName: 'brand',
  format: 'CHD=promo::2',
};

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const reverbMock = {
  isReady: jest.fn(),
  initialise: jest.fn(() => Promise.resolve()),
  viewEvent: jest.fn(),
  userActionEvent: jest.fn(),
};

const defaultOptimizely = {
  track: jest.fn(),
  close: jest.fn(),
  user: { attributes: { foo: 'bar' }, id: 'test' },
};

// eslint-disable-next-line no-underscore-dangle
window.__reverb = {
  __reverbLoadedPromise: Promise.resolve(reverbMock),
};

const wrapper = ({ children }) => (
  <AllTheProviders
    bbcOrigin="https://www.test.bbc.com"
    pageData={pidginData}
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
    toggles={defaultToggles}
  >
    {children}
  </AllTheProviders>
);

const TestComponent = ({ hookProps }) => {
  const handleClick = useClickTrackerHandler(hookProps);

  return (
    <div data-testid="test-component" {...handleClick}>
      <a href="https://bbc.com/pidgin">Link</a>
      <button type="button">Button</button>
    </div>
  );
};

const TestComponentSingleLink = ({ hookProps }) => {
  const handleClick = useClickTrackerHandler(hookProps);

  return (
    <div data-testid="test-component">
      <a href="https://bbc.com/pidgin" {...handleClick}>
        Link
      </a>
    </div>
  );
};

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => '12345678-abcd-1fed-0123-a1b2c3d4e5f6'),
);

WindowHelper.beforeAll();
WindowHelper.afterAll();

beforeEach(() => {
  jest.clearAllMocks();
  console.error = jest.fn();

  jest.spyOn(useOptimizelyVariation, 'default').mockReturnValue(null);

  jest.replaceProperty(
    serviceContextModule,
    'ServiceContext',
    createContext({
      atiAnalyticsProducerId: '70',
      atiAnalyticsProducerName: 'PIDGIN',
      service: 'pidgin',
      useReverb: false,
    }),
  );
});

afterEach(() => {
  window.location = location;
  console.error = error;
});

describe('useClickTrackerHandler', () => {
  describe('Click tracking', () => {
    it('should return a function', () => {
      const { result } = renderHook(
        () => useClickTrackerHandler(eventTrackingData),
        {
          wrapper,
        },
      );

      const { onClick } = result.current;

      expect(onClick).toBeInstanceOf(Function);
    });

    it('should send a single tracking request on click', async () => {
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const spyFetch = jest.spyOn(global, 'fetch');
      const { getByTestId } = render(
        <TestComponent hookProps={eventTrackingData} />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      expect(spyFetch).not.toHaveBeenCalled();

      await act(() => userEvent.click(getByTestId('test-component')));

      expect(spyFetch).toHaveBeenCalledTimes(1);

      await act(() => userEvent.click(getByTestId('test-component')));

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

    it('should not send a tracking request if the toggle is disabled', async () => {
      trackingToggleSpy
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false);

      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByTestId } = render(
        <TestComponent hookProps={eventTrackingData} />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      await act(() => userEvent.click(getByTestId('test-component')));

      expect(global.fetch).toHaveBeenCalledTimes(0);
    });

    it('should send tracking request on click of child element (button)', async () => {
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByText } = render(
        <TestComponent hookProps={eventTrackingData} />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      await act(() => userEvent.click(getByText('Button')));

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

    it('should send tracking request with the URL of the next page on click of a link', async () => {
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const TestLink = () => {
        const { onClick: handleClick } =
          useClickTrackerHandler(eventTrackingData);

        return (
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="https://www.bbc.com/pidgin/articles/c93gd1yxng1o"
              onClick={handleClick}
            >
              Link
            </a>
          </div>
        );
      };

      const { getByText } = render(<TestLink />, {
        atiData: atiAnalytics,
        pageData: pidginData,
        pageType: STORY_PAGE,
        pathname: '/pidgin',
        service: 'pidgin',
        toggles: defaultToggles,
      });

      await act(() => userEvent.click(getByText('Link')));

      const [[viewEventUrl]] = global.fetch.mock.calls;

      expect(urlToObject(viewEventUrl)).toEqual({
        origin: 'https://logws1363.ati-host.net',
        pathname: '/',
        searchParams: {
          atc: 'PUB-[article-sty]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[https://www.bbc.com/pidgin/articles/c93gd1yxng1o]',
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

      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const TestComponentContainer = () => {
        const handleClick = useClickTrackerHandler(parentHookProps);

        return (
          <div {...handleClick}>
            <TestComponent hookProps={eventTrackingData} />
          </div>
        );
      };

      const { getByText } = render(<TestComponentContainer />, {
        atiData: atiAnalytics,
        pageData: pidginData,
        pageType: STORY_PAGE,
        pathname: '/pidgin',
        service: 'pidgin',
        toggles: defaultToggles,
      });

      await act(() => userEvent.click(getByText('Button')));

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

      const {
        metadata: { atiAnalytics },
      } = pidginData;

      global.fetch = jest.fn(() => {
        throw new Error('Failed to fetch');
      });

      const { getByText } = render(
        <TestComponentSingleLink
          hookProps={{ ...eventTrackingData, href: url }}
        />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      await act(() => userEvent.click(getByText('Link')));

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toThrow('Failed to fetch');

      await waitFor(() => {
        expect(window.location.assign).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledWith(url);
      });
    });

    it('should not send tracking request on right click', () => {
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByText } = render(
        <TestComponent hookProps={eventTrackingData} />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      act(() => {
        fireEvent.contextMenu(getByText('Button'));
      });

      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not navigate to the next page if preventNavigation is true', async () => {
      const url = 'https://bbc.com/pidgin';
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByText } = render(
        <TestComponent
          hookProps={{
            ...eventTrackingData,
            href: url,
            preventNavigation: true,
          }}
        />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      await act(() => userEvent.click(getByText('Link')));

      await waitFor(() => {
        expect(window.location.assign).not.toHaveBeenCalled();
      });
    });

    it('should be able to override the campaignID that is sent to ATI', async () => {
      const spyFetch = jest.spyOn(global, 'fetch');
      const campaignID = 'custom-campaign';
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByTestId } = render(
        <TestComponent hookProps={{ ...eventTrackingData, campaignID }} />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      await act(() => userEvent.click(getByTestId('test-component')));

      const [[viewEventUrl]] = spyFetch.mock.calls;

      expect(urlToObject(viewEventUrl).searchParams.atc).toEqual(
        'PUB-[custom-campaign]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[]',
      );
    });

    it('should use componentName property if provided in eventTrackingData object', async () => {
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByTestId } = render(
        <OptimizelyProvider optimizely={defaultOptimizely} isServerSide>
          <TestComponent
            hookProps={{
              ...eventTrackingData,
              experimentName: 'mockExperiment',
              experimentVariant: 'variation_a',
              sendOptimizelyEvents: true,
            }}
          />
        </OptimizelyProvider>,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      fireEvent.click(getByTestId('test-component'));

      expect(defaultOptimizely.track).toHaveBeenCalledTimes(1);
      expect(defaultOptimizely.track).toHaveBeenCalledWith(
        'brand-clicks',
        defaultOptimizely.user.id,
        { foo: 'bar' },
      );
    });

    it('should fire event to Optimizely if optimizely object exists', async () => {
      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByTestId } = render(
        <OptimizelyProvider optimizely={defaultOptimizely} isServerSide>
          <TestComponent
            hookProps={{
              ...eventTrackingData,
              experimentName: 'mockExperiment',
              experimentVariant: 'variation_a',
              sendOptimizelyEvents: true,
            }}
          />
        </OptimizelyProvider>,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      fireEvent.click(getByTestId('test-component'));

      expect(defaultOptimizely.track).toHaveBeenCalledTimes(1);
      expect(defaultOptimizely.track).toHaveBeenCalledWith(
        'brand-clicks',
        defaultOptimizely.user.id,
        { foo: 'bar' },
      );
    });

    it('should not fire event to Optimizely if optimizely object is undefined', async () => {
      const mockOptimizelyTrack = jest.fn();
      const mockOptimizely = undefined;

      const {
        metadata: { atiAnalytics },
      } = pidginData;

      const { getByTestId } = render(
        <TestComponent
          hookProps={{ ...eventTrackingData, ...mockOptimizely }}
        />,
        {
          atiData: atiAnalytics,
          pageData: pidginData,
          pageType: STORY_PAGE,
          pathname: '/pidgin',
          service: 'pidgin',
          toggles: defaultToggles,
        },
      );

      fireEvent.click(getByTestId('test-component'));

      expect(mockOptimizelyTrack).toHaveBeenCalledTimes(0);
    });
  });
});

describe('Click tracking - Reverb', () => {
  beforeEach(() => {
    jest.replaceProperty(
      serviceContextModule,
      'ServiceContext',
      createContext({
        atiAnalyticsProducerId: '70',
        atiAnalyticsProducerName: 'PIDGIN',
        service: 'pidgin',
        useReverb: true,
      }),
    );
  });

  it.each([
    {
      title: 'should trigger a beacon for a click event',
      trackingData: { ...eventTrackingData },
      expectedItemEvent: {
        link: 'https://www.bbc.com/pidgin/articles/c93gd1yxng1o',
        name: 'brand',
      },
    },
    {
      title: 'should trigger a beacon for an item level click event',
      trackingData: {
        ...eventTrackingData,
        componentName: 'portrait-video',
        itemTracker: {
          type: 'portrait-video-promo',
          text: 'Rollercoaster facts... while riding a rollercoaster',
          position: 1,
          duration: 73000,
          resourceId: 'test-resource-id',
        },
      },
      expectedItemEvent: {
        duration: 73000,
        link: 'https://www.bbc.com/pidgin/articles/c93gd1yxng1o',
        name: 'portrait-video',
        position: 1,
        resource_id: 'test-resource-id',
        text: 'Rollercoaster facts... while riding a rollercoaster',
        type: 'portrait-video-promo',
      },
    },
  ])('$title', async ({ trackingData, expectedItemEvent }) => {
    const {
      metadata: { atiAnalytics },
    } = pidginData;

    const TestLink = () => {
      const { onClick: handleClick } = useClickTrackerHandler(trackingData);

      return (
        <div>
          <a
            href="https://www.bbc.com/pidgin/articles/c93gd1yxng1o"
            onClick={handleClick}
          >
            Link
          </a>
        </div>
      );
    };

    const { getByText } = render(<TestLink />, {
      atiData: atiAnalytics,
      pageData: pidginData,
      pageType: STORY_PAGE,
      pathname: '/pidgin',
      service: 'pidgin',
      toggles: defaultToggles,
    });

    await act(() => userEvent.click(getByText('Link')));

    expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
    expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
      'viewability',
      '',
      {
        event: { action: 'select', category: 'viewability' },
        group: { name: 'article-sty', type: trackingData.componentName },
        item: expectedItemEvent,
      },
      undefined,
      undefined,
      true,
    );

    jest.restoreAllMocks();
  });
});

describe('Error handling', () => {
  it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
    const {
      metadata: { atiAnalytics },
    } = pidginData;

    const { container, getByText } = render(
      <TestComponent hookProps={undefined} />,
      {
        atiData: atiAnalytics,
        pageData: pidginData,
        pageType: STORY_PAGE,
        pathname: '/pidgin',
        service: 'pidgin',
        toggles: defaultToggles,
      },
    );

    await act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no pageData is provided from context providers', async () => {
    const { container, getByText } = render(
      <TestComponent hookProps={eventTrackingData} />,
      {
        atiData: undefined,
        pageData: undefined,
        pageType: STORY_PAGE,
        pathname: '/pidgin',
        service: 'pidgin',
        toggles: defaultToggles,
      },
    );

    await act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
    const trackingData = {
      foo: 'bar',
    };

    const {
      metadata: { atiAnalytics },
    } = pidginData;

    const { container, getByText } = render(
      <TestComponent hookProps={trackingData} />,
      {
        atiData: atiAnalytics,
        pageData: pidginData,
        pageType: STORY_PAGE,
        pathname: '/pidgin',
        service: 'pidgin',
        toggles: defaultToggles,
      },
    );

    await act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
    const trackingData = ['unexpected data type'];

    const {
      metadata: { atiAnalytics },
    } = pidginData;

    const { container, getByText } = render(
      <TestComponent hookProps={trackingData} />,
      {
        atiData: atiAnalytics,
        pageData: pidginData,
        pageType: STORY_PAGE,
        pathname: '/pidgin',
        service: 'pidgin',
        toggles: defaultToggles,
      },
    );

    await act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe('Lite Site - Click tracking', () => {
  it('Returns a valid ati tracking url given the input props', () => {
    const { result } = renderHook(
      () =>
        constructATIUrl({
          eventTrackingData: {
            ...eventTrackingData,
            campaignID: 'custom-campaign',
          },
          eventType: 'click',
          isStatic: true,
        }),
      {
        wrapper,
      },
    );

    expect(result.current).toContain(
      'atc=PUB-[custom-campaign]-[brand]-[]-[CHD=promo::2]-[]-[]-[]-[]&type=AT',
    );
  });
});
