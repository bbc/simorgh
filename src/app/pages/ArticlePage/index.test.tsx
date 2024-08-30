import React, { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import {
  articleDataNews,
  articleDataNewsWithEmbeds,
  articleDataPersian,
  articleDataPidgin,
  articleDataPidginWithAds,
  articleDataPidginWithByline,
  promoSample,
  sampleRecommendations,
  articlePglDataPidgin,
  articleStyDataPidgin,
} from '#pages/ArticlePage/fixtureData';
import { data as newsMostReadData } from '#data/news/mostRead/index.json';
import { data as persianMostReadData } from '#data/persian/mostRead/index.json';
import { data as pidginMostReadData } from '#data/pidgin/mostRead/index.json';
import {
  textBlock,
  blockContainingText,
  singleTextBlock,
} from '#models/blocks/index';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { suppressPropWarnings } from '#app/legacy/psammead/psammead-test-helpers/src';
import { Services } from '#app/models/types/global';
import { Article } from '#app/models/types/optimo';

import {
  render,
  screen,
  waitFor,
  act,
} from '../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ArticlePage from './ArticlePage';
import ThemeProvider from '../../components/ThemeProvider';
import ATIAnalytics from '../../components/ATIAnalytics';

jest.mock('../../components/ThemeProvider');

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('../../components/ATIAnalytics');

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
};

const Context = ({
  service = 'pidgin',
  children,
  adsToggledOn = false,
  mostReadToggledOn = true,
  showAdsBasedOnLocation = false,
  isApp = false,
  promo = null,
}: PropsWithChildren<Props> = {}) => {
  const appInput = {
    ...input,
    service,
    showAdsBasedOnLocation,
    isApp,
  };

  return (
    <BrowserRouter>
      <ThemeProvider service={service} variant="default">
        <ToggleContextProvider
          toggles={{
            mostRead: {
              enabled: mostReadToggledOn,
            },
            ads: {
              enabled: adsToggledOn,
            },
            cpsRecommendations: {
              enabled: true,
            },
            podcastPromo: { enabled: promo != null },
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

  (ATIAnalytics as jest.Mock).mockImplementation(
    jest.requireActual('../../components/ATIAnalytics').default,
  );
});

afterEach(() => {
  delete process.env.SIMORGH_ICHEF_BASE_URL;
});

describe('Article Page', () => {
  it('should use headline for meta description if summary does not exist', async () => {
    const articleDataNewsWithSummary = mergeDeepLeft(
      {
        promo: {
          summary: textBlock(''),
        },
      },
      articleDataNews,
    ) as unknown as Article;

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
        <ArticlePage
          pageData={articleDataPidginWithByline as unknown as Article}
        />
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
        <ArticlePage pageData={articleDataPersian as unknown as Article} />
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
          <ArticlePage pageData={articleDataNews as unknown as Article} />
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
      );

      render(
        <Context service="news">
          <ArticlePage
            pageData={articleDataNewsWithPromoImage as unknown as Article}
          />
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
            ...(articleDataNews as unknown as Article),
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
            ...(articleDataPersian as unknown as Article),
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
            ...(articleDataPidgin as unknown as Article),
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
        <ArticlePage
          pageData={articleWithSummaryHeadlineInTheMiddle as unknown as Article}
        />
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
        <ArticlePage pageData={articleWithoutHeadline as unknown as Article} />
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
        <ArticlePage
          pageData={pageDataWithSecondaryColumn as unknown as Article}
        />
      </Context>,
    );

    expect(getByTestId('top-stories')).toBeInTheDocument();
    expect(getByTestId('features')).toBeInTheDocument();
  });

  it('should render image with the .webp image extension', () => {
    const imageBlock = articleDataNews.content.model.blocks[5];
    const imageAltText =
      imageBlock.model.blocks[0].model.blocks[0].model.blocks[0].model.text;
    const imageLocator = imageBlock.model.blocks[1].model.locator;
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
            ...(articleDataNews as unknown as Article),
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
          <ArticlePage
            pageData={pageDataWithSecondaryColumn as unknown as Article}
          />
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
          <ArticlePage
            pageData={pageDataWithSecondaryColumn as unknown as Article}
          />
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
          <ArticlePage pageData={articleDataPidgin as unknown as Article} />
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
          <ArticlePage
            pageData={articleDataPidginWithAds as unknown as Article}
          />
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

  it('should render WSOJ recommendations when passed', async () => {
    suppressPropWarnings(['optimizely', 'ForwardRef', 'null']);
    const pageDataWithSecondaryColumn = {
      ...articleDataNews,
      recommendations: sampleRecommendations,
    };
    const { getByText } = render(
      <Context service="turkce">
        <ArticlePage
          pageData={pageDataWithSecondaryColumn as unknown as Article}
        />
      </Context>,
      { service: 'turkce' },
    );

    expect(getByText('SAMPLE RECOMMENDATION 1 - HEADLINE')).toBeInTheDocument();
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
        <ArticlePage
          pageData={pageDataWithSecondaryColumn as unknown as Article}
        />
      </Context>,
      { service: 'russian' },
    );

    expect(getByText('Что это было?')).toBeInTheDocument();
  });
  it('should render oEmbed component when passed', async () => {
    const pageDataWithRiddle = {
      ...articleDataNewsWithEmbeds,
    };
    const { container } = render(
      <Context service="russian">
        <ArticlePage pageData={pageDataWithRiddle as unknown as Article} />
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
        <ArticlePage pageData={pageDataWithEmbedHtml as unknown as Article} />
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
        <ArticlePage pageData={pageDataWithEmbedImages as unknown as Article} />
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
        <ArticlePage
          pageData={pageDataWithUploaderEmbed as unknown as Article}
        />
      </Context>,
    );
    expect(getByText('Get involved')).toBeInTheDocument();
    expect(getByText('UGC Core Features 1 - Custom Form')).toBeInTheDocument();
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
          <ArticlePage
            pageData={pageDataWithSecondaryColumn as unknown as Article}
          />
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
          <ArticlePage pageData={pageDataWithMostRead as unknown as Article} />
        </Context>,
      );

      expect(queryByTestId('most-read')).not.toBeInTheDocument();
    });

    it('should add brandname to page title in atiAnalytics', async () => {
      (ATIAnalytics as jest.Mock).mockImplementation(() => <div />);

      render(
        <Context service="pidgin">
          <ArticlePage pageData={articlePglDataPidgin as unknown as Article} />
        </Context>,
      );

      expect(ATIAnalytics).toHaveBeenLastCalledWith(
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
        {},
      );
    });

    it('should have schema metadata @type as Article', async () => {
      render(
        <Context service="pidgin">
          <ArticlePage pageData={articlePglDataPidgin as unknown as Article} />
        </Context>,
      );

      const helmetContent = Helmet.peek();
      const schemaType = JSON.parse(helmetContent.scriptTags[1].innerHTML)[
        '@graph'
      ][0]['@type'];

      expect(schemaType).toEqual('Article');
    });
  });
  describe('when rendering an STY page', () => {
    it('should add brandname to page title in atiAnalytics', async () => {
      (ATIAnalytics as jest.Mock).mockImplementation(() => <div />);

      render(
        <Context service="pidgin">
          <ArticlePage pageData={articleStyDataPidgin as unknown as Article} />
        </Context>,
      );

      expect(ATIAnalytics).toHaveBeenLastCalledWith(
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
        {},
      );
    });
  });
});
