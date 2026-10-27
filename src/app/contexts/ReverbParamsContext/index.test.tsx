/* eslint-disable no-console */
import { PropsWithChildren, use } from 'react';
import optimizelySdk from '@optimizely/react-sdk';
import { ResonanceBeaconConfig } from '#app/components/ATIAnalytics/types';
import { PageTypes } from '#app/models/types/global';
import {
  AllTheProviders,
  render,
  renderHook,
  screen,
} from '../../components/react-testing-library-with-providers';
import {
  STORY_PAGE,
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  HOME_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  MOST_READ_PAGE,
} from '../../routes/utils/pageTypes';
import { ReverbParamsContext, PageMetadata } from '.';
import useOptimizelyVariation, {
  ExperimentType,
} from '../../hooks/useOptimizelyVariation';
import { buildAnalyticsParams } from '../../lib/analyticsUtils/params/buildParams';

jest.mock('../../hooks/useOptimizelyVariation', () => {
  const actual = jest.requireActual('../../hooks/useOptimizelyVariation');

  return {
    __esModule: true,
    ...actual,
    default: jest.fn(actual.default),
  };
});

jest.mock('../../lib/analyticsUtils/params/buildParams', () => {
  const actual = jest.requireActual(
    '../../lib/analyticsUtils/params/buildParams',
  );

  return {
    __esModule: true,
    ...actual,
    buildAnalyticsParams: jest.fn(actual.buildAnalyticsParams),
  };
});

const mockUseOptimizelyVariation = jest.mocked(useOptimizelyVariation);
const mockBuildAnalyticsParams = jest.mocked(buildAnalyticsParams);
const originalSimorghAppEnv = process.env.SIMORGH_APP_ENV;

const pageMetadata = {
  atiAnalytics: {
    campaigns: [
      {
        campaignId: '5a988e3e39461b000e9dabfb',
        campaignName: 'WS - Keep me on trend',
      },
      {
        campaignId: '5a988e4739461b000e9dabfc',
        campaignName: 'WS - Update me',
      },
    ],
    categoryName: 'News',
    contentId: 'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
    contentType: 'article',
    language: 'pcm',
    ldpThingIds:
      '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
    ldpThingLabels: null,
    pageIdentifier: 'news::pidgin.news.story.51745682.page',
    pageTitle: "Adams Oshiomhole say 'I still be APC National Chairman'",
    producerId: null,
    timePublished: '2020-03-04T18:58:43.000Z',
    timeUpdated: '2020-03-04T19:26:11.000Z',
    producerName: 'PIDGIN',
  },
  type: 'article',
} as PageMetadata;

beforeEach(() => {
  delete process.env.SIMORGH_APP_ENV;
  jest.clearAllMocks();
  mockUseOptimizelyVariation.mockImplementation(
    jest.requireActual('../../hooks/useOptimizelyVariation').default,
  );
  mockBuildAnalyticsParams.mockImplementation(
    jest.requireActual('../../lib/analyticsUtils/params/buildParams')
      .buildAnalyticsParams,
  );
});

afterEach(() => {
  if (originalSimorghAppEnv === undefined) {
    delete process.env.SIMORGH_APP_ENV;
  } else {
    process.env.SIMORGH_APP_ENV = originalSimorghAppEnv;
  }
});

const TestComponent = () => {
  const reverbParams = use(ReverbParamsContext);

  return <div data-testid="test-component">{JSON.stringify(reverbParams)}</div>;
};

