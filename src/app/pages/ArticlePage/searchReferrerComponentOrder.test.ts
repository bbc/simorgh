import { createElement } from 'react';
import { renderHook, waitFor, act } from '@testing-library/react';
import onClient from '#app/lib/utilities/onClient';
import { GROUP_3_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';
import { Article } from '#app/models/types/optimo';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import ArticlePage from './ArticlePage';
import useMobileOJComponentOrder from './useMobileOJComponentOrder';
import {
  OJComponentKey,
  SEARCH_COMPONENT_ORDER,
  SEARCH_MID_ARTICLE_COMPONENT,
  SearchVariant,
} from './searchReferrerComponentOrder';

jest.mock('#app/components/ThemeProvider');
jest.mock('#app/components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => null;
  return ChartbeatAnalytics;
});
jest.mock('#app/components/ATIAnalytics', () => {
  const ATIAnalytics = () => null;
  return ATIAnalytics;
});

/* eslint-disable global-require, @typescript-eslint/no-var-requires */
jest.mock(
  '#app/components/MostRead',
  () => () =>
    require('react').createElement('div', { 'data-testid': 'most-read' }),
);
jest.mock(
  '#app/components/TopicDiscovery',
  () => () =>
    require('react').createElement('div', { 'data-testid': 'topic-discovery' }),
);
jest.mock(
  '#app/components/RelatedContentSection',
  () => () =>
    require('react').createElement('div', { 'data-testid': 'related-content' }),
);
jest.mock(
  '#app/components/PortraitVideoCarousel',
  () => () =>
    require('react').createElement('div', {
      'data-testid': 'portrait-video-carousel',
    }),
);
jest.mock(
  '#app/components/LocationBasedTopicOJ',
  () => () =>
    require('react').createElement('div', {
      'data-testid': 'location-based-topic-oj',
    }),
);
/* eslint-enable global-require, @typescript-eslint/no-var-requires */

jest.mock('#app/components/OptimizelyPageMetrics');
jest.mock('#app/hooks/useScrollDepthTracker', () => jest.fn(() => null));
jest.mock('#hooks/useMediaQuery', () => jest.fn());
jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));
jest.mock(
  '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes',
);
jest.mock('#app/lib/utilities/onClient', () => ({
  __esModule: true,
  default: jest.fn(),
  onClient: jest.fn(() => true),
}));

const mockOnClient = onClient as jest.MockedFunction<typeof onClient>;

