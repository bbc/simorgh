import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import {
  articleDataNews,
  articleDataNewsWithEmbeds,
  articleDataPersian,
  articleDataPersianWithFourParagraphs,
  articleDataPidgin,
  articleDataPidginWithAds,
  articleDataPidginWithByline,
  articleDataPidginWithSubByline,
  articleDataRussianWithPVButNoWatchMomentsTranslation,
  articleDataPortugueseWithPVNotUnderHeadline,
  articleDataPortugueseWithPVUnderHeadline,
  articleDataHindi,
  promoSample,
  articlePglDataPidgin,
  articleStyDataPidgin,
} from '#pages/ArticlePage/fixtureData';
import { data as newsMostReadData } from '#data/news/mostRead/index.json';
import { data as persianMostReadData } from '#data/persian/mostRead/index.json';
import { data as pidginMostReadData } from '#data/pidgin/mostRead/index.json';
import { portraitVideoFixture } from '#app/components/PortraitVideoCarousel/fixture';
import {
  textBlock,
  blockContainingText,
  singleTextBlock,
} from '#models/blocks/index';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { suppressPropWarnings } from '#app/legacy/psammead/psammead-test-helpers/src';
import { Services } from '#app/models/types/global';
import { Curation } from '#app/models/types/curationData';
import { Article, OptimoBlock } from '#app/models/types/optimo';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import * as viewTracking from '#app/hooks/useViewTracker';
import isLive from '#lib/utilities/isLive';
import LocationBasedTopicOJ from '#app/components/LocationBasedTopicOJ';
import {
  render,
  screen,
  waitFor,
  act,
} from '../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ArticlePage from './ArticlePage';
import ThemeProvider from '../../components/ThemeProvider';
import * as ATIAnalytics from '../../components/ATIAnalytics';

jest.mock('../../components/ThemeProvider');

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const atiAnalyticsSpy = jest.spyOn(ATIAnalytics, 'default');
atiAnalyticsSpy.mockImplementation(() => <div>ATI Analytics</div>);

jest.mock('#app/components/OptimizelyPageMetrics');
jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

jest.mock('#app/lib/utilities/onClient', () => ({
  __esModule: true,
  default: jest.fn(),
  onClient: jest.fn(() => true),
}));
jest.mock('#lib/utilities/isLive', () => jest.fn());

const input = {
  bbcOrigin: 'https://www.test.bbc.co.uk',
  id: 'c0000000000o',
  isAmp: false,
  pageType: ARTICLE_PAGE,
  pathname: '/pathname',
  statusCode: 200,
};

type Props = {
  service?: Services;
  adsToggledOn?: boolean;
  mostReadToggledOn?: boolean;
  showAdsBasedOnLocation?: boolean;
  isApp?: boolean;
  promo?: boolean | null;
  isAmp?: boolean;
  isLite?: boolean;
  id?: string | null;
};