describe('ReverbParamsContext', () => {
  it('should provide reverb parameters to all child components', () => {
    render(<TestComponent />, {
      pageMetadata,
      service: 'pidgin',
    });

    const testEl = screen.getByTestId('test-component');
    const reverbParams = JSON.parse(testEl.textContent as string);

    expect(reverbParams).toEqual({
      reverbParams: {
        eventDetails: {
          eventName: 'pageView',
        },
        params: {
          page: {
            additionalProperties: {
              app_name: 'news-pidgin',
              app_type: 'responsive',
              content_language: 'pcm',
              product_platform: null,
              referrer_url: null,
              x11: '2020-03-04T18:58:43.000Z',
              x12: '2020-03-04T19:26:11.000Z',
              x13: null,
              x14: '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
              x16: 'WS - Keep me on trend~WS - Update me',
              x17: 'News',
              x18: false,
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: "Adams%20Oshiomhole%20say%20'I%20still%20be%20APC%20National%20Chairman'",
            },
            contentId:
              'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
            contentType: 'article',
            destination: 'WS_NEWS_LANGUAGES_TEST',
            name: 'news::pidgin.news.story.51745682.page',
            producer: 'PIDGIN',
          },
          user: {
            hashedId: null,
            isSignedIn: false,
            isPersonalisationOn: false,
          },
        },
      },
      resonanceParams: null,
    });
  });

  describe('value memoization', () => {
    const analyticsParams: ReturnType<typeof buildAnalyticsParams> = {
      reverbParams: {
        params: {
          page: { name: 'news::pidgin.news.story.51745682.page' },
          user: { isSignedIn: false },
        },
        eventDetails: { eventName: 'pageView' },
      },
      resonanceParams: null,
    };

    const ContextWrapper = ({ children }: PropsWithChildren) => (
      <AllTheProviders pageMetadata={pageMetadata} service="pidgin">
        {children}
      </AllTheProviders>
    );

    beforeEach(() => {
      jest.restoreAllMocks();
      mockBuildAnalyticsParams.mockReturnValue(analyticsParams);
      mockUseOptimizelyVariation.mockReturnValue(null);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('preserves the value reference when its dependencies are unchanged despite fresh enriched ATI data', () => {
      const { result, rerender } = renderHook(() => use(ReverbParamsContext), {
        wrapper: ContextWrapper,
      });
      const initialValue = result.current;
      const initialAtiData =
        mockBuildAnalyticsParams.mock.calls.at(-1)?.[0].atiData;

      rerender();

      const updatedAtiData =
        mockBuildAnalyticsParams.mock.calls.at(-1)?.[0].atiData;

      expect(updatedAtiData).toEqual(initialAtiData);
      expect(updatedAtiData).not.toBe(initialAtiData);
      expect(result.current).toBe(initialValue);
      expect(result.current).toEqual(analyticsParams);
    });

    it.each([null, 'off'])(
      'updates experiment props when a variant activates, changes and becomes %s',
      inactiveVariant => {
        const variation = mockUseOptimizelyVariation;
        const { result, rerender } = renderHook(
          () => use(ReverbParamsContext),
          { wrapper: ContextWrapper },
        );
        const initialValue = result.current;

        variation.mockReturnValue('variant-a');
        rerender();

        const activeValue = result.current;
        expect(activeValue).not.toBe(initialValue);
        expect(activeValue.experimentProps).toEqual({
          experimentName: 'test_page_views_aa_3',
          experimentVariant: 'variant-a',
          sendOptimizelyEvents: true,
        });
        expect(activeValue.reverbParams).toBe(analyticsParams.reverbParams);

        variation.mockReturnValue('variant-b');
        rerender();

        const updatedValue = result.current;
        expect(updatedValue).not.toBe(activeValue);
        expect(updatedValue.experimentProps).toEqual({
          experimentName: 'test_page_views_aa_3',
          experimentVariant: 'variant-b',
          sendOptimizelyEvents: true,
        });
        expect(mockBuildAnalyticsParams).toHaveBeenLastCalledWith(
          expect.objectContaining({
            atiData: expect.objectContaining({
              experimentName: 'test_page_views_aa_3',
              experimentVariant: 'variant-b',
              experimentProps: updatedValue.experimentProps,
            }),
          }),
        );

        variation.mockReturnValue(inactiveVariant);
        rerender();

        expect(result.current).not.toBe(updatedValue);
        expect(result.current).not.toHaveProperty('experimentProps');
        expect(result.current).toEqual(analyticsParams);
      },
    );

    it('updates the value when reverb parameters change without experiment changes', () => {
      const { result, rerender } = renderHook(() => use(ReverbParamsContext), {
        wrapper: ContextWrapper,
      });
      const initialValue = result.current;
      const updatedReverbParams = {
        ...analyticsParams.reverbParams,
        params: {
          page: { name: 'news::pidgin.news.story.51745683.page' },
          user: { isSignedIn: true, hashedId: 'signed-in-user' },
        },
      };
      mockBuildAnalyticsParams.mockReturnValue({
        ...analyticsParams,
        reverbParams: updatedReverbParams,
      });

      rerender();

      expect(result.current).not.toBe(initialValue);
      expect(result.current.reverbParams).toBe(updatedReverbParams);
      expect(result.current.resonanceParams).toBe(initialValue.resonanceParams);
      expect(result.current).not.toHaveProperty('experimentProps');
    });

    it('updates the value when resonance parameters change without reverb or experiment changes', () => {
      const { result, rerender } = renderHook(() => use(ReverbParamsContext), {
        wrapper: ContextWrapper,
      });
      const initialValue = result.current;
      const resonanceParams: ResonanceBeaconConfig = {
        resonanceProperties: { mode: 'test' },
        baseProperties: { app: { name: 'news-pidgin' } },
        pageviewProperties: {
          contentId: 'updated-content',
          contentType: 'article',
          language: 'pcm',
        },
      };
      mockBuildAnalyticsParams.mockReturnValue({
        ...analyticsParams,
        resonanceParams,
      });

      rerender();

      expect(result.current).not.toBe(initialValue);
      expect(result.current.resonanceParams).toBe(resonanceParams);
      expect(result.current.reverbParams).toBe(initialValue.reverbParams);
      expect(result.current).not.toHaveProperty('experimentProps');
    });
  });

  describe('experiment hook boundaries', () => {
    const currentPageType = jest.fn<PageTypes, []>();
    const ContextWrapper = ({ children }: PropsWithChildren) => {
      const pageType = currentPageType();

      return (
        <AllTheProviders
          pageMetadata={{ ...pageMetadata, type: pageType }}
          pageType={pageType}
          service="pidgin"
        >
          {children}
        </AllTheProviders>
      );
    };

    const setDecision = (variationKey: string | null, isClientReady = true) =>
      jest
        .mocked(optimizelySdk.useDecision)
        .mockReturnValue([
          { variationKey } as ReturnType<typeof optimizelySdk.useDecision>[0],
          isClientReady,
          false,
        ]);

    beforeEach(() => {
      jest.restoreAllMocks();
      currentPageType.mockReturnValue(ARTICLE_PAGE);
      jest.spyOn(optimizelySdk, 'useDecision');
      setDecision('variant-a');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it.each([
      [ARTICLE_PAGE, 'test_page_views_aa_3'],
      [STORY_PAGE, 'test_page_views_aa_3'],
      [CORRESPONDENT_STORY_PAGE, 'test_page_views_aa_3'],
      [PHOTO_GALLERY_PAGE, 'test_page_views_aa_3'],
      [HOME_PAGE, 'test_page_views_aa_4'],
      [MEDIA_ARTICLE_PAGE, null],
      [MEDIA_ASSET_PAGE, null],
      [MOST_READ_PAGE, null],
      ['unknown' as PageTypes, null],
    ])(
      'only activates the eligible experiment on %s pages',
      (pageType, experimentName) => {
        currentPageType.mockReturnValue(pageType as PageTypes);
        const { result } = renderHook(() => use(ReverbParamsContext), {
          wrapper: ContextWrapper,
        });

        if (experimentName) {
          expect(mockUseOptimizelyVariation).toHaveBeenCalledWith({
            experimentName,
            experimentType: ExperimentType.CLIENT_SIDE,
          });
          expect(result.current.experimentProps).toEqual({
            experimentName,
            experimentVariant: 'variant-a',
            sendOptimizelyEvents: true,
          });
        } else {
          expect(mockUseOptimizelyVariation).not.toHaveBeenCalled();
          expect(optimizelySdk.useDecision).not.toHaveBeenCalled();
          expect(result.current).not.toHaveProperty('experimentProps');
        }
      },
    );

    it('keeps hook order and resets variants when a mounted provider changes page type', () => {
      const { result, rerender } = renderHook(() => use(ReverbParamsContext), {
        wrapper: ContextWrapper,
      });
      expect(result.current.experimentProps?.experimentName).toBe(
        'test_page_views_aa_3',
      );

      rerender();
      expect(result.current.experimentProps?.experimentVariant).toBe(
        'variant-a',
      );

      setDecision('home-variant', false);
      currentPageType.mockReturnValue(HOME_PAGE);
      rerender();
      expect(result.current).not.toHaveProperty('experimentProps');

      setDecision('home-variant');
      rerender();
      expect(result.current.experimentProps).toEqual({
        experimentName: 'test_page_views_aa_4',
        experimentVariant: 'home-variant',
        sendOptimizelyEvents: true,
      });

      mockUseOptimizelyVariation.mockClear();
      jest.mocked(optimizelySdk.useDecision).mockClear();
      currentPageType.mockReturnValue(MEDIA_ASSET_PAGE);
      rerender();
      expect(result.current).not.toHaveProperty('experimentProps');
      expect(
        result.current.reverbParams.params.page.additionalProperties,
      ).not.toHaveProperty('mv_test');
      expect(mockUseOptimizelyVariation).not.toHaveBeenCalled();
      expect(optimizelySdk.useDecision).not.toHaveBeenCalled();

      currentPageType.mockReturnValue(MOST_READ_PAGE);
      rerender();
      expect(result.current).not.toHaveProperty('experimentProps');
      expect(
        result.current.reverbParams.params.page.additionalProperties?.x9,
      ).toBe(
        'Di%20one%20wey%20dem%20dey%20read%20well%20well%20-%20BBC%20News%20Pidgin',
      );
      expect(optimizelySdk.useDecision).not.toHaveBeenCalled();

      currentPageType.mockReturnValue('unknown' as PageTypes);
      rerender();
      expect(result.current).not.toHaveProperty('experimentProps');
      expect(optimizelySdk.useDecision).not.toHaveBeenCalled();

      setDecision('article-variant');
      currentPageType.mockReturnValue(STORY_PAGE);
      rerender();
      expect(result.current.experimentProps).toEqual({
        experimentName: 'test_page_views_aa_3',
        experimentVariant: 'article-variant',
        sendOptimizelyEvents: true,
      });
      expect(
        result.current.reverbParams.params.page.additionalProperties?.x9,
      ).toBe(
        "Adams%20Oshiomhole%20say%20'I%20still%20be%20APC%20National%20Chairman'%20-%20BBC%20News%20Pidgin",
      );

      setDecision('article-variant', false);
      currentPageType.mockReturnValue(ARTICLE_PAGE);
      rerender();
      expect(result.current.experimentProps?.experimentVariant).toBe(
        'article-variant',
      );
    });

    it.each([
      [ARTICLE_PAGE, 'test_page_views_aa_3', null],
      [ARTICLE_PAGE, 'test_page_views_aa_3', 'off'],
      [HOME_PAGE, 'test_page_views_aa_4', null],
      [HOME_PAGE, 'test_page_views_aa_4', 'off'],
    ])(
      'updates real hook state on %s for %s and removes experiment data when the variant becomes %s',
      (pageType, experimentName, inactiveVariant) => {
        currentPageType.mockReturnValue(pageType as PageTypes);
        const { result, rerender } = renderHook(
          () => use(ReverbParamsContext),
          { wrapper: ContextWrapper },
        );
        const activeValue = result.current;

        setDecision('variant-b');
        rerender();

        expect(result.current).not.toBe(activeValue);
        expect(result.current.experimentProps?.experimentVariant).toBe(
          'variant-b',
        );
        expect(
          result.current.reverbParams.params.page.additionalProperties,
        ).toMatchObject({
          mv_test: experimentName,
          mv_creation: 'variant-b',
        });

        setDecision(inactiveVariant);
        rerender();

        expect(result.current).not.toHaveProperty('experimentProps');
        expect(
          result.current.reverbParams.params.page.additionalProperties,
        ).not.toHaveProperty('mv_test');
        expect(mockBuildAnalyticsParams).toHaveBeenLastCalledWith(
          expect.objectContaining({ atiData: pageMetadata.atiAnalytics }),
        );
      },
    );
  });

  it('should include the brand name in the pageTitle for STY pages', () => {
    render(<TestComponent />, {
      pageMetadata: { ...pageMetadata, type: STORY_PAGE },
      pageType: STORY_PAGE,
      service: 'pidgin',
      pathname: '/pidgin/tori-51745682',
    });

    const testEl = screen.getByTestId('test-component');
    const reverbParams = JSON.parse(testEl.textContent as string);

    expect(reverbParams).toEqual({
      reverbParams: {
        eventDetails: {
          eventName: 'pageView',
        },
        params: {
          page: {
            additionalProperties: {
              app_name: 'news-pidgin',
              app_type: 'responsive',
              content_language: 'pcm',
              product_platform: null,
              referrer_url: null,
              x11: '2020-03-04T18:58:43.000Z',
              x12: '2020-03-04T19:26:11.000Z',
              x13: null,
              x14: '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
              x16: 'WS - Keep me on trend~WS - Update me',
              x17: 'News',
              x18: false,
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: "Adams%20Oshiomhole%20say%20'I%20still%20be%20APC%20National%20Chairman'%20-%20BBC%20News%20Pidgin",
            },
            contentId:
              'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
            contentType: 'article',
            destination: 'WS_NEWS_LANGUAGES_TEST',
            name: 'news::pidgin.news.story.51745682.page',
            producer: 'PIDGIN',
          },
          user: {
            hashedId: null,
            isSignedIn: false,
            isPersonalisationOn: false,
          },
        },
      },
      resonanceParams: null,
    });
  });

  it('should include the brand name in the pageTitle for MAP pages', () => {
    render(<TestComponent />, {
      pageMetadata: { ...pageMetadata, type: MEDIA_ASSET_PAGE },
      pageType: MEDIA_ASSET_PAGE,
      service: 'pidgin',
      pathname: '/pidgin/tori-51745682',
    });

    const testEl = screen.getByTestId('test-component');
    const reverbParams = JSON.parse(testEl.textContent as string);

    expect(reverbParams).toEqual({
      reverbParams: {
        eventDetails: {
          eventName: 'pageView',
        },
        params: {
          page: {
            additionalProperties: {
              app_name: 'news-pidgin',
              app_type: 'responsive',
              content_language: 'pcm',
              product_platform: null,
              referrer_url: null,
              x11: '2020-03-04T18:58:43.000Z',
              x12: '2020-03-04T19:26:11.000Z',
              x13: null,
              x14: '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
              x16: 'WS - Keep me on trend~WS - Update me',
              x17: 'News',
              x18: false,
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: "Adams%20Oshiomhole%20say%20'I%20still%20be%20APC%20National%20Chairman'%20-%20BBC%20News%20Pidgin",
            },
            contentId:
              'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
            contentType: 'article',
            destination: 'WS_NEWS_LANGUAGES_TEST',
            name: 'news::pidgin.news.story.51745682.page',
            producer: 'PIDGIN',
          },
          user: {
            hashedId: null,
            isSignedIn: false,
            isPersonalisationOn: false,
          },
        },
      },
      resonanceParams: null,
    });
  });

  it('should include the brand name in the pageTitle for mostRead pages', () => {
    render(<TestComponent />, {
      pageMetadata: { ...pageMetadata, type: MOST_READ_PAGE },
      pageType: MOST_READ_PAGE,
      service: 'pidgin',
      pathname: '/pidgin/popular/read',
    });

    const testEl = screen.getByTestId('test-component');
    const reverbParams = JSON.parse(testEl.textContent as string);

    expect(reverbParams).toEqual({
      reverbParams: {
        eventDetails: {
          eventName: 'pageView',
        },
        params: {
          page: {
            additionalProperties: {
              app_name: 'news-pidgin',
              app_type: 'responsive',
              content_language: 'pcm',
              product_platform: null,
              referrer_url: null,
              x11: '2020-03-04T18:58:43.000Z',
              x12: '2020-03-04T19:26:11.000Z',
              x13: null,
              x14: '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
              x16: 'WS - Keep me on trend~WS - Update me',
              x17: 'News',
              x18: false,
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: 'Di%20one%20wey%20dem%20dey%20read%20well%20well%20-%20BBC%20News%20Pidgin',
            },
            contentId:
              'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
            contentType: 'article',
            destination: 'WS_NEWS_LANGUAGES_TEST',
            name: 'news::pidgin.news.story.51745682.page',
            producer: 'PIDGIN',
          },
          user: {
            hashedId: null,
            isSignedIn: false,
            isPersonalisationOn: false,
          },
        },
      },
      resonanceParams: null,
    });
  });

  it('should include experiment details when present', () => {
    mockUseOptimizelyVariation.mockImplementation(() => 'experimentVariant');

    render(<TestComponent />, {
      pageMetadata,
      service: 'pidgin',
    });

    const testEl = screen.getByTestId('test-component');
    const reverbParams = JSON.parse(testEl.textContent as string);

    expect(reverbParams).toEqual({
      reverbParams: {
        eventDetails: {
          eventName: 'pageView',
        },
        params: {
          page: {
            additionalProperties: {
              app_name: 'news-pidgin',
              app_type: 'responsive',
              content_language: 'pcm',
              mv_creation: 'experimentVariant',
              mv_test: 'test_page_views_aa_3',
              product_platform: null,
              referrer_url: null,
              x11: '2020-03-04T18:58:43.000Z',
              x12: '2020-03-04T19:26:11.000Z',
              x13: null,
              x14: '3d5d5e30-dd50-4041-96d5-c970b20005b9~7d65828a-85c1-41f4-96cf-c758da75e401',
              x16: 'WS - Keep me on trend~WS - Update me',
              x17: 'News',
              x18: false,
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: "Adams%20Oshiomhole%20say%20'I%20still%20be%20APC%20National%20Chairman'",
            },
            contentId:
              'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
            contentType: 'article',
            destination: 'WS_NEWS_LANGUAGES_TEST',
            name: 'news::pidgin.news.story.51745682.page',
            producer: 'PIDGIN',
          },
          user: {
            hashedId: null,
            isSignedIn: false,
            isPersonalisationOn: false,
          },
        },
      },
      resonanceParams: null,
      experimentProps: {
        experimentName: 'test_page_views_aa_3',
        experimentVariant: 'experimentVariant',
        sendOptimizelyEvents: true,
      },
    });
  });

  it('should provide resonanceParams to child components when resonanceEnabled is enabled', () => {
    const mockResonanceParams = {
      resonanceProperties: { mode: 'test' },
      baseProperties: {
        app: { name: 'news-pidgin' },
        destination: 'WS_NEWS_LANGUAGES_TEST',
        pageName: 'news::pidgin.news.story.51745682.page',
        producer: 'PIDGIN',
        siteId: 598343,
      },
      pageviewProperties: {
        contentId:
          'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
        contentType: 'article',
        language: 'pcm',
        destination: 'WS_NEWS_LANGUAGES_TEST',
        producer: 'PIDGIN',
      },
    } as unknown as ResonanceBeaconConfig;

    mockBuildAnalyticsParams.mockReturnValue({
      reverbParams: {
        params: {
          page: { name: 'news::pidgin.news.story.51745682.page' },
          user: { isSignedIn: false },
        },
        eventDetails: { eventName: 'pageView' },
      },
      resonanceParams: mockResonanceParams,
    });

    render(<TestComponent />, {
      pageMetadata,
      service: 'pidgin',
    });

    const testEl = screen.getByTestId('test-component');
    const contextValue = JSON.parse(testEl.textContent as string);

    expect(contextValue.resonanceParams).toEqual(mockResonanceParams);
  });
});
