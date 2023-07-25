/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, act, waitFor } from '@testing-library/react';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidgin,
  articleDataPidginWithAds,
  articleDataPidginWithByline,
  promoSample,
  sampleRecommendations,
} from '#pages/ArticlePage/fixtureData';
import newsMostReadData from '#data/news/mostRead/index.json';
import { data as persianMostReadData } from '#data/persian/mostRead/index.json';
import { data as pidginMostReadData } from '#data/pidgin/mostRead/index.json';
import {
  textBlock,
  blockContainingText,
  singleTextBlock,
} from '#models/blocks/index';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ArticlePage from './ArticlePage';
import ThemeProvider from '../../components/ThemeProvider';
import { suppressPropWarnings } from '../../legacy/psammead/psammead-test-helpers/src';

jest.mock('../../components/ThemeProvider');

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const recommendationSettings = {
  hasStoryRecommendations: true,
  skipLink: {
    text: 'Skip recommendations and continue reading',
    endTextVisuallyHidden: 'End of recommendations',
  },
};

const input = {
  bbcOrigin: 'https://www.test.bbc.co.uk',
  id: 'c0000000000o',
  isAmp: false,
  pageType: ARTICLE_PAGE,
  pathname: '/pathname',
  statusCode: 200,
};

const Context = ({
  service = 'pidgin',
  children,
  adsToggledOn = false,
  mostReadToggledOn = true,
  showAdsBasedOnLocation = false,
  isApp = false,
  promo = null,
} = {}) => {
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
            <ServiceContextProvider
              service={service}
              recommendations={recommendationSettings}
            >
              {children}
            </ServiceContextProvider>
          </RequestContextProvider>
        </ToggleContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

beforeEach(() => {
  fetch.resetMocks();
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
    );
    await act(async () => {
      render(
        <Context service="news">
          <ArticlePage pageData={articleDataNewsWithSummary} />
        </Context>,
      );
    });
    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="description"]')
          .getAttribute('content'),
      ).toEqual('Article Headline for SEO');
    });
  });

  it('should render a news article correctly', async () => {
    fetch.mockResponse(JSON.stringify(newsMostReadData));

    const { container } = render(
      <Context service="news">
        <ArticlePage pageData={articleDataNews} />
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
          pageData={{ ...articleDataPersian, mostRead: persianMostReadData }}
        />
      </Context>,
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
          pageData={{ ...articleDataPidgin, mostRead: pidginMostReadData }}
        />
      </Context>,
    );

    await waitFor(() => {
      const mostReadSection = container.querySelector('#Most-Read');
      expect(mostReadSection).not.toBeNull();
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
        await act(async () => {
          render(
            <Context service="news">
              <ArticlePage pageData={articleDataNews} />
            </Context>,
          );
        });
        await waitFor(() => {
          expect(
            document
              .querySelector('meta[property="og:image"]')
              .getAttribute('content'),
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
        await act(async () => {
          render(
            <Context service="news">
              <ArticlePage pageData={articleDataNewsWithPromoImage} />
            </Context>,
          );
        });
        await waitFor(() => {
          expect(
            document
              .querySelector('meta[property="og:image"]')
              .getAttribute('content'),
          ).toEqual(
            'https://ichef.test.bbci.co.uk/news/1024/branded_news/c34e/live/fea48140-27e5-11eb-a689-1f68cd2c5502.jpg',
          );
        });
      });
    });

    it('should render a news article correctly', async () => {
      fetch.mockResponse(JSON.stringify(newsMostReadData));
      let container;
      await act(async () => {
        ({ container } = render(
          <Context service="news">
            <ArticlePage pageData={articleDataNews} />
          </Context>,
        ));
      });
      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    });

    it('should render a rtl article (persian) with most read correctly', async () => {
      fetch.mockResponse(JSON.stringify(persianMostReadData));
      let container;
      await act(async () => {
        ({ container } = render(
          <Context service="persian">
            <ArticlePage pageData={articleDataPersian} />
          </Context>,
        ));
      });
      await waitFor(() => {
        const mostReadSection = container.querySelector('#Most-Read');
        expect(mostReadSection).not.toBeNull();
      });

      expect(container).toMatchSnapshot();
    });

    it('should render a ltr article (pidgin) with most read correctly', async () => {
      fetch.mockResponse(JSON.stringify(pidginMostReadData));
      let container;
      await act(async () => {
        ({ container } = render(
          <Context service="pidgin">
            <ArticlePage pageData={articleDataPidgin} />
          </Context>,
        ));
      });
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
        content: {
          model: {
            blocks: [
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
      let container;
      await act(async () => {
        ({ container } = render(
          <Context service="news">
            <ArticlePage pageData={articleWithSummaryHeadlineInTheMiddle} />
          </Context>,
        ));
      });
      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    });

    it('should render a news article without headline correctly', async () => {
      const articleWithoutHeadline = {
        ...articleDataNews,
        content: {
          model: {
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
      let container;
      await act(async () => {
        ({ container } = render(
          <Context service="news">
            <ArticlePage pageData={articleWithoutHeadline} />
          </Context>,
        ));
      });
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
      let getByTestId;
      await act(async () => {
        ({ getByTestId } = render(
          <Context service="news">
            <ArticlePage pageData={pageDataWithSecondaryColumn} />
          </Context>,
        ));
      });
      expect(getByTestId('top-stories')).toBeInTheDocument();
      expect(getByTestId('features')).toBeInTheDocument();
    });

    it('should remove the top stories and features sections when isApp is set to true', async () => {
      const pageDataWithSecondaryColumn = {
        ...articleDataNews,
        secondaryColumn: {
          topStories: [],
          features: [],
        },
      };
      let container;
      await act(async () => {
        ({ container } = render(
          <Context service="news" isApp>
            <ArticlePage pageData={pageDataWithSecondaryColumn} />
          </Context>,
        ));
      });
      expect(
        container.querySelector(`div[data-testid="top-stories"]`),
      ).toBeNull();
      expect(container.querySelector(`div[data-testid="features"]`)).toBeNull();
    });

    it('should show ads when enabled', async () => {
      [
        [true, true],
        [true, false],
        [false, true],
        [false, false],
      ].forEach(([adsToggledOn, showAdsBasedOnLocation]) => {
        let container;
        act(() => {
          ({ container } = render(
            <Context
              service="pidgin"
              adsToggledOn={adsToggledOn}
              showAdsBasedOnLocation={showAdsBasedOnLocation}
            >
              <ArticlePage pageData={articleDataPidginWithAds} />
            </Context>,
          ));
        });
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
      let getByText;
      await act(async () => {
        ({ getByText } = render(
          <Context service="turkce">
            <ArticlePage pageData={pageDataWithSecondaryColumn} />
          </Context>,
        ));
      });
      expect(
        getByText('SAMPLE RECOMMENDATION 1 - HEADLINE'),
      ).toBeInTheDocument();
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
    const pageDataWithSecondaryColumn = {
      ...articleDataNews,
      recommendations: sampleRecommendations,
    };
    const { getByText } = render(
      <Context service="turkce">
        <ArticlePage pageData={pageDataWithSecondaryColumn} />
      </Context>,
    );

    expect(getByText('SAMPLE RECOMMENDATION 1 - HEADLINE')).toBeInTheDocument();
  });

  it('should render PodcastPromos when passed', async () => {
    const pageDataWithSecondaryColumn = {
      ...articleDataNews,
      promo: promoSample,
    };
    const { getByText } = render(
      <Context service="russian" promo>
        <ArticlePage pageData={pageDataWithSecondaryColumn} />
      </Context>,
    );

    expect(getByText('Что это было?')).toBeInTheDocument();
  });
});