describe('useMobileOJComponentOrder', () => {
  let matchMediaMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnClient.mockReturnValue(true);

    // Mock window.matchMedia
    matchMediaMock = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Desktop behavior', () => {
    it('should return null regardless of variant when on desktop', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      const { result: variant2Result } = renderHook(() =>
        useMobileOJComponentOrder('variant_2_recommended'),
      );
      expect(variant2Result.current).toBeNull();

      const { result: variant3Result } = renderHook(() =>
        useMobileOJComponentOrder('variant_3_hybrid'),
      );
      expect(variant3Result.current).toBeNull();
    });
  });

  describe('Mobile behavior with different variants', () => {
    beforeEach(() => {
      matchMediaMock.mockReturnValue({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });
    });
    it.each([
      'variant_1_related',
      'variant_2_recommended',
      'variant_3_hybrid',
      'variant_4_related_mid',
      'variant_5_recommended_mid',
      'variant_6_hybrid_mid',
    ] as SearchVariant[])('returns the correct order for %s', searchVariant => {
      const { result } = renderHook(() =>
        useMobileOJComponentOrder(searchVariant),
      );

      expect(result.current).toEqual(SEARCH_COMPONENT_ORDER[searchVariant]);
    });
    it('returns null when no variant is provided', () => {
      const { result } = renderHook(() => useMobileOJComponentOrder(null));
      expect(result.current).toBeNull();
    });

    describe.skip('rendered mobile variant', () => {
      const OJ_TEST_IDS: Record<OJComponentKey, string> = {
        mostRead: 'most-read',
        topicDiscovery: 'topic-discovery',
        pvCarousel: 'portrait-video-carousel',
        relatedContent: 'related-content',
        topStories: 'top-stories',
        featuredArticles: 'features',
        locationBasedOJ: 'location-based-topic-oj',
      };

      const renderVariant = (variant: SearchVariant) => {
        window.history.replaceState(null, '', `?debugVariant=${variant}`);

        const pageData = {
          ...articleDataNews,
          countryCuration: { summaries: [{ title: 'Country' }] },
          portraitVideoItems: { portraitVideo: { blocks: [{}] } },
          secondaryColumn: { topStories: [], features: [] },
        } as unknown as Article;

        return render(createElement(ArticlePage, { pageData }), {
          service: 'news',
          toggles: {
            topicDiscovery: { enabled: true },
            articlePortraitVideo: { enabled: true },
            locationTopicCuration: { enabled: true },
          },
        });
      };

      afterEach(() => {
        window.history.replaceState(null, '', '/');
      });

      it.each([
        'variant_1_related',
        'variant_2_recommended',
        'variant_3_hybrid',
        'variant_4_related_mid',
        'variant_5_recommended_mid',
        'variant_6_hybrid_mid',
      ] as SearchVariant[])(
        'renders the OJ components in the configured order for %s',
        async searchVariant => {
          renderVariant(searchVariant);

          const orderedContainer = await screen.findByTestId(
            'mobile-oj-container',
          );

          const ojTestIds = Object.values(OJ_TEST_IDS);
          const renderedOrder = Array.from(
            orderedContainer.querySelectorAll('[data-testid]'),
          )
            .map(element => element.getAttribute('data-testid'))
            .filter(testId => ojTestIds.includes(testId as string));

          const expectedOrder = SEARCH_COMPONENT_ORDER[searchVariant].map(
            key => OJ_TEST_IDS[key],
          );

          expect(renderedOrder).toEqual(expectedOrder);
        },
      );
    });
  });

  describe('Mid-article component ordering', () => {
    it.each([
      ['variant_1_related', 'mostRead'],
      ['variant_2_recommended', 'mostRead'],
      ['variant_3_hybrid', 'mostRead'],
      ['variant_4_related_mid', 'relatedContent'],
      ['variant_5_recommended_mid', 'topicDiscovery'],
      ['variant_6_hybrid_mid', 'locationBasedOJ'],
    ] as const)('%o returns %o', (searchVariant, expectedComponent) => {
      expect(SEARCH_MID_ARTICLE_COMPONENT[searchVariant]).toBe(
        expectedComponent,
      );
    });
  });

  describe('Media query listener', () => {
    it('should add a change listener to media query on client', () => {
      const addEventListenerMock = jest.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: addEventListenerMock,
        removeEventListener: jest.fn(),
      });

      renderHook(() => useMobileOJComponentOrder(null));

      expect(addEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });

    it('should remove listener on unmount', () => {
      const removeEventListenerMock = jest.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: removeEventListenerMock,
      });

      const { unmount } = renderHook(() => useMobileOJComponentOrder(null));

      unmount();

      expect(removeEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });

    it('should update order when viewport changes from desktop to mobile', async () => {
      let listenerCallback: ((e: MediaQueryListEvent) => void) | null = null;
      matchMediaMock.mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn((event, callback) => {
          if (event === 'change') {
            listenerCallback = callback;
          }
        }),
        removeEventListener: jest.fn(),
      }));

      const { result } = renderHook(() =>
        useMobileOJComponentOrder('variant_1_related'),
      );

      expect(result.current).toBeNull();

      if (listenerCallback) {
        await act(async () => {
          listenerCallback?.({
            matches: true,
          } as MediaQueryListEvent);
        });
      }

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current?.[0]).toBe('topicDiscovery');
    });

    it('should update order when viewport changes from mobile to desktop', async () => {
      let listenerCallback: ((e: MediaQueryListEvent) => void) | null = null;
      matchMediaMock.mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn((event, callback) => {
          if (event === 'change') {
            listenerCallback = callback;
          }
        }),
        removeEventListener: jest.fn(),
      }));

      const { result } = renderHook(() =>
        useMobileOJComponentOrder('variant_4_related_mid'),
      );

      expect(result.current).not.toBeNull();

      if (listenerCallback) {
        await act(async () => {
          listenerCallback?.({
            matches: false,
          } as MediaQueryListEvent);
        });
      }

      await waitFor(() => {
        expect(result.current).toBeNull();
      });
    });
  });

  describe('Correct media query breakpoint', () => {
    it('should use GROUP_3_MAX_WIDTH_BP for the breakpoint', () => {
      mockOnClient.mockReturnValue(true);

      renderHook(() => useMobileOJComponentOrder(null));

      const callArgs = matchMediaMock.mock.calls[0][0];

      expect(callArgs).toContain(`${GROUP_3_MAX_WIDTH_BP}rem`);
      expect(callArgs).toContain('max-width');
    });
  });
});
