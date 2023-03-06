/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';

// test helpers
import { render, waitFor, within } from '@testing-library/react';
import fetchMock from 'fetch-mock';

// contexts
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

// 005_brasil_recommendations_experiment
import userEvent from '@testing-library/user-event';
import {
  OptimizelyExperiment,
  OptimizelyProvider,
} from '@optimizely/react-sdk';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../../components/ThemeProvider';

import ArticlePageIndex from '.';

// mock data
import {
  articleDataNews,
  hybridV1RecommendationsSample as sampleRecommendations,
  samplePageData,
} from '../../components/OptimizelyRecommendations/fixtureData';

// 005_brasil_recommendations_experiment
import ArticlePage from './ArticlePage';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

jest.mock('../../components/ThemeProvider');

jest.mock('#containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('#containers/ComscoreAnalytics', () => {
  const ComscoreAnalytics = () => <div>comscore</div>;
  return ComscoreAnalytics;
});

jest.mock('#containers/OptimizelyPageViewTracking', () => {
  const OptimizelyPageViewTracking = () => null;
  return OptimizelyPageViewTracking;
});

jest.mock('#containers/Ad', () => {
  const AdsContainer = () => <div data-testid="sty-ads">STY ADS</div>;
  return AdsContainer;
});

jest.mock('#containers/Ad/Canonical/CanonicalAdBootstrapJs', () => {
  const CanonicalAdBootstrapJs = ({ adcampaign }) => (
    <div data-testid="adBootstrap" data-adcampaign={adcampaign}>
      bootstrap
    </div>
  );
  return CanonicalAdBootstrapJs;
});

// 005_brasil_recommendations_experiment
jest.mock('#containers/ATIAnalytics/beacon', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    sendEventBeacon: jest.fn(),
  };
});

// 005_brasil_recommendations_experiment
jest.mock('@optimizely/react-sdk', () => {
  const actualModules = jest.requireActual('@optimizely/react-sdk');
  return {
    __esModule: true,
    ...actualModules,
    OptimizelyExperiment: jest.fn(),
  };
});

// 005_brasil_recommendations_experiment
const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  user: {
    attributes: {},
  },
  close: jest.fn(),
};

jest.mock('#server/utilities/getAgent/index');

const defaultToggleState = {
  ads: {
    enabled: true,
  },
  mostRead: {
    enabled: true,
  },
  socialEmbed: {
    enabled: true,
  },
};

// 005_brasil_recommendations_experiment
const PageWithContext = ({
  pageData,
  service,
  showAdsBasedOnLocation = false,
  isAmp = false,
  toggles = defaultToggleState,
}) => (
  <StaticRouter>
    <ThemeProvider service={service} variant="default">
      <ToggleContext.Provider
        value={{ toggleState: toggles, toggleDispatch: jest.fn() }}
      >
        <ServiceContextProvider
          pageLang={pageData.metadata.language}
          service={service}
        >
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={isAmp}
            pageType={pageData.metadata.type}
            pathname={pageData.metadata.locators.assetUri}
            service={service}
            statusCode={200}
            showAdsBasedOnLocation={showAdsBasedOnLocation}
          >
            <EventTrackingContextProvider pageData={pageData}>
              <OptimizelyProvider optimizely={optimizely} isServerSide>
                <ArticlePage service={service} pageData={pageData} />
              </OptimizelyProvider>
            </EventTrackingContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContext.Provider>
    </ThemeProvider>
  </StaticRouter>
);

