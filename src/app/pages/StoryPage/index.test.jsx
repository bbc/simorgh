/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import deepClone from 'ramda/src/clone';

// test helpers
import { render, waitFor, within } from '@testing-library/react';
import assocPath from 'ramda/src/assocPath';
import fetchMock from 'fetch-mock';

// contexts
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

// components to test
import getInitialData from '#app/routes/cpsAsset/getInitialData';

// mock data
import pidginPageData from '#data/pidgin/cpsAssets/world-23252817';
import pidginMostReadData from '#data/pidgin/mostRead/index.json';
import pidginSecondaryColumnData from '#data/pidgin/secondaryColumn/index.json';
import igboPageData from '#data/igbo/cpsAssets/afirika-23252735';
import igboMostReadData from '#data/igbo/mostRead/index.json';
import igboSecondaryColumnData from '#data/igbo/secondaryColumn/index.json';
import russianPageDataWithInlinePromo from '#data/russian/cpsAssets/news-55041160';
import russianMostReadData from '#data/russian/mostRead/index.json';
import russianSecondaryColumnData from '#data/russian/secondaryColumn/index.json';
import ukrainianInRussianPageData from '#data/ukrainian/cpsAssets/news-russian-23333960.json';
import ukrainianSecondaryColumnData from '#data/ukrainian/secondaryColumn/index.json';
import ukrainianMostReadData from '#data/ukrainian/mostRead/index.json';
import portuguesePageData from '#data/portuguese/cpsAssets/brasil-54196636';
import portugueseRecommendationData from '#data/portuguese/recommendations/index';

// 004_brasil_recommendations_experiment
import userEvent from '@testing-library/user-event';
import portugueseMostReadData from '#data/portuguese/mostRead/index';
import {
  OptimizelyExperiment,
  OptimizelyProvider,
} from '@optimizely/react-sdk';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import mundoPageData from '#data/mundo/cpsAssets/noticias-56669604';
import mundoRecommendationsData from '#data/mundo/recommendations/index';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';
import getAgent from '#server/utilities/getAgent/index';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

import russianPageDataWithoutInlinePromo from './fixtureData/russianPageDataWithoutPromo';
import StoryPageIndex from '.';

// 004_brasil_recommendations_experiment
import StoryPage from './StoryPage';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

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

// 004_brasil_recommendations_experiment
jest.mock('#containers/ATIAnalytics/beacon', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    sendEventBeacon: jest.fn(),
  };
});

// 004_brasil_recommendations_experiment
jest.mock('@optimizely/react-sdk', () => {
  const actualModules = jest.requireActual('@optimizely/react-sdk');
  return {
    __esModule: true,
    ...actualModules,
    OptimizelyExperiment: jest.fn(),
  };
});

// 004_brasil_recommendations_experiment
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

