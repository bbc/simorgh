import { createContext, ReactNode } from 'react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import * as serviceContextModule from '../../contexts/ServiceContext';
import useScrollDepthTracker from '.';
import fixtureData from '../useViewTracker/fixtureData.json';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const mockDispatchTrackingRequests = jest.fn();
jest.mock('#app/lib/analyticsUtils/dispatchTrackingRequests', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockDispatchTrackingRequests(...args),
}));

const defaultOptimizely = {
  track: jest.fn(),
  user: { attributes: { foo: 'bar' }, id: 'test' },
} as unknown as ReactSDKClient;

const {
  metadata: { atiAnalytics },
} = fixtureData;

// viewport height used in tests; keeps scroll maths simple.
// With documentTop=0 and innerHeight=100 on a 1000px element:
//   initial mount (scrollY=0): depth = 10% → no thresholds triggered
//   25% depth: scrollY=150  (viewportBottom=250)
//   50% depth: scrollY=400
//   75% depth: scrollY=650
//   100% depth: scrollY=900
const VIEWPORT_HEIGHT = 100;

let mockScrollY = 0;

beforeAll(() => {
  Object.defineProperty(window, 'scrollY', {
    get: () => mockScrollY,
    configurable: true,
  });
  Object.defineProperty(window, 'innerHeight', {
    value: VIEWPORT_HEIGHT,
    writable: true,
    configurable: true,
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  mockScrollY = 0;

  jest.replaceProperty(
    serviceContextModule,
    'ServiceContext',
    // @ts-expect-error override service context for tests
    createContext({
      atiAnalyticsProducerId: '70',
      atiAnalyticsProducerName: 'PIDGIN',
      service: 'pidgin',
    }),
  );
});

const defaultToggles: Toggles = {
  eventTracking: {
    enabled: true,
  },
};

const wrapper = ({
  atiData,
  children,
  toggles = defaultToggles,
  isAmp = false,
  isLite = false,
}: {
  atiData?: ATIData;
  children?: ReactNode | null;
  toggles?: Toggles;
  isAmp?: boolean;
  isLite?: boolean;
}) => (
  <OptimizelyProvider optimizely={defaultOptimizely} isServerSide>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      pageType={STORY_PAGE}
      isAmp={isAmp}
      isLite={isLite}
      service="pidgin"
      pathname="/pidgin/tori-51745682"
    >
      <serviceContextModule.ServiceContextProvider service="pidgin">
        <ToggleContextProvider toggles={toggles}>
          <EventTrackingContextProvider atiData={atiData}>
            {children}
          </EventTrackingContextProvider>
        </ToggleContextProvider>
      </serviceContextModule.ServiceContextProvider>
    </RequestContextProvider>
  </OptimizelyProvider>
);

const buildElement = ({
  offsetHeight = 1000,
  documentTop = 0,
}: {
  offsetHeight?: number;
  documentTop?: number;
} = {}) => {
  const element = document.createElement('div');

  Object.defineProperty(element, 'offsetHeight', { value: offsetHeight });
  element.getBoundingClientRect = jest.fn(
    () =>
      ({
        top: documentTop - window.scrollY,
        bottom: documentTop + offsetHeight - window.scrollY,
        height: offsetHeight,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      }) as DOMRect,
  );

  return element;
};

// depth formula: (innerHeight - getBoundingClientRect().top) / offsetHeight * 100
// With documentTop=0 and innerHeight=100:
//  25%  → scrollY=150  (viewportBottom=250)
//  50%  → scrollY=400
//  75%  → scrollY=650
//  100% → scrollY=900

const simulateScroll = (scrollY: number) => {
  mockScrollY = scrollY;
  window.dispatchEvent(new Event('scroll'));
};

const buildElementWithFigure = ({
  elementHeight = 1000,
  figureHeight = 300,
  documentTop = 0,
}: {
  elementHeight?: number;
  figureHeight?: number;
  documentTop?: number;
} = {}) => {
  const element = document.createElement('div');
  const figure = document.createElement('figure');

  Object.defineProperty(element, 'offsetHeight', { value: elementHeight });
  element.getBoundingClientRect = jest.fn(
    () =>
      ({
        top: documentTop - window.scrollY,
        bottom: documentTop + elementHeight - window.scrollY,
        height: elementHeight,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      }) as DOMRect,
  );

  // figure sits at the top of the element (documentTop to documentTop+figureHeight)
  figure.getBoundingClientRect = jest.fn(
    () =>
      ({
        top: documentTop - window.scrollY,
        bottom: documentTop + figureHeight - window.scrollY,
        height: figureHeight,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      }) as DOMRect,
  );

  element.querySelector = jest.fn(selector =>
    selector === 'figure' ? figure : null,
  ) as typeof element.querySelector;

  return element;
};

describe('useScrollDepthTracker', () => {
  describe('threshold events', () => {
    it('sends a view event when 25% of the element has been scrolled past', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      // scroll so viewport bottom is at 25% of element (scrollY=150, viewportBottom=250)
      await act(async () => {
        simulateScroll(150);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(1);
      expect(mockDispatchTrackingRequests).toHaveBeenCalledWith(
        expect.objectContaining({
          reverbParameters: expect.objectContaining({
            componentName: 'article-scroll-depth-25',
            type: 'view',
          }),
        }),
      );
    });

    it('sends view events for all thresholds when 100% is reached', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      // scroll so viewport bottom reaches the end of the element (scrollY=900, viewportBottom=1000)
      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(4);

      const calledComponentNames = mockDispatchTrackingRequests.mock.calls.map(
        ([{ reverbParameters }]) => reverbParameters.componentName,
      );

      expect(calledComponentNames).toEqual([
        'article-scroll-depth-25',
        'article-scroll-depth-50',
        'article-scroll-depth-75',
        'article-scroll-depth-100',
      ]);
    });

    it('only fires each threshold event once even when scrolled past multiple times', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(900);
      });

      await act(async () => {
        simulateScroll(0);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(4);
    });
  });

  describe('tracking not enabled', () => {
    it('does not send events when the eventTracking toggle is disabled', async () => {
      const disabledToggles: Toggles = {
        eventTracking: { enabled: false },
      };

      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        {
          wrapper: props =>
            wrapper({
              ...props,
              atiData: atiAnalytics,
              toggles: disabledToggles,
            }),
        },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });

    it('does not send events when enabled is false', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth', false),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });

    it('starts sending events once enabled changes from false to true', async () => {
      let enabled = false;

      const { result, rerender } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth', enabled),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();

      enabled = true;
      rerender();

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(4);
    });

    it('does not send events on AMP pages', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        {
          wrapper: props =>
            wrapper({ ...props, atiData: atiAnalytics, isAmp: true }),
        },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });

    it('does not send events on Lite pages', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        {
          wrapper: props =>
            wrapper({ ...props, atiData: atiAnalytics, isLite: true }),
        },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });

    it('does not send events when the element is null', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      act(() => {
        result.current(null);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });
  });

  describe('lead image offset', () => {
    // With a 300px figure at the top of a 1000px element and viewport height=100:
    // trackingStart = 300, trackingEnd = 1000, trackingHeight = 700
    // 25%  = 300 + 175 = 475  → scrollY = 475 - 100 = 375
    // 50%  = 300 + 350 = 650  → scrollY = 550
    // 75%  = 300 + 525 = 825  → scrollY = 725
    // 100% = 1000             → scrollY = 900

    it('starts tracking from the bottom of the first figure, not the top of the element', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElementWithFigure({
        elementHeight: 1000,
        figureHeight: 300,
        documentTop: 0,
      });

      act(() => {
        result.current(element);
      });

      // Scrolled to 25% of trackable area (below the figure)
      await act(async () => {
        simulateScroll(375);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(1);
      expect(mockDispatchTrackingRequests).toHaveBeenCalledWith(
        expect.objectContaining({
          reverbParameters: expect.objectContaining({
            componentName: 'article-scroll-depth-25',
          }),
        }),
      );
    });

    it('does not fire 25% when viewport bottom is still within the lead image', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElementWithFigure({
        elementHeight: 1000,
        figureHeight: 300,
        documentTop: 0,
      });

      act(() => {
        result.current(element);
      });

      // scrollY=200: viewportBottom=300, which is only at the bottom of the figure (0% of text)
      await act(async () => {
        simulateScroll(200);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });

    it('sends all four events when the element without a figure is fully scrolled', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      // No figure — falls back to measuring the full element
      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(4);
    });
  });

  describe('cleanup', () => {
    it('removes the scroll listener when the component unmounts', async () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { result, unmount } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
      );
    });
  });
});
