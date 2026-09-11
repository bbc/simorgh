import { createContext, ReactNode } from 'react';
import {
  AllTheProviders,
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import * as serviceContextModule from '../../contexts/ServiceContext';
import useScrollDepthTracker, { getHomePageBounds } from '.';
import fixtureData from '../useViewTracker/fixtureData.json';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const mockDispatchTrackingRequests = jest.fn();
jest.mock('#app/lib/analyticsUtils/dispatchTrackingRequests', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockDispatchTrackingRequests(...args),
}));

const {
  metadata: { atiAnalytics },
} = fixtureData;

// viewport height used in tests; keeps scroll maths simple.
// 1000px element with 100px viewport means each 25% scroll depth is exactly 250px of scrolling, and we can easily calculate the scrollY value needed to reach each threshold.
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
  window.requestAnimationFrame = (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  };
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

// wrapper provides all the React context providers that useScrollDepthTracker
// depends on: request info (isAmp, isLite), service config, feature toggles,
// and ATI analytics data. Pass atiData to enable tracking events to fire.
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
  <AllTheProviders
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={isAmp}
    isLite={isLite}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
    toggles={toggles}
    atiData={atiData}
  >
    {children}
  </AllTheProviders>
);

// buildElement creates a fake DOM element with a fixed size and scroll position.
// We have to mock offsetHeight and getBoundingClientRect because jsdom (the
// browser environment used in Jest) does not perform real layout calculations.
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

// simulateScroll sets the mocked window.scrollY value and fires a scroll event,
// which mimics the user scrolling the page to a specific position.
const simulateScroll = (scrollY: number) => {
  mockScrollY = scrollY;
  window.dispatchEvent(new Event('scroll'));
};