// 004_brasil_recommendations_experiment
const PageWithContext = ({
  pageData,
  service,
  showAdsBasedOnLocation = false,
  isAmp = false,
  toggles = defaultToggleState,
}) => (
  <StaticRouter>
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
              <StoryPage service={service} pageData={pageData} />
            </OptimizelyProvider>
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>
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
          <StoryPageIndex service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>
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

const pageType = 'cpsAsset';

describe('Story Page', () => {
  const appEnv = process.env.SIMORGH_APP_ENV;
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
    process.env.RECOMMENDATIONS_ENDPOINT = 'http://mock-recommendations-path';
    // 004_brasil_recommendations_experiment
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

  describe('snapshots', () => {
    it('should match snapshot for STY', async () => {
      fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
      fetchMock.mock(
        'http://localhost/pidgin/mostread.json',
        pidginMostReadData,
      );
      fetchMock.mock(
        'http://localhost/pidgin/sty-secondary-column.json',
        pidginSecondaryColumnData,
      );

      const { pageData } = await getInitialData({
        path: '/some-cps-sty-path',
        service: 'pidgin',
        pageType,
      });

      const { container } = render(
        <Page pageData={pageData} service="pidgin" />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', igboPageData);
    fetchMock.mock('http://localhost/igbo/mostread.json', igboMostReadData);
    fetchMock.mock(
      'http://localhost/igbo/sty-secondary-column.json',
      igboSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const { getByText } = render(<Page pageData={pageData} service="igbo" />);
    expect(getByText('23 Ọktọba 2019')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', igboPageData);
    fetchMock.mock('http://localhost/igbo/mostread.json', igboMostReadData);
    fetchMock.mock(
      'http://localhost/igbo/sty-secondary-column.json',
      igboSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const pageDataWithHiddenTimestamp = assocPath(
      ['metadata', 'options', 'allowDateStamp'],
      false,
      pageData,
    );

    const { asFragment } = render(
      <Page pageData={pageDataWithHiddenTimestamp} service="pidgin" />,
    );

    expect(document.querySelector('main time')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when the secondary column data is not available', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock('http://localhost/pidgin/sty-secondary-column.json', {});

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { container } = render(<Page pageData={pageData} service="pidgin" />);

    expect(container).toMatchSnapshot();
  });

  it('should render secondary column with lang attribute of `serviceLang` when a language override is present', async () => {
    fetchMock.mock(
      'http://localhost/some-cps-sty-path.json',
      ukrainianInRussianPageData,
    );
    fetchMock.mock(
      'http://localhost/ukrainian/sty-secondary-column.json',
      ukrainianSecondaryColumnData,
    );
    fetchMock.mock(
      'http://localhost/ukrainian/mostread.json',
      ukrainianMostReadData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'ukrainian',
      pageType,
    });

    render(<Page pageData={pageData} service="ukrainian" />);

    const secondaryColumn = document.querySelector(
      'div[class*="SecondaryColumn"]',
    );

    expect(secondaryColumn).toHaveAttribute('lang', 'uk');
  });

  it.each`
    showAdsBasedOnLocation | showAdsBasedOnLocationExpectation
    ${true}                | ${'permitted to be shown'}
    ${true}                | ${'permitted to be shown'}
    ${false}               | ${'not permitted to be shown'}
    ${false}               | ${'not permitted to be shown'}
  `(
    'should not render ads when the ads toggle is disabled and is in a location where ads are $showAdsBasedOnLocationExpectation',
    async ({ showAdsBasedOnLocation }) => {
      const toggles = {
        ads: {
          enabled: false,
        },
      };

      fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
      fetchMock.mock(
        'http://localhost/pidgin/mostread.json',
        pidginMostReadData,
      );
      fetchMock.mock(
        'http://localhost/pidgin/sty-secondary-column.json',
        pidginSecondaryColumnData,
      );

      const { pageData } = await getInitialData({
        path: '/some-cps-sty-path',
        service: 'pidgin',
        pageType,
      });

      const { queryByTestId } = render(
        <Page
          pageData={pageData}
          service="pidgin"
          toggles={toggles}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
        />,
      );

      const storyPageAds = queryByTestId('sty-ads');
      expect(storyPageAds).not.toBeInTheDocument();
      const adBootstrap = queryByTestId('adBootstrap');
      expect(adBootstrap).not.toBeInTheDocument();
    },
  );

  it('should not render ads when the ads are not permitted for asset, ads are enabled and location permits ads', async () => {
    const toggles = {
      ads: {
        enabled: true,
      },
    };
    const pidginPageDataDisallowAdvertising = deepClone(pidginPageData);
    pidginPageDataDisallowAdvertising.metadata.options.allowAdvertising = false;

    fetchMock.mock(
      'http://localhost/some-cps-sty-path.json',
      pidginPageDataDisallowAdvertising,
    );
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock(
      'http://localhost/pidgin/sty-secondary-column.json',
      pidginSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { queryByTestId } = render(
      <Page
        pageData={pageData}
        service="pidgin"
        toggles={toggles}
        showAdsBasedOnLocation
      />,
    );

    const storyPageAds = queryByTestId('sty-ads');
    expect(storyPageAds).not.toBeInTheDocument();
    const adBootstrap = queryByTestId('adBootstrap');
    expect(adBootstrap).not.toBeInTheDocument();
  });

  it('should not render ads when the ads toggle is enabled and is in a location where ads are not permitted to be shown', async () => {
    const toggles = {
      ads: {
        enabled: true,
      },
    };

    fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock(
      'http://localhost/pidgin/sty-secondary-column.json',
      pidginSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { queryByTestId } = render(
      <Page
        pageData={pageData}
        service="pidgin"
        toggles={toggles}
        showAdsBasedOnLocation={false}
      />,
    );

    const storyPageAds = queryByTestId('sty-ads');
    expect(storyPageAds).not.toBeInTheDocument();
    const adBootstrap = queryByTestId('adBootstrap');
    expect(adBootstrap).not.toBeInTheDocument();
  });

  it('should render ads when the ads toggle is enabled', async () => {
    const toggles = {
      ads: {
        enabled: true,
      },
    };

    fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock(
      'http://localhost/pidgin/sty-secondary-column.json',
      pidginSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { getByTestId, getAllByTestId } = render(
      <Page
        pageData={pageData}
        service="pidgin"
        toggles={toggles}
        showAdsBasedOnLocation
      />,
    );

    const storyPageAds = getAllByTestId('sty-ads');
    // render ads container twice for leaderboard and mpu
    expect(storyPageAds).toHaveLength(2);
    const adBootstrap = getByTestId('adBootstrap');
    expect(adBootstrap).toBeInTheDocument();
  });

  it(`should configure canonical ad bootstrap with campaign where 'adCampaignKeyword' is in metadata`, async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    const toggles = {
      ads: {
        enabled: true,
      },
    };

    const pidginPageDataAdCampaign = deepClone(pidginPageData);
    pidginPageDataAdCampaign.metadata.adCampaignKeyword = 'royalwedding';

    fetchMock.mock(
      'http://localhost/some-cps-sty-path.json',
      pidginPageDataAdCampaign,
    );
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock(
      'http://localhost/pidgin/sty-secondary-column.json',
      pidginSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'gahuza',
      pageType,
    });

    const { getByTestId } = render(
      <Page
        pageData={pageData}
        service="gahuza"
        toggles={toggles}
        showAdsBasedOnLocation
      />,
    );

    const adBootstrap = getByTestId('adBootstrap');
    expect(adBootstrap).toBeInTheDocument();
    expect(adBootstrap).toHaveAttribute('data-adcampaign', 'royalwedding');
  });

  it('should configure canonical ad bootstrap where campaign is not in metadata', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    const toggles = {
      ads: {
        enabled: true,
      },
    };

    fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock(
      'http://localhost/pidgin/sty-secondary-column.json',
      pidginSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { getByTestId } = render(
      <Page
        pageData={pageData}
        service="pidgin"
        toggles={toggles}
        showAdsBasedOnLocation
      />,
    );

    const adBootstrap = getByTestId('adBootstrap');
    expect(adBootstrap).toBeInTheDocument();
    expect(adBootstrap).not.toHaveAttribute('data-adcampaign');
  });

  it('should not render canonical ad bootstrap on amp', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    const observers = new Map();
    const observerSpy = jest
      .spyOn(global, 'IntersectionObserver')
      .mockImplementationOnce(cb => {
        const item = {
          callback: cb,
          elements: new Set(),
        };

        const instance = {
          observe: jest.fn(element => {
            item.elements.add(element);
          }),
          disconnect: jest.fn(() => {
            item.elements.clear();
          }),
        };

        observers.set(instance, item);

        return instance;
      });
    const toggles = {
      ads: {
        enabled: true,
      },
    };

    fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock(
      'http://localhost/pidgin/sty-secondary-column.json',
      pidginSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { queryByTestId } = render(
      <Page
        pageData={pageData}
        service="pidgin"
        toggles={toggles}
        showAdsBasedOnLocation
        isAmp
      />,
    );

    const adBootstrap = queryByTestId('adBootstrap');

    await waitFor(() => {
      expect(adBootstrap).not.toBeInTheDocument();
      observers.clear();
      observerSpy.mockRestore();
    });
  });

  it('should render the inline podcast promo component on russian pages with a paragraph of 940 characters and after 8th paragraph', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    const toggles = {
      podcastPromo: {
        enabled: true,
      },
    };

    fetchMock.mock(
      'http://localhost/some-cps-sty-path.json',
      russianPageDataWithInlinePromo,
    );
    fetchMock.mock(
      'http://localhost/russian/mostread.json',
      russianMostReadData,
    );
    fetchMock.mock(
      'http://localhost/russian/sty-secondary-column.json',
      russianSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'russian',
      pageType,
    });

    const { getAllByRole } = render(
      <Page
        pageData={pageData}
        service="russian"
        toggles={toggles}
        showAdsBasedOnLocation
      />,
    );

    const regions = getAllByRole('region');
    expect(regions.length).toEqual(4);

    const fourthRegion = regions[0];
    expect(fourthRegion.getAttribute('aria-labelledby')).toEqual(
      'podcast-promo',
    );
  });

  it('should not render the inline podcast promo component on russian pages with paragraphs of less than 940 characters', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    const toggles = {
      podcastPromo: {
        enabled: true,
      },
    };

    fetchMock.mock(
      'http://localhost/some-cps-sty-path.json',
      russianPageDataWithoutInlinePromo,
    );
    fetchMock.mock(
      'http://localhost/russian/mostread.json',
      russianMostReadData,
    );
    fetchMock.mock(
      'http://localhost/russian/sty-secondary-column.json',
      russianSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'russian',
      pageType,
    });

    const { getAllByRole } = render(
      <Page
        pageData={pageData}
        service="russian"
        toggles={toggles}
        showAdsBasedOnLocation
      />,
    );

    const regions = getAllByRole('region');
    expect(regions.length).toEqual(3);

    regions.forEach(region =>
      expect(region.getAttribute('aria-labelledby')).not.toEqual(
        'podcast-promo',
      ),
    );
  });

  describe.skip('Optimizely Experiments', () => {
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

          const recommendationsEndpoint =
            'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino';

          fetchMock.mock(
            'http://localhost/some-cps-sty-path.json',
            portuguesePageData,
          );
          fetchMock.mock(recommendationsEndpoint, portugueseRecommendationData);

          const { pageData } = await getInitialData({
            path: '/some-cps-sty-path',
            service: 'portuguese',
            pageType,
          });

          const { getAllByRole } = render(
            <Page pageData={pageData} service="portuguese" toggles={toggles} />,
          );

          const [recommendationsRegions] = getAllByRole('region').filter(
            item =>
              item.getAttribute('aria-labelledby') ===
              'recommendations-heading',
          );

          const recommendationsItems = within(
            recommendationsRegions,
          ).getAllByRole('listitem');

          expect(fetchMock.calls()[1][0]).toBe(recommendationsEndpoint);
          expect(recommendationsRegions).not.toBeNull();
          expect(recommendationsItems).toHaveLength(4);
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

          const recommendationsEndpoint =
            'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_datalab&EngineVariant=content';

          fetchMock.mock(
            'http://localhost/some-cps-sty-path.json',
            portuguesePageData,
          );

          fetchMock.mock(recommendationsEndpoint, portugueseRecommendationData);

          const { pageData } = await getInitialData({
            path: '/some-cps-sty-path',
            service: 'portuguese',
            pageType,
          });

          const { getAllByRole } = render(
            <Page pageData={pageData} service="portuguese" toggles={toggles} />,
          );

          const [recommendationsRegions] = getAllByRole('region').filter(
            item =>
              item.getAttribute('aria-labelledby') ===
              'recommendations-heading',
          );

          const recommendationsItems = within(
            recommendationsRegions,
          ).getAllByRole('listitem');

          expect(fetchMock.calls()[1][0]).toBe(recommendationsEndpoint);
          expect(recommendationsRegions).not.toBeNull();
          expect(recommendationsItems).toHaveLength(4);
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

          const recommendationsEndpoint =
            'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_datalab&EngineVariant=hybrid';

          fetchMock.mock(
            'http://localhost/some-cps-sty-path.json',
            portuguesePageData,
          );

          fetchMock.mock(recommendationsEndpoint, portugueseRecommendationData);

          const { pageData } = await getInitialData({
            path: '/some-cps-sty-path',
            service: 'portuguese',
            pageType,
          });

          const { getAllByRole } = render(
            <Page pageData={pageData} service="portuguese" toggles={toggles} />,
          );

          const [recommendationsRegions] = getAllByRole('region').filter(
            item =>
              item.getAttribute('aria-labelledby') ===
              'recommendations-heading',
          );

          const recommendationsItems = within(
            recommendationsRegions,
          ).getAllByRole('listitem');

          expect(fetchMock.calls()[1][0]).toBe(recommendationsEndpoint);
          expect(recommendationsRegions).not.toBeNull();
          expect(recommendationsItems).toHaveLength(4);
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              portuguesePageData,
            );
            fetchMock.mock(
              'http://localhost/portuguese/mostread.json',
              portugueseMostReadData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino',
              portugueseRecommendationData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'portuguese',
              pageType,
            });

            render(
              <PageWithContext
                pageData={pageData}
                service="portuguese"
                toggles={toggles}
              />,
            );

            await waitFor(
              () => {
                const wsojViewCalls = sendEventBeacon.mock.calls.filter(
                  ([{ campaignID, componentName }]) =>
                    componentName === 'wsoj' || campaignID.includes('cps_wsoj'),
                );

                expect(wsojViewCalls.length).toBe(5);
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              portuguesePageData,
            );
            fetchMock.mock(
              'http://localhost/portuguese/mostread.json',
              portugueseMostReadData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino',
              portugueseRecommendationData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'hindi',
              pageType,
            });

            render(
              <PageWithContext
                pageData={pageData}
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              mundoPageData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/mundo/noticias-56669604?Engine=unirecs_datalab',
              mundoRecommendationsData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'mundo',
              pageType,
            });

            render(
              <PageWithContext
                pageData={pageData}
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              mundoPageData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/mundo/noticias-56669604?Engine=unirecs_datalab',
              mundoRecommendationsData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'mundo',
              pageType,
            });

            render(
              <PageWithContext
                pageData={pageData}
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              portuguesePageData,
            );
            fetchMock.mock(
              'http://localhost/portuguese/mostread.json',
              portugueseMostReadData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino',
              portugueseRecommendationData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'portuguese',
              pageType,
            });

            const { getByText } = render(
              <PageWithContext
                pageData={pageData}
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              portuguesePageData,
            );
            fetchMock.mock(
              'http://localhost/portuguese/mostread.json',
              portugueseMostReadData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino',
              portugueseRecommendationData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'portuguese',
              pageType,
            });

            render(
              <PageWithContext
                pageData={pageData}
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              portuguesePageData,
            );
            fetchMock.mock(
              'http://localhost/portuguese/mostread.json',
              portugueseMostReadData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino',
              portugueseRecommendationData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'portuguese',
              pageType,
            });

            const { getByText } = render(
              <PageWithContext
                pageData={pageData}
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

          it('should not send a click event to Optimizely when service is not portuguese', async () => {
            const expectedATIClickEvents = [
              [
                {
                  advertiserID: undefined,
                  campaignID: 'article-sty',
                  componentName: 'wsoj',
                  format: undefined,
                  pageIdentifier:
                    'also_in_the_news::mundo.also_in_the_news.story.56669604.page',
                  platform: 'canonical',
                  producerId: '62',
                  service: 'mundo',
                  statsDestination: 'WS_NEWS_LANGUAGES_TEST',
                  type: 'click',
                  url: undefined,
                },
              ],
              [
                {
                  advertiserID: 'mundo',
                  campaignID: 'cps_wsoj',
                  componentName:
                    'La%20conmovedora%20historia%20de%20c%C3%B3mo%20una%20madre%20y%20el%20hombre%20preso%20por%20la%20muerte%20de%20su%20hija%20se%20unieron%20para%20atrapar%20al%20verdadero%20asesino',
                  format: 'CHD=promo::1',
                  pageIdentifier:
                    'also_in_the_news::mundo.also_in_the_news.story.56669604.page',
                  platform: 'canonical',
                  producerId: '62',
                  service: 'mundo',
                  statsDestination: 'WS_NEWS_LANGUAGES_TEST',
                  type: 'click',
                  url: 'undefined/mundo/noticias-53377054',
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
            fetchMock.mock(
              'http://localhost/some-cps-sty-path.json',
              mundoPageData,
            );
            fetchMock.mock(
              'http://mock-recommendations-path/recommendations/mundo/noticias-56669604?Engine=unirecs_datalab',
              mundoRecommendationsData,
            );
            const { pageData } = await getInitialData({
              path: '/some-cps-sty-path',
              service: 'mundo',
              pageType,
            });

            const { getByText } = render(
              <PageWithContext
                pageData={pageData}
                service="mundo"
                toggles={toggles}
              />,
            );

            const blockRecommendationLink = getByText(
              'La conmovedora historia de cómo una madre y el hombre preso por la muerte de su hija se unieron para atrapar al verdadero asesino',
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
                expect(optimizelyClickCalls.length).toBe(0);
              },
              { timeout: 2000 },
            );
          }, 10000);
        });
      });

      it('should fetch and render recommendations from current endpoint when variation is null and service is not portuguese', async () => {
        OptimizelyExperiment.mockImplementation(props => {
          const { children } = props;

          const variation = null;

          if (children != null && typeof children === 'function') {
            return <>{children(variation, true, false)}</>;
          }

          return null;
        });

        const toggles = {
          cpsRecommendations: {
            enabled: true,
          },
          eventTracking: {
            enabled: true,
          },
        };

        const recommendationsEndpoint =
          'http://mock-recommendations-path/recommendations/mundo/noticias-56669604?Engine=unirecs_datalab';

        fetchMock.mock(
          'http://localhost/some-cps-sty-path.json',
          mundoPageData,
        );

        fetchMock.mock(recommendationsEndpoint, mundoRecommendationsData);

        const { pageData } = await getInitialData({
          path: '/some-cps-sty-path',
          service: 'mundo',
          pageType,
        });

        const { getAllByRole } = render(
          <Page pageData={pageData} service="mundo" toggles={toggles} />,
        );

        const [recommendationsRegions] = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );

        const recommendationsItems = within(
          recommendationsRegions,
        ).getAllByRole('listitem');

        expect(fetchMock.calls()[1][0]).toBe(recommendationsEndpoint);
        expect(recommendationsRegions).not.toBeNull();
        expect(recommendationsItems).toHaveLength(4);
      });

      it('should fetch and render recommendations from current endpoint when variation is null and service is portuguese', async () => {
        OptimizelyExperiment.mockImplementation(props => {
          const { children } = props;

          const variation = null;

          if (children != null && typeof children === 'function') {
            return <>{children(variation, true, false)}</>;
          }

          return null;
        });

        const toggles = {
          cpsRecommendations: {
            enabled: true,
          },
          eventTracking: {
            enabled: true,
          },
        };

        const recommendationsEndpoint =
          'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino';

        fetchMock.mock(
          'http://localhost/some-cps-sty-path.json',
          portuguesePageData,
        );
        fetchMock.mock(recommendationsEndpoint, portugueseRecommendationData);

        const { pageData } = await getInitialData({
          path: '/some-cps-sty-path',
          service: 'portuguese',
          pageType,
        });

        const { getAllByRole } = render(
          <Page pageData={pageData} service="portuguese" toggles={toggles} />,
        );

        const [recommendationsRegions] = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );

        const recommendationsItems = within(
          recommendationsRegions,
        ).getAllByRole('listitem');

        expect(fetchMock.calls()[1][0]).toBe(recommendationsEndpoint);
        expect(recommendationsRegions).not.toBeNull();
        expect(recommendationsItems).toHaveLength(4);
      });

      it('should not return recommendations when the certificates do not exist', async () => {
        getAgent.mockImplementation(() => {
          throw Error('some file not found error');
        });
        const toggles = {
          cpsRecommendations: {
            enabled: true,
          },
        };

        const recommendationsEndpoint =
          'http://mock-recommendations-path/recommendations/portuguese/brasil-54196636?Engine=unirecs_camino';

        fetchMock.mock(
          'http://localhost/some-cps-sty-path.json',
          portuguesePageData,
        );
        fetchMock.mock(recommendationsEndpoint, portugueseRecommendationData);

        const { pageData } = await getInitialData({
          path: '/some-cps-sty-path',
          service: 'portuguese',
          pageType,
        });

        const { getAllByRole } = render(
          <Page pageData={pageData} service="portuguese" toggles={toggles} />,
        );

        const recommendationsRegions = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );

        expect(recommendationsRegions).toEqual([]);
      });
    });
  });
});
