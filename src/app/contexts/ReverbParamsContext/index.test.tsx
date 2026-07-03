/* eslint-disable no-console */
import { use } from 'react';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';
import {
  STORY_PAGE,
  MEDIA_ASSET_PAGE,
  MOST_READ_PAGE,
} from '../../routes/utils/pageTypes';
import { ReverbParamsContext, PageMetadata } from '.';
import * as useOptimizelyVariation from '../../hooks/useOptimizelyVariation';

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
  jest.clearAllMocks();
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
          },
        },
      },
    });
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
          },
        },
      },
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
          },
        },
      },
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
          },
        },
      },
    });
  });

  it('should include experiment details when present', () => {
    jest
      .spyOn(useOptimizelyVariation, 'default')
      .mockImplementation(() => 'experimentVariant');

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
          },
        },
      },
      experimentProps: {
        experimentName: 'test_page_views_aa_3',
        experimentVariant: 'experimentVariant',
        sendOptimizelyEvents: true,
      },
    });
  });
});