// buildElementWithFigure creates a fake article element that contains a hero
// image (<figure>) at the top. The hook measures scroll depth from the bottom
// of the hero image, so the user has to scroll past it before any events fire.
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
  describe('firing events at scroll depth thresholds', () => {
    it('fires a single event when the user scrolls to 25% depth', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      // Pass the element to the hook's ref callback to start the scroll listener
      act(() => {
        result.current(element);
      });

      // scrollY=150 means the viewport bottom (150 + 100) reaches 250px, which is 25% of 1000px
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

    it('fires all four threshold events in order when the user scrolls to the bottom', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      // scrollY=900 means the viewport bottom (900 + 100) reaches 1000px, the end of the element
      await act(async () => {
        simulateScroll(900);
      });

      // All four thresholds should have been crossed in a single scroll event
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

    it('does not re-send a threshold event if the user scrolls back up and then down again', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      // First scroll to the bottom — all 4 thresholds should fire
      await act(async () => {
        simulateScroll(900);
      });

      // Scroll back to the top
      await act(async () => {
        simulateScroll(0);
      });

      // Scroll to the bottom again — no additional events should fire
      await act(async () => {
        simulateScroll(900);
      });

      // Each threshold is stored in a Set, so it can only be recorded once per session
      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(4);
    });
  });

  describe('when tracking is disabled or unavailable', () => {
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

    it('does not send events when the hook is disabled via the enabled parameter', async () => {
      // In ArticlePage, `enabled` is set to false when a "Continue Reading" button is
      // visible — the article content below the fold is hidden, so there is nothing
      // meaningful to track. This test passes `false` as the second argument to
      // simulate that state, then scrolls to 100% depth and confirms that no events
      // fire regardless of scroll position.
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

    it('begins sending events immediately when the hook becomes enabled (after clicking continue reading)', async () => {
      let enabled = false;

      const { result, rerender } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth', enabled),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      // Scroll to the bottom while disabled — nothing should fire
      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();

      // Enable tracking — the hook immediately checks the current scroll position
      // and fires all thresholds that have already been exceeded
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

    it('does not send events before a DOM element has been attached', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      // Pass null instead of an element — the hook has nothing to measure against
      act(() => {
        result.current(null);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });
  });

  describe('excluding the hero image from scroll depth', () => {
    // With a 300px figure at the top of a 1000px element and viewport height=100:
    // trackingStart = 300, trackingEnd = 1000, trackingHeight = 700
    // 25%  = 300 + 175 = 475  → scrollY = 475 - 100 = 375
    // 50%  = 300 + 350 = 650  → scrollY = 550
    // 75%  = 300 + 525 = 825  → scrollY = 725
    // 100% = 1000             → scrollY = 900

    it('starts the depth measurement from the bottom of the hero image, not the top of the article', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      // 300px hero image at the top of a 1000px article.
      // The trackable area is 700px (300px–1000px), so 25% = 475px from the top.
      // scrollY needed: 475 - viewportHeight (100) = 375
      const element = buildElementWithFigure({
        elementHeight: 1000,
        figureHeight: 300,
        documentTop: 0,
      });

      act(() => {
        result.current(element);
      });

      // Scroll to the 25% mark of the trackable area below the hero image
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

    it('does not count scrolling through the hero image as article reading depth', async () => {
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

      // scrollY=200: viewport bottom (200 + 100) = 300px, exactly the bottom of the 300px hero image.
      // The user has not yet scrolled into the article text at all, so 0% depth.
      await act(async () => {
        simulateScroll(200);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });

    it('measures from the top of the article when there is no hero image', async () => {
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

  describe('when the tracked element or enabled state changes', () => {
    it('starts tracking from zero when the user navigates to a new article', async () => {
      const { result } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth'),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const firstElement = buildElement({ offsetHeight: 1000, documentTop: 0 });

      // Attach the first element and scroll to the bottom
      act(() => {
        result.current(firstElement);
      });

      await act(async () => {
        simulateScroll(900);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(4);

      const secondElement = buildElement({
        offsetHeight: 1000,
        documentTop: 0,
      });

      // Attach a new element — this resets the sent thresholds Set so they can fire again
      act(() => {
        result.current(secondElement);
      });

      await act(async () => {
        simulateScroll(900);
      });

      // 4 from the first element + 4 from the second element
      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(8);
    });

    it('reports all scroll depth the user had already reached at the moment they click continue reading', async () => {
      let enabled = false;

      const { result, rerender } = renderHook(
        () => useScrollDepthTracker('article-scroll-depth', enabled),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement({ offsetHeight: 1000, documentTop: 0 });

      act(() => {
        result.current(element);
      });

      // The user scrolls to 50% while the continue reading button is blocking the page
      await act(async () => {
        simulateScroll(400);
      });

      // Tracking is off, so nothing fires yet
      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();

      // The user clicks continue reading — tracking turns on.
      // The hook immediately evaluates the current scroll position and fires
      // all thresholds that have already been exceeded (25% and 50%).
      enabled = true;
      rerender();

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(2);

      const calledComponentNames = mockDispatchTrackingRequests.mock.calls.map(
        ([{ reverbParameters }]) => reverbParameters.componentName,
      );

      expect(calledComponentNames).toEqual([
        'article-scroll-depth-25',
        'article-scroll-depth-50',
      ]);
    });
  });

  describe('using home page bounds (header to footer)', () => {
    // The hook calls getHomePageBounds once at effect setup, which queries the
    // document for <header> and <footer>. We mock document.querySelector so
    // the tests control where those landmarks appear on the page.
    //
    // Setup for these tests:
    //   header bottom: 100px  (page coordinates)
    //   footer top:   1100px
    //   trackable range: 1000px  (100 → 1100)
    //   viewport height: 100px (VIEWPORT_HEIGHT constant)
    //
    //   25% depth: scrollY = 250  (viewportBottom 350 = 100 + 250)
    //   50% depth: scrollY = 500
    //   75% depth: scrollY = 750
    //  100% depth: scrollY = 1000  (viewportBottom 1100 = footer top)

    const HEADER_BOTTOM = 100;
    const FOOTER_TOP = 1100;

    // buildPageLandmarks mocks document.querySelector so that 'header' and
    // 'footer' return fake elements at fixed page positions.
    const buildPageLandmarks = ({
      headerBottom = HEADER_BOTTOM,
      footerTop = FOOTER_TOP,
    }: {
      headerBottom?: number | null;
      footerTop?: number | null;
    } = {}) => {
      jest.spyOn(document, 'querySelector').mockImplementation(selector => {
        if (selector === 'header' && headerBottom !== null) {
          const header = document.createElement('header');
          header.getBoundingClientRect = jest.fn(
            () =>
              ({
                bottom: headerBottom - window.scrollY,
                top: 0,
                height: headerBottom,
                left: 0,
                right: 0,
                width: 0,
                x: 0,
                y: 0,
                toJSON: jest.fn(),
              }) as DOMRect,
          );
          return header;
        }
        if (selector === 'footer' && footerTop !== null) {
          const footer = document.createElement('footer');
          footer.getBoundingClientRect = jest.fn(
            () =>
              ({
                top: footerTop - window.scrollY,
                bottom: footerTop - window.scrollY + 100,
                height: 100,
                left: 0,
                right: 0,
                width: 0,
                x: 0,
                y: 0,
                toJSON: jest.fn(),
              }) as DOMRect,
          );
          return footer;
        }
        return null;
      });
    };

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('fires a single event when the user scrolls to 25% of the content area', async () => {
      buildPageLandmarks();

      const { result } = renderHook(
        () =>
          useScrollDepthTracker(
            'homepage-scroll-depth',
            true,
            getHomePageBounds,
          ),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      // The tracked element is just the <main> container — getHomePageBounds
      // ignores it and queries the document for header/footer instead.
      const element = buildElement();

      act(() => {
        result.current(element);
      });

      // scrollY=250: viewportBottom (250 + 100) = 350px = header bottom (100) + 25% of 1000px
      await act(async () => {
        simulateScroll(250);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(1);
      expect(mockDispatchTrackingRequests).toHaveBeenCalledWith(
        expect.objectContaining({
          reverbParameters: expect.objectContaining({
            componentName: 'homepage-scroll-depth-25',
          }),
        }),
      );
    });

    it('does not count scrolling through the header as content reading depth', async () => {
      buildPageLandmarks();

      const { result } = renderHook(
        () =>
          useScrollDepthTracker(
            'homepage-scroll-depth',
            true,
            getHomePageBounds,
          ),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement();

      act(() => {
        result.current(element);
      });

      // scrollY=0: viewportBottom (0 + 100) = 100px, exactly the bottom of the header.
      // The user has not entered the content area at all, so 0% depth.
      await act(async () => {
        simulateScroll(0);
      });

      expect(mockDispatchTrackingRequests).not.toHaveBeenCalled();
    });

    it('fires all four events when the user scrolls through all the content to the footer', async () => {
      buildPageLandmarks();

      const { result } = renderHook(
        () =>
          useScrollDepthTracker(
            'homepage-scroll-depth',
            true,
            getHomePageBounds,
          ),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement();

      act(() => {
        result.current(element);
      });

      // scrollY=1000: viewportBottom (1000 + 100) = 1100px = footer top, so 100% depth
      await act(async () => {
        simulateScroll(1000);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(4);

      const calledComponentNames = mockDispatchTrackingRequests.mock.calls.map(
        ([{ reverbParameters }]) => reverbParameters.componentName,
      );

      expect(calledComponentNames).toEqual([
        'homepage-scroll-depth-25',
        'homepage-scroll-depth-50',
        'homepage-scroll-depth-75',
        'homepage-scroll-depth-100',
      ]);
    });

    it('uses the top of the page as the tracking start if no header is found', async () => {
      // Without a header, startY defaults to 0 and the full document is measured.
      // footer top = 1100, so the trackable range is 0 → 1100 (1100px).
      // 25% = 275px from the top → scrollY = 275 - 100 = 175
      buildPageLandmarks({ headerBottom: null });

      const { result } = renderHook(
        () =>
          useScrollDepthTracker(
            'homepage-scroll-depth',
            true,
            getHomePageBounds,
          ),
        { wrapper: props => wrapper({ ...props, atiData: atiAnalytics }) },
      );

      const element = buildElement();

      act(() => {
        result.current(element);
      });

      await act(async () => {
        simulateScroll(175);
      });

      expect(mockDispatchTrackingRequests).toHaveBeenCalledTimes(1);
      expect(mockDispatchTrackingRequests).toHaveBeenCalledWith(
        expect.objectContaining({
          reverbParameters: expect.objectContaining({
            componentName: 'homepage-scroll-depth-25',
          }),
        }),
      );
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