const Context = ({
  service = 'pidgin',
  children,
  adsToggledOn = false,
  mostReadToggledOn = true,
  showAdsBasedOnLocation = false,
  isApp = false,
  promo = null,
  isAmp = false,
  isLite = false,
  id,
}: PropsWithChildren<Props> = {}) => {
  const appInput = {
    ...input,
    service,
    showAdsBasedOnLocation,
    isApp,
    isAmp,
    isLite,
    id,
  };

  return (
    <BrowserRouter>
      <ThemeProvider service={service} variant="default">
        <ToggleContextProvider
          toggles={{
            mostRead: { enabled: mostReadToggledOn },
            ads: { enabled: adsToggledOn },
            podcastPromo: { enabled: promo != null },
            eventTracking: { enabled: false },
            preloadLeadImage: { enabled: false },
            topBarOJs: { enabled: false },
            articlePortraitVideo: { enabled: false },
            articleVideoCuration: { enabled: false },
            continueReadingButton: { enabled: false },
          }}
        >
          <RequestContextProvider {...appInput}>
            <ServiceContextProvider service={service}>
              {children}
            </ServiceContextProvider>
          </RequestContextProvider>
        </ToggleContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

beforeEach(() => {
  process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
});

afterEach(() => {
  delete process.env.SIMORGH_ICHEF_BASE_URL;
});

describe('Article Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    {
      testScenario:
        'should show the lite site link on non Lite pages, when the toggle is enabled',
      isLite: false,
      toggleEnabled: true,
      shouldBeDisplayed: true,
    },
    {
      testScenario:
        'should not show the lite site link on non Lite pages, when the toggle is false',
      isLite: false,
      toggleEnabled: false,
      shouldBeDisplayed: false,
    },
    {
      testScenario:
        'should not show the lite site link on Lite pages, regardless of the toggle',
      isLite: true,
      toggleEnabled: true,
      shouldBeDisplayed: false,
    },
  ])('$testScenario', ({ isLite, toggleEnabled, shouldBeDisplayed }) => {
    render(<ArticlePage pageData={articleDataPersian} />, {
      service: 'gahuza',
      isLite,
      toggles: { articleLiteSiteLink: { enabled: toggleEnabled } },
    });

    const liteCTA = screen.queryByRole('link', { name: /Inyandiko gusa/ });

    if (shouldBeDisplayed) {
      expect(liteCTA).toBeInTheDocument();
    } else {
      expect(liteCTA).not.toBeInTheDocument();
    }
  });

  it('should apply click and view tracking data on lite site link', () => {
    const eventTrackingData = {
      componentName: 'article-lite-site-link',
    };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    render(<ArticlePage pageData={articleDataPersian} />, {
      service: 'gahuza',
      isLite: false,
      toggles: { articleLiteSiteLink: { enabled: true } },
    });

    expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });

  it('should use headline for meta description if summary does not exist', async () => {
    const articleDataNewsWithSummary = mergeDeepLeft(
      {
        promo: {
          summary: textBlock(''),
        },
      },
      articleDataNews,
    );

    render(
      <Context service="news">
        <ArticlePage pageData={articleDataNewsWithSummary} />
      </Context>,
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content'),
      ).toEqual('Article Headline for SEO');
    });
  });

  it('should use the twitter handle where present in the byline block', async () => {
    render(
      <Context service="pidgin">
        <ArticlePage pageData={articleDataPidginWithByline} />
      </Context>,
      { service: 'pidgin' },
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="twitter:creator"]')
          ?.getAttribute('content'),
      ).toEqual('@mary_harper');
    });
  });

  it('should use the default twitter handle where a byline block is missing in the content blocks', async () => {
    render(
      <Context service="persian">
        <ArticlePage pageData={articleDataPersian} />
      </Context>,
      { service: 'persian' },
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="twitter:creator"]')
          ?.getAttribute('content'),
      ).toEqual('@bbcpersian');
    });
  });

  describe('ArticleMetadata get branded image', () => {
    beforeEach(() => {
      process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
      process.env.SIMORGH_APP_ENV = 'test';
    });

    afterEach(() => {
      delete process.env.SIMORGH_APP_ENV;
      delete process.env.SIMORGH_ICHEF_BASE_URL;
    });

    it('should use default images for opengraph if promo image does not exist', async () => {
      render(
        <Context service="news">
          <ArticlePage pageData={articleDataNews} />
        </Context>,
      );

      await waitFor(() => {
        expect(
          document
            .querySelector('meta[property="og:image"]')
            ?.getAttribute('content'),
        ).toEqual(
          'https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png',
        );
      });
    });

    it('should use branded images for opengraph if promo image exists', async () => {
      const articleDataNewsWithPromoImage = mergeDeepLeft(
        {
          promo: {
            images: {
              defaultPromoImage: {
                blocks: [
                  {
                    type: 'altText',
                    model: {
                      blocks: [
                        {
                          type: 'text',
                          model: {
                            blocks: [
                              {
                                type: 'paragraph',
                                model: {
                                  text: 'Шайлоо 2020',
                                  blocks: [
                                    {
                                      type: 'fragment',
                                      model: {
                                        text: 'Шайлоо 2020',
                                        attributes: [],
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'rawImage',
                    model: {
                      width: 749,
                      height: 421,
                      locator:
                        'c34e/live/fea48140-27e5-11eb-a689-1f68cd2c5502.jpg',
                      originCode: 'cpsprodpb',
                      copyrightHolder: 'BBC',
                      suitableForSyndication: true,
                    },
                  },
                ],
              },
            },
          },
        },
        articleDataNews,
      ) as Article;

      render(
        <Context service="news">
          <ArticlePage pageData={articleDataNewsWithPromoImage} />
        </Context>,
      );

      await waitFor(() => {
        expect(
          document
            .querySelector('meta[property="og:image"]')
            ?.getAttribute('content'),
        ).toEqual(
          'https://ichef.test.bbci.co.uk/news/1024/branded_news/c34e/live/fea48140-27e5-11eb-a689-1f68cd2c5502.jpg',
        );
      });
    });
  });

  it('should render a news article correctly', async () => {
    const { container } = render(
      <Context service="news">
        <ArticlePage
          pageData={{
            ...articleDataNews,
            mostRead: newsMostReadData,
          }}
        />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should render a rtl article (persian) with most read correctly', async () => {
    const { container } = render(
      <Context service="persian">
        <ArticlePage
          pageData={{
            ...articleDataPersian,
            mostRead: persianMostReadData,
          }}
        />
      </Context>,
      { service: 'persian' },
    );

    await waitFor(() => {
      const mostReadSection = container.querySelector('#Most-Read');
      expect(mostReadSection).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });

  it('should render a ltr article (pidgin) with most read correctly', async () => {
    const { container } = render(
      <Context service="pidgin">
        <ArticlePage
          pageData={{
            ...articleDataPidgin,
            mostRead: pidginMostReadData,
          }}
        />
      </Context>,
      { service: 'pidgin' },
    );

    await waitFor(() => {
      const mostReadSection = container.querySelector('#Most-Read');
      expect(mostReadSection).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });

  it('should render a news article with headline in the middle correctly', async () => {
    const headline = blockContainingText('headline', 'Article Headline', 1);

    const articleWithSummaryHeadlineInTheMiddle = {
      ...articleDataNews,
      metadata: {
        ...articleDataNews.metadata,
        atiAnalytics: {
          ...articleDataNews.metadata.atiAnalytics,
          pageTitle: 'SEO Headline',
        },
      },
      content: {
        model: {
          blocks: [
            // @ts-expect-error - type checking not added for block helpers
            singleTextBlock('Paragraph above headline', 2),
            {
              ...headline,
              model: {
                ...headline.model,
                blocks: [
                  {
                    ...headline.model.blocks[0],
                    position: [2, 1],
                  },
                ],
              },
            },
            // @ts-expect-error - type checking not added for block helpers
            singleTextBlock('Paragraph below headline', 3),
          ],
        },
      },
      promo: {
        ...articleDataNews.promo,
        headlines: {
          seoHeadline: 'SEO Headline',
          promoHeadline: 'Promo Headline',
        },
      },
    };

    const { container } = render(
      <Context service="news">
        <ArticlePage pageData={articleWithSummaryHeadlineInTheMiddle} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should render a news article without headline correctly', async () => {
    const articleWithoutHeadline = {
      ...articleDataNews,
      metadata: {
        ...articleDataNews.metadata,
        atiAnalytics: {
          ...articleDataNews.metadata.atiAnalytics,
          pageTitle: 'Article Headline',
        },
      },
      content: {
        model: {
          // @ts-expect-error - type checking not added for block helpers
          blocks: [singleTextBlock('Paragraph 1', 2)],
        },
      },
      promo: {
        ...articleDataNews.promo,
        headlines: {
          seoHeadline: 'Article Headline',
          promoHeadline: 'Promo Headline',
        },
      },
    };

    const { container } = render(
      <Context service="news">
        <ArticlePage pageData={articleWithoutHeadline} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should render the top stories and features when passed', async () => {
    const pageDataWithSecondaryColumn = {
      ...articleDataNews,
      secondaryColumn: {
        topStories: [],
        features: [],
      },
    };
    const { getByTestId } = render(
      <Context service="news">
        <ArticlePage pageData={pageDataWithSecondaryColumn} />
      </Context>,
    );

    expect(getByTestId('top-stories')).toBeInTheDocument();
    expect(getByTestId('features')).toBeInTheDocument();
  });

  it('should render image with the .webp image extension', () => {
    const imageBlock = articleDataNews.content.model.blocks[5];
    const imageAltText =
      // @ts-expect-error - nested block structure
      imageBlock.model.blocks[0].model.blocks[0].model.blocks[0].model.text;
    // @ts-expect-error - nested block structure
    const imageLocator = imageBlock.model.blocks[1].model.locator;
    // @ts-expect-error - nested block structure
    const imageOriginCode = imageBlock.model.blocks[1].model.originCode;
    const imageURL = `https://ichef.test.bbci.co.uk/ace/ws/640/${imageOriginCode}/${imageLocator}.webp`;
    const expectedSrcSetURLs = [
      `https://ichef.test.bbci.co.uk/ace/ws/240/${imageOriginCode}/${imageLocator}.webp 240w`,
      `https://ichef.test.bbci.co.uk/ace/ws/320/${imageOriginCode}/${imageLocator}.webp 320w`,
      `https://ichef.test.bbci.co.uk/ace/ws/480/${imageOriginCode}/${imageLocator}.webp 480w`,
      `https://ichef.test.bbci.co.uk/ace/ws/624/${imageOriginCode}/${imageLocator}.webp 624w`,
      `https://ichef.test.bbci.co.uk/ace/ws/800/${imageOriginCode}/${imageLocator}.webp 800w`,
    ].join(', ');

    render(
      <Context service="news">
        <ArticlePage
          pageData={{
            ...articleDataNews,
            mostRead: newsMostReadData,
          }}
        />
      </Context>,
    );

    const { src, srcset } = screen.getByAltText(
      imageAltText,
    ) as HTMLImageElement;

    expect(src).toEqual(imageURL);
    expect(srcset).toEqual(expectedSrcSetURLs);
  });

  it('should render secondary column images with the .webp image extension', async () => {
    const pageDataWithSecondaryColumn = {
      ...articleDataNews,
      secondaryColumn: {
        topStories: [],
        features: [
          {
            headlines: {
              headline:
                'Тарых барактары: Кыргызстан-Өзбекстан ортосундагы коңшулук мамиле 42',
            },
            locators: {
              assetUri: '/kyrgyz/kyrgyzstan-23087521',
              cpsUrn: 'urn:bbc:content:assetUri:kyrgyz/kyrgyzstan-23087521',
              curie:
                'http://www.bbc.co.uk/asset/eda3de40-cfd2-7449-87b4-2a26392fa543',
              assetId: '23087521',
            },
            summary:
              'Ушул аптанын башында Кыргызстан акыркы он жылдан бери биринчи жолу Өзбекстандын расмий делегациясын кабыл алды.',
            timestamp: 1477898711000,
            language: 'ky',
            cpsType: 'STY',
            indexImage: {
              id: '63486487',
              subType: 'index',
              href: 'http://b.files.bbci.co.uk/13284/test/_63486487_63486486.jpg',
              path: '/cpsdevpb/13284/test/_63486487_63486486.jpg',
              height: 549,
              width: 976,
              altText: 'Өзбекстандын',
              caption: 'Өзбекстандын',
              copyrightHolder: 'Getty Images',
              originCode: 'cpsdevpb',
              type: 'image',
            },
            options: {
              isBreakingNews: false,
              isFactCheck: false,
            },
            id: 'urn:bbc:ares::asset:kyrgyz/kyrgyzstan-23087521',
            type: 'cps',
          },
        ],
      },
    };

    const imageBlock =
      pageDataWithSecondaryColumn.secondaryColumn.features[0].indexImage;
    const { altText: imageAltText, path: imagePath } = imageBlock;
    const imageURL = `https://ichef.test.bbci.co.uk/ace/ws/400${imagePath}.webp`;

    await act(async () => {
      render(
        <Context service="news">
          <ArticlePage pageData={pageDataWithSecondaryColumn} />
        </Context>,
      );
    });

    const { src } = screen.getByAltText(imageAltText) as HTMLImageElement;

    expect(src).toEqual(imageURL);
  });

  describe('when isApp is true', () => {
    it('should remove the top stories and features sections', async () => {
      const pageDataWithSecondaryColumn = {
        ...articleDataNews,
        secondaryColumn: {
          topStories: [],
          features: [],
        },
      };

      const { container } = render(
        <Context service="news" isApp>
          <ArticlePage pageData={pageDataWithSecondaryColumn} />
        </Context>,
      );

      expect(
        container.querySelector(`div[data-testid="top-stories"]`),
      ).toBeNull();
      expect(container.querySelector(`div[data-testid="features"]`)).toBeNull();
    });

    it('should remove the most read section', async () => {
      const { container } = render(
        <Context service="pidgin" isApp>
          <ArticlePage pageData={articleDataPidgin} />
        </Context>,
        { service: 'pidgin' },
      );

      await waitFor(() => {
        const mostReadSection = container.querySelector('#Most-Read');
        expect(mostReadSection).toBeNull();
      });
    });
  });

  it('should show ads when enabled', async () => {
    [
      [true, true],
      [true, false],
      [false, true],
      [false, false],
    ].forEach(([adsToggledOn, showAdsBasedOnLocation]) => {
      const { container } = render(
        <Context
          service="pidgin"
          adsToggledOn={adsToggledOn}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
        >
          <ArticlePage pageData={articleDataPidginWithAds} />
        </Context>,
        { service: 'pidgin' },
      );

      const shouldShowAds = adsToggledOn && showAdsBasedOnLocation;
      const adElement = container.querySelector('[data-e2e="advertisement"]');
      if (shouldShowAds) {
        expect(adElement).toBeInTheDocument();
      } else {
        expect(adElement).not.toBeInTheDocument();
      }
    });
  });

  it('should render PodcastPromos when passed', async () => {
    suppressPropWarnings(['pageData.promo.id', 'ArticlePage', 'undefined']);
    suppressPropWarnings(['pageData.promo.id', 'SecondaryColumn', 'undefined']);
    const pageDataWithSecondaryColumn = {
      ...articleDataNews,
      promo: promoSample,
    };
    const { getByText } = render(
      <Context service="russian" promo>
        <ArticlePage pageData={pageDataWithSecondaryColumn} />
      </Context>,
      { service: 'russian' },
    );

    expect(getByText('Канал Би-би-си в WhatsApp')).toBeInTheDocument();
  });
  it('should render oEmbed component when passed', async () => {
    const pageDataWithRiddle = {
      ...articleDataNewsWithEmbeds,
    };
    const { container } = render(
      <Context service="russian">
        <ArticlePage pageData={pageDataWithRiddle} />
      </Context>,
    );
    const actual = container.querySelector(
      'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
    );
    expect(actual).toBeInTheDocument();
  });

  it('should render embedHtml component when passed', async () => {
    const pageDataWithEmbedHtml = {
      ...articleDataNewsWithEmbeds,
    };
    const { getByText } = render(
      <Context service="russian">
        <ArticlePage pageData={pageDataWithEmbedHtml} />
      </Context>,
    );
    expect(getByText('Embed HTML Component')).toBeInTheDocument();
  });

  it('should render embedImages component when passed', async () => {
    const pageDataWithEmbedImages = {
      ...articleDataNewsWithEmbeds,
    };
    const { container } = render(
      <Context service="russian">
        <ArticlePage pageData={pageDataWithEmbedImages} />
      </Context>,
    );
    const actual = container.querySelector(`div[data-e2e="embed-image"]`);
    expect(actual).toBeInTheDocument();
  });

  it('should render Uploader Embed component when passed', async () => {
    const pageDataWithUploaderEmbed = {
      ...articleDataNewsWithEmbeds,
    };
    const { getByText } = render(
      <Context service="news">
        <ArticlePage pageData={pageDataWithUploaderEmbed} />
      </Context>,
    );
    expect(getByText('Get involved')).toBeInTheDocument();
    expect(getByText('UGC Core Features 1 - Custom Form')).toBeInTheDocument();
  });

  it('should render a byline when passed a byline', async () => {
    const pageDataWithByline = {
      ...articleDataPidginWithByline,
    };

    const { getByTestId } = render(
      <Context service="news">
        <ArticlePage pageData={pageDataWithByline} />
      </Context>,
    );

    expect(getByTestId('byline')).toBeInTheDocument();
  });

  it('should render a byline when passed a subByline', async () => {
    const pageDataWithSubByline = {
      ...articleDataPidginWithSubByline,
    };

    const { getByTestId } = render(
      <Context service="news">
        <ArticlePage pageData={pageDataWithSubByline} />
      </Context>,
    );

    expect(getByTestId('byline')).toBeInTheDocument();
  });

  it('should set "amphtml" link tag for asset', async () => {
    render(
      <Context service="pidgin">
        <ArticlePage pageData={articleDataNews} />
      </Context>,
    );

    const helmetContent = Helmet.peek()?.linkTags;
    const ampHtmlLink = helmetContent.find(link => link.rel === 'amphtml');

    expect(ampHtmlLink).toEqual({
      href: 'https://www.test.bbc.co.uk/pathname.amp',
      rel: 'amphtml',
    });
  });

  it('should not set "amphtml" link tag for TC2 asset', async () => {
    const pageDataAsTC2Asset = {
      ...articleDataNews,
      metadata: {
        ...articleDataNews.metadata,
        analyticsLabels: {
          ...articleDataNews.metadata.analyticsLabels,
          contentId:
            'urn:bbc:topcat:curie:asset:7b51390e-c5c3-11e3-a6ee-819a3db9bd6e',
        },
      },
    } as Article;

    render(
      <Context service="pidgin">
        <ArticlePage pageData={pageDataAsTC2Asset} />
      </Context>,
    );

    const helmetContent = Helmet.peek()?.linkTags;
    const ampHtmlLink = helmetContent.find(link => link.rel === 'amphtml');

    expect(ampHtmlLink).toBeUndefined();
  });

  describe('when rendering a PGL page', () => {
    it('should not render secondary column', async () => {
      const pageDataWithSecondaryColumn = {
        ...articlePglDataPidgin,
        secondaryColumn: {
          topStories: [],
          features: [],
        },
      };

      const { queryByTestId } = render(
        <Context service="pidgin">
          <ArticlePage pageData={pageDataWithSecondaryColumn} />
        </Context>,
      );

      expect(queryByTestId('top-stories')).not.toBeInTheDocument();
      expect(queryByTestId('features')).not.toBeInTheDocument();
    });

    it('should not render most read', async () => {
      const pageDataWithMostRead = {
        ...articlePglDataPidgin,
        mostRead: newsMostReadData,
      };

      const { queryByTestId } = render(
        <Context service="pidgin">
          <ArticlePage pageData={pageDataWithMostRead} />
        </Context>,
      );

      expect(queryByTestId('most-read')).not.toBeInTheDocument();
    });

    it('should add brandname to page title in atiAnalytics', async () => {
      render(
        <Context service="pidgin">
          <ArticlePage pageData={articlePglDataPidgin} />
        </Context>,
      );

      expect(atiAnalyticsSpy).toHaveBeenLastCalledWith(
        {
          atiData: {
            categoryName: null,
            contentId: 'urn:bbc:optimo:c0000000001o',
            language: 'pcm',
            ldpThingIds: null,
            ldpThingLabels: null,
            nationsProducer: null,
            pageIdentifier: null,
            pageTitle: 'Article Headline for SEO in Pidgin - BBC News Pidgin',
            timePublished: '2018-01-01T12:01:00.000Z',
            timeUpdated: '2018-01-01T14:00:00.000Z',
          },
        },
        undefined,
      );
    });

    it('should have schema metadata @type as Article', async () => {
      render(
        <Context service="pidgin">
          <ArticlePage pageData={articlePglDataPidgin} />
        </Context>,
      );

      const helmetContent = Helmet.peek();

      const linkedData = helmetContent.scriptTags.find(
        ({ type }) => type === 'application/ld+json',
      ) || { innerHTML: '' };

      const schemaType = JSON.parse(linkedData.innerHTML)['@graph'][0]['@type'];

      expect(schemaType).toEqual('Article');
    });
  });
  describe('when rendering an STY page', () => {
    it('should add brandname to page title in atiAnalytics', async () => {
      render(
        <Context service="pidgin">
          <ArticlePage pageData={articleStyDataPidgin} />
        </Context>,
      );

      expect(atiAnalyticsSpy).toHaveBeenLastCalledWith(
        {
          atiData: {
            categoryName: null,
            contentId: 'urn:bbc:optimo:c0000000001o',
            language: 'pcm',
            ldpThingIds: null,
            ldpThingLabels: null,
            nationsProducer: null,
            pageIdentifier: null,
            pageTitle: 'Article Headline for SEO in Pidgin - BBC News Pidgin',
            timePublished: '2018-01-01T12:01:00.000Z',
            timeUpdated: '2018-01-01T14:00:00.000Z',
          },
        },
        undefined,
      );
    });
  });

  describe('when rendering an article page with a portrait video', () => {
    it.each`
      pageData                                                | service         | expected     | scenario
      ${articleDataPortugueseWithPVNotUnderHeadline}          | ${'portuguese'} | ${'Assista'} | ${'should render the Watch Moments title because translation exists'}
      ${articleDataRussianWithPVButNoWatchMomentsTranslation} | ${'russian'}    | ${undefined} | ${'should not render the Watch Moments title because no translation exists'}
    `('$scenario', ({ pageData, service, expected }) => {
      render(
        <Context service={service}>
          <ArticlePage pageData={pageData} />
        </Context>,
      );

      const title = screen.queryByRole('strong');
      if (expected) {
        expect(title).toBeInTheDocument();
        expect(title?.textContent).toEqual(expected);
      } else {
        expect(title).not.toBeInTheDocument();
      }
    });

    it('should not render the portrait video title when the portrait video is directly under a headline', () => {
      render(
        <Context service="portuguese">
          <ArticlePage pageData={articleDataPortugueseWithPVUnderHeadline} />
        </Context>,
      );

      const title = screen.queryByRole('strong');
      expect(title).not.toBeInTheDocument();
    });

    it('should render read time component when readTime is supplied in metadata', () => {
      const dataWithReadTime = {
        ...articleDataPidginWithByline,
        metadata: {
          ...articleDataPidginWithByline.metadata,
          stats: {
            readTime: 5,
            wordCount: 500,
          },
        },
      };
      const { queryByTestId } = render(
        <Context service="pidgin">
          <ArticlePage pageData={dataWithReadTime} />
        </Context>,
      );

      expect(queryByTestId('read-time')).toBeInTheDocument();
    });

    it('should not render read time component when readTime is not supplied in metadata', () => {
      const dataMissingReadTime = {
        ...articleDataPidginWithByline,
        metadata: {
          ...articleDataPidginWithByline.metadata,
          stats: {},
        },
      };
      const { queryByTestId } = render(
        <Context service="pidgin">
          <ArticlePage pageData={dataMissingReadTime} />
        </Context>,
      );

      expect(queryByTestId('read-time')).not.toBeInTheDocument();
    });
  });

  describe('Media curation', () => {
    const mediaCurationFixture: Curation = {
      title: 'वीडियो',
      visualProminence: 'NORMAL',
      position: 0,
      curationId: 'urn:bbc:vivo:curation:test-id',
      link: 'https://www.bbc.com/hindi/topics/cw9kv0kpxydt',
      summaries: [
        {
          type: 'video',
          title: 'वीडियो 1',
          link: 'https://www.bbc.com/hindi/articles/test-video-1',
          imageUrl:
            'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/test.jpg.webp',
          imageAlt: 'वीडियो 1',
        },
      ],
    };
    const relatedContentBlock: OptimoBlock = {
      id: 'related-content-test-id',
      type: 'relatedContent',
      model: {
        blocks: [],
      },
      position: [99],
    };

    const pageDataWithMediaCuration: Article = {
      ...articleDataHindi,
      secondaryColumn: {
        topStories: [],
        features: [],
        mediaCuration: mediaCurationFixture,
      },
    };
    const pageDataWithMediaCurationAndRelatedContent: Article = {
      ...pageDataWithMediaCuration,
      content: {
        ...pageDataWithMediaCuration.content,
        model: {
          ...pageDataWithMediaCuration.content.model,
          blocks: [
            ...pageDataWithMediaCuration.content.model.blocks,
            relatedContentBlock,
          ],
        },
      },
    };

    it('renders media curation after related content when related content is present', () => {
      const { queryByTestId, container } = render(
        <ArticlePage pageData={pageDataWithMediaCurationAndRelatedContent} />,
        {
          service: 'hindi',
          toggles: { articleVideoCuration: { enabled: true } },
        },
      );

      const relatedContentSection = container.querySelector(
        '[data-e2e="related-content-heading"]',
      );
      const mediaCuration = queryByTestId('media-curation');

      expect(relatedContentSection).toBeInTheDocument();
      expect(mediaCuration).toBeInTheDocument();
      expect(
        (relatedContentSection as Element).compareDocumentPosition(
          mediaCuration as Node,
        ),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('does not render media curation when toggle is off, even if data is present', () => {
      const { queryByTestId } = render(
        <ArticlePage pageData={pageDataWithMediaCurationAndRelatedContent} />,
        {
          service: 'hindi',
          toggles: { articleVideoCuration: { enabled: false } },
        },
      );

      expect(queryByTestId('media-curation')).not.toBeInTheDocument();
    });

    it('does not render media curation when data is missing', () => {
      const { queryByTestId } = render(
        <ArticlePage pageData={articleDataHindi} />,
        {
          service: 'hindi',
          toggles: { articleVideoCuration: { enabled: true } },
        },
      );

      expect(queryByTestId('media-curation')).not.toBeInTheDocument();
    });
  });

  describe('Continue Reading Toggle', () => {
    it.each([
      {
        testScenario:
          'should not render Continue Reading Button when toggle is false',
        toggleEnabled: false,
        hasContinueReadingBlock: true,
        isLite: false,
        shouldBeDisplayed: false,
      },
      {
        testScenario:
          'should not render Continue Reading Button when toggle is true but no block is present',
        toggleEnabled: true,
        hasContinueReadingBlock: false,
        isLite: false,
        shouldBeDisplayed: false,
      },
      {
        testScenario:
          'should render Continue Reading Button when toggle is true',
        toggleEnabled: true,
        hasContinueReadingBlock: true,
        isLite: false,
        shouldBeDisplayed: true,
      },
      {
        testScenario:
          'should not render Continue Reading Button on Lite pages when toggle is true',
        toggleEnabled: true,
        hasContinueReadingBlock: true,
        isLite: true,
        shouldBeDisplayed: false,
      },
    ])(
      '$testScenario',
      ({
        toggleEnabled,
        shouldBeDisplayed,
        hasContinueReadingBlock,
        isLite = false,
      }) => {
        const continueReadingBlock = {
          id: 'continue-reading-block',
          type: 'continueReading',
          model: {},
        };
        const baseBlocks =
          articleDataPersianWithFourParagraphs.content.model.blocks;

        const blocks = hasContinueReadingBlock
          ? [...baseBlocks, continueReadingBlock]
          : [...baseBlocks];

        const pageData: Article = {
          ...articleDataPersianWithFourParagraphs,
          content: {
            ...articleDataPersianWithFourParagraphs.content,
            model: {
              ...articleDataPersianWithFourParagraphs.content.model,
              blocks,
            },
          },
        };

        render(<ArticlePage pageData={pageData} />, {
          service: 'persian',
          isLite,
          toggles: { continueReadingButton: { enabled: toggleEnabled } },
        });

        const continueReadingButton = screen.queryByTestId(
          'continue-reading-button',
        );

        if (shouldBeDisplayed) {
          expect(continueReadingButton).toBeInTheDocument();
        } else {
          expect(continueReadingButton).not.toBeInTheDocument();
        }
      },
    );
  });
  describe('Portrait Video Carousel', () => {
    const portraitVideoItems = {
      title: 'Portrait Video Carousel',
      portraitVideo: {
        blocks: [...portraitVideoFixture.blocks],
      },
    };
    it('should render the carousel when portraitVideoItems are present and the toggle is enabled', async () => {
      const dataWithPVItems = {
        ...articleDataPidgin,
        portraitVideoItems: {
          ...portraitVideoItems,
        },
      };
      const { queryAllByTestId } = render(
        <ArticlePage pageData={dataWithPVItems} />,
        {
          service: 'pidgin',
          toggles: { articlePortraitVideo: { enabled: true } },
        },
      );

      await waitFor(() => {
        const carousels = queryAllByTestId('portrait-video-carousel');
        expect(carousels[0]).toBeInTheDocument();
      });
    });

    it('should not render the carousel when portraitVideoItems are present but the toggle is disabled', async () => {
      const dataWithPVItems = {
        ...articleDataPidgin,
        portraitVideoItems: {
          ...portraitVideoItems,
        },
      };

      const { queryByTestId } = render(
        <ArticlePage pageData={dataWithPVItems} />,
        {
          service: 'pidgin',
          toggles: { articlePortraitVideo: { enabled: false } },
        },
      );

      await waitFor(() => {
        expect(
          queryByTestId('portrait-video-carousel'),
        ).not.toBeInTheDocument();
      });
    });

    it('should not render the carousel when portraitVideoItems are absent and the toggle is disabled', async () => {
      const dataWithoutPVItems = {
        ...articleDataPidgin,
        portraitVideoItems: undefined,
      };
      const { queryByTestId } = render(
        <ArticlePage pageData={dataWithoutPVItems} />,
        {
          service: 'pidgin',
          toggles: { articlePortraitVideo: { enabled: false } },
        },
      );

      await waitFor(() => {
        expect(
          queryByTestId('portrait-video-carousel'),
        ).not.toBeInTheDocument();
      });
    });

    it('should not render the carousel when portraitVideoBlocks is empty', async () => {
      const dataWithEmptyBlocks = {
        ...articleDataPidgin,
        portraitVideoItems: {
          ...portraitVideoItems,
          portraitVideo: {
            ...portraitVideoItems.portraitVideo,
            blocks: [],
          },
        },
      };
      const { queryAllByTestId } = render(
        <ArticlePage pageData={dataWithEmptyBlocks} />,
        {
          service: 'pidgin',
          toggles: { articlePortraitVideo: { enabled: false } },
        },
      );

      await waitFor(() => {
        expect(queryAllByTestId('portrait-video-carousel')).toHaveLength(0);
      });
    });

    it('should use title if provided', async () => {
      const dataWithPVItems = {
        ...articleDataPidgin,
        portraitVideoItems: {
          ...portraitVideoItems,
        },
      };
      render(<ArticlePage pageData={dataWithPVItems} />, {
        service: 'pidgin',
        toggles: { articlePortraitVideo: { enabled: true } },
      });

      await waitFor(() => {
        const carousels = screen.getAllByTestId('portrait-video-carousel');
        expect(carousels[0]).toHaveAttribute(
          'aria-label',
          'Portrait Video Carousel',
        );
      });
    });

    it('should use fallback title if not provided', async () => {
      const dataWithoutTitle = {
        ...articleDataPidgin,
        portraitVideoItems: {
          portraitVideo: { ...portraitVideoItems.portraitVideo },
        },
      };
      render(<ArticlePage pageData={dataWithoutTitle} />, {
        service: 'pidgin',
        toggles: { articlePortraitVideo: { enabled: true } },
      });

      await waitFor(() => {
        const fallbackTitle = 'Look'; // The fallback title comes from translations.media.watch
        const carousels = screen.getAllByTestId('portrait-video-carousel');
        expect(carousels[0]).toHaveAttribute('aria-label', fallbackTitle);
      });
    });
  });
  describe('TopicDiscovery visibility on test only', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const data = {
      ...articleDataPidgin,
      metadata: {
        ...articleDataPidgin.metadata,
        topics: [
          {
            topicId: '1',
            topicName: 'Topic 1',
          },
          {
            topicId: '2',
            topicName: 'Topic 2',
          },
        ],
      },
    } as Article;

    it('should render TopicDiscovery when isLive is false (test env)', () => {
      jest.mocked(isLive).mockImplementationOnce(() => false);
      const { queryByTestId } = render(
        <ArticlePage pageData={data} showTopicDiscoveryComponent />,
        { service: 'portuguese' },
      );
      expect(queryByTestId('topic-discovery')).toBeInTheDocument();
    });

    it('should NOT render TopicDiscovery when isLive is true (live env)', () => {
      jest.mocked(isLive).mockImplementationOnce(() => true);
      const { queryByTestId } = render(<ArticlePage pageData={data} />, {
        service: 'portuguese',
      });
      expect(queryByTestId('topic-discovery')).not.toBeInTheDocument();
    });
  });

  describe('LocationBasedTopicOJ', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const mockCountryCuration = {
      title: 'Najeriya',
      topicId: 'topic-1',
      curationId: 'curation-1',
      curationType: 'vivo-stream',
      link: '/hausa/topics/topic-1',
      summaries: [
        {
          id: 'summary-1',
          firstPublished: '2025-05-21',
          lastPublished: '2025-05-21',
          title: 'Promo Title 1',
          link: '/promo-link-1',
          imageUrl: 'promo-image.jpg',
          type: 'article',
        },
        {
          id: 'summary-2',
          firstPublished: '2025-05-21',
          lastPublished: '2025-05-21',
          title: 'Promo Title 2',
          link: '/promo-link-2',
          imageUrl: 'promo-image.jpg',
          type: 'article',
        },
      ],
    };
    it('renders nothing if countryCuration is undefined', () => {
      const pageData = {
        ...articleDataNews,
        countryCuration: undefined,
      };
      const { container } = render(
        <LocationBasedTopicOJ pageData={pageData} />,
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('renders section and subheading when countryCuration is present', () => {
      const pageData = {
        ...articleDataNews,
        countryCuration: mockCountryCuration,
      };
      render(
        <LocationBasedTopicOJ
          // @ts-expect-error: Test fixture data does not need to match Article type exactly
          pageData={pageData}
        />,
      );
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByText('Najeriya')).toBeInTheDocument();
      expect(screen.getByText('Promo Title 1')).toBeInTheDocument();
      expect(screen.getByText('Promo Title 2')).toBeInTheDocument();
    });

    it('should render LocationBasedTopicOJ when isLive is false (test env)', () => {
      jest.mocked(isLive).mockImplementationOnce(() => false);

      const pageData = {
        ...articleDataNews,
        countryCuration: mockCountryCuration,
      };

      const { queryByTestId } = render(
        <ArticlePage
          // @ts-expect-error: Test fixture data does not need to match Article type exactly
          pageData={pageData}
        />,
        { service: 'hausa' },
      );

      expect(queryByTestId('location-based-topic-oj')).toBeInTheDocument();
    });

    it('should NOT render LocationBasedTopicOj when isLive is true (live env)', () => {
      jest.mocked(isLive).mockImplementationOnce(() => true);

      const pageData = {
        ...articleDataNews,
        countryCuration: mockCountryCuration,
      };

      const { queryByTestId } = render(
        <ArticlePage
          // @ts-expect-error: Test fixture data does not need to match Article type exactly
          pageData={pageData}
        />,
        { service: 'hausa' },
      );

      expect(queryByTestId('location-based-topic-oj')).not.toBeInTheDocument();
    });
  });
});