const Page = ({
  pageData,
  service,
  showAdsBasedOnLocation = false,
  isAmp = false,
  toggles = defaultToggleState,
}) => (
  <StaticRouter>
    <ThemeProvider service={service} variant="default">
      <ToggleContext.Provider
        value={{ toggleState: toggles, toggleDispatch: jest.fn() }}
      >
        <ServiceContextProvider
          pageLang={pageData.metadata.language}
          service={service}
        >
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={isAmp}
            pageType={pageData.metadata.type}
            pathname={pageData.metadata.locators.assetUri}
            service={service}
            statusCode={200}
            showAdsBasedOnLocation={showAdsBasedOnLocation}
          >
            <ArticlePageIndex service={service} pageData={pageData} />
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContext.Provider>
    </ThemeProvider>
  </StaticRouter>
);

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('#containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('#containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('#containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  const ContextsContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

jest.mock('#hooks/useOptimizelyVariation', () => jest.fn(() => null));

describe.skip('Article Page', () => {
  const appEnv = process.env.SIMORGH_APP_ENV;
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
    process.env.RECOMMENDATIONS_ENDPOINT = 'http://mock-recommendations-path';
    // 005_brasil_recommendations_experiment
    OptimizelyExperiment.mockImplementation(props => {
      const { children } = props;

      const variation = null;

      if (children != null && typeof children === 'function') {
        return <>{children(variation, true, false)}</>;
      }

      return null;
    });
  });

  afterEach(() => {
    fetchMock.restore();
    delete process.env.SIMORGH_ICHEF_BASE_URL;
    delete process.env.RECOMMENDATIONS_ENDPOINT;
    process.env.SIMORGH_APP_ENV = appEnv;
  });

  describe('Optimizely Experiments', () => {
    describe('004_brasil_recommendations_experiment', () => {
      beforeEach(() => {
        process.env.RECOMMENDATIONS_ENDPOINT =
          'http://mock-recommendations-path';
      });

      afterEach(() => {
        delete process.env.RECOMMENDATIONS_ENDPOINT;
        jest.clearAllMocks();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      describe('control', () => {
        beforeEach(() => {
          process.env.RECOMMENDATIONS_ENDPOINT =
            'http://mock-recommendations-path';
          OptimizelyExperiment.mockImplementation(props => {
            const { children } = props;

            const variation = 'control';

            if (children != null && typeof children === 'function') {
              return <>{children(variation, true, false)}</>;
            }

            return null;
          });
        });

        afterEach(() => {
          delete process.env.RECOMMENDATIONS_ENDPOINT;
        });

        it('should fetch and render recommendations from current endpoint when variation is control and service is portuguese', async () => {
          const toggles = {
            cpsRecommendations: {
              enabled: true,
            },
            eventTracking: {
              enabled: true,
            },
          };

          const pageDataWithSecondaryColumn = {
            ...articleDataNews,
            recommendations: sampleRecommendations,
          };

          const { getAllByRole } = render(
            <Page
              pageData={pageDataWithSecondaryColumn}
              service="portuguese"
              toggles={toggles}
            />,
          );

          const [recommendationsRegions] = getAllByRole('region').filter(
            item =>
              item.getAttribute('aria-labelledby') ===
              'recommendations-heading',
          );

          const recommendationsItems = within(
            recommendationsRegions,
          ).getAllByRole('listitem');

          expect(recommendationsRegions).not.toBeNull();
          expect(recommendationsItems).toHaveLength(2);
        });
      });

      describe('content_recs', () => {
        beforeEach(() => {
          process.env.RECOMMENDATIONS_ENDPOINT =
            'http://mock-recommendations-path';
          OptimizelyExperiment.mockImplementation(props => {
            const { children } = props;

            const variation = 'content_recs';

            if (children != null && typeof children === 'function') {
              return <>{children(variation, true, false)}</>;
            }

            return null;
          });
        });

        afterEach(() => {
          delete process.env.RECOMMENDATIONS_ENDPOINT;
        });

        it('should fetch and render recommendations from content variant endpoint when variation is content_recs and service is portuguese', async () => {
          const toggles = {
            cpsRecommendations: {
              enabled: true,
            },
            eventTracking: {
              enabled: true,
            },
          };

          const pageDataWithSecondaryColumn = {
            ...articleDataNews,
            datalabContentRecommendations: sampleRecommendations,
          };

          const { getAllByRole } = render(
            <Page
              pageData={pageDataWithSecondaryColumn}
              service="portuguese"
              toggles={toggles}
            />,
          );

          const [recommendationsRegions] = getAllByRole('region').filter(
            item =>
              item.getAttribute('aria-labelledby') ===
              'recommendations-heading',
          );

          const recommendationsItems = within(
            recommendationsRegions,
          ).getAllByRole('listitem');

          expect(recommendationsRegions).not.toBeNull();
          expect(recommendationsItems).toHaveLength(2);
        });
      });

      describe('hybrid_recs', () => {
        beforeEach(() => {
          process.env.RECOMMENDATIONS_ENDPOINT =
            'http://mock-recommendations-path';
          OptimizelyExperiment.mockImplementation(props => {
            const { children } = props;

            const variation = 'hybrid_recs';

            if (children != null && typeof children === 'function') {
              return <>{children(variation, true, false)}</>;
            }

            return null;
          });
        });

        afterEach(() => {
          delete process.env.RECOMMENDATIONS_ENDPOINT;
        });

        it('should fetch and render recommendations from datalab hybrid variant endpoint when variation is hybrid_recs and service is portuguese', async () => {
          const toggles = {
            cpsRecommendations: {
              enabled: true,
            },
            eventTracking: {
              enabled: true,
            },
          };

          const pageDataWithSecondaryColumn = {
            ...articleDataNews,
            datalabHybridRecommendations: sampleRecommendations,
          };

          const { getAllByRole } = render(
            <Page
              pageData={pageDataWithSecondaryColumn}
              service="portuguese"
              toggles={toggles}
            />,
          );

          const [recommendationsRegions] = getAllByRole('region').filter(
            item =>
              item.getAttribute('aria-labelledby') ===
              'recommendations-heading',
          );

          const recommendationsItems = within(
            recommendationsRegions,
          ).getAllByRole('listitem');

          expect(recommendationsRegions).not.toBeNull();
          expect(recommendationsItems).toHaveLength(2);
        });
      });

      describe('Event Tracking', () => {
        beforeEach(() => {
          process.env.RECOMMENDATIONS_ENDPOINT =
            'http://mock-recommendations-path';
        });

        afterEach(() => {
          delete process.env.RECOMMENDATIONS_ENDPOINT;
        });

        describe('View Tracking', () => {
          it('should send ATI and Optimizely view tracking event when recommendations render', async () => {
            const toggles = {
              cpsRecommendations: {
                enabled: true,
              },
              eventTracking: {
                enabled: true,
              },
            };

            render(
              <PageWithContext
                pageData={samplePageData}
                service="portuguese"
                toggles={toggles}
              />,
            );

            await waitFor(
              () => {
                expect(optimizely.track).toHaveBeenCalledTimes(1);
                expect(optimizely.track).toBeCalledWith(
                  'component_views',
                  undefined,
                  { viewed_wsoj: true },
                );
              },
              { timeout: 2000 },
            );
          }, 10000);

          it('should not send ATI or Optimizely view tracking event when event tracking is not enabled', async () => {
            const toggles = {
              cpsRecommendations: {
                enabled: true,
              },
            };

            render(
              <PageWithContext
                pageData={samplePageData}
                service="hindi"
                toggles={toggles}
              />,
            );

            await waitFor(
              () => {
                const wsojViewCalls = sendEventBeacon.mock.calls.filter(
                  ([{ campaignID, componentName }]) =>
                    campaignID.includes('cps_wsoj') || componentName === 'wsoj',
                );
                expect(wsojViewCalls.length).toBe(0);
                expect(optimizely.track).toHaveBeenCalledTimes(0);
              },
              { timeout: 2000 },
            );
          }, 10000);

          it('should not send Optimizely view tracking event when service is not portuguese', async () => {
            const toggles = {
              cpsRecommendations: {
                enabled: true,
              },
              eventTracking: {
                enabled: true,
              },
            };

            render(
              <PageWithContext
                pageData={samplePageData}
                service="mundo"
                toggles={toggles}
              />,
            );

            await waitFor(
              () => {
                const wsojViewCalls = sendEventBeacon.mock.calls.filter(
                  ([{ campaignID, componentName }]) =>
                    campaignID.includes('cps_wsoj') || componentName === 'wsoj',
                );
                expect(wsojViewCalls.length).toBe(5);
                expect(optimizely.track).toHaveBeenCalledTimes(0);
              },
              { timeout: 2000 },
            );
          }, 10000);

          it('should send only ATI view tracking event when service is not portuguese', async () => {
            const toggles = {
              cpsRecommendations: {
                enabled: true,
              },
              eventTracking: {
                enabled: true,
              },
            };

            render(
              <PageWithContext
                pageData={samplePageData}
                service="mundo"
                toggles={toggles}
              />,
            );

            await waitFor(
              () => {
                const wsojViewCalls = sendEventBeacon.mock.calls.filter(
                  ([{ campaignID, componentName }]) =>
                    campaignID.includes('wsoj') || componentName === 'wsoj',
                );
                expect(wsojViewCalls.length).toBe(5);
                expect(optimizely.track).toHaveBeenCalledTimes(0);
              },
              { timeout: 2000 },
            );
          }, 10000);
        });

        describe('Click Tracking', () => {
          it('should send a click event to ATI and Optimizely when a link in the block is clicked', async () => {
            const expectedATIClickEvents = [
              [
                {
                  advertiserID: undefined,
                  campaignID: 'article-sty',
                  componentName: 'wsoj',
                  format: undefined,
                  pageIdentifier:
                    'brasil::portuguese.brasil.story.54196636.page',
                  platform: 'canonical',
                  producerId: '33',
                  service: 'portuguese',
                  statsDestination: 'WS_NEWS_LANGUAGES_TEST',
                  type: 'click',
                  url: undefined,
                },
              ],
              [
                {
                  advertiserID: 'portuguese',
                  campaignID: 'cps_wsoj',
                  componentName:
                    'PL%20das%20fake%20news%20pode%20acirrar%20polariza%C3%A7%C3%A3o%20pol%C3%ADtica%2C%20diz%20pesquisador',
                  format: 'CHD=promo::1',
                  pageIdentifier:
                    'brasil::portuguese.brasil.story.54196636.page',
                  platform: 'canonical',
                  producerId: '33',
                  service: 'portuguese',
                  statsDestination: 'WS_NEWS_LANGUAGES_TEST',
                  type: 'click',
                  url: 'undefined/portuguese/brasil-53418555',
                },
              ],
            ];
            const toggles = {
              cpsRecommendations: {
                enabled: true,
              },
              eventTracking: {
                enabled: true,
              },
            };

            const { getByText } = render(
              <PageWithContext
                pageData={samplePageData}
                service="portuguese"
                toggles={toggles}
              />,
            );

            const blockRecommendationLink = getByText(
              'PL das fake news pode acirrar polarização política, diz pesquisador',
            );
            userEvent.click(blockRecommendationLink);
            await waitFor(
              () => {
                const wsojClickCalls = sendEventBeacon.mock.calls.filter(
                  ([{ type }]) => type === 'click',
                );
                expect(wsojClickCalls.length).toBe(2);
                expect(wsojClickCalls).toEqual(expectedATIClickEvents);
                const optimizelyClickCalls = optimizely.track.mock.calls.filter(
                  ([eventName]) => eventName === 'component_clicks',
                );
                expect(optimizelyClickCalls.length).toBe(1);
                expect(optimizelyClickCalls[0]).toEqual([
                  'component_clicks',
                  undefined,
                  { clicked_wsoj: true },
                ]);
              },
              { timeout: 2000 },
            );
          }, 10000);

          it('should not send a click event to ATI or Optimizely when no link has been clicked', async () => {
            const toggles = {
              cpsRecommendations: {
                enabled: true,
              },
              eventTracking: {
                enabled: true,
              },
            };

            render(
              <PageWithContext
                pageData={samplePageData}
                service="portuguese"
                toggles={toggles}
              />,
            );

            await waitFor(
              () => {
                const wsojClickCalls = sendEventBeacon.mock.calls.filter(
                  ([{ type }]) => type === 'click',
                );
                expect(wsojClickCalls.length).toBe(0);
                const optimizelyClickCalls = optimizely.track.mock.calls.filter(
                  ([eventName]) => eventName === 'component_clicks',
                );
                expect(optimizelyClickCalls.length).toBe(0);
              },
              { timeout: 2000 },
            );
          });

          it('should not send a click event when eventTracking is not enabled', async () => {
            const toggles = {
              cpsRecommendations: {
                enabled: true,
              },
            };

            const { getByText } = render(
              <PageWithContext
                pageData={samplePageData}
                service="hindi"
                toggles={toggles}
              />,
            );

            const blockRecommendationLink = getByText(
              'PL das fake news pode acirrar polarização política, diz pesquisador',
            );
            userEvent.click(blockRecommendationLink);
            await waitFor(
              () => {
                const wsojClickCalls = sendEventBeacon.mock.calls.filter(
                  ([{ type }]) => type === 'click',
                );
                expect(wsojClickCalls.length).toBe(0);
                const optimizelyClickCalls = optimizely.track.mock.calls.filter(
                  ([eventName]) => eventName === 'component_clicks',
                );
                expect(optimizelyClickCalls.length).toBe(0);
              },
              { timeout: 2000 },
            );
          });
        });
      });
    });
  });
});
